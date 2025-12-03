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
use core_external\external_format_value;
use context;
use context_course;

/**
 * Class enrols
 *
 * @package    local_cohortmanager
 * @copyright  2025 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class enrols extends external_api {

    /**
     * Returns description of method parameters
     *
     * @return external_function_parameters
     */
    public static function get_cohort_enrol_instances_parameters() {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'ID of the cohort')
        ]);
    }

    /**
     * Get all enrol instances of enrol=cohort that the customint1 field is equal to the cohortid
     *
     * @param int $cohortid ID of the cohort
     * @return array Array of enrol instances
     */
    public static function get_cohort_enrol_instances($cohortid) {
        global $DB;

        // Validate parameters
        $params = self::validate_parameters(self::get_cohort_enrol_instances_parameters(), [
            'cohortid' => $cohortid
        ]);

        // Get cohort enrol instances where customint1 equals the cohortid
        $sql = "SELECT e.*, c.fullname as coursename, c.shortname as courseshortname
                  FROM {enrol} e
                  JOIN {course} c ON e.courseid = c.id
                 WHERE e.enrol = 'cohort' AND e.customint1 = :cohortid
                 ORDER BY c.fullname";

        $enrolinstances = $DB->get_records_sql($sql, ['cohortid' => $params['cohortid']]);

        $result = [];
        foreach ($enrolinstances as $instance) {
            // Get role information
            $role = $DB->get_record('role', ['id' => $instance->roleid]);
            $coursecontext = context_course::instance($instance->courseid);
            $rolename = $role ? role_get_name($role, $coursecontext, ROLENAME_BOTH) : '';

            // Get group information if customint2 is set
            $groupinfo = null;
            if (!empty($instance->customint2)) {
                if ($instance->customint2 == -1) {
                    $groupinfo = ['id' => -1, 'name' => get_string('creategroup', 'enrol_cohort')];
                } else {
                    $group = $DB->get_record('groups', ['id' => $instance->customint2, 'courseid' => $instance->courseid]);
                    if ($group) {
                        $groupinfo = [
                            'id' => $group->id,
                            'name' => format_string($group->name, true, ['context' => $coursecontext])
                        ];
                    }
                }
            }

            $result[] = [
                'id' => $instance->id,
                'courseid' => $instance->courseid,
                'coursename' => format_string($instance->coursename, true, ['context' => $coursecontext]),
                'courseshortname' => $instance->courseshortname,
                'roleid' => $instance->roleid,
                'rolename' => $rolename,
                'status' => $instance->status,
                'cohortid' => $instance->customint1,
                'groupid' => $instance->customint2,
                // 'customint3' => $instance->customint3,
                // 'customint4' => $instance->customint4,
                // 'customtext1' => $instance->customtext1,
                // 'customtext2' => $instance->customtext2,
                // 'customtext3' => $instance->customtext3,
                // 'customtext4' => $instance->customtext4,
                'timecreated' => $instance->timecreated,
                'timemodified' => $instance->timemodified,
                // 'groupinfo' => $groupinfo
            ];
        }

        return $result;
    }

    /**
     * Returns description of method result value
     *
     * @return external_multiple_structure
     */
    public static function get_cohort_enrol_instances_returns() {
        return new external_multiple_structure(
            new external_single_structure([
                'id' => new external_value(PARAM_INT, 'ID of the enrol instance'),
                'courseid' => new external_value(PARAM_INT, 'ID of the course'),
                'coursename' => new external_value(PARAM_RAW, 'Name of the course'),
                'courseshortname' => new external_value(PARAM_RAW, 'Short name of the course'),
                'roleid' => new external_value(PARAM_INT, 'ID of the role'),
                'rolename' => new external_value(PARAM_RAW, 'Name of the role'),
                'status' => new external_value(PARAM_INT, 'Status of the enrol instance'),
                'cohortid' => new external_value(PARAM_INT, 'Custom integer 1 (cohort ID)'),
                'groupid' => new external_value(PARAM_INT, 'Custom integer 2 (group ID)', VALUE_OPTIONAL),
                // 'customint3' => new external_value(PARAM_INT, 'Custom integer 3', VALUE_OPTIONAL),
                // 'customint4' => new external_value(PARAM_INT, 'Custom integer 4', VALUE_OPTIONAL),
                // 'customtext1' => new external_value(PARAM_RAW, 'Custom text 1', VALUE_OPTIONAL),
                // 'customtext2' => new external_value(PARAM_RAW, 'Custom text 2', VALUE_OPTIONAL),
                // 'customtext3' => new external_value(PARAM_RAW, 'Custom text 3', VALUE_OPTIONAL),
                // 'customtext4' => new external_value(PARAM_RAW, 'Custom text 4', VALUE_OPTIONAL),
                'timecreated' => new external_value(PARAM_INT, 'Time created'),
                'timemodified' => new external_value(PARAM_INT, 'Time modified'),
                // 'groupinfo' => new external_single_structure([
                //     'id' => new external_value(PARAM_INT, 'Group ID'),
                //     'name' => new external_value(PARAM_RAW, 'Group name')
                // ], 'Group information', VALUE_OPTIONAL)
            ])
        );
    }
}
