import { d as C, u as D, r as d, c as m, a as t, e as c, b as l, t as p, w as r, v as u, k, l as x, s as v, m as V, x as I, j as y, _ as U } from "./main-C123j3YJ.mjs";
const w = { class: "cohort-create" }, B = {
  key: 0,
  class: "error-message"
}, E = { class: "form-section" }, N = { class: "form-group" }, M = { class: "form-group" }, S = { class: "form-group" }, T = { class: "form-section" }, q = { class: "form-group" }, F = { class: "checkbox-label" }, R = { class: "form-group" }, P = { class: "form-group" }, A = { class: "radio-group" }, $ = { class: "radio-label" }, j = { class: "radio-label" }, z = { class: "radio-label" }, G = {
  key: 0,
  class: "form-help"
}, H = ["placeholder"], J = { class: "form-actions" }, K = ["disabled"], L = ["disabled"], O = /* @__PURE__ */ C({
  __name: "CohortCreate",
  setup(Q) {
    const b = D(), a = d(!1), i = d(""), o = d({
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
      if (!o.value.name.trim()) {
        alert("Please enter a cohort name");
        return;
      }
      if (!o.value.idnumber.trim()) {
        alert("Please enter an ID number");
        return;
      }
      a.value = !0;
      try {
        const n = {
          categorytype: o.value.categorytype,
          name: o.value.name,
          idnumber: o.value.idnumber,
          description: o.value.description,
          descriptionformat: 1,
          // FORMAT_HTML
          visible: o.value.visible,
          theme: o.value.theme || void 0
        }, e = await I({
          cohorts: [n]
        });
        if (e && e.length > 0) {
          const s = e[0].id;
          b.push(`/cohort/${s}`);
        }
      } catch (n) {
        console.error("Error creating cohort:", n), i.value = "Failed to create cohort. Please try again.";
      } finally {
        a.value = !1;
      }
    }, f = () => {
      o.value = {
        name: "",
        idnumber: "",
        description: "",
        visible: !0,
        theme: "",
        categorytype: {
          type: "system",
          value: ""
        }
      }, i.value = "";
    }, h = () => {
      b.push("/");
    };
    return (n, e) => (y(), m("div", w, [
      t("div", { class: "form-header" }, [
        e[10] || (e[10] = t("h1", null, "Create New Cohort", -1)),
        t("div", { class: "header-actions" }, [
          t("button", {
            onClick: h,
            class: "btn btn-secondary"
          }, [...e[9] || (e[9] = [
            t("i", { class: "icon fa fa-times" }, null, -1),
            l(" Cancel ", -1)
          ])])
        ])
      ]),
      i.value ? (y(), m("div", B, [
        l(p(i.value) + " ", 1),
        t("button", {
          onClick: f,
          class: "btn btn-refresh"
        }, [...e[11] || (e[11] = [
          t("i", { class: "icon fa fa-refresh" }, null, -1),
          l(" Reset Form ", -1)
        ])])
      ])) : c("", !0),
      t("form", {
        onSubmit: V(g, ["prevent"]),
        class: "cohort-form"
      }, [
        t("div", E, [
          e[18] || (e[18] = t("h2", null, "Basic Information", -1)),
          t("div", N, [
            e[12] || (e[12] = t("label", { for: "name" }, "Cohort Name *", -1)),
            r(t("input", {
              id: "name",
              "onUpdate:modelValue": e[0] || (e[0] = (s) => o.value.name = s),
              type: "text",
              class: "form-control",
              placeholder: "Enter cohort name",
              required: ""
            }, null, 512), [
              [u, o.value.name]
            ]),
            e[13] || (e[13] = t("div", { class: "form-help" }, "The display name of the cohort", -1))
          ]),
          t("div", M, [
            e[14] || (e[14] = t("label", { for: "idnumber" }, "ID Number *", -1)),
            r(t("input", {
              id: "idnumber",
              "onUpdate:modelValue": e[1] || (e[1] = (s) => o.value.idnumber = s),
              type: "text",
              class: "form-control",
              placeholder: "Enter ID number",
              required: ""
            }, null, 512), [
              [u, o.value.idnumber]
            ]),
            e[15] || (e[15] = t("div", { class: "form-help" }, "A unique identifier for the cohort", -1))
          ]),
          t("div", S, [
            e[16] || (e[16] = t("label", { for: "description" }, "Description", -1)),
            r(t("textarea", {
              id: "description",
              "onUpdate:modelValue": e[2] || (e[2] = (s) => o.value.description = s),
              class: "form-control",
              rows: "4",
              placeholder: "Enter cohort description"
            }, null, 512), [
              [u, o.value.description]
            ]),
            e[17] || (e[17] = t("div", { class: "form-help" }, "A detailed description of the cohort", -1))
          ])
        ]),
        t("div", T, [
          e[28] || (e[28] = t("h2", null, "Settings", -1)),
          t("div", q, [
            t("label", F, [
              r(t("input", {
                "onUpdate:modelValue": e[3] || (e[3] = (s) => o.value.visible = s),
                type: "checkbox",
                class: "form-checkbox"
              }, null, 512), [
                [k, o.value.visible]
              ]),
              e[19] || (e[19] = l(" Visible ", -1))
            ]),
            e[20] || (e[20] = t("div", { class: "form-help" }, "Make the cohort visible to users", -1))
          ]),
          t("div", R, [
            e[22] || (e[22] = t("label", { for: "theme" }, "Theme", -1)),
            r(t("select", {
              id: "theme",
              "onUpdate:modelValue": e[4] || (e[4] = (s) => o.value.theme = s),
              class: "form-control"
            }, [...e[21] || (e[21] = [
              t("option", { value: "" }, "Default Theme", -1),
              t("option", { value: "boost" }, "Boost", -1),
              t("option", { value: "boost-clean" }, "Boost Clean", -1)
            ])], 512), [
              [x, o.value.theme]
            ]),
            e[23] || (e[23] = t("div", { class: "form-help" }, "Select a theme for the cohort (requires allowcohortthemes to be enabled)", -1))
          ]),
          t("div", P, [
            e[27] || (e[27] = t("label", null, "Category", -1)),
            t("div", A, [
              t("label", $, [
                r(t("input", {
                  "onUpdate:modelValue": e[5] || (e[5] = (s) => o.value.categorytype.type = s),
                  type: "radio",
                  value: "system",
                  class: "form-radio"
                }, null, 512), [
                  [v, o.value.categorytype.type]
                ]),
                e[24] || (e[24] = l(" System Category ", -1))
              ]),
              t("label", j, [
                r(t("input", {
                  "onUpdate:modelValue": e[6] || (e[6] = (s) => o.value.categorytype.type = s),
                  type: "radio",
                  value: "idnumber",
                  class: "form-radio"
                }, null, 512), [
                  [v, o.value.categorytype.type]
                ]),
                e[25] || (e[25] = l(" Course Category by ID Number ", -1))
              ]),
              t("label", z, [
                r(t("input", {
                  "onUpdate:modelValue": e[7] || (e[7] = (s) => o.value.categorytype.type = s),
                  type: "radio",
                  value: "id",
                  class: "form-radio"
                }, null, 512), [
                  [v, o.value.categorytype.type]
                ]),
                e[26] || (e[26] = l(" Course Category by ID ", -1))
              ])
            ]),
            o.value.categorytype.type !== "system" ? (y(), m("div", G, [
              l(" Enter the " + p(o.value.categorytype.type === "idnumber" ? "ID number" : "ID") + " of the course category: ", 1),
              r(t("input", {
                "onUpdate:modelValue": e[8] || (e[8] = (s) => o.value.categorytype.value = s),
                type: "text",
                class: "form-control",
                placeholder: `Enter course category ${o.value.categorytype.type === "idnumber" ? "ID number" : "ID"}`
              }, null, 8, H), [
                [u, o.value.categorytype.value]
              ])
            ])) : c("", !0)
          ])
        ]),
        t("div", J, [
          t("button", {
            type: "button",
            onClick: f,
            class: "btn btn-secondary",
            disabled: a.value
          }, [...e[29] || (e[29] = [
            t("i", { class: "icon fa fa-undo" }, null, -1),
            l(" Reset ", -1)
          ])], 8, K),
          t("button", {
            type: "submit",
            class: "btn btn-primary",
            disabled: a.value
          }, [
            e[30] || (e[30] = t("i", { class: "icon fa fa-plus" }, null, -1)),
            l(" " + p(a.value ? "Creating..." : "Create Cohort"), 1)
          ], 8, L)
        ])
      ], 32)
    ]));
  }
}), X = /* @__PURE__ */ U(O, [["__scopeId", "data-v-7707f24a"]]);
export {
  X as default
};
//# sourceMappingURL=CohortCreate-C11Z6kcp.mjs.map
