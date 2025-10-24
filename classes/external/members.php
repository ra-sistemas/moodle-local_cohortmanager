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

        if(!isset($users[0])) {
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
}
