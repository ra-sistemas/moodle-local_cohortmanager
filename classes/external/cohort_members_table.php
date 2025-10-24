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

/**
 * Contains the class used for the cohort members table data.
 *
 * @package    local_cohortmanager
 * @copyright  2025 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace local_cohortmanager\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_multiple_structure;
use core_external\external_single_structure;
use core_external\external_value;
use context;
use stdClass;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/cohort/locallib.php');

/**
 * Class cohort_members_table
 *
 * @package    local_cohortmanager
 * @copyright  2025 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class cohort_members_table extends external_api {

    /**
     * Parameter description for get_cohort_members_table_data().
     *
     * @return external_function_parameters
     */
    public static function get_cohort_members_table_data_parameters() {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'The cohort id', VALUE_REQUIRED),
            'sortdata' => new external_multiple_structure(
                new external_single_structure([
                    'sortby' => new external_value(PARAM_ALPHANUMEXT, 'Field to sort by'),
                    'sortorder' => new external_value(PARAM_INT, 'Sort order (1 for ASC, -1 for DESC)')
                ]), 'Sort data', VALUE_DEFAULT, []
            ),
            'filters' => new external_multiple_structure(
                new external_single_structure([
                    'name' => new external_value(PARAM_ALPHANUMEXT, 'Filter name'),
                    'value' => new external_value(PARAM_RAW, 'Filter value')
                ]), 'Filters', VALUE_DEFAULT, []
            ),
            'firstinitial' => new external_value(PARAM_ALPHANUMEXT, 'First initial filter', VALUE_DEFAULT, ''),
            'lastinitial' => new external_value(PARAM_ALPHANUMEXT, 'Last initial filter', VALUE_DEFAULT, ''),
            'pagenumber' => new external_value(PARAM_INT, 'Page number', VALUE_DEFAULT, 1),
            'pagesize' => new external_value(PARAM_INT, 'Page size', VALUE_DEFAULT, 20),
            'hiddencolumns' => new external_multiple_structure(
                new external_value(PARAM_ALPHANUMEXT, 'Hidden column name'), 'Hidden columns', VALUE_DEFAULT, []
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
    public static function get_cohort_members_table_data($cohortid, $sortdata = [], $filters = [], 
                                                         $firstinitial = '', $lastinitial = '', 
                                                         $pagenumber = 1, $pagesize = 20, 
                                                         $hiddencolumns = []) {
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

        // Check capabilities.
        require_capability('moodle/cohort:manage', $context);

        // Build WHERE clause.
        $where = '';
        $params_sql = [];
        
        // Apply filters.
        foreach ($params['filters'] as $filter) {
            if ($filter['name'] === 'search') {
                $where .= " AND (u.firstname LIKE :search OR u.lastname LIKE :search OR u.email LIKE :search)";
                $params_sql['search'] = '%' . $filter['value'] . '%';
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
            'html' => self::render_table_html($formattedmembers, $params['hiddencolumns']),
            'totalrows' => $totalcount,
            'hasmore' => ($offset + $params['pagesize']) < $totalcount
        ];
    }

    /**
     * Render the table HTML.
     *
     * @param array $members Members data
     * @param array $hiddencolumns Hidden columns
     * @return string HTML
     */
    protected static function render_table_html($members, $hiddencolumns) {
        global $OUTPUT;

        $html = '';
        
        // Start table.
        $html .= '<table class="table table-striped table-hover cohort-members-table">';
        $html .= '<thead>';
        $html .= '<tr>';
        
        // Select column.
        if (!in_array('select', $hiddencolumns)) {
            $html .= '<th class="header c0" style="width: 30px;">';
            $html .= '<input type="checkbox" id="select-all-cohort-members" class="form-check-input m-1" title="' . get_string('selectall') . '">';
            $html .= '</th>';
        }
        
        // Name column.
        if (!in_array('fullname', $hiddencolumns)) {
            $html .= '<th class="header name">' . get_string('name') . '</th>';
        }
        
        // Username column.
        if (!in_array('username', $hiddencolumns)) {
            $html .= '<th class="header username">' . get_string('username') . '</th>';
        }
        
        // Email column.
        if (!in_array('email', $hiddencolumns)) {
            $html .= '<th class="header email">' . get_string('email') . '</th>';
        }
        
        $html .= '</tr>';
        $html .= '</thead>';
        $html .= '<tbody>';
        
        // Table rows.
        foreach ($members as $member) {
            $html .= '<tr>';
            
            // Select column.
            if (!in_array('select', $hiddencolumns)) {
                $html .= '<td class="cell c0">';
                $html .= '<input type="checkbox" id="member' . $member['id'] . '" class="form-check-input membercheckbox m-1" title="' . get_string('selectitem', 'moodle', $member['fullname']) . '">';
                $html .= '</td>';
            }
            
            // Name column.
            if (!in_array('fullname', $hiddencolumns)) {
                $html .= '<td class="cell name">';
                $html .= $OUTPUT->user_picture($member, ['courseid' => SITEID, 'includefullname' => true]);
                $html .= ' <span class="fullname">' . $member['fullname'] . '</span>';
                $html .= '</td>';
            }
            
            // Username column.
            if (!in_array('username', $hiddencolumns)) {
                $html .= '<td class="cell username">' . $member['username'] . '</td>';
            }
            
            // Email column.
            if (!in_array('email', $hiddencolumns)) {
                $html .= '<td class="cell email">' . $member['email'] . '</td>';
            }
            
            $html .= '</tr>';
        }
        
        $html .= '</tbody>';
        $html .= '</table>';
        
        return $html;
    }

    /**
     * Return description for get_cohort_members_table_data().
     *
     * @return external_description
     */
    public static function get_cohort_members_table_data_returns() {
        return new external_single_structure([
            'html' => new external_value(PARAM_RAW, 'Table HTML'),
            'totalrows' => new external_value(PARAM_INT, 'Total number of rows'),
            'hasmore' => new external_value(PARAM_BOOL, 'Whether there are more rows')
        ]);
    }
}