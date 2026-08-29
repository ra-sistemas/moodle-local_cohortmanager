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

namespace local_cohortmanager\route\api;

use core\tests\router\route_testcase;

/**
 * Tests for the Cohort Manager custom fields routes.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers \local_cohortmanager\route\api\custom_fields
 */
final class custom_fields_test extends route_testcase {

    /**
     * Load the Custom Fields route into the test route loader.
     */
    protected function setUp(): void {
        parent::setUp();
        $this->add_class_routes_to_route_loader(custom_fields::class);
    }

    /**
     * An admin can list cohort custom field categories.
     */
    public function test_list_custom_fields(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $response = $this->process_api_request('GET', '/custom-fields');

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response, forcearray: true);

        $this->assertIsArray($payload);
    }

    /**
     * A user without cohort:manage capability is denied.
     */
    public function test_list_custom_fields_requires_capability(): void {
        $this->resetAfterTest();

        $user = $this->getDataGenerator()->create_user();
        $this->setUser($user);

        $response = $this->process_api_request('GET', '/custom-fields');

        $this->assert_access_denied_response($response);
    }
}