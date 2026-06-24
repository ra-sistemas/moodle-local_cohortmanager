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
use moodle_exception;
use context_course;
use context_system;

/**
 * Class enrols
 *
 * @package    local_cohortmanager
 * @copyright  2025 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class enrols extends external_api
{

    /**
     * Returns description of method parameters
     *
     * @return external_function_parameters
     */
    public static function get_cohort_enrol_instances_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'ID of the cohort'),
            'page' => new external_value(PARAM_INT, 'Page number (0-indexed)', VALUE_DEFAULT, 0),
            'perpage' => new external_value(PARAM_INT, 'Records per page', VALUE_DEFAULT, 25),
        ]);
    }

    /**
     * Get all enrol instances of enrol=cohort that the customint1 field is equal to the cohortid
     *
     * @param int $cohortid ID of the cohort
     * @return array Array of enrol instances
     */
    public static function get_cohort_enrol_instances($cohortid, $page, $perpage)
    {
        global $DB;

        $params = self::validate_parameters(self::get_cohort_enrol_instances_parameters(), [
            'cohortid' => $cohortid,
            'page' => $page,
            'perpage' => $perpage,
        ]);

        $context = context_system::instance();
        self::validate_context($context);
        require_capability('enrol/cohort:config', $context);

        $sql = "SELECT e.*, c.fullname, c.shortname
                  FROM {enrol} e
                  JOIN {course} c ON e.courseid = c.id
                 WHERE e.enrol = 'cohort' AND e.customint1 = :cohortid
                 ORDER BY c.fullname";

        $total = $DB->count_records_sql(
            "SELECT COUNT(*) FROM {enrol} WHERE enrol = 'cohort' AND customint1 = :cohortid",
            ['cohortid' => $params['cohortid']]
        );

        $enrolinstances = $DB->get_records_sql(
            $sql,
            ['cohortid' => $params['cohortid']],
            $params['page'] * $params['perpage'],
            $params['perpage']
        );

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
                'coursefullname' => format_string($instance->fullname, true, ['context' => $coursecontext]),
                'courseshortname' => $instance->shortname,
                'roleid' => $instance->roleid,
                'rolename' => $rolename,
                'status' => $instance->status,
                'cohortid' => $instance->customint1,
                'groupid' => $instance->customint2,
                'groupname' => $instance->customint2 ? groups_get_group_name($instance->customint2) : null,
                'groupmembers' => self::count_group_members($instance->id),
                'enroled' => self::count_enrols($instance->id),
                'timecreated' => usertime($instance->timecreated),
                'timemodified' => usertime($instance->timemodified),
            ];
        }

        return [
            'instances' => $result,
            'total' => $total,
        ];
    }

    /**
     * Returns description of method result value
     *
     * @return external_single_structure
     */
    public static function get_cohort_enrol_instances_returns()
    {
        return new external_single_structure([
            'instances' => new external_multiple_structure(
                new external_single_structure([
                    'id' => new external_value(PARAM_INT, 'ID of the enrol instance'),
                    'courseid' => new external_value(PARAM_INT, 'ID of the course'),
                    'coursefullname' => new external_value(PARAM_RAW, 'Name of the course'),
                    'courseshortname' => new external_value(PARAM_RAW, 'Short name of the course'),
                    'roleid' => new external_value(PARAM_INT, 'ID of the role'),
                    'rolename' => new external_value(PARAM_RAW, 'Name of the role'),
                    'status' => new external_value(PARAM_INT, 'Status of the enrol instance'),
                    'cohortid' => new external_value(PARAM_INT, 'Custom integer 1 (cohort ID)'),
                    'enroled' => new external_value(PARAM_INT, 'Counter of users enroled in instances'),
                    'groupid' => new external_value(PARAM_INT, 'Custom integer 2 (group ID)'),
                    'groupname' => new external_value(PARAM_RAW, 'Group name'),
                    'groupmembers' => new external_value(PARAM_INT, 'Group members counter'),
                    'timecreated' => new external_value(PARAM_INT, 'Time created'),
                    'timemodified' => new external_value(PARAM_INT, 'Time modified'),
                ])
            ),
            'total' => new external_value(PARAM_INT, 'Total number of enrol instances'),
        ]);
    }

    /**
     * Parameter description for count_cohort_enrol_instances().
     *
     * @return external_function_parameters
     */
    public static function count_cohort_enrol_instances_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'The cohort id')
        ]);
    }

    /**
     * Count the enrol instances of a specific cohort.
     *
     * @param int $cohortid The cohort id
     * @return array
     */
    public static function count_cohort_enrol_instances($cohortid)
    {
        global $DB;

        // Validate parameters.
        $params = self::validate_parameters(self::count_cohort_enrol_instances_parameters(), [
            'cohortid' => $cohortid
        ]);

        $context = context_system::instance();
        self::validate_context($context);
        require_capability('moodle/cohort:view', $context);

        return self::count_cohort_enrol_instances_raw($params['cohortid']);
    }

    /**
     * Count the enrol instances of a cohort without re-validating context/capabilities.
     *
     * Intended for internal use by callers that have already validated access
     * (e.g. search_cohorts_with_total), to avoid redundant checks in a loop.
     *
     * @param int $cohortid The cohort id
     * @return int
     */
    public static function count_cohort_enrol_instances_raw($cohortid)
    {
        global $DB;

        // Count enrol instances where customint1 equals the cohortid.
        return $DB->count_records_sql(
            "SELECT COUNT(*) FROM {enrol} WHERE enrol = 'cohort' AND customint1 = :cohortid",
            ['cohortid' => (int) $cohortid]
        );
    }

    /**
     * Return description for count_cohort_enrol_instances().
     *
     * @return external_value
     */
    public static function count_cohort_enrol_instances_returns()
    {
        return new external_value(PARAM_INT, 'The number of enrol instances for the cohort');
    }

    /**
     * Parameter description for get_potential_cohort_courses().
     *
     * @return external_function_parameters
     */
    public static function get_potential_cohort_courses_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'The cohort id'),
            'query' => new external_value(PARAM_TEXT, 'The query string to search'),
            'excludecourseids' => new external_multiple_structure(
                new external_value(PARAM_INT, 'Course ID to exclude from search'),
                'List of course IDs to exclude from search results',
                VALUE_DEFAULT,
                []
            ),
        ]);
    }

    /**
     * Get potential courses to create enrol_cohort instances
     *
     * @param int    $cohortid The cohort id
     * @param string $query    The search string to match against fullname, shortname, or idnumber
     * @param array  $excludecourseids List of course IDs to exclude from search results
     *
     * @return array of course records
     */
    public static function get_potential_cohort_courses($cohortid, $query, $excludecourseids = [])
    {
        global $DB;

        $params = self::validate_parameters(self::get_potential_cohort_courses_parameters(), [
            'cohortid' => $cohortid,
            'query' => $query,
            'excludecourseids' => $excludecourseids
        ]);

        $context = context_system::instance();
        self::validate_context($context);
        require_capability('enrol/cohort:config', $context);

        $params = [
            'cohortid' => $cohortid,
            'query' => "%{$query}%",
            'contextlevel' => CONTEXT_COURSE
        ];

        $sql = "SELECT DISTINCT c.id, c.fullname
            FROM {course} c
            JOIN {role_context_levels} rcl ON rcl.contextlevel = :contextlevel
            LEFT JOIN {enrol} e
                ON e.courseid = c.id
                AND e.enrol = 'cohort'
                AND e.customint1 = :cohortid
                AND e.roleid = rcl.roleid
            WHERE e.id IS NULL
                AND c.id > 1
        ";

        if (!empty($excludecourseids)) {
            [$insql, $inparams] = $DB->get_in_or_equal($excludecourseids, SQL_PARAMS_NAMED, 'exclude_', false);
            $sql .= " AND c.id {$insql}";
            $params = array_merge($params, $inparams);
        }

        if (!empty($query)) {

            $fullnamelike =  $DB->sql_like('LOWER(c.fullname)', ':fullname');
            $shortnamelike = $DB->sql_like('LOWER(c.shortname)', ':shortname');
            $idnumberlike = $DB->sql_like('LOWER(c.idnumber)', ':idnumber');

            $sql .= " AND ({$fullnamelike} OR {$shortnamelike} OR {$idnumberlike})";

            $params['fullname'] = $params['query'];
            $params['shortname'] = $params['query'];
            $params['idnumber'] = $params['query'];
        }

        unset($params['query']);

        return $DB->get_records_sql($sql, $params);
    }

    /**
     * Return description for get_potential_cohort_courses().
     *
     * @return external_value
     */
    public static function get_potential_cohort_courses_returns()
    {
        return new external_multiple_structure(
            new external_single_structure([
                'id' => new external_value(PARAM_INT, 'ID of potential course'),
                'fullname' => new external_value(PARAM_TEXT, 'Fullname of potential course'),
            ])
        );
    }

    /**
     * Parameter description for get_cohort_course_roles().
     *
     * @return external_function_parameters
     */
    public static function get_cohort_course_roles_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'The cohort id'),
            'courseid' => new external_value(PARAM_INT, 'The course id'),
            'enrolinstanceid' => new external_value(PARAM_INT, 'The enrol instance id (optional, for editing mode)', VALUE_DEFAULT, 0),
        ]);
    }

    /**
     * Returns a list of roles that are valid for the course context
     * but are NOT currently assigned to the specific cohort enrolment instance.
     * When editing an existing instance, the current instance is excluded from the check.
     *
     * @param int $cohortid The cohort id
     * @param int $courseid The course id
     * @param int $enrolinstanceid The enrol instance id (optional, for editing mode)
     *
     * @return array
     * @throws moodle_exception
     */
    public static function get_cohort_course_roles($cohortid, $courseid, $enrolinstanceid = 0)
    {
        global $DB;

        $params = self::validate_parameters(self::get_cohort_course_roles_parameters(), [
            'cohortid' => $cohortid,
            'courseid' => $courseid,
            'enrolinstanceid' => $enrolinstanceid
        ]);

        if (!$DB->record_exists('course', ['id' => $params['courseid']])) {
            throw new moodle_exception('invalidcourse', 'cohort', '', $params['courseid']);
        }

        if (!$DB->record_exists('cohort', ['id' => $params['cohortid']])) {
            throw new moodle_exception('invalidcohort', 'cohort', '', $params['cohortid']);
        }

        $params['contextlevel'] = CONTEXT_COURSE;

        $context_course = context_course::instance($params['courseid']);
        self::validate_context($context_course);
        require_capability('enrol/cohort:config', $context_course);

        $sql = "SELECT r.id
            FROM {role} r
            JOIN {role_context_levels} rcl ON rcl.roleid = r.id
            LEFT JOIN {enrol} e
                ON (
                    e.roleid = r.id
                    AND e.enrol = 'cohort'
                    AND e.courseid = :courseid
                    AND e.customint1 = :cohortid
                )
            WHERE rcl.contextlevel = :contextlevel
                AND e.id IS NOT NULL
        ";

        // Add exclusion for current enrol instance when editing
        if (!empty($params['enrolinstanceid'])) {
            $sql .= " AND e.id <> :enrolinstanceid";
        }

        $sql .= " ORDER BY r.name ASC";

        $roleids = $DB->get_fieldset_sql($sql, $params);

        $course_roles = get_assignable_roles($context_course);

        $roles = [];

        foreach ($course_roles as $roleid => $rolename) {
            if (!in_array($roleid, $roleids)) {
                $roles[] = [
                    'id' => $roleid,
                    'name' => $rolename
                ];
            }
        }

        return $roles;
    }

    /**
     * Return description for get_cohort_course_roles().
     *
     * @return external_multiple_structure
     */
    public static function get_cohort_course_roles_returns()
    {
        return new external_multiple_structure(
            new external_single_structure([
                'id' => new external_value(PARAM_INT, 'ID of role'),
                'name' => new external_value(PARAM_TEXT, 'Role name'),
            ])
        );
    }

    private static function count_enrols($instanceid)
    {
        global $DB;
        return $DB->count_records(
            'user_enrolments',
            [
                'enrolid' => $instanceid
            ]
        );
    }

    private static function count_group_members($intanceid)
    {
        return count(groups_get_members($intanceid));
    }

    /**
     * Parameter description for get_course_groups().
     *
     * @return external_function_parameters
     */
    public static function get_course_groups_parameters()
    {
        return new external_function_parameters([
            'courseid' => new external_value(PARAM_INT, 'The course id'),
        ]);
    }

    /**
     * Get all groups for a specific course
     *
     * @param int $courseid The course id
     * @return array of groups
     */
    public static function get_course_groups($courseid)
    {
        global $DB;

        $params = self::validate_parameters(self::get_course_groups_parameters(), [
            'courseid' => $courseid
        ]);

        // Verify course exists
        if (!$DB->record_exists('course', ['id' => $params['courseid']])) {
            throw new moodle_exception('invalidcourse', 'cohort', '', $params['courseid']);
        }

        $coursecontext = context_course::instance($params['courseid']);
        self::validate_context($coursecontext);
        require_capability('enrol/cohort:config', $coursecontext);
        $groups = groups_get_all_groups($params['courseid'], 0, 0, 'g.id, g.name, g.description');

        $result = [];

        // Add option to no group
        $result[] = [
            'id' => 0,
            'name' => get_string('none'),
            'description' => ''
        ];

        // Add option to create new group
        $result[] = [
            'id' => -1,
            'name' => get_string('creategroup', 'enrol_cohort'),
            'description' => ''
        ];

        foreach ($groups as $group) {
            $result[] = [
                'id' => $group->id,
                'name' => format_string($group->name, true, ['context' => $coursecontext]),
                'description' => format_text($group->description, $group->descriptionformat, ['context' => $coursecontext])
            ];
        }

        return $result;
    }

    /**
     * Return description for get_course_groups().
     *
     * @return external_multiple_structure
     */
    public static function get_course_groups_returns()
    {
        return new external_multiple_structure(
            new external_single_structure([
                'id' => new external_value(PARAM_INT, 'ID of the group'),
                'name' => new external_value(PARAM_TEXT, 'Name of the group'),
                'description' => new external_value(PARAM_RAW, 'Description of the group'),
            ])
        );
    }

    /**
     * Parameter description for create_cohort_enrol_instances().
     *
     * @return external_function_parameters
     */
    public static function create_cohort_enrol_instances_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'The cohort id'),
            'courses' => new external_multiple_structure(
                new external_single_structure([
                    'courseid' => new external_value(PARAM_INT, 'ID of the course'),
                    'roleid' => new external_value(PARAM_INT, 'ID of the role'),
                    'status' => new external_value(PARAM_INT, 'Status of the enrol instance (0 = inactive, 1 = active)'),
                    'groupid' => new external_value(PARAM_INT, 'ID of the group (optional, -1 to create new group)', VALUE_DEFAULT, 0),
                ]),
                'List of courses with role, status and group to create enrol instances'
            ),
        ]);
    }

    /**
     * Create cohort enrol instances for multiple courses with optional group assignment
     *
     * @param int $cohortid The cohort id
     * @param array $courses List of courses with role, status and group
     * @return array
     */
    public static function create_cohort_enrol_instances($cohortid, $courses)
    {
        global $DB, $CFG;

        // Validate parameters.
        $params = self::validate_parameters(self::create_cohort_enrol_instances_parameters(), [
            'cohortid' => $cohortid,
            'courses' => $courses
        ]);

        $context = context_system::instance();
        self::validate_context($context);
        require_capability('enrol/cohort:config', $context);

        // Verify cohort exists
        if (!$DB->record_exists('cohort', ['id' => $params['cohortid']])) {
            throw new moodle_exception('invalidcohort', 'cohort', '', $params['cohortid']);
        }

        $created_count = 0;
        $errors = [];

        // Create enrol instance
        $enrol_plugin = enrol_get_plugin('cohort');
        if (!$enrol_plugin) {
            throw new moodle_exception('enrolpluginnotfound', 'enrol_cohort');
        }

        foreach ($params['courses'] as $course_data) {

            $course = $DB->get_record('course', ['id' => $course_data['courseid']]);
            if (!$course) {
                $errors[] = get_string('errorcoursenotfound', 'local_cohortmanager', $course_data['courseid']);
                continue;
            }

            $context = context_course::instance($course_data['courseid']);
            if (!has_capability('enrol/cohort:config', $context)) {
                $errors[] = get_string('errornopermissionforcourse', 'local_cohortmanager', $course_data['courseid']);
                continue;
            }
            if (!$DB->record_exists('role', ['id' => $course_data['roleid']])) {
                $a = new \stdClass();
                $a->roleid = $course_data['roleid'];
                $a->courseid = $course_data['courseid'];
                $errors[] = get_string('errorrolenotfoundforcourse', 'local_cohortmanager', $a);
                continue;
            }

            $existing_enrol = $DB->get_record('enrol', [
                'enrol' => 'cohort',
                'courseid' => $course_data['courseid'],
                'customint1' => $params['cohortid'],
                'roleid' => $course_data['roleid']
            ]);

            if ($existing_enrol) {
                $a = new \stdClass();
                $a->courseid = $course_data['courseid'];
                $a->roleid = $course_data['roleid'];
                $errors[] = get_string('errorenrolinstancealreadyexists', 'local_cohortmanager', $a);
                continue;
            }

            $fields = [
                'enrol' => 'cohort',
                'status' => $course_data['status'],
                'roleid' => $course_data['roleid'],
                'customint1' => $params['cohortid'],
                'customint2' => $course_data['groupid'],
            ];

            $instanceid = $enrol_plugin->add_instance($course, $fields);

            if ($instanceid) {
                $created_count++;
            } else {
                $errors[] = get_string('errorfailedtocreateenrolinstance', 'local_cohortmanager', $course_data['courseid']);
            }
        }

        return [
            'created_count' => $created_count,
            'errors' => $errors
        ];
    }

    /**
     * Return description for create_cohort_enrol_instances().
     *
     * @return external_single_structure
     */
    public static function create_cohort_enrol_instances_returns()
    {
        return new external_single_structure([
            'created_count' => new external_value(PARAM_INT, 'Number of enrol instances created successfully'),
            'errors' => new external_multiple_structure(
                new external_value(PARAM_RAW, 'Error messages for failed creations'),
                'List of error messages'
            ),
        ]);
    }

    /**
     * Parameter description for delete_cohort_enrol_instance().
     *
     * @return external_function_parameters
     */
    public static function delete_cohort_enrol_instance_parameters()
    {
        return new external_function_parameters([
            'enrolinstanceid' => new external_value(PARAM_INT, 'The enrol instance id to delete'),
        ]);
    }

    /**
     * Delete a cohort enrol instance
     *
     * @param int $enrolinstanceid The enrol instance id to delete
     * @return array
     */
    public static function delete_cohort_enrol_instance($enrolinstanceid)
    {
        global $DB;

        // Validate parameters
        $params = self::validate_parameters(self::delete_cohort_enrol_instance_parameters(), [
            'enrolinstanceid' => $enrolinstanceid
        ]);

        // Get the enrol instance
        $instance = $DB->get_record('enrol', [
            'id' => $params['enrolinstanceid'],
            'enrol' => 'cohort'
        ]);

        if (!$instance) {
            throw new moodle_exception('invalidinstance', 'enrol_cohort', '', $params['enrolinstanceid']);
        }

        // Get the cohort enrol plugin
        $enrol_plugin = enrol_get_plugin('cohort');
        if (!$enrol_plugin) {
            throw new moodle_exception('enrolpluginnotfound', 'enrol_cohort');
        }

        // Check if user can delete this instance
        $context = context_course::instance($instance->courseid);
        self::validate_context($context);

        if (!$enrol_plugin->can_delete_instance($instance)) {
            throw new moodle_exception('nopermissions', 'error', '', 'enrol/cohort:config');
        }

        // Delete the instance using the plugin method
        $enrol_plugin->delete_instance($instance);

        return [
            'success' => true,
            'message' => get_string('enrolinstancedeletedsuccessfully', 'local_cohortmanager')
        ];
    }

    /**
     * Return description for delete_cohort_enrol_instance().
     *
     * @return external_single_structure
     */
    public static function delete_cohort_enrol_instance_returns()
    {
        return new external_single_structure([
            'success' => new external_value(PARAM_BOOL, 'Whether the deletion was successful'),
            'message' => new external_value(PARAM_TEXT, 'Success or error message'),
        ]);
    }

    public static function toggle_cohort_enrol_instance_status_parameters()
    {
        return new external_function_parameters([
            'enrolinstanceid' => new external_value(PARAM_INT, 'The enrol instance id to toggle status'),
        ]);
    }

    public static function toggle_cohort_enrol_instance_status($enrolinstanceid)
    {
        global $DB;

        $params = self::validate_parameters(self::toggle_cohort_enrol_instance_status_parameters(), [
            'enrolinstanceid' => $enrolinstanceid
        ]);

        $instance = $DB->get_record('enrol', [
            'id' => $params['enrolinstanceid'],
            'enrol' => 'cohort'
        ]);

        if (!$instance) {
            throw new moodle_exception('invalidinstance', 'enrol_cohort', '', $params['enrolinstanceid']);
        }

        $context = context_course::instance($instance->courseid);
        self::validate_context($context);
        require_capability('enrol/cohort:config', $context);

        $newstatus = $instance->status ? 0 : 1;
        $instance->status = $newstatus;
        $instance->timemodified = time();
        $DB->update_record('enrol', $instance);

        return [
            'success' => true,
            'status' => $newstatus,
            'message' => get_string('enrolinstancestatusupdated', 'local_cohortmanager')
        ];
    }

    public static function toggle_cohort_enrol_instance_status_returns()
    {
        return new external_single_structure([
            'success' => new external_value(PARAM_BOOL, 'Whether the toggle was successful'),
            'status' => new external_value(PARAM_INT, 'The new status value (0=inactive, 1=active)'),
            'message' => new external_value(PARAM_TEXT, 'Success or error message'),
        ]);
    }
}
