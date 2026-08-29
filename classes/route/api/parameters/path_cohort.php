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

namespace local_cohortmanager\route\api\parameters;

use core\exception\not_found_exception;
use core\param;
use core\router\schema\parameters\mapped_property_parameter;
use core\router\schema\referenced_object;
use Psr\Http\Message\ServerRequestInterface;

/**
 * A Moodle parameter for a cohort identifier in the path.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class path_cohort extends \core\router\schema\parameters\path_parameter implements
    mapped_property_parameter,
    referenced_object
{
    /**
     * Create a new path_cohort parameter.
     *
     * @param string $name The name of the parameter to use for the cohort identifier
     * @param mixed ...$extra Additional arguments
     */
    public function __construct(
        string $name = 'cohort',
        ...$extra,
    ) {
        $extra['name'] = $name;
        $extra['type'] = param::INT;
        $extra['description'] = 'The id of the cohort.';
        $extra['examples'] = [
            new \core\router\schema\example(
                name: 'A cohort id',
                value: 5,
            ),
            new \core\router\schema\example(
                name: 'Another cohort id',
                value: 42,
            ),
        ];

        parent::__construct(...$extra);
    }

    /**
     * Get the cohort record for the given identifier.
     *
     * @param int $value The id of the cohort
     * @return object
     * @throws not_found_exception If the cohort cannot be found
     */
    protected function get_cohort_for_value(int $value): mixed {
        global $DB;

        $data = $DB->get_record('cohort', ['id' => $value]);

        if ($data) {
            return $data;
        }

        throw new not_found_exception('cohort', $value);
    }

    #[\Override]
    public function add_attributes_for_parameter_value(
        ServerRequestInterface $request,
        string $value,
    ): ServerRequestInterface {
        $cohort = $this->get_cohort_for_value((int) $value);

        return $request
            ->withAttribute($this->name, $cohort)
            ->withAttribute(
                "{$this->name}context",
                \core\context::instance_by_id($cohort->contextid),
            );
    }

    #[\Override]
    public function get_schema_from_type(param $type): \stdClass {
        $schema = parent::get_schema_from_type($type);

        $schema->pattern = "^\d+$";

        return $schema;
    }
}