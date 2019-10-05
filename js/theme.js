// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"accessibility.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessibilityInit = init;
exports.buttonHandler = buttonHandler;
exports.toggleHandler = toggleHandler;
exports.toggleButtonState = toggleButtonState;

/**
 * Initialize accessibility helpers
 */
function init() {
  var buttons = document.querySelectorAll('[role="button"]');

  for (var i = 0; i < buttons.length; ++i) {
    if ("target" in buttons[i].dataset) {
      buttons[i].addEventListener("click", toggleHandler);
      buttons[i].addEventListener("keydown", toggleHandler);
      buttons[i].addEventListener("keyup", toggleHandler);
    } else {
      buttons[i].addEventListener("click", buttonHandler);
      buttons[i].addEventListener("keydown", buttonHandler);
      buttons[i].addEventListener("keyup", buttonHandler);
    }
  }

  var links = document.querySelectorAll("a[href]");

  for (var i = 0; i < links.length; ++i) {
    links[i].addEventListener("click", buttonHandler);
    links[i].addEventListener("keydown", buttonHandler);
    links[i].addEventListener("keyup", buttonHandler);
  }

  if (document.querySelector(".next-previous") && document.querySelector("body").classList.contains("docs")) {
    window.addEventListener("keydown", function (event) {
      switch (event.code) {
        case "ArrowLeft":
          if (document.querySelector(".next-previous article:first-of-type a")) {
            document.querySelector(".next-previous article:first-of-type a").click();
          }

          break;

        case "ArrowRight":
          if (document.querySelector(".next-previous article:last-of-type a")) {
            document.querySelector(".next-previous article:last-of-type a").click();
          }

          break;
      }
    }, true);
  }
}
/**
 * @param {MouseEvent|KeyboardEvent} event
 */


function buttonHandler(event) {
  if (event.target.hasAttribute("href")) {
    switch (event.code) {
      case "Space":
        event.target.click();
        window.location = event.target.getAttribute("href");
        break;

      case "Enter":
        event.target.click();
        window.location = event.target.getAttribute("href");
        break;
    }
  }
}
/**
 * @param {MouseEvent|KeyboardEvent} event
 */


function toggleHandler(event) {
  var targetElement = document.querySelector(event.target.dataset.target);

  if (event.type === "click") {
    toggleButtonState(targetElement);
  } else if (event.type === "keydown") {
    switch (event.code) {
      case "Space":
        toggleButtonState(targetElement);
        break;

      case "Enter":
        toggleButtonState(targetElement);
        break;

      case "Escape":
        toggleButtonState(targetElement, "false");
        break;
    }
  }
}
/**
 * Toggles the button's  target's state
 *
 * @param {HTMLElement} targetElement
 * @param {Boolean} force
 */


function toggleButtonState(targetElement) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (targetElement.hasAttribute("aria-checked")) {
    if (force) {
      targetElement.setAttribute("aria-checked", force);
      return;
    }

    if (targetElement.getAttribute("aria-checked") === "true") {
      targetElement.setAttribute("aria-checked", "false");
    } else if (targetElement.getAttribute("aria-checked") === "false") {
      targetElement.setAttribute("aria-checked", "true");
    }
  }

  if (targetElement.hasAttribute("aria-pressed")) {
    if (force) {
      targetElement.setAttribute("aria-pressed", force);
      return;
    }

    if (targetElement.getAttribute("aria-pressed") === "true") {
      targetElement.setAttribute("aria-pressed", "false");
    } else if (targetElement.getAttribute("aria-pressed") === "false") {
      targetElement.setAttribute("aria-pressed", "true");
    }
  }
}
},{}],"search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchFieldInit = searchFieldInit;
exports.searchPageInit = searchPageInit;

/**
 * Initialize metadata and content search
 * @param {object[]} data An array of objects, each representing a Page
 * @param {array} fields List of fields in each data-object
 */
function searchFieldInit(data, fields, options) {
  var start = performance.now();
  var dataIndex;
  var FlexSearchOptions = options;
  FlexSearchOptions.doc = {
    id: "url",
    field: fields
  };

  try {
    dataIndex = new FlexSearch(FlexSearchOptions);
    dataIndex.add(data);
    console.debug("FlexSearch add(n = ".concat(data.length, "): ").concat(msToTime(performance.now() - start)));
  } catch (error) {
    throw new Error(error);
  }

  try {
    document.querySelector("#query").addEventListener("keyup", debounce(function (event) {
      dataIndex.search(event.srcElement.value, 10).then(function (results) {
        console.debug("FlexSearch search(n = ".concat(results.length, "): ").concat(msToTime(performance.now() - start)));
        renderResults(results);
        console.debug("FlexSearch render(n = ".concat(results.length, "): ").concat(msToTime(performance.now() - start)));
      });
    }, 200));
    document.querySelector("#query").addEventListener("focus", function (event) {
      event.srcElement.setAttribute("aria-checked", "true");
      document.querySelectorAll("main section")[0].style.setProperty("display", "none");
      document.querySelector("main aside.search").setAttribute("aria-expanded", "true");
      document.querySelector("main aside.search").style.setProperty("display", "block");
    });
    document.querySelector("#query").addEventListener("blur", function (event) {
      event.srcElement.setAttribute("aria-checked", "false");
      document.querySelectorAll("main section")[0].style.removeProperty("display");
      document.querySelector("main aside.search").setAttribute("aria-expanded", "false");
      document.querySelector("main aside.search").style.removeProperty("display");
    });
  } catch (error) {
    throw new Error(error);
  }
}
/**
 * Initialize metadata and content search
 * @param {object[]} data An array of objects, each representing a Page
 * @param {array} fields List of fields in each data-object
 */


function searchPageInit(data, fields, options) {
  var start = performance.now();
  var dataIndex;
  var FlexSearchOptions = options;
  FlexSearchOptions.doc = {
    id: "url",
    field: fields
  };
  var query = {
    title: "",
    date: "",
    categories: [],
    tags: [],
    content: ""
  };

  try {
    dataIndex = new FlexSearch(FlexSearchOptions);
    dataIndex.add(data);
    console.debug("FlexSearch add(n = ".concat(data.length, "): ").concat(msToTime(performance.now() - start)));
  } catch (error) {
    throw new Error(error);
  }

  try {
    document.querySelector(".search-query #title").addEventListener("keyup", debounce(function (event) {
      query.title = event.srcElement.value;
      search(dataIndex, fields, query);
    }, 200));
    document.querySelector(".search-query #date").addEventListener("change", function (event) {
      query.date = event.srcElement.value;
      search(dataIndex, fields, query);
    });

    if (typeof categoriesSelector !== "undefined") {
      categoriesSelector.on("selectr.select", function (option) {
        if (option.selected) {
          query.categories.push(option.value);
          search(dataIndex, fields, query);
        }
      });
      categoriesSelector.on("selectr.deselect", function (option) {
        if (!option.selected) {
          if (dataIndex !== -1) {
            query.categories.splice(query.categories.indexOf(option.value), 1);
          }

          search(dataIndex, fields, query);
        }
      });
    }

    if (typeof tagsSelector !== "undefined") {
      tagsSelector.on("selectr.select", function (option) {
        if (option.selected) {
          query.tags.push(option.value);
          search(dataIndex, fields, query);
        }
      });
      tagsSelector.on("selectr.deselect", function (option) {
        if (!option.selected) {
          if (dataIndex !== -1) {
            query.tags.splice(query.tags.indexOf(option.value), 1);
          }

          search(dataIndex, fields, query);
        }
      });
    }

    document.querySelector(".search-query #content").addEventListener("keyup", debounce(function (event) {
      query.content = event.srcElement.value;
      search(dataIndex, fields, query);
    }, 200));
  } catch (error) {
    throw new Error(error);
  }
}
/**
 *
 * @param {object} index Data to search
 * @param {array} fields List of fields in each data-object
 * @param {object} query Field constraints
 */


function search(index, fields, query) {
  var start = performance.now();
  var data = index.where(function (doc) {
    return limitSearch(query, doc);
  });
  console.debug("FlexSearch where(n = ".concat(data.length, "): ").concat(msToTime(performance.now() - start)));

  if (query.title !== "" || query.content !== "") {
    contentIndex = new FlexSearch({
      profile: "balance",
      encode: "advanced",
      tokenize: "full",
      cache: true,
      async: true,
      doc: {
        id: "url",
        field: fields
      }
    });

    for (var i = 0; i < data.length; i++) {
      contentIndex.add(data[i]);
    }

    if (query.title !== "" && query.content === "") {
      fieldQuery = [{
        field: "title",
        query: query.title
      }];
    } else if (query.title === "" && query.content !== "") {
      fieldQuery = [{
        field: "content",
        query: query.content
      }];
    } else {
      fieldQuery = [{
        field: "title",
        query: query.title,
        bool: "and"
      }, {
        field: "content",
        query: query.content,
        bool: "or"
      }];
    }

    contentIndex.search(fieldQuery, 10).then(function (results) {
      console.debug("FlexSearch search(n = ".concat(results.length, "): ").concat(msToTime(performance.now() - start)));
      renderResults(results);
      console.debug("FlexSearch render(n = ".concat(results.length, "): ").concat(msToTime(performance.now() - start)));
    });
  } else if (query.title === "" && query.content === "") {
    renderResults(data.slice(0, 9));
    console.debug("FlexSearch render(n = ".concat(data.length, "): ").concat(msToTime(performance.now() - start)));
  }
}
/**
 * Constrain search results by field values
 * @param {object} query Field constraints
 * @param {object} doc Document
 */


function limitSearch(query, doc) {
  var state = false;

  if (query.date === "" && query.categories.length == 0 && query.tags.length == 0) {
    state = true;
  }

  if (query.date !== "") {
    state = function (d1, d2) {
      d1 = new Date(d1);
      d2 = new Date(d2);
      return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }(query.date, doc.date);
  }

  if (query.categories.length > 0) {
    state = query.categories.every(function (v) {
      return doc.taxonomy.categories.includes(v);
    });
  }

  if (query.tags.length > 0) {
    state = query.tags.every(function (v) {
      return doc.taxonomy.tags.includes(v);
    });
  }

  return state;
}
/**
 * Render search results
 * @param {object} results Search results
 */


function renderResults(results) {
  document.querySelector(".search-results").innerHTML = "";

  if (results.length < 1) {
    var paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode(ScholarTranslation.SEARCH.EMPTY));
    document.querySelector(".search-results").appendChild(paragraph);
  }

  for (var i = 0; i < results.length; i++) {
    var item = document.querySelector("#search-result");
    var template = document.importNode(item.content, true);
    template.querySelector("h3 a").textContent = results[i].title;
    template.querySelector("h3 a").setAttribute("href", results[i].url);

    var _paragraph = template.querySelector("p");

    _paragraph.appendChild(document.createTextNode(ScholarTranslation.GENERIC.AT + " "));

    renderTime(_paragraph, results[i].date);
    renderTaxonomy(_paragraph, results[i].taxonomy.categories, "category", ScholarTranslation.GENERIC.IN);
    renderTaxonomy(_paragraph, results[i].taxonomy.tags, "tag", ScholarTranslation.GENERIC.WITH);

    _paragraph.appendChild(document.createTextNode("."));

    _paragraph.normalize();

    document.querySelector(".search-results").appendChild(template);
  }
}
/**
 * Create a localized time-tag
 * @param {HTMLElement} paragraph Reference to p-tag
 * @param {string} data Datetime as string
 */


function renderTime(paragraph, data) {
  var anchor = document.createElement("a");
  anchor.setAttribute("href", "#");
  var time = document.createElement("time");
  time.setAttribute("datetime", data);
  time.appendChild(document.createTextNode(dayjs(data).format(toDayJSFormat(systemDateformat.short))));
  anchor.appendChild(time);
  paragraph.appendChild(anchor);
}
/**
 * Create a-tags for taxonomy items
 * @param {HTMLElement} paragraph Reference to p-tag
 * @param {string|array} data Page taxonomy
 * @param {string} name Class name
 * @param {string} separator Semantic word
 */


function renderTaxonomy(paragraph, data, name, separator) {
  if (data === "" || data.length < 1) {
    return;
  }

  paragraph.appendChild(document.createTextNode(" ".concat(separator, " ")));

  if (typeof data === "string" || data instanceof String) {
    if (data.includes(" ")) {
      data = data.split(" ");
    } else {
      data = [data];
    }
  }

  for (var n = 0; n < data.length; n++) {
    var taxonomy = document.createElement("a");
    taxonomy.classList.add(name);
    taxonomy.setAttribute("href", "#");
    taxonomy.appendChild(document.createTextNode(data[n]));

    if (n > 0 && n < data.length) {
      paragraph.appendChild(document.createTextNode(", "));
    }

    paragraph.appendChild(taxonomy);
  }
}
/**
 * Debounce execution of callback
 * @param {function} func Function to execute
 * @param {int} delay Millisecond delay
 * @see https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
 */


function debounce(func, delay) {
  var inDebounce;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(function () {
      return func.apply(context, args);
    }, delay);
  };
}
/**
 * Throttle execution of callback
 * @param {function} func Function to execute
 * @param {int} limit Millisecond limit
 * @see https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
 */


function throttle(func, limit) {
  var lastFunc;
  var lastRan;
  return function () {
    var context = this;
    var args = arguments;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
/**
 * Convert PHP date format to Moment date format
 * @param {string} format PHP date format
 */


function toMomentFormat(format) {
  var conversions = {
    d: "DD",
    D: "ddd",
    j: "D",
    l: "dddd",
    N: "E",
    S: "o",
    w: "e",
    z: "DDD",
    W: "W",
    F: "MMMM",
    m: "MM",
    M: "MMM",
    n: "M",
    t: "",
    L: "",
    o: "YYYY",
    Y: "YYYY",
    y: "YY",
    a: "a",
    A: "A",
    B: "",
    g: "h",
    G: "H",
    h: "hh",
    H: "HH",
    i: "mm",
    s: "ss",
    u: "SSS",
    e: "zz",
    I: "",
    O: "",
    P: "",
    T: "",
    Z: "",
    c: "",
    r: "",
    U: "X",
    " ": " "
  };
  var items = format.split("");
  var momentFormat = "";

  for (var item in items) {
    momentFormat += conversions[items[item]];
  }

  return momentFormat;
}
/**
 * Convert PHP date format to DayJS date format
 * @param {string} format PHP date format
 */


function toDayJSFormat(format) {
  var conversions = {
    d: "DD",
    D: "ddd",
    j: "D",
    l: "dddd",
    N: "",
    S: "o",
    w: "d",
    z: "",
    W: "",
    F: "MMMM",
    m: "MM",
    M: "MMM",
    n: "M",
    t: "",
    L: "",
    o: "YYYY",
    Y: "YYYY",
    y: "YY",
    a: "a",
    A: "A",
    B: "",
    g: "h",
    G: "H",
    h: "hh",
    H: "HH",
    i: "mm",
    s: "ss",
    u: "",
    v: "SSS",
    e: "",
    I: "",
    O: "ZZ",
    P: "Z",
    T: "",
    Z: "",
    c: "",
    r: "",
    U: "X",
    " ": " "
  };
  var items = format.split("");
  var momentFormat = "";

  for (var item in items) {
    momentFormat += conversions[items[item]];
  }

  return momentFormat;
}
/**
 * Convert milliseconds to human readable time
 * @param {number} millisec Float containing milliseconds
 * @see https://stackoverflow.com/a/32180863
 */


function msToTime(millisec) {
  var milliseconds = millisec.toFixed(2);
  var seconds = (millisec / 1000).toFixed(1);
  var minutes = (millisec / (1000 * 60)).toFixed(1);
  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds <= 0) {
    return milliseconds + " ms";
  } else if (seconds < 60) {
    return seconds + " sec";
  } else if (minutes < 60) {
    return minutes + " min";
  } else if (hours < 24) {
    return hours + " hrs";
  } else {
    return days + " days";
  }
}
},{}],"tinyDrawer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawerInit = init;
exports.tinyDrawerOpen = tinyDrawerOpen;
exports.tinyDrawerClose = tinyDrawerClose;
exports.tinyDrawerObj = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * TinyDrawer.js
 * Modified for the Scholar Theme
 * @see https://github.com/jenstornell/tinyDrawer.js
 */
var TinyDrawer =
/*#__PURE__*/
function () {
  function TinyDrawer(options) {
    _classCallCheck(this, TinyDrawer);

    this.o = Object.assign({}, this.defaults(), options);
  }

  _createClass(TinyDrawer, [{
    key: "load",
    value: function load() {
      var _this = this;

      document.addEventListener("DOMContentLoaded", function () {
        _this.setup();
      });
    }
  }, {
    key: "defaults",
    value: function defaults() {
      return {
        replacement: "drawer",
        drawerSelector: "drawer-menu"
      };
    }
  }, {
    key: "setup",
    value: function setup() {
      this.elementDrawer = document.querySelector(this.o.drawerSelector);

      if (!this.elementDrawer && this.elementDrawer.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      this.backdropAdd();
      this.activeUnset();
      this.elementOpen = document.querySelectorAll("[data-" + this.o.replacement + "-open]");
      this.elementClose = document.querySelectorAll("[data-" + this.o.replacement + "-backdrop], [data-" + this.o.replacement + "-close]");
      window.addEventListener("keydown", function (event) {
        switch (event.code) {
          case "Escape":
            if (Scholar.tinyDrawerObj.elementDrawer.getAttribute("aria-checked") === "true") {
              Scholar.toggleButtonState(Scholar.tinyDrawerObj.elementDrawer, "false");
            }

            break;
        }
      }, true);
      this.elementBackdrop.addEventListener("click", function (event) {
        if (Scholar.tinyDrawerObj.elementDrawer.getAttribute("aria-checked") === "true") {
          Scholar.toggleButtonState(Scholar.tinyDrawerObj.elementDrawer, "false");
        }
      }, true);
      this.observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type == "attributes") {
            if (mutation.target.getAttribute("aria-checked") === "true") {
              Scholar.tinyDrawerOpen(mutation.target);
            } else if (mutation.target.getAttribute("aria-checked") === "false") {
              Scholar.tinyDrawerClose(mutation.target);
            }
          }
        });
      });
      this.observer.observe(this.elementDrawer, {
        attributes: true
      });
    }
  }, {
    key: "activeUnset",
    value: function activeUnset() {
      document.body.dataset[this.o.replacement] = "";
    }
  }, {
    key: "activeSet",
    value: function activeSet() {
      document.body.dataset[this.o.replacement] = true;
    }
  }, {
    key: "offsetTopToVariable",
    value: function offsetTopToVariable() {
      var offsets = document.body.getBoundingClientRect();
      this.top = -offsets.top;
    }
  }, {
    key: "open",
    value: function open() {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.activeSet();
      this.offsetTopToVariable();
      this.callback(element, "open");
      document.querySelector(".drawer .drawer-inner").setAttribute("aria-expanded", "true");
    }
  }, {
    key: "close",
    value: function close() {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.activeUnset();
      window.scrollTo(0, Math.abs(document.body.getBoundingClientRect().top));
      this.callback(element, "close");
      document.querySelector(".drawer .drawer-inner").setAttribute("aria-expanded", "false");
    }
  }, {
    key: "backdropAdd",
    value: function backdropAdd() {
      var backdrop = document.createElement("div");
      backdrop.dataset[this.o.replacement + "Backdrop"] = "";
      document.body.appendChild(backdrop);
      this.elementBackdrop = document.querySelector("[data-" + this.o.replacement + "-backdrop]");
    }
  }, {
    key: "callback",
    value: function callback(element, action) {
      if (typeof this.o.callback == "undefined") return;
      this.o.callback(element, action);
    }
  }]);

  return TinyDrawer;
}();

var tinyDrawerObj;
exports.tinyDrawerObj = tinyDrawerObj;

function init() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  exports.tinyDrawerObj = tinyDrawerObj = new TinyDrawer(options);
  tinyDrawerObj.load();
  return tinyDrawerObj;
}

function tinyDrawerOpen() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var target = e ? e.target : null;
  tinyDrawerObj.open(target);
}

function tinyDrawerClose() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var target = e ? e.target : null;
  tinyDrawerObj.close(target);
}
},{}],"leader-line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leaderLineInit = init;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function init() {
  var links = document.querySelectorAll("[data-links-to]");

  if (links.length > 0) {
    for (var i = 0; i < links.length; i++) {
      if (links[i].dataset.linksTo.length < 1) {
        continue;
      }

      var linksTo = JSON.parse(links[i].dataset.linksTo);

      if (_typeof(linksTo) == "object") {
        for (var n = 0; n < linksTo.length; n++) {
          var line = new LeaderLine(links[i], document.getElementById(linksTo[n]), {}); // line.id = i + "-" + n;
          // line.id = links[i].id + "--" + linksTo[n];
          // console.log(line.id, line);
          // console.log(document.getElementById(line.id));

          if (links[i].id == "sequence-selvstendighet" && document.getElementById(linksTo[n]).id == "sequence-endringer-relasjoner") {
            // console.log(
            //   "sequence-selvstendighet to sequence-endringer-relasjoner",
            //   line,
            //   line.id,
            //   line._id
            // );
            // console.log(
            //   "LINE_Y: ",
            //   links[i].getBoundingClientRect().top +
            //     window.pageYOffset +
            //     links[i].getBoundingClientRect().height / 2
            // );
            line.color = "rgba(30, 130, 250, 0.5)";
            /* line.setOptions({
              // startSocket: "bottom",
              // endSocket: "left",
              startSocketGravity: [192, -172],
              endSocketGravity: [-192, -172]
            }); */
          }
        }
      }
    }

    var sections = document.querySelectorAll(".sequence main article [role=list]");

    if (sections.length > 0) {
      for (var _i = 0; _i < sections.length; _i++) {
        var dimensions = sections[_i].getBoundingClientRect();

        var computedStyles = window.getComputedStyle(sections[_i]);
        var shadow = document.createElement("div");
        shadow.style.position = "absolute";
        shadow.style.top = dimensions.top + "px";
        shadow.style.right = dimensions.right + "px";
        shadow.style.bottom = dimensions.bottom + "px";
        shadow.style.left = dimensions.left + "px";
        shadow.style.width = dimensions.width + "px";
        shadow.style.height = dimensions.height + "px";
        shadow.style.backgroundColor = computedStyles.getPropertyValue("background-color");
        sections[_i].style.backgroundColor = "transparent";
        document.querySelector(".sequence main article").append(shadow);
      }
    }

    document.querySelectorAll(".leader-line").forEach(function (line) {
      document.querySelector(".sequence main article").append(line);
    });
  }
}
},{}],"theme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accessibility = require("./accessibility.js");

Object.keys(_accessibility).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _accessibility[key];
    }
  });
});

var _search = require("./search.js");

Object.keys(_search).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _search[key];
    }
  });
});

var _tinyDrawer = require("./tinyDrawer.js");

Object.keys(_tinyDrawer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tinyDrawer[key];
    }
  });
});

var _leaderLine = require("./leader-line.js");

Object.keys(_leaderLine).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _leaderLine[key];
    }
  });
});

// window.onload = function() {
//   Scholar.accessibilityInit();
//   Scholar.drawerInit();
// };
// Accept proper HMR in Parcel
if (module && module.hot) {
  module.hot.accept();
}
},{"./accessibility.js":"accessibility.js","./search.js":"search.js","./tinyDrawer.js":"tinyDrawer.js","./leader-line.js":"leader-line.js"}],"../../node_modules/.registry.npmjs.org/parcel-bundler/1.12.3/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52084" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/.registry.npmjs.org/parcel-bundler/1.12.3/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","theme.js"], "Scholar")
//# sourceMappingURL=/theme.js.map