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
use GuzzleHttp\Psr7\Utils;

/**
 * Tests for the Cohort Manager cohort routes.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers \local_cohortmanager\route\api\cohorts
 * @covers \local_cohortmanager\route\api\parameters\path_cohort
 */
final class cohorts_test extends route_testcase {

    /**
     * Load the Cohort routes into the test route loader.
     */
    protected function setUp(): void {
        parent::setUp();
        $this->add_class_routes_to_route_loader(cohorts::class);
    }

    /**
     * A logged-in user without the cohort:view capability must be denied.
     */
    public function test_list_cohorts_requires_login_and_capability(): void {
        $this->resetAfterTest();

        $user = $this->getDataGenerator()->create_user();
        $this->setUser($user);

        $response = $this->process_api_request('GET', '/cohorts');

        $this->assert_access_denied_response($response);
    }

    /**
     * An admin can list cohorts.
     */
    public function test_list_cohorts_as_admin(): void {
        $this->resetAfterTest();

        $this->setAdminUser();
        $cohort1 = $this->getDataGenerator()->create_cohort(['name' => 'Cohort alpha']);
        $this->getDataGenerator()->create_cohort(['name' => 'Cohort beta']);

        $response = $this->process_api_request('GET', '/cohorts');

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response, forcearray: true);

        $this->assertArrayHasKey('cohorts', $payload);
        $this->assertArrayHasKey('total', $payload);
        $this->assertEquals(2, $payload['total']);

        $ids = array_column($payload['cohorts'], 'id');
        $this->assertContains((int) $cohort1->id, $ids);
    }

    /**
     * Listing cohorts honours the query parameter.
     */
    public function test_list_cohorts_search(): void {
        $this->resetAfterTest();

        $this->setAdminUser();
        $this->getDataGenerator()->create_cohort(['name' => 'Matching name']);
        $this->getDataGenerator()->create_cohort(['name' => 'Different name']);

        $response = $this->process_api_request('GET', '/cohorts?query=Matching');

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response, forcearray: true);

        $this->assertEquals(1, $payload['total']);
        $this->assertEquals('Matching name', $payload['cohorts'][0]['name']);
    }

    /**
     * An existing cohort can be fetched for its portrait data.
     */
    public function test_get_cohort(): void {
        $this->resetAfterTest();

        $this->setAdminUser();
        $cohort = $this->getDataGenerator()->create_cohort(['name' => 'Single cohort']);

        $response = $this->process_api_request('GET', "/cohorts/{$cohort->id}");

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response, forcearray: true);

        $this->assertEquals((int) $cohort->id, $payload['cohort']['id']);
        $this->assertEquals('Single cohort', $payload['cohort']['name']);
        $this->assertArrayHasKey('portrait', $payload);
        $this->assertEquals(0, $payload['portrait']['members']);
        $this->assertEquals(0, $payload['portrait']['enrols']);
    }

    /**
     * A cohort may be fetched for the edit form.
     */
    public function test_edit_cohort(): void {
        $this->resetAfterTest();

        $this->setAdminUser();
        $cohort = $this->getDataGenerator()->create_cohort(['name' => 'Editable cohort']);

        $response = $this->process_api_request('GET', "/cohorts/{$cohort->id}/edit");

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response, forcearray: true);

        $this->assertEquals((int) $cohort->id, $payload['cohort']['id']);
    }

    /**
     * Fetching a non-existent cohort must return a 404.
     */
    public function test_get_cohort_not_found(): void {
        $this->resetAfterTest();

        $this->setAdminUser();

        $response = $this->process_api_request('GET', '/cohorts/424242');

        $this->assert_not_found_response($response);
    }

    /**
     * An admin can create a cohort.
     */
    public function test_create_cohort(): void {
        $this->resetAfterTest();

        $this->setAdminUser();

        $response = $this->process_api_request(
            'POST',
            '/cohorts/create',
            body: Utils::streamFor(json_encode([
                'name' => 'New cohort',
                'idnumber' => 'NEW-1',
            ])),
        );

        $this->assert_valid_response($response);

        global $DB;
        $this->assertTrue(
            $DB->record_exists('cohort', ['name' => 'New cohort', 'idnumber' => 'NEW-1']),
        );
    }

    /**
     * Updating an existing cohort persists the changes.
     */
    public function test_update_cohort(): void {
        $this->resetAfterTest();

        $this->setAdminUser();
        $cohort = $this->getDataGenerator()->create_cohort(['name' => 'Before']);

        $response = $this->process_api_request(
            'PUT',
            "/cohorts/{$cohort->id}",
            body: Utils::streamFor(json_encode([
                'name' => 'After',
            ])),
        );

        $this->assert_valid_response($response);

        global $DB;
        $updated = $DB->get_record('cohort', ['id' => $cohort->id], '*', MUST_EXIST);
        $this->assertEquals('After', $updated->name);
    }
}