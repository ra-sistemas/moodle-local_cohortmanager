<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace local_cohortmanager\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_multiple_structure;
use core_external\external_single_structure;
use core_external\external_value;
use cohort_candidate_selector;
use context;
use context_system;
use moodle_exception;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/cohort/locallib.php');

/**
 * Class members
 *
 * @package    local_cohortmanager
 * @copyright  2025 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class members extends external_api
{
    /**
     * Parameter description for get_cohort_members_table_data().
     *
     * @return external_function_parameters
     */
    public static function get_cohort_members_table_data_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'The cohort id', VALUE_REQUIRED),
            'sortdata' => new external_multiple_structure(
                new external_single_structure([
                    'sortby' => new external_value(PARAM_ALPHANUMEXT, 'Field to sort by'),
                    'sortorder' => new external_value(PARAM_INT, 'Sort order (1 for ASC, -1 for DESC)')
                ]),
                'Sort data',
                VALUE_DEFAULT,
                []
            ),
            'filters' => new external_multiple_structure(
                new external_single_structure([
                    'name' => new external_value(PARAM_ALPHANUMEXT, 'Filter name'),
                    'value' => new external_value(PARAM_RAW, 'Filter value')
                ]),
                'Filters',
                VALUE_DEFAULT,
                []
            ),
            'firstinitial' => new external_value(PARAM_ALPHANUMEXT, 'First initial filter', VALUE_DEFAULT, ''),
            'lastinitial' => new external_value(PARAM_ALPHANUMEXT, 'Last initial filter', VALUE_DEFAULT, ''),
            'pagenumber' => new external_value(PARAM_INT, 'Page number', VALUE_DEFAULT, 1),
            'pagesize' => new external_value(PARAM_INT, 'Page size', VALUE_DEFAULT, 20),
            'hiddencolumns' => new external_multiple_structure(
                new external_value(PARAM_ALPHANUMEXT, 'Hidden column name'),
                'Hidden columns',
                VALUE_DEFAULT,
                []
            )
        ]);
    }

    /**
     * Get cohort members table data.
     *
     * @param int $cohortid The cohort id
     * @param array $sortdata Sort data
     * @param array $filters Filters
     * @param string $firstinitial First initial filter
     * @param string $lastinitial Last initial filter
     * @param int $pagenumber Page number
     * @param int $pagesize Page size
     * @param array $hiddencolumns Hidden columns
     * @return array
     */
    public static function get_cohort_members_table_data(
        $cohortid,
        $sortdata = [],
        $filters = [],
        $firstinitial = '',
        $lastinitial = '',
        $pagenumber = 1,
        $pagesize = 20,
        $hiddencolumns = []
    ) {
        global $DB, $PAGE;

        // Validate parameters.
        $params = self::validate_parameters(self::get_cohort_members_table_data_parameters(), [
            'cohortid' => $cohortid,
            'sortdata' => $sortdata,
            'filters' => $filters,
            'firstinitial' => $firstinitial,
            'lastinitial' => $lastinitial,
            'pagenumber' => $pagenumber,
            'pagesize' => $pagesize,
            'hiddencolumns' => $hiddencolumns
        ]);

        // Get cohort and context.
        $cohort = $DB->get_record('cohort', ['id' => $params['cohortid']], '*', MUST_EXIST);
        $context = context::instance_by_id($cohort->contextid, MUST_EXIST);

        $PAGE->set_context($context);

        // Check capabilities.
        require_capability('moodle/cohort:manage', $context);

        // Build WHERE clause.
        $where = '';
        $params_sql = [];

        // Apply filters.
        foreach ($params['filters'] as $filter) {
            if ($filter['name'] === 'search') {
                $where .= " AND (u.firstname LIKE :search1 OR u.lastname LIKE :search2 OR u.email LIKE :search3)";
                $params_sql['search1'] = '%' . $filter['value'] . '%';
                $params_sql['search2'] = '%' . $filter['value'] . '%';
                $params_sql['search3'] = '%' . $filter['value'] . '%';
            }
        }

        // Build ORDER BY clause.
        $orderby = '';
        if (!empty($params['sortdata'])) {
            $sortclauses = [];
            foreach ($params['sortdata'] as $sort) {
                $direction = $sort['sortorder'] == 1 ? 'ASC' : 'DESC';
                $sortclauses[] = "u.{$sort['sortby']} {$direction}";
            }
            $orderby = "ORDER BY " . implode(', ', $sortclauses);
        } else {
            $orderby = "ORDER BY u.lastname ASC, u.firstname ASC";
        }

        // Calculate pagination.
        $offset = ($params['pagenumber'] - 1) * $params['pagesize'];

        // Get total count.
        $totalcount = $DB->count_records_sql(
            "SELECT COUNT(*) FROM {cohort_members} cm JOIN {user} u ON cm.userid = u.id WHERE cm.cohortid = :cohortid" . $where,
            array_merge(['cohortid' => $params['cohortid']], $params_sql)
        );

        // Get members.
        $members = $DB->get_records_sql(
            "SELECT u.* FROM {cohort_members} cm 
             JOIN {user} u ON cm.userid = u.id 
             WHERE cm.cohortid = :cohortid" . $where . " " . $orderby,
            array_merge(['cohortid' => $params['cohortid']], $params_sql),
            $offset,
            $params['pagesize']
        );

        // Format the data for the table.
        $formattedmembers = [];
        foreach ($members as $member) {
            $formattedmembers[] = [
                'id' => $member->id,
                'fullname' => fullname($member),
                'username' => $member->username,
                'email' => $member->email,
                'firstname' => $member->firstname,
                'lastname' => $member->lastname,
                'picture' => $member->picture,
                'imagealt' => $member->imagealt,
                'city' => $member->city,
                'country' => $member->country,
            ];
        }

        return [
            'members' => $formattedmembers,
            'totalrows' => $totalcount,
            'hasmore' => ($offset + $params['pagesize']) < $totalcount
        ];
    }

    /**
     * Return description for get_cohort_members_table_data().
     *
     * @return external_description
     */
    public static function get_cohort_members_table_data_returns()
    {
        return new external_single_structure([
            'members' => new external_multiple_structure(
                new external_single_structure([
                    'id' => new external_value(PARAM_INT, 'User ID'),
                    'fullname' => new external_value(PARAM_TEXT, 'User full name'),
                    'username' => new external_value(PARAM_TEXT, 'Username'),
                    'email' => new external_value(PARAM_TEXT, 'Email address'),
                    'firstname' => new external_value(PARAM_TEXT, 'First name'),
                    'lastname' => new external_value(PARAM_TEXT, 'Last name'),
                    'picture' => new external_value(PARAM_INT, 'Picture field value'),
                    'imagealt' => new external_value(PARAM_TEXT, 'Image alt text'),
                    'city' => new external_value(PARAM_TEXT, 'City'),
                    'country' => new external_value(PARAM_TEXT, 'Country'),
                ])
            ),
            'totalrows' => new external_value(PARAM_INT, 'Total number of rows'),
            'hasmore' => new external_value(PARAM_BOOL, 'Whether there are more rows')
        ]);
    }
    /**
     * Parameter description for get_data_request().
     *
     * @since Moodle 3.5
     * @return external_function_parameters
     */
    public static function get_potential_members_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'The cohortid', VALUE_REQUIRED),
            'query' => new external_value(PARAM_TEXT, 'The search query', VALUE_REQUIRED)
        ]);
    }

    /**
     * Fetch the potential memebers of cohort
     *
     * @since Moodle 3.5
     * @param int $cohortid The search request.
     * @param string $query The search request.
     * @return array
     * @throws required_capability_exception
     * @throws dml_exception
     * @throws invalid_parameter_exception
     * @throws restricted_context_exception
     */
    public static function get_potential_members($cohortid, $query)
    {
        global $DB;
        $params = external_api::validate_parameters(self::get_potential_members_parameters(), [
            'cohortid' => $cohortid,
            'query' => $query
        ]);


        $cohort = $DB->get_record('cohort', array('id' => $params['cohortid']), '*', MUST_EXIST);
        $context = context::instance_by_id($cohort->contextid, MUST_EXIST);

        $potentialuserselector = new cohort_candidate_selector(
            'fake_menu',
            array(
                'cohortid' => $cohort->id,
                'accesscontext' => $context
            )
        );

        $users = array_values($potentialuserselector->find_users($params['query']));

        if (!isset($users[0])) {
            return [];
        }

        foreach ($users[0] as $user) {

            $useroption = (object)[
                'id' => $user->id,
                'fullname' => fullname($user)
            ];
            $useroptions[$user->id] = $useroption;
        }

        return $useroptions;
    }

    /**
     * Parameter description for get_potential_members_returns().
     *
     * @since Moodle 3.5
     * @return \core_external\external_description
     * @throws coding_exception
     */
    public static function get_potential_members_returns()
    {
        return new external_multiple_structure(new external_single_structure(
            [
                'id' => new external_value(PARAM_INT, 'ID of the user'),
                'fullname' => new external_value(PARAM_RAW, 'The fullname of the user')
            ]
        ));
    }

    /**
     * Parameter description for count_cohort_members().
     *
     * @return external_function_parameters
     */
    public static function count_cohort_members_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'The cohort id')
        ]);
    }

    /**
     * Count the members of a specific cohort.
     *
     * @param int $cohortid The cohort id
     * @return array
     */
    public static function count_cohort_members($cohortid)
    {
        global $DB;

        // Validate parameters.
        $params = self::validate_parameters(self::count_cohort_members_parameters(), [
            'cohortid' => $cohortid
        ]);

        // Count members in the cohort.
        return $DB->count_records('cohort_members', ['cohortid' => $params['cohortid']]);
    }

    /**
     * Return description for count_cohort_members().
     *
     * @return external_value
     */
    public static function count_cohort_members_returns()
    {
        return new external_value(PARAM_INT, 'The cohort id that was counted');
    }
}
