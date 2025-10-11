import { d as V, u as D, r as v, o as E, c as r, a as o, b as i, t as c, e as B, w as u, v as h, k as w, l as F, F as M, f as S, m as U, g as q, p as N, q as T, j as n, _ as I } from "./main-CYti1L7s.mjs";
const $ = { class: "cohort-edit" }, L = {
  key: 0,
  class: "loading"
}, P = {
  key: 1,
  class: "error-message"
}, A = {
  key: 2,
  class: "edit-form"
}, R = { class: "form-section" }, j = { class: "form-group" }, z = { class: "form-group" }, G = { class: "form-group" }, H = { class: "form-section" }, J = { class: "form-group" }, K = { class: "checkbox-label" }, O = { class: "form-group" }, Q = {
  key: 0,
  class: "form-section"
}, W = ["for"], X = ["id", "onUpdate:modelValue", "type", "placeholder"], Y = { class: "form-help" }, Z = { class: "form-actions" }, _ = ["disabled"], ee = ["disabled"], oe = {
  key: 3,
  class: "not-found"
}, te = /* @__PURE__ */ V({
  __name: "CohortEdit",
  props: {
    id: {}
  },
  setup(C) {
    const p = C, y = D(), l = v(null), f = v(!1), d = v(""), m = v(!1), t = v({
      name: "",
      idnumber: "",
      description: "",
      visible: !0,
      theme: "",
      categorytype: {
        type: "system",
        value: ""
      }
    }), g = async () => {
      f.value = !0, d.value = "";
      try {
        const a = await q({
          cohortids: [p.id]
        });
        a && a.length > 0 ? (l.value = a[0], t.value = {
          name: l.value.name,
          idnumber: l.value.idnumber,
          description: l.value.description,
          visible: l.value.visible,
          theme: l.value.theme || "",
          categorytype: {
            type: "system",
            value: ""
          }
        }) : d.value = "Cohort not found";
      } catch (a) {
        console.error("Error loading cohort:", a), d.value = "Failed to load cohort data. Please try again.";
      } finally {
        f.value = !1;
      }
    }, k = async () => {
      if (!t.value.name.trim()) {
        alert("Please enter a cohort name");
        return;
      }
      if (!t.value.idnumber.trim()) {
        alert("Please enter an ID number");
        return;
      }
      m.value = !0;
      try {
        const a = {
          categorytype: t.value.categorytype,
          name: t.value.name,
          idnumber: t.value.idnumber,
          description: t.value.description,
          descriptionformat: 1,
          // FORMAT_HTML
          visible: t.value.visible,
          theme: t.value.theme || void 0
        };
        await T({
          cohorts: [{
            ...a,
            id: p.id
          }]
        }), y.push(`/cohort/${p.id}`);
      } catch (a) {
        console.error("Error updating cohort:", a), d.value = "Failed to update cohort. Please try again.";
      } finally {
        m.value = !1;
      }
    }, b = () => {
      y.push(`/cohort/${p.id}`);
    };
    return E(() => {
      g();
    }), (a, e) => (n(), r("div", $, [
      f.value ? (n(), r("div", L, [...e[5] || (e[5] = [
        o("i", { class: "icon fa fa-spinner fa-spin" }, null, -1),
        i(" Loading cohort data... ", -1)
      ])])) : d.value ? (n(), r("div", P, [
        i(c(d.value) + " ", 1),
        o("button", {
          onClick: g,
          class: "btn btn-refresh"
        }, [...e[6] || (e[6] = [
          o("i", { class: "icon fa fa-refresh" }, null, -1),
          i(" Retry ", -1)
        ])])
      ])) : l.value ? (n(), r("div", A, [
        o("div", { class: "form-header" }, [
          e[8] || (e[8] = o("h1", null, "Edit Cohort", -1)),
          o("div", { class: "header-actions" }, [
            o("button", {
              onClick: b,
              class: "btn btn-secondary"
            }, [...e[7] || (e[7] = [
              o("i", { class: "icon fa fa-times" }, null, -1),
              i(" Cancel ", -1)
            ])])
          ])
        ]),
        o("form", {
          onSubmit: U(k, ["prevent"]),
          class: "cohort-form"
        }, [
          o("div", R, [
            e[15] || (e[15] = o("h2", null, "Basic Information", -1)),
            o("div", j, [
              e[9] || (e[9] = o("label", { for: "name" }, "Cohort Name *", -1)),
              u(o("input", {
                id: "name",
                "onUpdate:modelValue": e[0] || (e[0] = (s) => t.value.name = s),
                type: "text",
                class: "form-control",
                placeholder: "Enter cohort name",
                required: ""
              }, null, 512), [
                [h, t.value.name]
              ]),
              e[10] || (e[10] = o("div", { class: "form-help" }, "The display name of the cohort", -1))
            ]),
            o("div", z, [
              e[11] || (e[11] = o("label", { for: "idnumber" }, "ID Number *", -1)),
              u(o("input", {
                id: "idnumber",
                "onUpdate:modelValue": e[1] || (e[1] = (s) => t.value.idnumber = s),
                type: "text",
                class: "form-control",
                placeholder: "Enter ID number",
                required: ""
              }, null, 512), [
                [h, t.value.idnumber]
              ]),
              e[12] || (e[12] = o("div", { class: "form-help" }, "A unique identifier for the cohort", -1))
            ]),
            o("div", G, [
              e[13] || (e[13] = o("label", { for: "description" }, "Description", -1)),
              u(o("textarea", {
                id: "description",
                "onUpdate:modelValue": e[2] || (e[2] = (s) => t.value.description = s),
                class: "form-control",
                rows: "4",
                placeholder: "Enter cohort description"
              }, null, 512), [
                [h, t.value.description]
              ]),
              e[14] || (e[14] = o("div", { class: "form-help" }, "A detailed description of the cohort", -1))
            ])
          ]),
          o("div", H, [
            e[21] || (e[21] = o("h2", null, "Settings", -1)),
            o("div", J, [
              o("label", K, [
                u(o("input", {
                  "onUpdate:modelValue": e[3] || (e[3] = (s) => t.value.visible = s),
                  type: "checkbox",
                  class: "form-checkbox"
                }, null, 512), [
                  [w, t.value.visible]
                ]),
                e[16] || (e[16] = i(" Visible ", -1))
              ]),
              e[17] || (e[17] = o("div", { class: "form-help" }, "Make the cohort visible to users", -1))
            ]),
            o("div", O, [
              e[19] || (e[19] = o("label", { for: "theme" }, "Theme", -1)),
              u(o("select", {
                id: "theme",
                "onUpdate:modelValue": e[4] || (e[4] = (s) => t.value.theme = s),
                class: "form-control"
              }, [...e[18] || (e[18] = [
                o("option", { value: "" }, "Default Theme", -1),
                o("option", { value: "boost" }, "Boost", -1),
                o("option", { value: "boost-clean" }, "Boost Clean", -1)
              ])], 512), [
                [F, t.value.theme]
              ]),
              e[20] || (e[20] = o("div", { class: "form-help" }, "Select a theme for the cohort (requires allowcohortthemes to be enabled)", -1))
            ])
          ]),
          l.value.customfields && l.value.customfields.length > 0 ? (n(), r("div", Q, [
            e[22] || (e[22] = o("h2", null, "Custom Fields", -1)),
            (n(!0), r(M, null, S(l.value.customfields, (s) => (n(), r("div", {
              key: s.shortname,
              class: "form-group"
            }, [
              o("label", {
                for: `custom-${s.shortname}`
              }, c(s.name), 9, W),
              u(o("input", {
                id: `custom-${s.shortname}`,
                "onUpdate:modelValue": (x) => s.value = x,
                type: (s.type === "text", "text"),
                class: "form-control",
                placeholder: `Enter ${s.name}`
              }, null, 8, X), [
                [N, s.value]
              ]),
              o("div", Y, c(s.name), 1)
            ]))), 128))
          ])) : B("", !0),
          o("div", Z, [
            o("button", {
              type: "button",
              onClick: b,
              class: "btn btn-secondary",
              disabled: m.value
            }, [...e[23] || (e[23] = [
              o("i", { class: "icon fa fa-times" }, null, -1),
              i(" Cancel ", -1)
            ])], 8, _),
            o("button", {
              type: "submit",
              class: "btn btn-primary",
              disabled: m.value
            }, [
              e[24] || (e[24] = o("i", { class: "icon fa fa-save" }, null, -1)),
              i(" " + c(m.value ? "Saving..." : "Save Changes"), 1)
            ], 8, ee)
          ])
        ], 32)
      ])) : (n(), r("div", oe, [
        e[25] || (e[25] = o("i", { class: "icon fa fa-exclamation-triangle" }, null, -1)),
        e[26] || (e[26] = o("h3", null, "Cohort Not Found", -1)),
        e[27] || (e[27] = o("p", null, "The requested cohort could not be found.", -1)),
        o("button", {
          onClick: b,
          class: "btn btn-primary"
        }, " Back to Cohort List ")
      ]))
    ]));
  }
}), le = /* @__PURE__ */ I(te, [["__scopeId", "data-v-ca8d81f2"]]);
export {
  le as default
};
//# sourceMappingURL=CohortEdit-BLCPzT05.mjs.map
