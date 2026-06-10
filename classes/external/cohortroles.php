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
use context_system;
use core\task\manager as task_manager;
use moodle_exception;
use tool_cohortroles\api as tool_cohortroles_api;
defined('MOODLE_INTERNAL') || die();

/**
 * Thin external API wrapping tool_cohortroles\api for the Cohort Manager SPA.
 *
 * @package    local_cohortmanager
 * @category   external
 * @copyright  2025 Davison Almeida <ramosdealmeidas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class cohortroles extends external_api
{

    public static function list_cohort_role_assignments_parameters()
    {
        return new external_function_parameters([
            'cohortid' => new external_value(PARAM_INT, 'Filter by cohort ID', VALUE_DEFAULT, 0),
            'page' => new external_value(PARAM_INT, 'Page number (0-indexed)', VALUE_DEFAULT, 0),
            'perpage' => new external_value(PARAM_INT, 'Records per page', VALUE_DEFAULT, 25),
        ]);
    }

    /**
     * List cohort role assignments with enriched data + total count.
     *
     * Delegates listing to tool_cohortroles\api::list_cohort_role_assignments()
     * and count to tool_cohortroles\api::count_cohort_role_assignments().
     *
     * @param int $cohortid
     * @param int $page
     * @param int $perpage
     * @return array
     */
    public static function list_cohort_role_assignments($cohortid, $page, $perpage)
    {
        global $DB;

        $params = self::validate_parameters(self::list_cohort_role_assignments_parameters(), [
            'cohortid' => $cohortid,
            'page' => $page,
            'perpage' => $perpage,
        ]);

        $context = context_system::instance();
        self::validate_context($context);
        require_capability('moodle/role:manage', $context);

        $filters = [];
        if ($params['cohortid']) {
            $filters['cohortid'] = $params['cohortid'];
        }

        $total = tool_cohortroles_api::count_cohort_role_assignments();
        $records = tool_cohortroles_api::list_cohort_role_assignments(
            'id', 'ASC', $params['page'] * $params['perpage'], $params['perpage']
        );

        $result = [];
        foreach ($records as $record) {
            if ($params['cohortid'] && $record->get('cohortid') != $params['cohortid']) {
                continue;
            }

            $userid = $record->get('userid');
            $roleid = $record->get('roleid');
            $cohortid = $record->get('cohortid');

            $user = $DB->get_record('user', ['id' => $userid], 'id, firstname, lastname, email', IGNORE_MISSING);
            $role = $DB->get_record('role', ['id' => $roleid], 'id, name, shortname', IGNORE_MISSING);
            $cohort = $DB->get_record('cohort', ['id' => $cohortid], 'id, name', IGNORE_MISSING);
            $userroleassignments = $DB->count_records_sql(
                'SELECT COUNT(DISTINCT ra.id)
                FROM {role_assignments} ra
                JOIN {context} ctx ON ctx.id = ra.contextid AND ctx.contextlevel = ?
                JOIN {cohort_members} cm ON cm.userid = ctx.instanceid
                WHERE cm.cohortid = ? AND ra.roleid = ? AND ra.userid = ? AND ra.component = ?',
                [CONTEXT_USER, $cohortid, $roleid, $userid, 'tool_cohortroles']
            );

            $result[] = [
                'id' => $record->get('id'),
                'userid' => $userid,
                'userfullname' => $user ? fullname($user) : '',
                'useremail' => $user ? $user->email : '',
                'roleid' => $roleid,
                'rolename' => $role ? role_get_name($role) : '',
                'roleshortname' => $role ? $role->shortname : '',
                'cohortid' => $cohortid,
                'cohortname' => $cohort ? $cohort->name : '',
                'userroleassignmentscount' => $userroleassignments,
                'timecreated' => $record->get('timecreated'),
            ];
        }

        $filteredtotal = $total;
        if ($params['cohortid']) {
            $filteredtotal = $DB->count_records('tool_cohortroles', ['cohortid' => $params['cohortid']]);
        }

        $synctask = task_manager::get_scheduled_task('\\tool_cohortroles\\task\\cohort_role_sync');
        $lastruntime = $synctask ? $synctask->get_last_run_time() : 0;
        $nextruntime = $synctask ? $synctask->get_next_run_time() : 0;

        return [
            'assignments' => $result,
            'total' => $filteredtotal,
            'lastruntime' => $lastruntime,
            'nextruntime' => $nextruntime,
        ];
    }

    public static function list_cohort_role_assignments_returns()
    {
        return new external_single_structure([
            'assignments' => new external_multiple_structure(
                new external_single_structure([
                    'id' => new external_value(PARAM_INT, 'Assignment ID'),
                    'userid' => new external_value(PARAM_INT, 'User ID'),
                    'userfullname' => new external_value(PARAM_RAW, 'User full name'),
                    'useremail' => new external_value(PARAM_RAW, 'User email'),
                    'roleid' => new external_value(PARAM_INT, 'Role ID'),
                    'rolename' => new external_value(PARAM_RAW, 'Role name'),
                    'roleshortname' => new external_value(PARAM_RAW, 'Role short name'),
                    'cohortid' => new external_value(PARAM_INT, 'Cohort ID'),
                    'cohortname' => new external_value(PARAM_RAW, 'Cohort name'),
                    'userroleassignmentscount' => new external_value(PARAM_INT, 'Number of role assignments created for user by tool_cohortroles'),
                    'timecreated' => new external_value(PARAM_INT, 'Time created'),
                ])
            ),
            'total' => new external_value(PARAM_INT, 'Total matching assignments'),
            'lastruntime' => new external_value(PARAM_INT, 'Last sync task run timestamp'),
            'nextruntime' => new external_value(PARAM_INT, 'Next sync task run timestamp'),
        ]);
    }

    public static function delete_cohort_role_assignment_parameters()
    {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'Assignment ID to delete'),
        ]);
    }

    /**
     * Delete a cohort role assignment. Delegates to tool_cohortroles\api::delete_cohort_role_assignment().
     *
     * @param int $id
     * @return array
     */
    public static function delete_cohort_role_assignment($id)
    {
        $params = self::validate_parameters(self::delete_cohort_role_assignment_parameters(), [
            'id' => $id,
        ]);

        $context = context_system::instance();
        self::validate_context($context);
        require_capability('moodle/role:manage', $context);

        tool_cohortroles_api::delete_cohort_role_assignment($params['id']);

        return [
            'success' => true,
            'message' => get_string('cohortroleassignmentdeleted', 'local_cohortmanager'),
        ];
    }

    public static function delete_cohort_role_assignment_returns()
    {
        return new external_single_structure([
            'success' => new external_value(PARAM_BOOL, 'Whether the deletion was successful'),
            'message' => new external_value(PARAM_RAW, 'Success or error message'),
        ]);
    }
}
