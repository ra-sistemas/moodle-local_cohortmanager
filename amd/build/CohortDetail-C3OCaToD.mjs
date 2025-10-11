import { d as D, u as L, r as v, o as M, c as t, a as e, b as c, t as i, n as p, e as b, F as k, f as g, g as E, h as F, i as T, j as l, _ as x } from "./main-CYti1L7s.mjs";
const V = { class: "cohort-detail" }, $ = {
  key: 0,
  class: "loading"
}, H = {
  key: 1,
  class: "error-message"
}, I = {
  key: 2,
  class: "cohort-detail-content"
}, R = { class: "tabs" }, P = { class: "tab-content" }, j = {
  key: 0,
  class: "details-tab"
}, q = { class: "detail-section" }, z = { class: "detail-grid" }, A = { class: "detail-item" }, S = { class: "detail-item" }, U = { class: "detail-item" }, G = {
  key: 0,
  class: "detail-item"
}, J = { class: "detail-section" }, K = { class: "description-content" }, O = ["innerHTML"], Q = {
  key: 1,
  class: "no-description"
}, W = {
  key: 0,
  class: "detail-section"
}, X = { class: "custom-fields" }, Y = {
  key: 1,
  class: "members-tab"
}, Z = { class: "members-header" }, ee = { class: "member-count" }, se = {
  key: 0,
  class: "members-list"
}, te = { class: "member-table" }, le = { class: "member-table-body" }, oe = { class: "member-table-cell member-name" }, ae = { class: "member-table-cell" }, ie = { class: "member-table-cell" }, ne = {
  key: 1,
  class: "no-members"
}, re = {
  key: 3,
  class: "not-found"
}, de = /* @__PURE__ */ D({
  __name: "CohortDetail",
  props: {
    id: {}
  },
  setup(C) {
    const r = C, h = L(), o = v(null), m = v([]), f = v(!1), d = v(""), u = v("details"), y = async () => {
      f.value = !0, d.value = "";
      try {
        const a = await E({
          cohortids: [r.id]
        });
        a && a.length > 0 ? (o.value = a[0], await N()) : d.value = "Cohort not found";
      } catch (a) {
        console.error("Error loading cohort:", a), d.value = "Failed to load cohort details. Please try again.";
      } finally {
        f.value = !1;
      }
    }, N = async () => {
      try {
        const a = await F({
          cohortids: [r.id]
        });
        a && a[r.id] && (m.value = a[r.id] || []);
      } catch (a) {
        console.error("Error loading cohort members:", a);
      }
    }, _ = () => {
      h.push("/");
    }, w = () => {
      h.push(`/cohort/${r.id}/edit`);
    }, B = async () => {
      if (o.value && confirm(`Are you sure you want to delete "${o.value.name}"?`))
        try {
          await T({
            cohortids: [r.id]
          }), h.push("/");
        } catch (a) {
          console.error("Error deleting cohort:", a), d.value = "Failed to delete cohort. Please try again.";
        }
    };
    return M(() => {
      y();
    }), (a, s) => (l(), t("div", V, [
      f.value ? (l(), t("div", $, [...s[2] || (s[2] = [
        e("i", { class: "icon fa fa-spinner fa-spin" }, null, -1),
        c(" Loading cohort details... ", -1)
      ])])) : d.value ? (l(), t("div", H, [
        c(i(d.value) + " ", 1),
        e("button", {
          onClick: y,
          class: "btn btn-refresh"
        }, [...s[3] || (s[3] = [
          e("i", { class: "icon fa fa-refresh" }, null, -1),
          c(" Retry ", -1)
        ])])
      ])) : o.value ? (l(), t("div", I, [
        e("div", { class: "detail-header" }, [
          e("div", { class: "header-actions" }, [
            e("button", {
              onClick: _,
              class: "btn btn-secondary"
            }, [...s[4] || (s[4] = [
              e("i", { class: "icon fa fa-arrow-left" }, null, -1),
              c(" Back to List ", -1)
            ])]),
            e("button", {
              onClick: w,
              class: "btn btn-edit"
            }, [...s[5] || (s[5] = [
              e("i", { class: "icon fa fa-edit" }, null, -1),
              c(" Edit ", -1)
            ])]),
            e("button", {
              onClick: B,
              class: "btn btn-delete"
            }, [...s[6] || (s[6] = [
              e("i", { class: "icon fa fa-trash" }, null, -1),
              c(" Delete ", -1)
            ])])
          ])
        ]),
        e("div", R, [
          e("button", {
            class: p(["tab", { active: u.value === "details" }]),
            onClick: s[0] || (s[0] = (n) => u.value = "details")
          }, " Details ", 2),
          e("button", {
            class: p(["tab", { active: u.value === "members" }]),
            onClick: s[1] || (s[1] = (n) => u.value = "members")
          }, " Members (" + i(m.value.length) + ") ", 3)
        ]),
        e("div", P, [
          u.value === "details" ? (l(), t("div", j, [
            e("div", q, [
              s[11] || (s[11] = e("h3", null, "Basic Information", -1)),
              e("div", z, [
                e("div", A, [
                  s[7] || (s[7] = e("label", null, "Name:", -1)),
                  e("span", null, i(o.value.name), 1)
                ]),
                e("div", S, [
                  s[8] || (s[8] = e("label", null, "ID Number:", -1)),
                  e("span", null, i(o.value.idnumber), 1)
                ]),
                e("div", U, [
                  s[9] || (s[9] = e("label", null, "Visibility:", -1)),
                  e("span", {
                    class: p(["badge", o.value.visible ? "badge-success" : "badge-secondary"])
                  }, i(o.value.visible ? "Visible" : "Hidden"), 3)
                ]),
                o.value.theme ? (l(), t("div", G, [
                  s[10] || (s[10] = e("label", null, "Theme:", -1)),
                  e("span", null, i(o.value.theme), 1)
                ])) : b("", !0)
              ])
            ]),
            e("div", J, [
              s[12] || (s[12] = e("h3", null, "Description", -1)),
              e("div", K, [
                o.value.description ? (l(), t("div", {
                  key: 0,
                  innerHTML: o.value.description
                }, null, 8, O)) : (l(), t("div", Q, " No description provided. "))
              ])
            ]),
            o.value.customfields && o.value.customfields.length > 0 ? (l(), t("div", W, [
              s[13] || (s[13] = e("h3", null, "Custom Fields", -1)),
              e("div", X, [
                (l(!0), t(k, null, g(o.value.customfields, (n) => (l(), t("div", {
                  key: n.shortname,
                  class: "custom-field"
                }, [
                  e("label", null, i(n.name) + ":", 1),
                  e("span", null, i(n.value), 1)
                ]))), 128))
              ])
            ])) : b("", !0)
          ])) : b("", !0),
          u.value === "members" ? (l(), t("div", Y, [
            e("div", Z, [
              s[14] || (s[14] = e("h3", null, "Cohort Members", -1)),
              e("span", ee, i(m.value.length) + " members", 1)
            ]),
            m.value.length > 0 ? (l(), t("div", se, [
              e("div", te, [
                s[15] || (s[15] = e("div", { class: "member-table-header" }, [
                  e("div", { class: "member-table-cell" }, "Name"),
                  e("div", { class: "member-table-cell" }, "Username"),
                  e("div", { class: "member-table-cell" }, "Email")
                ], -1)),
                e("div", le, [
                  (l(!0), t(k, null, g(m.value, (n) => (l(), t("div", {
                    key: n.id,
                    class: "member-row"
                  }, [
                    e("div", oe, i(n.firstname) + " " + i(n.lastname), 1),
                    e("div", ae, i(n.username), 1),
                    e("div", ie, i(n.email), 1)
                  ]))), 128))
                ])
              ])
            ])) : (l(), t("div", ne, [...s[16] || (s[16] = [
              e("i", { class: "icon fa fa-users" }, null, -1),
              e("p", null, "No members found in this cohort.", -1)
            ])]))
          ])) : b("", !0)
        ])
      ])) : (l(), t("div", re, [
        s[17] || (s[17] = e("i", { class: "icon fa fa-exclamation-triangle" }, null, -1)),
        s[18] || (s[18] = e("h3", null, "Cohort Not Found", -1)),
        s[19] || (s[19] = e("p", null, "The requested cohort could not be found.", -1)),
        e("button", {
          onClick: _,
          class: "btn btn-primary"
        }, " Back to Cohort List ")
      ]))
    ]));
  }
}), ce = /* @__PURE__ */ x(de, [["__scopeId", "data-v-13ee3d8f"]]);
export {
  ce as default
};
//# sourceMappingURL=CohortDetail-C3OCaToD.mjs.map
