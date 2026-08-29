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
 * Tests for the Cohort Manager roles routes.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers \local_cohortmanager\route\api\roles
 */
final class roles_test extends route_testcase {

    /**
     * Load the Role routes into the test route loader.
     */
    protected function setUp(): void {
        parent::setUp();
        $this->add_class_routes_to_route_loader(roles::class);
    }

    /**
     * Create a user-context role and return its id.
     *
     * @param string $shortname
     * @param string $name
     * @return int
     */
    private function create_user_context_role(string $shortname, string $name): int {
        global $DB;
        $roleid = create_role($name, $shortname, '', '');
        set_role_contextlevels($roleid, [CONTEXT_USER]);
        return $roleid;
    }

    /**
     * An admin can list user-context roles.
     */
    public function test_list_roles(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $this->create_user_context_role('customrole1', 'Custom Role One');
        $this->create_user_context_role('customrole2', 'Custom Role Two');

        $response = $this->process_api_request('GET', '/roles');

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response, forcearray: true);

        $this->assertArrayHasKey('roles', $payload);
        $this->assertArrayHasKey('total', $payload);

        $shortnames = array_column($payload['roles'], 'shortname');
        $this->assertContains('customrole1', $shortnames);
        $this->assertContains('customrole2', $shortnames);
    }

    /**
     * A user without role:manage capability is denied.
     */
    public function test_list_roles_requires_capability(): void {
        $this->resetAfterTest();

        $user = $this->getDataGenerator()->create_user();
        $this->setUser($user);

        $response = $this->process_api_request('GET', '/roles');

        $this->assert_access_denied_response($response);
    }

    /**
     * An admin can fetch a single user-context role.
     */
    public function test_get_role(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $roleid = $this->create_user_context_role('sole_role', 'Sole Role');

        $response = $this->process_api_request('GET', "/roles/{$roleid}");

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response);

        $this->assertEquals($roleid, $payload->id);
        $this->assertEquals('sole_role', $payload->shortname);
    }

    /**
     * An admin can create a user-context role via POST /roles.
     */
    public function test_create_role(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $response = $this->process_api_request(
            'POST',
            '/roles',
            body: Utils::streamFor(json_encode([
                'shortname' => 'brand_new_role',
                'name' => 'Brand New Role',
                'description' => 'A fresh role',
            ])),
        );

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response);

        $this->assertTrue($payload->success);
        $this->assertEquals('brand_new_role', $payload->role->shortname);
    }

    /**
     * An admin can update a role's description.
     */
    public function test_update_role(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $roleid = $this->create_user_context_role('editable_role', 'Editable Role');

        $response = $this->process_api_request(
            'PUT',
            "/roles/{$roleid}",
            body: Utils::streamFor(json_encode([
                'description' => 'Updated description',
            ])),
        );

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response);

        $this->assertTrue($payload->success);
        $this->assertEquals('Updated description', $payload->role->description);
    }

    /**
     * An admin can delete a user-context role.
     */
    public function test_delete_role(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $roleid = $this->create_user_context_role('doomed_role', 'Doomed Role');

        $response = $this->process_api_request('DELETE', "/roles/{$roleid}");

        $this->assert_valid_response($response);
        $payload = $this->decode_response($response);

        $this->assertTrue($payload->deleted);

        global $DB;
        $this->assertFalse($DB->record_exists('role', ['id' => $roleid]));
    }
}