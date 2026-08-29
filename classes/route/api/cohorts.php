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
use local_cohortmanager\route\api\parameters\path_cohort;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Cohort routes for Cohort Manager.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
#[route(
    path: '/cohorts',
)]
class cohorts {

    /**
     * List cohorts matching the query, with pagination.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return payload_response
     */
    #[route(
        title: 'List cohorts',
        description: 'List all cohorts with search and pagination',
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
        responses: [
            new \core\router\schema\response\response(
                statuscode: 200,
                description: 'A list of cohorts',
            ),
        ],
    )]
    public function list_cohorts(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): payload_response {
        global $CFG;
        require_once($CFG->dirroot . '/cohort/externallib.php');

        $context = \context_system::instance();
        $this->require_capability('moodle/cohort:view', $context);

        $params = $request->getQueryParams();

        $query = $params['query'] ?? '';
        $page = (int) ($params['page'] ?? 0);
        $perpage = (int) ($params['perpage'] ?? 25);

        $result = \core_cohort_external::search_cohorts($query, ['contextlevel' => 'system'], 'all', $page, $perpage);
        $totalresult = \core_cohort_external::search_cohorts($query, ['contextlevel' => 'system'], 'all', 0, 0);
        $total = count($totalresult['cohorts']);

        $cohorts = [];
        foreach ($result['cohorts'] as $cohort) {
            $cohorts[] = $this->format_cohort($cohort);
        }

        return new payload_response(
            [
                'cohorts' => $cohorts,
                'total' => $total,
            ],
            $request,
            $response,
        );
    }

    /**
     * Fetch a single cohort and its related context.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param \stdClass $cohort
     * @param \core\context $cohortcontext
     * @return payload_response
     */
    #[route(
        path: '/{cohort}',
        title: 'Fetch a cohort',
        description: 'Fetch the details of a single cohort',
        pathtypes: [
            new path_cohort(),
        ],
    )]
    public function get_cohort(
        ServerRequestInterface $request,
        ResponseInterface $response,
        \stdClass $cohort,
        \core\context $cohortcontext,
    ): payload_response {
        $this->require_capability('moodle/cohort:view', $cohortcontext);

        $portrait = [
            'cohort' => $this->format_cohort($cohort),
            'portrait' => [
                'members' => \local_cohortmanager\external\members::count_cohort_members_raw($cohort->id),
                'enrols' => \local_cohortmanager\external\enrols::count_cohort_enrol_instances_raw($cohort->id),
            ],
        ];

        return new payload_response($portrait, $request, $response);
    }

    /**
     * Fetch the editable representation of a cohort.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param \stdClass $cohort
     * @param \core\context $cohortcontext
     * @return payload_response
     */
    #[route(
        path: '/{cohort}/edit',
        title: 'Edit a cohort',
        description: 'Fetch the cohort data needed to edit an existing cohort',
        pathtypes: [
            new path_cohort(),
        ],
    )]
    public function edit_cohort(
        ServerRequestInterface $request,
        ResponseInterface $response,
        \stdClass $cohort,
        \core\context $cohortcontext,
    ): payload_response {
        $this->require_capability('moodle/cohort:manage', $cohortcontext);

        return new payload_response(
            ['cohort' => $this->format_cohort($cohort)],
            $request,
            $response,
        );
    }

    /**
     * Create a new cohort.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return payload_response
     */
    #[route(
        path: '/create',
        method: ['POST'],
        title: 'Create a cohort',
        description: 'Create a new cohort',
        requestbody: new request_body(
            content: new payload_response_type(
                required: true,
                schema: new \core\router\schema\objects\schema_object(
                    content: [
                        'name' => new \core\router\schema\objects\scalar_type(\core\param::TEXT),
                        'idnumber' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                        'description' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                        'contextid' => new \core\router\schema\objects\scalar_type(\core\param::INT),
                        'visible' => new \core\router\schema\objects\scalar_type(\core\param::BOOL),
                        'theme' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                    ],
                ),
            ),
        ),
        responses: [
            new \core\router\schema\response\response(
                statuscode: 200,
                description: 'The created cohorts',
            ),
        ],
    )]
    public function create_cohort(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): payload_response {
        global $CFG, $DB;
        require_once($CFG->dirroot . '/cohort/lib.php');

        $context = \context_system::instance();
        $this->require_capability('moodle/cohort:manage', $context);

        $values = $request->getParsedBody();

        $newid = cohort_add_cohort((object) [
            'contextid' => $values['contextid'] ?? $context->id,
            'name' => $values['name'] ?? '',
            'idnumber' => $values['idnumber'] ?? '',
            'description' => $values['description'] ?? '',
            'descriptionformat' => FORMAT_MOODLE,
            'visible' => !empty($values['visible']) ? 1 : 0,
            'theme' => $values['theme'] ?? null,
        ]);

        return new payload_response(
            $this->format_cohort($DB->get_record('cohort', ['id' => $newid], '*', MUST_EXIST)),
            $request,
            $response,
        );
    }

    /**
     * Update an existing cohort.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param \stdClass $cohort
     * @param \core\context $cohortcontext
     * @return payload_response
     */
    #[route(
        path: '/{cohort}',
        method: ['PUT'],
        title: 'Update a cohort',
        description: 'Update an existing cohort',
        pathtypes: [
            new path_cohort(),
        ],
        requestbody: new request_body(
            content: new payload_response_type(
                required: true,
                schema: new \core\router\schema\objects\schema_object(
                    content: [
                        'name' => new \core\router\schema\objects\scalar_type(\core\param::TEXT),
                        'idnumber' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                        'description' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                        'contextid' => new \core\router\schema\objects\scalar_type(\core\param::INT),
                        'visible' => new \core\router\schema\objects\scalar_type(\core\param::BOOL),
                        'theme' => new \core\router\schema\objects\scalar_type(\core\param::RAW),
                    ],
                ),
            ),
        ),
        responses: [
            new \core\router\schema\response\response(
                statuscode: 200,
                description: 'The updated cohorts',
            ),
        ],
    )]
    public function update_cohort(
        ServerRequestInterface $request,
        ResponseInterface $response,
        \stdClass $cohort,
        \core\context $cohortcontext,
    ): payload_response {
        global $CFG, $DB;
        require_once($CFG->dirroot . '/cohort/lib.php');

        $this->require_capability('moodle/cohort:manage', $cohortcontext);

        $values = $request->getParsedBody();

        $updaterecord = (object) [
            'id' => $cohort->id,
            'contextid' => $cohort->contextid,
            'name' => $values['name'] ?? $cohort->name,
            'idnumber' => $values['idnumber'] ?? $cohort->idnumber,
            'description' => $values['description'] ?? $cohort->description,
            'descriptionformat' => FORMAT_MOODLE,
            'visible' => array_key_exists('visible', $values) ? (!empty($values['visible']) ? 1 : 0) : $cohort->visible,
            'theme' => $values['theme'] ?? $cohort->theme,
        ];

        cohort_update_cohort($updaterecord);

        return new payload_response(
            $this->format_cohort($DB->get_record('cohort', ['id' => $cohort->id], '*', MUST_EXIST)),
            $request,
            $response,
        );
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

    /**
     * Format a cohort record for the API payload.
     *
     * @param \stdClass $cohort
     * @return array
     */
    protected function format_cohort(\stdClass $cohort): array {
        return [
            'id' => (int) $cohort->id,
            'name' => $cohort->name,
            'idnumber' => $cohort->idnumber,
            'description' => $cohort->description,
            'descriptionformat' => $cohort->descriptionformat ?? null,
            'visible' => (bool) $cohort->visible,
            'theme' => $cohort->theme ?? null,
            'contextid' => (int) $cohort->contextid,
        ];
    }
}