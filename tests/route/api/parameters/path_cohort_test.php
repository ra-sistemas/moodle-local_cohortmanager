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
use GuzzleHttp\Psr7\ServerRequest;

/**
 * Tests for the path_cohort mapped route parameter.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers \local_cohortmanager\route\api\parameters\path_cohort
 */
final class path_cohort_test extends \advanced_testcase {

    /**
     * Data provider for the constructor name parameter.
     *
     * @return array[]
     */
    public static function constructor_name_provider(): array {
        return [
            'default name' => ['cohort'],
            'custom name' => ['cohortid'],
        ];
    }

    /**
     * The constructor applies the cohort id as a positive integer parameter.
     *
     * @dataProvider constructor_name_provider
     * @param string $name
     */
    public function test_constructor_sets_int_parameter(string $name): void {
        $param = new path_cohort(name: $name);

        $this->assertEquals($name, $param->get_name());
        $this->assertEquals(param::INT, $param->get_type());
        $this->assertEquals('path', $param->get_in());
    }

    /**
     * An existing cohort adds itself and its context to the request attributes.
     */
    public function test_attribute_resolution_for_existing_cohort(): void {
        $this->resetAfterTest();

        $cohort = $this->getDataGenerator()->create_cohort();
        $expectedcontext = \core\context\system::instance();

        $param = new path_cohort();
        $request = new ServerRequest('GET', '/cohorts/' . $cohort->id);

        $routed = $param->add_attributes_for_parameter_value($request, (string) $cohort->id);

        $cohortattr = $routed->getAttribute('cohort');
        $this->assertEquals($cohort->id, $cohortattr->id);
        $this->assertEquals($expectedcontext->id, $routed->getAttribute('cohortcontext')->id);
    }

    /**
     * Resolving an unknown cohort identifier throws a not_found_exception.
     */
    public function test_attribute_resolution_for_unknown_cohort_throws(): void {
        $this->resetAfterTest();

        $param = new path_cohort();
        $request = new ServerRequest('GET', '/cohorts/999999');

        $this->expectException(not_found_exception::class);

        $param->add_attributes_for_parameter_value($request, '999999');
    }

    /**
     * The generated OpenAPI schema enforces a numeric pattern.
     */
    public function test_schema_pattern(): void {
        $param = new path_cohort();

        $schema = $param->get_schema_from_type(param::INT);

        $this->assertObjectHasProperty('pattern', $schema);
        $this->assertEquals('^\d+$', $schema->pattern);
    }
}