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
use core_external\external_warnings;

/**
 * External API for Cohort Manager
 *
 * @package    local_cohortmanager
 * @category   external
 * @copyright  2025 REVVO <www.revvo.com.br>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class app extends external_api {

    /**
     * Returns description of method parameters
     *
     * @return external_function_parameters
     */
    public static function get_all_strings_parameters() {
        return new external_function_parameters([]);
    }

    /**
     * Returns all strings for the local_cohortmanager component
     *
     * @return array
     */
    public static function get_all_strings() {
        global $CFG;

        // Validate parameters
        $params = self::validate_parameters(self::get_all_strings_parameters(), []);

        // Get the current language
        $currentlang = current_language();

        // Get all strings for the current language
        $lang_strings = [];
        $langfile = $CFG->dirroot . '/local/cohortmanager/lang/' . $currentlang . '/local_cohortmanager.php';
        if (file_exists($langfile)) {
            $string = [];
            include($langfile);
            $lang_strings[$currentlang] = $string;
        }
        
        // Also get English strings as fallback
        if ($currentlang !== 'en') {
            $enlangfile = $CFG->dirroot . '/local/cohortmanager/lang/en/local_cohortmanager.php';
            if (file_exists($enlangfile)) {
                $string = [];
                include($enlangfile);
                $lang_strings['en'] = $string;
            }
        }

        // Format the result according to the expected structure
        $result = [];
        foreach ($lang_strings as $lang => $stringlist) {
            $langstrings = [];
            foreach ($stringlist as $identifier => $value) {
                $langstrings[] = [
                    'identifier' => $identifier,
                    'value' => $value
                ];
            }
            $result[] = [
                'language' => $lang,
                'strings' => $langstrings
            ];
        }

        return $result;
    }

    /**
     * Returns description of method result value
     *
     * @return external_multiple_structure
     */
    public static function get_all_strings_returns() {
        return new external_multiple_structure(
            new external_single_structure(
                array(
                    'language' => new external_value(PARAM_LANG, 'Language code'),
                    'strings' => new external_multiple_structure(
                        new external_single_structure(
                            array(
                                'identifier' => new external_value(PARAM_STRINGID, 'String identifier'),
                                'value' => new external_value(PARAM_RAW, 'String value'),
                            )
                        ),
                        'Strings for this language'
                    )
                )
            )
        );
    }
}
