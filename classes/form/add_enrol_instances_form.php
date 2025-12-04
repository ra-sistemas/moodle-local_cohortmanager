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

namespace local_cohortmanager\form;

use core_form\dynamic_form;
use context_system;
use context;
use moodle_url;
use core_user;

defined('MOODLE_INTERNAL') || die();

// require_once($CFG->dirroot . '/cohort/lib.php');
// require_once($CFG->dirroot . '/enrol/locallib.php');

/**
 * Class add_enrol_instances_form
 *
 * @package    local_cohortmanager
 * @copyright  2025 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class add_enrol_instances_form extends dynamic_form
{
    /**
     * Form definition - adds form elements for adding cohort enrol instances
     */
    public function definition()
    {
        $mform = $this->_form;
        $cohortid = $this->optional_param('id', 0, PARAM_INT);

        // Hidden field for cohort ID
        $mform->addElement('hidden', 'id');
        $mform->setType('id', PARAM_INT);
        $mform->addElement('hidden', 'enrolmethod', 'cohort');
        $mform->setType('enrolmethod', PARAM_TEXT);

        $mform->addElement('course', 'courses', get_string('course'));
        $mform->addRule('courses', get_string('required'), 'required', null, 'client');

        // Status selection
        $statusoptions = [
            1 => get_string('active'),
            0 => get_string('inactive')
        ];
        $mform->addElement('select', 'status', get_string('status'), $statusoptions);

        $mform->setDefault('status', 1);
    }

    /**
     * Returns context where this form is used
     *
     * @return context
     */
    protected function get_context_for_dynamic_submission(): context
    {
        $cohortid = $this->optional_param('id', 0, PARAM_INT);
        if ($cohortid) {
            global $DB;
            $cohort = $DB->get_record('cohort', ['id' => $cohortid]);
            if ($cohort) {
                return context::instance_by_id($cohort->contextid);
            }
        }
        return context_system::instance();
    }

    /**
     * Checks if current user has access to this form, otherwise throws exception
     */
    protected function check_access_for_dynamic_submission(): void
    {
        $context = $this->get_context_for_dynamic_submission();
        require_capability('enrol/cohort:config', $context);
    }

    /**
     * Load in existing data as form defaults
     */
    public function set_data_for_dynamic_submission(): void
    {
        $data = (object)[
            'id' => $this->optional_param('id', 0, PARAM_INT),
        ];
        $this->set_data($data);
    }

    /**
     * Returns url to set in $PAGE->set_url() when form is being rendered or submitted via AJAX
     *
     * @return moodle_url
     */
    protected function get_page_url_for_dynamic_submission(): moodle_url
    {
        return new moodle_url('/local/cohortmanager/');
    }

    /**
     * Process the form submission, used if form was submitted via AJAX
     *
     * @return mixed
     */
    public function process_dynamic_submission()
    {
        global $DB;

        $cohortid = $this->optional_param('id', 0, PARAM_INT);
        $data = $this->get_data();

        $cohort = $DB->get_record(
            'cohort',
            array(
                'id' => $cohortid
            ),
            '*',
            MUST_EXIST
        );

        if ($cohort && isset($data->courses) && is_array($data->courses)) {

            foreach ($data->courses as $courseid) {
                // $this->add_enrol_instance($cohortid, $courseid, $data->enrolmethod, $data->status);
            }

            return true;
        }

        return false;
    }

    // /**
    //  * Add enrol instance to cohort
    //  *
    //  * @param int $cohortid
    //  * @param int $courseid
    //  * @param string $enrolmethod
    //  * @param int $status
    //  */
    // protected function add_enrol_instance($cohortid, $courseid, $enrolmethod, $status)
    // {
    //     global $DB;

    //     // Check if enrol instance already exists
    //     $existing = $DB->get_record('cohort_enrol_instances', [
    //         'cohortid' => $cohortid,
    //         'courseid' => $courseid,
    //         'enrolmethod' => $enrolmethod
    //     ]);

    //     if (!$existing) {
    //         $record = new \stdClass();
    //         $record->cohortid = $cohortid;
    //         $record->courseid = $courseid;
    //         $record->enrolmethod = $enrolmethod;
    //         $record->status = $status;
    //         $record->timecreated = time();
    //         $record->timemodified = time();

    //         $DB->insert_record('enrol', $record);
    //     }
    // }

}
