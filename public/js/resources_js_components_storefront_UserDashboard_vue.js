"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_storefront_UserDashboard_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserDashboard.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserDashboard.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm-bundler.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      formdata: {},
      filters: {
        sort: [{
          id: 'created_date',
          text: 'Created Date'
        }, {
          id: 'a_z',
          text: 'A to Z'
        }, {
          id: 'z_a',
          text: 'Z to A'
        }]
      },
      keyword: undefined,
      page: 1,
      loading: false,
      resetAll: false,
      checkboxes: [],
      checkAll: false,
      downloading: false,
      processing: 0
    };
  },
  created: function created() {
    // Get paging products
    this.queryListing(this.urlGetAllParams()); // Show resetAll

    this.resetAll = Object.keys(this.$route.query).filter(function (k) {
      return k !== 'page';
    }).length > 0;
  },
  methods: {
    queryListing: function queryListing(params) {
      var _this = this;

      this.loading = true;
      this.$store.dispatch('AllProducts', {
        objParams: params
      }).then(function () {})["catch"](function (error) {
        _this.$store.commit('setAlert', {
          'color': 'danger',
          'message': error.response.data.message
        });
      })["finally"](function () {
        return _this.loading = false;
      });
    },
    downloadProducts: function downloadProducts() {
      var _this2 = this;

      this.downloading = true;
      this.$store.dispatch('DownloadProducts', {
        page: this.page
      }).then(function () {
        if (_this2.downloadStatus.current < _this2.downloadStatus.total) {
          _this2.processing = Math.round(_this2.downloadStatus.current * 100 / _this2.downloadStatus.total);
          _this2.page++;

          _this2.downloadProducts();
        } else {
          _this2.processing = 0, _this2.downloading = false, _this2.page = 1;

          _this2.queryListing(_this2.urlGetAllParams());
        }
      })["catch"](function (error) {
        _this2.downloading = false;

        _this2.$store.commit('setAlert', {
          'color': 'danger',
          'message': error.response.data.message
        });
      });
    }
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    if (to.query) {
      // Show resetAll
      this.resetAll = Object.keys(to.query).length > 0; // Query

      this.queryListing(to.query);
    }

    next();
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapGetters)(['urlGetAllParams', 'urlParamValueFromName', 'moneyFormat'])), (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)({
    profile: function profile(state) {
      return state.user.profile;
    },
    products: function products(state) {
      return state.product.products;
    },
    paginationLinks: function paginationLinks(state) {
      return state.product.paginationLinks;
    },
    downloadStatus: function downloadStatus(state) {
      return state.product.downloadStatus;
    }
  })),
  watch: {
    keyword: _.debounce(function (v) {
      if (v) {
        this.$router.push({
          path: "/store/dashboard",
          query: _objectSpread(_objectSpread({}, this.urlGetAllParams(['keyword'])), {}, {
            keyword: v
          })
        });
      }
    }, 500),
    checkAll: function checkAll(v) {
      if (v === true) {
        this.checkboxes = _toConsumableArray(this.products.map(function (p) {
          return p.id;
        }));
      } else {
        this.checkboxes = [];
      }
    },
    checkboxes: function checkboxes(v) {
      if (v.length === 0) {
        this.checkAll = false;
      } else if (v.length === this.products.length) {
        this.checkAll = true;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserDashboard.vue?vue&type=template&id=5da8e54d":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserDashboard.vue?vue&type=template&id=5da8e54d ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var _hoisted_1 = {
  "class": "container"
};
var _hoisted_2 = {
  "class": "row justify-content-center"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
  "class": "mb-3"
}, "Products", -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "col-12"
};
var _hoisted_5 = {
  "class": "card card-body"
};
var _hoisted_6 = {
  "class": "input-group"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
  "class": "btn border dropdown-toggle",
  type: "button",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  "class": "bi bi-sort-alpha-down",
  viewBox: "0 0 16 16"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"
})]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Sort ")], -1
/* HOISTED */
);

var _hoisted_8 = {
  "class": "dropdown-menu dropdown-menu-end"
};
var _hoisted_9 = ["disabled"];
var _hoisted_10 = ["disabled"];
var _hoisted_11 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  "class": "bi bi-download me-2",
  viewBox: "0 0 16 16"
};

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
}, null, -1
/* HOISTED */
);

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
}, null, -1
/* HOISTED */
);

var _hoisted_14 = [_hoisted_12, _hoisted_13];
var _hoisted_15 = {
  key: 1,
  "class": "me-2 small"
};
var _hoisted_16 = {
  "class": "selected-filters my-3"
};
var _hoisted_17 = {
  key: 0,
  "class": "text-capitalize"
};
var _hoisted_18 = {
  key: 1,
  "class": "text-capitalize"
};
var _hoisted_19 = ["innerHTML"];

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  "class": "bi bi-x-circle-fill ms-1",
  viewBox: "0 0 16 16"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
})], -1
/* HOISTED */
);

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  "class": "bi bi-x-circle-fill ms-1",
  viewBox: "0 0 16 16"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
})], -1
/* HOISTED */
);

var _hoisted_22 = {
  key: 0
};
var _hoisted_23 = {
  key: 0,
  "class": "table table-hover"
};

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "ID", -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Product name", -1
/* HOISTED */
);

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Price", -1
/* HOISTED */
);

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Sale price", -1
/* HOISTED */
);

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Quantity", -1
/* HOISTED */
);

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "text-end"
}, "Created at", -1
/* HOISTED */
);

var _hoisted_30 = ["value"];
var _hoisted_31 = {
  "class": "text-end"
};
var _hoisted_32 = {
  key: 1,
  "class": "text-center"
};
var _hoisted_33 = {
  key: 2,
  "class": "row mt-3 justify-content-center"
};
var _hoisted_34 = {
  "class": "col-12 text-end"
};
var _hoisted_35 = {
  key: 1
};

var _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"py-3 bg-secondary opacity-25 rounded w-100 mb-2\"></div><div class=\"py-2 rounded bg-secondary opacity-25 rounded w-100 mb-1\"></div><div class=\"py-2 rounded bg-secondary opacity-25 rounded w-100 mb-1\"></div><div class=\"py-2 rounded bg-secondary opacity-25 rounded w-100 mb-1\"></div><div class=\"py-2 rounded bg-secondary opacity-25 rounded w-100 mb-1\"></div>", 5);

var _hoisted_41 = [_hoisted_36];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.keyword = $event;
    }),
    type: "search",
    "class": "form-control rounded-0",
    placeholder: "Product name..."
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.keyword]]), _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_8, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filters.sort, function (sort, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
      "class": "dropdown-item",
      to: {
        path: "/store/dashboard",
        query: Object.assign({}, _ctx.urlGetAllParams(['sort', 'page']), {
          sort: sort.id
        })
      }
    }, {
      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(sort.text), 1
        /* TEXT */
        )];
      }),
      _: 2
      /* DYNAMIC */

    }, 1032
    /* PROPS, DYNAMIC_SLOTS */
    , ["to"])]);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    disabled: _ctx.checkboxes.length === 0,
    onClick: _cache[1] || (_cache[1] = function () {
      return _ctx.deleteProducts && _ctx.deleteProducts.apply(_ctx, arguments);
    }),
    "class": "btn btn-warning text-white"
  }, "Delete", 8
  /* PROPS */
  , _hoisted_9), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.downloadProducts && $options.downloadProducts.apply($options, arguments);
    }, ["stop"])),
    disabled: _ctx.downloading,
    "class": "btn btn-primary rounded ms-3 d-flex align-items-center"
  }, [!_ctx.downloading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_11, _hoisted_14)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.processing) + "%", 1
  /* TEXT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Download products ")], 8
  /* PROPS */
  , _hoisted_10)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [Object.keys(_ctx.$route.query).length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 0
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.$route.query, function (qValue, qKey) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      "class": "d-inline-block mb-2",
      key: qKey
    }, [qValue ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_link, {
      key: 0,
      "class": "btn btn-light border me-2",
      to: {
        path: "/store/dashboard",
        query: Object.assign({}, _ctx.urlGetAllParams([qKey]))
      }
    }, {
      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
        return [_ctx.filters[qKey] && _ctx.filters[qKey].length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(qKey) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.filters[qKey].find(function (v) {
          return v.id == qValue;
        }).text), 1
        /* TEXT */
        )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(qKey) + ": ", 1
        /* TEXT */
        ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
          innerHTML: qValue
        }, null, 8
        /* PROPS */
        , _hoisted_19)])), _hoisted_20];
      }),
      _: 2
      /* DYNAMIC */

    }, 1032
    /* PROPS, DYNAMIC_SLOTS */
    , ["to"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128
  /* KEYED_FRAGMENT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.resetAll ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_link, {
    key: 1,
    "class": "btn btn-light border me-2",
    to: {
      path: "/store/dashboard",
      query: Object.assign({}, _ctx.urlGetAllParams(['category', 'manufacturer', 'type', 'status', 'visibility', 'more', 'sort', 'page', 'keyword']))
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Reset all "), _hoisted_21];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["to"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), !_ctx.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [_ctx.products.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("table", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.checkAll = $event;
    }),
    type: "checkbox",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)("form-check-input ".concat(this.checkboxes.length !== this.products.length && this.checkboxes.length > 0 ? 'indeterminate' : ''))
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, _ctx.checkAll]])]), _hoisted_24, _hoisted_25, _hoisted_26, _hoisted_27, _hoisted_28, _hoisted_29])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.products, function (product) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: product.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
        return _ctx.checkboxes = $event;
      }),
      type: "checkbox",
      value: product.id,
      "class": "form-check-input"
    }, null, 8
    /* PROPS */
    , _hoisted_30), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, _ctx.checkboxes]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.id), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.name), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, "$" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.moneyFormat(product.price, 2)), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, "$" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.moneyFormat(product.sale_price, 2)), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.quantity), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.created_at), 1
    /* TEXT */
    )]);
  }), 128
  /* KEYED_FRAGMENT */
  ))])])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_32, "There is no products.")), _ctx.paginationLinks.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.paginationLinks, function (link, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_link, {
      to: {
        path: "/store/dashboard",
        query: _objectSpread(_objectSpread({}, _ctx.urlGetAllParams(['page'])), {}, {
          page: _ctx.urlParamValueFromName(link.url, 'page')
        })
      },
      key: index,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)("btn btn-link mx-1".concat(!link.url ? ' disabled' : '').concat(link.active === true ? ' btn-activated' : '')),
      innerHTML: link.label
    }, null, 8
    /* PROPS */
    , ["to", "class", "innerHTML"]);
  }), 128
  /* KEYED_FRAGMENT */
  ))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, _hoisted_41))])])])]);
}

/***/ }),

/***/ "./resources/js/components/storefront/UserDashboard.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/storefront/UserDashboard.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UserDashboard_vue_vue_type_template_id_5da8e54d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserDashboard.vue?vue&type=template&id=5da8e54d */ "./resources/js/components/storefront/UserDashboard.vue?vue&type=template&id=5da8e54d");
/* harmony import */ var _UserDashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserDashboard.vue?vue&type=script&lang=js */ "./resources/js/components/storefront/UserDashboard.vue?vue&type=script&lang=js");
/* harmony import */ var E_xampp_htdocs_projects_zucandu_freegifts_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,E_xampp_htdocs_projects_zucandu_freegifts_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_UserDashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_UserDashboard_vue_vue_type_template_id_5da8e54d__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/storefront/UserDashboard.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/storefront/UserDashboard.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/storefront/UserDashboard.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UserDashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UserDashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UserDashboard.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserDashboard.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/storefront/UserDashboard.vue?vue&type=template&id=5da8e54d":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/storefront/UserDashboard.vue?vue&type=template&id=5da8e54d ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UserDashboard_vue_vue_type_template_id_5da8e54d__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UserDashboard_vue_vue_type_template_id_5da8e54d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UserDashboard.vue?vue&type=template&id=5da8e54d */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/UserDashboard.vue?vue&type=template&id=5da8e54d");


/***/ })

}]);