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
 * @copyright  2025 REVVO <www.revvo.com.br>
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
];

$services = [
    'local_cohortmanager' => [
        'functions' => [
            'local_cohortmanager_get_all_strings',
        ],
        'restrictedusers' => 0,
        'enabled' => 1,
        'shortname' => 'local_cohortmanager',
        'name' => 'Cohort Manager Service',
        'description' => 'Service for Cohort Manager external functions',
    ],
];