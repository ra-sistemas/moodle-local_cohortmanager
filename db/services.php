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
 * External functions and service declaration for Cohort Manager
 *
 * Documentation: {@link https://moodledev.io/docs/apis/subsystems/external/description}
 *
 * @package    local_cohortmanager
 * @category   webservice
 * @copyright  2025 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$functions = [
    'local_cohortmanager_get_all_strings' => [
        'classname'   => 'local_cohortmanager\\external\\app',
        'methodname' => 'get_all_strings',
        'description' => 'Returns all strings for the local_cohortmanager component',
        'type'       => 'read',
        'ajax' => true
    ],
    'local_cohortmanager_add_cohort_members' => [
        'classname' => 'core_cohort_external',
        'methodname' => 'add_cohort_members',
        'classpath' => 'cohort/externallib.php',
        'description' => 'Adds cohort members.',
        'type' => 'write',
        'capabilities' => 'moodle/cohort:assign',
        'ajax' => true
    ],
    'local_cohortmanager_create_cohorts' => [
        'classname' => 'core_cohort_external',
        'methodname' => 'create_cohorts',
        'classpath' => 'cohort/externallib.php',
        'description' => 'Creates new cohorts.',
        'type' => 'write',
        'capabilities' => 'moodle/cohort:manage',
        'ajax' => true
    ],
    'local_cohortmanager_delete_cohort_members' => [
        'classname' => 'core_cohort_external',
        'methodname' => 'delete_cohort_members',
        'classpath' => 'cohort/externallib.php',
        'description' => 'Deletes cohort members.',
        'type' => 'write',
        'capabilities' => 'moodle/cohort:assign',
        'ajax' => true
    ],
    'local_cohortmanager_delete_cohorts' => [
        'classname' => 'core_cohort_external',
        'methodname' => 'delete_cohorts',
        'classpath' => 'cohort/externallib.php',
        'description' => 'Deletes all specified cohorts.',
        'type' => 'write',
        'capabilities' => 'moodle/cohort:manage',
        'ajax' => true
    ],
    'local_cohortmanager_get_cohort_members' => [
        'classname' => 'core_cohort_external',
        'methodname' => 'get_cohort_members',
        'classpath' => 'cohort/externallib.php',
        'description' => 'Returns cohort members.',
        'type' => 'read',
        'capabilities' => 'moodle/cohort:view',
        'ajax' => true
    ],
    'local_cohortmanager_get_potential_cohort_members' => [
        'classname' => 'local_cohortmanager\\external\\members',
        'methodname' => 'get_potential_members',
        'description' => 'Get potential user to add in cohort.',
        'type' => 'read',
        'ajax' => true,
        'capabilities' => 'moodle/cohort:view'
    ],
    'local_cohortmanager_search_cohorts' => [
        'classname' => 'local_cohortmanager\\external\\app',
        'methodname' => 'search_cohorts_with_total',
        'description' => 'Search for cohorts with total count.',
        'type' => 'read',
        'ajax' => true,
        'capabilities' => 'moodle/cohort:view'
    ],
    'local_cohortmanager_get_cohorts' => [
        'classname' => 'core_cohort_external',
        'methodname' => 'get_cohorts',
        'classpath' => 'cohort/externallib.php',
        'description' => 'Returns cohort details.',
        'type' => 'read',
        'capabilities' => 'moodle/cohort:view',
        'ajax' => true
    ],
    'local_cohortmanager_update_cohorts' => [
        'classname' => 'core_cohort_external',
        'methodname' => 'update_cohorts',
        'classpath' => 'cohort/externallib.php',
        'description' => 'Updates existing cohorts.',
        'type' => 'write',
        'capabilities' => 'moodle/cohort:manage',
        'ajax' => true
    ],
    'local_cohortmanager_get_app_config' => [
        'classname'   => 'local_cohortmanager\\external\\app',
        'methodname' => 'get_app_config',
        'description' => 'Returns application configuration settings',
        'type'       => 'read',
        'ajax' => true
    ],
    'local_cohortmanager_get_cohort_context_info' => [
        'classname'   => 'local_cohortmanager\\external\\app',
        'methodname' => 'get_cohort_context_info',
        'description' => 'Returns cohort context information based on contextid',
        'type'       => 'read',
        'ajax' => true
    ]
];

$services = [
    'local_cohortmanager' => [
        'functions' => [
            'local_cohortmanager_get_all_strings',
            'local_cohortmanager_add_cohort_members',
            'local_cohortmanager_create_cohorts',
            'local_cohortmanager_delete_cohort_members',
            'local_cohortmanager_delete_cohorts',
            'local_cohortmanager_get_cohort_members',
            'local_cohortmanager_get_potential_cohort_members',
            'local_cohortmanager_search_cohorts',
            'local_cohortmanager_get_cohorts',
            'local_cohortmanager_update_cohorts',
            'local_cohortmanager_get_theme_list',
            'local_cohortmanager_get_app_config',
            'local_cohortmanager_get_cohort_context_info'
        ],
        'restrictedusers' => 0,
        'enabled' => 1,
        'shortname' => 'local_cohortmanager',
        'name' => 'Cohort Manager Service',
        'description' => 'Service for Cohort Manager external functions',
    ],
];
