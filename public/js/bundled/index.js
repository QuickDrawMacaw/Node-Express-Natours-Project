// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"f2QDv":[function(require,module,exports) {
/*eslint-disable */ var _mapbox = require("./mapbox");
var _login = require("./login");
var _updateSettings = require("./updateSettings");
//DOM ELEMENTS
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
//DELEGATION
if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    (0, _mapbox.displayMap)(locations);
}
if (loginForm) loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, _login.login)(email, password);
});
if (logOutBtn) logOutBtn.addEventListener("click", (0, _login.logout));
if (userDataForm) userDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    console.log(form);
    (0, _updateSettings.updateSettings)(form, "data");
});
if (userPasswordForm) userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, _updateSettings.updateSettings)({
        passwordCurrent,
        password,
        passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});

},{"./mapbox":"3zDlz","./login":"7yHem","./updateSettings":"l3cGY"}],"3zDlz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "displayMap", ()=>displayMap);
const displayMap = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1IjoieWVydHRhbmdvIiwiYSI6ImNsNDI3NGl2YjRnMGEzYnA3d3p4aWl3dm4ifQ.NF4f-WCg4SA9BL__Vf59wA";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/yerttango/cl429uli1001314ovdbetiqni",
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        //Add marker
        const el = document.createElement("div");
        el.className = "marker";
        //Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"
        }).setLngLat(loc.coordinates).addTo(map);
        //Add popup message
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description} <p>`).addTo(map);
        //Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7yHem":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "logout", ()=>logout);
/*eslint-disable*/ var _alerts = require("./alerts");
const login = async (email, password)=>{
    console.log("LOGIN");
    console.log(email, password);
    try {
        const res = await axios({
            method: "POST",
            url: "api/v1/users/login",
            data: {
                email,
                password
            }
        });
        if (res.data.status === "success") {
            (0, _alerts.showAlert)("success", "Logged in successfully!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (error) {
        (0, _alerts.showAlert)("error", error.response.data.message);
    }
};
const logout = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/users/logout"
        });
        res.data.status = "success";
        (0, _alerts.showAlert)("success", "Logged out successfully!");
        window.setTimeout(()=>{
            location.assign("/");
        }, 1000);
    } catch (error) {
        (0, _alerts.showAlert)("error", "Error logging out! Try again");
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./alerts":"6Mcnf"}],"6Mcnf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hideAlert", ()=>hideAlert);
parcelHelpers.export(exports, "showAlert", ()=>showAlert);
const hideAlert = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg)=>{
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>"`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, 5000);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l3cGY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateSettings", ()=>updateSettings);
/*eslint-disable*/ var _alerts = require("./alerts");
const updateSettings = async (data, type)=>{
    try {
        const url = type === "password" ? "http://localhost:3000/api/v1/users/updateMyPassword" : "http://localhost:3000/api/v1/users/updateMe";
        const res = await axios({
            method: "PATCH",
            url,
            data
        });
        if (res.data.status === "success") (0, _alerts.showAlert)("success", `${type.toUpperCase()} updated successfully!`);
    } catch (err) {
        (0, _alerts.showAlert)("error", err.response.data.message);
    }
}; /*eslint-disable*/ 

},{"./alerts":"6Mcnf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["f2QDv"], "f2QDv", "parcelRequire11c7")

//# sourceMappingURL=index.js.map
