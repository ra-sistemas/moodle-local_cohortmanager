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
 * Route definition file for Cohort Manager.
 *
 * Note: Moodle's Routing subsystem (MDL-81301) does not use a per-component
 * `db/routes.php` file. Routes are discovered automatically from classes in
 * the `route` namespace of a component.
 *
 * The Cohort Manager routes are defined via the `#[core\router\route]`
 * attribute in the following classes:
 *
 *   - classes/route/api/cohorts.php       (list, detail, create, edit cohort)
 *   - classes/route/api/roles.php         (user-context roles management)
 *   - classes/route/api/custom_fields.php (cohort custom fields)
 *
 * Each route is exposed under the `api` route group, which resolves to the
 * URI prefix:
 *
 *   /api/rest/v2/local_cohortmanager/...
 *
 * See {@link https://moodledev.io/docs/4.5/apis/subsystems/routing}.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();