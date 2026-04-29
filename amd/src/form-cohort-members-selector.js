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

/**
 * Cohort member selector for role assignment form.
 *
 * @module     local_cohortmanager/form-cohort-members-selector
 * @copyright  2025 Davison Ramos
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import $ from 'jquery';
import Ajax from 'core/ajax';

const processResults = (selector, results) => {
    const users = [];
    $.each(results, (index, user) => {
        users.push({
            value: user.id,
            label: user.fullname
        });
    });
    return users;
};

const transport = (selector, query, success, failure) => {
    const cohortid = $(selector).attr('cohortid');

    const promise = Ajax.call([{
        methodname: 'local_cohortmanager_get_cohort_members_table_data',
        args: {
            cohortid: parseInt(cohortid),
            sortdata: [{sortby: 'lastname', sortorder: 1}],
            filters: [{name: 'search', value: query}],
            pagenumber: 1,
            pagesize: 30,
            hiddencolumns: []
        }
    }]);

    promise[0].then((results) => {
        success(results.members);
        return;
    }).fail(failure);
};

export { processResults, transport };
