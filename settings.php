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
 * Settings for cohort manager - toggles allowcohortthemes configuration
 *
 * @package    local_cohortmanager
 * @copyright  2025 REVVO <www.revvo.com.br>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use local_cohortmanager\admin\admin_setting_allowcohortthemes;

defined('MOODLE_INTERNAL') || die();

if (!function_exists('local_cohortmanager_write_setting')) {
    
}

if ($ADMIN->fulltree) {
    $settings = new admin_settingpage(
        'localcohortmanager',
        get_string('settings') . ' - ' . get_string('pluginname', 'local_cohortmanager')
    );

    $settings->add( new admin_setting_allowcohortthemes(
        'core/allowcohortthemes',
        get_string('allowcohortthemes', 'admin'),
        get_string('configallowcohortthemes', 'admin'),
        false
    ));

    $ADMIN->add(
        'localplugins',
        $settings
    );
}
