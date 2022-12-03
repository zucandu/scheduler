"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_storefront_UserPasswordReset_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserPasswordReset.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserPasswordReset.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      formdata: {
        password: undefined,
        password_confirmation: undefined,
        token: undefined
      },
      errorMsg: undefined
    };
  },
  created: function created() {
    this.formdata.token = this.$route.params.token;
  },
  methods: {
    resetPassword: function resetPassword() {
      var _this = this;

      this.$store.dispatch('resetPassword', this.formdata).then(function () {
        _this.$router.push({
          path: '/login',
          query: {
            msg: 'Your password has been reset. Please login and happy shopping!'
          }
        });
      })["catch"](function (error) {
        _this.errorMsg = error.response.data.message;
      });
    }
  },
  computed: {
    passwordNotMatch: function passwordNotMatch() {
      return this.formdata.password && this.formdata.password !== this.formdata.password_confirmation;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserPasswordReset.vue?vue&type=template&id=ae6124a6":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserPasswordReset.vue?vue&type=template&id=ae6124a6 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
};
var _hoisted_2 = {
  "class": "container"
};
var _hoisted_3 = {
  "class": "row justify-content-center"
};
var _hoisted_4 = {
  "class": "col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
};
var _hoisted_5 = {
  "class": "d-flex justify-content-center py-4"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
  "class": "mx-5",
  src: "/storage/freegifts.svg",
  width: "60",
  alt: "Zucandu Free Gifts"
}, null, -1
/* HOISTED */
);

var _hoisted_7 = {
  "class": "card card-body shadow-sm w-100"
};

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-title h5"
}, "Reset your password", -1
/* HOISTED */
);

var _hoisted_9 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_10 = {
  "class": "mb-3"
};

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "password",
  "class": "form-label"
}, "Password", -1
/* HOISTED */
);

var _hoisted_12 = {
  "class": "mb-3"
};

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "password-confirm",
  "class": "form-label"
}, "Confirm Password", -1
/* HOISTED */
);

var _hoisted_14 = {
  key: 0,
  "class": "text-danger small"
};
var _hoisted_15 = {
  "class": "d-flex justify-content-between"
};
var _hoisted_16 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    to: "/",
    "class": "logo"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_6];
    }),
    _: 1
    /* STABLE */

  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" End Logo "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_hoisted_8, _ctx.errorMsg ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errorMsg), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $options.resetPassword();
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.formdata.password = $event;
    }),
    type: "password",
    "class": "form-control",
    id: "password",
    placeholder: "Password",
    required: ""
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.formdata.password]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.formdata.password_confirmation = $event;
    }),
    type: "password",
    "class": "form-control",
    id: "password-confirm",
    placeholder: "Password Confirmation",
    required: ""
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.formdata.password_confirmation]]), $options.passwordNotMatch ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, "Please make sure your password match")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    "class": "btn btn-link px-0",
    to: "/login"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Back to login")];
    }),
    _: 1
    /* STABLE */

  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-primary",
    type: "submit",
    disabled: $options.passwordNotMatch
  }, "Reset", 8
  /* PROPS */
  , _hoisted_16)])], 32
  /* HYDRATE_EVENTS */
  )])])])])]);
}

/***/ }),

/***/ "./resources/js/components/storefront/UserPasswordReset.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/storefront/UserPasswordReset.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UserPasswordReset_vue_vue_type_template_id_ae6124a6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserPasswordReset.vue?vue&type=template&id=ae6124a6 */ "./resources/js/components/storefront/UserPasswordReset.vue?vue&type=template&id=ae6124a6");
/* harmony import */ var _UserPasswordReset_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserPasswordReset.vue?vue&type=script&lang=js */ "./resources/js/components/storefront/UserPasswordReset.vue?vue&type=script&lang=js");
/* harmony import */ var E_xampp_htdocs_projects_zucandu_freegifts_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,E_xampp_htdocs_projects_zucandu_freegifts_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_UserPasswordReset_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_UserPasswordReset_vue_vue_type_template_id_ae6124a6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/storefront/UserPasswordReset.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/storefront/UserPasswordReset.vue?vue&type=script&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/storefront/UserPasswordReset.vue?vue&type=script&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UserPasswordReset_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UserPasswordReset_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UserPasswordReset.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserPasswordReset.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/storefront/UserPasswordReset.vue?vue&type=template&id=ae6124a6":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/storefront/UserPasswordReset.vue?vue&type=template&id=ae6124a6 ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UserPasswordReset_vue_vue_type_template_id_ae6124a6__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UserPasswordReset_vue_vue_type_template_id_ae6124a6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UserPasswordReset.vue?vue&type=template&id=ae6124a6 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserPasswordReset.vue?vue&type=template&id=ae6124a6");


/***/ })

}]);