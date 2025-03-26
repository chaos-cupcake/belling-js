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
        globalObject
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
})({"jRxy6":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "876b777807c3b916";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"2TzyT":[function(require,module,exports,__globalThis) {
var _belling = require("./belling");
var _bellingDom = require("./belling-dom");
function main() {
    const text = (0, _belling.state)("");
    return (0, _bellingDom.div)((0, _bellingDom.textarea)().on({
        input (e) {
            text.v = e.target.value;
        }
    }), (0, _bellingDom.ForEach)("div", (0, _belling.compute)(()=>text.v.split("\n")), (line)=>{
        return (0, _bellingDom.p)(line);
    }));
}
new (0, _bellingDom.root)(document.body, main());

},{"./belling":"grzFx","./belling-dom":"8hBuc"}],"grzFx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Compute", ()=>b);
parcelHelpers.export(exports, "State", ()=>C);
parcelHelpers.export(exports, "Stop", ()=>p);
parcelHelpers.export(exports, "Watcher", ()=>W);
parcelHelpers.export(exports, "compute", ()=>M);
parcelHelpers.export(exports, "makeArr", ()=>_);
parcelHelpers.export(exports, "state", ()=>B);
parcelHelpers.export(exports, "watcher", ()=>q);
var k = (e, t, r)=>{
    if (!t.has(e)) throw TypeError("Cannot " + r);
};
var E = (e, t, r)=>(k(e, t, "read from private field"), r ? r.call(e) : t.get(e)), F = (e, t, r)=>{
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, v = (e, t, r, n)=>(k(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var { max: D, min: x } = Math;
function w(e, t) {
    return x(e < 0 ? D(0, t + e) : e, t - 1);
}
function c(e, t, r) {
    if (e.length == 0 || t == 0 && r == e.length) return e;
    if (e.data) {
        let n = new T;
        return n.off = t + e.off, n.length = r, n.data = e.data, Object.freeze(n), n;
    } else {
        let { left: n, right: i } = e;
        if (!(n instanceof T && i instanceof T)) throw new TypeError;
        if (t > n.length) return c(i, t - n.length, r);
        if (t + r < n.length) return c(n, t, r);
        let s = new T, o = n.length - t;
        return s.left = c(n, t, o), s.right = c(i, 0, r - o), s.length = r, s;
    }
}
function L(e, t) {
    let r = new T;
    return r.left = e, r.right = t, r.length = t.length + e.length, r;
}
function _(...e) {
    let t = new T;
    return t.data = e, t.length = e.length, t;
}
var T = class e {
    constructor(){
        this.length = 0;
        this.off = 0;
    }
    subarray(t, r) {
        return t = w(t, this.length), r = x(this.length - t, r), c(this, t, r);
    }
    unshift(...t) {
        return t.length <= 0 ? this : _(...t).concat(this);
    }
    push(...t) {
        return t.length <= 0 ? this : this.concat(_(...t));
    }
    concat(t) {
        return L(this, t);
    }
    insert(t, ...r) {
        return t = w(t, this.length), t == 0 ? this.unshift(...r) : t == this.length ? this.push(...r) : c(this, 0, t).concat(c(this, t, this.length - t).unshift(...r));
    }
    delete(t, r) {
        t = w(t, this.length);
        let n = t + r, i = t == 0, s = n >= this.length;
        return i && s ? j : i ? c(this, n, this.length - n) : s ? c(this, 0, t) : c(this, 0, t).concat(c(this, n, this.length - n));
    }
    splice(t, r, ...n) {
        t = w(t, this.length);
        let i = t + r, s = t == 0, o = i >= this.length;
        return s && o ? j : s ? c(this, i, this.length - i).unshift(...n) : o ? c(this, 0, t).push(...n) : c(this, 0, t).push(...n).concat(c(this, i, this.length - i));
    }
    set(t, r) {
        return this.splice(t, 1, r);
    }
    at(t) {
        let r = this;
        if (t < 0) {
            if (t += r.length, t < 0) return;
        } else if (t >= r.length) return;
        for(; r.left instanceof e;){
            let { left: n, right: i } = r;
            n.length > t ? r = n : (r = i, t -= n.length);
        }
        if (!r.data) throw new Error;
        return r.data[t + r.off];
    }
    forEach(t) {
        let r = 0;
        function n(i) {
            if (i.data) for(let s = i.off, o = s + i.length; s < o; s++)t(i.data[s], r++);
            else {
                if (!(i.left instanceof e && i.right instanceof e)) throw new TypeError;
                n(i.left), n(i.right);
            }
        }
        n(this);
    }
    every(t) {
        let r = 0, n = !1;
        function i(s) {
            if (s.data) {
                for(let o = s.off, f = o + s.length; o < f; o++)if (t(s.data[o], r++) == !1) {
                    n = !0;
                    return;
                }
            } else {
                if (!(s.left instanceof e && s.right instanceof e)) throw new TypeError;
                i(s.left), n || i(s.right);
            }
        }
        return i(this), !n;
    }
    forEachInRange(t, r, n) {
        t = w(t, this.length), r = x(this.length - t, r);
        let i = t, s = !1;
        function o(f, h, u) {
            if (h != u) {
                if (f.data) {
                    let a = f.off, g = a + u;
                    for(a += h; a < g; a++)if (n(f.data[a], i++) == p) {
                        s = !0;
                        return;
                    }
                } else {
                    if (!(f.left instanceof e && f.right instanceof e)) throw new TypeError;
                    let a = f.left, g = f.right, l = a.length;
                    h >= l ? o(g, h - l, u - l) : u <= l ? o(a, h, u) : (o(a, h, l), s || o(g, 0, u - l));
                }
            }
        }
        o(this, t, t + r);
    }
    forEachInRangeReversed(t, r, n) {
        t = w(t, this.length) + 1;
        let i = D(t - r, 0), s = t, o = !1;
        function f(h, u, a) {
            if (u != a) {
                if (h.data) {
                    for(u += h.off, a += h.off - 1; a >= u; a--)if (n(h.data[a], s--) == p) {
                        o = !0;
                        return;
                    }
                } else {
                    if (!(h.left instanceof e && h.right instanceof e)) throw new TypeError;
                    let g = h.left, l = h.right, y = g.length;
                    u >= y ? f(l, u - y, a - y) : a <= y ? f(g, u, a) : (f(l, 0, a - y), o || f(g, u, y));
                }
            }
        }
        f(this, i, t);
    }
    map(t) {
        let r = [];
        r.length = this.length;
        let n = 0;
        function i(s) {
            if (s.data) for(let o = s.off, f = o + s.length; o < f; o++)r[n++] = t(s.data[o], o);
            else {
                if (!(s.left instanceof e && s.right instanceof e)) throw new TypeError;
                i(s.left), i(s.right);
            }
        }
        return i(this), _(...r);
    }
    flat() {
        let t = [];
        t.length = this.length;
        let r = 0;
        function n(i) {
            if (i.data) for(let s = i.off, o = s + i.length; s < o; s++)t[r++] = i.data[s];
            else {
                if (!(i.left instanceof e && i.right instanceof e)) throw new TypeError;
                n(i.left), n(i.right);
            }
        }
        return n(this), _(...t);
    }
    sort(t) {
        let r = this.flat();
        return r.data.sort(t), r;
    }
}, j = _(), p = Symbol("Stop");
var m;
function R(e) {
    var n;
    let t = e._Consumer;
    for (let i of t)if (typeof i != "number") {
        if (i == m) throw new Error;
        i._Dirty || (i._Dirty = !0, R(i));
    }
    let r = e._Watchers;
    r && (r instanceof Array ? r.forEach((i)=>{
        var s;
        return (s = i._Func) == null ? void 0 : s.call(i, e);
    }) : (n = r._Func) == null || n.call(r, e));
}
var d, C = class {
    constructor(t){
        this._Consumer = [];
        F(this, d, void 0);
        v(this, d, t), this.v = t;
    }
    get v() {
        return m && m._GetCallback(this), E(this, d);
    }
    set v(t) {
        if (E(this, d) != t) {
            v(this, d, t);
            try {
                R(this);
            } catch (r) {
                throw new Error("Detected cycle in computations.");
            }
        }
    }
};
d = new WeakMap;
function S(e) {
    if (!(e instanceof b) || !e._Dirty) return;
    let t = e._Producer;
    t.length = 0;
    let r = m;
    m = e;
    try {
        e._v = e._Func(), e._Err = void 0;
    } catch (n) {
        e._Err = n;
    }
    e._Dirty = !1, m = r;
}
var b = class {
    constructor(t){
        this._Consumer = [];
        this._Dirty = !0;
        this._Producer = [];
        this._Func = t;
    }
    _GetCallback(t) {
        let r = t._Consumer;
        r.indexOf(this) < 0 && (r.push(this), this._Producer.push(t));
    }
    get v() {
        if (m && m._GetCallback(this), S(this), this._Err) throw this._Err;
        return this._v;
    }
    get error() {
        return this._Err;
    }
    get computation() {
        return this._Func;
    }
};
function O(e) {
    if (!(e instanceof b)) return;
    let t = e._Producer;
    for (let r of t){
        let n = r._Consumer.indexOf(e);
        r._Consumer.splice(n, 1), e instanceof b && !r._Watchers && r._Consumer.length == 0 && O(r);
    }
    t.length = 0;
}
var W = class {
    constructor(){
        this.watchList = new Set;
    }
    watch(...t) {
        for (let r of t){
            let n = r._Watchers;
            if (!n) r._Watchers = this;
            else if (n instanceof Array) {
                if (n.indexOf(this) > -1) continue;
                n.push(this);
            } else n != this && (r._Watchers = [
                this,
                n
            ]);
            r instanceof b && S(r), this.watchList.add(r);
        }
    }
    unwatch(...t) {
        for (let r of t.length > 0 ? t : this.watchList.values()){
            let n = r._Watchers;
            if (n) {
                if (this.watchList.delete(r), n instanceof Array) {
                    let i = n.indexOf(this);
                    if (i > -1 && n.splice(i, 1), n.length > 0) continue;
                } else r._Watchers = void 0;
                O(r);
            }
        }
    }
    set callback(t) {
        this._Func = typeof t == "function" ? t : void 0;
    }
    get callback() {
        return this._Func;
    }
};
function B(e) {
    return new C(e);
}
function M(e) {
    return new b(e);
}
function q(e) {
    let t = new W;
    return t.callback = e, t;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fD7H8"}],"fD7H8":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
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

},{}],"8hBuc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ForEach", ()=>ee);
parcelHelpers.export(exports, "ForIn", ()=>te);
parcelHelpers.export(exports, "Var", ()=>ot);
parcelHelpers.export(exports, "a", ()=>Ce);
parcelHelpers.export(exports, "abbr", ()=>Ke);
parcelHelpers.export(exports, "address", ()=>re);
parcelHelpers.export(exports, "area", ()=>ct);
parcelHelpers.export(exports, "article", ()=>oe);
parcelHelpers.export(exports, "aside", ()=>ie);
parcelHelpers.export(exports, "audio", ()=>lt);
parcelHelpers.export(exports, "b", ()=>De);
parcelHelpers.export(exports, "bdi", ()=>je);
parcelHelpers.export(exports, "bdo", ()=>qe);
parcelHelpers.export(exports, "blockquote", ()=>me);
parcelHelpers.export(exports, "br", ()=>Ve);
parcelHelpers.export(exports, "button", ()=>Ht);
parcelHelpers.export(exports, "canvas", ()=>mt);
parcelHelpers.export(exports, "caption", ()=>Tt);
parcelHelpers.export(exports, "cite", ()=>Fe);
parcelHelpers.export(exports, "code", ()=>Pe);
parcelHelpers.export(exports, "col", ()=>_t);
parcelHelpers.export(exports, "colgroup", ()=>bt);
parcelHelpers.export(exports, "data", ()=>Ae);
parcelHelpers.export(exports, "datalist", ()=>Ct);
parcelHelpers.export(exports, "dd", ()=>ye);
parcelHelpers.export(exports, "del", ()=>gt);
parcelHelpers.export(exports, "details", ()=>Rt);
parcelHelpers.export(exports, "dfn", ()=>Ie);
parcelHelpers.export(exports, "dialog", ()=>Wt);
parcelHelpers.export(exports, "div", ()=>ge);
parcelHelpers.export(exports, "dl", ()=>Te);
parcelHelpers.export(exports, "dt", ()=>_e);
parcelHelpers.export(exports, "dynNode", ()=>ne);
parcelHelpers.export(exports, "em", ()=>Oe);
parcelHelpers.export(exports, "embed", ()=>ht);
parcelHelpers.export(exports, "fieldset", ()=>Kt);
parcelHelpers.export(exports, "figcaption", ()=>be);
parcelHelpers.export(exports, "figure", ()=>ve);
parcelHelpers.export(exports, "footer", ()=>ce);
parcelHelpers.export(exports, "form", ()=>Dt);
parcelHelpers.export(exports, "h", ()=>$);
parcelHelpers.export(exports, "h1", ()=>ue);
parcelHelpers.export(exports, "h2", ()=>se);
parcelHelpers.export(exports, "h3", ()=>ae);
parcelHelpers.export(exports, "h4", ()=>de);
parcelHelpers.export(exports, "h5", ()=>he);
parcelHelpers.export(exports, "h6", ()=>fe);
parcelHelpers.export(exports, "header", ()=>le);
parcelHelpers.export(exports, "hr", ()=>Ee);
parcelHelpers.export(exports, "i", ()=>Be);
parcelHelpers.export(exports, "iframe", ()=>ft);
parcelHelpers.export(exports, "img", ()=>ut);
parcelHelpers.export(exports, "input", ()=>jt);
parcelHelpers.export(exports, "ins", ()=>yt);
parcelHelpers.export(exports, "kbd", ()=>Ge);
parcelHelpers.export(exports, "label", ()=>qt);
parcelHelpers.export(exports, "legend", ()=>Vt);
parcelHelpers.export(exports, "li", ()=>ke);
parcelHelpers.export(exports, "main", ()=>pe);
parcelHelpers.export(exports, "map", ()=>st);
parcelHelpers.export(exports, "mark", ()=>Re);
parcelHelpers.export(exports, "menu", ()=>Me);
parcelHelpers.export(exports, "meter", ()=>Ft);
parcelHelpers.export(exports, "nav", ()=>we);
parcelHelpers.export(exports, "object", ()=>pt);
parcelHelpers.export(exports, "ol", ()=>Le);
parcelHelpers.export(exports, "optgroup", ()=>Pt);
parcelHelpers.export(exports, "option", ()=>At);
parcelHelpers.export(exports, "output", ()=>It);
parcelHelpers.export(exports, "p", ()=>Se);
parcelHelpers.export(exports, "picture", ()=>wt);
parcelHelpers.export(exports, "pre", ()=>Ne);
parcelHelpers.export(exports, "progress", ()=>Ot);
parcelHelpers.export(exports, "q", ()=>We);
parcelHelpers.export(exports, "root", ()=>v);
parcelHelpers.export(exports, "rp", ()=>Ue);
parcelHelpers.export(exports, "rt", ()=>ze);
parcelHelpers.export(exports, "ruby", ()=>Je);
parcelHelpers.export(exports, "s", ()=>Qe);
parcelHelpers.export(exports, "samp", ()=>Xe);
parcelHelpers.export(exports, "section", ()=>xe);
parcelHelpers.export(exports, "select", ()=>Bt);
parcelHelpers.export(exports, "slot", ()=>zt);
parcelHelpers.export(exports, "small", ()=>Ye);
parcelHelpers.export(exports, "source", ()=>xt);
parcelHelpers.export(exports, "span", ()=>Ze);
parcelHelpers.export(exports, "strong", ()=>$e);
parcelHelpers.export(exports, "sub", ()=>et);
parcelHelpers.export(exports, "summary", ()=>Ut);
parcelHelpers.export(exports, "sup", ()=>tt);
parcelHelpers.export(exports, "table", ()=>vt);
parcelHelpers.export(exports, "tbody", ()=>Et);
parcelHelpers.export(exports, "td", ()=>kt);
parcelHelpers.export(exports, "template", ()=>Jt);
parcelHelpers.export(exports, "textarea", ()=>Gt);
parcelHelpers.export(exports, "tfoot", ()=>Mt);
parcelHelpers.export(exports, "th", ()=>Lt);
parcelHelpers.export(exports, "thead", ()=>St);
parcelHelpers.export(exports, "time", ()=>nt);
parcelHelpers.export(exports, "tr", ()=>Nt);
parcelHelpers.export(exports, "track", ()=>at);
parcelHelpers.export(exports, "u", ()=>rt);
parcelHelpers.export(exports, "ul", ()=>He);
parcelHelpers.export(exports, "video", ()=>dt);
parcelHelpers.export(exports, "wbr", ()=>it);
var _belling = require("belling");
var F = (e)=>{
    throw TypeError(e);
};
var R = (e, n, r)=>n.has(e) || F("Cannot " + r);
var w = (e, n, r)=>(R(e, n, "read from private field"), r ? r.call(e) : n.get(e)), T = (e, n, r)=>n.has(e) ? F("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, r);
var t = class {
    constructor(n, r){
        this.name = n, this.children = r;
    }
    style(n) {
        return this._style ? Object.assign(this._style, n) : this._style = n, this;
    }
    attr(n) {
        return this._attr ? Object.assign(this._attr, n) : this._attr = n, this;
    }
    on(n) {
        return this._events ? Object.assign(this._events, n) : this._events = n, this;
    }
    ref(n) {
        return this._ref = n, this;
    }
    render(n, r = document.createElement(this.name)) {
        var c;
        let i = r;
        if (this.dom = i, this._events) for(let o in this._events){
            let l = this._events[o];
            o === "unmount" ? n._addDestroyCallback(l) : i.addEventListener(o, l);
        }
        if (this._attr) for(let o in this._attr){
            let l = this._attr[o];
            typeof l == "function" ? n._watch((0, _belling.compute)(()=>{
                i.setAttribute(o, l());
            })) : l instanceof (0, _belling.Compute) || l instanceof (0, _belling.State) ? n._watch((0, _belling.compute)(()=>{
                i.setAttribute(o, l.v);
            })) : i.setAttribute(o, l);
        }
        if (this._style) for(let o in this._style){
            let l = o, u = this._style[l];
            typeof u == "function" ? n._watch((0, _belling.compute)(()=>{
                i.style[l] = u();
            })) : u instanceof (0, _belling.Compute) || u instanceof (0, _belling.State) ? n._watch((0, _belling.compute)(()=>{
                i.style[l] = u.v;
            })) : i.style[l] = u;
        }
        if (this.children) for (let o of this.children)if (typeof o == "string") {
            let l = document.createTextNode(o);
            i.appendChild(l);
        } else if (typeof o == "function") {
            let l = document.createTextNode("");
            n._watch((0, _belling.compute)(()=>l.nodeValue = o())), i.appendChild(l);
        } else if (o instanceof (0, _belling.State) || o instanceof (0, _belling.Compute)) {
            let l = document.createTextNode("");
            n._watch((0, _belling.compute)(()=>l.nodeValue = o.v)), i.appendChild(l);
        } else i.appendChild(o.render(n));
        return (c = this._ref) == null || c.call(this, i), i;
    }
}, K = new Set, D = new Set, j = !1;
function z() {
    D.forEach((e)=>e()), K.forEach((e)=>e.v), K.clear(), D.clear(), j = !1;
}
function G(e) {
    j || (j = !0, requestAnimationFrame(z)), typeof e == "function" ? D.add(e) : K.add(e);
}
var y, M, v = class {
    constructor(n, r){
        T(this, y, new (0, _belling.Watcher));
        T(this, M, []);
        this._whenDestroy = [];
        w(this, y).callback = G, this.dom = r.render(this), n == null || n.appendChild(this.dom);
    }
    _watch(n) {
        w(this, M).push(n), w(this, y).watch(n);
    }
    _addDestroyCallback(n) {
        this._whenDestroy.push(n);
    }
    _destroy() {
        w(this, y).unwatch(), this._whenDestroy.forEach((n)=>n());
    }
};
y = new WeakMap, M = new WeakMap;
function J(e, n, r) {
    if (r.length = 0, n.length = 0, e.length < 1) return r;
    function i(u, d) {
        for(let h = n.length; h < u; h++)n.push(-1);
        n[u] = d;
    }
    let c = 0, o = e.length;
    for(; c < o && e[c] == -1; c++);
    for(r[0] = c; c < o; c++){
        let u = e[c];
        if (u == -1) continue;
        let d = r[r.length - 1];
        if (e[d] < u) {
            i(c, d), r.push(c);
            continue;
        }
        let h = 0, m = r.length - 1, a;
        for(; h < m;)a = h + m >> 1, e[r[a]] < u ? h = a + 1 : m = a;
        let p = h;
        u < e[r[p]] && (p > 0 && i(c, r[p - 1]), r[p] = c);
    }
    c = r.length;
    let l = r[r.length - 1];
    if (l > e.length) return r;
    for(; c-- > 0;)r[c] = e[l], l = n[l];
    return r;
}
var P = [], A = [], I = [], O = [], L, _, E = class extends t {
    constructor(r, i, c){
        super(r);
        T(this, L, new Map);
        T(this, _, new Map);
        this.list = i, this.f = c;
    }
    render(r) {
        let i = super.render(r), c = this.list, o = w(this, L), l = this.f, u = w(this, _), d = [];
        function h() {
            let a = P;
            a.length = 0;
            let p = c.v;
            p.forEach((s)=>{
                let f = o.get(s);
                typeof f == "number" ? (o.set(s, -1), a.push(f)) : a.push(-1);
            });
            let g = O;
            i.childNodes.forEach((s)=>g.push(s)), d.forEach((s)=>{
                i.removeChild(s.dom);
            }), d.length = 0, o.forEach((s, f)=>{
                s != -1 && (u.get(f)._destroy(), u.delete(f), o.delete(f), i.removeChild(g[s]));
            });
            let q = J(a, A, I);
            console.log(q);
            let V = 0;
            p.forEach((s, f)=>{
                let S = a[f], N = q[V];
                if (S == -1) {
                    let b = new v(void 0, l(s));
                    if (f == p.length - 1 ? i.appendChild(b.dom) : i.insertBefore(b.dom, g[N]), o.has(s)) {
                        d.push(b);
                        return;
                    }
                    u.set(s, b);
                } else S == N ? V++ : i.insertBefore(g[S], g[N]);
                o.set(s, f);
            }), P.length = A.length = I.length = O.length = 0;
        }
        let m = (0, _belling.watcher)(()=>{
            G(h);
        });
        return m.watch(c), r._addDestroyCallback(()=>{
            m.unwatch(), w(this, _).forEach((a)=>a._destroy());
        }), h(), i;
    }
};
L = new WeakMap, _ = new WeakMap;
var k = class extends t {
    constructor(r){
        super("div");
        this.dom = void 0;
        this._node = r;
        let i = ()=>{
            var o;
            let c = r.v;
            if (this._ele = c, this._events = c._events, this._attr = c._attr, this._style = c._style, this._ref = c._ref, this.children = c.children, (o = this._root) == null || o._destroy(), this._root = new v(void 0, c), this.dynDom) {
                let l = this.dynDom.parentNode;
                l && l.replaceChild(this._root.dom, this.dynDom);
            }
            this.dynDom = c.dom;
        };
        this._watcher = (0, _belling.watcher)(i);
    }
    render(r) {
        let i = this._node;
        return this._ele = i.v, this._watcher.watch(i), this._watcher.callback(), r._addDestroyCallback(()=>{
            var c;
            (c = this._root) == null || c._destroy(), this._watcher.unwatch();
        }), this.dynDom;
    }
};
function $(e, ...n) {
    return new t(e, n);
}
function ee(e, n, r) {
    return new E(e, n, r);
}
function te(e, n, r) {
    let i = new WeakMap;
    return new E(e, (0, _belling.compute)(()=>{
        let o = n.v;
        return o.forEach((l, u)=>{
            let d = i.get(l);
            d ? d.v = u : i.set(l, (0, _belling.state)(u));
        }), o;
    }), (o)=>r(i.get(o), o));
}
function ne(e) {
    return typeof e == "function" ? new k((0, _belling.compute)(e)) : new k(e);
}
function re(...e) {
    return new t("address", e);
}
function oe(...e) {
    return new t("article", e);
}
function ie(...e) {
    return new t("aside", e);
}
function ce(...e) {
    return new t("footer", e);
}
function le(...e) {
    return new t("header", e);
}
function ue(...e) {
    return new t("h1", e);
}
function se(...e) {
    return new t("h2", e);
}
function ae(...e) {
    return new t("h3", e);
}
function de(...e) {
    return new t("h4", e);
}
function he(...e) {
    return new t("h5", e);
}
function fe(...e) {
    return new t("h6", e);
}
function pe(...e) {
    return new t("main", e);
}
function we(...e) {
    return new t("nav", e);
}
function xe(...e) {
    return new t("section", e);
}
function me(...e) {
    return new t("blockquote", e);
}
function ye(...e) {
    return new t("dd", e);
}
function ge(...e) {
    return new t("div", e);
}
function Te(...e) {
    return new t("dl", e);
}
function _e(...e) {
    return new t("dt", e);
}
function be(...e) {
    return new t("figcaption", e);
}
function ve(...e) {
    return new t("figure", e);
}
function Ee() {
    return new t("hr");
}
function ke(...e) {
    return new t("li", e);
}
function Me(...e) {
    return new t("menu", e);
}
function Le(...e) {
    return new t("ol", e);
}
function Se(...e) {
    return new t("p", e);
}
function Ne(...e) {
    return new t("pre", e);
}
function He(...e) {
    return new t("ul", e);
}
function Ce(...e) {
    return new t("a", e);
}
function Ke(...e) {
    return new t("abbr", e);
}
function De(...e) {
    return new t("b", e);
}
function je(...e) {
    return new t("bdi", e);
}
function qe(...e) {
    return new t("bdo", e);
}
function Ve() {
    return new t("br");
}
function Fe(...e) {
    return new t("cite", e);
}
function Pe(...e) {
    return new t("code", e);
}
function Ae(...e) {
    return new t("data", e);
}
function Ie(...e) {
    return new t("dfn", e);
}
function Oe(...e) {
    return new t("em", e);
}
function Be(...e) {
    return new t("i", e);
}
function Ge(...e) {
    return new t("kbd", e);
}
function Re(...e) {
    return new t("mark", e);
}
function We(...e) {
    return new t("q", e);
}
function Ue(...e) {
    return new t("rp", e);
}
function ze(...e) {
    return new t("rt", e);
}
function Je(...e) {
    return new t("ruby", e);
}
function Qe(...e) {
    return new t("s", e);
}
function Xe(...e) {
    return new t("samp", e);
}
function Ye(...e) {
    return new t("small", e);
}
function Ze(...e) {
    return new t("span", e);
}
function $e(...e) {
    return new t("strong", e);
}
function et(...e) {
    return new t("sub", e);
}
function tt(...e) {
    return new t("sup", e);
}
function nt(...e) {
    return new t("time", e);
}
function rt(...e) {
    return new t("u", e);
}
function ot(...e) {
    return new t("var", e);
}
function it() {
    return new t("wbr");
}
function ct() {
    return new t("area");
}
function lt(...e) {
    return new t("audio", e);
}
function ut() {
    return new t("img");
}
function st(...e) {
    return new t("map", e);
}
function at() {
    return new t("track");
}
function dt(...e) {
    return new t("video", e);
}
function ht() {
    return new t("embed");
}
function ft(...e) {
    return new t("iframe", e);
}
function pt(...e) {
    return new t("object", e);
}
function wt(...e) {
    return new t("picture", e);
}
function xt() {
    return new t("source");
}
function mt(...e) {
    return new t("canvas", e);
}
function yt(...e) {
    return new t("ins", e);
}
function gt(...e) {
    return new t("del", e);
}
function Tt(...e) {
    return new t("caption", e);
}
function _t() {
    return new t("col");
}
function bt(...e) {
    return new t("colgroup", e);
}
function vt(...e) {
    return new t("table", e);
}
function Et(...e) {
    return new t("tbody", e);
}
function kt(...e) {
    return new t("td", e);
}
function Mt(...e) {
    return new t("tfoot", e);
}
function Lt(...e) {
    return new t("th", e);
}
function St(...e) {
    return new t("thead", e);
}
function Nt(...e) {
    return new t("tr", e);
}
function Ht(...e) {
    return new t("button", e);
}
function Ct(...e) {
    return new t("datalist", e);
}
function Kt(...e) {
    return new t("fieldset", e);
}
function Dt(...e) {
    return new t("form", e);
}
function jt() {
    return new t("input");
}
function qt(...e) {
    return new t("label", e);
}
function Vt(...e) {
    return new t("legend", e);
}
function Ft(...e) {
    return new t("meter", e);
}
function Pt(...e) {
    return new t("optgroup", e);
}
function At(...e) {
    return new t("option", e);
}
function It(...e) {
    return new t("output", e);
}
function Ot(...e) {
    return new t("progress", e);
}
function Bt(...e) {
    return new t("select", e);
}
function Gt(...e) {
    return new t("textarea", e);
}
function Rt(...e) {
    return new t("details", e);
}
function Wt(...e) {
    return new t("dialog", e);
}
function Ut(...e) {
    return new t("summary", e);
}
function zt(...e) {
    return new t("slot", e);
}
function Jt(...e) {
    return new t("template", e);
}

},{"belling":"je3bp","@parcel/transformer-js/src/esmodule-helpers.js":"fD7H8"}],"je3bp":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Compute", ()=>b);
parcelHelpers.export(exports, "State", ()=>C);
parcelHelpers.export(exports, "Stop", ()=>p);
parcelHelpers.export(exports, "Watcher", ()=>W);
parcelHelpers.export(exports, "compute", ()=>M);
parcelHelpers.export(exports, "makeArr", ()=>_);
parcelHelpers.export(exports, "state", ()=>B);
parcelHelpers.export(exports, "watcher", ()=>q);
var k = (e, t, r)=>{
    if (!t.has(e)) throw TypeError("Cannot " + r);
};
var E = (e, t, r)=>(k(e, t, "read from private field"), r ? r.call(e) : t.get(e)), F = (e, t, r)=>{
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, v = (e, t, r, n)=>(k(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var { max: D, min: x } = Math;
function w(e, t) {
    return x(e < 0 ? D(0, t + e) : e, t - 1);
}
function c(e, t, r) {
    if (e.length == 0 || t == 0 && r == e.length) return e;
    if (e.data) {
        let n = new T;
        return n.off = t + e.off, n.length = r, n.data = e.data, Object.freeze(n), n;
    } else {
        let { left: n, right: i } = e;
        if (!(n instanceof T && i instanceof T)) throw new TypeError;
        if (t > n.length) return c(i, t - n.length, r);
        if (t + r < n.length) return c(n, t, r);
        let s = new T, o = n.length - t;
        return s.left = c(n, t, o), s.right = c(i, 0, r - o), s.length = r, s;
    }
}
function L(e, t) {
    let r = new T;
    return r.left = e, r.right = t, r.length = t.length + e.length, r;
}
function _(...e) {
    let t = new T;
    return t.data = e, t.length = e.length, t;
}
var T = class e {
    constructor(){
        this.length = 0;
        this.off = 0;
    }
    subarray(t, r) {
        return t = w(t, this.length), r = x(this.length - t, r), c(this, t, r);
    }
    unshift(...t) {
        return t.length <= 0 ? this : _(...t).concat(this);
    }
    push(...t) {
        return t.length <= 0 ? this : this.concat(_(...t));
    }
    concat(t) {
        return L(this, t);
    }
    insert(t, ...r) {
        return t = w(t, this.length), t == 0 ? this.unshift(...r) : t == this.length ? this.push(...r) : c(this, 0, t).concat(c(this, t, this.length - t).unshift(...r));
    }
    delete(t, r) {
        t = w(t, this.length);
        let n = t + r, i = t == 0, s = n >= this.length;
        return i && s ? j : i ? c(this, n, this.length - n) : s ? c(this, 0, t) : c(this, 0, t).concat(c(this, n, this.length - n));
    }
    splice(t, r, ...n) {
        t = w(t, this.length);
        let i = t + r, s = t == 0, o = i >= this.length;
        return s && o ? j : s ? c(this, i, this.length - i).unshift(...n) : o ? c(this, 0, t).push(...n) : c(this, 0, t).push(...n).concat(c(this, i, this.length - i));
    }
    set(t, r) {
        return this.splice(t, 1, r);
    }
    at(t) {
        let r = this;
        if (t < 0) {
            if (t += r.length, t < 0) return;
        } else if (t >= r.length) return;
        for(; r.left instanceof e;){
            let { left: n, right: i } = r;
            n.length > t ? r = n : (r = i, t -= n.length);
        }
        if (!r.data) throw new Error;
        return r.data[t + r.off];
    }
    forEach(t) {
        let r = 0;
        function n(i) {
            if (i.data) for(let s = i.off, o = s + i.length; s < o; s++)t(i.data[s], r++);
            else {
                if (!(i.left instanceof e && i.right instanceof e)) throw new TypeError;
                n(i.left), n(i.right);
            }
        }
        n(this);
    }
    every(t) {
        let r = 0, n = !1;
        function i(s) {
            if (s.data) {
                for(let o = s.off, f = o + s.length; o < f; o++)if (t(s.data[o], r++) == !1) {
                    n = !0;
                    return;
                }
            } else {
                if (!(s.left instanceof e && s.right instanceof e)) throw new TypeError;
                i(s.left), n || i(s.right);
            }
        }
        return i(this), !n;
    }
    forEachInRange(t, r, n) {
        t = w(t, this.length), r = x(this.length - t, r);
        let i = t, s = !1;
        function o(f, h, u) {
            if (h != u) {
                if (f.data) {
                    let a = f.off, g = a + u;
                    for(a += h; a < g; a++)if (n(f.data[a], i++) == p) {
                        s = !0;
                        return;
                    }
                } else {
                    if (!(f.left instanceof e && f.right instanceof e)) throw new TypeError;
                    let a = f.left, g = f.right, l = a.length;
                    h >= l ? o(g, h - l, u - l) : u <= l ? o(a, h, u) : (o(a, h, l), s || o(g, 0, u - l));
                }
            }
        }
        o(this, t, t + r);
    }
    forEachInRangeReversed(t, r, n) {
        t = w(t, this.length) + 1;
        let i = D(t - r, 0), s = t, o = !1;
        function f(h, u, a) {
            if (u != a) {
                if (h.data) {
                    for(u += h.off, a += h.off - 1; a >= u; a--)if (n(h.data[a], s--) == p) {
                        o = !0;
                        return;
                    }
                } else {
                    if (!(h.left instanceof e && h.right instanceof e)) throw new TypeError;
                    let g = h.left, l = h.right, y = g.length;
                    u >= y ? f(l, u - y, a - y) : a <= y ? f(g, u, a) : (f(l, 0, a - y), o || f(g, u, y));
                }
            }
        }
        f(this, i, t);
    }
    map(t) {
        let r = [];
        r.length = this.length;
        let n = 0;
        function i(s) {
            if (s.data) for(let o = s.off, f = o + s.length; o < f; o++)r[n++] = t(s.data[o], o);
            else {
                if (!(s.left instanceof e && s.right instanceof e)) throw new TypeError;
                i(s.left), i(s.right);
            }
        }
        return i(this), _(...r);
    }
    flat() {
        let t = [];
        t.length = this.length;
        let r = 0;
        function n(i) {
            if (i.data) for(let s = i.off, o = s + i.length; s < o; s++)t[r++] = i.data[s];
            else {
                if (!(i.left instanceof e && i.right instanceof e)) throw new TypeError;
                n(i.left), n(i.right);
            }
        }
        return n(this), _(...t);
    }
    sort(t) {
        let r = this.flat();
        return r.data.sort(t), r;
    }
}, j = _(), p = Symbol("Stop");
var m;
function R(e) {
    var n;
    let t = e._Consumer;
    for (let i of t)if (typeof i != "number") {
        if (i == m) throw new Error;
        i._Dirty || (i._Dirty = !0, R(i));
    }
    let r = e._Watchers;
    r && (r instanceof Array ? r.forEach((i)=>{
        var s;
        return (s = i._Func) == null ? void 0 : s.call(i, e);
    }) : (n = r._Func) == null || n.call(r, e));
}
var d, C = class {
    constructor(t){
        this._Consumer = [];
        F(this, d, void 0);
        v(this, d, t), this.v = t;
    }
    get v() {
        return m && m._GetCallback(this), E(this, d);
    }
    set v(t) {
        if (E(this, d) != t) {
            v(this, d, t);
            try {
                R(this);
            } catch (r) {
                throw new Error("Detected cycle in computations.");
            }
        }
    }
};
d = new WeakMap;
function S(e) {
    if (!(e instanceof b) || !e._Dirty) return;
    let t = e._Producer;
    t.length = 0;
    let r = m;
    m = e;
    try {
        e._v = e._Func(), e._Err = void 0;
    } catch (n) {
        e._Err = n;
    }
    e._Dirty = !1, m = r;
}
var b = class {
    constructor(t){
        this._Consumer = [];
        this._Dirty = !0;
        this._Producer = [];
        this._Func = t;
    }
    _GetCallback(t) {
        let r = t._Consumer;
        r.indexOf(this) < 0 && (r.push(this), this._Producer.push(t));
    }
    get v() {
        if (m && m._GetCallback(this), S(this), this._Err) throw this._Err;
        return this._v;
    }
    get error() {
        return this._Err;
    }
    get computation() {
        return this._Func;
    }
};
function O(e) {
    if (!(e instanceof b)) return;
    let t = e._Producer;
    for (let r of t){
        let n = r._Consumer.indexOf(e);
        r._Consumer.splice(n, 1), e instanceof b && !r._Watchers && r._Consumer.length == 0 && O(r);
    }
    t.length = 0;
}
var W = class {
    constructor(){
        this.watchList = new Set;
    }
    watch(...t) {
        for (let r of t){
            let n = r._Watchers;
            if (!n) r._Watchers = this;
            else if (n instanceof Array) {
                if (n.indexOf(this) > -1) continue;
                n.push(this);
            } else n != this && (r._Watchers = [
                this,
                n
            ]);
            r instanceof b && S(r), this.watchList.add(r);
        }
    }
    unwatch(...t) {
        for (let r of t.length > 0 ? t : this.watchList.values()){
            let n = r._Watchers;
            if (n) {
                if (this.watchList.delete(r), n instanceof Array) {
                    let i = n.indexOf(this);
                    if (i > -1 && n.splice(i, 1), n.length > 0) continue;
                } else r._Watchers = void 0;
                O(r);
            }
        }
    }
    set callback(t) {
        this._Func = typeof t == "function" ? t : void 0;
    }
    get callback() {
        return this._Func;
    }
};
function B(e) {
    return new C(e);
}
function M(e) {
    return new b(e);
}
function q(e) {
    let t = new W;
    return t.callback = e, t;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fD7H8"}]},["jRxy6","2TzyT"], "2TzyT", "parcelRequire94c2")

//# sourceMappingURL=demo.07c3b916.js.map
