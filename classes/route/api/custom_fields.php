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

use core\router\route;
use core\router\schema\response\payload_response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Custom fields routes for Cohort Manager.
 *
 * @package    local_cohortmanager
 * @copyright  2026 Davison Almeida <ramosdealmeidasistemas@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
#[route(
    path: '/custom-fields',
)]
class custom_fields {

    /**
     * List custom field categories for cohorts.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return payload_response
     */
    #[route(
        title: 'List custom fields',
        description: 'List the custom field categories configured for cohorts',
    )]
    public function list_custom_fields(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): payload_response {
        $context = \context_system::instance();
        require_login();

        if (!has_capability('moodle/cohort:manage', $context)) {
            throw new \core\exception\access_denied_exception(
                'You do not have the required capability to perform this action.',
            );
        }

        $handler = \core_cohort\customfield\cohort_handler::create();

        $result = [];

        foreach ($handler->get_categories_with_fields() as $category) {
            $catdata = [
                'id' => (int) $category->get('id'),
                'name' => $category->get_formatted_name(),
                'fields' => [],
            ];
            foreach ($category->get_fields() as $field) {
                $catdata['fields'][] = [
                    'id' => (int) $field->get('id'),
                    'name' => $field->get_formatted_name(),
                    'shortname' => $field->get('shortname'),
                    'type' => $field->get('type'),
                ];
            }
            $result[] = $catdata;
        }

        return new payload_response($result, $request, $response);
    }
}