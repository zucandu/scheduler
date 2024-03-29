(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_storefront_Storefront_vue"],{

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/Storefront.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/Storefront.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _store_storefront__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/store/storefront */ "./resources/js/store/storefront.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  created: function created() {
    var _this = this;

    Object.keys(_store_storefront__WEBPACK_IMPORTED_MODULE_0__["default"]).forEach(function (moduleName) {
      _this.$store.registerModule(moduleName, _store_storefront__WEBPACK_IMPORTED_MODULE_0__["default"][moduleName]);
    });
  },
  beforeUnmount: function beforeUnmount() {
    var _this2 = this;

    Object.keys(_store_storefront__WEBPACK_IMPORTED_MODULE_0__["default"]).forEach(function (moduleName) {
      _this2.$store.unregisterModule(moduleName);
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/Storefront.vue?vue&type=template&id=d18b2858":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/Storefront.vue?vue&type=template&id=d18b2858 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-view");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("main", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_view)]);
}

/***/ }),

/***/ "./resources/js/api/storefront/auth.js":
/*!*********************************************!*\
  !*** ./resources/js/api/storefront/auth.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  register: function register(formdata) {
    return axios.post('/api/v1/storefront/register', formdata);
  },
  login: function login(formdata) {
    return axios.post('/api/v1/storefront/login', formdata);
  },
  forgotPassword: function forgotPassword(formdata) {
    return axios.post('/api/v1/storefront/forgot-password', formdata);
  },
  resetPassword: function resetPassword(formdata) {
    return axios.post('/api/v1/storefront/reset-password', formdata);
  }
});

/***/ }),

/***/ "./resources/js/api/storefront/banner.js":
/*!***********************************************!*\
  !*** ./resources/js/api/storefront/banner.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  AllBanners: function AllBanners(params) {
    var queryStr = params.querystr ? "?".concat(params.querystr) : "";
    return axios.get("/api/v1/storefront/user/banner/all".concat(queryStr), {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  DownloadBanners: function DownloadBanners(request) {
    return axios.get("/api/v1/storefront/user/banner/download?page=".concat(request.page), {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  setTimer: function setTimer(formdata) {
    return axios.post("/api/v1/storefront/user/banner/schedule", formdata, {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  }
});

/***/ }),

/***/ "./resources/js/api/storefront/global.js":
/*!***********************************************!*\
  !*** ./resources/js/api/storefront/global.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ "./resources/js/api/storefront/product.js":
/*!************************************************!*\
  !*** ./resources/js/api/storefront/product.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  AllProducts: function AllProducts(params) {
    var queryStr = params.querystr ? "?".concat(params.querystr) : "";
    return axios.get("/api/v1/storefront/user/products/".concat(queryStr), {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  DownloadProducts: function DownloadProducts(request) {
    return axios.get("/api/v1/storefront/user/download-products?page=".concat(request.page), {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  }
});

/***/ }),

/***/ "./resources/js/api/storefront/schedule.js":
/*!*************************************************!*\
  !*** ./resources/js/api/storefront/schedule.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  allCrons: function allCrons() {
    return axios.get("/api/v1/storefront/user/cron/all", {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  createCron: function createCron(formdata) {
    return axios.post("/api/v1/storefront/user/cron/create", formdata, {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  updateCron: function updateCron(formdata) {
    return axios.post("/api/v1/storefront/user/cron/update", formdata, {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  deleteCron: function deleteCron(id) {
    return axios.get("/api/v1/storefront/user/cron/delete/".concat(id), {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  allScheduleSalesPrice: function allScheduleSalesPrice() {
    return axios.get("/api/v1/storefront/user/schedule/all-sales-price", {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  createScheduleSalesPrice: function createScheduleSalesPrice(formdata) {
    return axios.post("/api/v1/storefront/user/schedule/create-sales-price", formdata, {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  updateScheduleSalesPrice: function updateScheduleSalesPrice(formdata) {
    return axios.post("/api/v1/storefront/user/schedule/update-sales-price", formdata, {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  deleteScheduleSalesPrice: function deleteScheduleSalesPrice(id) {
    return axios.get("/api/v1/storefront/user/schedule/delete/".concat(id), {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  AddProducts2Schedule: function AddProducts2Schedule(formdata) {
    return axios.post("/api/v1/storefront/user/schedule/add-products", formdata, {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  }
});

/***/ }),

/***/ "./resources/js/api/storefront/user.js":
/*!*********************************************!*\
  !*** ./resources/js/api/storefront/user.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getUserProfile: function getUserProfile() {
    return axios.get('/api/v1/storefront/user/profile', {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  },
  updateUserProfile: function updateUserProfile(formdata) {
    return axios.post('/api/v1/storefront/user/update-profile', formdata, {
      headers: {
        'Authorization': "Bearer ".concat(localStorage.getItem('jwt_user'))
      }
    });
  }
});

/***/ }),

/***/ "./resources/js/store/modules/storefront/auth.js":
/*!*******************************************************!*\
  !*** ./resources/js/store/modules/storefront/auth.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_storefront_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/storefront/auth */ "./resources/js/api/storefront/auth.js");
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 // initial state

var state = {}; // getters

var getters = {
  isUserToken: function isUserToken() {
    return !_.isEmpty(localStorage.getItem('jwt_user'));
  }
}; // actions 

var actions = {
  login: function login(_ref, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.t0 = commit;
              _context.next = 4;
              return _api_storefront_auth__WEBPACK_IMPORTED_MODULE_1__["default"].login(formdata);

            case 4:
              _context.t1 = _context.sent;
              (0, _context.t0)('setToken', _context.t1);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  register: function register(_ref2, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              _context2.t0 = commit;
              _context2.next = 4;
              return _api_storefront_auth__WEBPACK_IMPORTED_MODULE_1__["default"].register(formdata);

            case 4:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)('setToken', _context2.t1);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  forgotPassword: function forgotPassword(_ref3, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _objectDestructuringEmpty(_ref3);

              _context3.next = 3;
              return _api_storefront_auth__WEBPACK_IMPORTED_MODULE_1__["default"].forgotPassword(formdata);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  resetPassword: function resetPassword(_ref4, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _objectDestructuringEmpty(_ref4);

              _context4.next = 3;
              return _api_storefront_auth__WEBPACK_IMPORTED_MODULE_1__["default"].resetPassword(formdata);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  logout: function logout(_ref5) {
    var commit = _ref5.commit;
    commit('setToken');
    commit('resetProfile');
  }
}; // mutations is often used to filter results

var mutations = {
  setToken: function setToken(_ref6, response) {
    _objectDestructuringEmpty(_ref6);

    response === undefined ? localStorage.removeItem('jwt_user') : localStorage.setItem('jwt_user', response.data.token);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ "./resources/js/store/modules/storefront/banner.js":
/*!*********************************************************!*\
  !*** ./resources/js/store/modules/storefront/banner.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_storefront_banner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/storefront/banner */ "./resources/js/api/storefront/banner.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 // initial state

var state = {
  banners: [],
  paginationLinks: [],
  downloadStatus: {
    total: 0,
    current: 0
  }
}; // getters

var getters = {}; // actions 

var actions = {
  AllBanners: function AllBanners(_ref, params) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var commit, _params, temp, _i, _Object$entries, _Object$entries$_i, key, value;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _params = {
                querystr: ''
              };
              temp = [];

              if (params.objParams && Object.keys(params.objParams).length > 0) {
                for (_i = 0, _Object$entries = Object.entries(params.objParams); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                  temp = [].concat(_toConsumableArray(temp), ["".concat(key, "=").concat(value)]);
                }
              }

              _params.querystr = temp.join('&');
              _context.t0 = commit;
              _context.next = 8;
              return _api_storefront_banner__WEBPACK_IMPORTED_MODULE_1__["default"].AllBanners(_params);

            case 8:
              _context.t1 = _context.sent;
              (0, _context.t0)('SET_BANNERS', _context.t1);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  DownloadBanners: function DownloadBanners(_ref2, request) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              _context2.t0 = commit;
              _context2.next = 4;
              return _api_storefront_banner__WEBPACK_IMPORTED_MODULE_1__["default"].DownloadBanners(request);

            case 4:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)('SET_DOWNLOAD', _context2.t1);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  setTimer: function setTimer(_ref3, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref3.commit;
              _context3.next = 3;
              return _api_storefront_banner__WEBPACK_IMPORTED_MODULE_1__["default"].setTimer(formdata);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
}; // mutations is often used to filter results

var mutations = {
  SET_BANNERS: function SET_BANNERS(state, res) {
    var _res$data$paginator = res.data.paginator,
        data = _res$data$paginator.data,
        links = _res$data$paginator.links;
    state.banners = data;
    state.paginationLinks = links;
  },
  SET_DOWNLOAD: function SET_DOWNLOAD(state, res) {
    state.downloadStatus = _objectSpread({}, res.data);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ "./resources/js/store/modules/storefront/global.js":
/*!*********************************************************!*\
  !*** ./resources/js/store/modules/storefront/global.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_storefront_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/storefront/global */ "./resources/js/api/storefront/global.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

 // initial state

var state = {
  alert: {}
}; // getters

var getters = {
  translation: function translation() {
    return function (item, field, locale) {
      if (!_.isEmpty(item.translations)) {
        return item.translations.find(function (trans) {
          return trans.locale === locale;
        })[field] || {};
      }
    };
  },
  urlGetAllParams: function urlGetAllParams() {
    return function () {
      var excludingParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      // Always ignore just_created: show message 
      // when product have just created
      var __excludingParams = [].concat(_toConsumableArray(excludingParams), ['just_created']);

      var __params = {};
      var paramstring = window.location.search.substring(1);
      var params = paramstring.split('&');
      params.forEach(function (p) {
        var _p$split = p.split('='),
            _p$split2 = _slicedToArray(_p$split, 2),
            key = _p$split2[0],
            value = _p$split2[1];

        if (key && __excludingParams.includes(key) === false) {
          __params[key] = value.replace(/\+/g, ' ');
        }
      });
      return __params;
    };
  },
  urlParamValueFromName: function urlParamValueFromName() {
    return function (url, paramName) {
      if (!url) return undefined;
      var objURL = new URL(url);
      return objURL.searchParams.get(paramName);
    };
  },
  moneyFormat: function moneyFormat() {
    return function (price, decimal) {
      return (+price).toFixed(decimal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
  }
}; // actions 

var actions = {}; // mutations is often used to filter results

var mutations = {
  setAlert: function setAlert(state, response) {
    state.alert = _objectSpread(_objectSpread({}, response), {}, {
      time: new Date().getTime()
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ "./resources/js/store/modules/storefront/product.js":
/*!**********************************************************!*\
  !*** ./resources/js/store/modules/storefront/product.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_storefront_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/storefront/product */ "./resources/js/api/storefront/product.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 // initial state

var state = {
  products: [],
  paginationLinks: [],
  downloadStatus: {
    total: 0,
    current: 0
  }
}; // getters

var getters = {}; // actions 

var actions = {
  AllProducts: function AllProducts(_ref, params) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var commit, _params, temp, _i, _Object$entries, _Object$entries$_i, key, value;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _params = {
                querystr: ''
              };
              temp = [];

              if (params.objParams && Object.keys(params.objParams).length > 0) {
                for (_i = 0, _Object$entries = Object.entries(params.objParams); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                  temp = [].concat(_toConsumableArray(temp), ["".concat(key, "=").concat(value)]);
                }
              }

              _params.querystr = temp.join('&');
              _context.t0 = commit;
              _context.next = 8;
              return _api_storefront_product__WEBPACK_IMPORTED_MODULE_1__["default"].AllProducts(_params);

            case 8:
              _context.t1 = _context.sent;
              (0, _context.t0)('SET_PRODUCTS', _context.t1);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  DownloadProducts: function DownloadProducts(_ref2, request) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              _context2.t0 = commit;
              _context2.next = 4;
              return _api_storefront_product__WEBPACK_IMPORTED_MODULE_1__["default"].DownloadProducts(request);

            case 4:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)('SET_DOWNLOAD', _context2.t1);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
}; // mutations is often used to filter results

var mutations = {
  SET_PRODUCTS: function SET_PRODUCTS(state, res) {
    var _res$data$paginator = res.data.paginator,
        data = _res$data$paginator.data,
        links = _res$data$paginator.links;
    state.products = data;
    state.paginationLinks = links;
  },
  SET_DOWNLOAD: function SET_DOWNLOAD(state, res) {
    state.downloadStatus = _objectSpread({}, res.data);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ "./resources/js/store/modules/storefront/schedule.js":
/*!***********************************************************!*\
  !*** ./resources/js/store/modules/storefront/schedule.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/storefront/schedule */ "./resources/js/api/storefront/schedule.js");
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 // initial state

var state = {
  schedules: [],
  scheduleSalesPrice: []
}; // getters

var getters = {}; // actions 

var actions = {
  allCrons: function allCrons(_ref) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.t0 = commit;
              _context.next = 4;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].allCrons();

            case 4:
              _context.t1 = _context.sent;
              (0, _context.t0)('setSchedules', _context.t1);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  createCron: function createCron(_ref2, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _objectDestructuringEmpty(_ref2);

              _context2.next = 3;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].createCron(formdata);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  updateCron: function updateCron(_ref3, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _objectDestructuringEmpty(_ref3);

              _context3.next = 3;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].updateCron(formdata);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  deleteCron: function deleteCron(_ref4, id) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _objectDestructuringEmpty(_ref4);

              _context4.next = 3;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].deleteCron(id);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  allScheduleSalesPrice: function allScheduleSalesPrice(_ref5) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commit = _ref5.commit;
              _context5.t0 = commit;
              _context5.next = 4;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].allScheduleSalesPrice();

            case 4:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)('setScheduleSalesPrice', _context5.t1);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  createScheduleSalesPrice: function createScheduleSalesPrice(_ref6, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              commit = _ref6.commit;
              _context6.t0 = commit;
              _context6.next = 4;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].createScheduleSalesPrice(formdata);

            case 4:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)('setScheduleSalesPrice', _context6.t1);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  updateScheduleSalesPrice: function updateScheduleSalesPrice(_ref7, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              commit = _ref7.commit;
              _context7.t0 = commit;
              _context7.next = 4;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].updateScheduleSalesPrice(formdata);

            case 4:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)('setScheduleSalesPrice', _context7.t1);

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  deleteScheduleSalesPrice: function deleteScheduleSalesPrice(_ref8, id) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _objectDestructuringEmpty(_ref8);

              _context8.next = 3;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].deleteScheduleSalesPrice(id);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  AddProducts2Schedule: function AddProducts2Schedule(_ref9, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _objectDestructuringEmpty(_ref9);

              _context9.next = 3;
              return _api_storefront_schedule__WEBPACK_IMPORTED_MODULE_1__["default"].AddProducts2Schedule(formdata);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  }
}; // mutations is often used to filter results

var mutations = {
  setSchedules: function setSchedules(state, response) {
    state.schedules = response.data.schedules;
  },
  setScheduleSalesPrice: function setScheduleSalesPrice(state, response) {
    state.scheduleSalesPrice = response.data.schedule_sales_price;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ "./resources/js/store/modules/storefront/user.js":
/*!*******************************************************!*\
  !*** ./resources/js/store/modules/storefront/user.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_storefront_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/storefront/user */ "./resources/js/api/storefront/user.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 // initial state

var state = {
  profile: {}
}; // getters

var getters = {
  isUserLogged: function isUserLogged(state) {
    return !_.isEmpty(state.profile) && !_.isEmpty(localStorage.getItem('jwt_user'));
  }
}; // actions 

var actions = {
  getUserProfile: function getUserProfile(_ref) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.t0 = commit;
              _context.next = 4;
              return _api_storefront_user__WEBPACK_IMPORTED_MODULE_1__["default"].getUserProfile();

            case 4:
              _context.t1 = _context.sent;
              (0, _context.t0)('setUserProfile', _context.t1);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  updateUserProfile: function updateUserProfile(_ref2, formdata) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var commit;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              _context2.t0 = commit;
              _context2.next = 4;
              return _api_storefront_user__WEBPACK_IMPORTED_MODULE_1__["default"].updateUserProfile(formdata);

            case 4:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)('setUserProfile', _context2.t1);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
}; // mutations is often used to filter results

var mutations = {
  setUserProfile: function setUserProfile(state, response) {
    state.profile = response.data.user;
  },
  resetProfile: function resetProfile(state) {
    return state.profile = {};
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ "./resources/js/store/storefront.js":
/*!******************************************!*\
  !*** ./resources/js/store/storefront.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _store_modules_storefront_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/store/modules/storefront/global */ "./resources/js/store/modules/storefront/global.js");
/* harmony import */ var _store_modules_storefront_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/modules/storefront/auth */ "./resources/js/store/modules/storefront/auth.js");
/* harmony import */ var _store_modules_storefront_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/modules/storefront/user */ "./resources/js/store/modules/storefront/user.js");
/* harmony import */ var _store_modules_storefront_schedule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/modules/storefront/schedule */ "./resources/js/store/modules/storefront/schedule.js");
/* harmony import */ var _store_modules_storefront_product__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/store/modules/storefront/product */ "./resources/js/store/modules/storefront/product.js");
/* harmony import */ var _store_modules_storefront_banner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store/modules/storefront/banner */ "./resources/js/store/modules/storefront/banner.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  global: _store_modules_storefront_global__WEBPACK_IMPORTED_MODULE_0__["default"],
  auth: _store_modules_storefront_auth__WEBPACK_IMPORTED_MODULE_1__["default"],
  user: _store_modules_storefront_user__WEBPACK_IMPORTED_MODULE_2__["default"],
  schedule: _store_modules_storefront_schedule__WEBPACK_IMPORTED_MODULE_3__["default"],
  product: _store_modules_storefront_product__WEBPACK_IMPORTED_MODULE_4__["default"],
  banner: _store_modules_storefront_banner__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./resources/js/components/storefront/Storefront.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/storefront/Storefront.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Storefront_vue_vue_type_template_id_d18b2858__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storefront.vue?vue&type=template&id=d18b2858 */ "./resources/js/components/storefront/Storefront.vue?vue&type=template&id=d18b2858");
/* harmony import */ var _Storefront_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Storefront.vue?vue&type=script&lang=js */ "./resources/js/components/storefront/Storefront.vue?vue&type=script&lang=js");
/* harmony import */ var E_xampp_htdocs_projects_zucandu_scheduler_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,E_xampp_htdocs_projects_zucandu_scheduler_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Storefront_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Storefront_vue_vue_type_template_id_d18b2858__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/storefront/Storefront.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/storefront/Storefront.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/storefront/Storefront.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Storefront_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Storefront_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Storefront.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/Storefront.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/storefront/Storefront.vue?vue&type=template&id=d18b2858":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/storefront/Storefront.vue?vue&type=template&id=d18b2858 ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Storefront_vue_vue_type_template_id_d18b2858__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Storefront_vue_vue_type_template_id_d18b2858__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Storefront.vue?vue&type=template&id=d18b2858 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/storefront/Storefront.vue?vue&type=template&id=d18b2858");


/***/ })

}]);