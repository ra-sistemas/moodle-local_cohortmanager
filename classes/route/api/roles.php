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

use core\param;
use core\router\route;
use core\router\schema\parameters\query_parameter;
use core\router\schema\response\payload_response;
use core\router\schema\response\content\payload_response_type;
use core\router\schema\request_body;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Roles routes for Cohort Manager.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
#[route(
    path: '/roles',
)]
class roles {

    /**
     * List all user-context assignable roles.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return payload_response
     */
    #[route(
        title: 'List roles',
        description: 'List all user-context assignable roles with search and pagination',
        queryparams: [
            new query_parameter(
                name: 'query',
                type: param::RAW,
                default: '',
            ),
            new query_parameter(
                name: 'page',
                type: param::INT,
                default: 0,
            ),
            new query_parameter(
                name: 'perpage',
                type: param::INT,
                default: 25,
            ),
        ],
    )]
    public function list_roles(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): payload_response {
        $context = \context_system::instance();
        $this->require_capability('moodle/role:manage', $context);

        $params = $request->getQueryParams();

        $result = \local_cohortmanager\external\roles::get_user_context_roles(
            $params['query'] ?? '',
            (int) ($params['page'] ?? 0),
            (int) ($params['perpage'] ?? 25),
        );

        return new payload_response($result, $request, $response);
    }

    /**
     * Fetch a single role.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param int $roleid
     * @return payload_response
     */
    #[route(
        path: '/{roleid}',
        title: 'Fetch a role',
        description: 'Fetch a single role by ID',
        pathtypes: [
            new \core\router\schema\parameters\path_parameter(
                name: 'roleid',
                type: param::INT,
            ),
        ],
    )]
    public function get_role(
        ServerRequestInterface $request,
        ResponseInterface $response,
        int $roleid,
    ): payload_response {
        $context = \context_system::instance();
        $this->require_capability('moodle/role:manage', $context);

        $role = \local_cohortmanager\external\roles::get_role($roleid);

        return new payload_response($role, $request, $response);
    }

    /**
     * Create a new user-context role.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return payload_response
     */
    #[route(
        method: ['POST'],
        title: 'Create a role',
        description: 'Create a new role scoped to user context',
        requestbody: new request_body(
            content: new payload_response_type(
                required: true,
                schema: new \core\router\schema\objects\schema_object(
                    content: [
                        'shortname' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                        'name' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                        'description' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                        'archetype' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                    ],
                ),
            ),
        ),
        responses: [
            new \core\router\schema\response\response(
                statuscode: 200,
                description: 'The created role',
            ),
        ],
    )]
    public function create_role(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): payload_response {
        $context = \context_system::instance();
        $this->require_capability('moodle/role:manage', $context);

        $values = $request->getParsedBody();

        $role = \local_cohortmanager\external\roles::create_role(
            $values['shortname'] ?? '',
            $values['name'] ?? '',
            $values['description'] ?? '',
            $values['archetype'] ?? '',
        );

        return new payload_response($role, $request, $response);
    }

    /**
     * Update a role description.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param int $roleid
     * @return payload_response
     */
    #[route(
        path: '/{roleid}',
        method: ['PUT'],
        title: 'Update a role',
        description: 'Update a role description',
        pathtypes: [
            new \core\router\schema\parameters\path_parameter(
                name: 'roleid',
                type: param::INT,
            ),
        ],
        requestbody: new request_body(
            content: new payload_response_type(
                required: true,
                schema: new \core\router\schema\objects\schema_object(
                    content: [
                        'description' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                    ],
                ),
            ),
        ),
        responses: [
            new \core\router\schema\response\response(
                statuscode: 200,
                description: 'The updated role',
            ),
        ],
    )]
    public function update_role(
        ServerRequestInterface $request,
        ResponseInterface $response,
        int $roleid,
    ): payload_response {
        $context = \context_system::instance();
        $this->require_capability('moodle/role:manage', $context);

        $values = $request->getParsedBody();

        $role = \local_cohortmanager\external\roles::update_role(
            $roleid,
            $values['description'] ?? '',
        );

        return new payload_response($role, $request, $response);
    }

    /**
     * Delete a role.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param int $roleid
     * @return payload_response
     */
    #[route(
        path: '/{roleid}',
        method: ['DELETE'],
        title: 'Delete a role',
        description: 'Delete a role',
        pathtypes: [
            new \core\router\schema\parameters\path_parameter(
                name: 'roleid',
                type: param::INT,
            ),
        ],
    )]
    public function delete_role(
        ServerRequestInterface $request,
        ResponseInterface $response,
        int $roleid,
    ): payload_response {
        $context = \context_system::instance();
        $this->require_capability('moodle/role:manage', $context);

        $result = \local_cohortmanager\external\roles::delete_role($roleid);

        return new payload_response(['deleted' => (bool) $result], $request, $response);
    }

    /**
     * Require a logged-in user with the given capability, throwing a response-aware
     * access_denied exception if they cannot access the resource.
     *
     * @param string $capability
     * @param \core\context $context
     * @throws \core\exception\access_denied_exception
     */
    protected function require_capability(string $capability, \core\context $context): void {
        require_login();

        if (!has_capability($capability, $context)) {
            throw new \core\exception\access_denied_exception(
                'You do not have the required capability to perform this action.',
            );
        }
    }
}