
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "16.2.10";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__1osrt2u._.js
var require_root_of_the_server_1osrt2u = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__1osrt2u._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__1osrt2u._.js", 51615, (e, r, o) => {
      r.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, r, o) => {
      r.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 35825, (e, r, o) => {
      self._ENTRIES ||= {};
      let t = Promise.resolve().then(() => e.i(58217));
      t.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(t, { get(e2, r2) {
        if ("then" === r2) return (r3, o3) => e2.then(r3, o3);
        let o2 = (...o3) => e2.then((e3) => (0, e3[r2])(...o3));
        return o2.then = (o3, t2) => e2.then((e3) => e3[r2]).then(o3, t2), o2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_0o2-izl._.js
var require_node_modules_next_dist_0o2_izl = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_0o2-izl._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_0o2-izl._.js", 74398, (e, t, r) => {
    }, 28042, (e, t, r) => {
      "use strict";
      var i = Object.defineProperty, n = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, u = { RequestCookies: () => v, ResponseCookies: () => g, parseCookie: () => c, parseSetCookie: () => f, stringifyCookie: () => d };
      for (var l in u) i(s, l, { get: u[l], enumerable: true });
      function d(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), i2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? i2 : `${i2}; ${r2.join("; ")}`;
      }
      function c(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [i2, n2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(i2, decodeURIComponent(null != n2 ? n2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function f(e2) {
        if (!e2) return;
        let [[t2, r2], ...i2] = c(e2), { domain: n2, expires: a2, httponly: o2, maxage: s2, path: u2, samesite: l2, secure: d2, partitioned: f2, priority: v2 } = Object.fromEntries(i2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var g2, h, _ = { name: t2, value: decodeURIComponent(r2), domain: n2, ...a2 && { expires: new Date(a2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: u2, ...l2 && { sameSite: m.includes(g2 = (g2 = l2).toLowerCase()) ? g2 : void 0 }, ...d2 && { secure: true }, ...v2 && { priority: p.includes(h = (h = v2).toLowerCase()) ? h : void 0 }, ...f2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in _) _[t3] && (e3[t3] = _[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let u2 of a(t2)) o.call(e2, u2) || u2 === r2 || i(e2, u2, { get: () => t2[u2], enumerable: !(s2 = n(t2, u2)) || s2.enumerable });
        return e2;
      })(i({}, "__esModule", { value: true }), s);
      var m = ["strict", "lax", "none"], p = ["low", "medium", "high"], v = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of c(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let i2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === i2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, i2 = this._parsed;
          return i2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(i2).map(([e3, t3]) => d(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => d(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, g = class {
        constructor(e2) {
          var t2, r2, i2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const n2 = null != (i2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? i2 : [];
          for (const e3 of Array.isArray(n2) ? n2 : function(e4) {
            if (!e4) return [];
            var t3, r3, i3, n3, a2, o2 = [], s2 = 0;
            function u2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, a2 = false; u2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (i3 = s2, s2 += 1, u2(), n3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (a2 = true, s2 = n3, o2.push(e4.substring(t3, i3)), t3 = s2) : s2 = i3 + 1;
              } else s2 += 1;
              (!a2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(n2)) {
            const t3 = f(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let i2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === i2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, i2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, n2 = this._parsed;
          return n2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...i2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = d(r3);
              t3.append("set-cookie", e4);
            }
          }(n2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(d).join("; ");
        }
      };
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, i, n, a, o;
        var s, u, l, d, c, f, m, p, v, g, h, _, b, y, $, x, w = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let i2 = r3(223), n2 = r3(172), a2 = r3(930), o2 = "context", s2 = new i2.NoopContextManager();
          class u2 {
            static getInstance() {
              return this._instance || (this._instance = new u2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...i3) {
              return this._getContextManager().with(e3, t3, r4, ...i3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = u2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let i2 = r3(56), n2 = r3(912), a2 = r3(957), o2 = r3(172);
          class s2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var i3, s3, u2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (i3 = e5.stack) ? i3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let l2 = (0, o2.getGlobal)("diag"), d2 = (0, n2.createLogLevelDiagLogger)(null != (s3 = r4.logLevel) ? s3 : a2.DiagLogLevel.INFO, e4);
                if (l2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (u2 = Error().stack) ? u2 : "<failed to generate stacktrace>";
                  l2.warn(`Current logger will be overwritten from ${e5}`), d2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o2.registerGlobal)("diag", d2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new i2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
          }
          t2.DiagAPI = s2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let i2 = r3(660), n2 = r3(172), a2 = r3(930), o2 = "metrics";
          class s2 {
            static getInstance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(o2) || i2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, n2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let i2 = r3(172), n2 = r3(874), a2 = r3(194), o2 = r3(277), s2 = r3(369), u2 = r3(930), l2 = "propagation", d2 = new n2.NoopTextMapPropagator();
          class c2 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, i2.registerGlobal)(l2, e3, u2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, i2.unregisterGlobal)(l2, u2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, i2.getGlobal)(l2) || d2;
            }
          }
          t2.PropagationAPI = c2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let i2 = r3(172), n2 = r3(846), a2 = r3(139), o2 = r3(607), s2 = r3(930), u2 = "trace";
          class l2 {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, i2.registerGlobal)(u2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, i2.getGlobal)(u2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, i2.unregisterGlobal)(u2, s2.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = l2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let i2 = r3(491), n2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t2.getBaggage = a2, t2.getActiveBaggage = function() {
            return a2(i2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(n2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let i2 = new r3(this._entries);
              return i2._entries.set(e3, t3), i2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let i2 = r3(930), n2 = r3(993), a2 = r3(830), o2 = i2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let i2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return i2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...i3) {
              return t3.call(r4, ...i3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, i2) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.set(e4, i2), n2;
              }, t3.deleteValue = (e4) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.delete(e4), i2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let i2 = r3(172);
          function n2(e3, t3, r4) {
            let n3 = (0, i2.getGlobal)("diag");
            if (n3) return r4.unshift(t3), n3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let i2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, i3) {
              let n2 = t3[r5];
              return "function" == typeof n2 && e3 >= i3 ? n2.bind(t3) : function() {
              };
            }
            return e3 < i2.DiagLogLevel.NONE ? e3 = i2.DiagLogLevel.NONE : e3 > i2.DiagLogLevel.ALL && (e3 = i2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", i2.DiagLogLevel.ERROR), warn: r4("warn", i2.DiagLogLevel.WARN), info: r4("info", i2.DiagLogLevel.INFO), debug: r4("debug", i2.DiagLogLevel.DEBUG), verbose: r4("verbose", i2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let i2 = r3(200), n2 = r3(521), a2 = r3(130), o2 = n2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${o2}`), u2 = i2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, i3 = false) {
            var a3;
            let o3 = u2[s2] = null != (a3 = u2[s2]) ? a3 : { version: n2.VERSION };
            if (!i3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== n2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let i3 = null == (t3 = u2[s2]) ? void 0 : t3.version;
            if (i3 && (0, a2.isCompatible)(i3)) return null == (r4 = u2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r4 = u2[s2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let i2 = r3(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), i3 = e3.match(n2);
            if (!i3) return () => false;
            let a3 = { major: +i3[1], minor: +i3[2], patch: +i3[3], prerelease: i3[4] };
            if (null != a3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let i4 = e4.match(n2);
              if (!i4) return o2(e4);
              let s2 = { major: +i4[1], minor: +i4[2], patch: +i4[3], prerelease: i4[4] };
              if (null != s2.prerelease || a3.major !== s2.major) return o2(e4);
              if (0 === a3.major) return a3.minor === s2.minor && a3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return a3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = a2, t2.isCompatible = a2(i2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class i2 {
          }
          t2.NoopMetric = i2;
          class n2 extends i2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = n2;
          class a2 extends i2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = a2;
          class o2 extends i2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class u2 extends s2 {
          }
          t2.NoopObservableCounterMetric = u2;
          class l2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = l2;
          class d2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = d2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new n2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new u2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new l2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new d2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let i2 = r3(102);
          class n2 {
            getMeter(e3, t3, r4) {
              return i2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = n2, t2.NOOP_METER_PROVIDER = new n2();
        }, 200: function(e2, t2, r3) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), e3[i3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || i2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), e3[i3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || i2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let i2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = i2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let i2 = r3(491), n2 = r3(607), a2 = r3(403), o2 = r3(139), s2 = i2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var i3;
              if (null == t3 ? void 0 : t3.root) return new a2.NonRecordingSpan();
              let u2 = r4 && (0, n2.getSpanContext)(r4);
              return "object" == typeof (i3 = u2) && "string" == typeof i3.spanId && "string" == typeof i3.traceId && "number" == typeof i3.traceFlags && (0, o2.isSpanContextValid)(u2) ? new a2.NonRecordingSpan(u2) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, i3) {
              let a3, o3, u2;
              if (arguments.length < 2) return;
              2 == arguments.length ? u2 = t3 : 3 == arguments.length ? (a3 = t3, u2 = r4) : (a3 = t3, o3 = r4, u2 = i3);
              let l2 = null != o3 ? o3 : s2.active(), d2 = this.startSpan(e3, a3, l2), c2 = (0, n2.setSpan)(l2, d2);
              return s2.with(c2, u2, void 0, d2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let i2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new i2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let i2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, i3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = i3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, i3) {
              let n2 = this._getTracer();
              return Reflect.apply(n2.startActiveSpan, n2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : i2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let i2 = r3(125), n2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var n3;
              return null != (n3 = this.getDelegateTracer(e3, t3, r4)) ? n3 : new i2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var i3;
              return null == (i3 = this._delegate) ? void 0 : i3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let i2 = r3(780), n2 = r3(403), a2 = r3(491), o2 = (0, i2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function u2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(a2.ContextAPI.getInstance().active());
          }, t2.setSpan = u2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return u2(e3, new n2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let i2 = r3(564);
          class n2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), n3 = r4.indexOf("=");
                if (-1 !== n3) {
                  let a2 = r4.slice(0, n3), o2 = r4.slice(n3 + 1, t3.length);
                  (0, i2.validateKey)(a2) && (0, i2.validateValue)(o2) && e4.set(a2, o2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new n2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = n2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", i2 = `[a-z]${r3}{0,255}`, n2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, a2 = RegExp(`^(?:${i2}|${n2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return a2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let i2 = r3(325);
          t2.createTraceState = function(e3) {
            return new i2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let i2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: i2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let i2 = r3(476), n2 = r3(403), a2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return a2.test(e3) && e3 !== i2.INVALID_TRACEID;
          }
          function u2(e3) {
            return o2.test(e3) && e3 !== i2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = u2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && u2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, k = {};
        function S(e2) {
          var t2 = k[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = k[e2] = { exports: {} }, i2 = true;
          try {
            w[e2].call(r3.exports, r3, r3.exports, S), i2 = false;
          } finally {
            i2 && delete k[e2];
          }
          return r3.exports;
        }
        S.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var I = {};
        Object.defineProperty(I, "__esModule", { value: true }), I.trace = I.propagation = I.metrics = I.diag = I.context = I.INVALID_SPAN_CONTEXT = I.INVALID_TRACEID = I.INVALID_SPANID = I.isValidSpanId = I.isValidTraceId = I.isSpanContextValid = I.createTraceState = I.TraceFlags = I.SpanStatusCode = I.SpanKind = I.SamplingDecision = I.ProxyTracerProvider = I.ProxyTracer = I.defaultTextMapSetter = I.defaultTextMapGetter = I.ValueType = I.createNoopMeter = I.DiagLogLevel = I.DiagConsoleLogger = I.ROOT_CONTEXT = I.createContextKey = I.baggageEntryMetadataFromString = void 0, s = S(369), Object.defineProperty(I, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), u = S(780), Object.defineProperty(I, "createContextKey", { enumerable: true, get: function() {
          return u.createContextKey;
        } }), Object.defineProperty(I, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return u.ROOT_CONTEXT;
        } }), l = S(972), Object.defineProperty(I, "DiagConsoleLogger", { enumerable: true, get: function() {
          return l.DiagConsoleLogger;
        } }), d = S(957), Object.defineProperty(I, "DiagLogLevel", { enumerable: true, get: function() {
          return d.DiagLogLevel;
        } }), c = S(102), Object.defineProperty(I, "createNoopMeter", { enumerable: true, get: function() {
          return c.createNoopMeter;
        } }), f = S(901), Object.defineProperty(I, "ValueType", { enumerable: true, get: function() {
          return f.ValueType;
        } }), m = S(194), Object.defineProperty(I, "defaultTextMapGetter", { enumerable: true, get: function() {
          return m.defaultTextMapGetter;
        } }), Object.defineProperty(I, "defaultTextMapSetter", { enumerable: true, get: function() {
          return m.defaultTextMapSetter;
        } }), p = S(125), Object.defineProperty(I, "ProxyTracer", { enumerable: true, get: function() {
          return p.ProxyTracer;
        } }), v = S(846), Object.defineProperty(I, "ProxyTracerProvider", { enumerable: true, get: function() {
          return v.ProxyTracerProvider;
        } }), g = S(996), Object.defineProperty(I, "SamplingDecision", { enumerable: true, get: function() {
          return g.SamplingDecision;
        } }), h = S(357), Object.defineProperty(I, "SpanKind", { enumerable: true, get: function() {
          return h.SpanKind;
        } }), _ = S(847), Object.defineProperty(I, "SpanStatusCode", { enumerable: true, get: function() {
          return _.SpanStatusCode;
        } }), b = S(475), Object.defineProperty(I, "TraceFlags", { enumerable: true, get: function() {
          return b.TraceFlags;
        } }), y = S(98), Object.defineProperty(I, "createTraceState", { enumerable: true, get: function() {
          return y.createTraceState;
        } }), $ = S(139), Object.defineProperty(I, "isSpanContextValid", { enumerable: true, get: function() {
          return $.isSpanContextValid;
        } }), Object.defineProperty(I, "isValidTraceId", { enumerable: true, get: function() {
          return $.isValidTraceId;
        } }), Object.defineProperty(I, "isValidSpanId", { enumerable: true, get: function() {
          return $.isValidSpanId;
        } }), x = S(476), Object.defineProperty(I, "INVALID_SPANID", { enumerable: true, get: function() {
          return x.INVALID_SPANID;
        } }), Object.defineProperty(I, "INVALID_TRACEID", { enumerable: true, get: function() {
          return x.INVALID_TRACEID;
        } }), Object.defineProperty(I, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return x.INVALID_SPAN_CONTEXT;
        } }), r2 = S(67), Object.defineProperty(I, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), i = S(506), Object.defineProperty(I, "diag", { enumerable: true, get: function() {
          return i.diag;
        } }), n = S(886), Object.defineProperty(I, "metrics", { enumerable: true, get: function() {
          return n.metrics;
        } }), a = S(939), Object.defineProperty(I, "propagation", { enumerable: true, get: function() {
          return a.propagation;
        } }), o = S(845), Object.defineProperty(I, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), I.default = { context: r2.context, diag: i.diag, metrics: n.metrics, propagation: a.propagation, trace: o.trace }, t.exports = I;
      })();
    }, 41424, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, i, n, a = {};
        a.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var n2 = {}, a2 = t2.split(i), o = (r3 || {}).decode || e2, s = 0; s < a2.length; s++) {
            var u = a2[s], l = u.indexOf("=");
            if (!(l < 0)) {
              var d = u.substr(0, l).trim(), c = u.substr(++l, u.length).trim();
              '"' == c[0] && (c = c.slice(1, -1)), void 0 == n2[d] && (n2[d] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(c, o));
            }
          }
          return n2;
        }, a.serialize = function(e3, t2, i2) {
          var a2 = i2 || {}, o = a2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!n.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !n.test(s)) throw TypeError("argument val is invalid");
          var u = e3 + "=" + s;
          if (null != a2.maxAge) {
            var l = a2.maxAge - 0;
            if (isNaN(l) || !isFinite(l)) throw TypeError("option maxAge is invalid");
            u += "; Max-Age=" + Math.floor(l);
          }
          if (a2.domain) {
            if (!n.test(a2.domain)) throw TypeError("option domain is invalid");
            u += "; Domain=" + a2.domain;
          }
          if (a2.path) {
            if (!n.test(a2.path)) throw TypeError("option path is invalid");
            u += "; Path=" + a2.path;
          }
          if (a2.expires) {
            if ("function" != typeof a2.expires.toUTCString) throw TypeError("option expires is invalid");
            u += "; Expires=" + a2.expires.toUTCString();
          }
          if (a2.httpOnly && (u += "; HttpOnly"), a2.secure && (u += "; Secure"), a2.sameSite) switch ("string" == typeof a2.sameSite ? a2.sameSite.toLowerCase() : a2.sameSite) {
            case true:
            case "strict":
              u += "; SameSite=Strict";
              break;
            case "lax":
              u += "; SameSite=Lax";
              break;
            case "none":
              u += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return u;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, i = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = a;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, i, n, a;
        var o = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function i2() {
          }
          function n2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function a2(e4, t3, i3, a3, o3) {
            if ("function" != typeof i3) throw TypeError("The listener must be a function");
            var s3 = new n2(i3, a3 || e4, o3), u2 = r3 ? r3 + t3 : t3;
            return e4._events[u2] ? e4._events[u2].fn ? e4._events[u2] = [e4._events[u2], s3] : e4._events[u2].push(s3) : (e4._events[u2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new i2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new i2(), this._eventsCount = 0;
          }
          Object.create && (i2.prototype = /* @__PURE__ */ Object.create(null), new i2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, i3, n3 = [];
            if (0 === this._eventsCount) return n3;
            for (i3 in e4 = this._events) t2.call(e4, i3) && n3.push(r3 ? i3.slice(1) : i3);
            return Object.getOwnPropertySymbols ? n3.concat(Object.getOwnPropertySymbols(e4)) : n3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, i3 = this._events[t3];
            if (!i3) return [];
            if (i3.fn) return [i3.fn];
            for (var n3 = 0, a3 = i3.length, o3 = Array(a3); n3 < a3; n3++) o3[n3] = i3[n3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, i3 = this._events[t3];
            return i3 ? i3.fn ? 1 : i3.length : 0;
          }, s2.prototype.emit = function(e4, t3, i3, n3, a3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var u2, l2, d = this._events[s3], c = arguments.length;
            if (d.fn) {
              switch (d.once && this.removeListener(e4, d.fn, void 0, true), c) {
                case 1:
                  return d.fn.call(d.context), true;
                case 2:
                  return d.fn.call(d.context, t3), true;
                case 3:
                  return d.fn.call(d.context, t3, i3), true;
                case 4:
                  return d.fn.call(d.context, t3, i3, n3), true;
                case 5:
                  return d.fn.call(d.context, t3, i3, n3, a3), true;
                case 6:
                  return d.fn.call(d.context, t3, i3, n3, a3, o3), true;
              }
              for (l2 = 1, u2 = Array(c - 1); l2 < c; l2++) u2[l2 - 1] = arguments[l2];
              d.fn.apply(d.context, u2);
            } else {
              var f, m = d.length;
              for (l2 = 0; l2 < m; l2++) switch (d[l2].once && this.removeListener(e4, d[l2].fn, void 0, true), c) {
                case 1:
                  d[l2].fn.call(d[l2].context);
                  break;
                case 2:
                  d[l2].fn.call(d[l2].context, t3);
                  break;
                case 3:
                  d[l2].fn.call(d[l2].context, t3, i3);
                  break;
                case 4:
                  d[l2].fn.call(d[l2].context, t3, i3, n3);
                  break;
                default:
                  if (!u2) for (f = 1, u2 = Array(c - 1); f < c; f++) u2[f - 1] = arguments[f];
                  d[l2].fn.apply(d[l2].context, u2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, i3, n3) {
            var a3 = r3 ? r3 + e4 : e4;
            if (!this._events[a3]) return this;
            if (!t3) return o2(this, a3), this;
            var s3 = this._events[a3];
            if (s3.fn) s3.fn !== t3 || n3 && !s3.once || i3 && s3.context !== i3 || o2(this, a3);
            else {
              for (var u2 = 0, l2 = [], d = s3.length; u2 < d; u2++) (s3[u2].fn !== t3 || n3 && !s3[u2].once || i3 && s3[u2].context !== i3) && l2.push(s3[u2]);
              l2.length ? this._events[a3] = 1 === l2.length ? l2[0] : l2 : o2(this, a3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new i2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let i2 = 0, n2 = e4.length;
            for (; n2 > 0; ) {
              let a2 = n2 / 2 | 0, o2 = i2 + a2;
              0 >= r3(e4[o2], t3) ? (i2 = ++o2, n2 -= a2 + 1) : n2 = a2;
            }
            return i2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let i2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let n2 = i2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(n2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let i2 = r3(213);
          class n2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let a2 = (e4, t3, r4) => new Promise((a3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void a3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  a3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let i3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new n2(i3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            i2(e4.then(a3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = a2, e3.exports.default = a2, e3.exports.TimeoutError = n2;
        } }, s = {};
        function u(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, i2 = true;
          try {
            o[e3](r3, r3.exports, u), i2 = false;
          } finally {
            i2 && delete s[e3];
          }
          return r3.exports;
        }
        u.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var l = {};
        Object.defineProperty(l, "__esModule", { value: true }), e2 = u(993), r2 = u(816), i = u(821), n = () => {
        }, a = new r2.TimeoutError(), l.default = class extends e2 {
          constructor(e3) {
            var t2, r3, a2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: i.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (a2 = e3.interval) ? void 0 : a2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = n, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = n, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((i2, n2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && n2(a);
                  });
                  i2(await o3);
                } catch (e4) {
                  n2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = l;
      })();
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { getTestReqInfo: function() {
        return u;
      }, withRequest: function() {
        return s;
      } };
      for (var n in i) Object.defineProperty(r, n, { enumerable: true, get: i[n] });
      let a = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let i2 = t2.url(e2);
        return { url: i2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let i2 = o(e2, t2);
        return i2 ? a.run(i2, r2) : r2();
      }
      function u(e2, t2) {
        let r2 = a.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var i = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { handleFetch: function() {
        return l;
      }, interceptFetch: function() {
        return d;
      }, reader: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let o = e.r(25085), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function u(e2, t2) {
        let { url: r2, method: n2, headers: a2, body: o2, cache: s2, credentials: u2, integrity: l2, mode: d2, redirect: c, referrer: f, referrerPolicy: m } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? i.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: u2, integrity: l2, mode: d2, redirect: c, referrer: f, referrerPolicy: m } };
      }
      async function l(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: n2, proxyPort: a2 } = r2, l2 = await u(n2, t2), d2 = await e2(`http://localhost:${a2}`, { method: "POST", body: JSON.stringify(l2), next: { internal: true } });
        if (!d2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${d2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let c = await d2.json(), { api: f } = c;
        switch (f) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: n3 } = e3.response;
              return new Response(n3 ? i.Buffer.from(n3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(c);
          default:
            return f;
        }
      }
      function d(t2) {
        return e.g.fetch = function(e2, r2) {
          var i2;
          return (null == r2 || null == (i2 = r2.next) ? void 0 : i2.internal) ? t2(e2, r2) : l(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return u;
      } };
      for (var n in i) Object.defineProperty(r, n, { enumerable: true, get: i[n] });
      let a = e.r(25085), o = e.r(28325);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function u(e2) {
        return (t2, r2) => (0, a.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 54846, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 114: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, i3 = "", n = 0, a = -1, o = 0, s = 0; s <= e4.length; ++s) {
              if (s < e4.length) r4 = e4.charCodeAt(s);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (a === s - 1 || 1 === o) ;
                else if (a !== s - 1 && 2 === o) {
                  if (i3.length < 2 || 2 !== n || 46 !== i3.charCodeAt(i3.length - 1) || 46 !== i3.charCodeAt(i3.length - 2)) {
                    if (i3.length > 2) {
                      var u = i3.lastIndexOf("/");
                      if (u !== i3.length - 1) {
                        -1 === u ? (i3 = "", n = 0) : n = (i3 = i3.slice(0, u)).length - 1 - i3.lastIndexOf("/"), a = s, o = 0;
                        continue;
                      }
                    } else if (2 === i3.length || 1 === i3.length) {
                      i3 = "", n = 0, a = s, o = 0;
                      continue;
                    }
                  }
                  t3 && (i3.length > 0 ? i3 += "/.." : i3 = "..", n = 2);
                } else i3.length > 0 ? i3 += "/" + e4.slice(a + 1, s) : i3 = e4.slice(a + 1, s), n = s - a - 1;
                a = s, o = 0;
              } else 46 === r4 && -1 !== o ? ++o : o = -1;
            }
            return i3;
          }
          var i2 = { resolve: function() {
            for (var e4, i3, n = "", a = false, o = arguments.length - 1; o >= -1 && !a; o--) o >= 0 ? i3 = arguments[o] : (void 0 === e4 && (e4 = ""), i3 = e4), t2(i3), 0 !== i3.length && (n = i3 + "/" + n, a = 47 === i3.charCodeAt(0));
            if (n = r3(n, !a), a) if (n.length > 0) return "/" + n;
            else return "/";
            return n.length > 0 ? n : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var i3 = 47 === e4.charCodeAt(0), n = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !i3)).length || i3 || (e4 = "."), e4.length > 0 && n && (e4 += "/"), i3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var n = arguments[r4];
              t2(n), n.length > 0 && (void 0 === e4 ? e4 = n : e4 += "/" + n);
            }
            return void 0 === e4 ? "." : i2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = i2.resolve(e4)) === (r4 = i2.resolve(r4))) return "";
            for (var n = 1; n < e4.length && 47 === e4.charCodeAt(n); ++n) ;
            for (var a = e4.length, o = a - n, s = 1; s < r4.length && 47 === r4.charCodeAt(s); ++s) ;
            for (var u = r4.length - s, l = o < u ? o : u, d = -1, c = 0; c <= l; ++c) {
              if (c === l) {
                if (u > l) {
                  if (47 === r4.charCodeAt(s + c)) return r4.slice(s + c + 1);
                  else if (0 === c) return r4.slice(s + c);
                } else o > l && (47 === e4.charCodeAt(n + c) ? d = c : 0 === c && (d = 0));
                break;
              }
              var f = e4.charCodeAt(n + c);
              if (f !== r4.charCodeAt(s + c)) break;
              47 === f && (d = c);
            }
            var m = "";
            for (c = n + d + 1; c <= a; ++c) (c === a || 47 === e4.charCodeAt(c)) && (0 === m.length ? m += ".." : m += "/..");
            return m.length > 0 ? m + r4.slice(s + d) : (s += d, 47 === r4.charCodeAt(s) && ++s, r4.slice(s));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), i3 = 47 === r4, n = -1, a = true, o = e4.length - 1; o >= 1; --o) if (47 === (r4 = e4.charCodeAt(o))) {
              if (!a) {
                n = o;
                break;
              }
            } else a = false;
            return -1 === n ? i3 ? "/" : "." : i3 && 1 === n ? "//" : e4.slice(0, n);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var i3, n = 0, a = -1, o = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var s = r4.length - 1, u = -1;
              for (i3 = e4.length - 1; i3 >= 0; --i3) {
                var l = e4.charCodeAt(i3);
                if (47 === l) {
                  if (!o) {
                    n = i3 + 1;
                    break;
                  }
                } else -1 === u && (o = false, u = i3 + 1), s >= 0 && (l === r4.charCodeAt(s) ? -1 == --s && (a = i3) : (s = -1, a = u));
              }
              return n === a ? a = u : -1 === a && (a = e4.length), e4.slice(n, a);
            }
            for (i3 = e4.length - 1; i3 >= 0; --i3) if (47 === e4.charCodeAt(i3)) {
              if (!o) {
                n = i3 + 1;
                break;
              }
            } else -1 === a && (o = false, a = i3 + 1);
            return -1 === a ? "" : e4.slice(n, a);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, i3 = 0, n = -1, a = true, o = 0, s = e4.length - 1; s >= 0; --s) {
              var u = e4.charCodeAt(s);
              if (47 === u) {
                if (!a) {
                  i3 = s + 1;
                  break;
                }
                continue;
              }
              -1 === n && (a = false, n = s + 1), 46 === u ? -1 === r4 ? r4 = s : 1 !== o && (o = 1) : -1 !== r4 && (o = -1);
            }
            return -1 === r4 || -1 === n || 0 === o || 1 === o && r4 === n - 1 && r4 === i3 + 1 ? "" : e4.slice(r4, n);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, i3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return i3;
            var n = e4.charCodeAt(0), a = 47 === n;
            a ? (i3.root = "/", r4 = 1) : r4 = 0;
            for (var o = -1, s = 0, u = -1, l = true, d = e4.length - 1, c = 0; d >= r4; --d) {
              if (47 === (n = e4.charCodeAt(d))) {
                if (!l) {
                  s = d + 1;
                  break;
                }
                continue;
              }
              -1 === u && (l = false, u = d + 1), 46 === n ? -1 === o ? o = d : 1 !== c && (c = 1) : -1 !== o && (c = -1);
            }
            return -1 === o || -1 === u || 0 === c || 1 === c && o === u - 1 && o === s + 1 ? -1 !== u && (0 === s && a ? i3.base = i3.name = e4.slice(1, u) : i3.base = i3.name = e4.slice(s, u)) : (0 === s && a ? (i3.name = e4.slice(1, o), i3.base = e4.slice(1, u)) : (i3.name = e4.slice(s, o), i3.base = e4.slice(s, u)), i3.ext = e4.slice(o, u)), s > 0 ? i3.dir = e4.slice(0, s - 1) : a && (i3.dir = "/"), i3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          i2.posix = i2, e3.exports = i2;
        } }, r2 = {};
        function i(t2) {
          var n = r2[t2];
          if (void 0 !== n) return n.exports;
          var a = r2[t2] = { exports: {} }, o = true;
          try {
            e2[t2](a, a.exports, i), o = false;
          } finally {
            o && delete r2[t2];
          }
          return a.exports;
        }
        i.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = i(114);
      }();
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var i3 = e4[r4];
                if ("*" === i3 || "+" === i3 || "?" === i3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === i3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === i3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === i3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === i3) {
                  for (var n2 = "", a3 = r4 + 1; a3 < e4.length; ) {
                    var o3 = e4.charCodeAt(a3);
                    if (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 90 || o3 >= 97 && o3 <= 122 || 95 === o3) {
                      n2 += e4[a3++];
                      continue;
                    }
                    break;
                  }
                  if (!n2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: n2 }), r4 = a3;
                  continue;
                }
                if ("(" === i3) {
                  var s3 = 1, u2 = "", a3 = r4 + 1;
                  if ("?" === e4[a3]) throw TypeError('Pattern cannot start with "?" at '.concat(a3));
                  for (; a3 < e4.length; ) {
                    if ("\\" === e4[a3]) {
                      u2 += e4[a3++] + e4[a3++];
                      continue;
                    }
                    if (")" === e4[a3]) {
                      if (0 == --s3) {
                        a3++;
                        break;
                      }
                    } else if ("(" === e4[a3] && (s3++, "?" !== e4[a3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(a3));
                    u2 += e4[a3++];
                  }
                  if (s3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!u2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: u2 }), r4 = a3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), i2 = t3.prefixes, a2 = void 0 === i2 ? "./" : i2, o2 = t3.delimiter, s2 = void 0 === o2 ? "/#?" : o2, u = [], l = 0, d = 0, c = "", f = function(e4) {
              if (d < r3.length && r3[d].type === e4) return r3[d++].value;
            }, m = function(e4) {
              var t4 = f(e4);
              if (void 0 !== t4) return t4;
              var i3 = r3[d], n2 = i3.type, a3 = i3.index;
              throw TypeError("Unexpected ".concat(n2, " at ").concat(a3, ", expected ").concat(e4));
            }, p = function() {
              for (var e4, t4 = ""; e4 = f("CHAR") || f("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, v = function(e4) {
              for (var t4 = 0; t4 < s2.length; t4++) {
                var r4 = s2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, g = function(e4) {
              var t4 = u[u.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || v(r4) ? "[^".concat(n(s2), "]+?") : "(?:(?!".concat(n(r4), ")[^").concat(n(s2), "])+?");
            }; d < r3.length; ) {
              var h = f("CHAR"), _ = f("NAME"), b = f("PATTERN");
              if (_ || b) {
                var y = h || "";
                -1 === a2.indexOf(y) && (c += y, y = ""), c && (u.push(c), c = ""), u.push({ name: _ || l++, prefix: y, suffix: "", pattern: b || g(y), modifier: f("MODIFIER") || "" });
                continue;
              }
              var $ = h || f("ESCAPED_CHAR");
              if ($) {
                c += $;
                continue;
              }
              if (c && (u.push(c), c = ""), f("OPEN")) {
                var y = p(), x = f("NAME") || "", w = f("PATTERN") || "", k = p();
                m("CLOSE"), u.push({ name: x || (w ? l++ : ""), pattern: x && !w ? g(y) : w, prefix: y, suffix: k, modifier: f("MODIFIER") || "" });
                continue;
              }
              m("END");
            }
            return u;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = a(t3), i2 = t3.encode, n2 = void 0 === i2 ? function(e4) {
              return e4;
            } : i2, o2 = t3.validate, s2 = void 0 === o2 || o2, u = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", i3 = 0; i3 < e3.length; i3++) {
                var a2 = e3[i3];
                if ("string" == typeof a2) {
                  r4 += a2;
                  continue;
                }
                var o3 = t4 ? t4[a2.name] : void 0, l = "?" === a2.modifier || "*" === a2.modifier, d = "*" === a2.modifier || "+" === a2.modifier;
                if (Array.isArray(o3)) {
                  if (!d) throw TypeError('Expected "'.concat(a2.name, '" to not repeat, but got an array'));
                  if (0 === o3.length) {
                    if (l) continue;
                    throw TypeError('Expected "'.concat(a2.name, '" to not be empty'));
                  }
                  for (var c = 0; c < o3.length; c++) {
                    var f = n2(o3[c], a2);
                    if (s2 && !u[i3].test(f)) throw TypeError('Expected all "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(f, '"'));
                    r4 += a2.prefix + f + a2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof o3 || "number" == typeof o3) {
                  var f = n2(String(o3), a2);
                  if (s2 && !u[i3].test(f)) throw TypeError('Expected "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(f, '"'));
                  r4 += a2.prefix + f + a2.suffix;
                  continue;
                }
                if (!l) {
                  var m = d ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(a2.name, '" to be ').concat(m));
                }
              }
              return r4;
            };
          }
          function i(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var i2 = r3.decode, n2 = void 0 === i2 ? function(e4) {
              return e4;
            } : i2;
            return function(r4) {
              var i3 = e3.exec(r4);
              if (!i3) return false;
              for (var a2 = i3[0], o2 = i3.index, s2 = /* @__PURE__ */ Object.create(null), u = 1; u < i3.length; u++) !function(e4) {
                if (void 0 !== i3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? s2[r5.name] = i3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return n2(e5, r5);
                  }) : s2[r5.name] = n2(i3[e4], r5);
                }
              }(u);
              return { path: a2, index: o2, params: s2 };
            };
          }
          function n(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function a(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function o(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var i2 = r3.strict, o2 = void 0 !== i2 && i2, s2 = r3.start, u = r3.end, l = r3.encode, d = void 0 === l ? function(e4) {
              return e4;
            } : l, c = r3.delimiter, f = r3.endsWith, m = "[".concat(n(void 0 === f ? "" : f), "]|$"), p = "[".concat(n(void 0 === c ? "/#?" : c), "]"), v = void 0 === s2 || s2 ? "^" : "", g = 0; g < e3.length; g++) {
              var h = e3[g];
              if ("string" == typeof h) v += n(d(h));
              else {
                var _ = n(d(h.prefix)), b = n(d(h.suffix));
                if (h.pattern) if (t3 && t3.push(h), _ || b) if ("+" === h.modifier || "*" === h.modifier) {
                  var y = "*" === h.modifier ? "?" : "";
                  v += "(?:".concat(_, "((?:").concat(h.pattern, ")(?:").concat(b).concat(_, "(?:").concat(h.pattern, "))*)").concat(b, ")").concat(y);
                } else v += "(?:".concat(_, "(").concat(h.pattern, ")").concat(b, ")").concat(h.modifier);
                else {
                  if ("+" === h.modifier || "*" === h.modifier) throw TypeError('Can not repeat "'.concat(h.name, '" without a prefix and suffix'));
                  v += "(".concat(h.pattern, ")").concat(h.modifier);
                }
                else v += "(?:".concat(_).concat(b, ")").concat(h.modifier);
              }
            }
            if (void 0 === u || u) o2 || (v += "".concat(p, "?")), v += r3.endsWith ? "(?=".concat(m, ")") : "$";
            else {
              var $ = e3[e3.length - 1], x = "string" == typeof $ ? p.indexOf($[$.length - 1]) > -1 : void 0 === $;
              o2 || (v += "(?:".concat(p, "(?=").concat(m, "))?")), x || (v += "(?=".concat(p, "|").concat(m, ")"));
            }
            return new RegExp(v, a(r3));
          }
          function s(e3, r3, i2) {
            if (e3 instanceof RegExp) {
              var n2;
              if (!r3) return e3;
              for (var u = /\((?:\?<(.*?)>)?(?!\?)/g, l = 0, d = u.exec(e3.source); d; ) r3.push({ name: d[1] || l++, prefix: "", suffix: "", modifier: "", pattern: "" }), d = u.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (n2 = e3.map(function(e4) {
              return s(e4, r3, i2).source;
            }), new RegExp("(?:".concat(n2.join("|"), ")"), a(i2))) : o(t2(e3, i2), r3, i2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, i2) {
            return r2(t2(e3, i2), i2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return i(s(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = i, e2.tokensToRegexp = o, e2.pathToRegexp = s;
        })(), t.exports = e2;
      })();
    }, 64445, (e, t, r) => {
      var i = { 226: function(t2, r2) {
        !function(i2) {
          "use strict";
          var n2 = "function", a2 = "undefined", o = "object", s = "string", u = "major", l = "model", d = "name", c = "type", f = "vendor", m = "version", p = "architecture", v = "console", g = "mobile", h = "tablet", _ = "smarttv", b = "wearable", y = "embedded", $ = "Amazon", x = "Apple", w = "ASUS", k = "BlackBerry", S = "Browser", I = "Chrome", O = "Firefox", E = "Google", P = "Huawei", T = "Microsoft", N = "Motorola", z = "Opera", C = "Samsung", R = "Sharp", U = "Sony", j = "Xiaomi", D = "Zebra", A = "Facebook", Z = "Chromium OS", L = "Mac OS", M = function(e2, t3) {
            var r3 = {};
            for (var i3 in e2) t3[i3] && t3[i3].length % 2 == 0 ? r3[i3] = t3[i3].concat(e2[i3]) : r3[i3] = e2[i3];
            return r3;
          }, F = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, J = function(e2, t3) {
            return typeof e2 === s && -1 !== B(t3).indexOf(B(e2));
          }, B = function(e2) {
            return e2.toLowerCase();
          }, q = function(e2, t3) {
            if (typeof e2 === s) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a2 ? e2 : e2.substring(0, 350);
          }, V = function(e2, t3) {
            for (var r3, i3, a3, s2, u2, l2, d2 = 0; d2 < t3.length && !u2; ) {
              var c2 = t3[d2], f2 = t3[d2 + 1];
              for (r3 = i3 = 0; r3 < c2.length && !u2 && c2[r3]; ) if (u2 = c2[r3++].exec(e2)) for (a3 = 0; a3 < f2.length; a3++) l2 = u2[++i3], typeof (s2 = f2[a3]) === o && s2.length > 0 ? 2 === s2.length ? typeof s2[1] == n2 ? this[s2[0]] = s2[1].call(this, l2) : this[s2[0]] = s2[1] : 3 === s2.length ? typeof s2[1] !== n2 || s2[1].exec && s2[1].test ? this[s2[0]] = l2 ? l2.replace(s2[1], s2[2]) : void 0 : this[s2[0]] = l2 ? s2[1].call(this, l2, s2[2]) : void 0 : 4 === s2.length && (this[s2[0]] = l2 ? s2[3].call(this, l2.replace(s2[1], s2[2])) : void 0) : this[s2] = l2 || void 0;
              d2 += 2;
            }
          }, G = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var i3 = 0; i3 < t3[r3].length; i3++) if (J(t3[r3][i3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (J(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, W = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [m, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [m, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, m], [/opios[\/ ]+([\w\.]+)/i], [m, [d, z + " Mini"]], [/\bopr\/([\w\.]+)/i], [m, [d, z]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, m], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [m, [d, "UC" + S]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [m, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [m, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [m, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [m, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [m, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure " + S], m], [/\bfocus\/([\w\.]+)/i], [m, [d, O + " Focus"]], [/\bopt\/([\w\.]+)/i], [m, [d, z + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [m, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [m, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [m, [d, z + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [m, [d, "MIUI " + S]], [/fxios\/([-\w\.]+)/i], [m, [d, O]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 " + S]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 " + S], m], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], m], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, m], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, A], m], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, m], [/\bgsa\/([\w\.]+) .*safari\//i], [m, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [m, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [m, [d, I + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, I + " WebView"], m], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [m, [d, "Android " + S]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, m], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [m, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [m, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [m, G, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, m], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], m], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [m, [d, O + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, m], [/(cobalt)\/([\w\.]+)/i], [d, [m, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[p, "amd64"]], [/(ia32(?=;))/i], [[p, B]], [/((?:i[346]|x)86)[;\)]/i], [[p, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[p, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[p, "armhf"]], [/windows (ce|mobile); ppc;/i], [[p, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[p, /ower/, "", B]], [/(sun4\w)[;\)]/i], [[p, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[p, B]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [l, [f, C], [c, h]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [l, [f, C], [c, g]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [l, [f, x], [c, g]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [l, [f, x], [c, h]], [/(macintosh);/i], [l, [f, x]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [l, [f, R], [c, g]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [l, [f, P], [c, h]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [l, [f, P], [c, g]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[l, /_/g, " "], [f, j], [c, g]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[l, /_/g, " "], [f, j], [c, h]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [l, [f, "OPPO"], [c, g]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [l, [f, "Vivo"], [c, g]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [l, [f, "Realme"], [c, g]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [l, [f, N], [c, g]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [l, [f, N], [c, h]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [l, [f, "LG"], [c, h]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [l, [f, "LG"], [c, g]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [l, [f, "Lenovo"], [c, h]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[l, /_/g, " "], [f, "Nokia"], [c, g]], [/(pixel c)\b/i], [l, [f, E], [c, h]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [l, [f, E], [c, g]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [l, [f, U], [c, g]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[l, "Xperia Tablet"], [f, U], [c, h]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [l, [f, "OnePlus"], [c, g]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [l, [f, $], [c, h]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[l, /(.+)/g, "Fire Phone $1"], [f, $], [c, g]], [/(playbook);[-\w\),; ]+(rim)/i], [l, f, [c, h]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [l, [f, k], [c, g]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [l, [f, w], [c, h]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [l, [f, w], [c, g]], [/(nexus 9)/i], [l, [f, "HTC"], [c, h]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [f, [l, /_/g, " "], [c, g]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [l, [f, "Acer"], [c, h]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [l, [f, "Meizu"], [c, g]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [f, l, [c, g]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [f, l, [c, h]], [/(surface duo)/i], [l, [f, T], [c, h]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [l, [f, "Fairphone"], [c, g]], [/(u304aa)/i], [l, [f, "AT&T"], [c, g]], [/\bsie-(\w*)/i], [l, [f, "Siemens"], [c, g]], [/\b(rct\w+) b/i], [l, [f, "RCA"], [c, h]], [/\b(venue[\d ]{2,7}) b/i], [l, [f, "Dell"], [c, h]], [/\b(q(?:mv|ta)\w+) b/i], [l, [f, "Verizon"], [c, h]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [l, [f, "Barnes & Noble"], [c, h]], [/\b(tm\d{3}\w+) b/i], [l, [f, "NuVision"], [c, h]], [/\b(k88) b/i], [l, [f, "ZTE"], [c, h]], [/\b(nx\d{3}j) b/i], [l, [f, "ZTE"], [c, g]], [/\b(gen\d{3}) b.+49h/i], [l, [f, "Swiss"], [c, g]], [/\b(zur\d{3}) b/i], [l, [f, "Swiss"], [c, h]], [/\b((zeki)?tb.*\b) b/i], [l, [f, "Zeki"], [c, h]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[f, "Dragon Touch"], l, [c, h]], [/\b(ns-?\w{0,9}) b/i], [l, [f, "Insignia"], [c, h]], [/\b((nxa|next)-?\w{0,9}) b/i], [l, [f, "NextBook"], [c, h]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[f, "Voice"], l, [c, g]], [/\b(lvtel\-)?(v1[12]) b/i], [[f, "LvTel"], l, [c, g]], [/\b(ph-1) /i], [l, [f, "Essential"], [c, g]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [l, [f, "Envizen"], [c, h]], [/\b(trio[-\w\. ]+) b/i], [l, [f, "MachSpeed"], [c, h]], [/\btu_(1491) b/i], [l, [f, "Rotor"], [c, h]], [/(shield[\w ]+) b/i], [l, [f, "Nvidia"], [c, h]], [/(sprint) (\w+)/i], [f, l, [c, g]], [/(kin\.[onetw]{3})/i], [[l, /\./g, " "], [f, T], [c, g]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [l, [f, D], [c, h]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [l, [f, D], [c, g]], [/smart-tv.+(samsung)/i], [f, [c, _]], [/hbbtv.+maple;(\d+)/i], [[l, /^/, "SmartTV"], [f, C], [c, _]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[f, "LG"], [c, _]], [/(apple) ?tv/i], [f, [l, x + " TV"], [c, _]], [/crkey/i], [[l, I + "cast"], [f, E], [c, _]], [/droid.+aft(\w)( bui|\))/i], [l, [f, $], [c, _]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [l, [f, R], [c, _]], [/(bravia[\w ]+)( bui|\))/i], [l, [f, U], [c, _]], [/(mitv-\w{5}) bui/i], [l, [f, j], [c, _]], [/Hbbtv.*(technisat) (.*);/i], [f, l, [c, _]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[f, q], [l, q], [c, _]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[c, _]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [f, l, [c, v]], [/droid.+; (shield) bui/i], [l, [f, "Nvidia"], [c, v]], [/(playstation [345portablevi]+)/i], [l, [f, U], [c, v]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [l, [f, T], [c, v]], [/((pebble))app/i], [f, l, [c, b]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [l, [f, x], [c, b]], [/droid.+; (glass) \d/i], [l, [f, E], [c, b]], [/droid.+; (wt63?0{2,3})\)/i], [l, [f, D], [c, b]], [/(quest( 2| pro)?)/i], [l, [f, A], [c, b]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [f, [c, y]], [/(aeobc)\b/i], [l, [f, $], [c, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [l, [c, g]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [l, [c, h]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[c, h]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[c, g]], [/(android[-\w\. ]{0,9});.+buil/i], [l, [f, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [m, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [m, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, m], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [m, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, m], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [m, G, W]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [m, G, W]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[m, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, L], [m, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [m, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, m], [/\(bb(10);/i], [m, [d, k]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [m, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [m, [d, O + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [m, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [m, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [m, [d, I + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, Z], m], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, m], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], m], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, m]] }, H = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof H)) return new H(e2, t3).getResult();
            var r3 = typeof i2 !== a2 && i2.navigator ? i2.navigator : void 0, v2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), _2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, b2 = t3 ? M(X, t3) : X, y2 = r3 && r3.userAgent == v2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[d] = void 0, t4[m] = void 0, V.call(t4, v2, b2.browser), t4[u] = typeof (e3 = t4[m]) === s ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, y2 && r3 && r3.brave && typeof r3.brave.isBrave == n2 && (t4[d] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[p] = void 0, V.call(e3, v2, b2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[f] = void 0, e3[l] = void 0, e3[c] = void 0, V.call(e3, v2, b2.device), y2 && !e3[c] && _2 && _2.mobile && (e3[c] = g), y2 && "Macintosh" == e3[l] && r3 && typeof r3.standalone !== a2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[l] = "iPad", e3[c] = h), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[d] = void 0, e3[m] = void 0, V.call(e3, v2, b2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[d] = void 0, e3[m] = void 0, V.call(e3, v2, b2.os), y2 && !e3[d] && _2 && "Unknown" != _2.platform && (e3[d] = _2.platform.replace(/chrome os/i, Z).replace(/macos/i, L)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return v2;
            }, this.setUA = function(e3) {
              return v2 = typeof e3 === s && e3.length > 350 ? q(e3, 350) : e3, this;
            }, this.setUA(v2), this;
          };
          if (H.VERSION = "1.0.35", H.BROWSER = F([d, m, u]), H.CPU = F([p]), H.DEVICE = F([l, f, c, v, g, _, h, b, y]), H.ENGINE = H.OS = F([d, m]), typeof r2 !== a2) t2.exports && (r2 = t2.exports = H), r2.UAParser = H;
          else if (typeof define === n2 && define.amd) e.r, void 0 !== H && e.v(H);
          else typeof i2 !== a2 && (i2.UAParser = H);
          var K = typeof i2 !== a2 && (i2.jQuery || i2.Zepto);
          if (K && !K.ua) {
            var Y = new H();
            K.ua = Y.getResult(), K.ua.get = function() {
              return Y.getUA();
            }, K.ua.set = function(e2) {
              Y.setUA(e2);
              var t3 = Y.getResult();
              for (var r3 in t3) K.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, n = {};
      function a(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = n[e2] = { exports: {} }, o = true;
        try {
          i[e2].call(r2.exports, r2, r2.exports, a), o = false;
        } finally {
          o && delete n[e2];
        }
        return r2.exports;
      }
      a.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = a(226);
    }, 8946, (e, t, r) => {
      "use strict";
      var i = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var a = Array.isArray;
      function o() {
      }
      var s = Symbol.for("react.transitional.element"), u = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), f = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), h = Symbol.for("react.view_transition"), _ = Symbol.iterator, b = Object.prototype.hasOwnProperty, y = Object.assign;
      function $(e2, t2, r2) {
        var i2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== i2 ? i2 : null, props: r2 };
      }
      function x(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var w = /\/+/g;
      function k(e2, t2) {
        var r2, i2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, i2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return i2[e3];
        })) : t2.toString(36);
      }
      function S(e2, t2, r2) {
        if (null == e2) return e2;
        var i2 = [], l2 = 0;
        return !function e3(t3, r3, i3, l3, d2) {
          var c2, f2, m2, p2 = typeof t3;
          ("undefined" === p2 || "boolean" === p2) && (t3 = null);
          var g2 = false;
          if (null === t3) g2 = true;
          else switch (p2) {
            case "bigint":
            case "string":
            case "number":
              g2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case u:
                  g2 = true;
                  break;
                case v:
                  return e3((g2 = t3._init)(t3._payload), r3, i3, l3, d2);
              }
          }
          if (g2) return d2 = d2(t3), g2 = "" === l3 ? "." + k(t3, 0) : l3, a(d2) ? (i3 = "", null != g2 && (i3 = g2.replace(w, "$&/") + "/"), e3(d2, r3, i3, "", function(e4) {
            return e4;
          })) : null != d2 && (x(d2) && (c2 = d2, f2 = i3 + (null == d2.key || t3 && t3.key === d2.key ? "" : ("" + d2.key).replace(w, "$&/") + "/") + g2, d2 = $(c2.type, f2, c2.props)), r3.push(d2)), 1;
          g2 = 0;
          var h2 = "" === l3 ? "." : l3 + ":";
          if (a(t3)) for (var b2 = 0; b2 < t3.length; b2++) p2 = h2 + k(l3 = t3[b2], b2), g2 += e3(l3, r3, i3, p2, d2);
          else if ("function" == typeof (b2 = null === (m2 = t3) || "object" != typeof m2 ? null : "function" == typeof (m2 = _ && m2[_] || m2["@@iterator"]) ? m2 : null)) for (t3 = b2.call(t3), b2 = 0; !(l3 = t3.next()).done; ) p2 = h2 + k(l3 = l3.value, b2++), g2 += e3(l3, r3, i3, p2, d2);
          else if ("object" === p2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, i3, l3, d2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return g2;
        }(e2, i2, "", "", function(e3) {
          return t2.call(r2, e3, l2++);
        }), i2;
      }
      function I(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function O() {
        return /* @__PURE__ */ new WeakMap();
      }
      function E() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = g, r.Children = { map: S, forEach: function(e2, t2, r2) {
        S(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return S(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return S(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!x(e2)) throw Error(n(143));
        return e2;
      } }, r.Fragment = l, r.Profiler = c, r.StrictMode = d, r.Suspense = m, r.ViewTransition = h, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, r.cache = function(e2) {
        return function() {
          var t2 = i.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(O);
          void 0 === (t2 = r2.get(e2)) && (t2 = E(), r2.set(e2, t2)), r2 = 0;
          for (var n2 = arguments.length; r2 < n2; r2++) {
            var a2 = arguments[r2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = E(), o2.set(a2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = E(), o2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = i.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var i2 = y({}, e2.props), a2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) b.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (i2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), u2 = 0; u2 < o2; u2++) s2[u2] = arguments[u2 + 2];
          i2.children = s2;
        }
        return $(e2.type, a2, i2);
      }, r.createElement = function(e2, t2, r2) {
        var i2, n2 = {}, a2 = null;
        if (null != t2) for (i2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) b.call(t2, i2) && "key" !== i2 && "__self" !== i2 && "__source" !== i2 && (n2[i2] = t2[i2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), u2 = 0; u2 < o2; u2++) s2[u2] = arguments[u2 + 2];
          n2.children = s2;
        }
        if (e2 && e2.defaultProps) for (i2 in o2 = e2.defaultProps) void 0 === n2[i2] && (n2[i2] = o2[i2]);
        return $(e2, a2, n2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: f, render: e2 };
      }, r.isValidElement = x, r.lazy = function(e2) {
        return { $$typeof: v, _payload: { _status: -1, _result: e2 }, _init: I };
      }, r.memo = function(e2, t2) {
        return { $$typeof: p, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return i.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return i.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return i.H.useId();
      }, r.useMemo = function(e2, t2) {
        return i.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-3f0b9e61-20260317";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 58217, (e) => {
      "use strict";
      let t, r, i;
      async function n() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let a = null;
      async function o() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        a || (a = n());
        let e10 = await a;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function s(...e10) {
        let t10 = await n();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let u = null;
      function l() {
        return u || (u = o()), u;
      }
      function d(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, i10, n10) {
            if ("function" == typeof n10[0]) return n10[0](t10);
            throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      l();
      class c extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class f extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class m extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let p = "x-prerender-revalidate", v = ".meta", g = "x-next-cache-tags", h = "x-next-revalidated-tags", _ = "_N_T_", b = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function y(e10) {
        var t10, r10, i10, n10, a10, o10 = [], s10 = 0;
        function u10() {
          for (; s10 < e10.length && /\s/.test(e10.charAt(s10)); ) s10 += 1;
          return s10 < e10.length;
        }
        for (; s10 < e10.length; ) {
          for (t10 = s10, a10 = false; u10(); ) if ("," === (r10 = e10.charAt(s10))) {
            for (i10 = s10, s10 += 1, u10(), n10 = s10; s10 < e10.length && "=" !== (r10 = e10.charAt(s10)) && ";" !== r10 && "," !== r10; ) s10 += 1;
            s10 < e10.length && "=" === e10.charAt(s10) ? (a10 = true, s10 = n10, o10.push(e10.substring(t10, i10)), t10 = s10) : s10 = i10 + 1;
          } else s10 += 1;
          (!a10 || s10 >= e10.length) && o10.push(e10.substring(t10, e10.length));
        }
        return o10;
      }
      function $(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [i10, n10] of e10.entries()) "set-cookie" === i10.toLowerCase() ? (r10.push(...y(n10)), t10[i10] = 1 === r10.length ? r10[0] : r10) : t10[i10] = n10;
        return t10;
      }
      function x(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...b, GROUP: { builtinReact: [b.reactServerComponents, b.actionBrowser], serverOnly: [b.reactServerComponents, b.actionBrowser, b.instrument, b.middleware], neutralTarget: [b.apiNode, b.apiEdge], clientOnly: [b.serverSideRendering, b.appPagesBrowser], bundled: [b.reactServerComponents, b.actionBrowser, b.serverSideRendering, b.appPagesBrowser, b.shared, b.instrument, b.middleware], appPages: [b.reactServerComponents, b.serverSideRendering, b.appPagesBrowser, b.actionBrowser] } });
      let w = Symbol("response"), k = Symbol("passThrough"), S = Symbol("waitUntil");
      class I {
        constructor(e10, t10) {
          this[k] = false, this[S] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[w] || (this[w] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[k] = true;
        }
        waitUntil(e10) {
          if ("external" === this[S].kind) return (0, this[S].function)(e10);
          this[S].promises.push(e10);
        }
      }
      class O extends I {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function E(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function P(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), i10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return i10 || t10 > -1 ? { pathname: e10.substring(0, i10 ? r10 : t10), query: i10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function T(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: i10, hash: n10 } = P(e10);
        return `${t10}${r10}${i10}${n10}`;
      }
      function N(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: i10, hash: n10 } = P(e10);
        return `${r10}${t10}${i10}${n10}`;
      }
      function z(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = P(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let C = /* @__PURE__ */ new WeakMap();
      function R(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let i10 = C.get(t10);
        i10 || (i10 = t10.map((e11) => e11.toLowerCase()), C.set(t10, i10));
        let n10 = e10.split("/", 2);
        if (!n10[1]) return { pathname: e10 };
        let a10 = n10[1].toLowerCase(), o10 = i10.indexOf(a10);
        return o10 < 0 ? { pathname: e10 } : (r10 = t10[o10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let U = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function j(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return U.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let D = Symbol("NextURLInternal");
      class A {
        constructor(e10, t10, r10) {
          let i10, n10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (i10 = t10, n10 = r10 || {}) : n10 = r10 || t10 || {}, this[D] = { url: j(e10, i10 ?? n10.base), options: n10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, i10, n10;
          let a10 = function(e11, t11) {
            let { basePath: r11, i18n: i11, trailingSlash: n11 } = t11.nextConfig ?? {}, a11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : n11 };
            r11 && z(a11.pathname, r11) && (a11.pathname = function(e12, t12) {
              if (!z(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(a11.pathname, r11), a11.basePath = r11);
            let o11 = a11.pathname;
            if (a11.pathname.startsWith("/_next/data/") && a11.pathname.endsWith(".json")) {
              let e12 = a11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              a11.buildId = e12[0], o11 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (a11.pathname = o11);
            }
            if (i11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a11.pathname) : R(a11.pathname, i11.locales);
              a11.locale = e12.detectedLocale, a11.pathname = e12.pathname ?? a11.pathname, !e12.detectedLocale && a11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o11) : R(o11, i11.locales)).detectedLocale && (a11.locale = e12.detectedLocale);
            }
            return a11;
          }(this[D].url.pathname, { nextConfig: this[D].options.nextConfig, parseData: true, i18nProvider: this[D].options.i18nProvider }), o10 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[D].url, this[D].options.headers);
          this[D].domainLocale = this[D].options.i18nProvider ? this[D].options.i18nProvider.detectDomainLocale(o10) : function(e11, t11, r11) {
            if (e11) {
              for (let i11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === i11.domain?.split(":", 1)[0].toLowerCase() || r11 === i11.defaultLocale.toLowerCase() || i11.locales?.some((e12) => e12.toLowerCase() === r11)) return i11;
            }
          }(null == (t10 = this[D].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o10);
          let s10 = (null == (r10 = this[D].domainLocale) ? void 0 : r10.defaultLocale) || (null == (n10 = this[D].options.nextConfig) || null == (i10 = n10.i18n) ? void 0 : i10.defaultLocale);
          this[D].url.pathname = a10.pathname, this[D].defaultLocale = s10, this[D].basePath = a10.basePath ?? "", this[D].buildId = a10.buildId, this[D].locale = a10.locale ?? s10, this[D].trailingSlash = a10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, i10) {
            if (!t11 || t11 === r10) return e11;
            let n10 = e11.toLowerCase();
            return !i10 && (z(n10, "/api") || z(n10, `/${t11.toLowerCase()}`)) ? e11 : T(e11, `/${t11}`);
          }((e10 = { basePath: this[D].basePath, buildId: this[D].buildId, defaultLocale: this[D].options.forceLocale ? void 0 : this[D].defaultLocale, locale: this[D].locale, pathname: this[D].url.pathname, trailingSlash: this[D].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = E(t10)), e10.buildId && (t10 = N(T(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = T(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : N(t10, "/") : E(t10);
        }
        formatSearch() {
          return this[D].url.search;
        }
        get buildId() {
          return this[D].buildId;
        }
        set buildId(e10) {
          this[D].buildId = e10;
        }
        get locale() {
          return this[D].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[D].locale || !(null == (r10 = this[D].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[D].locale = e10;
        }
        get defaultLocale() {
          return this[D].defaultLocale;
        }
        get domainLocale() {
          return this[D].domainLocale;
        }
        get searchParams() {
          return this[D].url.searchParams;
        }
        get host() {
          return this[D].url.host;
        }
        set host(e10) {
          this[D].url.host = e10;
        }
        get hostname() {
          return this[D].url.hostname;
        }
        set hostname(e10) {
          this[D].url.hostname = e10;
        }
        get port() {
          return this[D].url.port;
        }
        set port(e10) {
          this[D].url.port = e10;
        }
        get protocol() {
          return this[D].url.protocol;
        }
        set protocol(e10) {
          this[D].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[D].url = j(e10), this.analyze();
        }
        get origin() {
          return this[D].url.origin;
        }
        get pathname() {
          return this[D].url.pathname;
        }
        set pathname(e10) {
          this[D].url.pathname = e10;
        }
        get hash() {
          return this[D].url.hash;
        }
        set hash(e10) {
          this[D].url.hash = e10;
        }
        get search() {
          return this[D].url.search;
        }
        set search(e10) {
          this[D].url.search = e10;
        }
        get password() {
          return this[D].url.password;
        }
        set password(e10) {
          this[D].url.password = e10;
        }
        get username() {
          return this[D].url.username;
        }
        set username(e10) {
          this[D].url.username = e10;
        }
        get basePath() {
          return this[D].basePath;
        }
        set basePath(e10) {
          this[D].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new A(String(this), this[D].options);
        }
      }
      var Z, L, M, F, J, B, q, V, G, W, X, H, K, Y, Q, ee, et, er, ei = e.i(28042);
      let en = Symbol("internal request");
      class ea extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          x(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const i10 = new A(r10, { headers: $(this.headers), nextConfig: t10.nextConfig });
          this[en] = { cookies: new ei.RequestCookies(this.headers), nextUrl: i10, url: i10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[en].cookies;
        }
        get nextUrl() {
          return this[en].nextUrl;
        }
        get page() {
          throw new f();
        }
        get ua() {
          throw new m();
        }
        get url() {
          return this[en].url;
        }
      }
      class eo {
        static get(e10, t10, r10) {
          let i10 = Reflect.get(e10, t10, r10);
          return "function" == typeof i10 ? i10.bind(e10) : i10;
        }
        static set(e10, t10, r10, i10) {
          return Reflect.set(e10, t10, r10, i10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let es = Symbol("internal response"), eu = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function el(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [i10, n10] of e10.request.headers) t10.set("x-middleware-request-" + i10, n10), r11.push(i10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class ed extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, i10 = new Proxy(new ei.ResponseCookies(r10), { get(e11, i11, n10) {
            switch (i11) {
              case "delete":
              case "set":
                return (...n11) => {
                  let a10 = Reflect.apply(e11[i11], e11, n11), o10 = new Headers(r10);
                  return a10 instanceof ei.ResponseCookies && r10.set("x-middleware-set-cookie", a10.getAll().map((e12) => (0, ei.stringifyCookie)(e12)).join(",")), el(t10, o10), a10;
                };
              default:
                return eo.get(e11, i11, n10);
            }
          } });
          this[es] = { cookies: i10, url: t10.url ? new A(t10.url, { headers: $(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[es].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new ed(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!eu.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let i10 = "object" == typeof t10 ? t10 : {}, n10 = new Headers(null == i10 ? void 0 : i10.headers);
          return n10.set("Location", x(e10)), new ed(null, { ...i10, headers: n10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", x(e10)), el(t10, r10), new ed(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), el(e10, t10), new ed(null, { ...e10, headers: t10 });
        }
      }
      function ec(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, i10 = new URL(e10, t10), n10 = i10.origin === r10.origin;
        return { url: n10 ? i10.toString().slice(r10.origin.length) : i10.toString(), isRelative: n10 };
      }
      let ef = "next-router-prefetch", em = ["rsc", "next-router-state-tree", ef, "next-hmr-refresh", "next-router-segment-prefetch"], ep = "_rsc";
      function ev(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function eg(e10) {
        return ev(e10.split("/").reduce((e11, t10, r10, i10) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === i10.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eh extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eh();
        }
      }
      class e_ extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, i10) {
            if ("symbol" == typeof r10) return eo.get(t10, r10, i10);
            let n10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            if (void 0 !== a10) return eo.get(t10, a10, i10);
          }, set(t10, r10, i10, n10) {
            if ("symbol" == typeof r10) return eo.set(t10, r10, i10, n10);
            let a10 = r10.toLowerCase(), o10 = Object.keys(e10).find((e11) => e11.toLowerCase() === a10);
            return eo.set(t10, o10 ?? r10, i10, n10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return eo.has(t10, r10);
            let i10 = r10.toLowerCase(), n10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            return void 0 !== n10 && eo.has(t10, n10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return eo.deleteProperty(t10, r10);
            let i10 = r10.toLowerCase(), n10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            return void 0 === n10 || eo.deleteProperty(t10, n10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return eh.callable;
              default:
                return eo.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new e_(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, i10] of this.entries()) e10.call(t10, i10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let eb = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class ey {
        disable() {
          throw eb;
        }
        getStore() {
        }
        run() {
          throw eb;
        }
        exit() {
          throw eb;
        }
        enterWith() {
          throw eb;
        }
        static bind(e10) {
          return e10;
        }
      }
      let e$ = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function ex() {
        return e$ ? new e$() : new ey();
      }
      let ew = ex();
      class ek extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new ek();
        }
      }
      class eS {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return ek.callable;
              default:
                return eo.get(e11, t10, r10);
            }
          } });
        }
      }
      let eI = Symbol.for("next.mutated.cookies");
      class eO {
        static wrap(e10, t10) {
          let r10 = new ei.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let i10 = [], n10 = /* @__PURE__ */ new Set(), a10 = () => {
            let e11 = ew.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), i10 = r10.getAll().filter((e12) => n10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of i10) {
                let r11 = new ei.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o10 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eI:
                return i10;
              case "delete":
                return function(...t12) {
                  n10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o10;
                  } finally {
                    a10();
                  }
                };
              case "set":
                return function(...t12) {
                  n10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o10;
                  } finally {
                    a10();
                  }
                };
              default:
                return eo.get(e11, t11, r11);
            }
          } });
          return o10;
        }
      }
      function eE(e10, t10) {
        if ("action" !== e10.phase) throw new ek();
      }
      var eP = ((Z = eP || {}).handleRequest = "BaseServer.handleRequest", Z.run = "BaseServer.run", Z.pipe = "BaseServer.pipe", Z.getStaticHTML = "BaseServer.getStaticHTML", Z.render = "BaseServer.render", Z.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", Z.renderToResponse = "BaseServer.renderToResponse", Z.renderToHTML = "BaseServer.renderToHTML", Z.renderError = "BaseServer.renderError", Z.renderErrorToResponse = "BaseServer.renderErrorToResponse", Z.renderErrorToHTML = "BaseServer.renderErrorToHTML", Z.render404 = "BaseServer.render404", Z), eT = ((L = eT || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", L.loadComponents = "LoadComponents.loadComponents", L), eN = ((M = eN || {}).getRequestHandler = "NextServer.getRequestHandler", M.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", M.getServer = "NextServer.getServer", M.getServerRequestHandler = "NextServer.getServerRequestHandler", M.createServer = "createServer.createServer", M), ez = ((F = ez || {}).compression = "NextNodeServer.compression", F.getBuildId = "NextNodeServer.getBuildId", F.createComponentTree = "NextNodeServer.createComponentTree", F.clientComponentLoading = "NextNodeServer.clientComponentLoading", F.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", F.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", F.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", F.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", F.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", F.sendRenderResult = "NextNodeServer.sendRenderResult", F.proxyRequest = "NextNodeServer.proxyRequest", F.runApi = "NextNodeServer.runApi", F.render = "NextNodeServer.render", F.renderHTML = "NextNodeServer.renderHTML", F.imageOptimizer = "NextNodeServer.imageOptimizer", F.getPagePath = "NextNodeServer.getPagePath", F.getRoutesManifest = "NextNodeServer.getRoutesManifest", F.findPageComponents = "NextNodeServer.findPageComponents", F.getFontManifest = "NextNodeServer.getFontManifest", F.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", F.getRequestHandler = "NextNodeServer.getRequestHandler", F.renderToHTML = "NextNodeServer.renderToHTML", F.renderError = "NextNodeServer.renderError", F.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", F.render404 = "NextNodeServer.render404", F.startResponse = "NextNodeServer.startResponse", F.route = "route", F.onProxyReq = "onProxyReq", F.apiResolver = "apiResolver", F.internalFetch = "internalFetch", F), eC = ((J = eC || {}).startServer = "startServer.startServer", J), eR = ((B = eR || {}).getServerSideProps = "Render.getServerSideProps", B.getStaticProps = "Render.getStaticProps", B.renderToString = "Render.renderToString", B.renderDocument = "Render.renderDocument", B.createBodyResult = "Render.createBodyResult", B), eU = ((q = eU || {}).renderToString = "AppRender.renderToString", q.renderToReadableStream = "AppRender.renderToReadableStream", q.getBodyResult = "AppRender.getBodyResult", q.fetch = "AppRender.fetch", q), ej = ((V = ej || {}).executeRoute = "Router.executeRoute", V), eD = ((G = eD || {}).runHandler = "Node.runHandler", G), eA = ((W = eA || {}).runHandler = "AppRouteRouteHandlers.runHandler", W), eZ = ((X = eZ || {}).generateMetadata = "ResolveMetadata.generateMetadata", X.generateViewport = "ResolveMetadata.generateViewport", X), eL = ((H = eL || {}).execute = "Middleware.execute", H);
      let eM = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eF = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eJ(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eB = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eq, propagation: eV, trace: eG, SpanStatusCode: eW, SpanKind: eX, ROOT_CONTEXT: eH } = t = e.r(59110);
      class eK extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eY = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eK && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eW.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eQ = /* @__PURE__ */ new Map(), e0 = t.createContextKey("next.rootSpanId"), e1 = 0, e4 = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, e6 = (i = new class e {
        getTracerInstance() {
          return eG.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eq;
        }
        getTracePropagationData() {
          let e10 = eq.active(), t10 = [];
          return eV.inject(e10, t10, e4), t10;
        }
        getActiveScopeSpan() {
          return eG.getSpan(null == eq ? void 0 : eq.active());
        }
        withPropagatedContext(e10, t10, r10, i10 = false) {
          let n10 = eq.active();
          if (i10) {
            let i11 = eV.extract(eH, e10, r10);
            if (eG.getSpanContext(i11)) return eq.with(i11, t10);
            let a11 = eV.extract(n10, e10, r10);
            return eq.with(a11, t10);
          }
          if (eG.getSpanContext(n10)) return t10();
          let a10 = eV.extract(n10, e10, r10);
          return eq.with(a10, t10);
        }
        trace(...e10) {
          let [t10, r10, i10] = e10, { fn: n10, options: a10 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: i10, options: { ...r10 } }, o10 = a10.spanName ?? t10;
          if (!eM.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return n10();
          let s10 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan());
          s10 || (s10 = (null == eq ? void 0 : eq.active()) ?? eH);
          let u10 = s10.getValue(e0), l10 = "number" != typeof u10 || !eQ.has(u10), d10 = e1++;
          return a10.attributes = { "next.span_name": o10, "next.span_type": t10, ...a10.attributes }, eq.with(s10.setValue(e0, d10), () => this.getTracerInstance().startActiveSpan(o10, a10, (e11) => {
            let r11;
            eB && t10 && eF.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let i11 = false, o11 = () => {
              !i11 && (i11 = true, eQ.delete(d10), r11 && performance.measure(`${eB}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (l10 && eQ.set(d10, new Map(Object.entries(a10.attributes ?? {}))), n10.length > 1) try {
              return n10(e11, (t11) => eY(e11, t11));
            } catch (t11) {
              throw eY(e11, t11), t11;
            } finally {
              o11();
            }
            try {
              let t11 = n10(e11);
              if (eJ(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw eY(e11, t12), t12;
              }).finally(o11);
              return e11.end(), o11(), t11;
            } catch (t11) {
              throw eY(e11, t11), o11(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, i10, n10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eM.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = i10;
            "function" == typeof e11 && "function" == typeof n10 && (e11 = e11.apply(this, arguments));
            let a10 = arguments.length - 1, o10 = arguments[a10];
            if ("function" != typeof o10) return t10.trace(r10, e11, () => n10.apply(this, arguments));
            {
              let i11 = t10.getContext().bind(eq.active(), o10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a10] = function(e13) {
                return null == t11 || t11(e13), i11.apply(this, arguments);
              }, n10.apply(this, arguments)));
            }
          } : n10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, i10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, i10);
        }
        getSpanContext(e10) {
          return e10 ? eG.setSpan(eq.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eq.active().getValue(e0);
          return eQ.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eq.active().getValue(e0), i10 = eQ.get(r10);
          i10 && !i10.has(e10) && i10.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = eG.setSpan(eq.active(), e10);
          return eq.with(r10, t10);
        }
      }(), () => i), e2 = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(e2);
      class e9 {
        constructor(e10, t10, r10, i10) {
          var n10;
          const a10 = e10 && function(e11, t11) {
            let r11 = e_.from(e11.headers);
            return { isOnDemandRevalidate: r11.get(p) === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, o10 = null == (n10 = r10.get(e2)) ? void 0 : n10.value;
          this._isEnabled = !!(!a10 && o10 && e10 && o10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = i10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: e2, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: e2, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function e3(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], i10 = new Headers();
          for (let e11 of y(r10)) i10.append("set-cookie", e11);
          for (let e11 of new ei.ResponseCookies(i10).getAll()) t10.set(e11);
        }
      }
      let e7 = ex();
      function e5(e10) {
        switch (e10.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
          case "prerender-client":
          case "validation-client":
            return e10.prerenderResumeDataCache;
          case "request":
            if (e10.prerenderResumeDataCache) return e10.prerenderResumeDataCache;
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return e10;
        }
      }
      var e8 = e.i(99734);
      class te extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), this.name = "InvariantError";
        }
      }
      var tt = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let tr = Symbol.for("@next/cache-handlers-map"), ti = Symbol.for("@next/cache-handlers-set"), tn = globalThis;
      function ta() {
        if (tn[tr]) return tn[tr].entries();
      }
      async function to(e10, t10) {
        if (!e10) return t10();
        let r10 = ts(e10);
        try {
          return await t10();
        } finally {
          var i10, n10, a10, o10;
          let t11, s10, u10, l10, d10 = (i10 = r10, n10 = ts(e10), t11 = new Set(i10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), s10 = new Set(i10.pendingRevalidateWrites), { pendingRevalidatedTags: n10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(n10.pendingRevalidates).filter(([e11]) => !(e11 in i10.pendingRevalidates))), pendingRevalidateWrites: n10.pendingRevalidateWrites.filter((e11) => !s10.has(e11)) });
          await (a10 = e10, u10 = [], (l10 = (null == (o10 = d10) ? void 0 : o10.pendingRevalidatedTags) ?? a10.pendingRevalidatedTags ?? []).length > 0 && u10.push(tu(l10, a10.incrementalCache, a10)), u10.push(...Object.values((null == o10 ? void 0 : o10.pendingRevalidates) ?? a10.pendingRevalidates ?? {})), u10.push(...(null == o10 ? void 0 : o10.pendingRevalidateWrites) ?? a10.pendingRevalidateWrites ?? []), 0 !== u10.length && Promise.all(u10).then(() => void 0));
        }
      }
      function ts(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function tu(e10, t10, r10) {
        if (0 === e10.length) return;
        let i10 = function() {
          if (tn[ti]) return tn[ti].values();
        }(), n10 = [], a10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of a10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let i11 = e11 || r11;
          a10.has(i11) || a10.set(i11, []), a10.get(i11).push(t11.tag);
        }
        for (let [e11, s10] of a10) {
          let a11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var o10;
              if (!(t11 = null == r10 || null == (o10 = r10.cacheLifeProfiles) ? void 0 : o10[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (a11 = { expire: t11.expire });
          }
          for (let t11 of i10 || []) e11 ? n10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s10, a11)) : n10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s10));
          t10 && n10.push(t10.revalidateTag(s10, a11));
        }
        await Promise.all(n10);
      }
      let tl = ex();
      class td {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new e8.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eJ(e10)) this.waitUntil || tc(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          var t10;
          this.waitUntil || tc();
          let r10 = e7.getStore();
          r10 && this.workUnitStores.add(r10);
          let i10 = tl.getStore(), n10 = i10 ? i10.rootTaskSpawnPhase : null == r10 ? void 0 : r10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let a10 = (t10 = async () => {
            try {
              await tl.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, e$ ? e$.bind(t10) : ey.bind(t10));
          this.callbackQueue.add(a10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = ew.getStore();
          if (!e10) throw Object.defineProperty(new te("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return to(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new te("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function tc() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function tf(e10) {
        let t10, r10 = { then: (i10, n10) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(i10, n10)) };
        return r10;
      }
      class tm {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function tp() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tv = Symbol.for("@next/request-context"), tg = /[^\t\x20-\x7e]/, th = /[^\t\x20-\x7e]+/g;
      function t_(e10) {
        return tg.test(e10) ? e10.replace(th, (e11) => encodeURIComponent(e11)) : e10;
      }
      async function tb(e10, t10, r10) {
        let i10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let i11 = r11.slice(0, e12).join("/");
              i11 && (i11.endsWith("/page") || i11.endsWith("/route") || (i11 = `${i11}${!i11.endsWith("/") ? "/" : ""}layout`), t12.push(i11));
            }
          }
          return t12;
        })(e10)) t11 = t_(`${_}${t11}`), i10.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = t_(`${_}${t10}`);
          i10.add(e11);
        }
        i10.has(`${_}/`) && i10.add(`${_}/index`), i10.has(`${_}/index`) && i10.add(`${_}/`);
        let n10 = Array.from(i10);
        return { tags: n10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = ta();
          if (r11) for (let [i11, n11] of r11) "getExpiration" in n11 && t11.set(i11, tf(async () => n11.getExpiration(e11)));
          return t11;
        }(n10) };
      }
      let ty = Symbol.for("NextInternalRequestMeta");
      class t$ extends ea {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tx = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tw = (e10, t10) => e6().withPropagatedContext(e10.headers, t10, tx), tk = false;
      async function tS(t10) {
        var r10, i10, n10, a10, o10;
        let s10, u10, d10, c10, f2;
        !function() {
          if (!tk && (tk = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), tw = r11(tw);
          }
        }(), await l();
        let m2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new A(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p2.searchParams.keys()]) {
          let t11 = p2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (p2.searchParams.delete(r11), t11)) p2.searchParams.append(r11, e11);
            p2.searchParams.delete(e10);
          }
        }
        let v2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (v2 = p2.buildId || "", p2.buildId = "");
        let g2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, i11] of Object.entries(e10)) for (let e11 of Array.isArray(i11) ? i11 : [i11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), h2 = g2.has("x-nextjs-data"), _2 = "1" === g2.get("rsc");
        h2 && "/index" === p2.pathname && (p2.pathname = "/");
        let b2 = /* @__PURE__ */ new Map();
        if (!m2) for (let e10 of em) {
          let t11 = g2.get(e10);
          null !== t11 && (b2.set(e10, t11), g2.delete(e10));
        }
        let y2 = p2.searchParams.get(ep), $2 = new t$({ page: t10.page, input: ((c10 = (d10 = "string" == typeof p2) ? new URL(p2) : p2).searchParams.delete(ep), d10 ? c10.toString() : c10).toString(), init: { body: t10.request.body, headers: g2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (o10 = t10.request.requestMeta, $2[ty] = o10), h2 && Object.defineProperty($2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tp() }) }));
        let x2 = t10.request.waitUntil ?? (null == (r10 = null == (f2 = globalThis[tv]) ? void 0 : f2.get()) ? void 0 : r10.waitUntil), w2 = new O({ request: $2, page: t10.page, context: x2 ? { waitUntil: x2 } : void 0 });
        if ((s10 = await tw($2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = w2.waitUntil.bind(w2), r11 = new tm();
            return e6().trace(eL.execute, { spanName: `middleware ${$2.method}`, attributes: { "http.target": $2.nextUrl.pathname, "http.method": $2.method } }, async () => {
              try {
                var i11, n11, a11, o11, s11, l10;
                let d11 = tp(), c11 = await tb("/", $2.nextUrl.pathname, null), f3 = (s11 = $2.nextUrl, l10 = (e11) => {
                  u10 = e11;
                }, function(e11, t11, r12, i12, n12, a12, o12, s12, u11, l11) {
                  function d12(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let c12 = {};
                  return { type: "request", phase: e11, implicitTags: a12, url: { pathname: i12.pathname, search: i12.search ?? "" }, rootParams: n12, get headers() {
                    return c12.headers || (c12.headers = function(e12) {
                      let t12 = e_.from(e12);
                      for (let e13 of em) t12.delete(e13);
                      return e_.seal(t12);
                    }(t11.headers)), c12.headers;
                  }, get cookies() {
                    if (!c12.cookies) {
                      let e12 = new ei.RequestCookies(e_.from(t11.headers));
                      e3(t11, e12), c12.cookies = eS.seal(e12);
                    }
                    return c12.cookies;
                  }, set cookies(value) {
                    c12.cookies = value;
                  }, get mutableCookies() {
                    if (!c12.mutableCookies) {
                      var f4, m4;
                      let e12, i13 = (f4 = t11.headers, m4 = o12 || (r12 ? d12 : void 0), e12 = new ei.RequestCookies(e_.from(f4)), eO.wrap(e12, m4));
                      e3(t11, i13), c12.mutableCookies = i13;
                    }
                    return c12.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!c12.userspaceMutableCookies) {
                      var p3;
                      let e12;
                      p3 = this, c12.userspaceMutableCookies = e12 = new Proxy(p3.mutableCookies, { get(t12, r13, i13) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return eE(p3, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return eE(p3, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return eo.get(t12, r13, i13);
                        }
                      } });
                    }
                    return c12.userspaceMutableCookies;
                  }, get draftMode() {
                    return c12.draftMode || (c12.draftMode = new e9(s12, t11, this.cookies, this.mutableCookies)), c12.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: u11, serverComponentsHmrCache: l11 || globalThis.__serverComponentsHmrCache, fallbackParams: null };
                }("action", $2, void 0, s11, {}, c11, l10, d11, false, void 0)), m3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: i12, deploymentId: n12, previouslyRevalidatedTags: a12, nonce: o12 }) {
                  let s12 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, u11 = s12 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), l11 = { isStaticGeneration: s12, page: e11, route: eg(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: i12, deploymentId: n12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o12, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: i13 } = e12;
                    return new td({ waitUntil: t12, onClose: r13, onTaskError: i13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, previouslyRevalidatedTags: a12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = ta();
                    if (t12) for (let [r13, i13] of t12) "refreshTags" in i13 && e12.set(r13, tf(async () => i13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: e$ ? e$.snapshot() : function(e12, ...t12) {
                    return e12(...t12);
                  }, shouldTrackFetchMetrics: u11, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = l11, l11;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (n11 = t10.request.nextConfig) || null == (i11 = n11.experimental) ? void 0 : i11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (o11 = t10.request.nextConfig) || null == (a11 = o11.experimental) ? void 0 : a11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === $2.headers.get(ef), buildId: v2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] });
                return await ew.run(m3, () => e7.run(f3, t10.handler, $2, w2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler($2, w2);
        })) && !(s10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        s10 && u10 && s10.headers.set("set-cookie", u10);
        let k2 = null == s10 ? void 0 : s10.headers.get("x-middleware-rewrite");
        if (s10 && k2 && (_2 || !m2)) {
          let e10 = new A(k2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          m2 || e10.host !== $2.nextUrl.host || (e10.buildId = v2 || e10.buildId, s10.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: o11 } = ec(e10.toString(), p2.toString());
          !m2 && h2 && s10.headers.set("x-nextjs-rewrite", r11);
          let u11 = !o11 && (null == (a10 = t10.request.nextConfig) || null == (n10 = a10.experimental) || null == (i10 = n10.clientParamParsingOrigins) ? void 0 : i10.some((t11) => new RegExp(t11).test(e10.origin)));
          _2 && (o11 || u11) && (p2.pathname !== e10.pathname && s10.headers.set("x-nextjs-rewritten-path", e10.pathname), p2.search !== e10.search && s10.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (s10 && k2 && _2 && y2) {
          let e10 = new URL(k2);
          e10.searchParams.has(ep) || (e10.searchParams.set(ep, y2), s10.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let I2 = null == s10 ? void 0 : s10.headers.get("Location");
        if (s10 && I2 && !m2) {
          let e10 = new A(I2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          s10 = new Response(s10.body, s10), e10.host === p2.host && (e10.buildId = v2 || e10.buildId, s10.headers.set("Location", ec(e10, p2).url)), h2 && (s10.headers.delete("Location"), s10.headers.set("x-nextjs-redirect", ec(e10.toString(), p2.toString()).url));
        }
        let E2 = s10 || ed.next(), P2 = E2.headers.get("x-middleware-override-headers"), T2 = [];
        if (P2) {
          for (let [e10, t11] of b2) E2.headers.set(`x-middleware-request-${e10}`, t11), T2.push(e10);
          T2.length > 0 && E2.headers.set("x-middleware-override-headers", P2 + "," + T2.join(","));
        }
        return { response: E2, waitUntil: ("internal" === w2[S].kind ? Promise.all(w2[S].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: $2.fetchMetrics };
      }
      class tI {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r10, i10) => {
            e10 = r10, t10 = i10;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class tO {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class tE {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class tP {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new tE(), this.tail = new tE(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10)) ?? 1;
          if (r10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let i10 = this.cache.get(e10);
          if (i10) i10.data = t10, this.totalSize = this.totalSize - i10.size + r10, i10.size = r10, this.moveToHead(i10);
          else {
            let i11 = new tO(e10, t10, r10);
            this.cache.set(e10, i11), this.addToHead(i11), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: tT, stdout: tN } = (null == (Q = globalThis) ? void 0 : Q.process) ?? {}, tz = tT && !tT.NO_COLOR && (tT.FORCE_COLOR || (null == tN ? void 0 : tN.isTTY) && !tT.CI && "dumb" !== tT.TERM), tC = (e10, t10, r10, i10) => {
        let n10 = e10.substring(0, i10) + r10, a10 = e10.substring(i10 + t10.length), o10 = a10.indexOf(t10);
        return ~o10 ? n10 + tC(a10, t10, r10, o10) : n10 + a10;
      }, tR = (e10, t10, r10 = e10) => tz ? (i10) => {
        let n10 = "" + i10, a10 = n10.indexOf(t10, e10.length);
        return ~a10 ? e10 + tC(n10, t10, r10, a10) + t10 : e10 + n10 + t10;
      } : String, tU = tR("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      tR("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), tR("\x1B[3m", "\x1B[23m"), tR("\x1B[4m", "\x1B[24m"), tR("\x1B[7m", "\x1B[27m"), tR("\x1B[8m", "\x1B[28m"), tR("\x1B[9m", "\x1B[29m"), tR("\x1B[30m", "\x1B[39m");
      let tj = tR("\x1B[31m", "\x1B[39m"), tD = tR("\x1B[32m", "\x1B[39m"), tA = tR("\x1B[33m", "\x1B[39m");
      tR("\x1B[34m", "\x1B[39m");
      let tZ = tR("\x1B[35m", "\x1B[39m");
      tR("\x1B[38;2;173;127;168m", "\x1B[39m"), tR("\x1B[36m", "\x1B[39m");
      let tL = tR("\x1B[37m", "\x1B[39m");
      tR("\x1B[90m", "\x1B[39m"), tR("\x1B[40m", "\x1B[49m"), tR("\x1B[41m", "\x1B[49m"), tR("\x1B[42m", "\x1B[49m"), tR("\x1B[43m", "\x1B[49m"), tR("\x1B[44m", "\x1B[49m"), tR("\x1B[45m", "\x1B[49m"), tR("\x1B[46m", "\x1B[49m"), tR("\x1B[47m", "\x1B[49m"), tL(tU("\u25CB")), tj(tU("\u2A2F")), tA(tU("\u26A0")), tL(tU(" ")), tD(tU("\u2713")), tZ(tU("\xBB")), new tP(1e4, (e10) => e10.length), new tP(1e4, (e10) => e10.length);
      var tM = ((K = {}).APP_PAGE = "APP_PAGE", K.APP_ROUTE = "APP_ROUTE", K.PAGES = "PAGES", K.FETCH = "FETCH", K.REDIRECT = "REDIRECT", K.IMAGE = "IMAGE", K), tF = ((Y = {}).APP_PAGE = "APP_PAGE", Y.APP_ROUTE = "APP_ROUTE", Y.PAGES = "PAGES", Y.FETCH = "FETCH", Y.IMAGE = "IMAGE", Y);
      function tJ() {
      }
      new TextEncoder();
      let tB = new TextEncoder();
      function tq(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tB.encode(e10)), t10.close();
        } });
      }
      function tV(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tG(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), i10 = "";
        for await (let n10 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return i10;
          i10 += r10.decode(n10, { stream: true });
        }
        return i10 + r10.decode();
      }
      let tW = "ResponseAborted";
      class tX extends Error {
        constructor(...e10) {
          super(...e10), this.name = tW;
        }
      }
      let tH = 0, tK = 0, tY = 0;
      function tQ(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === tW;
      }
      async function t0(e10, t10, r10) {
        try {
          let i10, { errored: n10, destroyed: a10 } = t10;
          if (n10 || a10) return;
          let o10 = (i10 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || i10.abort(new tX());
          }), i10), s10 = function(e11, t11) {
            let r11 = false, i11 = new tI();
            function n11() {
              i11.resolve();
            }
            e11.on("drain", n11), e11.once("close", () => {
              e11.off("drain", n11), i11.resolve();
            });
            let a11 = new tI();
            return e11.once("finish", () => {
              a11.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r11) {
                if (r11 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                  let e12 = function(e13 = {}) {
                    let t13 = 0 === tH ? void 0 : { clientComponentLoadStart: tH, clientComponentLoadTimes: tK, clientComponentLoadCount: tY };
                    return e13.reset && (tH = 0, tK = 0, tY = 0), t13;
                  }();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), e6().trace(ez.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await i11.promise, i11 = new tI());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), a11.promise;
            } });
          }(t10, r10);
          await e10.pipeTo(s10, { signal: o10.signal });
        } catch (e11) {
          if (tQ(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      class t1 {
        static #e = this.EMPTY = new t1(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new t1(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: i10 }) {
          this.response = e10, this.contentType = t10, this.metadata = i10, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new te("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return tG(this.readable);
          }
          return this.response;
        }
        get readable() {
          return null === this.response ? new ReadableStream({ start(e10) {
            e10.close();
          } }) : "string" == typeof this.response ? tq(this.response) : tt.Buffer.isBuffer(this.response) ? tV(this.response) : Array.isArray(this.response) ? function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), i10 = e10[0].pipeTo(r10, { preventClose: true }), n10 = 1;
            for (; n10 < e10.length - 1; n10++) {
              let t11 = e10[n10];
              i10 = i10.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let a10 = e10[n10];
            return (i10 = i10.then(() => a10.pipeTo(r10))).catch(tJ), t10;
          }(...this.response) : this.response;
        }
        coerce() {
          return null === this.response ? [] : "string" == typeof this.response ? [tq(this.response)] : Array.isArray(this.response) ? this.response : tt.Buffer.isBuffer(this.response) ? [tV(this.response)] : [this.response];
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (tQ(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          await t0(this.readable, e10, this.waitUntil);
        }
      }
      function t4(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      t4(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), t4(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var t6 = e.i(68886);
      let t2 = /* @__PURE__ */ new Map(), t9 = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = t2.get(r10), i10 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof i10 && i10 <= Date.now() && i10 > t10) return true;
        }
        return false;
      }, t3 = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = t2.get(r10), i10 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof i10 && i10 > t10) return true;
        }
        return false;
      };
      class t7 {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(t6.default.dirname(e10)), i10 = r10[1].then(() => this.fs.writeFile(e10, t10));
          i10.catch(() => {
          }), r10[2].push(i10);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function t5(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class t8 {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? t8.memoryCache ? t8.debug && console.log("FileSystemCache: memory store already initialized") : (t8.debug && console.log("FileSystemCache: using memory store for fetch cache"), t8.memoryCache = function(e11) {
            return r || (r = new tP(e11, function({ value: e12 }) {
              var t10, r10;
              if (!e12) return 25;
              if (e12.kind === tM.REDIRECT) return JSON.stringify(e12.props).length;
              if (e12.kind === tM.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              if (e12.kind === tM.FETCH) return JSON.stringify(e12.data || "").length;
              if (e12.kind === tM.APP_ROUTE) return e12.body.length;
              return e12.kind === tM.APP_PAGE ? Math.max(1, e12.html.length + t5(e12.rscData) + ((null == (r10 = e12.postponed) ? void 0 : r10.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r11, i10] of e13) t11 += r11.length + t5(i10);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (t10 = JSON.stringify(e12.pageData)) ? void 0 : t10.length) || 0);
            })), r;
          }(e10.maxMemoryCacheSize)) : t8.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, t8.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let i10 of e10) {
            let e11 = t2.get(i10) || {};
            if (t10) {
              let n10 = { ...e11 };
              n10.stale = r10, void 0 !== t10.expire && (n10.expired = r10 + 1e3 * t10.expire), t2.set(i10, n10);
            } else t2.set(i10, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, i10, n10, a10, o10;
          let [s10, u10] = e10, { kind: l10 } = u10, d10 = null == (t10 = t8.memoryCache) ? void 0 : t10.get(s10);
          if (t8.debug && (l10 === tF.FETCH ? console.log("FileSystemCache: get", s10, u10.tags, l10, !!d10) : console.log("FileSystemCache: get", s10, l10, !!d10)), (null == d10 || null == (r10 = d10.value) ? void 0 : r10.kind) === tM.APP_PAGE || (null == d10 || null == (i10 = d10.value) ? void 0 : i10.kind) === tM.APP_ROUTE || (null == d10 || null == (n10 = d10.value) ? void 0 : n10.kind) === tM.PAGES) {
            let e11 = null == (o10 = d10.value.headers) ? void 0 : o10[g];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && t9(t11, d10.lastModified)) return t8.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == d10 || null == (a10 = d10.value) ? void 0 : a10.kind) === tM.FETCH) {
            let e11 = u10.kind === tF.FETCH ? [...u10.tags || [], ...u10.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return t8.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (t9(e11, d10.lastModified)) return t8.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return d10 ?? null;
        }
        async set(e10, t10, r10) {
          var i10;
          if (null == (i10 = t8.memoryCache) || i10.set(e10, { value: t10, lastModified: Date.now() }), t8.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let n10 = new t7(this.fs);
          if (t10.kind === tM.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, tF.APP_ROUTE);
            n10.append(r11, t10.body);
            let i11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            n10.append(r11.replace(/\.body$/, v), JSON.stringify(i11, null, 2));
          } else if (t10.kind === tM.PAGES || t10.kind === tM.APP_PAGE) {
            let i11 = t10.kind === tM.APP_PAGE, a10 = this.getFilePath(`${e10}.html`, i11 ? tF.APP_PAGE : tF.PAGES);
            if (n10.append(a10, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || n10.append(this.getFilePath(`${e10}${i11 ? ".rsc" : ".json"}`, i11 ? tF.APP_PAGE : tF.PAGES), i11 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === tM.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = a10.replace(/\.html$/, ".segments");
                for (let [i12, a11] of t10.segmentData) {
                  e11.push(i12);
                  let t11 = r12 + i12 + ".segment.rsc";
                  n10.append(t11, a11);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              n10.append(a10.replace(/\.html$/, v), JSON.stringify(r11));
            }
          } else if (t10.kind === tM.FETCH) {
            let i11 = this.getFilePath(e10, tF.FETCH);
            n10.append(i11, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await n10.wait();
        }
        getFilePath(e10, t10) {
          switch (t10) {
            case tF.FETCH:
              return t6.default.join(this.serverDistDir, "..", "cache", "fetch-cache", e10);
            case tF.PAGES:
              return t6.default.join(this.serverDistDir, "pages", e10);
            case tF.IMAGE:
            case tF.APP_PAGE:
            case tF.APP_ROUTE:
              return t6.default.join(this.serverDistDir, "app", e10);
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
        }
      }
      let re = ["(..)(..)", "(.)", "(..)", "(...)"], rt = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, rr = /\/\[[^/]+\](?=\/|$)/;
      function ri(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class rn {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = rn.cacheControls.get(e10);
          if (t10) return t10;
          let r10 = this.prerenderManifest.routes[e10];
          if (r10) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let i10 = this.prerenderManifest.dynamicRoutes[e10];
          if (i10) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = i10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          rn.cacheControls.set(e10, t10);
        }
        clear() {
          rn.cacheControls.clear();
        }
      }
      e.i(67914);
      class ra {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: i10, serverDistDir: n10, requestHeaders: a10, maxMemoryCacheSize: o10, getPrerenderManifest: s10, fetchCacheKeyPrefix: u10, CurCacheHandler: l10, allowedRevalidateHeaderKeys: d10 }) {
          var c10, f2, m2, v2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!l10;
          const g2 = Symbol.for("@next/cache-handlers"), _2 = globalThis;
          if (l10) ra.debug && console.log("IncrementalCache: using custom cache handler", l10.name);
          else {
            const t11 = _2[g2];
            (null == t11 ? void 0 : t11.FetchCache) ? (l10 = t11.FetchCache, ra.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && n10 && (ra.debug && console.log("IncrementalCache: using filesystem cache handler"), l10 = t8);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (o10 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = i10, this.requestHeaders = a10, this.allowedRevalidateHeaderKeys = d10, this.prerenderManifest = s10(), this.cacheControls = new rn(this.prerenderManifest), this.fetchCacheKeyPrefix = u10;
          let b2 = [];
          a10[p] === (null == (f2 = this.prerenderManifest) || null == (c10 = f2.preview) ? void 0 : c10.previewModeId) && (this.isOnDemandRevalidate = true), i10 && (b2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[h] && e11["x-next-revalidate-tag-token"] === t11 ? e11[h].split(",") : [];
          }(a10, null == (v2 = this.prerenderManifest) || null == (m2 = v2.preview) ? void 0 : m2.previewModeId)), l10 && (this.cacheHandler = new l10({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: n10, revalidatedTags: b2, maxMemoryCacheSize: o10, _requestHeaders: a10, fetchCacheKeyPrefix: u10 }));
        }
        calculateRevalidate(e10, t10, r10, i10) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let n10 = this.cacheControls.get(ri(e10)), a10 = n10 ? n10.revalidate : !i10 && 1;
          return "number" == typeof a10 ? 1e3 * a10 + t10 : a10;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => re.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r10, i10;
              for (let n10 of e12.split("/")) if (r10 = re.find((e13) => n10.startsWith(e13))) {
                [t12, i10] = e12.split(r10, 2);
                break;
              }
              if (!t12 || !r10 || !i10) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = eg(t12), r10) {
                case "(.)":
                  i10 = "/" === t12 ? `/${i10}` : t12 + "/" + i10;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  i10 = t12.split("/").slice(0, -1).concat(i10).join("/");
                  break;
                case "(...)":
                  i10 = "/" + i10;
                  break;
                case "(..)(..)":
                  let n10 = t12.split("/");
                  if (n10.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  i10 = n10.slice(0, -2).concat(i10).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: i10 };
            }(e11).interceptedRoute), t11) ? rr.test(e11) : rt.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : ev(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (ra.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = new tI();
          return ra.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], i10 = new TextEncoder(), n10 = new TextDecoder();
          if (t10.body) if (t10.body instanceof Uint8Array) r10.push(n10.decode(t10.body)), t10._ogBody = t10.body;
          else if ("function" == typeof t10.body.getReader) {
            let e11 = t10.body, a11 = [];
            try {
              await e11.pipeTo(new WritableStream({ write(e12) {
                "string" == typeof e12 ? (a11.push(i10.encode(e12)), r10.push(e12)) : (a11.push(e12), r10.push(n10.decode(e12, { stream: true })));
              } })), r10.push(n10.decode());
              let o11 = a11.reduce((e12, t11) => e12 + t11.length, 0), s11 = new Uint8Array(o11), u10 = 0;
              for (let e12 of a11) s11.set(e12, u10), u10 += e12.length;
              t10._ogBody = s11;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof t10.body.keys) {
            let e11 = t10.body;
            for (let i11 of (t10._ogBody = t10.body, /* @__PURE__ */ new Set([...e11.keys()]))) {
              let t11 = e11.getAll(i11);
              r10.push(`${i11}=${(await Promise.all(t11.map(async (e12) => "string" == typeof e12 ? e12 : await e12.text()))).join(",")}`);
            }
          } else if ("function" == typeof t10.body.arrayBuffer) {
            let e11 = t10.body, i11 = await e11.arrayBuffer();
            r10.push(await e11.text()), t10._ogBody = new Blob([i11], { type: e11.type });
          } else "string" == typeof t10.body && (r10.push(t10.body), t10._ogBody = t10.body);
          let a10 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          "traceparent" in a10 && delete a10.traceparent, "tracestate" in a10 && delete a10.tracestate;
          let o10 = JSON.stringify(["v3", this.fetchCacheKeyPrefix || "", e10, t10.method, a10, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]);
          {
            var s10;
            let e11 = i10.encode(o10);
            return s10 = await crypto.subtle.digest("SHA-256", e11), Array.prototype.map.call(new Uint8Array(s10), (e12) => e12.toString(16).padStart(2, "0")).join("");
          }
        }
        async get(e10, t10) {
          var r10, i10, n10, a10, o10, s10, u10;
          let l10, d10;
          if (t10.kind === tF.FETCH) {
            let r11 = e7.getStore(), i11 = r11 ? function(e11) {
              switch (e11.type) {
                case "request":
                case "prerender":
                case "prerender-runtime":
                case "prerender-client":
                case "validation-client":
                  if (e11.renderResumeDataCache) return e11.renderResumeDataCache;
                case "prerender-ppr":
                  return e11.prerenderResumeDataCache ?? null;
                case "cache":
                case "private-cache":
                case "unstable-cache":
                case "prerender-legacy":
                case "generate-static-params":
                  return null;
                default:
                  return e11;
              }
            }(r11) : null;
            if (i11) {
              let r12 = i11.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === tM.FETCH) {
                let i12 = ew.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == i12 || null == (r13 = i12.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return ra.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                ra.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else ra.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else ra.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== tF.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === tF.FETCH);
          let c10 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(e10, t10));
          if (t10.kind === tF.FETCH) {
            if (!c10) return null;
            if ((null == (n10 = c10.value) ? void 0 : n10.kind) !== tM.FETCH) throw Object.defineProperty(new te(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (a10 = c10.value) ? void 0 : a10.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r11 = ew.getStore(), i11 = [...t10.tags || [], ...t10.softTags || []];
            if (i11.some((e11) => {
              var t11, i12;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (i12 = r11.pendingRevalidatedTags) ? void 0 : i12.some((t12) => t12.tag === e11));
            })) return ra.debug && console.log("IncrementalCache: expired tag", e10), null;
            let o11 = e7.getStore();
            if (o11) {
              let t11 = e5(o11);
              t11 && (ra.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, c10.value));
            }
            let s11 = t10.revalidate || c10.value.revalidate, u11 = (performance.timeOrigin + performance.now() - (c10.lastModified || 0)) / 1e3 > s11, l11 = c10.value.data;
            return t9(i11, c10.lastModified) ? null : (t3(i11, c10.lastModified) && (u11 = true), { isStale: u11, value: { kind: tM.FETCH, data: l11, revalidate: s11 } });
          }
          if ((null == c10 || null == (i10 = c10.value) ? void 0 : i10.kind) === tM.FETCH) throw Object.defineProperty(new te(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let f2 = null, { isFallback: m2 } = t10, p2 = this.cacheControls.get(ri(e10));
          if ((null == c10 ? void 0 : c10.lastModified) === -1) l10 = -1, d10 = -31536e6;
          else {
            let r11 = performance.timeOrigin + performance.now(), i11 = (null == c10 ? void 0 : c10.lastModified) || r11;
            if (void 0 === (l10 = false !== (d10 = this.calculateRevalidate(e10, i11, this.dev ?? false, t10.isFallback)) && d10 < r11 || void 0) && ((null == c10 || null == (o10 = c10.value) ? void 0 : o10.kind) === tM.APP_PAGE || (null == c10 || null == (s10 = c10.value) ? void 0 : s10.kind) === tM.APP_ROUTE)) {
              let e11 = null == (u10 = c10.value.headers) ? void 0 : u10[g];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (t9(t11, i11) ? l10 = -1 : t3(t11, i11) && (l10 = true));
              }
            }
          }
          return c10 && (f2 = { isStale: l10, cacheControl: p2, revalidateAfter: d10, value: c10.value, isFallback: m2 }), !c10 && this.prerenderManifest.notFoundRoutes.includes(e10) && (f2 = { isStale: l10, value: null, cacheControl: p2, revalidateAfter: d10, isFallback: m2 }, this.set(e10, f2.value, { ...t10, cacheControl: p2 })), f2;
        }
        async set(e10, t10, r10) {
          if ((null == t10 ? void 0 : t10.kind) === tM.FETCH) {
            let r11 = e7.getStore(), i11 = r11 ? e5(r11) : null;
            i11 && (ra.debug && console.log("IncrementalCache: rdc:set", e10), i11.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          e10 = this._getPathname(e10, r10.fetchCache);
          let i10 = JSON.stringify(t10).length;
          if (r10.fetchCache && i10 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${i10} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var n10;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(ri(e10), r10.cacheControl), await (null == (n10 = this.cacheHandler) ? void 0 : n10.set(e10, t10, r10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      if (e.i(64445), e.i(40049).default.unstable_postpone, false === ("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("needs to bail out of prerendering at this point because it used") && "Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]");
      let ro = Object.freeze({ status: "aborted" });
      function rs(e10, t10, r10) {
        function i10(r11, i11) {
          if (r11._zod || Object.defineProperty(r11, "_zod", { value: { def: i11, constr: o10, traits: /* @__PURE__ */ new Set() }, enumerable: false }), r11._zod.traits.has(e10)) return;
          r11._zod.traits.add(e10), t10(r11, i11);
          let n11 = o10.prototype, a11 = Object.keys(n11);
          for (let e11 = 0; e11 < a11.length; e11++) {
            let t11 = a11[e11];
            t11 in r11 || (r11[t11] = n11[t11].bind(r11));
          }
        }
        let n10 = r10?.Parent ?? Object;
        class a10 extends n10 {
        }
        function o10(e11) {
          var t11;
          let n11 = r10?.Parent ? new a10() : this;
          for (let r11 of (i10(n11, e11), (t11 = n11._zod).deferred ?? (t11.deferred = []), n11._zod.deferred)) r11();
          return n11;
        }
        return Object.defineProperty(a10, "name", { value: e10 }), Object.defineProperty(o10, "init", { value: i10 }), Object.defineProperty(o10, Symbol.hasInstance, { value: (t11) => !!r10?.Parent && t11 instanceof r10.Parent || t11?._zod?.traits?.has(e10) }), Object.defineProperty(o10, "name", { value: e10 }), o10;
      }
      let ru = Symbol("zod_brand");
      class rl extends Error {
        constructor() {
          super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
        }
      }
      class rd extends Error {
        constructor(e10) {
          super(`Encountered unidirectional transform during encode: ${e10}`), this.name = "ZodEncodeError";
        }
      }
      (ee = globalThis).__zod_globalConfig ?? (ee.__zod_globalConfig = {});
      let rc = globalThis.__zod_globalConfig;
      function rf(e10) {
        return e10 && Object.assign(rc, e10), rc;
      }
      function rm(e10) {
        let t10 = Object.values(e10).filter((e11) => "number" == typeof e11);
        return Object.entries(e10).filter(([e11, r10]) => -1 === t10.indexOf(+e11)).map(([e11, t11]) => t11);
      }
      function rp(e10, t10 = "|") {
        return e10.map((e11) => rj(e11)).join(t10);
      }
      function rv(e10, t10) {
        return "bigint" == typeof t10 ? t10.toString() : t10;
      }
      function rg(e10) {
        return { get value() {
          {
            let t10 = e10();
            return Object.defineProperty(this, "value", { value: t10 }), t10;
          }
        } };
      }
      function rh(e10) {
        return null == e10;
      }
      function r_(e10) {
        let t10 = +!!e10.startsWith("^"), r10 = e10.endsWith("$") ? e10.length - 1 : e10.length;
        return e10.slice(t10, r10);
      }
      function rb(e10, t10) {
        let r10 = e10 / t10, i10 = Math.round(r10), n10 = Number.EPSILON * Math.max(Math.abs(r10), 1);
        return Math.abs(r10 - i10) < n10 ? 0 : r10 - i10;
      }
      e.s(["$ZodAsyncError", 0, rl, "$ZodEncodeError", 0, rd, "$brand", 0, ru, "$constructor", 0, rs, "NEVER", 0, ro, "config", 0, rf, "globalConfig", 0, rc], 33624);
      let ry = Symbol("evaluating");
      function r$(e10, t10, r10) {
        let i10;
        Object.defineProperty(e10, t10, { get() {
          if (i10 !== ry) return void 0 === i10 && (i10 = ry, i10 = r10()), i10;
        }, set(r11) {
          Object.defineProperty(e10, t10, { value: r11 });
        }, configurable: true });
      }
      function rx(e10, t10, r10) {
        Object.defineProperty(e10, t10, { value: r10, writable: true, enumerable: true, configurable: true });
      }
      function rw(...e10) {
        let t10 = {};
        for (let r10 of e10) Object.assign(t10, Object.getOwnPropertyDescriptors(r10));
        return Object.defineProperties({}, t10);
      }
      function rk(e10) {
        return JSON.stringify(e10);
      }
      function rS(e10) {
        return e10.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
      }
      let rI = "captureStackTrace" in Error ? Error.captureStackTrace : (...e10) => {
      };
      function rO(e10) {
        return "object" == typeof e10 && null !== e10 && !Array.isArray(e10);
      }
      let rE = rg(() => {
        if (rc.jitless || "u" > typeof navigator && navigator?.userAgent?.includes("Cloudflare")) return false;
        try {
          return Function(""), true;
        } catch (e10) {
          return false;
        }
      });
      function rP(e10) {
        if (false === rO(e10)) return false;
        let t10 = e10.constructor;
        if (void 0 === t10 || "function" != typeof t10) return true;
        let r10 = t10.prototype;
        return false !== rO(r10) && false !== Object.prototype.hasOwnProperty.call(r10, "isPrototypeOf");
      }
      function rT(e10) {
        return rP(e10) ? { ...e10 } : Array.isArray(e10) ? [...e10] : e10 instanceof Map ? new Map(e10) : e10 instanceof Set ? new Set(e10) : e10;
      }
      let rN = /* @__PURE__ */ new Set(["string", "number", "symbol"]), rz = /* @__PURE__ */ new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
      function rC(e10) {
        return e10.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function rR(e10, t10, r10) {
        let i10 = new e10._zod.constr(t10 ?? e10._zod.def);
        return (!t10 || r10?.parent) && (i10._zod.parent = e10), i10;
      }
      function rU(e10) {
        if (!e10) return {};
        if ("string" == typeof e10) return { error: () => e10 };
        if (e10?.message !== void 0) {
          if (e10?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
          e10.error = e10.message;
        }
        return (delete e10.message, "string" == typeof e10.error) ? { ...e10, error: () => e10.error } : e10;
      }
      function rj(e10) {
        return "bigint" == typeof e10 ? e10.toString() + "n" : "string" == typeof e10 ? `"${e10}"` : `${e10}`;
      }
      function rD(e10) {
        return Object.keys(e10).filter((t10) => "optional" === e10[t10]._zod.optin && "optional" === e10[t10]._zod.optout);
      }
      let rA = { safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], int32: [-2147483648, 2147483647], uint32: [0, 4294967295], float32: [-34028234663852886e22, 34028234663852886e22], float64: [-Number.MAX_VALUE, Number.MAX_VALUE] }, rZ = { int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")], uint64: [BigInt(0), BigInt("18446744073709551615")] };
      function rL(e10, t10 = 0) {
        if (true === e10.aborted) return true;
        for (let r10 = t10; r10 < e10.issues.length; r10++) if (e10.issues[r10]?.continue !== true) return true;
        return false;
      }
      function rM(e10, t10 = 0) {
        if (true === e10.aborted) return true;
        for (let r10 = t10; r10 < e10.issues.length; r10++) if (e10.issues[r10]?.continue === false) return true;
        return false;
      }
      function rF(e10, t10) {
        return t10.map((t11) => (t11.path ?? (t11.path = []), t11.path.unshift(e10), t11));
      }
      function rJ(e10) {
        return "string" == typeof e10 ? e10 : e10?.message;
      }
      function rB(e10, t10, r10) {
        let i10 = e10.message ? e10.message : rJ(e10.inst?._zod.def?.error?.(e10)) ?? rJ(t10?.error?.(e10)) ?? rJ(r10.customError?.(e10)) ?? rJ(r10.localeError?.(e10)) ?? "Invalid input", { inst: n10, continue: a10, input: o10, ...s10 } = e10;
        return s10.path ?? (s10.path = []), s10.message = i10, t10?.reportInput && (s10.input = o10), s10;
      }
      function rq(e10) {
        return e10 instanceof Set ? "set" : e10 instanceof Map ? "map" : e10 instanceof File ? "file" : "unknown";
      }
      function rV(e10) {
        return Array.isArray(e10) ? "array" : "string" == typeof e10 ? "string" : "unknown";
      }
      function rG(e10) {
        let t10 = typeof e10;
        switch (t10) {
          case "number":
            return Number.isNaN(e10) ? "nan" : "number";
          case "object":
            if (null === e10) return "null";
            if (Array.isArray(e10)) return "array";
            if (e10 && Object.getPrototypeOf(e10) !== Object.prototype && "constructor" in e10 && e10.constructor) return e10.constructor.name;
        }
        return t10;
      }
      function rW(...e10) {
        let [t10, r10, i10] = e10;
        return "string" == typeof t10 ? { message: t10, code: "custom", input: r10, inst: i10 } : { ...t10 };
      }
      function rX(e10) {
        let t10 = atob(e10), r10 = new Uint8Array(t10.length);
        for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
        return r10;
      }
      function rH(e10) {
        let t10 = "";
        for (let r10 = 0; r10 < e10.length; r10++) t10 += String.fromCharCode(e10[r10]);
        return btoa(t10);
      }
      function rK() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "characters", verb: "to have" }, file: { unit: "bytes", verb: "to have" }, array: { unit: "items", verb: "to have" }, set: { unit: "items", verb: "to have" }, map: { unit: "entries", verb: "to have" } }, t10 = { regex: "input", email: "email address", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datetime", date: "ISO date", time: "ISO time", duration: "ISO duration", ipv4: "IPv4 address", ipv6: "IPv6 address", mac: "MAC address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded string", base64url: "base64url-encoded string", json_string: "JSON string", e164: "E.164 number", jwt: "JWT", template_literal: "input" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              return `Invalid input: expected ${e11}, received ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Invalid input: expected ${rj(i10.values[0])}`;
              return `Invalid option: expected one of ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Too big: expected ${i10.origin ?? "value"} to have ${t11}${i10.maximum.toString()} ${r11.unit ?? "elements"}`;
              return `Too big: expected ${i10.origin ?? "value"} to be ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Too small: expected ${i10.origin} to have ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Too small: expected ${i10.origin} to be ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Invalid string: must start with "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Invalid string: must end with "${i10.suffix}"`;
              if ("includes" === i10.format) return `Invalid string: must include "${i10.includes}"`;
              if ("regex" === i10.format) return `Invalid string: must match pattern ${i10.pattern}`;
              return `Invalid ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Invalid number: must be a multiple of ${i10.divisor}`;
            case "unrecognized_keys":
              return `Unrecognized key${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Invalid key in ${i10.origin}`;
            case "invalid_union":
              if (i10.options && Array.isArray(i10.options) && i10.options.length > 0) {
                let e11 = i10.options.map((e12) => `'${e12}'`).join(" | ");
                return `Invalid discriminator value. Expected ${e11}`;
              }
              return "Invalid input";
            case "invalid_element":
              return `Invalid value in ${i10.origin}`;
            default:
              return "Invalid input";
          }
        }) };
      }
      e.s(["BIGINT_FORMAT_RANGES", 0, rZ, "Class", 0, class {
        constructor(...e10) {
        }
      }, "NUMBER_FORMAT_RANGES", 0, rA, "aborted", 0, rL, "allowsEval", 0, rE, "assert", 0, function(e10) {
      }, "assertEqual", 0, function(e10) {
        return e10;
      }, "assertIs", 0, function(e10) {
      }, "assertNever", 0, function(e10) {
        throw Error("Unexpected value in exhaustive check");
      }, "assertNotEqual", 0, function(e10) {
        return e10;
      }, "assignProp", 0, rx, "base64ToUint8Array", 0, rX, "base64urlToUint8Array", 0, function(e10) {
        let t10 = e10.replace(/-/g, "+").replace(/_/g, "/"), r10 = "=".repeat((4 - t10.length % 4) % 4);
        return rX(t10 + r10);
      }, "cached", 0, rg, "captureStackTrace", 0, rI, "cleanEnum", 0, function(e10) {
        return Object.entries(e10).filter(([e11, t10]) => Number.isNaN(Number.parseInt(e11, 10))).map((e11) => e11[1]);
      }, "cleanRegex", 0, r_, "clone", 0, rR, "cloneDef", 0, function(e10) {
        return rw(e10._zod.def);
      }, "createTransparentProxy", 0, function(e10) {
        let t10;
        return new Proxy({}, { get: (r10, i10, n10) => (t10 ?? (t10 = e10()), Reflect.get(t10, i10, n10)), set: (r10, i10, n10, a10) => (t10 ?? (t10 = e10()), Reflect.set(t10, i10, n10, a10)), has: (r10, i10) => (t10 ?? (t10 = e10()), Reflect.has(t10, i10)), deleteProperty: (r10, i10) => (t10 ?? (t10 = e10()), Reflect.deleteProperty(t10, i10)), ownKeys: (r10) => (t10 ?? (t10 = e10()), Reflect.ownKeys(t10)), getOwnPropertyDescriptor: (r10, i10) => (t10 ?? (t10 = e10()), Reflect.getOwnPropertyDescriptor(t10, i10)), defineProperty: (r10, i10, n10) => (t10 ?? (t10 = e10()), Reflect.defineProperty(t10, i10, n10)) });
      }, "defineLazy", 0, r$, "esc", 0, rk, "escapeRegex", 0, rC, "explicitlyAborted", 0, rM, "extend", 0, function(e10, t10) {
        if (!rP(t10)) throw Error("Invalid input to extend: expected a plain object");
        let r10 = e10._zod.def.checks;
        if (r10 && r10.length > 0) {
          let r11 = e10._zod.def.shape;
          for (let e11 in t10) if (void 0 !== Object.getOwnPropertyDescriptor(r11, e11)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let i10 = rw(e10._zod.def, { get shape() {
          let r11 = { ...e10._zod.def.shape, ...t10 };
          return rx(this, "shape", r11), r11;
        } });
        return rR(e10, i10);
      }, "finalizeIssue", 0, rB, "floatSafeRemainder", 0, rb, "getElementAtPath", 0, function(e10, t10) {
        return t10 ? t10.reduce((e11, t11) => e11?.[t11], e10) : e10;
      }, "getEnumValues", 0, rm, "getLengthableOrigin", 0, rV, "getParsedType", 0, (e10) => {
        let t10 = typeof e10;
        switch (t10) {
          case "undefined":
            return "undefined";
          case "string":
            return "string";
          case "number":
            return Number.isNaN(e10) ? "nan" : "number";
          case "boolean":
            return "boolean";
          case "function":
            return "function";
          case "bigint":
            return "bigint";
          case "symbol":
            return "symbol";
          case "object":
            if (Array.isArray(e10)) return "array";
            if (null === e10) return "null";
            if (e10.then && "function" == typeof e10.then && e10.catch && "function" == typeof e10.catch) return "promise";
            if ("u" > typeof Map && e10 instanceof Map) return "map";
            if ("u" > typeof Set && e10 instanceof Set) return "set";
            if ("u" > typeof Date && e10 instanceof Date) return "date";
            if ("u" > typeof File && e10 instanceof File) return "file";
            return "object";
          default:
            throw Error(`Unknown data type: ${t10}`);
        }
      }, "getSizableOrigin", 0, rq, "hexToUint8Array", 0, function(e10) {
        let t10 = e10.replace(/^0x/, "");
        if (t10.length % 2 != 0) throw Error("Invalid hex string length");
        let r10 = new Uint8Array(t10.length / 2);
        for (let e11 = 0; e11 < t10.length; e11 += 2) r10[e11 / 2] = Number.parseInt(t10.slice(e11, e11 + 2), 16);
        return r10;
      }, "isObject", 0, rO, "isPlainObject", 0, rP, "issue", 0, rW, "joinValues", 0, rp, "jsonStringifyReplacer", 0, rv, "merge", 0, function(e10, t10) {
        if (e10._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
        let r10 = rw(e10._zod.def, { get shape() {
          let r11 = { ...e10._zod.def.shape, ...t10._zod.def.shape };
          return rx(this, "shape", r11), r11;
        }, get catchall() {
          return t10._zod.def.catchall;
        }, checks: t10._zod.def.checks ?? [] });
        return rR(e10, r10);
      }, "mergeDefs", 0, rw, "normalizeParams", 0, rU, "nullish", 0, rh, "numKeys", 0, function(e10) {
        let t10 = 0;
        for (let r10 in e10) Object.prototype.hasOwnProperty.call(e10, r10) && t10++;
        return t10;
      }, "objectClone", 0, function(e10) {
        return Object.create(Object.getPrototypeOf(e10), Object.getOwnPropertyDescriptors(e10));
      }, "omit", 0, function(e10, t10) {
        let r10 = e10._zod.def, i10 = r10.checks;
        if (i10 && i10.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
        let n10 = rw(e10._zod.def, { get shape() {
          let i11 = { ...e10._zod.def.shape };
          for (let e11 in t10) {
            if (!(e11 in r10.shape)) throw Error(`Unrecognized key: "${e11}"`);
            t10[e11] && delete i11[e11];
          }
          return rx(this, "shape", i11), i11;
        }, checks: [] });
        return rR(e10, n10);
      }, "optionalKeys", 0, rD, "parsedType", 0, rG, "partial", 0, function(e10, t10, r10) {
        let i10 = t10._zod.def.checks;
        if (i10 && i10.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let n10 = rw(t10._zod.def, { get shape() {
          let i11 = t10._zod.def.shape, n11 = { ...i11 };
          if (r10) for (let t11 in r10) {
            if (!(t11 in i11)) throw Error(`Unrecognized key: "${t11}"`);
            r10[t11] && (n11[t11] = e10 ? new e10({ type: "optional", innerType: i11[t11] }) : i11[t11]);
          }
          else for (let t11 in i11) n11[t11] = e10 ? new e10({ type: "optional", innerType: i11[t11] }) : i11[t11];
          return rx(this, "shape", n11), n11;
        }, checks: [] });
        return rR(t10, n10);
      }, "pick", 0, function(e10, t10) {
        let r10 = e10._zod.def, i10 = r10.checks;
        if (i10 && i10.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
        let n10 = rw(e10._zod.def, { get shape() {
          let e11 = {};
          for (let i11 in t10) {
            if (!(i11 in r10.shape)) throw Error(`Unrecognized key: "${i11}"`);
            t10[i11] && (e11[i11] = r10.shape[i11]);
          }
          return rx(this, "shape", e11), e11;
        }, checks: [] });
        return rR(e10, n10);
      }, "prefixIssues", 0, rF, "primitiveTypes", 0, rz, "promiseAllObject", 0, function(e10) {
        let t10 = Object.keys(e10);
        return Promise.all(t10.map((t11) => e10[t11])).then((e11) => {
          let r10 = {};
          for (let i10 = 0; i10 < t10.length; i10++) r10[t10[i10]] = e11[i10];
          return r10;
        });
      }, "propertyKeyTypes", 0, rN, "randomString", 0, function(e10 = 10) {
        let t10 = "abcdefghijklmnopqrstuvwxyz", r10 = "";
        for (let i10 = 0; i10 < e10; i10++) r10 += t10[Math.floor(Math.random() * t10.length)];
        return r10;
      }, "required", 0, function(e10, t10, r10) {
        let i10 = rw(t10._zod.def, { get shape() {
          let i11 = t10._zod.def.shape, n10 = { ...i11 };
          if (r10) for (let t11 in r10) {
            if (!(t11 in n10)) throw Error(`Unrecognized key: "${t11}"`);
            r10[t11] && (n10[t11] = new e10({ type: "nonoptional", innerType: i11[t11] }));
          }
          else for (let t11 in i11) n10[t11] = new e10({ type: "nonoptional", innerType: i11[t11] });
          return rx(this, "shape", n10), n10;
        } });
        return rR(t10, i10);
      }, "safeExtend", 0, function(e10, t10) {
        if (!rP(t10)) throw Error("Invalid input to safeExtend: expected a plain object");
        let r10 = rw(e10._zod.def, { get shape() {
          let r11 = { ...e10._zod.def.shape, ...t10 };
          return rx(this, "shape", r11), r11;
        } });
        return rR(e10, r10);
      }, "shallowClone", 0, rT, "slugify", 0, rS, "stringifyPrimitive", 0, rj, "uint8ArrayToBase64", 0, rH, "uint8ArrayToBase64url", 0, function(e10) {
        return rH(e10).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
      }, "uint8ArrayToHex", 0, function(e10) {
        return Array.from(e10).map((e11) => e11.toString(16).padStart(2, "0")).join("");
      }, "unwrapMessage", 0, rJ], 10795), rf(rK()), e.s([], 97687), e.i(97687), e.s([], 82954), e.i(82954), e.i(33624);
      let rY = (e10, t10) => {
        e10.name = "$ZodError", Object.defineProperty(e10, "_zod", { value: e10._zod, enumerable: false }), Object.defineProperty(e10, "issues", { value: t10, enumerable: false }), e10.message = JSON.stringify(t10, rv, 2), Object.defineProperty(e10, "toString", { value: () => e10.message, enumerable: false });
      }, rQ = rs("$ZodError", rY), r0 = rs("$ZodError", rY, { Parent: Error });
      function r1(e10, t10 = (e11) => e11.message) {
        let r10 = {}, i10 = [];
        for (let n10 of e10.issues) n10.path.length > 0 ? (r10[n10.path[0]] = r10[n10.path[0]] || [], r10[n10.path[0]].push(t10(n10))) : i10.push(t10(n10));
        return { formErrors: i10, fieldErrors: r10 };
      }
      function r4(e10, t10 = (e11) => e11.message) {
        let r10 = { _errors: [] }, i10 = (e11, n10 = []) => {
          for (let a10 of e11.issues) if ("invalid_union" === a10.code && a10.errors.length) a10.errors.map((e12) => i10({ issues: e12 }, [...n10, ...a10.path]));
          else if ("invalid_key" === a10.code) i10({ issues: a10.issues }, [...n10, ...a10.path]);
          else if ("invalid_element" === a10.code) i10({ issues: a10.issues }, [...n10, ...a10.path]);
          else {
            let e12 = [...n10, ...a10.path];
            if (0 === e12.length) r10._errors.push(t10(a10));
            else {
              let i11 = r10, n11 = 0;
              for (; n11 < e12.length; ) {
                let r11 = e12[n11];
                n11 === e12.length - 1 ? (i11[r11] = i11[r11] || { _errors: [] }, i11[r11]._errors.push(t10(a10))) : i11[r11] = i11[r11] || { _errors: [] }, i11 = i11[r11], n11++;
              }
            }
          }
        };
        return i10(e10), r10;
      }
      function r6(e10, t10 = (e11) => e11.message) {
        let r10 = { errors: [] }, i10 = (e11, n10 = []) => {
          var a10, o10;
          for (let s10 of e11.issues) if ("invalid_union" === s10.code && s10.errors.length) s10.errors.map((e12) => i10({ issues: e12 }, [...n10, ...s10.path]));
          else if ("invalid_key" === s10.code) i10({ issues: s10.issues }, [...n10, ...s10.path]);
          else if ("invalid_element" === s10.code) i10({ issues: s10.issues }, [...n10, ...s10.path]);
          else {
            let e12 = [...n10, ...s10.path];
            if (0 === e12.length) {
              r10.errors.push(t10(s10));
              continue;
            }
            let i11 = r10, u10 = 0;
            for (; u10 < e12.length; ) {
              let r11 = e12[u10], n11 = u10 === e12.length - 1;
              "string" == typeof r11 ? (i11.properties ?? (i11.properties = {}), (a10 = i11.properties)[r11] ?? (a10[r11] = { errors: [] }), i11 = i11.properties[r11]) : (i11.items ?? (i11.items = []), (o10 = i11.items)[r11] ?? (o10[r11] = { errors: [] }), i11 = i11.items[r11]), n11 && i11.errors.push(t10(s10)), u10++;
            }
          }
        };
        return i10(e10), r10;
      }
      function r2(e10) {
        let t10 = [];
        for (let r10 of e10.map((e11) => "object" == typeof e11 ? e11.key : e11)) "number" == typeof r10 ? t10.push(`[${r10}]`) : "symbol" == typeof r10 ? t10.push(`[${JSON.stringify(String(r10))}]`) : /[^\w$]/.test(r10) ? t10.push(`[${JSON.stringify(r10)}]`) : (t10.length && t10.push("."), t10.push(r10));
        return t10.join("");
      }
      function r9(e10) {
        let t10 = [];
        for (let r10 of [...e10.issues].sort((e11, t11) => (e11.path ?? []).length - (t11.path ?? []).length)) t10.push(`\u2716 ${r10.message}`), r10.path?.length && t10.push(`  \u2192 at ${r2(r10.path)}`);
        return t10.join("\n");
      }
      e.s(["$ZodError", 0, rQ, "$ZodRealError", 0, r0, "flattenError", 0, r1, "formatError", 0, r4, "prettifyError", 0, r9, "toDotPath", 0, r2, "treeifyError", 0, r6], 26532);
      let r3 = (e10) => (t10, r10, i10, n10) => {
        let a10 = i10 ? { ...i10, async: false } : { async: false }, o10 = t10._zod.run({ value: r10, issues: [] }, a10);
        if (o10 instanceof Promise) throw new rl();
        if (o10.issues.length) {
          let t11 = new (n10?.Err ?? e10)(o10.issues.map((e11) => rB(e11, a10, rf())));
          throw rI(t11, n10?.callee), t11;
        }
        return o10.value;
      }, r7 = r3(r0), r5 = (e10) => async (t10, r10, i10, n10) => {
        let a10 = i10 ? { ...i10, async: true } : { async: true }, o10 = t10._zod.run({ value: r10, issues: [] }, a10);
        if (o10 instanceof Promise && (o10 = await o10), o10.issues.length) {
          let t11 = new (n10?.Err ?? e10)(o10.issues.map((e11) => rB(e11, a10, rf())));
          throw rI(t11, n10?.callee), t11;
        }
        return o10.value;
      }, r8 = r5(r0), ie = (e10) => (t10, r10, i10) => {
        let n10 = i10 ? { ...i10, async: false } : { async: false }, a10 = t10._zod.run({ value: r10, issues: [] }, n10);
        if (a10 instanceof Promise) throw new rl();
        return a10.issues.length ? { success: false, error: new (e10 ?? rQ)(a10.issues.map((e11) => rB(e11, n10, rf()))) } : { success: true, data: a10.value };
      }, it = ie(r0), ir = (e10) => async (t10, r10, i10) => {
        let n10 = i10 ? { ...i10, async: true } : { async: true }, a10 = t10._zod.run({ value: r10, issues: [] }, n10);
        return a10 instanceof Promise && (a10 = await a10), a10.issues.length ? { success: false, error: new e10(a10.issues.map((e11) => rB(e11, n10, rf()))) } : { success: true, data: a10.value };
      }, ii = ir(r0), ia = (e10) => (t10, r10, i10) => {
        let n10 = i10 ? { ...i10, direction: "backward" } : { direction: "backward" };
        return r3(e10)(t10, r10, n10);
      }, io = ia(r0), is = (e10) => (t10, r10, i10) => r3(e10)(t10, r10, i10), iu = is(r0), il = (e10) => async (t10, r10, i10) => {
        let n10 = i10 ? { ...i10, direction: "backward" } : { direction: "backward" };
        return r5(e10)(t10, r10, n10);
      }, id = il(r0), ic = (e10) => async (t10, r10, i10) => r5(e10)(t10, r10, i10), im = ic(r0), ip = (e10) => (t10, r10, i10) => {
        let n10 = i10 ? { ...i10, direction: "backward" } : { direction: "backward" };
        return ie(e10)(t10, r10, n10);
      }, iv = ip(r0), ig = (e10) => (t10, r10, i10) => ie(e10)(t10, r10, i10), ih = ig(r0), i_ = (e10) => async (t10, r10, i10) => {
        let n10 = i10 ? { ...i10, direction: "backward" } : { direction: "backward" };
        return ir(e10)(t10, r10, n10);
      }, ib = i_(r0), iy = (e10) => async (t10, r10, i10) => ir(e10)(t10, r10, i10), i$ = iy(r0);
      e.s(["_decode", 0, is, "_decodeAsync", 0, ic, "_encode", 0, ia, "_encodeAsync", 0, il, "_parse", 0, r3, "_parseAsync", 0, r5, "_safeDecode", 0, ig, "_safeDecodeAsync", 0, iy, "_safeEncode", 0, ip, "_safeEncodeAsync", 0, i_, "_safeParse", 0, ie, "_safeParseAsync", 0, ir, "decode", 0, iu, "decodeAsync", 0, im, "encode", 0, io, "encodeAsync", 0, id, "parse", 0, r7, "parseAsync", 0, r8, "safeDecode", 0, ih, "safeDecodeAsync", 0, i$, "safeEncode", 0, iv, "safeEncodeAsync", 0, ib, "safeParse", 0, it, "safeParseAsync", 0, ii], 29722), e.i(29722), e.i(26532);
      let ix = /^[cC][0-9a-z]{6,}$/, iw = /^[0-9a-z]+$/, ik = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, iS = /^[0-9a-vA-V]{20}$/, iI = /^[A-Za-z0-9]{27}$/, iO = /^[a-zA-Z0-9_-]{21}$/, iE = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, iP = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, iT = (e10) => e10 ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e10}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, iN = iT(4), iz = iT(6), iC = iT(7), iR = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, iU = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
      function ij() {
        return RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
      }
      let iD = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, iA = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, iZ = (e10) => {
        let t10 = rC(e10 ?? ":");
        return RegExp(`^(?:[0-9A-F]{2}${t10}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${t10}){5}[0-9a-f]{2}$`);
      }, iL = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, iM = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, iF = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, iJ = /^[A-Za-z0-9_-]*$/, iB = /^https?$/, iq = /^\+[1-9]\d{6,14}$/, iV = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", iG = RegExp(`^${iV}$`);
      function iW(e10) {
        let t10 = "(?:[01]\\d|2[0-3]):[0-5]\\d";
        return "number" == typeof e10.precision ? -1 === e10.precision ? `${t10}` : 0 === e10.precision ? `${t10}:[0-5]\\d` : `${t10}:[0-5]\\d\\.\\d{${e10.precision}}` : `${t10}(?::[0-5]\\d(?:\\.\\d+)?)?`;
      }
      function iX(e10) {
        return RegExp(`^${iW(e10)}$`);
      }
      function iH(e10) {
        let t10 = iW({ precision: e10.precision }), r10 = ["Z"];
        e10.local && r10.push(""), e10.offset && r10.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
        let i10 = `${t10}(?:${r10.join("|")})`;
        return RegExp(`^${iV}T(?:${i10})$`);
      }
      let iK = (e10) => {
        let t10 = e10 ? `[\\s\\S]{${e10?.minimum ?? 0},${e10?.maximum ?? ""}}` : "[\\s\\S]*";
        return RegExp(`^${t10}$`);
      }, iY = /^-?\d+n?$/, iQ = /^-?\d+$/, i0 = /^-?\d+(?:\.\d+)?$/, i1 = /^(?:true|false)$/i, i4 = /^null$/i, i6 = /^undefined$/i, i2 = /^[^A-Z]*$/, i9 = /^[^a-z]*$/;
      function i3(e10, t10) {
        return RegExp(`^[A-Za-z0-9+/]{${e10}}${t10}$`);
      }
      function i7(e10) {
        return RegExp(`^[A-Za-z0-9_-]{${e10}}$`);
      }
      let i5 = i3(22, "=="), i8 = i7(22), ne = i3(27, "="), nt = i7(27), nr = i3(43, "="), ni = i7(43), nn = i3(64, ""), na = i7(64), no = i3(86, "=="), ns = i7(86);
      e.s(["base64", 0, iF, "base64url", 0, iJ, "bigint", 0, iY, "boolean", 0, i1, "browserEmail", 0, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "cidrv4", 0, iL, "cidrv6", 0, iM, "cuid", 0, ix, "cuid2", 0, iw, "date", 0, iG, "datetime", 0, iH, "domain", 0, /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/, "duration", 0, iE, "e164", 0, iq, "email", 0, iR, "emoji", 0, ij, "extendedDuration", 0, /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, "guid", 0, iP, "hex", 0, /^[0-9a-fA-F]*$/, "hostname", 0, /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, "html5Email", 0, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "httpProtocol", 0, iB, "idnEmail", 0, iU, "integer", 0, iQ, "ipv4", 0, iD, "ipv6", 0, iA, "ksuid", 0, iI, "lowercase", 0, i2, "mac", 0, iZ, "md5_base64", 0, i5, "md5_base64url", 0, i8, "md5_hex", 0, /^[0-9a-fA-F]{32}$/, "nanoid", 0, iO, "null", 0, i4, "number", 0, i0, "rfc5322Email", 0, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "sha1_base64", 0, ne, "sha1_base64url", 0, nt, "sha1_hex", 0, /^[0-9a-fA-F]{40}$/, "sha256_base64", 0, nr, "sha256_base64url", 0, ni, "sha256_hex", 0, /^[0-9a-fA-F]{64}$/, "sha384_base64", 0, nn, "sha384_base64url", 0, na, "sha384_hex", 0, /^[0-9a-fA-F]{96}$/, "sha512_base64", 0, no, "sha512_base64url", 0, ns, "sha512_hex", 0, /^[0-9a-fA-F]{128}$/, "string", 0, iK, "time", 0, iX, "ulid", 0, ik, "undefined", 0, i6, "unicodeEmail", 0, iU, "uppercase", 0, i9, "uuid", 0, iT, "uuid4", 0, iN, "uuid6", 0, iz, "uuid7", 0, iC, "xid", 0, iS], 64484);
      let nu = rs("$ZodCheck", (e10, t10) => {
        var r10;
        e10._zod ?? (e10._zod = {}), e10._zod.def = t10, (r10 = e10._zod).onattach ?? (r10.onattach = []);
      }), nl = { number: "number", bigint: "bigint", object: "date" }, nd = rs("$ZodCheckLessThan", (e10, t10) => {
        nu.init(e10, t10);
        let r10 = nl[typeof t10.value];
        e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag, i10 = (t10.inclusive ? r11.maximum : r11.exclusiveMaximum) ?? 1 / 0;
          t10.value < i10 && (t10.inclusive ? r11.maximum = t10.value : r11.exclusiveMaximum = t10.value);
        }), e10._zod.check = (i10) => {
          (t10.inclusive ? i10.value <= t10.value : i10.value < t10.value) || i10.issues.push({ origin: r10, code: "too_big", maximum: "object" == typeof t10.value ? t10.value.getTime() : t10.value, input: i10.value, inclusive: t10.inclusive, inst: e10, continue: !t10.abort });
        };
      }), nc = rs("$ZodCheckGreaterThan", (e10, t10) => {
        nu.init(e10, t10);
        let r10 = nl[typeof t10.value];
        e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag, i10 = (t10.inclusive ? r11.minimum : r11.exclusiveMinimum) ?? -1 / 0;
          t10.value > i10 && (t10.inclusive ? r11.minimum = t10.value : r11.exclusiveMinimum = t10.value);
        }), e10._zod.check = (i10) => {
          (t10.inclusive ? i10.value >= t10.value : i10.value > t10.value) || i10.issues.push({ origin: r10, code: "too_small", minimum: "object" == typeof t10.value ? t10.value.getTime() : t10.value, input: i10.value, inclusive: t10.inclusive, inst: e10, continue: !t10.abort });
        };
      }), nf = rs("$ZodCheckMultipleOf", (e10, t10) => {
        nu.init(e10, t10), e10._zod.onattach.push((e11) => {
          var r10;
          (r10 = e11._zod.bag).multipleOf ?? (r10.multipleOf = t10.value);
        }), e10._zod.check = (r10) => {
          if (typeof r10.value != typeof t10.value) throw Error("Cannot mix number and bigint in multiple_of check.");
          ("bigint" == typeof r10.value ? r10.value % t10.value === BigInt(0) : 0 === rb(r10.value, t10.value)) || r10.issues.push({ origin: typeof r10.value, code: "not_multiple_of", divisor: t10.value, input: r10.value, inst: e10, continue: !t10.abort });
        };
      }), nm = rs("$ZodCheckNumberFormat", (e10, t10) => {
        nu.init(e10, t10), t10.format = t10.format || "float64";
        let r10 = t10.format?.includes("int"), i10 = r10 ? "int" : "number", [n10, a10] = rA[t10.format];
        e10._zod.onattach.push((e11) => {
          let i11 = e11._zod.bag;
          i11.format = t10.format, i11.minimum = n10, i11.maximum = a10, r10 && (i11.pattern = iQ);
        }), e10._zod.check = (o10) => {
          let s10 = o10.value;
          if (r10) {
            if (!Number.isInteger(s10)) return void o10.issues.push({ expected: i10, format: t10.format, code: "invalid_type", continue: false, input: s10, inst: e10 });
            if (!Number.isSafeInteger(s10)) return void (s10 > 0 ? o10.issues.push({ input: s10, code: "too_big", maximum: Number.MAX_SAFE_INTEGER, note: "Integers must be within the safe integer range.", inst: e10, origin: i10, inclusive: true, continue: !t10.abort }) : o10.issues.push({ input: s10, code: "too_small", minimum: Number.MIN_SAFE_INTEGER, note: "Integers must be within the safe integer range.", inst: e10, origin: i10, inclusive: true, continue: !t10.abort }));
          }
          s10 < n10 && o10.issues.push({ origin: "number", input: s10, code: "too_small", minimum: n10, inclusive: true, inst: e10, continue: !t10.abort }), s10 > a10 && o10.issues.push({ origin: "number", input: s10, code: "too_big", maximum: a10, inclusive: true, inst: e10, continue: !t10.abort });
        };
      }), np = rs("$ZodCheckBigIntFormat", (e10, t10) => {
        nu.init(e10, t10);
        let [r10, i10] = rZ[t10.format];
        e10._zod.onattach.push((e11) => {
          let n10 = e11._zod.bag;
          n10.format = t10.format, n10.minimum = r10, n10.maximum = i10;
        }), e10._zod.check = (n10) => {
          let a10 = n10.value;
          a10 < r10 && n10.issues.push({ origin: "bigint", input: a10, code: "too_small", minimum: r10, inclusive: true, inst: e10, continue: !t10.abort }), a10 > i10 && n10.issues.push({ origin: "bigint", input: a10, code: "too_big", maximum: i10, inclusive: true, inst: e10, continue: !t10.abort });
        };
      }), nv = rs("$ZodCheckMaxSize", (e10, t10) => {
        var r10;
        nu.init(e10, t10), (r10 = e10._zod.def).when ?? (r10.when = (e11) => {
          let t11 = e11.value;
          return !rh(t11) && void 0 !== t11.size;
        }), e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag.maximum ?? 1 / 0;
          t10.maximum < r11 && (e11._zod.bag.maximum = t10.maximum);
        }), e10._zod.check = (r11) => {
          let i10 = r11.value;
          i10.size <= t10.maximum || r11.issues.push({ origin: rq(i10), code: "too_big", maximum: t10.maximum, inclusive: true, input: i10, inst: e10, continue: !t10.abort });
        };
      }), ng = rs("$ZodCheckMinSize", (e10, t10) => {
        var r10;
        nu.init(e10, t10), (r10 = e10._zod.def).when ?? (r10.when = (e11) => {
          let t11 = e11.value;
          return !rh(t11) && void 0 !== t11.size;
        }), e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag.minimum ?? -1 / 0;
          t10.minimum > r11 && (e11._zod.bag.minimum = t10.minimum);
        }), e10._zod.check = (r11) => {
          let i10 = r11.value;
          i10.size >= t10.minimum || r11.issues.push({ origin: rq(i10), code: "too_small", minimum: t10.minimum, inclusive: true, input: i10, inst: e10, continue: !t10.abort });
        };
      }), nh = rs("$ZodCheckSizeEquals", (e10, t10) => {
        var r10;
        nu.init(e10, t10), (r10 = e10._zod.def).when ?? (r10.when = (e11) => {
          let t11 = e11.value;
          return !rh(t11) && void 0 !== t11.size;
        }), e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag;
          r11.minimum = t10.size, r11.maximum = t10.size, r11.size = t10.size;
        }), e10._zod.check = (r11) => {
          let i10 = r11.value, n10 = i10.size;
          if (n10 === t10.size) return;
          let a10 = n10 > t10.size;
          r11.issues.push({ origin: rq(i10), ...a10 ? { code: "too_big", maximum: t10.size } : { code: "too_small", minimum: t10.size }, inclusive: true, exact: true, input: r11.value, inst: e10, continue: !t10.abort });
        };
      }), n_ = rs("$ZodCheckMaxLength", (e10, t10) => {
        var r10;
        nu.init(e10, t10), (r10 = e10._zod.def).when ?? (r10.when = (e11) => {
          let t11 = e11.value;
          return !rh(t11) && void 0 !== t11.length;
        }), e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag.maximum ?? 1 / 0;
          t10.maximum < r11 && (e11._zod.bag.maximum = t10.maximum);
        }), e10._zod.check = (r11) => {
          let i10 = r11.value;
          if (i10.length <= t10.maximum) return;
          let n10 = rV(i10);
          r11.issues.push({ origin: n10, code: "too_big", maximum: t10.maximum, inclusive: true, input: i10, inst: e10, continue: !t10.abort });
        };
      }), nb = rs("$ZodCheckMinLength", (e10, t10) => {
        var r10;
        nu.init(e10, t10), (r10 = e10._zod.def).when ?? (r10.when = (e11) => {
          let t11 = e11.value;
          return !rh(t11) && void 0 !== t11.length;
        }), e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag.minimum ?? -1 / 0;
          t10.minimum > r11 && (e11._zod.bag.minimum = t10.minimum);
        }), e10._zod.check = (r11) => {
          let i10 = r11.value;
          if (i10.length >= t10.minimum) return;
          let n10 = rV(i10);
          r11.issues.push({ origin: n10, code: "too_small", minimum: t10.minimum, inclusive: true, input: i10, inst: e10, continue: !t10.abort });
        };
      }), ny = rs("$ZodCheckLengthEquals", (e10, t10) => {
        var r10;
        nu.init(e10, t10), (r10 = e10._zod.def).when ?? (r10.when = (e11) => {
          let t11 = e11.value;
          return !rh(t11) && void 0 !== t11.length;
        }), e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag;
          r11.minimum = t10.length, r11.maximum = t10.length, r11.length = t10.length;
        }), e10._zod.check = (r11) => {
          let i10 = r11.value, n10 = i10.length;
          if (n10 === t10.length) return;
          let a10 = rV(i10), o10 = n10 > t10.length;
          r11.issues.push({ origin: a10, ...o10 ? { code: "too_big", maximum: t10.length } : { code: "too_small", minimum: t10.length }, inclusive: true, exact: true, input: r11.value, inst: e10, continue: !t10.abort });
        };
      }), n$ = rs("$ZodCheckStringFormat", (e10, t10) => {
        var r10, i10;
        nu.init(e10, t10), e10._zod.onattach.push((e11) => {
          let r11 = e11._zod.bag;
          r11.format = t10.format, t10.pattern && (r11.patterns ?? (r11.patterns = /* @__PURE__ */ new Set()), r11.patterns.add(t10.pattern));
        }), t10.pattern ? (r10 = e10._zod).check ?? (r10.check = (r11) => {
          t10.pattern.lastIndex = 0, t10.pattern.test(r11.value) || r11.issues.push({ origin: "string", code: "invalid_format", format: t10.format, input: r11.value, ...t10.pattern ? { pattern: t10.pattern.toString() } : {}, inst: e10, continue: !t10.abort });
        }) : (i10 = e10._zod).check ?? (i10.check = () => {
        });
      }), nx = rs("$ZodCheckRegex", (e10, t10) => {
        n$.init(e10, t10), e10._zod.check = (r10) => {
          t10.pattern.lastIndex = 0, t10.pattern.test(r10.value) || r10.issues.push({ origin: "string", code: "invalid_format", format: "regex", input: r10.value, pattern: t10.pattern.toString(), inst: e10, continue: !t10.abort });
        };
      }), nw = rs("$ZodCheckLowerCase", (e10, t10) => {
        t10.pattern ?? (t10.pattern = i2), n$.init(e10, t10);
      }), nk = rs("$ZodCheckUpperCase", (e10, t10) => {
        t10.pattern ?? (t10.pattern = i9), n$.init(e10, t10);
      }), nS = rs("$ZodCheckIncludes", (e10, t10) => {
        nu.init(e10, t10);
        let r10 = rC(t10.includes), i10 = new RegExp("number" == typeof t10.position ? `^.{${t10.position}}${r10}` : r10);
        t10.pattern = i10, e10._zod.onattach.push((e11) => {
          let t11 = e11._zod.bag;
          t11.patterns ?? (t11.patterns = /* @__PURE__ */ new Set()), t11.patterns.add(i10);
        }), e10._zod.check = (r11) => {
          r11.value.includes(t10.includes, t10.position) || r11.issues.push({ origin: "string", code: "invalid_format", format: "includes", includes: t10.includes, input: r11.value, inst: e10, continue: !t10.abort });
        };
      }), nI = rs("$ZodCheckStartsWith", (e10, t10) => {
        nu.init(e10, t10);
        let r10 = RegExp(`^${rC(t10.prefix)}.*`);
        t10.pattern ?? (t10.pattern = r10), e10._zod.onattach.push((e11) => {
          let t11 = e11._zod.bag;
          t11.patterns ?? (t11.patterns = /* @__PURE__ */ new Set()), t11.patterns.add(r10);
        }), e10._zod.check = (r11) => {
          r11.value.startsWith(t10.prefix) || r11.issues.push({ origin: "string", code: "invalid_format", format: "starts_with", prefix: t10.prefix, input: r11.value, inst: e10, continue: !t10.abort });
        };
      }), nO = rs("$ZodCheckEndsWith", (e10, t10) => {
        nu.init(e10, t10);
        let r10 = RegExp(`.*${rC(t10.suffix)}$`);
        t10.pattern ?? (t10.pattern = r10), e10._zod.onattach.push((e11) => {
          let t11 = e11._zod.bag;
          t11.patterns ?? (t11.patterns = /* @__PURE__ */ new Set()), t11.patterns.add(r10);
        }), e10._zod.check = (r11) => {
          r11.value.endsWith(t10.suffix) || r11.issues.push({ origin: "string", code: "invalid_format", format: "ends_with", suffix: t10.suffix, input: r11.value, inst: e10, continue: !t10.abort });
        };
      });
      function nE(e10, t10, r10) {
        e10.issues.length && t10.issues.push(...rF(r10, e10.issues));
      }
      let nP = rs("$ZodCheckProperty", (e10, t10) => {
        nu.init(e10, t10), e10._zod.check = (e11) => {
          let r10 = t10.schema._zod.run({ value: e11.value[t10.property], issues: [] }, {});
          if (r10 instanceof Promise) return r10.then((r11) => nE(r11, e11, t10.property));
          nE(r10, e11, t10.property);
        };
      }), nT = rs("$ZodCheckMimeType", (e10, t10) => {
        nu.init(e10, t10);
        let r10 = new Set(t10.mime);
        e10._zod.onattach.push((e11) => {
          e11._zod.bag.mime = t10.mime;
        }), e10._zod.check = (i10) => {
          r10.has(i10.value.type) || i10.issues.push({ code: "invalid_value", values: t10.mime, input: i10.value.type, inst: e10, continue: !t10.abort });
        };
      }), nN = rs("$ZodCheckOverwrite", (e10, t10) => {
        nu.init(e10, t10), e10._zod.check = (e11) => {
          e11.value = t10.tx(e11.value);
        };
      });
      e.s(["$ZodCheck", 0, nu, "$ZodCheckBigIntFormat", 0, np, "$ZodCheckEndsWith", 0, nO, "$ZodCheckGreaterThan", 0, nc, "$ZodCheckIncludes", 0, nS, "$ZodCheckLengthEquals", 0, ny, "$ZodCheckLessThan", 0, nd, "$ZodCheckLowerCase", 0, nw, "$ZodCheckMaxLength", 0, n_, "$ZodCheckMaxSize", 0, nv, "$ZodCheckMimeType", 0, nT, "$ZodCheckMinLength", 0, nb, "$ZodCheckMinSize", 0, ng, "$ZodCheckMultipleOf", 0, nf, "$ZodCheckNumberFormat", 0, nm, "$ZodCheckOverwrite", 0, nN, "$ZodCheckProperty", 0, nP, "$ZodCheckRegex", 0, nx, "$ZodCheckSizeEquals", 0, nh, "$ZodCheckStartsWith", 0, nI, "$ZodCheckStringFormat", 0, n$, "$ZodCheckUpperCase", 0, nk], 96846);
      class nz {
        constructor(e10 = []) {
          this.content = [], this.indent = 0, this && (this.args = e10);
        }
        indented(e10) {
          this.indent += 1, e10(this), this.indent -= 1;
        }
        write(e10) {
          if ("function" == typeof e10) {
            e10(this, { execution: "sync" }), e10(this, { execution: "async" });
            return;
          }
          let t10 = e10.split("\n").filter((e11) => e11), r10 = Math.min(...t10.map((e11) => e11.length - e11.trimStart().length));
          for (let e11 of t10.map((e12) => e12.slice(r10)).map((e12) => " ".repeat(2 * this.indent) + e12)) this.content.push(e11);
        }
        compile() {
          return Function(...this?.args, [...(this?.content ?? [""]).map((e10) => `  ${e10}`)].join("\n"));
        }
      }
      e.s(["Doc", 0, nz], 41102);
      let nC = { major: 4, minor: 4, patch: 3 };
      e.s(["version", 0, nC], 21387);
      let nR = rs("$ZodType", (e10, t10) => {
        var r10;
        e10 ?? (e10 = {}), e10._zod.def = t10, e10._zod.bag = e10._zod.bag || {}, e10._zod.version = nC;
        let i10 = [...e10._zod.def.checks ?? []];
        for (let t11 of (e10._zod.traits.has("$ZodCheck") && i10.unshift(e10), i10)) for (let r11 of t11._zod.onattach) r11(e10);
        if (0 === i10.length) (r10 = e10._zod).deferred ?? (r10.deferred = []), e10._zod.deferred?.push(() => {
          e10._zod.run = e10._zod.parse;
        });
        else {
          let t11 = (e11, t12, r12) => {
            let i11, n10 = rL(e11);
            for (let a10 of t12) {
              if (a10._zod.def.when) {
                if (rM(e11) || !a10._zod.def.when(e11)) continue;
              } else if (n10) continue;
              let t13 = e11.issues.length, o10 = a10._zod.check(e11);
              if (o10 instanceof Promise && r12?.async === false) throw new rl();
              if (i11 || o10 instanceof Promise) i11 = (i11 ?? Promise.resolve()).then(async () => {
                await o10, e11.issues.length !== t13 && (n10 || (n10 = rL(e11, t13)));
              });
              else {
                if (e11.issues.length === t13) continue;
                n10 || (n10 = rL(e11, t13));
              }
            }
            return i11 ? i11.then(() => e11) : e11;
          }, r11 = (r12, n10, a10) => {
            if (rL(r12)) return r12.aborted = true, r12;
            let o10 = t11(n10, i10, a10);
            if (o10 instanceof Promise) {
              if (false === a10.async) throw new rl();
              return o10.then((t12) => e10._zod.parse(t12, a10));
            }
            return e10._zod.parse(o10, a10);
          };
          e10._zod.run = (n10, a10) => {
            if (a10.skipChecks) return e10._zod.parse(n10, a10);
            if ("backward" === a10.direction) {
              let t12 = e10._zod.parse({ value: n10.value, issues: [] }, { ...a10, skipChecks: true });
              return t12 instanceof Promise ? t12.then((e11) => r11(e11, n10, a10)) : r11(t12, n10, a10);
            }
            let o10 = e10._zod.parse(n10, a10);
            if (o10 instanceof Promise) {
              if (false === a10.async) throw new rl();
              return o10.then((e11) => t11(e11, i10, a10));
            }
            return t11(o10, i10, a10);
          };
        }
        r$(e10, "~standard", () => ({ validate: (t11) => {
          try {
            let r11 = it(e10, t11);
            return r11.success ? { value: r11.data } : { issues: r11.error?.issues };
          } catch (r11) {
            return ii(e10, t11).then((e11) => e11.success ? { value: e11.data } : { issues: e11.error?.issues });
          }
        }, vendor: "zod", version: 1 }));
      }), nU = rs("$ZodString", (e10, t10) => {
        nR.init(e10, t10), e10._zod.pattern = [...e10?._zod.bag?.patterns ?? []].pop() ?? iK(e10._zod.bag), e10._zod.parse = (r10, i10) => {
          if (t10.coerce) try {
            r10.value = String(r10.value);
          } catch (e11) {
          }
          return "string" == typeof r10.value || r10.issues.push({ expected: "string", code: "invalid_type", input: r10.value, inst: e10 }), r10;
        };
      }), nj = rs("$ZodStringFormat", (e10, t10) => {
        n$.init(e10, t10), nU.init(e10, t10);
      }), nD = rs("$ZodGUID", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iP), nj.init(e10, t10);
      }), nA = rs("$ZodUUID", (e10, t10) => {
        if (t10.version) {
          let e11 = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t10.version];
          if (void 0 === e11) throw Error(`Invalid UUID version: "${t10.version}"`);
          t10.pattern ?? (t10.pattern = iT(e11));
        } else t10.pattern ?? (t10.pattern = iT());
        nj.init(e10, t10);
      }), nZ = rs("$ZodEmail", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iR), nj.init(e10, t10);
      }), nL = rs("$ZodURL", (e10, t10) => {
        nj.init(e10, t10), e10._zod.check = (r10) => {
          try {
            let i10 = r10.value.trim();
            if (!t10.normalize && t10.protocol?.source === iB.source && !/^https?:\/\//i.test(i10)) return void r10.issues.push({ code: "invalid_format", format: "url", note: "Invalid URL format", input: r10.value, inst: e10, continue: !t10.abort });
            let n10 = new URL(i10);
            t10.hostname && (t10.hostname.lastIndex = 0, t10.hostname.test(n10.hostname) || r10.issues.push({ code: "invalid_format", format: "url", note: "Invalid hostname", pattern: t10.hostname.source, input: r10.value, inst: e10, continue: !t10.abort })), t10.protocol && (t10.protocol.lastIndex = 0, t10.protocol.test(n10.protocol.endsWith(":") ? n10.protocol.slice(0, -1) : n10.protocol) || r10.issues.push({ code: "invalid_format", format: "url", note: "Invalid protocol", pattern: t10.protocol.source, input: r10.value, inst: e10, continue: !t10.abort })), t10.normalize ? r10.value = n10.href : r10.value = i10;
            return;
          } catch (i10) {
            r10.issues.push({ code: "invalid_format", format: "url", input: r10.value, inst: e10, continue: !t10.abort });
          }
        };
      }), nM = rs("$ZodEmoji", (e10, t10) => {
        t10.pattern ?? (t10.pattern = ij()), nj.init(e10, t10);
      }), nF = rs("$ZodNanoID", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iO), nj.init(e10, t10);
      }), nJ = rs("$ZodCUID", (e10, t10) => {
        t10.pattern ?? (t10.pattern = ix), nj.init(e10, t10);
      }), nB = rs("$ZodCUID2", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iw), nj.init(e10, t10);
      }), nq = rs("$ZodULID", (e10, t10) => {
        t10.pattern ?? (t10.pattern = ik), nj.init(e10, t10);
      }), nV = rs("$ZodXID", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iS), nj.init(e10, t10);
      }), nG = rs("$ZodKSUID", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iI), nj.init(e10, t10);
      }), nW = rs("$ZodISODateTime", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iH(t10)), nj.init(e10, t10);
      }), nX = rs("$ZodISODate", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iG), nj.init(e10, t10);
      }), nH = rs("$ZodISOTime", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iX(t10)), nj.init(e10, t10);
      }), nK = rs("$ZodISODuration", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iE), nj.init(e10, t10);
      }), nY = rs("$ZodIPv4", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iD), nj.init(e10, t10), e10._zod.bag.format = "ipv4";
      }), nQ = rs("$ZodIPv6", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iA), nj.init(e10, t10), e10._zod.bag.format = "ipv6", e10._zod.check = (r10) => {
          try {
            new URL(`http://[${r10.value}]`);
          } catch {
            r10.issues.push({ code: "invalid_format", format: "ipv6", input: r10.value, inst: e10, continue: !t10.abort });
          }
        };
      }), n0 = rs("$ZodMAC", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iZ(t10.delimiter)), nj.init(e10, t10), e10._zod.bag.format = "mac";
      }), n1 = rs("$ZodCIDRv4", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iL), nj.init(e10, t10);
      }), n4 = rs("$ZodCIDRv6", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iM), nj.init(e10, t10), e10._zod.check = (r10) => {
          let i10 = r10.value.split("/");
          try {
            if (2 !== i10.length) throw Error();
            let [e11, t11] = i10;
            if (!t11) throw Error();
            let r11 = Number(t11);
            if (`${r11}` !== t11 || r11 < 0 || r11 > 128) throw Error();
            new URL(`http://[${e11}]`);
          } catch {
            r10.issues.push({ code: "invalid_format", format: "cidrv6", input: r10.value, inst: e10, continue: !t10.abort });
          }
        };
      });
      function n6(e10) {
        if ("" === e10) return true;
        if (/\s/.test(e10) || e10.length % 4 != 0) return false;
        try {
          return atob(e10), true;
        } catch {
          return false;
        }
      }
      let n2 = rs("$ZodBase64", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iF), nj.init(e10, t10), e10._zod.bag.contentEncoding = "base64", e10._zod.check = (r10) => {
          n6(r10.value) || r10.issues.push({ code: "invalid_format", format: "base64", input: r10.value, inst: e10, continue: !t10.abort });
        };
      });
      function n9(e10) {
        if (!iJ.test(e10)) return false;
        let t10 = e10.replace(/[-_]/g, (e11) => "-" === e11 ? "+" : "/");
        return n6(t10.padEnd(4 * Math.ceil(t10.length / 4), "="));
      }
      let n3 = rs("$ZodBase64URL", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iJ), nj.init(e10, t10), e10._zod.bag.contentEncoding = "base64url", e10._zod.check = (r10) => {
          n9(r10.value) || r10.issues.push({ code: "invalid_format", format: "base64url", input: r10.value, inst: e10, continue: !t10.abort });
        };
      }), n7 = rs("$ZodE164", (e10, t10) => {
        t10.pattern ?? (t10.pattern = iq), nj.init(e10, t10);
      });
      function n5(e10, t10 = null) {
        try {
          let r10 = e10.split(".");
          if (3 !== r10.length) return false;
          let [i10] = r10;
          if (!i10) return false;
          let n10 = JSON.parse(atob(i10));
          if ("typ" in n10 && n10?.typ !== "JWT" || !n10.alg || t10 && (!("alg" in n10) || n10.alg !== t10)) return false;
          return true;
        } catch {
          return false;
        }
      }
      let n8 = rs("$ZodJWT", (e10, t10) => {
        nj.init(e10, t10), e10._zod.check = (r10) => {
          n5(r10.value, t10.alg) || r10.issues.push({ code: "invalid_format", format: "jwt", input: r10.value, inst: e10, continue: !t10.abort });
        };
      }), ae = rs("$ZodCustomStringFormat", (e10, t10) => {
        nj.init(e10, t10), e10._zod.check = (r10) => {
          t10.fn(r10.value) || r10.issues.push({ code: "invalid_format", format: t10.format, input: r10.value, inst: e10, continue: !t10.abort });
        };
      }), at = rs("$ZodNumber", (e10, t10) => {
        nR.init(e10, t10), e10._zod.pattern = e10._zod.bag.pattern ?? i0, e10._zod.parse = (r10, i10) => {
          if (t10.coerce) try {
            r10.value = Number(r10.value);
          } catch (e11) {
          }
          let n10 = r10.value;
          if ("number" == typeof n10 && !Number.isNaN(n10) && Number.isFinite(n10)) return r10;
          let a10 = "number" == typeof n10 ? Number.isNaN(n10) ? "NaN" : Number.isFinite(n10) ? void 0 : "Infinity" : void 0;
          return r10.issues.push({ expected: "number", code: "invalid_type", input: n10, inst: e10, ...a10 ? { received: a10 } : {} }), r10;
        };
      }), ar = rs("$ZodNumberFormat", (e10, t10) => {
        nm.init(e10, t10), at.init(e10, t10);
      }), ai = rs("$ZodBoolean", (e10, t10) => {
        nR.init(e10, t10), e10._zod.pattern = i1, e10._zod.parse = (r10, i10) => {
          if (t10.coerce) try {
            r10.value = !!r10.value;
          } catch (e11) {
          }
          let n10 = r10.value;
          return "boolean" == typeof n10 || r10.issues.push({ expected: "boolean", code: "invalid_type", input: n10, inst: e10 }), r10;
        };
      }), an = rs("$ZodBigInt", (e10, t10) => {
        nR.init(e10, t10), e10._zod.pattern = iY, e10._zod.parse = (r10, i10) => {
          if (t10.coerce) try {
            r10.value = BigInt(r10.value);
          } catch (e11) {
          }
          return "bigint" == typeof r10.value || r10.issues.push({ expected: "bigint", code: "invalid_type", input: r10.value, inst: e10 }), r10;
        };
      }), aa = rs("$ZodBigIntFormat", (e10, t10) => {
        np.init(e10, t10), an.init(e10, t10);
      }), ao = rs("$ZodSymbol", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (t11, r10) => {
          let i10 = t11.value;
          return "symbol" == typeof i10 || t11.issues.push({ expected: "symbol", code: "invalid_type", input: i10, inst: e10 }), t11;
        };
      }), as = rs("$ZodUndefined", (e10, t10) => {
        nR.init(e10, t10), e10._zod.pattern = i6, e10._zod.values = /* @__PURE__ */ new Set([void 0]), e10._zod.parse = (t11, r10) => {
          let i10 = t11.value;
          return void 0 === i10 || t11.issues.push({ expected: "undefined", code: "invalid_type", input: i10, inst: e10 }), t11;
        };
      }), au = rs("$ZodNull", (e10, t10) => {
        nR.init(e10, t10), e10._zod.pattern = i4, e10._zod.values = /* @__PURE__ */ new Set([null]), e10._zod.parse = (t11, r10) => {
          let i10 = t11.value;
          return null === i10 || t11.issues.push({ expected: "null", code: "invalid_type", input: i10, inst: e10 }), t11;
        };
      }), al = rs("$ZodAny", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (e11) => e11;
      }), ad = rs("$ZodUnknown", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (e11) => e11;
      }), ac = rs("$ZodNever", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (t11, r10) => (t11.issues.push({ expected: "never", code: "invalid_type", input: t11.value, inst: e10 }), t11);
      }), af = rs("$ZodVoid", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (t11, r10) => {
          let i10 = t11.value;
          return void 0 === i10 || t11.issues.push({ expected: "void", code: "invalid_type", input: i10, inst: e10 }), t11;
        };
      }), am = rs("$ZodDate", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (r10, i10) => {
          if (t10.coerce) try {
            r10.value = new Date(r10.value);
          } catch (e11) {
          }
          let n10 = r10.value, a10 = n10 instanceof Date;
          return a10 && !Number.isNaN(n10.getTime()) || r10.issues.push({ expected: "date", code: "invalid_type", input: n10, ...a10 ? { received: "Invalid Date" } : {}, inst: e10 }), r10;
        };
      });
      function ap(e10, t10, r10) {
        e10.issues.length && t10.issues.push(...rF(r10, e10.issues)), t10.value[r10] = e10.value;
      }
      let av = rs("$ZodArray", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (r10, i10) => {
          let n10 = r10.value;
          if (!Array.isArray(n10)) return r10.issues.push({ expected: "array", code: "invalid_type", input: n10, inst: e10 }), r10;
          r10.value = Array(n10.length);
          let a10 = [];
          for (let e11 = 0; e11 < n10.length; e11++) {
            let o10 = n10[e11], s10 = t10.element._zod.run({ value: o10, issues: [] }, i10);
            s10 instanceof Promise ? a10.push(s10.then((t11) => ap(t11, r10, e11))) : ap(s10, r10, e11);
          }
          return a10.length ? Promise.all(a10).then(() => r10) : r10;
        };
      });
      function ag(e10, t10, r10, i10, n10, a10) {
        let o10 = r10 in i10;
        if (e10.issues.length) {
          if (n10 && a10 && !o10) return;
          t10.issues.push(...rF(r10, e10.issues));
        }
        if (!o10 && !n10) {
          e10.issues.length || t10.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [r10] });
          return;
        }
        void 0 === e10.value ? o10 && (t10.value[r10] = void 0) : t10.value[r10] = e10.value;
      }
      function ah(e10) {
        let t10 = Object.keys(e10.shape);
        for (let r11 of t10) if (!e10.shape?.[r11]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${r11}": expected a Zod schema`);
        let r10 = rD(e10.shape);
        return { ...e10, keys: t10, keySet: new Set(t10), numKeys: t10.length, optionalKeys: new Set(r10) };
      }
      function a_(e10, t10, r10, i10, n10, a10) {
        let o10 = [], s10 = n10.keySet, u10 = n10.catchall._zod, l10 = u10.def.type, d10 = "optional" === u10.optin, c10 = "optional" === u10.optout;
        for (let n11 in t10) {
          if ("__proto__" === n11 || s10.has(n11)) continue;
          if ("never" === l10) {
            o10.push(n11);
            continue;
          }
          let a11 = u10.run({ value: t10[n11], issues: [] }, i10);
          a11 instanceof Promise ? e10.push(a11.then((e11) => ag(e11, r10, n11, t10, d10, c10))) : ag(a11, r10, n11, t10, d10, c10);
        }
        return (o10.length && r10.issues.push({ code: "unrecognized_keys", keys: o10, input: t10, inst: a10 }), e10.length) ? Promise.all(e10).then(() => r10) : r10;
      }
      let ab = rs("$ZodObject", (e10, t10) => {
        let r10;
        nR.init(e10, t10);
        let i10 = Object.getOwnPropertyDescriptor(t10, "shape");
        if (!i10?.get) {
          let e11 = t10.shape;
          Object.defineProperty(t10, "shape", { get: () => {
            let r11 = { ...e11 };
            return Object.defineProperty(t10, "shape", { value: r11 }), r11;
          } });
        }
        let n10 = rg(() => ah(t10));
        r$(e10._zod, "propValues", () => {
          let e11 = t10.shape, r11 = {};
          for (let t11 in e11) {
            let i11 = e11[t11]._zod;
            if (i11.values) for (let e12 of (r11[t11] ?? (r11[t11] = /* @__PURE__ */ new Set()), i11.values)) r11[t11].add(e12);
          }
          return r11;
        });
        let a10 = t10.catchall;
        e10._zod.parse = (t11, i11) => {
          r10 ?? (r10 = n10.value);
          let o10 = t11.value;
          if (!rO(o10)) return t11.issues.push({ expected: "object", code: "invalid_type", input: o10, inst: e10 }), t11;
          t11.value = {};
          let s10 = [], u10 = r10.shape;
          for (let e11 of r10.keys) {
            let r11 = u10[e11], n11 = "optional" === r11._zod.optin, a11 = "optional" === r11._zod.optout, l10 = r11._zod.run({ value: o10[e11], issues: [] }, i11);
            l10 instanceof Promise ? s10.push(l10.then((r12) => ag(r12, t11, e11, o10, n11, a11))) : ag(l10, t11, e11, o10, n11, a11);
          }
          return a10 ? a_(s10, o10, t11, i11, n10.value, e10) : s10.length ? Promise.all(s10).then(() => t11) : t11;
        };
      }), ay = rs("$ZodObjectJIT", (e10, t10) => {
        let r10, i10;
        ab.init(e10, t10);
        let n10 = e10._zod.parse, a10 = rg(() => ah(t10)), o10 = !rc.jitless, s10 = o10 && rE.value, u10 = t10.catchall;
        e10._zod.parse = (l10, d10) => {
          i10 ?? (i10 = a10.value);
          let c10 = l10.value;
          return rO(c10) ? o10 && s10 && d10?.async === false && true !== d10.jitless ? (r10 || (r10 = ((e11) => {
            let t11 = new nz(["shape", "payload", "ctx"]), r11 = a10.value, i11 = (e12) => {
              let t12 = rk(e12);
              return `shape[${t12}]._zod.run({ value: input[${t12}], issues: [] }, ctx)`;
            };
            t11.write("const input = payload.value;");
            let n11 = /* @__PURE__ */ Object.create(null), o11 = 0;
            for (let e12 of r11.keys) n11[e12] = `key_${o11++}`;
            for (let a11 of (t11.write("const newResult = {};"), r11.keys)) {
              let r12 = n11[a11], o12 = rk(a11), s12 = e11[a11], u11 = s12?._zod?.optin === "optional", l11 = s12?._zod?.optout === "optional";
              t11.write(`const ${r12} = ${i11(a11)};`), u11 && l11 ? t11.write(`
        if (${r12}.issues.length) {
          if (${o12} in input) {
            payload.issues = payload.issues.concat(${r12}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o12}, ...iss.path] : [${o12}]
            })));
          }
        }
        
        if (${r12}.value === undefined) {
          if (${o12} in input) {
            newResult[${o12}] = undefined;
          }
        } else {
          newResult[${o12}] = ${r12}.value;
        }
        
      `) : u11 ? t11.write(`
        if (${r12}.issues.length) {
          payload.issues = payload.issues.concat(${r12}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o12}, ...iss.path] : [${o12}]
          })));
        }
        
        if (${r12}.value === undefined) {
          if (${o12} in input) {
            newResult[${o12}] = undefined;
          }
        } else {
          newResult[${o12}] = ${r12}.value;
        }
        
      `) : t11.write(`
        const ${r12}_present = ${o12} in input;
        if (${r12}.issues.length) {
          payload.issues = payload.issues.concat(${r12}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o12}, ...iss.path] : [${o12}]
          })));
        }
        if (!${r12}_present && !${r12}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o12}]
          });
        }

        if (${r12}_present) {
          if (${r12}.value === undefined) {
            newResult[${o12}] = undefined;
          } else {
            newResult[${o12}] = ${r12}.value;
          }
        }

      `);
            }
            t11.write("payload.value = newResult;"), t11.write("return payload;");
            let s11 = t11.compile();
            return (t12, r12) => s11(e11, t12, r12);
          })(t10.shape)), l10 = r10(l10, d10), u10) ? a_([], c10, l10, d10, i10, e10) : l10 : n10(l10, d10) : (l10.issues.push({ expected: "object", code: "invalid_type", input: c10, inst: e10 }), l10);
        };
      });
      function a$(e10, t10, r10, i10) {
        for (let r11 of e10) if (0 === r11.issues.length) return t10.value = r11.value, t10;
        let n10 = e10.filter((e11) => !rL(e11));
        return 1 === n10.length ? (t10.value = n10[0].value, n10[0]) : (t10.issues.push({ code: "invalid_union", input: t10.value, inst: r10, errors: e10.map((e11) => e11.issues.map((e12) => rB(e12, i10, rf()))) }), t10);
      }
      let ax = rs("$ZodUnion", (e10, t10) => {
        nR.init(e10, t10), r$(e10._zod, "optin", () => t10.options.some((e11) => "optional" === e11._zod.optin) ? "optional" : void 0), r$(e10._zod, "optout", () => t10.options.some((e11) => "optional" === e11._zod.optout) ? "optional" : void 0), r$(e10._zod, "values", () => {
          if (t10.options.every((e11) => e11._zod.values)) return new Set(t10.options.flatMap((e11) => Array.from(e11._zod.values)));
        }), r$(e10._zod, "pattern", () => {
          if (t10.options.every((e11) => e11._zod.pattern)) {
            let e11 = t10.options.map((e12) => e12._zod.pattern);
            return RegExp(`^(${e11.map((e12) => r_(e12.source)).join("|")})$`);
          }
        });
        let r10 = 1 === t10.options.length ? t10.options[0]._zod.run : null;
        e10._zod.parse = (i10, n10) => {
          if (r10) return r10(i10, n10);
          let a10 = false, o10 = [];
          for (let e11 of t10.options) {
            let t11 = e11._zod.run({ value: i10.value, issues: [] }, n10);
            if (t11 instanceof Promise) o10.push(t11), a10 = true;
            else {
              if (0 === t11.issues.length) return t11;
              o10.push(t11);
            }
          }
          return a10 ? Promise.all(o10).then((t11) => a$(t11, i10, e10, n10)) : a$(o10, i10, e10, n10);
        };
      });
      function aw(e10, t10, r10, i10) {
        let n10 = e10.filter((e11) => 0 === e11.issues.length);
        return 1 === n10.length ? t10.value = n10[0].value : 0 === n10.length ? t10.issues.push({ code: "invalid_union", input: t10.value, inst: r10, errors: e10.map((e11) => e11.issues.map((e12) => rB(e12, i10, rf()))) }) : t10.issues.push({ code: "invalid_union", input: t10.value, inst: r10, errors: [], inclusive: false }), t10;
      }
      let ak = rs("$ZodXor", (e10, t10) => {
        ax.init(e10, t10), t10.inclusive = false;
        let r10 = 1 === t10.options.length ? t10.options[0]._zod.run : null;
        e10._zod.parse = (i10, n10) => {
          if (r10) return r10(i10, n10);
          let a10 = false, o10 = [];
          for (let e11 of t10.options) {
            let t11 = e11._zod.run({ value: i10.value, issues: [] }, n10);
            t11 instanceof Promise ? (o10.push(t11), a10 = true) : o10.push(t11);
          }
          return a10 ? Promise.all(o10).then((t11) => aw(t11, i10, e10, n10)) : aw(o10, i10, e10, n10);
        };
      }), aS = rs("$ZodDiscriminatedUnion", (e10, t10) => {
        t10.inclusive = false, ax.init(e10, t10);
        let r10 = e10._zod.parse;
        r$(e10._zod, "propValues", () => {
          let e11 = {};
          for (let r11 of t10.options) {
            let i11 = r11._zod.propValues;
            if (!i11 || 0 === Object.keys(i11).length) throw Error(`Invalid discriminated union option at index "${t10.options.indexOf(r11)}"`);
            for (let [t11, r12] of Object.entries(i11)) for (let i12 of (e11[t11] || (e11[t11] = /* @__PURE__ */ new Set()), r12)) e11[t11].add(i12);
          }
          return e11;
        });
        let i10 = rg(() => {
          let e11 = t10.options, r11 = /* @__PURE__ */ new Map();
          for (let i11 of e11) {
            let e12 = i11._zod.propValues?.[t10.discriminator];
            if (!e12 || 0 === e12.size) throw Error(`Invalid discriminated union option at index "${t10.options.indexOf(i11)}"`);
            for (let t11 of e12) {
              if (r11.has(t11)) throw Error(`Duplicate discriminator value "${String(t11)}"`);
              r11.set(t11, i11);
            }
          }
          return r11;
        });
        e10._zod.parse = (n10, a10) => {
          let o10 = n10.value;
          if (!rO(o10)) return n10.issues.push({ code: "invalid_type", expected: "object", input: o10, inst: e10 }), n10;
          let s10 = i10.value.get(o10?.[t10.discriminator]);
          return s10 ? s10._zod.run(n10, a10) : t10.unionFallback || "backward" === a10.direction ? r10(n10, a10) : (n10.issues.push({ code: "invalid_union", errors: [], note: "No matching discriminator", discriminator: t10.discriminator, options: Array.from(i10.value.keys()), input: o10, path: [t10.discriminator], inst: e10 }), n10);
        };
      }), aI = rs("$ZodIntersection", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (e11, r10) => {
          let i10 = e11.value, n10 = t10.left._zod.run({ value: i10, issues: [] }, r10), a10 = t10.right._zod.run({ value: i10, issues: [] }, r10);
          return n10 instanceof Promise || a10 instanceof Promise ? Promise.all([n10, a10]).then(([t11, r11]) => aO(e11, t11, r11)) : aO(e11, n10, a10);
        };
      });
      function aO(e10, t10, r10) {
        let i10, n10 = /* @__PURE__ */ new Map();
        for (let r11 of t10.issues) if ("unrecognized_keys" === r11.code) for (let e11 of (i10 ?? (i10 = r11), r11.keys)) n10.has(e11) || n10.set(e11, {}), n10.get(e11).l = true;
        else e10.issues.push(r11);
        for (let t11 of r10.issues) if ("unrecognized_keys" === t11.code) for (let e11 of t11.keys) n10.has(e11) || n10.set(e11, {}), n10.get(e11).r = true;
        else e10.issues.push(t11);
        let a10 = [...n10].filter(([, e11]) => e11.l && e11.r).map(([e11]) => e11);
        if (a10.length && i10 && e10.issues.push({ ...i10, keys: a10 }), rL(e10)) return e10;
        let o10 = function e11(t11, r11) {
          if (t11 === r11 || t11 instanceof Date && r11 instanceof Date && +t11 == +r11) return { valid: true, data: t11 };
          if (rP(t11) && rP(r11)) {
            let i11 = Object.keys(r11), n11 = Object.keys(t11).filter((e12) => -1 !== i11.indexOf(e12)), a11 = { ...t11, ...r11 };
            for (let i12 of n11) {
              let n12 = e11(t11[i12], r11[i12]);
              if (!n12.valid) return { valid: false, mergeErrorPath: [i12, ...n12.mergeErrorPath] };
              a11[i12] = n12.data;
            }
            return { valid: true, data: a11 };
          }
          if (Array.isArray(t11) && Array.isArray(r11)) {
            if (t11.length !== r11.length) return { valid: false, mergeErrorPath: [] };
            let i11 = [];
            for (let n11 = 0; n11 < t11.length; n11++) {
              let a11 = e11(t11[n11], r11[n11]);
              if (!a11.valid) return { valid: false, mergeErrorPath: [n11, ...a11.mergeErrorPath] };
              i11.push(a11.data);
            }
            return { valid: true, data: i11 };
          }
          return { valid: false, mergeErrorPath: [] };
        }(t10.value, r10.value);
        if (!o10.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o10.mergeErrorPath)}`);
        return e10.value = o10.data, e10;
      }
      let aE = rs("$ZodTuple", (e10, t10) => {
        nR.init(e10, t10);
        let r10 = t10.items;
        e10._zod.parse = (i10, n10) => {
          let a10 = i10.value;
          if (!Array.isArray(a10)) return i10.issues.push({ input: a10, inst: e10, expected: "tuple", code: "invalid_type" }), i10;
          i10.value = [];
          let o10 = [], s10 = aP(r10, "optin"), u10 = aP(r10, "optout");
          if (!t10.rest) {
            if (a10.length < s10) return i10.issues.push({ code: "too_small", minimum: s10, inclusive: true, input: a10, inst: e10, origin: "array" }), i10;
            a10.length > r10.length && i10.issues.push({ code: "too_big", maximum: r10.length, inclusive: true, input: a10, inst: e10, origin: "array" });
          }
          let l10 = Array(r10.length);
          for (let e11 = 0; e11 < r10.length; e11++) {
            let t11 = r10[e11]._zod.run({ value: a10[e11], issues: [] }, n10);
            t11 instanceof Promise ? o10.push(t11.then((t12) => {
              l10[e11] = t12;
            })) : l10[e11] = t11;
          }
          if (t10.rest) {
            let e11 = r10.length - 1;
            for (let s11 of a10.slice(r10.length)) {
              e11++;
              let r11 = t10.rest._zod.run({ value: s11, issues: [] }, n10);
              r11 instanceof Promise ? o10.push(r11.then((t11) => aT(t11, i10, e11))) : aT(r11, i10, e11);
            }
          }
          return o10.length ? Promise.all(o10).then(() => aN(l10, i10, r10, a10, u10)) : aN(l10, i10, r10, a10, u10);
        };
      });
      function aP(e10, t10) {
        for (let r10 = e10.length - 1; r10 >= 0; r10--) if ("optional" !== e10[r10]._zod[t10]) return r10 + 1;
        return 0;
      }
      function aT(e10, t10, r10) {
        e10.issues.length && t10.issues.push(...rF(r10, e10.issues)), t10.value[r10] = e10.value;
      }
      function aN(e10, t10, r10, i10, n10) {
        for (let a10 = 0; a10 < r10.length; a10++) {
          let r11 = e10[a10], o10 = a10 < i10.length;
          if (r11.issues.length) {
            if (!o10 && a10 >= n10) {
              t10.value.length = a10;
              break;
            }
            t10.issues.push(...rF(a10, r11.issues));
          }
          t10.value[a10] = r11.value;
        }
        for (let e11 = t10.value.length - 1; e11 >= i10.length; e11--) if ("optional" === r10[e11]._zod.optout && void 0 === t10.value[e11]) t10.value.length = e11;
        else break;
        return t10;
      }
      let az = rs("$ZodRecord", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (r10, i10) => {
          let n10 = r10.value;
          if (!rP(n10)) return r10.issues.push({ expected: "record", code: "invalid_type", input: n10, inst: e10 }), r10;
          let a10 = [], o10 = t10.keyType._zod.values;
          if (o10) {
            let s10;
            r10.value = {};
            let u10 = /* @__PURE__ */ new Set();
            for (let s11 of o10) if ("string" == typeof s11 || "number" == typeof s11 || "symbol" == typeof s11) {
              u10.add("number" == typeof s11 ? s11.toString() : s11);
              let o11 = t10.keyType._zod.run({ value: s11, issues: [] }, i10);
              if (o11 instanceof Promise) throw Error("Async schemas not supported in object keys currently");
              if (o11.issues.length) {
                r10.issues.push({ code: "invalid_key", origin: "record", issues: o11.issues.map((e11) => rB(e11, i10, rf())), input: s11, path: [s11], inst: e10 });
                continue;
              }
              let l10 = o11.value, d10 = t10.valueType._zod.run({ value: n10[s11], issues: [] }, i10);
              d10 instanceof Promise ? a10.push(d10.then((e11) => {
                e11.issues.length && r10.issues.push(...rF(s11, e11.issues)), r10.value[l10] = e11.value;
              })) : (d10.issues.length && r10.issues.push(...rF(s11, d10.issues)), r10.value[l10] = d10.value);
            }
            for (let e11 in n10) u10.has(e11) || (s10 = s10 ?? []).push(e11);
            s10 && s10.length > 0 && r10.issues.push({ code: "unrecognized_keys", input: n10, inst: e10, keys: s10 });
          } else for (let o11 of (r10.value = {}, Reflect.ownKeys(n10))) {
            if ("__proto__" === o11 || !Object.prototype.propertyIsEnumerable.call(n10, o11)) continue;
            let s10 = t10.keyType._zod.run({ value: o11, issues: [] }, i10);
            if (s10 instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o11 && i0.test(o11) && s10.issues.length) {
              let e11 = t10.keyType._zod.run({ value: Number(o11), issues: [] }, i10);
              if (e11 instanceof Promise) throw Error("Async schemas not supported in object keys currently");
              0 === e11.issues.length && (s10 = e11);
            }
            if (s10.issues.length) {
              "loose" === t10.mode ? r10.value[o11] = n10[o11] : r10.issues.push({ code: "invalid_key", origin: "record", issues: s10.issues.map((e11) => rB(e11, i10, rf())), input: o11, path: [o11], inst: e10 });
              continue;
            }
            let u10 = t10.valueType._zod.run({ value: n10[o11], issues: [] }, i10);
            u10 instanceof Promise ? a10.push(u10.then((e11) => {
              e11.issues.length && r10.issues.push(...rF(o11, e11.issues)), r10.value[s10.value] = e11.value;
            })) : (u10.issues.length && r10.issues.push(...rF(o11, u10.issues)), r10.value[s10.value] = u10.value);
          }
          return a10.length ? Promise.all(a10).then(() => r10) : r10;
        };
      }), aC = rs("$ZodMap", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (r10, i10) => {
          let n10 = r10.value;
          if (!(n10 instanceof Map)) return r10.issues.push({ expected: "map", code: "invalid_type", input: n10, inst: e10 }), r10;
          let a10 = [];
          for (let [o10, s10] of (r10.value = /* @__PURE__ */ new Map(), n10)) {
            let u10 = t10.keyType._zod.run({ value: o10, issues: [] }, i10), l10 = t10.valueType._zod.run({ value: s10, issues: [] }, i10);
            u10 instanceof Promise || l10 instanceof Promise ? a10.push(Promise.all([u10, l10]).then(([t11, a11]) => {
              aR(t11, a11, r10, o10, n10, e10, i10);
            })) : aR(u10, l10, r10, o10, n10, e10, i10);
          }
          return a10.length ? Promise.all(a10).then(() => r10) : r10;
        };
      });
      function aR(e10, t10, r10, i10, n10, a10, o10) {
        e10.issues.length && (rN.has(typeof i10) ? r10.issues.push(...rF(i10, e10.issues)) : r10.issues.push({ code: "invalid_key", origin: "map", input: n10, inst: a10, issues: e10.issues.map((e11) => rB(e11, o10, rf())) })), t10.issues.length && (rN.has(typeof i10) ? r10.issues.push(...rF(i10, t10.issues)) : r10.issues.push({ origin: "map", code: "invalid_element", input: n10, inst: a10, key: i10, issues: t10.issues.map((e11) => rB(e11, o10, rf())) })), r10.value.set(e10.value, t10.value);
      }
      let aU = rs("$ZodSet", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (r10, i10) => {
          let n10 = r10.value;
          if (!(n10 instanceof Set)) return r10.issues.push({ input: n10, inst: e10, expected: "set", code: "invalid_type" }), r10;
          let a10 = [];
          for (let e11 of (r10.value = /* @__PURE__ */ new Set(), n10)) {
            let n11 = t10.valueType._zod.run({ value: e11, issues: [] }, i10);
            n11 instanceof Promise ? a10.push(n11.then((e12) => aj(e12, r10))) : aj(n11, r10);
          }
          return a10.length ? Promise.all(a10).then(() => r10) : r10;
        };
      });
      function aj(e10, t10) {
        e10.issues.length && t10.issues.push(...e10.issues), t10.value.add(e10.value);
      }
      let aD = rs("$ZodEnum", (e10, t10) => {
        nR.init(e10, t10);
        let r10 = rm(t10.entries), i10 = new Set(r10);
        e10._zod.values = i10, e10._zod.pattern = RegExp(`^(${r10.filter((e11) => rN.has(typeof e11)).map((e11) => "string" == typeof e11 ? rC(e11) : e11.toString()).join("|")})$`), e10._zod.parse = (t11, n10) => {
          let a10 = t11.value;
          return i10.has(a10) || t11.issues.push({ code: "invalid_value", values: r10, input: a10, inst: e10 }), t11;
        };
      }), aA = rs("$ZodLiteral", (e10, t10) => {
        if (nR.init(e10, t10), 0 === t10.values.length) throw Error("Cannot create literal schema with no valid values");
        let r10 = new Set(t10.values);
        e10._zod.values = r10, e10._zod.pattern = RegExp(`^(${t10.values.map((e11) => "string" == typeof e11 ? rC(e11) : e11 ? rC(e11.toString()) : String(e11)).join("|")})$`), e10._zod.parse = (i10, n10) => {
          let a10 = i10.value;
          return r10.has(a10) || i10.issues.push({ code: "invalid_value", values: t10.values, input: a10, inst: e10 }), i10;
        };
      }), aZ = rs("$ZodFile", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (t11, r10) => {
          let i10 = t11.value;
          return i10 instanceof File || t11.issues.push({ expected: "file", code: "invalid_type", input: i10, inst: e10 }), t11;
        };
      }), aL = rs("$ZodTransform", (e10, t10) => {
        nR.init(e10, t10), e10._zod.optin = "optional", e10._zod.parse = (r10, i10) => {
          if ("backward" === i10.direction) throw new rd(e10.constructor.name);
          let n10 = t10.transform(r10.value, r10);
          if (i10.async) return (n10 instanceof Promise ? n10 : Promise.resolve(n10)).then((e11) => (r10.value = e11, r10.fallback = true, r10));
          if (n10 instanceof Promise) throw new rl();
          return r10.value = n10, r10.fallback = true, r10;
        };
      });
      function aM(e10, t10) {
        return void 0 === t10 && (e10.issues.length || e10.fallback) ? { issues: [], value: void 0 } : e10;
      }
      let aF = rs("$ZodOptional", (e10, t10) => {
        nR.init(e10, t10), e10._zod.optin = "optional", e10._zod.optout = "optional", r$(e10._zod, "values", () => t10.innerType._zod.values ? /* @__PURE__ */ new Set([...t10.innerType._zod.values, void 0]) : void 0), r$(e10._zod, "pattern", () => {
          let e11 = t10.innerType._zod.pattern;
          return e11 ? RegExp(`^(${r_(e11.source)})?$`) : void 0;
        }), e10._zod.parse = (e11, r10) => {
          if ("optional" === t10.innerType._zod.optin) {
            let i10 = e11.value, n10 = t10.innerType._zod.run(e11, r10);
            return n10 instanceof Promise ? n10.then((e12) => aM(e12, i10)) : aM(n10, i10);
          }
          return void 0 === e11.value ? e11 : t10.innerType._zod.run(e11, r10);
        };
      }), aJ = rs("$ZodExactOptional", (e10, t10) => {
        aF.init(e10, t10), r$(e10._zod, "values", () => t10.innerType._zod.values), r$(e10._zod, "pattern", () => t10.innerType._zod.pattern), e10._zod.parse = (e11, r10) => t10.innerType._zod.run(e11, r10);
      }), aB = rs("$ZodNullable", (e10, t10) => {
        nR.init(e10, t10), r$(e10._zod, "optin", () => t10.innerType._zod.optin), r$(e10._zod, "optout", () => t10.innerType._zod.optout), r$(e10._zod, "pattern", () => {
          let e11 = t10.innerType._zod.pattern;
          return e11 ? RegExp(`^(${r_(e11.source)}|null)$`) : void 0;
        }), r$(e10._zod, "values", () => t10.innerType._zod.values ? /* @__PURE__ */ new Set([...t10.innerType._zod.values, null]) : void 0), e10._zod.parse = (e11, r10) => null === e11.value ? e11 : t10.innerType._zod.run(e11, r10);
      }), aq = rs("$ZodDefault", (e10, t10) => {
        nR.init(e10, t10), e10._zod.optin = "optional", r$(e10._zod, "values", () => t10.innerType._zod.values), e10._zod.parse = (e11, r10) => {
          if ("backward" === r10.direction) return t10.innerType._zod.run(e11, r10);
          if (void 0 === e11.value) return e11.value = t10.defaultValue, e11;
          let i10 = t10.innerType._zod.run(e11, r10);
          return i10 instanceof Promise ? i10.then((e12) => aV(e12, t10)) : aV(i10, t10);
        };
      });
      function aV(e10, t10) {
        return void 0 === e10.value && (e10.value = t10.defaultValue), e10;
      }
      let aG = rs("$ZodPrefault", (e10, t10) => {
        nR.init(e10, t10), e10._zod.optin = "optional", r$(e10._zod, "values", () => t10.innerType._zod.values), e10._zod.parse = (e11, r10) => ("backward" === r10.direction || void 0 === e11.value && (e11.value = t10.defaultValue), t10.innerType._zod.run(e11, r10));
      }), aW = rs("$ZodNonOptional", (e10, t10) => {
        nR.init(e10, t10), r$(e10._zod, "values", () => {
          let e11 = t10.innerType._zod.values;
          return e11 ? new Set([...e11].filter((e12) => void 0 !== e12)) : void 0;
        }), e10._zod.parse = (r10, i10) => {
          let n10 = t10.innerType._zod.run(r10, i10);
          return n10 instanceof Promise ? n10.then((t11) => aX(t11, e10)) : aX(n10, e10);
        };
      });
      function aX(e10, t10) {
        return e10.issues.length || void 0 !== e10.value || e10.issues.push({ code: "invalid_type", expected: "nonoptional", input: e10.value, inst: t10 }), e10;
      }
      let aH = rs("$ZodSuccess", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (e11, r10) => {
          if ("backward" === r10.direction) throw new rd("ZodSuccess");
          let i10 = t10.innerType._zod.run(e11, r10);
          return i10 instanceof Promise ? i10.then((t11) => (e11.value = 0 === t11.issues.length, e11)) : (e11.value = 0 === i10.issues.length, e11);
        };
      }), aK = rs("$ZodCatch", (e10, t10) => {
        nR.init(e10, t10), e10._zod.optin = "optional", r$(e10._zod, "optout", () => t10.innerType._zod.optout), r$(e10._zod, "values", () => t10.innerType._zod.values), e10._zod.parse = (e11, r10) => {
          if ("backward" === r10.direction) return t10.innerType._zod.run(e11, r10);
          let i10 = t10.innerType._zod.run(e11, r10);
          return i10 instanceof Promise ? i10.then((i11) => (e11.value = i11.value, i11.issues.length && (e11.value = t10.catchValue({ ...e11, error: { issues: i11.issues.map((e12) => rB(e12, r10, rf())) }, input: e11.value }), e11.issues = [], e11.fallback = true), e11)) : (e11.value = i10.value, i10.issues.length && (e11.value = t10.catchValue({ ...e11, error: { issues: i10.issues.map((e12) => rB(e12, r10, rf())) }, input: e11.value }), e11.issues = [], e11.fallback = true), e11);
        };
      }), aY = rs("$ZodNaN", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (t11, r10) => ("number" == typeof t11.value && Number.isNaN(t11.value) || t11.issues.push({ input: t11.value, inst: e10, expected: "nan", code: "invalid_type" }), t11);
      }), aQ = rs("$ZodPipe", (e10, t10) => {
        nR.init(e10, t10), r$(e10._zod, "values", () => t10.in._zod.values), r$(e10._zod, "optin", () => t10.in._zod.optin), r$(e10._zod, "optout", () => t10.out._zod.optout), r$(e10._zod, "propValues", () => t10.in._zod.propValues), e10._zod.parse = (e11, r10) => {
          if ("backward" === r10.direction) {
            let i11 = t10.out._zod.run(e11, r10);
            return i11 instanceof Promise ? i11.then((e12) => a0(e12, t10.in, r10)) : a0(i11, t10.in, r10);
          }
          let i10 = t10.in._zod.run(e11, r10);
          return i10 instanceof Promise ? i10.then((e12) => a0(e12, t10.out, r10)) : a0(i10, t10.out, r10);
        };
      });
      function a0(e10, t10, r10) {
        return e10.issues.length ? (e10.aborted = true, e10) : t10._zod.run({ value: e10.value, issues: e10.issues, fallback: e10.fallback }, r10);
      }
      let a1 = rs("$ZodCodec", (e10, t10) => {
        nR.init(e10, t10), r$(e10._zod, "values", () => t10.in._zod.values), r$(e10._zod, "optin", () => t10.in._zod.optin), r$(e10._zod, "optout", () => t10.out._zod.optout), r$(e10._zod, "propValues", () => t10.in._zod.propValues), e10._zod.parse = (e11, r10) => {
          if ("forward" === (r10.direction || "forward")) {
            let i10 = t10.in._zod.run(e11, r10);
            return i10 instanceof Promise ? i10.then((e12) => a4(e12, t10, r10)) : a4(i10, t10, r10);
          }
          {
            let i10 = t10.out._zod.run(e11, r10);
            return i10 instanceof Promise ? i10.then((e12) => a4(e12, t10, r10)) : a4(i10, t10, r10);
          }
        };
      });
      function a4(e10, t10, r10) {
        if (e10.issues.length) return e10.aborted = true, e10;
        if ("forward" === (r10.direction || "forward")) {
          let i10 = t10.transform(e10.value, e10);
          return i10 instanceof Promise ? i10.then((i11) => a6(e10, i11, t10.out, r10)) : a6(e10, i10, t10.out, r10);
        }
        {
          let i10 = t10.reverseTransform(e10.value, e10);
          return i10 instanceof Promise ? i10.then((i11) => a6(e10, i11, t10.in, r10)) : a6(e10, i10, t10.in, r10);
        }
      }
      function a6(e10, t10, r10, i10) {
        return e10.issues.length ? (e10.aborted = true, e10) : r10._zod.run({ value: t10, issues: e10.issues }, i10);
      }
      let a2 = rs("$ZodPreprocess", (e10, t10) => {
        aQ.init(e10, t10);
      }), a9 = rs("$ZodReadonly", (e10, t10) => {
        nR.init(e10, t10), r$(e10._zod, "propValues", () => t10.innerType._zod.propValues), r$(e10._zod, "values", () => t10.innerType._zod.values), r$(e10._zod, "optin", () => t10.innerType?._zod?.optin), r$(e10._zod, "optout", () => t10.innerType?._zod?.optout), e10._zod.parse = (e11, r10) => {
          if ("backward" === r10.direction) return t10.innerType._zod.run(e11, r10);
          let i10 = t10.innerType._zod.run(e11, r10);
          return i10 instanceof Promise ? i10.then(a3) : a3(i10);
        };
      });
      function a3(e10) {
        return e10.value = Object.freeze(e10.value), e10;
      }
      let a7 = rs("$ZodTemplateLiteral", (e10, t10) => {
        nR.init(e10, t10);
        let r10 = [];
        for (let e11 of t10.parts) if ("object" == typeof e11 && null !== e11) {
          if (!e11._zod.pattern) throw Error(`Invalid template literal part, no pattern found: ${[...e11._zod.traits].shift()}`);
          let t11 = e11._zod.pattern instanceof RegExp ? e11._zod.pattern.source : e11._zod.pattern;
          if (!t11) throw Error(`Invalid template literal part: ${e11._zod.traits}`);
          let i10 = +!!t11.startsWith("^"), n10 = t11.endsWith("$") ? t11.length - 1 : t11.length;
          r10.push(t11.slice(i10, n10));
        } else if (null === e11 || rz.has(typeof e11)) r10.push(rC(`${e11}`));
        else throw Error(`Invalid template literal part: ${e11}`);
        e10._zod.pattern = RegExp(`^${r10.join("")}$`), e10._zod.parse = (r11, i10) => ("string" != typeof r11.value ? r11.issues.push({ input: r11.value, inst: e10, expected: "string", code: "invalid_type" }) : (e10._zod.pattern.lastIndex = 0, e10._zod.pattern.test(r11.value) || r11.issues.push({ input: r11.value, inst: e10, code: "invalid_format", format: t10.format ?? "template_literal", pattern: e10._zod.pattern.source })), r11);
      }), a5 = rs("$ZodFunction", (e10, t10) => (nR.init(e10, t10), e10._def = t10, e10._zod.def = t10, e10.implement = (t11) => {
        if ("function" != typeof t11) throw Error("implement() must be called with a function");
        return function(...r10) {
          let i10 = Reflect.apply(t11, this, e10._def.input ? r7(e10._def.input, r10) : r10);
          return e10._def.output ? r7(e10._def.output, i10) : i10;
        };
      }, e10.implementAsync = (t11) => {
        if ("function" != typeof t11) throw Error("implementAsync() must be called with a function");
        return async function(...r10) {
          let i10 = e10._def.input ? await r8(e10._def.input, r10) : r10, n10 = await Reflect.apply(t11, this, i10);
          return e10._def.output ? await r8(e10._def.output, n10) : n10;
        };
      }, e10._zod.parse = (t11, r10) => ("function" != typeof t11.value ? t11.issues.push({ code: "invalid_type", expected: "function", input: t11.value, inst: e10 }) : e10._def.output && "promise" === e10._def.output._zod.def.type ? t11.value = e10.implementAsync(t11.value) : t11.value = e10.implement(t11.value), t11), e10.input = (...t11) => {
        let r10 = e10.constructor;
        return new r10(Array.isArray(t11[0]) ? { type: "function", input: new aE({ type: "tuple", items: t11[0], rest: t11[1] }), output: e10._def.output } : { type: "function", input: t11[0], output: e10._def.output });
      }, e10.output = (t11) => new e10.constructor({ type: "function", input: e10._def.input, output: t11 }), e10)), a8 = rs("$ZodPromise", (e10, t10) => {
        nR.init(e10, t10), e10._zod.parse = (e11, r10) => Promise.resolve(e11.value).then((e12) => t10.innerType._zod.run({ value: e12, issues: [] }, r10));
      }), oe = rs("$ZodLazy", (e10, t10) => {
        nR.init(e10, t10), r$(e10._zod, "innerType", () => (t10._cachedInner || (t10._cachedInner = t10.getter()), t10._cachedInner)), r$(e10._zod, "pattern", () => e10._zod.innerType?._zod?.pattern), r$(e10._zod, "propValues", () => e10._zod.innerType?._zod?.propValues), r$(e10._zod, "optin", () => e10._zod.innerType?._zod?.optin ?? void 0), r$(e10._zod, "optout", () => e10._zod.innerType?._zod?.optout ?? void 0), e10._zod.parse = (t11, r10) => e10._zod.innerType._zod.run(t11, r10);
      }), ot = rs("$ZodCustom", (e10, t10) => {
        nu.init(e10, t10), nR.init(e10, t10), e10._zod.parse = (e11, t11) => e11, e10._zod.check = (r10) => {
          let i10 = r10.value, n10 = t10.fn(i10);
          if (n10 instanceof Promise) return n10.then((t11) => or(t11, r10, i10, e10));
          or(n10, r10, i10, e10);
        };
      });
      function or(e10, t10, r10, i10) {
        if (!e10) {
          let e11 = { code: "custom", input: r10, inst: i10, path: [...i10._zod.def.path ?? []], continue: !i10._zod.def.abort };
          i10._zod.def.params && (e11.params = i10._zod.def.params), t10.issues.push(rW(e11));
        }
      }
      e.s(["$ZodAny", 0, al, "$ZodArray", 0, av, "$ZodBase64", 0, n2, "$ZodBase64URL", 0, n3, "$ZodBigInt", 0, an, "$ZodBigIntFormat", 0, aa, "$ZodBoolean", 0, ai, "$ZodCIDRv4", 0, n1, "$ZodCIDRv6", 0, n4, "$ZodCUID", 0, nJ, "$ZodCUID2", 0, nB, "$ZodCatch", 0, aK, "$ZodCodec", 0, a1, "$ZodCustom", 0, ot, "$ZodCustomStringFormat", 0, ae, "$ZodDate", 0, am, "$ZodDefault", 0, aq, "$ZodDiscriminatedUnion", 0, aS, "$ZodE164", 0, n7, "$ZodEmail", 0, nZ, "$ZodEmoji", 0, nM, "$ZodEnum", 0, aD, "$ZodExactOptional", 0, aJ, "$ZodFile", 0, aZ, "$ZodFunction", 0, a5, "$ZodGUID", 0, nD, "$ZodIPv4", 0, nY, "$ZodIPv6", 0, nQ, "$ZodISODate", 0, nX, "$ZodISODateTime", 0, nW, "$ZodISODuration", 0, nK, "$ZodISOTime", 0, nH, "$ZodIntersection", 0, aI, "$ZodJWT", 0, n8, "$ZodKSUID", 0, nG, "$ZodLazy", 0, oe, "$ZodLiteral", 0, aA, "$ZodMAC", 0, n0, "$ZodMap", 0, aC, "$ZodNaN", 0, aY, "$ZodNanoID", 0, nF, "$ZodNever", 0, ac, "$ZodNonOptional", 0, aW, "$ZodNull", 0, au, "$ZodNullable", 0, aB, "$ZodNumber", 0, at, "$ZodNumberFormat", 0, ar, "$ZodObject", 0, ab, "$ZodObjectJIT", 0, ay, "$ZodOptional", 0, aF, "$ZodPipe", 0, aQ, "$ZodPrefault", 0, aG, "$ZodPreprocess", 0, a2, "$ZodPromise", 0, a8, "$ZodReadonly", 0, a9, "$ZodRecord", 0, az, "$ZodSet", 0, aU, "$ZodString", 0, nU, "$ZodStringFormat", 0, nj, "$ZodSuccess", 0, aH, "$ZodSymbol", 0, ao, "$ZodTemplateLiteral", 0, a7, "$ZodTransform", 0, aL, "$ZodTuple", 0, aE, "$ZodType", 0, nR, "$ZodULID", 0, nq, "$ZodURL", 0, nL, "$ZodUUID", 0, nA, "$ZodUndefined", 0, as, "$ZodUnion", 0, ax, "$ZodUnknown", 0, ad, "$ZodVoid", 0, af, "$ZodXID", 0, nV, "$ZodXor", 0, ak, "isValidBase64", 0, n6, "isValidBase64URL", 0, n9, "isValidJWT", 0, n5], 25052), e.i(25052), e.s(["$ZodAny", 0, al, "$ZodArray", 0, av, "$ZodBase64", 0, n2, "$ZodBase64URL", 0, n3, "$ZodBigInt", 0, an, "$ZodBigIntFormat", 0, aa, "$ZodBoolean", 0, ai, "$ZodCIDRv4", 0, n1, "$ZodCIDRv6", 0, n4, "$ZodCUID", 0, nJ, "$ZodCUID2", 0, nB, "$ZodCatch", 0, aK, "$ZodCodec", 0, a1, "$ZodCustom", 0, ot, "$ZodCustomStringFormat", 0, ae, "$ZodDate", 0, am, "$ZodDefault", 0, aq, "$ZodDiscriminatedUnion", 0, aS, "$ZodE164", 0, n7, "$ZodEmail", 0, nZ, "$ZodEmoji", 0, nM, "$ZodEnum", 0, aD, "$ZodExactOptional", 0, aJ, "$ZodFile", 0, aZ, "$ZodFunction", 0, a5, "$ZodGUID", 0, nD, "$ZodIPv4", 0, nY, "$ZodIPv6", 0, nQ, "$ZodISODate", 0, nX, "$ZodISODateTime", 0, nW, "$ZodISODuration", 0, nK, "$ZodISOTime", 0, nH, "$ZodIntersection", 0, aI, "$ZodJWT", 0, n8, "$ZodKSUID", 0, nG, "$ZodLazy", 0, oe, "$ZodLiteral", 0, aA, "$ZodMAC", 0, n0, "$ZodMap", 0, aC, "$ZodNaN", 0, aY, "$ZodNanoID", 0, nF, "$ZodNever", 0, ac, "$ZodNonOptional", 0, aW, "$ZodNull", 0, au, "$ZodNullable", 0, aB, "$ZodNumber", 0, at, "$ZodNumberFormat", 0, ar, "$ZodObject", 0, ab, "$ZodObjectJIT", 0, ay, "$ZodOptional", 0, aF, "$ZodPipe", 0, aQ, "$ZodPrefault", 0, aG, "$ZodPreprocess", 0, a2, "$ZodPromise", 0, a8, "$ZodReadonly", 0, a9, "$ZodRecord", 0, az, "$ZodSet", 0, aU, "$ZodString", 0, nU, "$ZodStringFormat", 0, nj, "$ZodSuccess", 0, aH, "$ZodSymbol", 0, ao, "$ZodTemplateLiteral", 0, a7, "$ZodTransform", 0, aL, "$ZodTuple", 0, aE, "$ZodType", 0, nR, "$ZodULID", 0, nq, "$ZodURL", 0, nL, "$ZodUUID", 0, nA, "$ZodUndefined", 0, as, "$ZodUnion", 0, ax, "$ZodUnknown", 0, ad, "$ZodVoid", 0, af, "$ZodXID", 0, nV, "$ZodXor", 0, ak, "clone", 0, rR, "isValidBase64", 0, n6, "isValidBase64URL", 0, n9, "isValidJWT", 0, n5], 51862), e.i(51862), e.i(96846), e.i(21387);
      var oi = e.i(10795), on = e.i(64484);
      function oa(e10, t10, r10, i10) {
        let n10 = Math.abs(e10), a10 = n10 % 10, o10 = n10 % 100;
        return o10 >= 11 && o10 <= 19 ? i10 : 1 === a10 ? t10 : a10 >= 2 && a10 <= 4 ? r10 : i10;
      }
      function oo(e10, t10, r10) {
        return 1 === Math.abs(e10) ? t10 : r10;
      }
      function os(e10) {
        if (!e10) return "";
        let t10 = e10[e10.length - 1];
        return e10 + (["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"].includes(t10) ? "\u0576" : "\u0568");
      }
      function ou() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" } }, t10 = { regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B", email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B", url: "URL", emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO", date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO", time: "\u1798\u17C9\u17C4\u1784 ISO", duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO", ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4", ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6", cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4", cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6", base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64", base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url", json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON", e164: "\u179B\u17C1\u1781 E.164", jwt: "JWT", template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B" }, r10 = { nan: "NaN", number: "\u179B\u17C1\u1781", array: "\u17A2\u17B6\u179A\u17C1 (Array)", null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${i10.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${n10}`;
              return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${e11} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${rj(i10.values[0])}`;
              return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${i10.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${t11} ${i10.maximum.toString()} ${r11.unit ?? "\u1792\u17B6\u178F\u17BB"}`;
              return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${i10.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${t11} ${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${i10.origin} ${t11} ${i10.minimum.toString()} ${r11.unit}`;
              return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${i10.origin} ${t11} ${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${i10.includes}"`;
              if ("regex" === i10.format) return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${i10.pattern}`;
              return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${i10.divisor}`;
            case "unrecognized_keys":
              return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
            case "invalid_element":
              return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${i10.origin}`;
          }
        }) };
      }
      e.s([], 34086), e.i(34086);
      let ol = (e10) => e10.charAt(0).toUpperCase() + e10.slice(1);
      function od(e10) {
        let t10 = Math.abs(e10), r10 = t10 % 10, i10 = t10 % 100;
        return i10 >= 11 && i10 <= 19 || 0 === r10 ? "many" : 1 === r10 ? "one" : "few";
      }
      function oc(e10, t10, r10, i10) {
        let n10 = Math.abs(e10), a10 = n10 % 10, o10 = n10 % 100;
        return o10 >= 11 && o10 <= 19 ? i10 : 1 === a10 ? t10 : a10 >= 2 && a10 <= 4 ? r10 : i10;
      }
      function of() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" } }, t10 = { regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456", email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438", url: "URL", emoji: "\u0435\u043C\u043E\u0434\u0437\u0456", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO", date: "\u0434\u0430\u0442\u0430 ISO", time: "\u0447\u0430\u0441 ISO", duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO", ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4", ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6", cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4", cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6", base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64", base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url", json_string: "\u0440\u044F\u0434\u043E\u043A JSON", e164: "\u043D\u043E\u043C\u0435\u0440 E.164", jwt: "JWT", template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456" }, r10 = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0438\u0432" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${i10.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${n10}`;
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${e11}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${rj(i10.values[0])}`;
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${i10.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${r11.verb} ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`;
              return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${i10.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${i10.origin} ${r11.verb} ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${i10.origin} \u0431\u0443\u0434\u0435 ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${i10.includes}"`;
              if ("regex" === i10.format) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${i10.pattern}`;
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${i10.divisor}`;
            case "unrecognized_keys":
              return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${i10.keys.length > 1 ? "\u0456" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
            case "invalid_element":
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${i10.origin}`;
          }
        }) };
      }
      e.s(["ar", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" } }, t10 = { regex: "\u0645\u062F\u062E\u0644", email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A", url: "\u0631\u0627\u0628\u0637", emoji: "\u0625\u064A\u0645\u0648\u062C\u064A", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO", date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO", time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO", duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO", ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4", ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6", cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4", cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6", base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded", base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded", json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON", e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164", jwt: "JWT", template_literal: "\u0645\u062F\u062E\u0644" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${i10.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${n10}`;
              return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${e11}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${rj(i10.values[0])}`;
              return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${i10.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${t11} ${i10.maximum.toString()} ${r11.unit ?? "\u0639\u0646\u0635\u0631"}`;
              return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${i10.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${t11} ${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${i10.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${t11} ${i10.minimum.toString()} ${r11.unit}`;
              return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${i10.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${t11} ${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${i10.includes}"`;
              if ("regex" === i10.format) return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${i10.pattern}`;
              return `${t10[i10.format] ?? i10.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
            case "not_multiple_of":
              return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${i10.divisor}`;
            case "unrecognized_keys":
              return `\u0645\u0639\u0631\u0641${i10.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${i10.keys.length > 1 ? "\u0629" : ""}: ${rp(i10.keys, "\u060C ")}`;
            case "invalid_key":
              return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
            case "invalid_element":
              return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${i10.origin}`;
          }
        }) };
      }, "az", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "simvol", verb: "olmal\u0131d\u0131r" }, file: { unit: "bayt", verb: "olmal\u0131d\u0131r" }, array: { unit: "element", verb: "olmal\u0131d\u0131r" }, set: { unit: "element", verb: "olmal\u0131d\u0131r" } }, t10 = { regex: "input", email: "email address", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datetime", date: "ISO date", time: "ISO time", duration: "ISO duration", ipv4: "IPv4 address", ipv6: "IPv6 address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded string", base64url: "base64url-encoded string", json_string: "JSON string", e164: "E.164 number", jwt: "JWT", template_literal: "input" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${i10.expected}, daxil olan ${n10}`;
              return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${e11}, daxil olan ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${rj(i10.values[0])}`;
              return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${i10.origin ?? "d\u0259y\u0259r"} ${t11}${i10.maximum.toString()} ${r11.unit ?? "element"}`;
              return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${i10.origin ?? "d\u0259y\u0259r"} ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${i10.origin} ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${i10.origin} ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Yanl\u0131\u015F m\u0259tn: "${i10.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
              if ("ends_with" === i10.format) return `Yanl\u0131\u015F m\u0259tn: "${i10.suffix}" il\u0259 bitm\u0259lidir`;
              if ("includes" === i10.format) return `Yanl\u0131\u015F m\u0259tn: "${i10.includes}" daxil olmal\u0131d\u0131r`;
              if ("regex" === i10.format) return `Yanl\u0131\u015F m\u0259tn: ${i10.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
              return `Yanl\u0131\u015F ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Yanl\u0131\u015F \u0259d\u0259d: ${i10.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
            case "unrecognized_keys":
              return `Tan\u0131nmayan a\xE7ar${i10.keys.length > 1 ? "lar" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `${i10.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
            case "invalid_union":
            default:
              return "Yanl\u0131\u015F d\u0259y\u0259r";
            case "invalid_element":
              return `${i10.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
          }
        }) };
      }, "be", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: { one: "\u0441\u0456\u043C\u0432\u0430\u043B", few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B", many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, array: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, set: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, file: { unit: { one: "\u0431\u0430\u0439\u0442", few: "\u0431\u0430\u0439\u0442\u044B", many: "\u0431\u0430\u0439\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" } }, t10 = { regex: "\u0443\u0432\u043E\u0434", email: "email \u0430\u0434\u0440\u0430\u0441", url: "URL", emoji: "\u044D\u043C\u043E\u0434\u0437\u0456", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0447\u0430\u0441", duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C", ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441", cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D", base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64", base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url", json_string: "JSON \u0440\u0430\u0434\u043E\u043A", e164: "\u043D\u0443\u043C\u0430\u0440 E.164", jwt: "JWT", template_literal: "\u0443\u0432\u043E\u0434" }, r10 = { nan: "NaN", number: "\u043B\u0456\u043A", array: "\u043C\u0430\u0441\u0456\u045E" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${i10.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${n10}`;
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${e11}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${rj(i10.values[0])}`;
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) {
                let e11 = oa(Number(i10.maximum), r11.unit.one, r11.unit.few, r11.unit.many);
                return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${i10.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${r11.verb} ${t11}${i10.maximum.toString()} ${e11}`;
              }
              return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${i10.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) {
                let e11 = oa(Number(i10.minimum), r11.unit.one, r11.unit.few, r11.unit.many);
                return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${i10.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${r11.verb} ${t11}${i10.minimum.toString()} ${e11}`;
              }
              return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${i10.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${i10.includes}"`;
              if ("regex" === i10.format) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${i10.pattern}`;
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${i10.divisor}`;
            case "unrecognized_keys":
              return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${i10.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
            case "invalid_element":
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${i10.origin}`;
          }
        }) };
      }, "bg", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" } }, t10 = { regex: "\u0432\u0445\u043E\u0434", email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441", url: "URL", emoji: "\u0435\u043C\u043E\u0434\u0436\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0432\u0440\u0435\u043C\u0435", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0432\u0440\u0435\u043C\u0435", duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441", cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437", base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437", json_string: "JSON \u043D\u0438\u0437", e164: "E.164 \u043D\u043E\u043C\u0435\u0440", jwt: "JWT", template_literal: "\u0432\u0445\u043E\u0434" }, r10 = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0438\u0432" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${i10.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${n10}`;
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${e11}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${rj(i10.values[0])}`;
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${i10.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`;
              return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${i10.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${i10.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${i10.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format": {
              if ("starts_with" === i10.format) return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${i10.includes}"`;
              if ("regex" === i10.format) return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${i10.pattern}`;
              let e11 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
              return "emoji" === i10.format && (e11 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), "datetime" === i10.format && (e11 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), "date" === i10.format && (e11 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"), "time" === i10.format && (e11 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), "duration" === i10.format && (e11 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"), `${e11} ${t10[i10.format] ?? i10.format}`;
            }
            case "not_multiple_of":
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${i10.divisor}`;
            case "unrecognized_keys":
              return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${i10.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${i10.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
            case "invalid_element":
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${i10.origin}`;
          }
        }) };
      }, "ca", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "car\xE0cters", verb: "contenir" }, file: { unit: "bytes", verb: "contenir" }, array: { unit: "elements", verb: "contenir" }, set: { unit: "elements", verb: "contenir" } }, t10 = { regex: "entrada", email: "adre\xE7a electr\xF2nica", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data i hora ISO", date: "data ISO", time: "hora ISO", duration: "durada ISO", ipv4: "adre\xE7a IPv4", ipv6: "adre\xE7a IPv6", cidrv4: "rang IPv4", cidrv6: "rang IPv6", base64: "cadena codificada en base64", base64url: "cadena codificada en base64url", json_string: "cadena JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Tipus inv\xE0lid: s'esperava instanceof ${i10.expected}, s'ha rebut ${n10}`;
              return `Tipus inv\xE0lid: s'esperava ${e11}, s'ha rebut ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Valor inv\xE0lid: s'esperava ${rj(i10.values[0])}`;
              return `Opci\xF3 inv\xE0lida: s'esperava una de ${rp(i10.values, " o ")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "com a m\xE0xim" : "menys de", r11 = e10[i10.origin] ?? null;
              if (r11) return `Massa gran: s'esperava que ${i10.origin ?? "el valor"} contingu\xE9s ${t11} ${i10.maximum.toString()} ${r11.unit ?? "elements"}`;
              return `Massa gran: s'esperava que ${i10.origin ?? "el valor"} fos ${t11} ${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? "com a m\xEDnim" : "m\xE9s de", r11 = e10[i10.origin] ?? null;
              if (r11) return `Massa petit: s'esperava que ${i10.origin} contingu\xE9s ${t11} ${i10.minimum.toString()} ${r11.unit}`;
              return `Massa petit: s'esperava que ${i10.origin} fos ${t11} ${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Format inv\xE0lid: ha de comen\xE7ar amb "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Format inv\xE0lid: ha d'acabar amb "${i10.suffix}"`;
              if ("includes" === i10.format) return `Format inv\xE0lid: ha d'incloure "${i10.includes}"`;
              if ("regex" === i10.format) return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${i10.pattern}`;
              return `Format inv\xE0lid per a ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${i10.divisor}`;
            case "unrecognized_keys":
              return `Clau${i10.keys.length > 1 ? "s" : ""} no reconeguda${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Clau inv\xE0lida a ${i10.origin}`;
            case "invalid_union":
            default:
              return "Entrada inv\xE0lida";
            case "invalid_element":
              return `Element inv\xE0lid a ${i10.origin}`;
          }
        }) };
      }, "cs", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "znak\u016F", verb: "m\xEDt" }, file: { unit: "bajt\u016F", verb: "m\xEDt" }, array: { unit: "prvk\u016F", verb: "m\xEDt" }, set: { unit: "prvk\u016F", verb: "m\xEDt" } }, t10 = { regex: "regul\xE1rn\xED v\xFDraz", email: "e-mailov\xE1 adresa", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "datum a \u010Das ve form\xE1tu ISO", date: "datum ve form\xE1tu ISO", time: "\u010Das ve form\xE1tu ISO", duration: "doba trv\xE1n\xED ISO", ipv4: "IPv4 adresa", ipv6: "IPv6 adresa", cidrv4: "rozsah IPv4", cidrv6: "rozsah IPv6", base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64", base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url", json_string: "\u0159et\u011Bzec ve form\xE1tu JSON", e164: "\u010D\xEDslo E.164", jwt: "JWT", template_literal: "vstup" }, r10 = { nan: "NaN", number: "\u010D\xEDslo", string: "\u0159et\u011Bzec", function: "funkce", array: "pole" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${i10.expected}, obdr\u017Eeno ${n10}`;
              return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${e11}, obdr\u017Eeno ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${rj(i10.values[0])}`;
              return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${i10.origin ?? "hodnota"} mus\xED m\xEDt ${t11}${i10.maximum.toString()} ${r11.unit ?? "prvk\u016F"}`;
              return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${i10.origin ?? "hodnota"} mus\xED b\xFDt ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${i10.origin ?? "hodnota"} mus\xED m\xEDt ${t11}${i10.minimum.toString()} ${r11.unit ?? "prvk\u016F"}`;
              return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${i10.origin ?? "hodnota"} mus\xED b\xFDt ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${i10.suffix}"`;
              if ("includes" === i10.format) return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${i10.includes}"`;
              if ("regex" === i10.format) return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${i10.pattern}`;
              return `Neplatn\xFD form\xE1t ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${i10.divisor}`;
            case "unrecognized_keys":
              return `Nezn\xE1m\xE9 kl\xED\u010De: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Neplatn\xFD kl\xED\u010D v ${i10.origin}`;
            case "invalid_union":
            default:
              return "Neplatn\xFD vstup";
            case "invalid_element":
              return `Neplatn\xE1 hodnota v ${i10.origin}`;
          }
        }) };
      }, "da", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "tegn", verb: "havde" }, file: { unit: "bytes", verb: "havde" }, array: { unit: "elementer", verb: "indeholdt" }, set: { unit: "elementer", verb: "indeholdt" } }, t10 = { regex: "input", email: "e-mailadresse", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dato- og klokkesl\xE6t", date: "ISO-dato", time: "ISO-klokkesl\xE6t", duration: "ISO-varighed", ipv4: "IPv4-omr\xE5de", ipv6: "IPv6-omr\xE5de", cidrv4: "IPv4-spektrum", cidrv6: "IPv6-spektrum", base64: "base64-kodet streng", base64url: "base64url-kodet streng", json_string: "JSON-streng", e164: "E.164-nummer", jwt: "JWT", template_literal: "input" }, r10 = { nan: "NaN", string: "streng", number: "tal", boolean: "boolean", array: "liste", object: "objekt", set: "s\xE6t", file: "fil" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Ugyldigt input: forventede instanceof ${i10.expected}, fik ${n10}`;
              return `Ugyldigt input: forventede ${e11}, fik ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Ugyldig v\xE6rdi: forventede ${rj(i10.values[0])}`;
              return `Ugyldigt valg: forventede en af f\xF8lgende ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", n10 = e10[i10.origin] ?? null, a10 = r10[i10.origin] ?? i10.origin;
              if (n10) return `For stor: forventede ${a10 ?? "value"} ${n10.verb} ${t11} ${i10.maximum.toString()} ${n10.unit ?? "elementer"}`;
              return `For stor: forventede ${a10 ?? "value"} havde ${t11} ${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", n10 = e10[i10.origin] ?? null, a10 = r10[i10.origin] ?? i10.origin;
              if (n10) return `For lille: forventede ${a10} ${n10.verb} ${t11} ${i10.minimum.toString()} ${n10.unit}`;
              return `For lille: forventede ${a10} havde ${t11} ${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Ugyldig streng: skal starte med "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Ugyldig streng: skal ende med "${i10.suffix}"`;
              if ("includes" === i10.format) return `Ugyldig streng: skal indeholde "${i10.includes}"`;
              if ("regex" === i10.format) return `Ugyldig streng: skal matche m\xF8nsteret ${i10.pattern}`;
              return `Ugyldig ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Ugyldigt tal: skal v\xE6re deleligt med ${i10.divisor}`;
            case "unrecognized_keys":
              return `${i10.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Ugyldig n\xF8gle i ${i10.origin}`;
            case "invalid_union":
              return "Ugyldigt input: matcher ingen af de tilladte typer";
            case "invalid_element":
              return `Ugyldig v\xE6rdi i ${i10.origin}`;
            default:
              return "Ugyldigt input";
          }
        }) };
      }, "de", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "Zeichen", verb: "zu haben" }, file: { unit: "Bytes", verb: "zu haben" }, array: { unit: "Elemente", verb: "zu haben" }, set: { unit: "Elemente", verb: "zu haben" } }, t10 = { regex: "Eingabe", email: "E-Mail-Adresse", url: "URL", emoji: "Emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-Datum und -Uhrzeit", date: "ISO-Datum", time: "ISO-Uhrzeit", duration: "ISO-Dauer", ipv4: "IPv4-Adresse", ipv6: "IPv6-Adresse", cidrv4: "IPv4-Bereich", cidrv6: "IPv6-Bereich", base64: "Base64-codierter String", base64url: "Base64-URL-codierter String", json_string: "JSON-String", e164: "E.164-Nummer", jwt: "JWT", template_literal: "Eingabe" }, r10 = { nan: "NaN", number: "Zahl", array: "Array" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Ung\xFCltige Eingabe: erwartet instanceof ${i10.expected}, erhalten ${n10}`;
              return `Ung\xFCltige Eingabe: erwartet ${e11}, erhalten ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Ung\xFCltige Eingabe: erwartet ${rj(i10.values[0])}`;
              return `Ung\xFCltige Option: erwartet eine von ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Zu gro\xDF: erwartet, dass ${i10.origin ?? "Wert"} ${t11}${i10.maximum.toString()} ${r11.unit ?? "Elemente"} hat`;
              return `Zu gro\xDF: erwartet, dass ${i10.origin ?? "Wert"} ${t11}${i10.maximum.toString()} ist`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Zu klein: erwartet, dass ${i10.origin} ${t11}${i10.minimum.toString()} ${r11.unit} hat`;
              return `Zu klein: erwartet, dass ${i10.origin} ${t11}${i10.minimum.toString()} ist`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Ung\xFCltiger String: muss mit "${i10.prefix}" beginnen`;
              if ("ends_with" === i10.format) return `Ung\xFCltiger String: muss mit "${i10.suffix}" enden`;
              if ("includes" === i10.format) return `Ung\xFCltiger String: muss "${i10.includes}" enthalten`;
              if ("regex" === i10.format) return `Ung\xFCltiger String: muss dem Muster ${i10.pattern} entsprechen`;
              return `Ung\xFCltig: ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Ung\xFCltige Zahl: muss ein Vielfaches von ${i10.divisor} sein`;
            case "unrecognized_keys":
              return `${i10.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Ung\xFCltiger Schl\xFCssel in ${i10.origin}`;
            case "invalid_union":
            default:
              return "Ung\xFCltige Eingabe";
            case "invalid_element":
              return `Ung\xFCltiger Wert in ${i10.origin}`;
          }
        }) };
      }, "el", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" }, file: { unit: "bytes", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" }, array: { unit: "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" }, set: { unit: "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" }, map: { unit: "\u03BA\u03B1\u03C4\u03B1\u03C7\u03C9\u03C1\u03AE\u03C3\u03B5\u03B9\u03C2", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" } }, t10 = { regex: "\u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2", email: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03BA\u03B1\u03B9 \u03CE\u03C1\u03B1", date: "ISO \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1", time: "ISO \u03CE\u03C1\u03B1", duration: "ISO \u03B4\u03B9\u03AC\u03C1\u03BA\u03B5\u03B9\u03B1", ipv4: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IPv4", ipv6: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IPv6", mac: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 MAC", cidrv4: "\u03B5\u03CD\u03C1\u03BF\u03C2 IPv4", cidrv6: "\u03B5\u03CD\u03C1\u03BF\u03C2 IPv6", base64: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03C3\u03B5 base64", base64url: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03C3\u03B5 base64url", json_string: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC JSON", e164: "\u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 E.164", jwt: "JWT", template_literal: "\u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if ("string" == typeof i10.expected && /^[A-Z]/.test(i10.expected)) return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD instanceof ${i10.expected}, \u03BB\u03AE\u03C6\u03B8\u03B7\u03BA\u03B5 ${n10}`;
              return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${e11}, \u03BB\u03AE\u03C6\u03B8\u03B7\u03BA\u03B5 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${rj(i10.values[0])}`;
              return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD \u03AD\u03BD\u03B1 \u03B1\u03C0\u03CC ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${i10.origin ?? "\u03C4\u03B9\u03BC\u03AE"} \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1"}`;
              return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${i10.origin ?? "\u03C4\u03B9\u03BC\u03AE"} \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${i10.origin} \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${i10.origin} \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03BE\u03B5\u03BA\u03B9\u03BD\u03AC \u03BC\u03B5 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03BD\u03B5\u03B9 \u03BC\u03B5 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C0\u03B5\u03C1\u03B9\u03AD\u03C7\u03B5\u03B9 "${i10.includes}"`;
              if ("regex" === i10.format) return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C4\u03B1\u03B9\u03C1\u03B9\u03AC\u03B6\u03B5\u03B9 \u03BC\u03B5 \u03C4\u03BF \u03BC\u03BF\u03C4\u03AF\u03B2\u03BF ${i10.pattern}`;
              return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF: ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03BB\u03B1\u03C0\u03BB\u03AC\u03C3\u03B9\u03BF \u03C4\u03BF\u03C5 ${i10.divisor}`;
            case "unrecognized_keys":
              return `\u0386\u03B3\u03BD\u03C9\u03C3\u03C4${i10.keys.length > 1 ? "\u03B1" : "\u03BF"} \u03BA\u03BB\u03B5\u03B9\u03B4${i10.keys.length > 1 ? "\u03B9\u03AC" : "\u03AF"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF \u03BA\u03BB\u03B5\u03B9\u03B4\u03AF \u03C3\u03C4\u03BF ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2";
            case "invalid_element":
              return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C4\u03B9\u03BC\u03AE \u03C3\u03C4\u03BF ${i10.origin}`;
          }
        }) };
      }, "en", 0, rK, "eo", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "karaktrojn", verb: "havi" }, file: { unit: "bajtojn", verb: "havi" }, array: { unit: "elementojn", verb: "havi" }, set: { unit: "elementojn", verb: "havi" } }, t10 = { regex: "enigo", email: "retadreso", url: "URL", emoji: "emo\u011Dio", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-datotempo", date: "ISO-dato", time: "ISO-tempo", duration: "ISO-da\u016Dro", ipv4: "IPv4-adreso", ipv6: "IPv6-adreso", cidrv4: "IPv4-rango", cidrv6: "IPv6-rango", base64: "64-ume kodita karaktraro", base64url: "URL-64-ume kodita karaktraro", json_string: "JSON-karaktraro", e164: "E.164-nombro", jwt: "JWT", template_literal: "enigo" }, r10 = { nan: "NaN", number: "nombro", array: "tabelo", null: "senvalora" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Nevalida enigo: atendi\u011Dis instanceof ${i10.expected}, ricevi\u011Dis ${n10}`;
              return `Nevalida enigo: atendi\u011Dis ${e11}, ricevi\u011Dis ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Nevalida enigo: atendi\u011Dis ${rj(i10.values[0])}`;
              return `Nevalida opcio: atendi\u011Dis unu el ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Tro granda: atendi\u011Dis ke ${i10.origin ?? "valoro"} havu ${t11}${i10.maximum.toString()} ${r11.unit ?? "elementojn"}`;
              return `Tro granda: atendi\u011Dis ke ${i10.origin ?? "valoro"} havu ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Tro malgranda: atendi\u011Dis ke ${i10.origin} havu ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Tro malgranda: atendi\u011Dis ke ${i10.origin} estu ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Nevalida karaktraro: devas komenci\u011Di per "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Nevalida karaktraro: devas fini\u011Di per "${i10.suffix}"`;
              if ("includes" === i10.format) return `Nevalida karaktraro: devas inkluzivi "${i10.includes}"`;
              if ("regex" === i10.format) return `Nevalida karaktraro: devas kongrui kun la modelo ${i10.pattern}`;
              return `Nevalida ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Nevalida nombro: devas esti oblo de ${i10.divisor}`;
            case "unrecognized_keys":
              return `Nekonata${i10.keys.length > 1 ? "j" : ""} \u015Dlosilo${i10.keys.length > 1 ? "j" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Nevalida \u015Dlosilo en ${i10.origin}`;
            case "invalid_union":
            default:
              return "Nevalida enigo";
            case "invalid_element":
              return `Nevalida valoro en ${i10.origin}`;
          }
        }) };
      }, "es", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "caracteres", verb: "tener" }, file: { unit: "bytes", verb: "tener" }, array: { unit: "elementos", verb: "tener" }, set: { unit: "elementos", verb: "tener" } }, t10 = { regex: "entrada", email: "direcci\xF3n de correo electr\xF3nico", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "fecha y hora ISO", date: "fecha ISO", time: "hora ISO", duration: "duraci\xF3n ISO", ipv4: "direcci\xF3n IPv4", ipv6: "direcci\xF3n IPv6", cidrv4: "rango IPv4", cidrv6: "rango IPv6", base64: "cadena codificada en base64", base64url: "URL codificada en base64", json_string: "cadena JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, r10 = { nan: "NaN", string: "texto", number: "n\xFAmero", boolean: "booleano", array: "arreglo", object: "objeto", set: "conjunto", file: "archivo", date: "fecha", bigint: "n\xFAmero grande", symbol: "s\xEDmbolo", undefined: "indefinido", null: "nulo", function: "funci\xF3n", map: "mapa", record: "registro", tuple: "tupla", enum: "enumeraci\xF3n", union: "uni\xF3n", literal: "literal", promise: "promesa", void: "vac\xEDo", never: "nunca", unknown: "desconocido", any: "cualquiera" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Entrada inv\xE1lida: se esperaba instanceof ${i10.expected}, recibido ${n10}`;
              return `Entrada inv\xE1lida: se esperaba ${e11}, recibido ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Entrada inv\xE1lida: se esperaba ${rj(i10.values[0])}`;
              return `Opci\xF3n inv\xE1lida: se esperaba una de ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", n10 = e10[i10.origin] ?? null, a10 = r10[i10.origin] ?? i10.origin;
              if (n10) return `Demasiado grande: se esperaba que ${a10 ?? "valor"} tuviera ${t11}${i10.maximum.toString()} ${n10.unit ?? "elementos"}`;
              return `Demasiado grande: se esperaba que ${a10 ?? "valor"} fuera ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", n10 = e10[i10.origin] ?? null, a10 = r10[i10.origin] ?? i10.origin;
              if (n10) return `Demasiado peque\xF1o: se esperaba que ${a10} tuviera ${t11}${i10.minimum.toString()} ${n10.unit}`;
              return `Demasiado peque\xF1o: se esperaba que ${a10} fuera ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Cadena inv\xE1lida: debe comenzar con "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Cadena inv\xE1lida: debe terminar en "${i10.suffix}"`;
              if ("includes" === i10.format) return `Cadena inv\xE1lida: debe incluir "${i10.includes}"`;
              if ("regex" === i10.format) return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${i10.pattern}`;
              return `Inv\xE1lido ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${i10.divisor}`;
            case "unrecognized_keys":
              return `Llave${i10.keys.length > 1 ? "s" : ""} desconocida${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Llave inv\xE1lida en ${r10[i10.origin] ?? i10.origin}`;
            case "invalid_union":
            default:
              return "Entrada inv\xE1lida";
            case "invalid_element":
              return `Valor inv\xE1lido en ${r10[i10.origin] ?? i10.origin}`;
          }
        }) };
      }, "fa", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" } }, t10 = { regex: "\u0648\u0631\u0648\u062F\u06CC", email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644", url: "URL", emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648", time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", ipv4: "IPv4 \u0622\u062F\u0631\u0633", ipv6: "IPv6 \u0622\u062F\u0631\u0633", cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647", cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647", base64: "base64-encoded \u0631\u0634\u062A\u0647", base64url: "base64url-encoded \u0631\u0634\u062A\u0647", json_string: "JSON \u0631\u0634\u062A\u0647", e164: "E.164 \u0639\u062F\u062F", jwt: "JWT", template_literal: "\u0648\u0631\u0648\u062F\u06CC" }, r10 = { nan: "NaN", number: "\u0639\u062F\u062F", array: "\u0622\u0631\u0627\u06CC\u0647" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${i10.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${n10} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
              return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${e11} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${n10} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${rj(i10.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
              return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${rp(i10.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${i10.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`;
              return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${i10.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${t11}${i10.maximum.toString()} \u0628\u0627\u0634\u062F`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${i10.origin} \u0628\u0627\u06CC\u062F ${t11}${i10.minimum.toString()} ${r11.unit} \u0628\u0627\u0634\u062F`;
              return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${i10.origin} \u0628\u0627\u06CC\u062F ${t11}${i10.minimum.toString()} \u0628\u0627\u0634\u062F`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${i10.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
              if ("ends_with" === i10.format) return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${i10.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
              if ("includes" === i10.format) return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${i10.includes}" \u0628\u0627\u0634\u062F`;
              if ("regex" === i10.format) return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${i10.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
              return `${t10[i10.format] ?? i10.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
            case "not_multiple_of":
              return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${i10.divisor} \u0628\u0627\u0634\u062F`;
            case "unrecognized_keys":
              return `\u06A9\u0644\u06CC\u062F${i10.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
            case "invalid_element":
              return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${i10.origin}`;
          }
        }) };
      }, "fi", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "merkki\xE4", subject: "merkkijonon" }, file: { unit: "tavua", subject: "tiedoston" }, array: { unit: "alkiota", subject: "listan" }, set: { unit: "alkiota", subject: "joukon" }, number: { unit: "", subject: "luvun" }, bigint: { unit: "", subject: "suuren kokonaisluvun" }, int: { unit: "", subject: "kokonaisluvun" }, date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" } }, t10 = { regex: "s\xE4\xE4nn\xF6llinen lauseke", email: "s\xE4hk\xF6postiosoite", url: "URL-osoite", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-aikaleima", date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4", time: "ISO-aika", duration: "ISO-kesto", ipv4: "IPv4-osoite", ipv6: "IPv6-osoite", cidrv4: "IPv4-alue", cidrv6: "IPv6-alue", base64: "base64-koodattu merkkijono", base64url: "base64url-koodattu merkkijono", json_string: "JSON-merkkijono", e164: "E.164-luku", jwt: "JWT", template_literal: "templaattimerkkijono" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Virheellinen tyyppi: odotettiin instanceof ${i10.expected}, oli ${n10}`;
              return `Virheellinen tyyppi: odotettiin ${e11}, oli ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Virheellinen sy\xF6te: t\xE4ytyy olla ${rj(i10.values[0])}`;
              return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Liian suuri: ${r11.subject} t\xE4ytyy olla ${t11}${i10.maximum.toString()} ${r11.unit}`.trim();
              return `Liian suuri: arvon t\xE4ytyy olla ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Liian pieni: ${r11.subject} t\xE4ytyy olla ${t11}${i10.minimum.toString()} ${r11.unit}`.trim();
              return `Liian pieni: arvon t\xE4ytyy olla ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${i10.suffix}"`;
              if ("includes" === i10.format) return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${i10.includes}"`;
              if ("regex" === i10.format) return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${i10.pattern}`;
              return `Virheellinen ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Virheellinen luku: t\xE4ytyy olla luvun ${i10.divisor} monikerta`;
            case "unrecognized_keys":
              return `${i10.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return "Virheellinen avain tietueessa";
            case "invalid_union":
              return "Virheellinen unioni";
            case "invalid_element":
              return "Virheellinen arvo joukossa";
            default:
              return "Virheellinen sy\xF6te";
          }
        }) };
      }, "fr", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "caract\xE8res", verb: "avoir" }, file: { unit: "octets", verb: "avoir" }, array: { unit: "\xE9l\xE9ments", verb: "avoir" }, set: { unit: "\xE9l\xE9ments", verb: "avoir" } }, t10 = { regex: "entr\xE9e", email: "adresse e-mail", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "date et heure ISO", date: "date ISO", time: "heure ISO", duration: "dur\xE9e ISO", ipv4: "adresse IPv4", ipv6: "adresse IPv6", cidrv4: "plage IPv4", cidrv6: "plage IPv6", base64: "cha\xEEne encod\xE9e en base64", base64url: "cha\xEEne encod\xE9e en base64url", json_string: "cha\xEEne JSON", e164: "num\xE9ro E.164", jwt: "JWT", template_literal: "entr\xE9e" }, r10 = { string: "cha\xEEne", number: "nombre", int: "entier", boolean: "bool\xE9en", bigint: "grand entier", symbol: "symbole", undefined: "ind\xE9fini", null: "null", never: "jamais", void: "vide", date: "date", array: "tableau", object: "objet", tuple: "tuple", record: "enregistrement", map: "carte", set: "ensemble", file: "fichier", nonoptional: "non-optionnel", nan: "NaN", function: "fonction" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Entr\xE9e invalide : instanceof ${i10.expected} attendu, ${n10} re\xE7u`;
              return `Entr\xE9e invalide : ${e11} attendu, ${n10} re\xE7u`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Entr\xE9e invalide : ${rj(i10.values[0])} attendu`;
              return `Option invalide : une valeur parmi ${rp(i10.values, "|")} attendue`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", n10 = e10[i10.origin] ?? null;
              if (n10) return `Trop grand : ${r10[i10.origin] ?? "valeur"} doit ${n10.verb} ${t11}${i10.maximum.toString()} ${n10.unit ?? "\xE9l\xE9ment(s)"}`;
              return `Trop grand : ${r10[i10.origin] ?? "valeur"} doit \xEAtre ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", n10 = e10[i10.origin] ?? null;
              if (n10) return `Trop petit : ${r10[i10.origin] ?? "valeur"} doit ${n10.verb} ${t11}${i10.minimum.toString()} ${n10.unit}`;
              return `Trop petit : ${r10[i10.origin] ?? "valeur"} doit \xEAtre ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Cha\xEEne invalide : doit commencer par "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Cha\xEEne invalide : doit se terminer par "${i10.suffix}"`;
              if ("includes" === i10.format) return `Cha\xEEne invalide : doit inclure "${i10.includes}"`;
              if ("regex" === i10.format) return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${i10.pattern}`;
              return `${t10[i10.format] ?? i10.format} invalide`;
            case "not_multiple_of":
              return `Nombre invalide : doit \xEAtre un multiple de ${i10.divisor}`;
            case "unrecognized_keys":
              return `Cl\xE9${i10.keys.length > 1 ? "s" : ""} non reconnue${i10.keys.length > 1 ? "s" : ""} : ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Cl\xE9 invalide dans ${i10.origin}`;
            case "invalid_union":
            default:
              return "Entr\xE9e invalide";
            case "invalid_element":
              return `Valeur invalide dans ${i10.origin}`;
          }
        }) };
      }, "frCA", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "caract\xE8res", verb: "avoir" }, file: { unit: "octets", verb: "avoir" }, array: { unit: "\xE9l\xE9ments", verb: "avoir" }, set: { unit: "\xE9l\xE9ments", verb: "avoir" } }, t10 = { regex: "entr\xE9e", email: "adresse courriel", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "date-heure ISO", date: "date ISO", time: "heure ISO", duration: "dur\xE9e ISO", ipv4: "adresse IPv4", ipv6: "adresse IPv6", cidrv4: "plage IPv4", cidrv6: "plage IPv6", base64: "cha\xEEne encod\xE9e en base64", base64url: "cha\xEEne encod\xE9e en base64url", json_string: "cha\xEEne JSON", e164: "num\xE9ro E.164", jwt: "JWT", template_literal: "entr\xE9e" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Entr\xE9e invalide : attendu instanceof ${i10.expected}, re\xE7u ${n10}`;
              return `Entr\xE9e invalide : attendu ${e11}, re\xE7u ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Entr\xE9e invalide : attendu ${rj(i10.values[0])}`;
              return `Option invalide : attendu l'une des valeurs suivantes ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "\u2264" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Trop grand : attendu que ${i10.origin ?? "la valeur"} ait ${t11}${i10.maximum.toString()} ${r11.unit}`;
              return `Trop grand : attendu que ${i10.origin ?? "la valeur"} soit ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? "\u2265" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Trop petit : attendu que ${i10.origin} ait ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Trop petit : attendu que ${i10.origin} soit ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Cha\xEEne invalide : doit commencer par "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Cha\xEEne invalide : doit se terminer par "${i10.suffix}"`;
              if ("includes" === i10.format) return `Cha\xEEne invalide : doit inclure "${i10.includes}"`;
              if ("regex" === i10.format) return `Cha\xEEne invalide : doit correspondre au motif ${i10.pattern}`;
              return `${t10[i10.format] ?? i10.format} invalide`;
            case "not_multiple_of":
              return `Nombre invalide : doit \xEAtre un multiple de ${i10.divisor}`;
            case "unrecognized_keys":
              return `Cl\xE9${i10.keys.length > 1 ? "s" : ""} non reconnue${i10.keys.length > 1 ? "s" : ""} : ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Cl\xE9 invalide dans ${i10.origin}`;
            case "invalid_union":
            default:
              return "Entr\xE9e invalide";
            case "invalid_element":
              return `Valeur invalide dans ${i10.origin}`;
          }
        }) };
      }, "he", 0, function() {
        let e10, t10, r10, i10, n10, a10, o10, s10, u10;
        return { localeError: (e10 = { string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" }, number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" }, boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" }, bigint: { label: "BigInt", gender: "m" }, date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" }, array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" }, object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" }, null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" }, undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" }, symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" }, function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" }, map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" }, set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" }, file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" }, promise: { label: "Promise", gender: "m" }, NaN: { label: "NaN", gender: "m" }, unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" }, value: { label: "\u05E2\u05E8\u05DA", gender: "m" } }, t10 = { string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" }, file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" } }, r10 = (t11) => t11 ? e10[t11] : void 0, i10 = (t11) => {
          let i11 = r10(t11);
          return i11 ? i11.label : t11 ?? e10.unknown.label;
        }, n10 = (e11) => `\u05D4${i10(e11)}`, a10 = (e11) => {
          let t11 = r10(e11);
          return "f" === (t11?.gender ?? "m") ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA";
        }, o10 = (e11) => e11 ? t10[e11] ?? null : null, s10 = { regex: { label: "\u05E7\u05DC\u05D8", gender: "m" }, email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" }, url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" }, emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" }, uuid: { label: "UUID", gender: "m" }, nanoid: { label: "nanoid", gender: "m" }, guid: { label: "GUID", gender: "m" }, cuid: { label: "cuid", gender: "m" }, cuid2: { label: "cuid2", gender: "m" }, ulid: { label: "ULID", gender: "m" }, xid: { label: "XID", gender: "m" }, ksuid: { label: "KSUID", gender: "m" }, datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" }, date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" }, time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" }, duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" }, ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" }, ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" }, cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" }, cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" }, base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" }, base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" }, json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" }, e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" }, jwt: { label: "JWT", gender: "m" }, ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" }, includes: { label: "\u05E7\u05DC\u05D8", gender: "m" }, lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }, starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" }, uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" } }, u10 = { nan: "NaN" }, (t11) => {
          switch (t11.code) {
            case "invalid_type": {
              let r11 = t11.expected, n11 = u10[r11 ?? ""] ?? i10(r11), a11 = rG(t11.input), o11 = u10[a11] ?? e10[a11]?.label ?? a11;
              if (/^[A-Z]/.test(t11.expected)) return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${t11.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${o11}`;
              return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${n11}, \u05D4\u05EA\u05E7\u05D1\u05DC ${o11}`;
            }
            case "invalid_value": {
              if (1 === t11.values.length) return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${rj(t11.values[0])}`;
              let e11 = t11.values.map((e12) => rj(e12));
              if (2 === t11.values.length) return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${e11[0]} \u05D0\u05D5 ${e11[1]}`;
              let r11 = e11[e11.length - 1], i11 = e11.slice(0, -1).join(", ");
              return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${i11} \u05D0\u05D5 ${r11}`;
            }
            case "too_big": {
              let e11 = o10(t11.origin), r11 = n10(t11.origin ?? "value");
              if ("string" === t11.origin) return `${e11?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${r11} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${t11.maximum.toString()} ${e11?.unit ?? ""} ${t11.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
              if ("number" === t11.origin) {
                let e12 = t11.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${t11.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${t11.maximum}`;
                return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${r11} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${e12}`;
              }
              if ("array" === t11.origin || "set" === t11.origin) {
                let i12 = "set" === t11.origin ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA", n11 = t11.inclusive ? `${t11.maximum} ${e11?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${t11.maximum} ${e11?.unit ?? ""}`;
                return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${r11} ${i12} \u05DC\u05D4\u05DB\u05D9\u05DC ${n11}`.trim();
              }
              let i11 = t11.inclusive ? "<=" : "<", s11 = a10(t11.origin ?? "value");
              if (e11?.unit) return `${e11.longLabel} \u05DE\u05D3\u05D9: ${r11} ${s11} ${i11}${t11.maximum.toString()} ${e11.unit}`;
              return `${e11?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${r11} ${s11} ${i11}${t11.maximum.toString()}`;
            }
            case "too_small": {
              let e11 = o10(t11.origin), r11 = n10(t11.origin ?? "value");
              if ("string" === t11.origin) return `${e11?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${r11} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${t11.minimum.toString()} ${e11?.unit ?? ""} ${t11.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
              if ("number" === t11.origin) {
                let e12 = t11.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${t11.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${t11.minimum}`;
                return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${r11} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${e12}`;
              }
              if ("array" === t11.origin || "set" === t11.origin) {
                let i12 = "set" === t11.origin ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
                if (1 === t11.minimum && t11.inclusive) {
                  let e12 = (t11.origin, "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3");
                  return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${r11} ${i12} \u05DC\u05D4\u05DB\u05D9\u05DC ${e12}`;
                }
                let n11 = t11.inclusive ? `${t11.minimum} ${e11?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${t11.minimum} ${e11?.unit ?? ""}`;
                return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${r11} ${i12} \u05DC\u05D4\u05DB\u05D9\u05DC ${n11}`.trim();
              }
              let i11 = t11.inclusive ? ">=" : ">", s11 = a10(t11.origin ?? "value");
              if (e11?.unit) return `${e11.shortLabel} \u05DE\u05D3\u05D9: ${r11} ${s11} ${i11}${t11.minimum.toString()} ${e11.unit}`;
              return `${e11?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${r11} ${s11} ${i11}${t11.minimum.toString()}`;
            }
            case "invalid_format": {
              if ("starts_with" === t11.format) return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${t11.prefix}"`;
              if ("ends_with" === t11.format) return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${t11.suffix}"`;
              if ("includes" === t11.format) return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${t11.includes}"`;
              if ("regex" === t11.format) return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${t11.pattern}`;
              let e11 = s10[t11.format], r11 = e11?.label ?? t11.format, i11 = e11?.gender ?? "m";
              return `${r11} \u05DC\u05D0 ${"f" === i11 ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF"}`;
            }
            case "not_multiple_of":
              return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${t11.divisor}`;
            case "unrecognized_keys":
              return `\u05DE\u05E4\u05EA\u05D7${t11.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${t11.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${rp(t11.keys, ", ")}`;
            case "invalid_key":
              return "\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8";
            case "invalid_union":
            default:
              return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
            case "invalid_element": {
              let e11 = n10(t11.origin ?? "array");
              return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${e11}`;
            }
          }
        }) };
      }, "hr", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "znakova", verb: "imati" }, file: { unit: "bajtova", verb: "imati" }, array: { unit: "stavki", verb: "imati" }, set: { unit: "stavki", verb: "imati" } }, t10 = { regex: "unos", email: "email adresa", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datum i vrijeme", date: "ISO datum", time: "ISO vrijeme", duration: "ISO trajanje", ipv4: "IPv4 adresa", ipv6: "IPv6 adresa", cidrv4: "IPv4 raspon", cidrv6: "IPv6 raspon", base64: "base64 kodirani tekst", base64url: "base64url kodirani tekst", json_string: "JSON tekst", e164: "E.164 broj", jwt: "JWT", template_literal: "unos" }, r10 = { nan: "NaN", string: "tekst", number: "broj", boolean: "boolean", array: "niz", object: "objekt", set: "skup", file: "datoteka", date: "datum", bigint: "bigint", symbol: "simbol", undefined: "undefined", null: "null", function: "funkcija", map: "mapa" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Neispravan unos: o\u010Dekuje se instanceof ${i10.expected}, a primljeno je ${n10}`;
              return `Neispravan unos: o\u010Dekuje se ${e11}, a primljeno je ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Neispravna vrijednost: o\u010Dekivano ${rj(i10.values[0])}`;
              return `Neispravna opcija: o\u010Dekivano jedno od ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", n10 = e10[i10.origin] ?? null, a10 = r10[i10.origin] ?? i10.origin;
              if (n10) return `Preveliko: o\u010Dekivano da ${a10 ?? "vrijednost"} ima ${t11}${i10.maximum.toString()} ${n10.unit ?? "elemenata"}`;
              return `Preveliko: o\u010Dekivano da ${a10 ?? "vrijednost"} bude ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", n10 = e10[i10.origin] ?? null, a10 = r10[i10.origin] ?? i10.origin;
              if (n10) return `Premalo: o\u010Dekivano da ${a10} ima ${t11}${i10.minimum.toString()} ${n10.unit}`;
              return `Premalo: o\u010Dekivano da ${a10} bude ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Neispravan tekst: mora zapo\u010Dinjati s "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Neispravan tekst: mora zavr\u0161avati s "${i10.suffix}"`;
              if ("includes" === i10.format) return `Neispravan tekst: mora sadr\u017Eavati "${i10.includes}"`;
              if ("regex" === i10.format) return `Neispravan tekst: mora odgovarati uzorku ${i10.pattern}`;
              return `Neispravna ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Neispravan broj: mora biti vi\u0161ekratnik od ${i10.divisor}`;
            case "unrecognized_keys":
              return `Neprepoznat${i10.keys.length > 1 ? "i klju\u010Devi" : " klju\u010D"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Neispravan klju\u010D u ${r10[i10.origin] ?? i10.origin}`;
            case "invalid_union":
            default:
              return "Neispravan unos";
            case "invalid_element":
              return `Neispravna vrijednost u ${r10[i10.origin] ?? i10.origin}`;
          }
        }) };
      }, "hu", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "karakter", verb: "legyen" }, file: { unit: "byte", verb: "legyen" }, array: { unit: "elem", verb: "legyen" }, set: { unit: "elem", verb: "legyen" } }, t10 = { regex: "bemenet", email: "email c\xEDm", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO id\u0151b\xE9lyeg", date: "ISO d\xE1tum", time: "ISO id\u0151", duration: "ISO id\u0151intervallum", ipv4: "IPv4 c\xEDm", ipv6: "IPv6 c\xEDm", cidrv4: "IPv4 tartom\xE1ny", cidrv6: "IPv6 tartom\xE1ny", base64: "base64-k\xF3dolt string", base64url: "base64url-k\xF3dolt string", json_string: "JSON string", e164: "E.164 sz\xE1m", jwt: "JWT", template_literal: "bemenet" }, r10 = { nan: "NaN", number: "sz\xE1m", array: "t\xF6mb" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${i10.expected}, a kapott \xE9rt\xE9k ${n10}`;
              return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${e11}, a kapott \xE9rt\xE9k ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${rj(i10.values[0])}`;
              return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `T\xFAl nagy: ${i10.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${t11}${i10.maximum.toString()} ${r11.unit ?? "elem"}`;
              return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${i10.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${i10.origin} m\xE9rete t\xFAl kicsi ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${i10.origin} t\xFAl kicsi ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\xC9rv\xE9nytelen string: "${i10.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
              if ("ends_with" === i10.format) return `\xC9rv\xE9nytelen string: "${i10.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
              if ("includes" === i10.format) return `\xC9rv\xE9nytelen string: "${i10.includes}" \xE9rt\xE9ket kell tartalmaznia`;
              if ("regex" === i10.format) return `\xC9rv\xE9nytelen string: ${i10.pattern} mint\xE1nak kell megfelelnie`;
              return `\xC9rv\xE9nytelen ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\xC9rv\xE9nytelen sz\xE1m: ${i10.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
            case "unrecognized_keys":
              return `Ismeretlen kulcs${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\xC9rv\xE9nytelen kulcs ${i10.origin}`;
            case "invalid_union":
            default:
              return "\xC9rv\xE9nytelen bemenet";
            case "invalid_element":
              return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${i10.origin}`;
          }
        }) };
      }, "hy", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: { one: "\u0576\u0577\u0561\u0576", many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, file: { unit: { one: "\u0562\u0561\u0575\u0569", many: "\u0562\u0561\u0575\u0569\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, array: { unit: { one: "\u057F\u0561\u0580\u0580", many: "\u057F\u0561\u0580\u0580\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, set: { unit: { one: "\u057F\u0561\u0580\u0580", many: "\u057F\u0561\u0580\u0580\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" } }, t10 = { regex: "\u0574\u0578\u0582\u057F\u0584", email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565", url: "URL", emoji: "\u0567\u0574\u0578\u057B\u056B", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574", date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E", time: "ISO \u056A\u0561\u0574", duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576", ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565", ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565", cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584", cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584", base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572", base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572", json_string: "JSON \u057F\u0578\u0572", e164: "E.164 \u0570\u0561\u0574\u0561\u0580", jwt: "JWT", template_literal: "\u0574\u0578\u0582\u057F\u0584" }, r10 = { nan: "NaN", number: "\u0569\u056B\u057E", array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${i10.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${n10}`;
              return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${e11}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${rj(i10.values[1])}`;
              return `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) {
                let e11 = oo(Number(i10.maximum), r11.unit.one, r11.unit.many);
                return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${os(i10.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${t11}${i10.maximum.toString()} ${e11}`;
              }
              return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${os(i10.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) {
                let e11 = oo(Number(i10.minimum), r11.unit.one, r11.unit.many);
                return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${os(i10.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${t11}${i10.minimum.toString()} ${e11}`;
              }
              return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${os(i10.origin)} \u056C\u056B\u0576\u056B ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${i10.prefix}"-\u0578\u057E`;
              if ("ends_with" === i10.format) return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${i10.suffix}"-\u0578\u057E`;
              if ("includes" === i10.format) return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${i10.includes}"`;
              if ("regex" === i10.format) return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${i10.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576`;
              return `\u054D\u056D\u0561\u056C ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${i10.divisor}-\u056B`;
            case "unrecognized_keys":
              return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${i10.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${os(i10.origin)}-\u0578\u0582\u0574`;
            case "invalid_union":
            default:
              return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
            case "invalid_element":
              return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${os(i10.origin)}-\u0578\u0582\u0574`;
          }
        }) };
      }, "id", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "karakter", verb: "memiliki" }, file: { unit: "byte", verb: "memiliki" }, array: { unit: "item", verb: "memiliki" }, set: { unit: "item", verb: "memiliki" } }, t10 = { regex: "input", email: "alamat email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "tanggal dan waktu format ISO", date: "tanggal format ISO", time: "jam format ISO", duration: "durasi format ISO", ipv4: "alamat IPv4", ipv6: "alamat IPv6", cidrv4: "rentang alamat IPv4", cidrv6: "rentang alamat IPv6", base64: "string dengan enkode base64", base64url: "string dengan enkode base64url", json_string: "string JSON", e164: "angka E.164", jwt: "JWT", template_literal: "input" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Input tidak valid: diharapkan instanceof ${i10.expected}, diterima ${n10}`;
              return `Input tidak valid: diharapkan ${e11}, diterima ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Input tidak valid: diharapkan ${rj(i10.values[0])}`;
              return `Pilihan tidak valid: diharapkan salah satu dari ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Terlalu besar: diharapkan ${i10.origin ?? "value"} memiliki ${t11}${i10.maximum.toString()} ${r11.unit ?? "elemen"}`;
              return `Terlalu besar: diharapkan ${i10.origin ?? "value"} menjadi ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Terlalu kecil: diharapkan ${i10.origin} memiliki ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Terlalu kecil: diharapkan ${i10.origin} menjadi ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `String tidak valid: harus dimulai dengan "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `String tidak valid: harus berakhir dengan "${i10.suffix}"`;
              if ("includes" === i10.format) return `String tidak valid: harus menyertakan "${i10.includes}"`;
              if ("regex" === i10.format) return `String tidak valid: harus sesuai pola ${i10.pattern}`;
              return `${t10[i10.format] ?? i10.format} tidak valid`;
            case "not_multiple_of":
              return `Angka tidak valid: harus kelipatan dari ${i10.divisor}`;
            case "unrecognized_keys":
              return `Kunci tidak dikenali ${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Kunci tidak valid di ${i10.origin}`;
            case "invalid_union":
            default:
              return "Input tidak valid";
            case "invalid_element":
              return `Nilai tidak valid di ${i10.origin}`;
          }
        }) };
      }, "is", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "stafi", verb: "a\xF0 hafa" }, file: { unit: "b\xE6ti", verb: "a\xF0 hafa" }, array: { unit: "hluti", verb: "a\xF0 hafa" }, set: { unit: "hluti", verb: "a\xF0 hafa" } }, t10 = { regex: "gildi", email: "netfang", url: "vefsl\xF3\xF0", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dagsetning og t\xEDmi", date: "ISO dagsetning", time: "ISO t\xEDmi", duration: "ISO t\xEDmalengd", ipv4: "IPv4 address", ipv6: "IPv6 address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded strengur", base64url: "base64url-encoded strengur", json_string: "JSON strengur", e164: "E.164 t\xF6lugildi", jwt: "JWT", template_literal: "gildi" }, r10 = { nan: "NaN", number: "n\xFAmer", array: "fylki" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Rangt gildi: \xDE\xFA sl\xF3st inn ${n10} \xFEar sem \xE1 a\xF0 vera instanceof ${i10.expected}`;
              return `Rangt gildi: \xDE\xFA sl\xF3st inn ${n10} \xFEar sem \xE1 a\xF0 vera ${e11}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Rangt gildi: gert r\xE1\xF0 fyrir ${rj(i10.values[0])}`;
              return `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${i10.origin ?? "gildi"} hafi ${t11}${i10.maximum.toString()} ${r11.unit ?? "hluti"}`;
              return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${i10.origin ?? "gildi"} s\xE9 ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${i10.origin} hafi ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${i10.origin} s\xE9 ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${i10.includes}"`;
              if ("regex" === i10.format) return `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${i10.pattern}`;
              return `Rangt ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${i10.divisor}`;
            case "unrecognized_keys":
              return `\xD3\xFEekkt ${i10.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Rangur lykill \xED ${i10.origin}`;
            case "invalid_union":
            default:
              return "Rangt gildi";
            case "invalid_element":
              return `Rangt gildi \xED ${i10.origin}`;
          }
        }) };
      }, "it", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "caratteri", verb: "avere" }, file: { unit: "byte", verb: "avere" }, array: { unit: "elementi", verb: "avere" }, set: { unit: "elementi", verb: "avere" } }, t10 = { regex: "input", email: "indirizzo email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data e ora ISO", date: "data ISO", time: "ora ISO", duration: "durata ISO", ipv4: "indirizzo IPv4", ipv6: "indirizzo IPv6", cidrv4: "intervallo IPv4", cidrv6: "intervallo IPv6", base64: "stringa codificata in base64", base64url: "URL codificata in base64", json_string: "stringa JSON", e164: "numero E.164", jwt: "JWT", template_literal: "input" }, r10 = { nan: "NaN", number: "numero", array: "vettore" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Input non valido: atteso instanceof ${i10.expected}, ricevuto ${n10}`;
              return `Input non valido: atteso ${e11}, ricevuto ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Input non valido: atteso ${rj(i10.values[0])}`;
              return `Opzione non valida: atteso uno tra ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Troppo grande: ${i10.origin ?? "valore"} deve avere ${t11}${i10.maximum.toString()} ${r11.unit ?? "elementi"}`;
              return `Troppo grande: ${i10.origin ?? "valore"} deve essere ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Troppo piccolo: ${i10.origin} deve avere ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Troppo piccolo: ${i10.origin} deve essere ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Stringa non valida: deve iniziare con "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Stringa non valida: deve terminare con "${i10.suffix}"`;
              if ("includes" === i10.format) return `Stringa non valida: deve includere "${i10.includes}"`;
              if ("regex" === i10.format) return `Stringa non valida: deve corrispondere al pattern ${i10.pattern}`;
              return `Input non valido: ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Numero non valido: deve essere un multiplo di ${i10.divisor}`;
            case "unrecognized_keys":
              return `Chiav${i10.keys.length > 1 ? "i" : "e"} non riconosciut${i10.keys.length > 1 ? "e" : "a"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Chiave non valida in ${i10.origin}`;
            case "invalid_union":
            default:
              return "Input non valido";
            case "invalid_element":
              return `Valore non valido in ${i10.origin}`;
          }
        }) };
      }, "ja", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" }, file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" }, array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }, set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" } }, t10 = { regex: "\u5165\u529B\u5024", email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9", url: "URL", emoji: "\u7D75\u6587\u5B57", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO\u65E5\u6642", date: "ISO\u65E5\u4ED8", time: "ISO\u6642\u523B", duration: "ISO\u671F\u9593", ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9", ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9", cidrv4: "IPv4\u7BC4\u56F2", cidrv6: "IPv6\u7BC4\u56F2", base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217", base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217", json_string: "JSON\u6587\u5B57\u5217", e164: "E.164\u756A\u53F7", jwt: "JWT", template_literal: "\u5165\u529B\u5024" }, r10 = { nan: "NaN", number: "\u6570\u5024", array: "\u914D\u5217" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u7121\u52B9\u306A\u5165\u529B: instanceof ${i10.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${n10}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
              return `\u7121\u52B9\u306A\u5165\u529B: ${e11}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${n10}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u7121\u52B9\u306A\u5165\u529B: ${rj(i10.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
              return `\u7121\u52B9\u306A\u9078\u629E: ${rp(i10.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            case "too_big": {
              let t11 = i10.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u5927\u304D\u3059\u304E\u308B\u5024: ${i10.origin ?? "\u5024"}\u306F${i10.maximum.toString()}${r11.unit ?? "\u8981\u7D20"}${t11}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
              return `\u5927\u304D\u3059\u304E\u308B\u5024: ${i10.origin ?? "\u5024"}\u306F${i10.maximum.toString()}${t11}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${i10.origin}\u306F${i10.minimum.toString()}${r11.unit}${t11}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
              return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${i10.origin}\u306F${i10.minimum.toString()}${t11}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${i10.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
              if ("ends_with" === i10.format) return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${i10.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
              if ("includes" === i10.format) return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${i10.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
              if ("regex" === i10.format) return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${i10.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
              return `\u7121\u52B9\u306A${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u7121\u52B9\u306A\u6570\u5024: ${i10.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            case "unrecognized_keys":
              return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${i10.keys.length > 1 ? "\u7FA4" : ""}: ${rp(i10.keys, "\u3001")}`;
            case "invalid_key":
              return `${i10.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
            case "invalid_union":
            default:
              return "\u7121\u52B9\u306A\u5165\u529B";
            case "invalid_element":
              return `${i10.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
          }
        }) };
      }, "ka", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" } }, t10 = { regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0", email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", url: "URL", emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD", date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8", time: "\u10D3\u10E0\u10DD", duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0", ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8", cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8", base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10D5\u10D4\u10DA\u10D8", base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10D5\u10D4\u10DA\u10D8", json_string: "JSON \u10D5\u10D4\u10DA\u10D8", e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8", jwt: "JWT", template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0" }, r10 = { nan: "NaN", number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8", string: "\u10D5\u10D4\u10DA\u10D8", boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8", function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0", array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${i10.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${n10}`;
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${e11}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${rj(i10.values[0])}`;
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${rp(i10.values, "|")}-\u10D3\u10D0\u10DC`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i10.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${r11.verb} ${t11}${i10.maximum.toString()} ${r11.unit}`;
              return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i10.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i10.origin} ${r11.verb} ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${i10.origin} \u10D8\u10E7\u10DD\u10E1 ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${i10.prefix}"-\u10D8\u10D7`;
              if ("ends_with" === i10.format) return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${i10.suffix}"-\u10D8\u10D7`;
              if ("includes" === i10.format) return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${i10.includes}"-\u10E1`;
              if ("regex" === i10.format) return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${i10.pattern}`;
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${i10.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
            case "unrecognized_keys":
              return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${i10.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${i10.origin}-\u10E8\u10D8`;
            case "invalid_union":
            default:
              return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
            case "invalid_element":
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${i10.origin}-\u10E8\u10D8`;
          }
        }) };
      }, "kh", 0, function() {
        return ou();
      }, "km", 0, ou, "ko", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\uBB38\uC790", verb: "to have" }, file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" }, array: { unit: "\uAC1C", verb: "to have" }, set: { unit: "\uAC1C", verb: "to have" } }, t10 = { regex: "\uC785\uB825", email: "\uC774\uBA54\uC77C \uC8FC\uC18C", url: "URL", emoji: "\uC774\uBAA8\uC9C0", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04", date: "ISO \uB0A0\uC9DC", time: "ISO \uC2DC\uAC04", duration: "ISO \uAE30\uAC04", ipv4: "IPv4 \uC8FC\uC18C", ipv6: "IPv6 \uC8FC\uC18C", cidrv4: "IPv4 \uBC94\uC704", cidrv6: "IPv6 \uBC94\uC704", base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4", base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4", json_string: "JSON \uBB38\uC790\uC5F4", e164: "E.164 \uBC88\uD638", jwt: "JWT", template_literal: "\uC785\uB825" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${i10.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${n10}\uC785\uB2C8\uB2E4`;
              return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${e11}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${n10}\uC785\uB2C8\uB2E4`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${rj(i10.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
              return `\uC798\uBABB\uB41C \uC635\uC158: ${rp(i10.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
            case "too_big": {
              let t11 = i10.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC", r11 = "\uBBF8\uB9CC" === t11 ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4", n10 = e10[i10.origin] ?? null, a10 = n10?.unit ?? "\uC694\uC18C";
              if (n10) return `${i10.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${i10.maximum.toString()}${a10} ${t11}${r11}`;
              return `${i10.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${i10.maximum.toString()} ${t11}${r11}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC", r11 = "\uC774\uC0C1" === t11 ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4", n10 = e10[i10.origin] ?? null, a10 = n10?.unit ?? "\uC694\uC18C";
              if (n10) return `${i10.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${i10.minimum.toString()}${a10} ${t11}${r11}`;
              return `${i10.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${i10.minimum.toString()} ${t11}${r11}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${i10.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
              if ("ends_with" === i10.format) return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${i10.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
              if ("includes" === i10.format) return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${i10.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
              if ("regex" === i10.format) return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${i10.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
              return `\uC798\uBABB\uB41C ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\uC798\uBABB\uB41C \uC22B\uC790: ${i10.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
            case "unrecognized_keys":
              return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\uC798\uBABB\uB41C \uD0A4: ${i10.origin}`;
            case "invalid_union":
            default:
              return "\uC798\uBABB\uB41C \uC785\uB825";
            case "invalid_element":
              return `\uC798\uBABB\uB41C \uAC12: ${i10.origin}`;
          }
        }) };
      }, "lt", 0, function() {
        return { localeError: /* @__PURE__ */ (() => {
          let e10 = { string: { unit: { one: "simbolis", few: "simboliai", many: "simboli\u0173" }, verb: { smaller: { inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip", notInclusive: "turi b\u016Bti trumpesn\u0117 kaip" }, bigger: { inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip", notInclusive: "turi b\u016Bti ilgesn\u0117 kaip" } } }, file: { unit: { one: "baitas", few: "baitai", many: "bait\u0173" }, verb: { smaller: { inclusive: "turi b\u016Bti ne didesnis kaip", notInclusive: "turi b\u016Bti ma\u017Eesnis kaip" }, bigger: { inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip", notInclusive: "turi b\u016Bti didesnis kaip" } } }, array: { unit: { one: "element\u0105", few: "elementus", many: "element\u0173" }, verb: { smaller: { inclusive: "turi tur\u0117ti ne daugiau kaip", notInclusive: "turi tur\u0117ti ma\u017Eiau kaip" }, bigger: { inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip", notInclusive: "turi tur\u0117ti daugiau kaip" } } }, set: { unit: { one: "element\u0105", few: "elementus", many: "element\u0173" }, verb: { smaller: { inclusive: "turi tur\u0117ti ne daugiau kaip", notInclusive: "turi tur\u0117ti ma\u017Eiau kaip" }, bigger: { inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip", notInclusive: "turi tur\u0117ti daugiau kaip" } } } };
          function t10(t11, r11, i11, n10) {
            let a10 = e10[t11] ?? null;
            return null === a10 ? a10 : { unit: a10.unit[r11], verb: a10.verb[n10][i11 ? "inclusive" : "notInclusive"] };
          }
          let r10 = { regex: "\u012Fvestis", email: "el. pa\u0161to adresas", url: "URL", emoji: "jaustukas", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO data ir laikas", date: "ISO data", time: "ISO laikas", duration: "ISO trukm\u0117", ipv4: "IPv4 adresas", ipv6: "IPv6 adresas", cidrv4: "IPv4 tinklo prefiksas (CIDR)", cidrv6: "IPv6 tinklo prefiksas (CIDR)", base64: "base64 u\u017Ekoduota eilut\u0117", base64url: "base64url u\u017Ekoduota eilut\u0117", json_string: "JSON eilut\u0117", e164: "E.164 numeris", jwt: "JWT", template_literal: "\u012Fvestis" }, i10 = { nan: "NaN", number: "skai\u010Dius", bigint: "sveikasis skai\u010Dius", string: "eilut\u0117", boolean: "login\u0117 reik\u0161m\u0117", undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117", function: "funkcija", symbol: "simbolis", array: "masyvas", object: "objektas", null: "nulin\u0117 reik\u0161m\u0117" };
          return (e11) => {
            switch (e11.code) {
              case "invalid_type": {
                let t11 = i10[e11.expected] ?? e11.expected, r11 = rG(e11.input), n10 = i10[r11] ?? r11;
                if (/^[A-Z]/.test(e11.expected)) return `Gautas tipas ${n10}, o tik\u0117tasi - instanceof ${e11.expected}`;
                return `Gautas tipas ${n10}, o tik\u0117tasi - ${t11}`;
              }
              case "invalid_value":
                if (1 === e11.values.length) return `Privalo b\u016Bti ${rj(e11.values[0])}`;
                return `Privalo b\u016Bti vienas i\u0161 ${rp(e11.values, "|")} pasirinkim\u0173`;
              case "too_big": {
                let r11 = i10[e11.origin] ?? e11.origin, n10 = t10(e11.origin, od(Number(e11.maximum)), e11.inclusive ?? false, "smaller");
                if (n10?.verb) return `${ol(r11 ?? e11.origin ?? "reik\u0161m\u0117")} ${n10.verb} ${e11.maximum.toString()} ${n10.unit ?? "element\u0173"}`;
                let a10 = e11.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
                return `${ol(r11 ?? e11.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${a10} ${e11.maximum.toString()} ${n10?.unit}`;
              }
              case "too_small": {
                let r11 = i10[e11.origin] ?? e11.origin, n10 = t10(e11.origin, od(Number(e11.minimum)), e11.inclusive ?? false, "bigger");
                if (n10?.verb) return `${ol(r11 ?? e11.origin ?? "reik\u0161m\u0117")} ${n10.verb} ${e11.minimum.toString()} ${n10.unit ?? "element\u0173"}`;
                let a10 = e11.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
                return `${ol(r11 ?? e11.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${a10} ${e11.minimum.toString()} ${n10?.unit}`;
              }
              case "invalid_format":
                if ("starts_with" === e11.format) return `Eilut\u0117 privalo prasid\u0117ti "${e11.prefix}"`;
                if ("ends_with" === e11.format) return `Eilut\u0117 privalo pasibaigti "${e11.suffix}"`;
                if ("includes" === e11.format) return `Eilut\u0117 privalo \u012Ftraukti "${e11.includes}"`;
                if ("regex" === e11.format) return `Eilut\u0117 privalo atitikti ${e11.pattern}`;
                return `Neteisingas ${r10[e11.format] ?? e11.format}`;
              case "not_multiple_of":
                return `Skai\u010Dius privalo b\u016Bti ${e11.divisor} kartotinis.`;
              case "unrecognized_keys":
                return `Neatpa\u017Eint${e11.keys.length > 1 ? "i" : "as"} rakt${e11.keys.length > 1 ? "ai" : "as"}: ${rp(e11.keys, ", ")}`;
              case "invalid_key":
                return "Rastas klaidingas raktas";
              case "invalid_union":
              default:
                return "Klaidinga \u012Fvestis";
              case "invalid_element": {
                let t11 = i10[e11.origin] ?? e11.origin;
                return `${ol(t11 ?? e11.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
              }
            }
          };
        })() };
      }, "mk", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" } }, t10 = { regex: "\u0432\u043D\u0435\u0441", email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430", url: "URL", emoji: "\u0435\u043C\u043E\u045F\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435", date: "ISO \u0434\u0430\u0442\u0443\u043C", time: "ISO \u0432\u0440\u0435\u043C\u0435", duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430", cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433", cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433", base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430", base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430", json_string: "JSON \u043D\u0438\u0437\u0430", e164: "E.164 \u0431\u0440\u043E\u0458", jwt: "JWT", template_literal: "\u0432\u043D\u0435\u0441" }, r10 = { nan: "NaN", number: "\u0431\u0440\u043E\u0458", array: "\u043D\u0438\u0437\u0430" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${i10.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${n10}`;
              return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${e11}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Invalid input: expected ${rj(i10.values[0])}`;
              return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${i10.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`;
              return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${i10.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${i10.origin} \u0434\u0430 \u0438\u043C\u0430 ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${i10.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${i10.includes}"`;
              if ("regex" === i10.format) return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${i10.pattern}`;
              return `Invalid ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${i10.divisor}`;
            case "unrecognized_keys":
              return `${i10.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
            case "invalid_element":
              return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${i10.origin}`;
          }
        }) };
      }, "ms", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "aksara", verb: "mempunyai" }, file: { unit: "bait", verb: "mempunyai" }, array: { unit: "elemen", verb: "mempunyai" }, set: { unit: "elemen", verb: "mempunyai" } }, t10 = { regex: "input", email: "alamat e-mel", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "tarikh masa ISO", date: "tarikh ISO", time: "masa ISO", duration: "tempoh ISO", ipv4: "alamat IPv4", ipv6: "alamat IPv6", cidrv4: "julat IPv4", cidrv6: "julat IPv6", base64: "string dikodkan base64", base64url: "string dikodkan base64url", json_string: "string JSON", e164: "nombor E.164", jwt: "JWT", template_literal: "input" }, r10 = { nan: "NaN", number: "nombor" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Input tidak sah: dijangka instanceof ${i10.expected}, diterima ${n10}`;
              return `Input tidak sah: dijangka ${e11}, diterima ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Input tidak sah: dijangka ${rj(i10.values[0])}`;
              return `Pilihan tidak sah: dijangka salah satu daripada ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Terlalu besar: dijangka ${i10.origin ?? "nilai"} ${r11.verb} ${t11}${i10.maximum.toString()} ${r11.unit ?? "elemen"}`;
              return `Terlalu besar: dijangka ${i10.origin ?? "nilai"} adalah ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Terlalu kecil: dijangka ${i10.origin} ${r11.verb} ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Terlalu kecil: dijangka ${i10.origin} adalah ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `String tidak sah: mesti bermula dengan "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `String tidak sah: mesti berakhir dengan "${i10.suffix}"`;
              if ("includes" === i10.format) return `String tidak sah: mesti mengandungi "${i10.includes}"`;
              if ("regex" === i10.format) return `String tidak sah: mesti sepadan dengan corak ${i10.pattern}`;
              return `${t10[i10.format] ?? i10.format} tidak sah`;
            case "not_multiple_of":
              return `Nombor tidak sah: perlu gandaan ${i10.divisor}`;
            case "unrecognized_keys":
              return `Kunci tidak dikenali: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Kunci tidak sah dalam ${i10.origin}`;
            case "invalid_union":
            default:
              return "Input tidak sah";
            case "invalid_element":
              return `Nilai tidak sah dalam ${i10.origin}`;
          }
        }) };
      }, "nl", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "tekens", verb: "heeft" }, file: { unit: "bytes", verb: "heeft" }, array: { unit: "elementen", verb: "heeft" }, set: { unit: "elementen", verb: "heeft" } }, t10 = { regex: "invoer", email: "emailadres", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datum en tijd", date: "ISO datum", time: "ISO tijd", duration: "ISO duur", ipv4: "IPv4-adres", ipv6: "IPv6-adres", cidrv4: "IPv4-bereik", cidrv6: "IPv6-bereik", base64: "base64-gecodeerde tekst", base64url: "base64 URL-gecodeerde tekst", json_string: "JSON string", e164: "E.164-nummer", jwt: "JWT", template_literal: "invoer" }, r10 = { nan: "NaN", number: "getal" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Ongeldige invoer: verwacht instanceof ${i10.expected}, ontving ${n10}`;
              return `Ongeldige invoer: verwacht ${e11}, ontving ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Ongeldige invoer: verwacht ${rj(i10.values[0])}`;
              return `Ongeldige optie: verwacht \xE9\xE9n van ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null, n10 = "date" === i10.origin ? "laat" : "string" === i10.origin ? "lang" : "groot";
              if (r11) return `Te ${n10}: verwacht dat ${i10.origin ?? "waarde"} ${t11}${i10.maximum.toString()} ${r11.unit ?? "elementen"} ${r11.verb}`;
              return `Te ${n10}: verwacht dat ${i10.origin ?? "waarde"} ${t11}${i10.maximum.toString()} is`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null, n10 = "date" === i10.origin ? "vroeg" : "string" === i10.origin ? "kort" : "klein";
              if (r11) return `Te ${n10}: verwacht dat ${i10.origin} ${t11}${i10.minimum.toString()} ${r11.unit} ${r11.verb}`;
              return `Te ${n10}: verwacht dat ${i10.origin} ${t11}${i10.minimum.toString()} is`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Ongeldige tekst: moet met "${i10.prefix}" beginnen`;
              if ("ends_with" === i10.format) return `Ongeldige tekst: moet op "${i10.suffix}" eindigen`;
              if ("includes" === i10.format) return `Ongeldige tekst: moet "${i10.includes}" bevatten`;
              if ("regex" === i10.format) return `Ongeldige tekst: moet overeenkomen met patroon ${i10.pattern}`;
              return `Ongeldig: ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Ongeldig getal: moet een veelvoud van ${i10.divisor} zijn`;
            case "unrecognized_keys":
              return `Onbekende key${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Ongeldige key in ${i10.origin}`;
            case "invalid_union":
            default:
              return "Ongeldige invoer";
            case "invalid_element":
              return `Ongeldige waarde in ${i10.origin}`;
          }
        }) };
      }, "no", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "tegn", verb: "\xE5 ha" }, file: { unit: "bytes", verb: "\xE5 ha" }, array: { unit: "elementer", verb: "\xE5 inneholde" }, set: { unit: "elementer", verb: "\xE5 inneholde" } }, t10 = { regex: "input", email: "e-postadresse", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dato- og klokkeslett", date: "ISO-dato", time: "ISO-klokkeslett", duration: "ISO-varighet", ipv4: "IPv4-omr\xE5de", ipv6: "IPv6-omr\xE5de", cidrv4: "IPv4-spekter", cidrv6: "IPv6-spekter", base64: "base64-enkodet streng", base64url: "base64url-enkodet streng", json_string: "JSON-streng", e164: "E.164-nummer", jwt: "JWT", template_literal: "input" }, r10 = { nan: "NaN", number: "tall", array: "liste" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Ugyldig input: forventet instanceof ${i10.expected}, fikk ${n10}`;
              return `Ugyldig input: forventet ${e11}, fikk ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Ugyldig verdi: forventet ${rj(i10.values[0])}`;
              return `Ugyldig valg: forventet en av ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `For stor(t): forventet ${i10.origin ?? "value"} til \xE5 ha ${t11}${i10.maximum.toString()} ${r11.unit ?? "elementer"}`;
              return `For stor(t): forventet ${i10.origin ?? "value"} til \xE5 ha ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `For lite(n): forventet ${i10.origin} til \xE5 ha ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `For lite(n): forventet ${i10.origin} til \xE5 ha ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Ugyldig streng: m\xE5 starte med "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Ugyldig streng: m\xE5 ende med "${i10.suffix}"`;
              if ("includes" === i10.format) return `Ugyldig streng: m\xE5 inneholde "${i10.includes}"`;
              if ("regex" === i10.format) return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${i10.pattern}`;
              return `Ugyldig ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${i10.divisor}`;
            case "unrecognized_keys":
              return `${i10.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Ugyldig n\xF8kkel i ${i10.origin}`;
            case "invalid_union":
            default:
              return "Ugyldig input";
            case "invalid_element":
              return `Ugyldig verdi i ${i10.origin}`;
          }
        }) };
      }, "ota", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "harf", verb: "olmal\u0131d\u0131r" }, file: { unit: "bayt", verb: "olmal\u0131d\u0131r" }, array: { unit: "unsur", verb: "olmal\u0131d\u0131r" }, set: { unit: "unsur", verb: "olmal\u0131d\u0131r" } }, t10 = { regex: "giren", email: "epostag\xE2h", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO heng\xE2m\u0131", date: "ISO tarihi", time: "ISO zaman\u0131", duration: "ISO m\xFCddeti", ipv4: "IPv4 ni\u015F\xE2n\u0131", ipv6: "IPv6 ni\u015F\xE2n\u0131", cidrv4: "IPv4 menzili", cidrv6: "IPv6 menzili", base64: "base64-\u015Fifreli metin", base64url: "base64url-\u015Fifreli metin", json_string: "JSON metin", e164: "E.164 say\u0131s\u0131", jwt: "JWT", template_literal: "giren" }, r10 = { nan: "NaN", number: "numara", array: "saf", null: "gayb" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `F\xE2sit giren: umulan instanceof ${i10.expected}, al\u0131nan ${n10}`;
              return `F\xE2sit giren: umulan ${e11}, al\u0131nan ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `F\xE2sit giren: umulan ${rj(i10.values[0])}`;
              return `F\xE2sit tercih: m\xFBteberler ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Fazla b\xFCy\xFCk: ${i10.origin ?? "value"}, ${t11}${i10.maximum.toString()} ${r11.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
              return `Fazla b\xFCy\xFCk: ${i10.origin ?? "value"}, ${t11}${i10.maximum.toString()} olmal\u0131yd\u0131.`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Fazla k\xFC\xE7\xFCk: ${i10.origin}, ${t11}${i10.minimum.toString()} ${r11.unit} sahip olmal\u0131yd\u0131.`;
              return `Fazla k\xFC\xE7\xFCk: ${i10.origin}, ${t11}${i10.minimum.toString()} olmal\u0131yd\u0131.`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `F\xE2sit metin: "${i10.prefix}" ile ba\u015Flamal\u0131.`;
              if ("ends_with" === i10.format) return `F\xE2sit metin: "${i10.suffix}" ile bitmeli.`;
              if ("includes" === i10.format) return `F\xE2sit metin: "${i10.includes}" ihtiv\xE2 etmeli.`;
              if ("regex" === i10.format) return `F\xE2sit metin: ${i10.pattern} nak\u015F\u0131na uymal\u0131.`;
              return `F\xE2sit ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `F\xE2sit say\u0131: ${i10.divisor} kat\u0131 olmal\u0131yd\u0131.`;
            case "unrecognized_keys":
              return `Tan\u0131nmayan anahtar ${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `${i10.origin} i\xE7in tan\u0131nmayan anahtar var.`;
            case "invalid_union":
              return "Giren tan\u0131namad\u0131.";
            case "invalid_element":
              return `${i10.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
            default:
              return "K\u0131ymet tan\u0131namad\u0131.";
          }
        }) };
      }, "pl", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "znak\xF3w", verb: "mie\u0107" }, file: { unit: "bajt\xF3w", verb: "mie\u0107" }, array: { unit: "element\xF3w", verb: "mie\u0107" }, set: { unit: "element\xF3w", verb: "mie\u0107" } }, t10 = { regex: "wyra\u017Cenie", email: "adres email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data i godzina w formacie ISO", date: "data w formacie ISO", time: "godzina w formacie ISO", duration: "czas trwania ISO", ipv4: "adres IPv4", ipv6: "adres IPv6", cidrv4: "zakres IPv4", cidrv6: "zakres IPv6", base64: "ci\u0105g znak\xF3w zakodowany w formacie base64", base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url", json_string: "ci\u0105g znak\xF3w w formacie JSON", e164: "liczba E.164", jwt: "JWT", template_literal: "wej\u015Bcie" }, r10 = { nan: "NaN", number: "liczba", array: "tablica" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${i10.expected}, otrzymano ${n10}`;
              return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${e11}, otrzymano ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${rj(i10.values[0])}`;
              return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${i10.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${t11}${i10.maximum.toString()} ${r11.unit ?? "element\xF3w"}`;
              return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${i10.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${i10.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${t11}${i10.minimum.toString()} ${r11.unit ?? "element\xF3w"}`;
              return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${i10.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${i10.suffix}"`;
              if ("includes" === i10.format) return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${i10.includes}"`;
              if ("regex" === i10.format) return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${i10.pattern}`;
              return `Nieprawid\u0142ow(y/a/e) ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${i10.divisor}`;
            case "unrecognized_keys":
              return `Nierozpoznane klucze${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Nieprawid\u0142owy klucz w ${i10.origin}`;
            case "invalid_union":
            default:
              return "Nieprawid\u0142owe dane wej\u015Bciowe";
            case "invalid_element":
              return `Nieprawid\u0142owa warto\u015B\u0107 w ${i10.origin}`;
          }
        }) };
      }, "ps", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }, file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" }, array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }, set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" } }, t10 = { regex: "\u0648\u0631\u0648\u062F\u064A", email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9", url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644", emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A", date: "\u0646\u06D0\u067C\u0647", time: "\u0648\u062E\u062A", duration: "\u0645\u0648\u062F\u0647", ipv4: "\u062F IPv4 \u067E\u062A\u0647", ipv6: "\u062F IPv6 \u067E\u062A\u0647", cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647", cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647", base64: "base64-encoded \u0645\u062A\u0646", base64url: "base64url-encoded \u0645\u062A\u0646", json_string: "JSON \u0645\u062A\u0646", e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647", jwt: "JWT", template_literal: "\u0648\u0631\u0648\u062F\u064A" }, r10 = { nan: "NaN", number: "\u0639\u062F\u062F", array: "\u0627\u0631\u06D0" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${i10.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${n10} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
              return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${e11} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${n10} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${rj(i10.values[0])} \u0648\u0627\u06CC`;
              return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${rp(i10.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${i10.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`;
              return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${i10.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${t11}${i10.maximum.toString()} \u0648\u064A`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${i10.origin} \u0628\u0627\u06CC\u062F ${t11}${i10.minimum.toString()} ${r11.unit} \u0648\u0644\u0631\u064A`;
              return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${i10.origin} \u0628\u0627\u06CC\u062F ${t11}${i10.minimum.toString()} \u0648\u064A`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${i10.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
              if ("ends_with" === i10.format) return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${i10.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
              if ("includes" === i10.format) return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${i10.includes}" \u0648\u0644\u0631\u064A`;
              if ("regex" === i10.format) return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${i10.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
              return `${t10[i10.format] ?? i10.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
            case "not_multiple_of":
              return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${i10.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
            case "unrecognized_keys":
              return `\u0646\u0627\u0633\u0645 ${i10.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${i10.origin} \u06A9\u06D0`;
            case "invalid_union":
            default:
              return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
            case "invalid_element":
              return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${i10.origin} \u06A9\u06D0`;
          }
        }) };
      }, "pt", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "caracteres", verb: "ter" }, file: { unit: "bytes", verb: "ter" }, array: { unit: "itens", verb: "ter" }, set: { unit: "itens", verb: "ter" } }, t10 = { regex: "padr\xE3o", email: "endere\xE7o de e-mail", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data e hora ISO", date: "data ISO", time: "hora ISO", duration: "dura\xE7\xE3o ISO", ipv4: "endere\xE7o IPv4", ipv6: "endere\xE7o IPv6", cidrv4: "faixa de IPv4", cidrv6: "faixa de IPv6", base64: "texto codificado em base64", base64url: "URL codificada em base64", json_string: "texto JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, r10 = { nan: "NaN", number: "n\xFAmero", null: "nulo" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Tipo inv\xE1lido: esperado instanceof ${i10.expected}, recebido ${n10}`;
              return `Tipo inv\xE1lido: esperado ${e11}, recebido ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Entrada inv\xE1lida: esperado ${rj(i10.values[0])}`;
              return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Muito grande: esperado que ${i10.origin ?? "valor"} tivesse ${t11}${i10.maximum.toString()} ${r11.unit ?? "elementos"}`;
              return `Muito grande: esperado que ${i10.origin ?? "valor"} fosse ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Muito pequeno: esperado que ${i10.origin} tivesse ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Muito pequeno: esperado que ${i10.origin} fosse ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Texto inv\xE1lido: deve come\xE7ar com "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Texto inv\xE1lido: deve terminar com "${i10.suffix}"`;
              if ("includes" === i10.format) return `Texto inv\xE1lido: deve incluir "${i10.includes}"`;
              if ("regex" === i10.format) return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${i10.pattern}`;
              return `${t10[i10.format] ?? i10.format} inv\xE1lido`;
            case "not_multiple_of":
              return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${i10.divisor}`;
            case "unrecognized_keys":
              return `Chave${i10.keys.length > 1 ? "s" : ""} desconhecida${i10.keys.length > 1 ? "s" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Chave inv\xE1lida em ${i10.origin}`;
            case "invalid_union":
              return "Entrada inv\xE1lida";
            case "invalid_element":
              return `Valor inv\xE1lido em ${i10.origin}`;
            default:
              return "Campo inv\xE1lido";
          }
        }) };
      }, "ro", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "caractere", verb: "s\u0103 aib\u0103" }, file: { unit: "octe\u021Bi", verb: "s\u0103 aib\u0103" }, array: { unit: "elemente", verb: "s\u0103 aib\u0103" }, set: { unit: "elemente", verb: "s\u0103 aib\u0103" }, map: { unit: "intr\u0103ri", verb: "s\u0103 aib\u0103" } }, t10 = { regex: "intrare", email: "adres\u0103 de email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "dat\u0103 \u0219i or\u0103 ISO", date: "dat\u0103 ISO", time: "or\u0103 ISO", duration: "durat\u0103 ISO", ipv4: "adres\u0103 IPv4", ipv6: "adres\u0103 IPv6", mac: "adres\u0103 MAC", cidrv4: "interval IPv4", cidrv6: "interval IPv6", base64: "\u0219ir codat base64", base64url: "\u0219ir codat base64url", json_string: "\u0219ir JSON", e164: "num\u0103r E.164", jwt: "JWT", template_literal: "intrare" }, r10 = { nan: "NaN", string: "\u0219ir", number: "num\u0103r", boolean: "boolean", function: "func\u021Bie", array: "matrice", object: "obiect", undefined: "nedefinit", symbol: "simbol", bigint: "num\u0103r mare", void: "void", never: "never", map: "hart\u0103", set: "set" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              return `Intrare invalid\u0103: a\u0219teptat ${e11}, primit ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Intrare invalid\u0103: a\u0219teptat ${rj(i10.values[0])}`;
              return `Op\u021Biune invalid\u0103: a\u0219teptat una dintre ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Prea mare: a\u0219teptat ca ${i10.origin ?? "valoarea"} ${r11.verb} ${t11}${i10.maximum.toString()} ${r11.unit ?? "elemente"}`;
              return `Prea mare: a\u0219teptat ca ${i10.origin ?? "valoarea"} s\u0103 fie ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Prea mic: a\u0219teptat ca ${i10.origin} ${r11.verb} ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Prea mic: a\u0219teptat ca ${i10.origin} s\u0103 fie ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u0218ir invalid: trebuie s\u0103 \xEEnceap\u0103 cu "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u0218ir invalid: trebuie s\u0103 se termine cu "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u0218ir invalid: trebuie s\u0103 includ\u0103 "${i10.includes}"`;
              if ("regex" === i10.format) return `\u0218ir invalid: trebuie s\u0103 se potriveasc\u0103 cu modelul ${i10.pattern}`;
              return `Format invalid: ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Num\u0103r invalid: trebuie s\u0103 fie multiplu de ${i10.divisor}`;
            case "unrecognized_keys":
              return `Chei nerecunoscute: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Cheie invalid\u0103 \xEEn ${i10.origin}`;
            case "invalid_union":
            default:
              return "Intrare invalid\u0103";
            case "invalid_element":
              return `Valoare invalid\u0103 \xEEn ${i10.origin}`;
          }
        }) };
      }, "ru", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: { one: "\u0441\u0438\u043C\u0432\u043E\u043B", few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, file: { unit: { one: "\u0431\u0430\u0439\u0442", few: "\u0431\u0430\u0439\u0442\u0430", many: "\u0431\u0430\u0439\u0442" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, array: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, set: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" } }, t10 = { regex: "\u0432\u0432\u043E\u0434", email: "email \u0430\u0434\u0440\u0435\u0441", url: "URL", emoji: "\u044D\u043C\u043E\u0434\u0437\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0432\u0440\u0435\u043C\u044F", duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441", cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64", base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url", json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430", e164: "\u043D\u043E\u043C\u0435\u0440 E.164", jwt: "JWT", template_literal: "\u0432\u0432\u043E\u0434" }, r10 = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0441\u0438\u0432" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${i10.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${n10}`;
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${e11}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${rj(i10.values[0])}`;
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) {
                let e11 = oc(Number(i10.maximum), r11.unit.one, r11.unit.few, r11.unit.many);
                return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${i10.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${t11}${i10.maximum.toString()} ${e11}`;
              }
              return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${i10.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) {
                let e11 = oc(Number(i10.minimum), r11.unit.one, r11.unit.few, r11.unit.many);
                return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${i10.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${t11}${i10.minimum.toString()} ${e11}`;
              }
              return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${i10.origin} \u0431\u0443\u0434\u0435\u0442 ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${i10.includes}"`;
              if ("regex" === i10.format) return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${i10.pattern}`;
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${i10.divisor}`;
            case "unrecognized_keys":
              return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${i10.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${i10.keys.length > 1 ? "\u0438" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
            case "invalid_element":
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${i10.origin}`;
          }
        }) };
      }, "sl", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "znakov", verb: "imeti" }, file: { unit: "bajtov", verb: "imeti" }, array: { unit: "elementov", verb: "imeti" }, set: { unit: "elementov", verb: "imeti" } }, t10 = { regex: "vnos", email: "e-po\u0161tni naslov", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datum in \u010Das", date: "ISO datum", time: "ISO \u010Das", duration: "ISO trajanje", ipv4: "IPv4 naslov", ipv6: "IPv6 naslov", cidrv4: "obseg IPv4", cidrv6: "obseg IPv6", base64: "base64 kodiran niz", base64url: "base64url kodiran niz", json_string: "JSON niz", e164: "E.164 \u0161tevilka", jwt: "JWT", template_literal: "vnos" }, r10 = { nan: "NaN", number: "\u0161tevilo", array: "tabela" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Neveljaven vnos: pri\u010Dakovano instanceof ${i10.expected}, prejeto ${n10}`;
              return `Neveljaven vnos: pri\u010Dakovano ${e11}, prejeto ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Neveljaven vnos: pri\u010Dakovano ${rj(i10.values[0])}`;
              return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Preveliko: pri\u010Dakovano, da bo ${i10.origin ?? "vrednost"} imelo ${t11}${i10.maximum.toString()} ${r11.unit ?? "elementov"}`;
              return `Preveliko: pri\u010Dakovano, da bo ${i10.origin ?? "vrednost"} ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Premajhno: pri\u010Dakovano, da bo ${i10.origin} imelo ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Premajhno: pri\u010Dakovano, da bo ${i10.origin} ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Neveljaven niz: mora se za\u010Deti z "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Neveljaven niz: mora se kon\u010Dati z "${i10.suffix}"`;
              if ("includes" === i10.format) return `Neveljaven niz: mora vsebovati "${i10.includes}"`;
              if ("regex" === i10.format) return `Neveljaven niz: mora ustrezati vzorcu ${i10.pattern}`;
              return `Neveljaven ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${i10.divisor}`;
            case "unrecognized_keys":
              return `Neprepoznan${i10.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Neveljaven klju\u010D v ${i10.origin}`;
            case "invalid_union":
            default:
              return "Neveljaven vnos";
            case "invalid_element":
              return `Neveljavna vrednost v ${i10.origin}`;
          }
        }) };
      }, "sv", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "tecken", verb: "att ha" }, file: { unit: "bytes", verb: "att ha" }, array: { unit: "objekt", verb: "att inneh\xE5lla" }, set: { unit: "objekt", verb: "att inneh\xE5lla" } }, t10 = { regex: "regulj\xE4rt uttryck", email: "e-postadress", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-datum och tid", date: "ISO-datum", time: "ISO-tid", duration: "ISO-varaktighet", ipv4: "IPv4-intervall", ipv6: "IPv6-intervall", cidrv4: "IPv4-spektrum", cidrv6: "IPv6-spektrum", base64: "base64-kodad str\xE4ng", base64url: "base64url-kodad str\xE4ng", json_string: "JSON-str\xE4ng", e164: "E.164-nummer", jwt: "JWT", template_literal: "mall-literal" }, r10 = { nan: "NaN", number: "antal", array: "lista" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${i10.expected}, fick ${n10}`;
              return `Ogiltig inmatning: f\xF6rv\xE4ntat ${e11}, fick ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Ogiltig inmatning: f\xF6rv\xE4ntat ${rj(i10.values[0])}`;
              return `Ogiltigt val: f\xF6rv\xE4ntade en av ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `F\xF6r stor(t): f\xF6rv\xE4ntade ${i10.origin ?? "v\xE4rdet"} att ha ${t11}${i10.maximum.toString()} ${r11.unit ?? "element"}`;
              return `F\xF6r stor(t): f\xF6rv\xE4ntat ${i10.origin ?? "v\xE4rdet"} att ha ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `F\xF6r lite(t): f\xF6rv\xE4ntade ${i10.origin ?? "v\xE4rdet"} att ha ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `F\xF6r lite(t): f\xF6rv\xE4ntade ${i10.origin ?? "v\xE4rdet"} att ha ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Ogiltig str\xE4ng: m\xE5ste sluta med "${i10.suffix}"`;
              if ("includes" === i10.format) return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${i10.includes}"`;
              if ("regex" === i10.format) return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${i10.pattern}"`;
              return `Ogiltig(t) ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Ogiltigt tal: m\xE5ste vara en multipel av ${i10.divisor}`;
            case "unrecognized_keys":
              return `${i10.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Ogiltig nyckel i ${i10.origin ?? "v\xE4rdet"}`;
            case "invalid_union":
            default:
              return "Ogiltig input";
            case "invalid_element":
              return `Ogiltigt v\xE4rde i ${i10.origin ?? "v\xE4rdet"}`;
          }
        }) };
      }, "ta", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" } }, t10 = { regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1", email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD", date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF", time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD", duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1", ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1", cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1", base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD", base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD", json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD", e164: "E.164 \u0B8E\u0BA3\u0BCD", jwt: "JWT", template_literal: "input" }, r10 = { nan: "NaN", number: "\u0B8E\u0BA3\u0BCD", array: "\u0B85\u0BA3\u0BBF", null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${i10.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n10}`;
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${e11}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${rj(i10.values[0])}`;
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${rp(i10.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${i10.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
              return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${i10.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${t11}${i10.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${i10.origin} ${t11}${i10.minimum.toString()} ${r11.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
              return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${i10.origin} ${t11}${i10.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${i10.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
              if ("ends_with" === i10.format) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${i10.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
              if ("includes" === i10.format) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${i10.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
              if ("regex" === i10.format) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${i10.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${i10.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            case "unrecognized_keys":
              return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${i10.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `${i10.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
            case "invalid_union":
            default:
              return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
            case "invalid_element":
              return `${i10.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
          }
        }) };
      }, "th", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" } }, t10 = { regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19", email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25", url: "URL", emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO", time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4", ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6", cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4", cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6", base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64", base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL", json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON", e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)", jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT", template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19" }, r10 = { nan: "NaN", number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02", array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)", null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${i10.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${n10}`;
              return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${e11} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${rj(i10.values[0])}`;
              return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${i10.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${t11} ${i10.maximum.toString()} ${r11.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`;
              return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${i10.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${t11} ${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${i10.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${t11} ${i10.minimum.toString()} ${r11.unit}`;
              return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${i10.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${t11} ${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${i10.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
              if ("regex" === i10.format) return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${i10.pattern}`;
              return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${i10.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
            case "unrecognized_keys":
              return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${i10.origin}`;
            case "invalid_union":
              return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
            case "invalid_element":
              return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${i10.origin}`;
            default:
              return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07";
          }
        }) };
      }, "tr", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "karakter", verb: "olmal\u0131" }, file: { unit: "bayt", verb: "olmal\u0131" }, array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }, set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" } }, t10 = { regex: "girdi", email: "e-posta adresi", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO tarih ve saat", date: "ISO tarih", time: "ISO saat", duration: "ISO s\xFCre", ipv4: "IPv4 adresi", ipv6: "IPv6 adresi", cidrv4: "IPv4 aral\u0131\u011F\u0131", cidrv6: "IPv6 aral\u0131\u011F\u0131", base64: "base64 ile \u015Fifrelenmi\u015F metin", base64url: "base64url ile \u015Fifrelenmi\u015F metin", json_string: "JSON dizesi", e164: "E.164 say\u0131s\u0131", jwt: "JWT", template_literal: "\u015Eablon dizesi" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${i10.expected}, al\u0131nan ${n10}`;
              return `Ge\xE7ersiz de\u011Fer: beklenen ${e11}, al\u0131nan ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Ge\xE7ersiz de\u011Fer: beklenen ${rj(i10.values[0])}`;
              return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\xC7ok b\xFCy\xFCk: beklenen ${i10.origin ?? "de\u011Fer"} ${t11}${i10.maximum.toString()} ${r11.unit ?? "\xF6\u011Fe"}`;
              return `\xC7ok b\xFCy\xFCk: beklenen ${i10.origin ?? "de\u011Fer"} ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\xC7ok k\xFC\xE7\xFCk: beklenen ${i10.origin} ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\xC7ok k\xFC\xE7\xFCk: beklenen ${i10.origin} ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Ge\xE7ersiz metin: "${i10.prefix}" ile ba\u015Flamal\u0131`;
              if ("ends_with" === i10.format) return `Ge\xE7ersiz metin: "${i10.suffix}" ile bitmeli`;
              if ("includes" === i10.format) return `Ge\xE7ersiz metin: "${i10.includes}" i\xE7ermeli`;
              if ("regex" === i10.format) return `Ge\xE7ersiz metin: ${i10.pattern} desenine uymal\u0131`;
              return `Ge\xE7ersiz ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Ge\xE7ersiz say\u0131: ${i10.divisor} ile tam b\xF6l\xFCnebilmeli`;
            case "unrecognized_keys":
              return `Tan\u0131nmayan anahtar${i10.keys.length > 1 ? "lar" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `${i10.origin} i\xE7inde ge\xE7ersiz anahtar`;
            case "invalid_union":
            default:
              return "Ge\xE7ersiz de\u011Fer";
            case "invalid_element":
              return `${i10.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
          }
        }) };
      }, "ua", 0, function() {
        return of();
      }, "uk", 0, of, "ur", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" }, file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" }, array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }, set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" } }, t10 = { regex: "\u0627\u0646 \u067E\u0679", email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633", url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644", emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC", uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4", uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6", nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC", guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2", ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC", xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC", ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645", date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E", time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A", duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A", ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633", ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633", cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C", cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C", base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF", base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF", json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF", e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631", jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC", template_literal: "\u0627\u0646 \u067E\u0679" }, r10 = { nan: "NaN", number: "\u0646\u0645\u0628\u0631", array: "\u0622\u0631\u06D2", null: "\u0646\u0644" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${i10.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${n10} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
              return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${e11} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${n10} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${rj(i10.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
              return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${rp(i10.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${i10.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
              return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${i10.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${t11}${i10.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${i10.origin} \u06A9\u06D2 ${t11}${i10.minimum.toString()} ${r11.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
              return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${i10.origin} \u06A9\u0627 ${t11}${i10.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${i10.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
              if ("ends_with" === i10.format) return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${i10.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
              if ("includes" === i10.format) return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${i10.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
              if ("regex" === i10.format) return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${i10.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
              return `\u063A\u0644\u0637 ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${i10.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
            case "unrecognized_keys":
              return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${i10.keys.length > 1 ? "\u0632" : ""}: ${rp(i10.keys, "\u060C ")}`;
            case "invalid_key":
              return `${i10.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
            case "invalid_union":
            default:
              return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
            case "invalid_element":
              return `${i10.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
          }
        }) };
      }, "uz", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "belgi", verb: "bo\u2018lishi kerak" }, file: { unit: "bayt", verb: "bo\u2018lishi kerak" }, array: { unit: "element", verb: "bo\u2018lishi kerak" }, set: { unit: "element", verb: "bo\u2018lishi kerak" }, map: { unit: "yozuv", verb: "bo\u2018lishi kerak" } }, t10 = { regex: "kirish", email: "elektron pochta manzili", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO sana va vaqti", date: "ISO sana", time: "ISO vaqt", duration: "ISO davomiylik", ipv4: "IPv4 manzil", ipv6: "IPv6 manzil", mac: "MAC manzil", cidrv4: "IPv4 diapazon", cidrv6: "IPv6 diapazon", base64: "base64 kodlangan satr", base64url: "base64url kodlangan satr", json_string: "JSON satr", e164: "E.164 raqam", jwt: "JWT", template_literal: "kirish" }, r10 = { nan: "NaN", number: "raqam", array: "massiv" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${i10.expected}, qabul qilingan ${n10}`;
              return `Noto\u2018g\u2018ri kirish: kutilgan ${e11}, qabul qilingan ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `Noto\u2018g\u2018ri kirish: kutilgan ${rj(i10.values[0])}`;
              return `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Juda katta: kutilgan ${i10.origin ?? "qiymat"} ${t11}${i10.maximum.toString()} ${r11.unit} ${r11.verb}`;
              return `Juda katta: kutilgan ${i10.origin ?? "qiymat"} ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Juda kichik: kutilgan ${i10.origin} ${t11}${i10.minimum.toString()} ${r11.unit} ${r11.verb}`;
              return `Juda kichik: kutilgan ${i10.origin} ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Noto\u2018g\u2018ri satr: "${i10.prefix}" bilan boshlanishi kerak`;
              if ("ends_with" === i10.format) return `Noto\u2018g\u2018ri satr: "${i10.suffix}" bilan tugashi kerak`;
              if ("includes" === i10.format) return `Noto\u2018g\u2018ri satr: "${i10.includes}" ni o\u2018z ichiga olishi kerak`;
              if ("regex" === i10.format) return `Noto\u2018g\u2018ri satr: ${i10.pattern} shabloniga mos kelishi kerak`;
              return `Noto\u2018g\u2018ri ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `Noto\u2018g\u2018ri raqam: ${i10.divisor} ning karralisi bo\u2018lishi kerak`;
            case "unrecognized_keys":
              return `Noma\u2019lum kalit${i10.keys.length > 1 ? "lar" : ""}: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `${i10.origin} dagi kalit noto\u2018g\u2018ri`;
            case "invalid_union":
            default:
              return "Noto\u2018g\u2018ri kirish";
            case "invalid_element":
              return `${i10.origin} da noto\u2018g\u2018ri qiymat`;
          }
        }) };
      }, "vi", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" }, file: { unit: "byte", verb: "c\xF3" }, array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }, set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" } }, t10 = { regex: "\u0111\u1EA7u v\xE0o", email: "\u0111\u1ECBa ch\u1EC9 email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ng\xE0y gi\u1EDD ISO", date: "ng\xE0y ISO", time: "gi\u1EDD ISO", duration: "kho\u1EA3ng th\u1EDDi gian ISO", ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4", ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6", cidrv4: "d\u1EA3i IPv4", cidrv6: "d\u1EA3i IPv6", base64: "chu\u1ED7i m\xE3 h\xF3a base64", base64url: "chu\u1ED7i m\xE3 h\xF3a base64url", json_string: "chu\u1ED7i JSON", e164: "s\u1ED1 E.164", jwt: "JWT", template_literal: "\u0111\u1EA7u v\xE0o" }, r10 = { nan: "NaN", number: "s\u1ED1", array: "m\u1EA3ng" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${i10.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${n10}`;
              return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${e11}, nh\u1EADn \u0111\u01B0\u1EE3c ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${rj(i10.values[0])}`;
              return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${i10.origin ?? "gi\xE1 tr\u1ECB"} ${r11.verb} ${t11}${i10.maximum.toString()} ${r11.unit ?? "ph\u1EA7n t\u1EED"}`;
              return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${i10.origin ?? "gi\xE1 tr\u1ECB"} ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${i10.origin} ${r11.verb} ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${i10.origin} ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${i10.suffix}"`;
              if ("includes" === i10.format) return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${i10.includes}"`;
              if ("regex" === i10.format) return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${i10.pattern}`;
              return `${t10[i10.format] ?? i10.format} kh\xF4ng h\u1EE3p l\u1EC7`;
            case "not_multiple_of":
              return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${i10.divisor}`;
            case "unrecognized_keys":
              return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${i10.origin}`;
            case "invalid_union":
            default:
              return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
            case "invalid_element":
              return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${i10.origin}`;
          }
        }) };
      }, "yo", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\xE0mi", verb: "n\xED" }, file: { unit: "bytes", verb: "n\xED" }, array: { unit: "nkan", verb: "n\xED" }, set: { unit: "nkan", verb: "n\xED" } }, t10 = { regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9", email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\xE0k\xF3k\xF2 ISO", date: "\u1ECDj\u1ECD\u0301 ISO", time: "\xE0k\xF3k\xF2 ISO", duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO", ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4", ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6", cidrv4: "\xE0gb\xE8gb\xE8 IPv4", cidrv6: "\xE0gb\xE8gb\xE8 IPv6", base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64", base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url", json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON", e164: "n\u1ECD\u0301mb\xE0 E.164", jwt: "JWT", template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9" }, r10 = { nan: "NaN", number: "n\u1ECD\u0301mb\xE0", array: "akop\u1ECD" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${i10.expected}, \xE0m\u1ECD\u0300 a r\xED ${n10}`;
              return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${e11}, \xE0m\u1ECD\u0300 a r\xED ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${rj(i10.values[0])}`;
              return `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${i10.origin ?? "iye"} ${r11.verb} ${t11}${i10.maximum} ${r11.unit}`;
              return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${t11}${i10.maximum}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${i10.origin} ${r11.verb} ${t11}${i10.minimum} ${r11.unit}`;
              return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${t11}${i10.minimum}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${i10.prefix}"`;
              if ("ends_with" === i10.format) return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${i10.suffix}"`;
              if ("includes" === i10.format) return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${i10.includes}"`;
              if ("regex" === i10.format) return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${i10.pattern}`;
              return `A\u1E63\xEC\u1E63e: ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${i10.divisor}`;
            case "unrecognized_keys":
              return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${i10.origin}`;
            case "invalid_union":
            default:
              return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
            case "invalid_element":
              return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${i10.origin}`;
          }
        }) };
      }, "zhCN", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" }, file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" }, array: { unit: "\u9879", verb: "\u5305\u542B" }, set: { unit: "\u9879", verb: "\u5305\u542B" } }, t10 = { regex: "\u8F93\u5165", email: "\u7535\u5B50\u90AE\u4EF6", url: "URL", emoji: "\u8868\u60C5\u7B26\u53F7", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO\u65E5\u671F\u65F6\u95F4", date: "ISO\u65E5\u671F", time: "ISO\u65F6\u95F4", duration: "ISO\u65F6\u957F", ipv4: "IPv4\u5730\u5740", ipv6: "IPv6\u5730\u5740", cidrv4: "IPv4\u7F51\u6BB5", cidrv6: "IPv6\u7F51\u6BB5", base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32", base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32", json_string: "JSON\u5B57\u7B26\u4E32", e164: "E.164\u53F7\u7801", jwt: "JWT", template_literal: "\u8F93\u5165" }, r10 = { nan: "NaN", number: "\u6570\u5B57", array: "\u6570\u7EC4", null: "\u7A7A\u503C(null)" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${i10.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${n10}`;
              return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${e11}\uFF0C\u5B9E\u9645\u63A5\u6536 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${rj(i10.values[0])}`;
              return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${i10.origin ?? "\u503C"} ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u4E2A\u5143\u7D20"}`;
              return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${i10.origin ?? "\u503C"} ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${i10.origin} ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${i10.origin} ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${i10.prefix}" \u5F00\u5934`;
              if ("ends_with" === i10.format) return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${i10.suffix}" \u7ED3\u5C3E`;
              if ("includes" === i10.format) return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${i10.includes}"`;
              if ("regex" === i10.format) return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${i10.pattern}`;
              return `\u65E0\u6548${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${i10.divisor} \u7684\u500D\u6570`;
            case "unrecognized_keys":
              return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${rp(i10.keys, ", ")}`;
            case "invalid_key":
              return `${i10.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
            case "invalid_union":
            default:
              return "\u65E0\u6548\u8F93\u5165";
            case "invalid_element":
              return `${i10.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
          }
        }) };
      }, "zhTW", 0, function() {
        let e10, t10, r10;
        return { localeError: (e10 = { string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" }, file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" }, array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }, set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" } }, t10 = { regex: "\u8F38\u5165", email: "\u90F5\u4EF6\u5730\u5740", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u65E5\u671F\u6642\u9593", date: "ISO \u65E5\u671F", time: "ISO \u6642\u9593", duration: "ISO \u671F\u9593", ipv4: "IPv4 \u4F4D\u5740", ipv6: "IPv6 \u4F4D\u5740", cidrv4: "IPv4 \u7BC4\u570D", cidrv6: "IPv6 \u7BC4\u570D", base64: "base64 \u7DE8\u78BC\u5B57\u4E32", base64url: "base64url \u7DE8\u78BC\u5B57\u4E32", json_string: "JSON \u5B57\u4E32", e164: "E.164 \u6578\u503C", jwt: "JWT", template_literal: "\u8F38\u5165" }, r10 = { nan: "NaN" }, (i10) => {
          switch (i10.code) {
            case "invalid_type": {
              let e11 = r10[i10.expected] ?? i10.expected, t11 = rG(i10.input), n10 = r10[t11] ?? t11;
              if (/^[A-Z]/.test(i10.expected)) return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${i10.expected}\uFF0C\u4F46\u6536\u5230 ${n10}`;
              return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${e11}\uFF0C\u4F46\u6536\u5230 ${n10}`;
            }
            case "invalid_value":
              if (1 === i10.values.length) return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${rj(i10.values[0])}`;
              return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${rp(i10.values, "|")}`;
            case "too_big": {
              let t11 = i10.inclusive ? "<=" : "<", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${i10.origin ?? "\u503C"} \u61C9\u70BA ${t11}${i10.maximum.toString()} ${r11.unit ?? "\u500B\u5143\u7D20"}`;
              return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${i10.origin ?? "\u503C"} \u61C9\u70BA ${t11}${i10.maximum.toString()}`;
            }
            case "too_small": {
              let t11 = i10.inclusive ? ">=" : ">", r11 = e10[i10.origin] ?? null;
              if (r11) return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${i10.origin} \u61C9\u70BA ${t11}${i10.minimum.toString()} ${r11.unit}`;
              return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${i10.origin} \u61C9\u70BA ${t11}${i10.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i10.format) return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${i10.prefix}" \u958B\u982D`;
              if ("ends_with" === i10.format) return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${i10.suffix}" \u7D50\u5C3E`;
              if ("includes" === i10.format) return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${i10.includes}"`;
              if ("regex" === i10.format) return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${i10.pattern}`;
              return `\u7121\u6548\u7684 ${t10[i10.format] ?? i10.format}`;
            case "not_multiple_of":
              return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${i10.divisor} \u7684\u500D\u6578`;
            case "unrecognized_keys":
              return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${i10.keys.length > 1 ? "\u5011" : ""}\uFF1A${rp(i10.keys, "\u3001")}`;
            case "invalid_key":
              return `${i10.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
            case "invalid_union":
            default:
              return "\u7121\u6548\u7684\u8F38\u5165\u503C";
            case "invalid_element":
              return `${i10.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
          }
        }) };
      }], 51223);
      var om = e.i(51223);
      let op = Symbol("ZodOutput"), ov = Symbol("ZodInput");
      class og {
        constructor() {
          this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
        }
        add(e10, ...t10) {
          let r10 = t10[0];
          return this._map.set(e10, r10), r10 && "object" == typeof r10 && "id" in r10 && this._idmap.set(r10.id, e10), this;
        }
        clear() {
          return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
        }
        remove(e10) {
          let t10 = this._map.get(e10);
          return t10 && "object" == typeof t10 && "id" in t10 && this._idmap.delete(t10.id), this._map.delete(e10), this;
        }
        get(e10) {
          let t10 = e10._zod.parent;
          if (t10) {
            let r10 = { ...this.get(t10) ?? {} };
            delete r10.id;
            let i10 = { ...r10, ...this._map.get(e10) };
            return Object.keys(i10).length ? i10 : void 0;
          }
          return this._map.get(e10);
        }
        has(e10) {
          return this._map.has(e10);
        }
      }
      function oh() {
        return new og();
      }
      (et = globalThis).__zod_globalRegistry ?? (et.__zod_globalRegistry = oh());
      let o_ = globalThis.__zod_globalRegistry;
      function ob(e10, t10) {
        return new e10({ type: "string", ...rU(t10) });
      }
      function oy(e10, t10) {
        return new e10({ type: "string", coerce: true, ...rU(t10) });
      }
      function o$(e10, t10) {
        return new e10({ type: "string", format: "email", check: "string_format", abort: false, ...rU(t10) });
      }
      function ox(e10, t10) {
        return new e10({ type: "string", format: "guid", check: "string_format", abort: false, ...rU(t10) });
      }
      function ow(e10, t10) {
        return new e10({ type: "string", format: "uuid", check: "string_format", abort: false, ...rU(t10) });
      }
      function ok(e10, t10) {
        return new e10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v4", ...rU(t10) });
      }
      function oS(e10, t10) {
        return new e10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v6", ...rU(t10) });
      }
      function oI(e10, t10) {
        return new e10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v7", ...rU(t10) });
      }
      function oO(e10, t10) {
        return new e10({ type: "string", format: "url", check: "string_format", abort: false, ...rU(t10) });
      }
      function oE(e10, t10) {
        return new e10({ type: "string", format: "emoji", check: "string_format", abort: false, ...rU(t10) });
      }
      function oP(e10, t10) {
        return new e10({ type: "string", format: "nanoid", check: "string_format", abort: false, ...rU(t10) });
      }
      function oT(e10, t10) {
        return new e10({ type: "string", format: "cuid", check: "string_format", abort: false, ...rU(t10) });
      }
      function oN(e10, t10) {
        return new e10({ type: "string", format: "cuid2", check: "string_format", abort: false, ...rU(t10) });
      }
      function oz(e10, t10) {
        return new e10({ type: "string", format: "ulid", check: "string_format", abort: false, ...rU(t10) });
      }
      function oC(e10, t10) {
        return new e10({ type: "string", format: "xid", check: "string_format", abort: false, ...rU(t10) });
      }
      function oR(e10, t10) {
        return new e10({ type: "string", format: "ksuid", check: "string_format", abort: false, ...rU(t10) });
      }
      function oU(e10, t10) {
        return new e10({ type: "string", format: "ipv4", check: "string_format", abort: false, ...rU(t10) });
      }
      function oj(e10, t10) {
        return new e10({ type: "string", format: "ipv6", check: "string_format", abort: false, ...rU(t10) });
      }
      function oD(e10, t10) {
        return new e10({ type: "string", format: "mac", check: "string_format", abort: false, ...rU(t10) });
      }
      function oA(e10, t10) {
        return new e10({ type: "string", format: "cidrv4", check: "string_format", abort: false, ...rU(t10) });
      }
      function oZ(e10, t10) {
        return new e10({ type: "string", format: "cidrv6", check: "string_format", abort: false, ...rU(t10) });
      }
      function oL(e10, t10) {
        return new e10({ type: "string", format: "base64", check: "string_format", abort: false, ...rU(t10) });
      }
      function oM(e10, t10) {
        return new e10({ type: "string", format: "base64url", check: "string_format", abort: false, ...rU(t10) });
      }
      function oF(e10, t10) {
        return new e10({ type: "string", format: "e164", check: "string_format", abort: false, ...rU(t10) });
      }
      function oJ(e10, t10) {
        return new e10({ type: "string", format: "jwt", check: "string_format", abort: false, ...rU(t10) });
      }
      e.s(["$ZodRegistry", 0, og, "$input", 0, ov, "$output", 0, op, "globalRegistry", 0, o_, "registry", 0, oh], 54767), e.i(54767), e.i(41102);
      let oB = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
      function oq(e10, t10) {
        return new e10({ type: "string", format: "datetime", check: "string_format", offset: false, local: false, precision: null, ...rU(t10) });
      }
      function oV(e10, t10) {
        return new e10({ type: "string", format: "date", check: "string_format", ...rU(t10) });
      }
      function oG(e10, t10) {
        return new e10({ type: "string", format: "time", check: "string_format", precision: null, ...rU(t10) });
      }
      function oW(e10, t10) {
        return new e10({ type: "string", format: "duration", check: "string_format", ...rU(t10) });
      }
      function oX(e10, t10) {
        return new e10({ type: "number", checks: [], ...rU(t10) });
      }
      function oH(e10, t10) {
        return new e10({ type: "number", coerce: true, checks: [], ...rU(t10) });
      }
      function oK(e10, t10) {
        return new e10({ type: "number", check: "number_format", abort: false, format: "safeint", ...rU(t10) });
      }
      function oY(e10, t10) {
        return new e10({ type: "number", check: "number_format", abort: false, format: "float32", ...rU(t10) });
      }
      function oQ(e10, t10) {
        return new e10({ type: "number", check: "number_format", abort: false, format: "float64", ...rU(t10) });
      }
      function o0(e10, t10) {
        return new e10({ type: "number", check: "number_format", abort: false, format: "int32", ...rU(t10) });
      }
      function o1(e10, t10) {
        return new e10({ type: "number", check: "number_format", abort: false, format: "uint32", ...rU(t10) });
      }
      function o4(e10, t10) {
        return new e10({ type: "boolean", ...rU(t10) });
      }
      function o6(e10, t10) {
        return new e10({ type: "boolean", coerce: true, ...rU(t10) });
      }
      function o2(e10, t10) {
        return new e10({ type: "bigint", ...rU(t10) });
      }
      function o9(e10, t10) {
        return new e10({ type: "bigint", coerce: true, ...rU(t10) });
      }
      function o3(e10, t10) {
        return new e10({ type: "bigint", check: "bigint_format", abort: false, format: "int64", ...rU(t10) });
      }
      function o7(e10, t10) {
        return new e10({ type: "bigint", check: "bigint_format", abort: false, format: "uint64", ...rU(t10) });
      }
      function o5(e10, t10) {
        return new e10({ type: "symbol", ...rU(t10) });
      }
      function o8(e10, t10) {
        return new e10({ type: "undefined", ...rU(t10) });
      }
      function se(e10, t10) {
        return new e10({ type: "null", ...rU(t10) });
      }
      function st(e10) {
        return new e10({ type: "any" });
      }
      function sr(e10) {
        return new e10({ type: "unknown" });
      }
      function si(e10, t10) {
        return new e10({ type: "never", ...rU(t10) });
      }
      function sn(e10, t10) {
        return new e10({ type: "void", ...rU(t10) });
      }
      function sa(e10, t10) {
        return new e10({ type: "date", ...rU(t10) });
      }
      function so(e10, t10) {
        return new e10({ type: "date", coerce: true, ...rU(t10) });
      }
      function ss(e10, t10) {
        return new e10({ type: "nan", ...rU(t10) });
      }
      function su(e10, t10) {
        return new nd({ check: "less_than", ...rU(t10), value: e10, inclusive: false });
      }
      function sl(e10, t10) {
        return new nd({ check: "less_than", ...rU(t10), value: e10, inclusive: true });
      }
      function sd(e10, t10) {
        return new nc({ check: "greater_than", ...rU(t10), value: e10, inclusive: false });
      }
      function sc(e10, t10) {
        return new nc({ check: "greater_than", ...rU(t10), value: e10, inclusive: true });
      }
      function sf(e10) {
        return sd(0, e10);
      }
      function sm(e10) {
        return su(0, e10);
      }
      function sp(e10) {
        return sl(0, e10);
      }
      function sv(e10) {
        return sc(0, e10);
      }
      function sg(e10, t10) {
        return new nf({ check: "multiple_of", ...rU(t10), value: e10 });
      }
      function sh(e10, t10) {
        return new nv({ check: "max_size", ...rU(t10), maximum: e10 });
      }
      function s_(e10, t10) {
        return new ng({ check: "min_size", ...rU(t10), minimum: e10 });
      }
      function sb(e10, t10) {
        return new nh({ check: "size_equals", ...rU(t10), size: e10 });
      }
      function sy(e10, t10) {
        return new n_({ check: "max_length", ...rU(t10), maximum: e10 });
      }
      function s$(e10, t10) {
        return new nb({ check: "min_length", ...rU(t10), minimum: e10 });
      }
      function sx(e10, t10) {
        return new ny({ check: "length_equals", ...rU(t10), length: e10 });
      }
      function sw(e10, t10) {
        return new nx({ check: "string_format", format: "regex", ...rU(t10), pattern: e10 });
      }
      function sk(e10) {
        return new nw({ check: "string_format", format: "lowercase", ...rU(e10) });
      }
      function sS(e10) {
        return new nk({ check: "string_format", format: "uppercase", ...rU(e10) });
      }
      function sI(e10, t10) {
        return new nS({ check: "string_format", format: "includes", ...rU(t10), includes: e10 });
      }
      function sO(e10, t10) {
        return new nI({ check: "string_format", format: "starts_with", ...rU(t10), prefix: e10 });
      }
      function sE(e10, t10) {
        return new nO({ check: "string_format", format: "ends_with", ...rU(t10), suffix: e10 });
      }
      function sP(e10, t10, r10) {
        return new nP({ check: "property", property: e10, schema: t10, ...rU(r10) });
      }
      function sT(e10, t10) {
        return new nT({ check: "mime_type", mime: e10, ...rU(t10) });
      }
      function sN(e10) {
        return new nN({ check: "overwrite", tx: e10 });
      }
      function sz(e10) {
        return sN((t10) => t10.normalize(e10));
      }
      function sC() {
        return sN((e10) => e10.trim());
      }
      function sR() {
        return sN((e10) => e10.toLowerCase());
      }
      function sU() {
        return sN((e10) => e10.toUpperCase());
      }
      function sj() {
        return sN((e10) => rS(e10));
      }
      function sD(e10, t10, r10) {
        return new e10({ type: "array", element: t10, ...rU(r10) });
      }
      function sA(e10, t10, r10) {
        return new e10({ type: "union", options: t10, ...rU(r10) });
      }
      function sZ(e10, t10, r10) {
        return new e10({ type: "union", options: t10, inclusive: false, ...rU(r10) });
      }
      function sL(e10, t10, r10, i10) {
        return new e10({ type: "union", options: r10, discriminator: t10, ...rU(i10) });
      }
      function sM(e10, t10, r10) {
        return new e10({ type: "intersection", left: t10, right: r10 });
      }
      function sF(e10, t10, r10, i10) {
        let n10 = r10 instanceof nR, a10 = n10 ? i10 : r10;
        return new e10({ type: "tuple", items: t10, rest: n10 ? r10 : null, ...rU(a10) });
      }
      function sJ(e10, t10, r10, i10) {
        return new e10({ type: "record", keyType: t10, valueType: r10, ...rU(i10) });
      }
      function sB(e10, t10, r10, i10) {
        return new e10({ type: "map", keyType: t10, valueType: r10, ...rU(i10) });
      }
      function sq(e10, t10, r10) {
        return new e10({ type: "set", valueType: t10, ...rU(r10) });
      }
      function sV(e10, t10, r10) {
        return new e10({ type: "enum", entries: Array.isArray(t10) ? Object.fromEntries(t10.map((e11) => [e11, e11])) : t10, ...rU(r10) });
      }
      function sG(e10, t10, r10) {
        return new e10({ type: "enum", entries: t10, ...rU(r10) });
      }
      function sW(e10, t10, r10) {
        return new e10({ type: "literal", values: Array.isArray(t10) ? t10 : [t10], ...rU(r10) });
      }
      function sX(e10, t10) {
        return new e10({ type: "file", ...rU(t10) });
      }
      function sH(e10, t10) {
        return new e10({ type: "transform", transform: t10 });
      }
      function sK(e10, t10) {
        return new e10({ type: "optional", innerType: t10 });
      }
      function sY(e10, t10) {
        return new e10({ type: "nullable", innerType: t10 });
      }
      function sQ(e10, t10, r10) {
        return new e10({ type: "default", innerType: t10, get defaultValue() {
          return "function" == typeof r10 ? r10() : rT(r10);
        } });
      }
      function s0(e10, t10, r10) {
        return new e10({ type: "nonoptional", innerType: t10, ...rU(r10) });
      }
      function s1(e10, t10) {
        return new e10({ type: "success", innerType: t10 });
      }
      function s4(e10, t10, r10) {
        return new e10({ type: "catch", innerType: t10, catchValue: "function" == typeof r10 ? r10 : () => r10 });
      }
      function s6(e10, t10, r10) {
        return new e10({ type: "pipe", in: t10, out: r10 });
      }
      function s2(e10, t10) {
        return new e10({ type: "readonly", innerType: t10 });
      }
      function s9(e10, t10, r10) {
        return new e10({ type: "template_literal", parts: t10, ...rU(r10) });
      }
      function s3(e10, t10) {
        return new e10({ type: "lazy", getter: t10 });
      }
      function s7(e10, t10) {
        return new e10({ type: "promise", innerType: t10 });
      }
      function s5(e10, t10, r10) {
        let i10 = rU(r10);
        return i10.abort ?? (i10.abort = true), new e10({ type: "custom", check: "custom", fn: t10, ...i10 });
      }
      function s8(e10, t10, r10) {
        return new e10({ type: "custom", check: "custom", fn: t10, ...rU(r10) });
      }
      function ue(e10, t10) {
        let r10 = ut((t11) => (t11.addIssue = (e11) => {
          "string" == typeof e11 ? t11.issues.push(rW(e11, t11.value, r10._zod.def)) : (e11.fatal && (e11.continue = false), e11.code ?? (e11.code = "custom"), e11.input ?? (e11.input = t11.value), e11.inst ?? (e11.inst = r10), e11.continue ?? (e11.continue = !r10._zod.def.abort), t11.issues.push(rW(e11)));
        }, e10(t11.value, t11)), t10);
        return r10;
      }
      function ut(e10, t10) {
        let r10 = new nu({ check: "custom", ...rU(t10) });
        return r10._zod.check = e10, r10;
      }
      function ur(e10) {
        let t10 = new nu({ check: "describe" });
        return t10._zod.onattach = [(t11) => {
          let r10 = o_.get(t11) ?? {};
          o_.add(t11, { ...r10, description: e10 });
        }], t10._zod.check = () => {
        }, t10;
      }
      function ui(e10) {
        let t10 = new nu({ check: "meta" });
        return t10._zod.onattach = [(t11) => {
          let r10 = o_.get(t11) ?? {};
          o_.add(t11, { ...r10, ...e10 });
        }], t10._zod.check = () => {
        }, t10;
      }
      function un(e10, t10) {
        let r10 = rU(t10), i10 = r10.truthy ?? ["true", "1", "yes", "on", "y", "enabled"], n10 = r10.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
        "sensitive" !== r10.case && (i10 = i10.map((e11) => "string" == typeof e11 ? e11.toLowerCase() : e11), n10 = n10.map((e11) => "string" == typeof e11 ? e11.toLowerCase() : e11));
        let a10 = new Set(i10), o10 = new Set(n10), s10 = e10.Codec ?? a1, u10 = e10.Boolean ?? ai, l10 = new s10({ type: "pipe", in: new (e10.String ?? nU)({ type: "string", error: r10.error }), out: new u10({ type: "boolean", error: r10.error }), transform: (e11, t11) => {
          let i11 = e11;
          return "sensitive" !== r10.case && (i11 = i11.toLowerCase()), !!a10.has(i11) || !o10.has(i11) && (t11.issues.push({ code: "invalid_value", expected: "stringbool", values: [...a10, ...o10], input: t11.value, inst: l10, continue: false }), {});
        }, reverseTransform: (e11, t11) => true === e11 ? i10[0] || "true" : n10[0] || "false", error: r10.error });
        return l10;
      }
      function ua(e10, t10, r10, i10 = {}) {
        let n10 = rU(i10), a10 = { ...rU(i10), check: "string_format", type: "string", format: t10, fn: "function" == typeof r10 ? r10 : (e11) => r10.test(e11), ...n10 };
        return r10 instanceof RegExp && (a10.pattern = r10), new e10(a10);
      }
      function uo(e10) {
        let t10 = e10?.target ?? "draft-2020-12";
        return "draft-4" === t10 && (t10 = "draft-04"), "draft-7" === t10 && (t10 = "draft-07"), { processors: e10.processors ?? {}, metadataRegistry: e10?.metadata ?? o_, target: t10, unrepresentable: e10?.unrepresentable ?? "throw", override: e10?.override ?? (() => {
        }), io: e10?.io ?? "output", counter: 0, seen: /* @__PURE__ */ new Map(), cycles: e10?.cycles ?? "ref", reused: e10?.reused ?? "inline", external: e10?.external ?? void 0 };
      }
      function us(e10, t10, r10 = { path: [], schemaPath: [] }) {
        var i10;
        let n10 = e10._zod.def, a10 = t10.seen.get(e10);
        if (a10) return a10.count++, r10.schemaPath.includes(e10) && (a10.cycle = r10.path), a10.schema;
        let o10 = { schema: {}, count: 1, cycle: void 0, path: r10.path };
        t10.seen.set(e10, o10);
        let s10 = e10._zod.toJSONSchema?.();
        if (s10) o10.schema = s10;
        else {
          let i11 = { ...r10, schemaPath: [...r10.schemaPath, e10], path: r10.path };
          if (e10._zod.processJSONSchema) e10._zod.processJSONSchema(t10, o10.schema, i11);
          else {
            let r11 = o10.schema, a12 = t10.processors[n10.type];
            if (!a12) throw Error(`[toJSONSchema]: Non-representable type encountered: ${n10.type}`);
            a12(e10, t10, r11, i11);
          }
          let a11 = e10._zod.parent;
          a11 && (o10.ref || (o10.ref = a11), us(a11, t10, i11), t10.seen.get(a11).isParent = true);
        }
        let u10 = t10.metadataRegistry.get(e10);
        return u10 && Object.assign(o10.schema, u10), "input" === t10.io && function e11(t11, r11) {
          let i11 = r11 ?? { seen: /* @__PURE__ */ new Set() };
          if (i11.seen.has(t11)) return false;
          i11.seen.add(t11);
          let n11 = t11._zod.def;
          if ("transform" === n11.type) return true;
          if ("array" === n11.type) return e11(n11.element, i11);
          if ("set" === n11.type) return e11(n11.valueType, i11);
          if ("lazy" === n11.type) return e11(n11.getter(), i11);
          if ("promise" === n11.type || "optional" === n11.type || "nonoptional" === n11.type || "nullable" === n11.type || "readonly" === n11.type || "default" === n11.type || "prefault" === n11.type) return e11(n11.innerType, i11);
          if ("intersection" === n11.type) return e11(n11.left, i11) || e11(n11.right, i11);
          if ("record" === n11.type || "map" === n11.type) return e11(n11.keyType, i11) || e11(n11.valueType, i11);
          if ("pipe" === n11.type) return !!t11._zod.traits.has("$ZodCodec") || e11(n11.in, i11) || e11(n11.out, i11);
          if ("object" === n11.type) {
            for (let t12 in n11.shape) if (e11(n11.shape[t12], i11)) return true;
            return false;
          }
          if ("union" === n11.type) {
            for (let t12 of n11.options) if (e11(t12, i11)) return true;
            return false;
          }
          if ("tuple" === n11.type) {
            for (let t12 of n11.items) if (e11(t12, i11)) return true;
            if (n11.rest && e11(n11.rest, i11)) return true;
          }
          return false;
        }(e10) && (delete o10.schema.examples, delete o10.schema.default), "input" === t10.io && "_prefault" in o10.schema && ((i10 = o10.schema).default ?? (i10.default = o10.schema._prefault)), delete o10.schema._prefault, t10.seen.get(e10).schema;
      }
      function uu(e10, t10) {
        let r10 = e10.seen.get(t10);
        if (!r10) throw Error("Unprocessed schema. This is a bug in Zod.");
        let i10 = /* @__PURE__ */ new Map();
        for (let t11 of e10.seen.entries()) {
          let r11 = e10.metadataRegistry.get(t11[0])?.id;
          if (r11) {
            let e11 = i10.get(r11);
            if (e11 && e11 !== t11[0]) throw Error(`Duplicate schema id "${r11}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
            i10.set(r11, t11[0]);
          }
        }
        let n10 = (t11) => {
          if (t11[1].schema.$ref) return;
          let i11 = t11[1], { ref: n11, defId: a10 } = ((t12) => {
            let i12 = "draft-2020-12" === e10.target ? "$defs" : "definitions";
            if (e10.external) {
              let r11 = e10.external.registry.get(t12[0])?.id, n13 = e10.external.uri ?? ((e11) => e11);
              if (r11) return { ref: n13(r11) };
              let a12 = t12[1].defId ?? t12[1].schema.id ?? `schema${e10.counter++}`;
              return t12[1].defId = a12, { defId: a12, ref: `${n13("__shared")}#/${i12}/${a12}` };
            }
            if (t12[1] === r10) return { ref: "#" };
            let n12 = `#/${i12}/`, a11 = t12[1].schema.id ?? `__schema${e10.counter++}`;
            return { defId: a11, ref: n12 + a11 };
          })(t11);
          i11.def = { ...i11.schema }, a10 && (i11.defId = a10);
          let o10 = i11.schema;
          for (let e11 in o10) delete o10[e11];
          o10.$ref = n11;
        };
        if ("throw" === e10.cycles) for (let t11 of e10.seen.entries()) {
          let e11 = t11[1];
          if (e11.cycle) throw Error(`Cycle detected: #/${e11.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
        }
        for (let r11 of e10.seen.entries()) {
          let i11 = r11[1];
          if (t10 === r11[0]) {
            n10(r11);
            continue;
          }
          if (e10.external) {
            let i12 = e10.external.registry.get(r11[0])?.id;
            if (t10 !== r11[0] && i12) {
              n10(r11);
              continue;
            }
          }
          if (e10.metadataRegistry.get(r11[0])?.id || i11.cycle || i11.count > 1 && "ref" === e10.reused) {
            n10(r11);
            continue;
          }
        }
      }
      function ul(e10, t10) {
        let r10 = e10.seen.get(t10);
        if (!r10) throw Error("Unprocessed schema. This is a bug in Zod.");
        let i10 = (t11) => {
          let r11 = e10.seen.get(t11);
          if (null === r11.ref) return;
          let n11 = r11.def ?? r11.schema, a11 = { ...n11 }, o11 = r11.ref;
          if (r11.ref = null, o11) {
            i10(o11);
            let r12 = e10.seen.get(o11), s11 = r12.schema;
            if (s11.$ref && ("draft-07" === e10.target || "draft-04" === e10.target || "openapi-3.0" === e10.target) ? (n11.allOf = n11.allOf ?? [], n11.allOf.push(s11)) : Object.assign(n11, s11), Object.assign(n11, a11), t11._zod.parent === o11) for (let e11 in n11) "$ref" !== e11 && "allOf" !== e11 && (e11 in a11 || delete n11[e11]);
            if (s11.$ref && r12.def) for (let e11 in n11) "$ref" !== e11 && "allOf" !== e11 && e11 in r12.def && JSON.stringify(n11[e11]) === JSON.stringify(r12.def[e11]) && delete n11[e11];
          }
          let s10 = t11._zod.parent;
          if (s10 && s10 !== o11) {
            i10(s10);
            let t12 = e10.seen.get(s10);
            if (t12?.schema.$ref && (n11.$ref = t12.schema.$ref, t12.def)) for (let e11 in n11) "$ref" !== e11 && "allOf" !== e11 && e11 in t12.def && JSON.stringify(n11[e11]) === JSON.stringify(t12.def[e11]) && delete n11[e11];
          }
          e10.override({ zodSchema: t11, jsonSchema: n11, path: r11.path ?? [] });
        };
        for (let t11 of [...e10.seen.entries()].reverse()) i10(t11[0]);
        let n10 = {};
        if ("draft-2020-12" === e10.target ? n10.$schema = "https://json-schema.org/draft/2020-12/schema" : "draft-07" === e10.target ? n10.$schema = "http://json-schema.org/draft-07/schema#" : "draft-04" === e10.target ? n10.$schema = "http://json-schema.org/draft-04/schema#" : e10.target, e10.external?.uri) {
          let r11 = e10.external.registry.get(t10)?.id;
          if (!r11) throw Error("Schema is missing an `id` property");
          n10.$id = e10.external.uri(r11);
        }
        Object.assign(n10, r10.def ?? r10.schema);
        let a10 = e10.metadataRegistry.get(t10)?.id;
        void 0 !== a10 && n10.id === a10 && delete n10.id;
        let o10 = e10.external?.defs ?? {};
        for (let t11 of e10.seen.entries()) {
          let e11 = t11[1];
          e11.def && e11.defId && (e11.def.id === e11.defId && delete e11.def.id, o10[e11.defId] = e11.def);
        }
        e10.external || Object.keys(o10).length > 0 && ("draft-2020-12" === e10.target ? n10.$defs = o10 : n10.definitions = o10);
        try {
          let r11 = JSON.parse(JSON.stringify(n10));
          return Object.defineProperty(r11, "~standard", { value: { ...t10["~standard"], jsonSchema: { input: uc(t10, "input", e10.processors), output: uc(t10, "output", e10.processors) } }, enumerable: false, writable: false }), r11;
        } catch (e11) {
          throw Error("Error converting schema to JSON.");
        }
      }
      e.s(["TimePrecision", 0, oB, "_any", 0, st, "_array", 0, sD, "_base64", 0, oL, "_base64url", 0, oM, "_bigint", 0, o2, "_boolean", 0, o4, "_catch", 0, s4, "_check", 0, ut, "_cidrv4", 0, oA, "_cidrv6", 0, oZ, "_coercedBigint", 0, o9, "_coercedBoolean", 0, o6, "_coercedDate", 0, so, "_coercedNumber", 0, oH, "_coercedString", 0, oy, "_cuid", 0, oT, "_cuid2", 0, oN, "_custom", 0, s5, "_date", 0, sa, "_default", 0, sQ, "_discriminatedUnion", 0, sL, "_e164", 0, oF, "_email", 0, o$, "_emoji", 0, oE, "_endsWith", 0, sE, "_enum", 0, sV, "_file", 0, sX, "_float32", 0, oY, "_float64", 0, oQ, "_gt", 0, sd, "_gte", 0, sc, "_guid", 0, ox, "_includes", 0, sI, "_int", 0, oK, "_int32", 0, o0, "_int64", 0, o3, "_intersection", 0, sM, "_ipv4", 0, oU, "_ipv6", 0, oj, "_isoDate", 0, oV, "_isoDateTime", 0, oq, "_isoDuration", 0, oW, "_isoTime", 0, oG, "_jwt", 0, oJ, "_ksuid", 0, oR, "_lazy", 0, s3, "_length", 0, sx, "_literal", 0, sW, "_lowercase", 0, sk, "_lt", 0, su, "_lte", 0, sl, "_mac", 0, oD, "_map", 0, sB, "_max", 0, sl, "_maxLength", 0, sy, "_maxSize", 0, sh, "_mime", 0, sT, "_min", 0, sc, "_minLength", 0, s$, "_minSize", 0, s_, "_multipleOf", 0, sg, "_nan", 0, ss, "_nanoid", 0, oP, "_nativeEnum", 0, sG, "_negative", 0, sm, "_never", 0, si, "_nonnegative", 0, sv, "_nonoptional", 0, s0, "_nonpositive", 0, sp, "_normalize", 0, sz, "_null", 0, se, "_nullable", 0, sY, "_number", 0, oX, "_optional", 0, sK, "_overwrite", 0, sN, "_pipe", 0, s6, "_positive", 0, sf, "_promise", 0, s7, "_property", 0, sP, "_readonly", 0, s2, "_record", 0, sJ, "_refine", 0, s8, "_regex", 0, sw, "_set", 0, sq, "_size", 0, sb, "_slugify", 0, sj, "_startsWith", 0, sO, "_string", 0, ob, "_stringFormat", 0, ua, "_stringbool", 0, un, "_success", 0, s1, "_superRefine", 0, ue, "_symbol", 0, o5, "_templateLiteral", 0, s9, "_toLowerCase", 0, sR, "_toUpperCase", 0, sU, "_transform", 0, sH, "_trim", 0, sC, "_tuple", 0, sF, "_uint32", 0, o1, "_uint64", 0, o7, "_ulid", 0, oz, "_undefined", 0, o8, "_union", 0, sA, "_unknown", 0, sr, "_uppercase", 0, sS, "_url", 0, oO, "_uuid", 0, ow, "_uuidv4", 0, ok, "_uuidv6", 0, oS, "_uuidv7", 0, oI, "_void", 0, sn, "_xid", 0, oC, "_xor", 0, sZ, "describe", 0, ur, "meta", 0, ui], 37316), e.i(37316);
      let ud = (e10, t10 = {}) => (r10) => {
        let i10 = uo({ ...r10, processors: t10 });
        return us(e10, i10), uu(i10, e10), ul(i10, e10);
      }, uc = (e10, t10, r10 = {}) => (i10) => {
        let { libraryOptions: n10, target: a10 } = i10 ?? {}, o10 = uo({ ...n10 ?? {}, target: a10, io: t10, processors: r10 });
        return us(e10, o10), uu(o10, e10), ul(o10, e10);
      };
      e.s(["createStandardJSONSchemaMethod", 0, uc, "createToJSONSchemaMethod", 0, ud, "extractDefs", 0, uu, "finalize", 0, ul, "initializeContext", 0, uo, "process", 0, us], 53510), e.i(53510);
      let uf = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" }, um = (e10, t10, r10, i10) => {
        r10.type = "string";
        let { minimum: n10, maximum: a10, format: o10, patterns: s10, contentEncoding: u10 } = e10._zod.bag;
        if ("number" == typeof n10 && (r10.minLength = n10), "number" == typeof a10 && (r10.maxLength = a10), o10 && (r10.format = uf[o10] ?? o10, "" === r10.format && delete r10.format, "time" === o10 && delete r10.format), u10 && (r10.contentEncoding = u10), s10 && s10.size > 0) {
          let e11 = [...s10];
          1 === e11.length ? r10.pattern = e11[0].source : e11.length > 1 && (r10.allOf = [...e11.map((e12) => ({ ..."draft-07" === t10.target || "draft-04" === t10.target || "openapi-3.0" === t10.target ? { type: "string" } : {}, pattern: e12.source }))]);
        }
      }, up = (e10, t10, r10, i10) => {
        let { minimum: n10, maximum: a10, format: o10, multipleOf: s10, exclusiveMaximum: u10, exclusiveMinimum: l10 } = e10._zod.bag;
        "string" == typeof o10 && o10.includes("int") ? r10.type = "integer" : r10.type = "number";
        let d10 = "number" == typeof l10 && l10 >= (n10 ?? -1 / 0), c10 = "number" == typeof u10 && u10 <= (a10 ?? 1 / 0), f2 = "draft-04" === t10.target || "openapi-3.0" === t10.target;
        d10 ? f2 ? (r10.minimum = l10, r10.exclusiveMinimum = true) : r10.exclusiveMinimum = l10 : "number" == typeof n10 && (r10.minimum = n10), c10 ? f2 ? (r10.maximum = u10, r10.exclusiveMaximum = true) : r10.exclusiveMaximum = u10 : "number" == typeof a10 && (r10.maximum = a10), "number" == typeof s10 && (r10.multipleOf = s10);
      }, uv = (e10, t10, r10, i10) => {
        r10.type = "boolean";
      }, ug = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("BigInt cannot be represented in JSON Schema");
      }, uh = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Symbols cannot be represented in JSON Schema");
      }, u_ = (e10, t10, r10, i10) => {
        "openapi-3.0" === t10.target ? (r10.type = "string", r10.nullable = true, r10.enum = [null]) : r10.type = "null";
      }, ub = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Undefined cannot be represented in JSON Schema");
      }, uy = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Void cannot be represented in JSON Schema");
      }, u$ = (e10, t10, r10, i10) => {
        r10.not = {};
      }, ux = (e10, t10, r10, i10) => {
      }, uw = (e10, t10, r10, i10) => {
      }, uk = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Date cannot be represented in JSON Schema");
      }, uS = (e10, t10, r10, i10) => {
        let n10 = rm(e10._zod.def.entries);
        n10.every((e11) => "number" == typeof e11) && (r10.type = "number"), n10.every((e11) => "string" == typeof e11) && (r10.type = "string"), r10.enum = n10;
      }, uI = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def, a10 = [];
        for (let e11 of n10.values) if (void 0 === e11) {
          if ("throw" === t10.unrepresentable) throw Error("Literal `undefined` cannot be represented in JSON Schema");
        } else if ("bigint" == typeof e11) if ("throw" === t10.unrepresentable) throw Error("BigInt literals cannot be represented in JSON Schema");
        else a10.push(Number(e11));
        else a10.push(e11);
        if (0 === a10.length) ;
        else if (1 === a10.length) {
          let e11 = a10[0];
          r10.type = null === e11 ? "null" : typeof e11, "draft-04" === t10.target || "openapi-3.0" === t10.target ? r10.enum = [e11] : r10.const = e11;
        } else a10.every((e11) => "number" == typeof e11) && (r10.type = "number"), a10.every((e11) => "string" == typeof e11) && (r10.type = "string"), a10.every((e11) => "boolean" == typeof e11) && (r10.type = "boolean"), a10.every((e11) => null === e11) && (r10.type = "null"), r10.enum = a10;
      }, uO = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("NaN cannot be represented in JSON Schema");
      }, uE = (e10, t10, r10, i10) => {
        let n10 = e10._zod.pattern;
        if (!n10) throw Error("Pattern not found in template literal");
        r10.type = "string", r10.pattern = n10.source;
      }, uP = (e10, t10, r10, i10) => {
        let n10 = { type: "string", format: "binary", contentEncoding: "binary" }, { minimum: a10, maximum: o10, mime: s10 } = e10._zod.bag;
        void 0 !== a10 && (n10.minLength = a10), void 0 !== o10 && (n10.maxLength = o10), s10 ? 1 === s10.length ? (n10.contentMediaType = s10[0], Object.assign(r10, n10)) : (Object.assign(r10, n10), r10.anyOf = s10.map((e11) => ({ contentMediaType: e11 }))) : Object.assign(r10, n10);
      }, uT = (e10, t10, r10, i10) => {
        r10.type = "boolean";
      }, uN = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Custom types cannot be represented in JSON Schema");
      }, uz = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Function types cannot be represented in JSON Schema");
      }, uC = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Transforms cannot be represented in JSON Schema");
      }, uR = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Map cannot be represented in JSON Schema");
      }, uU = (e10, t10, r10, i10) => {
        if ("throw" === t10.unrepresentable) throw Error("Set cannot be represented in JSON Schema");
      }, uj = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def, { minimum: a10, maximum: o10 } = e10._zod.bag;
        "number" == typeof a10 && (r10.minItems = a10), "number" == typeof o10 && (r10.maxItems = o10), r10.type = "array", r10.items = us(n10.element, t10, { ...i10, path: [...i10.path, "items"] });
      }, uD = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        r10.type = "object", r10.properties = {};
        let a10 = n10.shape;
        for (let e11 in a10) r10.properties[e11] = us(a10[e11], t10, { ...i10, path: [...i10.path, "properties", e11] });
        let o10 = new Set([...new Set(Object.keys(a10))].filter((e11) => {
          let r11 = n10.shape[e11]._zod;
          return "input" === t10.io ? void 0 === r11.optin : void 0 === r11.optout;
        }));
        o10.size > 0 && (r10.required = Array.from(o10)), n10.catchall?._zod.def.type === "never" ? r10.additionalProperties = false : n10.catchall ? n10.catchall && (r10.additionalProperties = us(n10.catchall, t10, { ...i10, path: [...i10.path, "additionalProperties"] })) : "output" === t10.io && (r10.additionalProperties = false);
      }, uA = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def, a10 = false === n10.inclusive, o10 = n10.options.map((e11, r11) => us(e11, t10, { ...i10, path: [...i10.path, a10 ? "oneOf" : "anyOf", r11] }));
        a10 ? r10.oneOf = o10 : r10.anyOf = o10;
      }, uZ = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def, a10 = us(n10.left, t10, { ...i10, path: [...i10.path, "allOf", 0] }), o10 = us(n10.right, t10, { ...i10, path: [...i10.path, "allOf", 1] }), s10 = (e11) => "allOf" in e11 && 1 === Object.keys(e11).length;
        r10.allOf = [...s10(a10) ? a10.allOf : [a10], ...s10(o10) ? o10.allOf : [o10]];
      }, uL = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        r10.type = "array";
        let a10 = "draft-2020-12" === t10.target ? "prefixItems" : "items", o10 = "draft-2020-12" === t10.target || "openapi-3.0" === t10.target ? "items" : "additionalItems", s10 = n10.items.map((e11, r11) => us(e11, t10, { ...i10, path: [...i10.path, a10, r11] })), u10 = n10.rest ? us(n10.rest, t10, { ...i10, path: [...i10.path, o10, ..."openapi-3.0" === t10.target ? [n10.items.length] : []] }) : null;
        "draft-2020-12" === t10.target ? (r10.prefixItems = s10, u10 && (r10.items = u10)) : "openapi-3.0" === t10.target ? (r10.items = { anyOf: s10 }, u10 && r10.items.anyOf.push(u10), r10.minItems = s10.length, u10 || (r10.maxItems = s10.length)) : (r10.items = s10, u10 && (r10.additionalItems = u10));
        let { minimum: l10, maximum: d10 } = e10._zod.bag;
        "number" == typeof l10 && (r10.minItems = l10), "number" == typeof d10 && (r10.maxItems = d10);
      }, uM = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        r10.type = "object";
        let a10 = n10.keyType, o10 = a10._zod.bag, s10 = o10?.patterns;
        if ("loose" === n10.mode && s10 && s10.size > 0) {
          let e11 = us(n10.valueType, t10, { ...i10, path: [...i10.path, "patternProperties", "*"] });
          for (let t11 of (r10.patternProperties = {}, s10)) r10.patternProperties[t11.source] = e11;
        } else ("draft-07" === t10.target || "draft-2020-12" === t10.target) && (r10.propertyNames = us(n10.keyType, t10, { ...i10, path: [...i10.path, "propertyNames"] })), r10.additionalProperties = us(n10.valueType, t10, { ...i10, path: [...i10.path, "additionalProperties"] });
        let u10 = a10._zod.values;
        if (u10) {
          let e11 = [...u10].filter((e12) => "string" == typeof e12 || "number" == typeof e12);
          e11.length > 0 && (r10.required = e11);
        }
      }, uF = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def, a10 = us(n10.innerType, t10, i10), o10 = t10.seen.get(e10);
        "openapi-3.0" === t10.target ? (o10.ref = n10.innerType, r10.nullable = true) : r10.anyOf = [a10, { type: "null" }];
      }, uJ = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        us(n10.innerType, t10, i10), t10.seen.get(e10).ref = n10.innerType;
      }, uB = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        us(n10.innerType, t10, i10), t10.seen.get(e10).ref = n10.innerType, r10.default = JSON.parse(JSON.stringify(n10.defaultValue));
      }, uq = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        us(n10.innerType, t10, i10), t10.seen.get(e10).ref = n10.innerType, "input" === t10.io && (r10._prefault = JSON.parse(JSON.stringify(n10.defaultValue)));
      }, uV = (e10, t10, r10, i10) => {
        let n10, a10 = e10._zod.def;
        us(a10.innerType, t10, i10), t10.seen.get(e10).ref = a10.innerType;
        try {
          n10 = a10.catchValue(void 0);
        } catch {
          throw Error("Dynamic catch values are not supported in JSON Schema");
        }
        r10.default = n10;
      }, uG = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def, a10 = n10.in._zod.traits.has("$ZodTransform"), o10 = "input" === t10.io ? a10 ? n10.out : n10.in : n10.out;
        us(o10, t10, i10), t10.seen.get(e10).ref = o10;
      }, uW = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        us(n10.innerType, t10, i10), t10.seen.get(e10).ref = n10.innerType, r10.readOnly = true;
      }, uX = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        us(n10.innerType, t10, i10), t10.seen.get(e10).ref = n10.innerType;
      }, uH = (e10, t10, r10, i10) => {
        let n10 = e10._zod.def;
        us(n10.innerType, t10, i10), t10.seen.get(e10).ref = n10.innerType;
      }, uK = (e10, t10, r10, i10) => {
        let n10 = e10._zod.innerType;
        us(n10, t10, i10), t10.seen.get(e10).ref = n10;
      }, uY = { string: um, number: up, boolean: uv, bigint: ug, symbol: uh, null: u_, undefined: ub, void: uy, never: u$, any: ux, unknown: uw, date: uk, enum: uS, literal: uI, nan: uO, template_literal: uE, file: uP, success: uT, custom: uN, function: uz, transform: uC, map: uR, set: uU, array: uj, object: uD, union: uA, intersection: uZ, tuple: uL, record: uM, nullable: uF, nonoptional: uJ, default: uB, prefault: uq, catch: uV, pipe: uG, readonly: uW, promise: uX, optional: uH, lazy: uK };
      function uQ(e10, t10) {
        if ("_idmap" in e10) {
          let r11 = uo({ ...t10, processors: uY }), i10 = {};
          for (let t11 of e10._idmap.entries()) {
            let [e11, i11] = t11;
            us(i11, r11);
          }
          let n10 = {};
          for (let a10 of (r11.external = { registry: e10, uri: t10?.uri, defs: i10 }, e10._idmap.entries())) {
            let [e11, t11] = a10;
            uu(r11, t11), n10[e11] = ul(r11, t11);
          }
          return Object.keys(i10).length > 0 && (n10.__shared = { ["draft-2020-12" === r11.target ? "$defs" : "definitions"]: i10 }), { schemas: n10 };
        }
        let r10 = uo({ ...t10, processors: uY });
        return us(e10, r10), uu(r10, e10), ul(r10, e10);
      }
      e.s([], 97116);
      var u0 = e.i(97116);
      e.s(["$ZodAny", 0, al, "$ZodArray", 0, av, "$ZodAsyncError", 0, rl, "$ZodBase64", 0, n2, "$ZodBase64URL", 0, n3, "$ZodBigInt", 0, an, "$ZodBigIntFormat", 0, aa, "$ZodBoolean", 0, ai, "$ZodCIDRv4", 0, n1, "$ZodCIDRv6", 0, n4, "$ZodCUID", 0, nJ, "$ZodCUID2", 0, nB, "$ZodCatch", 0, aK, "$ZodCheck", 0, nu, "$ZodCheckBigIntFormat", 0, np, "$ZodCheckEndsWith", 0, nO, "$ZodCheckGreaterThan", 0, nc, "$ZodCheckIncludes", 0, nS, "$ZodCheckLengthEquals", 0, ny, "$ZodCheckLessThan", 0, nd, "$ZodCheckLowerCase", 0, nw, "$ZodCheckMaxLength", 0, n_, "$ZodCheckMaxSize", 0, nv, "$ZodCheckMimeType", 0, nT, "$ZodCheckMinLength", 0, nb, "$ZodCheckMinSize", 0, ng, "$ZodCheckMultipleOf", 0, nf, "$ZodCheckNumberFormat", 0, nm, "$ZodCheckOverwrite", 0, nN, "$ZodCheckProperty", 0, nP, "$ZodCheckRegex", 0, nx, "$ZodCheckSizeEquals", 0, nh, "$ZodCheckStartsWith", 0, nI, "$ZodCheckStringFormat", 0, n$, "$ZodCheckUpperCase", 0, nk, "$ZodCodec", 0, a1, "$ZodCustom", 0, ot, "$ZodCustomStringFormat", 0, ae, "$ZodDate", 0, am, "$ZodDefault", 0, aq, "$ZodDiscriminatedUnion", 0, aS, "$ZodE164", 0, n7, "$ZodEmail", 0, nZ, "$ZodEmoji", 0, nM, "$ZodEncodeError", 0, rd, "$ZodEnum", 0, aD, "$ZodError", 0, rQ, "$ZodExactOptional", 0, aJ, "$ZodFile", 0, aZ, "$ZodFunction", 0, a5, "$ZodGUID", 0, nD, "$ZodIPv4", 0, nY, "$ZodIPv6", 0, nQ, "$ZodISODate", 0, nX, "$ZodISODateTime", 0, nW, "$ZodISODuration", 0, nK, "$ZodISOTime", 0, nH, "$ZodIntersection", 0, aI, "$ZodJWT", 0, n8, "$ZodKSUID", 0, nG, "$ZodLazy", 0, oe, "$ZodLiteral", 0, aA, "$ZodMAC", 0, n0, "$ZodMap", 0, aC, "$ZodNaN", 0, aY, "$ZodNanoID", 0, nF, "$ZodNever", 0, ac, "$ZodNonOptional", 0, aW, "$ZodNull", 0, au, "$ZodNullable", 0, aB, "$ZodNumber", 0, at, "$ZodNumberFormat", 0, ar, "$ZodObject", 0, ab, "$ZodObjectJIT", 0, ay, "$ZodOptional", 0, aF, "$ZodPipe", 0, aQ, "$ZodPrefault", 0, aG, "$ZodPreprocess", 0, a2, "$ZodPromise", 0, a8, "$ZodReadonly", 0, a9, "$ZodRealError", 0, r0, "$ZodRecord", 0, az, "$ZodRegistry", 0, og, "$ZodSet", 0, aU, "$ZodString", 0, nU, "$ZodStringFormat", 0, nj, "$ZodSuccess", 0, aH, "$ZodSymbol", 0, ao, "$ZodTemplateLiteral", 0, a7, "$ZodTransform", 0, aL, "$ZodTuple", 0, aE, "$ZodType", 0, nR, "$ZodULID", 0, nq, "$ZodURL", 0, nL, "$ZodUUID", 0, nA, "$ZodUndefined", 0, as, "$ZodUnion", 0, ax, "$ZodUnknown", 0, ad, "$ZodVoid", 0, af, "$ZodXID", 0, nV, "$ZodXor", 0, ak, "$brand", 0, ru, "$constructor", 0, rs, "$input", 0, ov, "$output", 0, op, "Doc", 0, nz, "JSONSchema", 0, u0, "JSONSchemaGenerator", 0, class {
        get metadataRegistry() {
          return this.ctx.metadataRegistry;
        }
        get target() {
          return this.ctx.target;
        }
        get unrepresentable() {
          return this.ctx.unrepresentable;
        }
        get override() {
          return this.ctx.override;
        }
        get io() {
          return this.ctx.io;
        }
        get counter() {
          return this.ctx.counter;
        }
        set counter(e10) {
          this.ctx.counter = e10;
        }
        get seen() {
          return this.ctx.seen;
        }
        constructor(e10) {
          let t10 = e10?.target ?? "draft-2020-12";
          "draft-4" === t10 && (t10 = "draft-04"), "draft-7" === t10 && (t10 = "draft-07"), this.ctx = uo({ processors: uY, target: t10, ...e10?.metadata && { metadata: e10.metadata }, ...e10?.unrepresentable && { unrepresentable: e10.unrepresentable }, ...e10?.override && { override: e10.override }, ...e10?.io && { io: e10.io } });
        }
        process(e10, t10 = { path: [], schemaPath: [] }) {
          return us(e10, this.ctx, t10);
        }
        emit(e10, t10) {
          t10 && (t10.cycles && (this.ctx.cycles = t10.cycles), t10.reused && (this.ctx.reused = t10.reused), t10.external && (this.ctx.external = t10.external)), uu(this.ctx, e10);
          let { "~standard": r10, ...i10 } = ul(this.ctx, e10);
          return i10;
        }
      }, "NEVER", 0, ro, "TimePrecision", 0, oB, "_any", 0, st, "_array", 0, sD, "_base64", 0, oL, "_base64url", 0, oM, "_bigint", 0, o2, "_boolean", 0, o4, "_catch", 0, s4, "_check", 0, ut, "_cidrv4", 0, oA, "_cidrv6", 0, oZ, "_coercedBigint", 0, o9, "_coercedBoolean", 0, o6, "_coercedDate", 0, so, "_coercedNumber", 0, oH, "_coercedString", 0, oy, "_cuid", 0, oT, "_cuid2", 0, oN, "_custom", 0, s5, "_date", 0, sa, "_decode", 0, is, "_decodeAsync", 0, ic, "_default", 0, sQ, "_discriminatedUnion", 0, sL, "_e164", 0, oF, "_email", 0, o$, "_emoji", 0, oE, "_encode", 0, ia, "_encodeAsync", 0, il, "_endsWith", 0, sE, "_enum", 0, sV, "_file", 0, sX, "_float32", 0, oY, "_float64", 0, oQ, "_gt", 0, sd, "_gte", 0, sc, "_guid", 0, ox, "_includes", 0, sI, "_int", 0, oK, "_int32", 0, o0, "_int64", 0, o3, "_intersection", 0, sM, "_ipv4", 0, oU, "_ipv6", 0, oj, "_isoDate", 0, oV, "_isoDateTime", 0, oq, "_isoDuration", 0, oW, "_isoTime", 0, oG, "_jwt", 0, oJ, "_ksuid", 0, oR, "_lazy", 0, s3, "_length", 0, sx, "_literal", 0, sW, "_lowercase", 0, sk, "_lt", 0, su, "_lte", 0, sl, "_mac", 0, oD, "_map", 0, sB, "_max", 0, sl, "_maxLength", 0, sy, "_maxSize", 0, sh, "_mime", 0, sT, "_min", 0, sc, "_minLength", 0, s$, "_minSize", 0, s_, "_multipleOf", 0, sg, "_nan", 0, ss, "_nanoid", 0, oP, "_nativeEnum", 0, sG, "_negative", 0, sm, "_never", 0, si, "_nonnegative", 0, sv, "_nonoptional", 0, s0, "_nonpositive", 0, sp, "_normalize", 0, sz, "_null", 0, se, "_nullable", 0, sY, "_number", 0, oX, "_optional", 0, sK, "_overwrite", 0, sN, "_parse", 0, r3, "_parseAsync", 0, r5, "_pipe", 0, s6, "_positive", 0, sf, "_promise", 0, s7, "_property", 0, sP, "_readonly", 0, s2, "_record", 0, sJ, "_refine", 0, s8, "_regex", 0, sw, "_safeDecode", 0, ig, "_safeDecodeAsync", 0, iy, "_safeEncode", 0, ip, "_safeEncodeAsync", 0, i_, "_safeParse", 0, ie, "_safeParseAsync", 0, ir, "_set", 0, sq, "_size", 0, sb, "_slugify", 0, sj, "_startsWith", 0, sO, "_string", 0, ob, "_stringFormat", 0, ua, "_stringbool", 0, un, "_success", 0, s1, "_superRefine", 0, ue, "_symbol", 0, o5, "_templateLiteral", 0, s9, "_toLowerCase", 0, sR, "_toUpperCase", 0, sU, "_transform", 0, sH, "_trim", 0, sC, "_tuple", 0, sF, "_uint32", 0, o1, "_uint64", 0, o7, "_ulid", 0, oz, "_undefined", 0, o8, "_union", 0, sA, "_unknown", 0, sr, "_uppercase", 0, sS, "_url", 0, oO, "_uuid", 0, ow, "_uuidv4", 0, ok, "_uuidv6", 0, oS, "_uuidv7", 0, oI, "_void", 0, sn, "_xid", 0, oC, "_xor", 0, sZ, "clone", 0, rR, "config", 0, rf, "createStandardJSONSchemaMethod", 0, uc, "createToJSONSchemaMethod", 0, ud, "decode", 0, iu, "decodeAsync", 0, im, "describe", 0, ur, "encode", 0, io, "encodeAsync", 0, id, "extractDefs", 0, uu, "finalize", 0, ul, "flattenError", 0, r1, "formatError", 0, r4, "globalConfig", 0, rc, "globalRegistry", 0, o_, "initializeContext", 0, uo, "isValidBase64", 0, n6, "isValidBase64URL", 0, n9, "isValidJWT", 0, n5, "locales", 0, om, "meta", 0, ui, "parse", 0, r7, "parseAsync", 0, r8, "prettifyError", 0, r9, "process", 0, us, "regexes", 0, on, "registry", 0, oh, "safeDecode", 0, ih, "safeDecodeAsync", 0, i$, "safeEncode", 0, iv, "safeEncodeAsync", 0, ib, "safeParse", 0, it, "safeParseAsync", 0, ii, "toDotPath", 0, r2, "toJSONSchema", 0, uQ, "treeifyError", 0, r6, "util", 0, oi, "version", 0, nC], 9450);
      var u1 = e.i(9450);
      e.s(["ZodAny", () => dN, "ZodArray", () => dM, "ZodBase64", () => l3, "ZodBase64URL", () => l5, "ZodBigInt", () => dy, "ZodBigIntFormat", () => dx, "ZodBoolean", () => d_, "ZodCIDRv4", () => l4, "ZodCIDRv6", () => l2, "ZodCUID", () => lL, "ZodCUID2", () => lF, "ZodCatch", () => cI, "ZodCodec", () => cz, "ZodCustom", () => cV, "ZodCustomStringFormat", () => dn, "ZodDate", () => dZ, "ZodDefault", () => c_, "ZodDiscriminatedUnion", () => dY, "ZodE164", () => de, "ZodEmail", () => lk, "ZodEmoji", () => lj, "ZodEnum", () => cr, "ZodExactOptional", () => cm, "ZodFile", () => cs, "ZodFunction", () => cB, "ZodGUID", () => lI, "ZodIPv4", () => lH, "ZodIPv6", () => l0, "ZodIntersection", () => d0, "ZodJWT", () => dr, "ZodKSUID", () => lW, "ZodLazy", () => cL, "ZodLiteral", () => ca, "ZodMAC", () => lY, "ZodMap", () => d5, "ZodNaN", () => cE, "ZodNanoID", () => lA, "ZodNever", () => dU, "ZodNonOptional", () => cx, "ZodNull", () => dP, "ZodNullable", () => cv, "ZodNumber", () => dd, "ZodNumberFormat", () => df, "ZodObject", () => dB, "ZodOptional", () => cc, "ZodPipe", () => cT, "ZodPrefault", () => cy, "ZodPreprocess", () => cU, "ZodPromise", () => cF, "ZodReadonly", () => cj, "ZodRecord", () => d2, "ZodSet", () => ce, "ZodString", () => l$, "ZodStringFormat", () => lw, "ZodSuccess", () => ck, "ZodSymbol", () => dS, "ZodTemplateLiteral", () => cA, "ZodTransform", () => cl, "ZodTuple", () => d4, "ZodType", () => lb, "ZodULID", () => lB, "ZodURL", () => lC, "ZodUUID", () => lE, "ZodUndefined", () => dO, "ZodUnion", () => dW, "ZodUnknown", () => dC, "ZodVoid", () => dD, "ZodXID", () => lV, "ZodXor", () => dH, "_ZodString", () => ly, "_default", () => cb, "_function", () => cq, "any", () => dz, "array", () => dF, "base64", () => l7, "base64url", () => l8, "bigint", () => d$, "boolean", () => db, "catch", () => cO, "check", () => cG, "cidrv4", () => l6, "cidrv6", () => l9, "codec", () => cC, "cuid", () => lM, "cuid2", () => lJ, "custom", () => cW, "date", () => dL, "describe", () => cK, "discriminatedUnion", () => dQ, "e164", () => dt, "email", () => lS, "emoji", () => lD, "enum", () => ci, "exactOptional", () => cp, "file", () => cu, "float32", () => dp, "float64", () => dv, "function", () => cq, "guid", () => lO, "hash", () => dl, "hex", () => du, "hostname", () => ds, "httpUrl", () => lU, "instanceof", () => cQ, "int", () => dm, "int32", () => dg, "int64", () => dw, "intersection", () => d1, "invertCodec", () => cR, "ipv4", () => lK, "ipv6", () => l1, "json", () => c1, "jwt", () => di, "keyof", () => dJ, "ksuid", () => lX, "lazy", () => cM, "literal", () => co, "looseObject", () => dG, "looseRecord", () => d7, "mac", () => lQ, "map", () => d8, "meta", () => cY, "nan", () => cP, "nanoid", () => lZ, "nativeEnum", () => cn, "never", () => dj, "nonoptional", () => cw, "null", () => dT, "nullable", () => cg, "nullish", () => ch, "number", () => dc, "object", () => dq, "optional", () => cf, "partialRecord", () => d3, "pipe", () => cN, "prefault", () => c$, "preprocess", () => c4, "promise", () => cJ, "readonly", () => cD, "record", () => d9, "refine", () => cX, "set", () => ct, "strictObject", () => dV, "string", () => lx, "stringFormat", () => da, "stringbool", () => c0, "success", () => cS, "superRefine", () => cH, "symbol", () => dI, "templateLiteral", () => cZ, "transform", () => cd, "tuple", () => d6, "uint32", () => dh, "uint64", () => dk, "ulid", () => lq, "undefined", () => dE, "union", () => dX, "unknown", () => dR, "url", () => lR, "uuid", () => lP, "uuidv4", () => lT, "uuidv6", () => lN, "uuidv7", () => lz, "void", () => dA, "xid", () => lG, "xor", () => dK], 6636);
      var u4 = on, u6 = oi;
      e.s(["ZodISODate", () => u3, "ZodISODateTime", () => u2, "ZodISODuration", () => le, "ZodISOTime", () => u5, "date", () => u7, "datetime", () => u9, "duration", () => lt, "time", () => u8], 33271);
      let u2 = rs("ZodISODateTime", (e10, t10) => {
        nW.init(e10, t10), lw.init(e10, t10);
      });
      function u9(e10) {
        return oq(u2, e10);
      }
      let u3 = rs("ZodISODate", (e10, t10) => {
        nX.init(e10, t10), lw.init(e10, t10);
      });
      function u7(e10) {
        return oV(u3, e10);
      }
      let u5 = rs("ZodISOTime", (e10, t10) => {
        nH.init(e10, t10), lw.init(e10, t10);
      });
      function u8(e10) {
        return oG(u5, e10);
      }
      let le = rs("ZodISODuration", (e10, t10) => {
        nK.init(e10, t10), lw.init(e10, t10);
      });
      function lt(e10) {
        return oW(le, e10);
      }
      let lr = (e10, t10) => {
        rQ.init(e10, t10), e10.name = "ZodError", Object.defineProperties(e10, { format: { value: (t11) => r4(e10, t11) }, flatten: { value: (t11) => r1(e10, t11) }, addIssue: { value: (t11) => {
          e10.issues.push(t11), e10.message = JSON.stringify(e10.issues, rv, 2);
        } }, addIssues: { value: (t11) => {
          e10.issues.push(...t11), e10.message = JSON.stringify(e10.issues, rv, 2);
        } }, isEmpty: { get: () => 0 === e10.issues.length } });
      }, li = rs("ZodError", lr), ln = rs("ZodError", lr, { Parent: Error });
      e.s(["ZodError", 0, li, "ZodRealError", 0, ln], 21391);
      let la = r3(ln), lo = r5(ln), ls = ie(ln), lu = ir(ln), ll = ia(ln), ld = is(ln), lc = il(ln), lf = ic(ln), lm = ip(ln), lp = ig(ln), lv = i_(ln), lg = iy(ln);
      e.s(["decode", 0, ld, "decodeAsync", 0, lf, "encode", 0, ll, "encodeAsync", 0, lc, "parse", 0, la, "parseAsync", 0, lo, "safeDecode", 0, lp, "safeDecodeAsync", 0, lg, "safeEncode", 0, lm, "safeEncodeAsync", 0, lv, "safeParse", 0, ls, "safeParseAsync", 0, lu], 53541);
      let lh = /* @__PURE__ */ new WeakMap();
      function l_(e10, t10, r10) {
        let i10 = Object.getPrototypeOf(e10), n10 = lh.get(i10);
        if (n10 || (n10 = /* @__PURE__ */ new Set(), lh.set(i10, n10)), !n10.has(t10)) for (let e11 in n10.add(t10), r10) {
          let t11 = r10[e11];
          Object.defineProperty(i10, e11, { configurable: true, enumerable: false, get() {
            let r11 = t11.bind(this);
            return Object.defineProperty(this, e11, { configurable: true, writable: true, enumerable: true, value: r11 }), r11;
          }, set(t12) {
            Object.defineProperty(this, e11, { configurable: true, writable: true, enumerable: true, value: t12 });
          } });
        }
      }
      let lb = rs("ZodType", (e10, t10) => (nR.init(e10, t10), Object.assign(e10["~standard"], { jsonSchema: { input: uc(e10, "input"), output: uc(e10, "output") } }), e10.toJSONSchema = ud(e10, {}), e10.def = t10, e10.type = t10.type, Object.defineProperty(e10, "_def", { value: t10 }), e10.parse = (t11, r10) => la(e10, t11, r10, { callee: e10.parse }), e10.safeParse = (t11, r10) => ls(e10, t11, r10), e10.parseAsync = async (t11, r10) => lo(e10, t11, r10, { callee: e10.parseAsync }), e10.safeParseAsync = async (t11, r10) => lu(e10, t11, r10), e10.spa = e10.safeParseAsync, e10.encode = (t11, r10) => ll(e10, t11, r10), e10.decode = (t11, r10) => ld(e10, t11, r10), e10.encodeAsync = async (t11, r10) => lc(e10, t11, r10), e10.decodeAsync = async (t11, r10) => lf(e10, t11, r10), e10.safeEncode = (t11, r10) => lm(e10, t11, r10), e10.safeDecode = (t11, r10) => lp(e10, t11, r10), e10.safeEncodeAsync = async (t11, r10) => lv(e10, t11, r10), e10.safeDecodeAsync = async (t11, r10) => lg(e10, t11, r10), l_(e10, "ZodType", { check(...e11) {
        let t11 = this.def;
        return this.clone(u6.mergeDefs(t11, { checks: [...t11.checks ?? [], ...e11.map((e12) => "function" == typeof e12 ? { _zod: { check: e12, def: { check: "custom" }, onattach: [] } } : e12)] }), { parent: true });
      }, with(...e11) {
        return this.check(...e11);
      }, clone(e11, t11) {
        return rR(this, e11, t11);
      }, brand() {
        return this;
      }, register(e11, t11) {
        return e11.add(this, t11), this;
      }, refine(e11, t11) {
        return this.check(cX(e11, t11));
      }, superRefine(e11, t11) {
        return this.check(cH(e11, t11));
      }, overwrite(e11) {
        return this.check(sN(e11));
      }, optional() {
        return cf(this);
      }, exactOptional() {
        return cp(this);
      }, nullable() {
        return cg(this);
      }, nullish() {
        return cf(cg(this));
      }, nonoptional(e11) {
        return cw(this, e11);
      }, array() {
        return dF(this);
      }, or(e11) {
        return dX([this, e11]);
      }, and(e11) {
        return d1(this, e11);
      }, transform(e11) {
        return cN(this, cd(e11));
      }, default(e11) {
        return cb(this, e11);
      }, prefault(e11) {
        return c$(this, e11);
      }, catch(e11) {
        return cO(this, e11);
      }, pipe(e11) {
        return cN(this, e11);
      }, readonly() {
        return cD(this);
      }, describe(e11) {
        let t11 = this.clone();
        return o_.add(t11, { description: e11 }), t11;
      }, meta(...e11) {
        if (0 === e11.length) return o_.get(this);
        let t11 = this.clone();
        return o_.add(t11, e11[0]), t11;
      }, isOptional() {
        return this.safeParse(void 0).success;
      }, isNullable() {
        return this.safeParse(null).success;
      }, apply(e11) {
        return e11(this);
      } }), Object.defineProperty(e10, "description", { get: () => o_.get(e10)?.description, configurable: true }), e10)), ly = rs("_ZodString", (e10, t10) => {
        nU.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r11, i10) => um(e10, t11, r11, i10);
        let r10 = e10._zod.bag;
        e10.format = r10.format ?? null, e10.minLength = r10.minimum ?? null, e10.maxLength = r10.maximum ?? null, l_(e10, "_ZodString", { regex(...e11) {
          return this.check(sw(...e11));
        }, includes(...e11) {
          return this.check(sI(...e11));
        }, startsWith(...e11) {
          return this.check(sO(...e11));
        }, endsWith(...e11) {
          return this.check(sE(...e11));
        }, min(...e11) {
          return this.check(s$(...e11));
        }, max(...e11) {
          return this.check(sy(...e11));
        }, length(...e11) {
          return this.check(sx(...e11));
        }, nonempty(...e11) {
          return this.check(s$(1, ...e11));
        }, lowercase(e11) {
          return this.check(sk(e11));
        }, uppercase(e11) {
          return this.check(sS(e11));
        }, trim() {
          return this.check(sC());
        }, normalize(...e11) {
          return this.check(sz(...e11));
        }, toLowerCase() {
          return this.check(sR());
        }, toUpperCase() {
          return this.check(sU());
        }, slugify() {
          return this.check(sj());
        } });
      }), l$ = rs("ZodString", (e10, t10) => {
        nU.init(e10, t10), ly.init(e10, t10), e10.email = (t11) => e10.check(o$(lk, t11)), e10.url = (t11) => e10.check(oO(lC, t11)), e10.jwt = (t11) => e10.check(oJ(dr, t11)), e10.emoji = (t11) => e10.check(oE(lj, t11)), e10.guid = (t11) => e10.check(ox(lI, t11)), e10.uuid = (t11) => e10.check(ow(lE, t11)), e10.uuidv4 = (t11) => e10.check(ok(lE, t11)), e10.uuidv6 = (t11) => e10.check(oS(lE, t11)), e10.uuidv7 = (t11) => e10.check(oI(lE, t11)), e10.nanoid = (t11) => e10.check(oP(lA, t11)), e10.guid = (t11) => e10.check(ox(lI, t11)), e10.cuid = (t11) => e10.check(oT(lL, t11)), e10.cuid2 = (t11) => e10.check(oN(lF, t11)), e10.ulid = (t11) => e10.check(oz(lB, t11)), e10.base64 = (t11) => e10.check(oL(l3, t11)), e10.base64url = (t11) => e10.check(oM(l5, t11)), e10.xid = (t11) => e10.check(oC(lV, t11)), e10.ksuid = (t11) => e10.check(oR(lW, t11)), e10.ipv4 = (t11) => e10.check(oU(lH, t11)), e10.ipv6 = (t11) => e10.check(oj(l0, t11)), e10.cidrv4 = (t11) => e10.check(oA(l4, t11)), e10.cidrv6 = (t11) => e10.check(oZ(l2, t11)), e10.e164 = (t11) => e10.check(oF(de, t11)), e10.datetime = (t11) => e10.check(u9(t11)), e10.date = (t11) => e10.check(u7(t11)), e10.time = (t11) => e10.check(u8(t11)), e10.duration = (t11) => e10.check(lt(t11));
      });
      function lx(e10) {
        return ob(l$, e10);
      }
      let lw = rs("ZodStringFormat", (e10, t10) => {
        nj.init(e10, t10), ly.init(e10, t10);
      }), lk = rs("ZodEmail", (e10, t10) => {
        nZ.init(e10, t10), lw.init(e10, t10);
      });
      function lS(e10) {
        return o$(lk, e10);
      }
      let lI = rs("ZodGUID", (e10, t10) => {
        nD.init(e10, t10), lw.init(e10, t10);
      });
      function lO(e10) {
        return ox(lI, e10);
      }
      let lE = rs("ZodUUID", (e10, t10) => {
        nA.init(e10, t10), lw.init(e10, t10);
      });
      function lP(e10) {
        return ow(lE, e10);
      }
      function lT(e10) {
        return ok(lE, e10);
      }
      function lN(e10) {
        return oS(lE, e10);
      }
      function lz(e10) {
        return oI(lE, e10);
      }
      let lC = rs("ZodURL", (e10, t10) => {
        nL.init(e10, t10), lw.init(e10, t10);
      });
      function lR(e10) {
        return oO(lC, e10);
      }
      function lU(e10) {
        return oO(lC, { protocol: u4.httpProtocol, hostname: u4.domain, ...u6.normalizeParams(e10) });
      }
      let lj = rs("ZodEmoji", (e10, t10) => {
        nM.init(e10, t10), lw.init(e10, t10);
      });
      function lD(e10) {
        return oE(lj, e10);
      }
      let lA = rs("ZodNanoID", (e10, t10) => {
        nF.init(e10, t10), lw.init(e10, t10);
      });
      function lZ(e10) {
        return oP(lA, e10);
      }
      let lL = rs("ZodCUID", (e10, t10) => {
        nJ.init(e10, t10), lw.init(e10, t10);
      });
      function lM(e10) {
        return oT(lL, e10);
      }
      let lF = rs("ZodCUID2", (e10, t10) => {
        nB.init(e10, t10), lw.init(e10, t10);
      });
      function lJ(e10) {
        return oN(lF, e10);
      }
      let lB = rs("ZodULID", (e10, t10) => {
        nq.init(e10, t10), lw.init(e10, t10);
      });
      function lq(e10) {
        return oz(lB, e10);
      }
      let lV = rs("ZodXID", (e10, t10) => {
        nV.init(e10, t10), lw.init(e10, t10);
      });
      function lG(e10) {
        return oC(lV, e10);
      }
      let lW = rs("ZodKSUID", (e10, t10) => {
        nG.init(e10, t10), lw.init(e10, t10);
      });
      function lX(e10) {
        return oR(lW, e10);
      }
      let lH = rs("ZodIPv4", (e10, t10) => {
        nY.init(e10, t10), lw.init(e10, t10);
      });
      function lK(e10) {
        return oU(lH, e10);
      }
      let lY = rs("ZodMAC", (e10, t10) => {
        n0.init(e10, t10), lw.init(e10, t10);
      });
      function lQ(e10) {
        return oD(lY, e10);
      }
      let l0 = rs("ZodIPv6", (e10, t10) => {
        nQ.init(e10, t10), lw.init(e10, t10);
      });
      function l1(e10) {
        return oj(l0, e10);
      }
      let l4 = rs("ZodCIDRv4", (e10, t10) => {
        n1.init(e10, t10), lw.init(e10, t10);
      });
      function l6(e10) {
        return oA(l4, e10);
      }
      let l2 = rs("ZodCIDRv6", (e10, t10) => {
        n4.init(e10, t10), lw.init(e10, t10);
      });
      function l9(e10) {
        return oZ(l2, e10);
      }
      let l3 = rs("ZodBase64", (e10, t10) => {
        n2.init(e10, t10), lw.init(e10, t10);
      });
      function l7(e10) {
        return oL(l3, e10);
      }
      let l5 = rs("ZodBase64URL", (e10, t10) => {
        n3.init(e10, t10), lw.init(e10, t10);
      });
      function l8(e10) {
        return oM(l5, e10);
      }
      let de = rs("ZodE164", (e10, t10) => {
        n7.init(e10, t10), lw.init(e10, t10);
      });
      function dt(e10) {
        return oF(de, e10);
      }
      let dr = rs("ZodJWT", (e10, t10) => {
        n8.init(e10, t10), lw.init(e10, t10);
      });
      function di(e10) {
        return oJ(dr, e10);
      }
      let dn = rs("ZodCustomStringFormat", (e10, t10) => {
        ae.init(e10, t10), lw.init(e10, t10);
      });
      function da(e10, t10, r10 = {}) {
        return ua(dn, e10, t10, r10);
      }
      function ds(e10) {
        return ua(dn, "hostname", u4.hostname, e10);
      }
      function du(e10) {
        return ua(dn, "hex", u4.hex, e10);
      }
      function dl(e10, t10) {
        let r10 = t10?.enc ?? "hex", i10 = `${e10}_${r10}`, n10 = u4[i10];
        if (!n10) throw Error(`Unrecognized hash format: ${i10}`);
        return ua(dn, i10, n10, t10);
      }
      let dd = rs("ZodNumber", (e10, t10) => {
        at.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r11, i10) => up(e10, t11, r11, i10), l_(e10, "ZodNumber", { gt(e11, t11) {
          return this.check(sd(e11, t11));
        }, gte(e11, t11) {
          return this.check(sc(e11, t11));
        }, min(e11, t11) {
          return this.check(sc(e11, t11));
        }, lt(e11, t11) {
          return this.check(su(e11, t11));
        }, lte(e11, t11) {
          return this.check(sl(e11, t11));
        }, max(e11, t11) {
          return this.check(sl(e11, t11));
        }, int(e11) {
          return this.check(dm(e11));
        }, safe(e11) {
          return this.check(dm(e11));
        }, positive(e11) {
          return this.check(sd(0, e11));
        }, nonnegative(e11) {
          return this.check(sc(0, e11));
        }, negative(e11) {
          return this.check(su(0, e11));
        }, nonpositive(e11) {
          return this.check(sl(0, e11));
        }, multipleOf(e11, t11) {
          return this.check(sg(e11, t11));
        }, step(e11, t11) {
          return this.check(sg(e11, t11));
        }, finite() {
          return this;
        } });
        let r10 = e10._zod.bag;
        e10.minValue = Math.max(r10.minimum ?? -1 / 0, r10.exclusiveMinimum ?? -1 / 0) ?? null, e10.maxValue = Math.min(r10.maximum ?? 1 / 0, r10.exclusiveMaximum ?? 1 / 0) ?? null, e10.isInt = (r10.format ?? "").includes("int") || Number.isSafeInteger(r10.multipleOf ?? 0.5), e10.isFinite = true, e10.format = r10.format ?? null;
      });
      function dc(e10) {
        return oX(dd, e10);
      }
      let df = rs("ZodNumberFormat", (e10, t10) => {
        ar.init(e10, t10), dd.init(e10, t10);
      });
      function dm(e10) {
        return oK(df, e10);
      }
      function dp(e10) {
        return oY(df, e10);
      }
      function dv(e10) {
        return oQ(df, e10);
      }
      function dg(e10) {
        return o0(df, e10);
      }
      function dh(e10) {
        return o1(df, e10);
      }
      let d_ = rs("ZodBoolean", (e10, t10) => {
        ai.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uv(e10, t11, r10, i10);
      });
      function db(e10) {
        return o4(d_, e10);
      }
      let dy = rs("ZodBigInt", (e10, t10) => {
        an.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r11, i10) => ug(e10, t11, r11, i10), e10.gte = (t11, r11) => e10.check(sc(t11, r11)), e10.min = (t11, r11) => e10.check(sc(t11, r11)), e10.gt = (t11, r11) => e10.check(sd(t11, r11)), e10.gte = (t11, r11) => e10.check(sc(t11, r11)), e10.min = (t11, r11) => e10.check(sc(t11, r11)), e10.lt = (t11, r11) => e10.check(su(t11, r11)), e10.lte = (t11, r11) => e10.check(sl(t11, r11)), e10.max = (t11, r11) => e10.check(sl(t11, r11)), e10.positive = (t11) => e10.check(sd(BigInt(0), t11)), e10.negative = (t11) => e10.check(su(BigInt(0), t11)), e10.nonpositive = (t11) => e10.check(sl(BigInt(0), t11)), e10.nonnegative = (t11) => e10.check(sc(BigInt(0), t11)), e10.multipleOf = (t11, r11) => e10.check(sg(t11, r11));
        let r10 = e10._zod.bag;
        e10.minValue = r10.minimum ?? null, e10.maxValue = r10.maximum ?? null, e10.format = r10.format ?? null;
      });
      function d$(e10) {
        return o2(dy, e10);
      }
      let dx = rs("ZodBigIntFormat", (e10, t10) => {
        aa.init(e10, t10), dy.init(e10, t10);
      });
      function dw(e10) {
        return o3(dx, e10);
      }
      function dk(e10) {
        return o7(dx, e10);
      }
      let dS = rs("ZodSymbol", (e10, t10) => {
        ao.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uh(e10, t11, r10, i10);
      });
      function dI(e10) {
        return o5(dS, e10);
      }
      let dO = rs("ZodUndefined", (e10, t10) => {
        as.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => ub(e10, t11, r10, i10);
      });
      function dE(e10) {
        return o8(dO, e10);
      }
      let dP = rs("ZodNull", (e10, t10) => {
        au.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => u_(e10, t11, r10, i10);
      });
      function dT(e10) {
        return se(dP, e10);
      }
      let dN = rs("ZodAny", (e10, t10) => {
        al.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => ux(e10, t11, r10, i10);
      });
      function dz() {
        return st(dN);
      }
      let dC = rs("ZodUnknown", (e10, t10) => {
        ad.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uw(e10, t11, r10, i10);
      });
      function dR() {
        return sr(dC);
      }
      let dU = rs("ZodNever", (e10, t10) => {
        ac.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => u$(e10, t11, r10, i10);
      });
      function dj(e10) {
        return si(dU, e10);
      }
      let dD = rs("ZodVoid", (e10, t10) => {
        af.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uy(e10, t11, r10, i10);
      });
      function dA(e10) {
        return sn(dD, e10);
      }
      let dZ = rs("ZodDate", (e10, t10) => {
        am.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r11, i10) => uk(e10, t11, r11, i10), e10.min = (t11, r11) => e10.check(sc(t11, r11)), e10.max = (t11, r11) => e10.check(sl(t11, r11));
        let r10 = e10._zod.bag;
        e10.minDate = r10.minimum ? new Date(r10.minimum) : null, e10.maxDate = r10.maximum ? new Date(r10.maximum) : null;
      });
      function dL(e10) {
        return sa(dZ, e10);
      }
      let dM = rs("ZodArray", (e10, t10) => {
        av.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uj(e10, t11, r10, i10), e10.element = t10.element, l_(e10, "ZodArray", { min(e11, t11) {
          return this.check(s$(e11, t11));
        }, nonempty(e11) {
          return this.check(s$(1, e11));
        }, max(e11, t11) {
          return this.check(sy(e11, t11));
        }, length(e11, t11) {
          return this.check(sx(e11, t11));
        }, unwrap() {
          return this.element;
        } });
      });
      function dF(e10, t10) {
        return sD(dM, e10, t10);
      }
      function dJ(e10) {
        return ci(Object.keys(e10._zod.def.shape));
      }
      let dB = rs("ZodObject", (e10, t10) => {
        ay.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uD(e10, t11, r10, i10), u6.defineLazy(e10, "shape", () => t10.shape), l_(e10, "ZodObject", { keyof() {
          return ci(Object.keys(this._zod.def.shape));
        }, catchall(e11) {
          return this.clone({ ...this._zod.def, catchall: e11 });
        }, passthrough() {
          return this.clone({ ...this._zod.def, catchall: dR() });
        }, loose() {
          return this.clone({ ...this._zod.def, catchall: dR() });
        }, strict() {
          return this.clone({ ...this._zod.def, catchall: dj() });
        }, strip() {
          return this.clone({ ...this._zod.def, catchall: void 0 });
        }, extend(e11) {
          return u6.extend(this, e11);
        }, safeExtend(e11) {
          return u6.safeExtend(this, e11);
        }, merge(e11) {
          return u6.merge(this, e11);
        }, pick(e11) {
          return u6.pick(this, e11);
        }, omit(e11) {
          return u6.omit(this, e11);
        }, partial(...e11) {
          return u6.partial(cc, this, e11[0]);
        }, required(...e11) {
          return u6.required(cx, this, e11[0]);
        } });
      });
      function dq(e10, t10) {
        return new dB({ type: "object", shape: e10 ?? {}, ...u6.normalizeParams(t10) });
      }
      function dV(e10, t10) {
        return new dB({ type: "object", shape: e10, catchall: dj(), ...u6.normalizeParams(t10) });
      }
      function dG(e10, t10) {
        return new dB({ type: "object", shape: e10, catchall: dR(), ...u6.normalizeParams(t10) });
      }
      let dW = rs("ZodUnion", (e10, t10) => {
        ax.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uA(e10, t11, r10, i10), e10.options = t10.options;
      });
      function dX(e10, t10) {
        return new dW({ type: "union", options: e10, ...u6.normalizeParams(t10) });
      }
      let dH = rs("ZodXor", (e10, t10) => {
        dW.init(e10, t10), ak.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uA(e10, t11, r10, i10), e10.options = t10.options;
      });
      function dK(e10, t10) {
        return new dH({ type: "union", options: e10, inclusive: false, ...u6.normalizeParams(t10) });
      }
      let dY = rs("ZodDiscriminatedUnion", (e10, t10) => {
        dW.init(e10, t10), aS.init(e10, t10);
      });
      function dQ(e10, t10, r10) {
        return new dY({ type: "union", options: t10, discriminator: e10, ...u6.normalizeParams(r10) });
      }
      let d0 = rs("ZodIntersection", (e10, t10) => {
        aI.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uZ(e10, t11, r10, i10);
      });
      function d1(e10, t10) {
        return new d0({ type: "intersection", left: e10, right: t10 });
      }
      let d4 = rs("ZodTuple", (e10, t10) => {
        aE.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uL(e10, t11, r10, i10), e10.rest = (t11) => e10.clone({ ...e10._zod.def, rest: t11 });
      });
      function d6(e10, t10, r10) {
        let i10 = t10 instanceof nR, n10 = i10 ? r10 : t10;
        return new d4({ type: "tuple", items: e10, rest: i10 ? t10 : null, ...u6.normalizeParams(n10) });
      }
      let d2 = rs("ZodRecord", (e10, t10) => {
        az.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uM(e10, t11, r10, i10), e10.keyType = t10.keyType, e10.valueType = t10.valueType;
      });
      function d9(e10, t10, r10) {
        return new d2(t10 && t10._zod ? { type: "record", keyType: e10, valueType: t10, ...u6.normalizeParams(r10) } : { type: "record", keyType: lx(), valueType: e10, ...u6.normalizeParams(t10) });
      }
      function d3(e10, t10, r10) {
        let i10 = rR(e10);
        return i10._zod.values = void 0, new d2({ type: "record", keyType: i10, valueType: t10, ...u6.normalizeParams(r10) });
      }
      function d7(e10, t10, r10) {
        return new d2({ type: "record", keyType: e10, valueType: t10, mode: "loose", ...u6.normalizeParams(r10) });
      }
      let d5 = rs("ZodMap", (e10, t10) => {
        aC.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uR(e10, t11, r10, i10), e10.keyType = t10.keyType, e10.valueType = t10.valueType, e10.min = (...t11) => e10.check(s_(...t11)), e10.nonempty = (t11) => e10.check(s_(1, t11)), e10.max = (...t11) => e10.check(sh(...t11)), e10.size = (...t11) => e10.check(sb(...t11));
      });
      function d8(e10, t10, r10) {
        return new d5({ type: "map", keyType: e10, valueType: t10, ...u6.normalizeParams(r10) });
      }
      let ce = rs("ZodSet", (e10, t10) => {
        aU.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uU(e10, t11, r10, i10), e10.min = (...t11) => e10.check(s_(...t11)), e10.nonempty = (t11) => e10.check(s_(1, t11)), e10.max = (...t11) => e10.check(sh(...t11)), e10.size = (...t11) => e10.check(sb(...t11));
      });
      function ct(e10, t10) {
        return new ce({ type: "set", valueType: e10, ...u6.normalizeParams(t10) });
      }
      let cr = rs("ZodEnum", (e10, t10) => {
        aD.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r11, i10) => uS(e10, t11, r11, i10), e10.enum = t10.entries, e10.options = Object.values(t10.entries);
        let r10 = new Set(Object.keys(t10.entries));
        e10.extract = (e11, i10) => {
          let n10 = {};
          for (let i11 of e11) if (r10.has(i11)) n10[i11] = t10.entries[i11];
          else throw Error(`Key ${i11} not found in enum`);
          return new cr({ ...t10, checks: [], ...u6.normalizeParams(i10), entries: n10 });
        }, e10.exclude = (e11, i10) => {
          let n10 = { ...t10.entries };
          for (let t11 of e11) if (r10.has(t11)) delete n10[t11];
          else throw Error(`Key ${t11} not found in enum`);
          return new cr({ ...t10, checks: [], ...u6.normalizeParams(i10), entries: n10 });
        };
      });
      function ci(e10, t10) {
        return new cr({ type: "enum", entries: Array.isArray(e10) ? Object.fromEntries(e10.map((e11) => [e11, e11])) : e10, ...u6.normalizeParams(t10) });
      }
      function cn(e10, t10) {
        return new cr({ type: "enum", entries: e10, ...u6.normalizeParams(t10) });
      }
      let ca = rs("ZodLiteral", (e10, t10) => {
        aA.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uI(e10, t11, r10, i10), e10.values = new Set(t10.values), Object.defineProperty(e10, "value", { get() {
          if (t10.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
          return t10.values[0];
        } });
      });
      function co(e10, t10) {
        return new ca({ type: "literal", values: Array.isArray(e10) ? e10 : [e10], ...u6.normalizeParams(t10) });
      }
      let cs = rs("ZodFile", (e10, t10) => {
        aZ.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uP(e10, t11, r10, i10), e10.min = (t11, r10) => e10.check(s_(t11, r10)), e10.max = (t11, r10) => e10.check(sh(t11, r10)), e10.mime = (t11, r10) => e10.check(sT(Array.isArray(t11) ? t11 : [t11], r10));
      });
      function cu(e10) {
        return sX(cs, e10);
      }
      let cl = rs("ZodTransform", (e10, t10) => {
        aL.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uC(e10, t11, r10, i10), e10._zod.parse = (r10, i10) => {
          if ("backward" === i10.direction) throw new rd(e10.constructor.name);
          r10.addIssue = (i11) => {
            "string" == typeof i11 ? r10.issues.push(u6.issue(i11, r10.value, t10)) : (i11.fatal && (i11.continue = false), i11.code ?? (i11.code = "custom"), i11.input ?? (i11.input = r10.value), i11.inst ?? (i11.inst = e10), r10.issues.push(u6.issue(i11)));
          };
          let n10 = t10.transform(r10.value, r10);
          return n10 instanceof Promise ? n10.then((e11) => (r10.value = e11, r10.fallback = true, r10)) : (r10.value = n10, r10.fallback = true, r10);
        };
      });
      function cd(e10) {
        return new cl({ type: "transform", transform: e10 });
      }
      let cc = rs("ZodOptional", (e10, t10) => {
        aF.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uH(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType;
      });
      function cf(e10) {
        return new cc({ type: "optional", innerType: e10 });
      }
      let cm = rs("ZodExactOptional", (e10, t10) => {
        aJ.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uH(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType;
      });
      function cp(e10) {
        return new cm({ type: "optional", innerType: e10 });
      }
      let cv = rs("ZodNullable", (e10, t10) => {
        aB.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uF(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType;
      });
      function cg(e10) {
        return new cv({ type: "nullable", innerType: e10 });
      }
      function ch(e10) {
        return cf(cg(e10));
      }
      let c_ = rs("ZodDefault", (e10, t10) => {
        aq.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uB(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType, e10.removeDefault = e10.unwrap;
      });
      function cb(e10, t10) {
        return new c_({ type: "default", innerType: e10, get defaultValue() {
          return "function" == typeof t10 ? t10() : u6.shallowClone(t10);
        } });
      }
      let cy = rs("ZodPrefault", (e10, t10) => {
        aG.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uq(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType;
      });
      function c$(e10, t10) {
        return new cy({ type: "prefault", innerType: e10, get defaultValue() {
          return "function" == typeof t10 ? t10() : u6.shallowClone(t10);
        } });
      }
      let cx = rs("ZodNonOptional", (e10, t10) => {
        aW.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uJ(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType;
      });
      function cw(e10, t10) {
        return new cx({ type: "nonoptional", innerType: e10, ...u6.normalizeParams(t10) });
      }
      let ck = rs("ZodSuccess", (e10, t10) => {
        aH.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uT(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType;
      });
      function cS(e10) {
        return new ck({ type: "success", innerType: e10 });
      }
      let cI = rs("ZodCatch", (e10, t10) => {
        aK.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uV(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType, e10.removeCatch = e10.unwrap;
      });
      function cO(e10, t10) {
        return new cI({ type: "catch", innerType: e10, catchValue: "function" == typeof t10 ? t10 : () => t10 });
      }
      let cE = rs("ZodNaN", (e10, t10) => {
        aY.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uO(e10, t11, r10, i10);
      });
      function cP(e10) {
        return ss(cE, e10);
      }
      let cT = rs("ZodPipe", (e10, t10) => {
        aQ.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uG(e10, t11, r10, i10), e10.in = t10.in, e10.out = t10.out;
      });
      function cN(e10, t10) {
        return new cT({ type: "pipe", in: e10, out: t10 });
      }
      let cz = rs("ZodCodec", (e10, t10) => {
        cT.init(e10, t10), a1.init(e10, t10);
      });
      function cC(e10, t10, r10) {
        return new cz({ type: "pipe", in: e10, out: t10, transform: r10.decode, reverseTransform: r10.encode });
      }
      function cR(e10) {
        let t10 = e10._zod.def;
        return new cz({ type: "pipe", in: t10.out, out: t10.in, transform: t10.reverseTransform, reverseTransform: t10.transform });
      }
      let cU = rs("ZodPreprocess", (e10, t10) => {
        cT.init(e10, t10), a2.init(e10, t10);
      }), cj = rs("ZodReadonly", (e10, t10) => {
        a9.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uW(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType;
      });
      function cD(e10) {
        return new cj({ type: "readonly", innerType: e10 });
      }
      let cA = rs("ZodTemplateLiteral", (e10, t10) => {
        a7.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uE(e10, t11, r10, i10);
      });
      function cZ(e10, t10) {
        return new cA({ type: "template_literal", parts: e10, ...u6.normalizeParams(t10) });
      }
      let cL = rs("ZodLazy", (e10, t10) => {
        oe.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uK(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.getter();
      });
      function cM(e10) {
        return new cL({ type: "lazy", getter: e10 });
      }
      let cF = rs("ZodPromise", (e10, t10) => {
        a8.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uX(e10, t11, r10, i10), e10.unwrap = () => e10._zod.def.innerType;
      });
      function cJ(e10) {
        return new cF({ type: "promise", innerType: e10 });
      }
      let cB = rs("ZodFunction", (e10, t10) => {
        a5.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uz(e10, t11, r10, i10);
      });
      function cq(e10) {
        return new cB({ type: "function", input: Array.isArray(e10?.input) ? d6(e10?.input) : e10?.input ?? dF(dR()), output: e10?.output ?? dR() });
      }
      let cV = rs("ZodCustom", (e10, t10) => {
        ot.init(e10, t10), lb.init(e10, t10), e10._zod.processJSONSchema = (t11, r10, i10) => uN(e10, t11, r10, i10);
      });
      function cG(e10) {
        let t10 = new nu({ check: "custom" });
        return t10._zod.check = e10, t10;
      }
      function cW(e10, t10) {
        return s5(cV, e10 ?? (() => true), t10);
      }
      function cX(e10, t10 = {}) {
        return s8(cV, e10, t10);
      }
      function cH(e10, t10) {
        return ue(e10, t10);
      }
      let cK = ur, cY = ui;
      function cQ(e10, t10 = {}) {
        let r10 = new cV({ type: "custom", check: "custom", fn: (t11) => t11 instanceof e10, abort: true, ...u6.normalizeParams(t10) });
        return r10._zod.bag.Class = e10, r10._zod.check = (t11) => {
          t11.value instanceof e10 || t11.issues.push({ code: "invalid_type", expected: e10.name, input: t11.value, inst: r10, path: [...r10._zod.def.path ?? []] });
        }, r10;
      }
      let c0 = (...e10) => un({ Codec: cz, Boolean: d_, String: l$ }, ...e10);
      function c1(e10) {
        let t10 = cM(() => dX([lx(e10), dc(), db(), dT(), dF(t10), d9(lx(), t10)]));
        return t10;
      }
      function c4(e10, t10) {
        return new cU({ type: "pipe", in: cd(e10), out: t10 });
      }
      var c6 = e.i(6636);
      e.s([], 44822), e.i(44822), e.s(["endsWith", 0, sE, "gt", 0, sd, "gte", 0, sc, "includes", 0, sI, "length", 0, sx, "lowercase", 0, sk, "lt", 0, su, "lte", 0, sl, "maxLength", 0, sy, "maxSize", 0, sh, "mime", 0, sT, "minLength", 0, s$, "minSize", 0, s_, "multipleOf", 0, sg, "negative", 0, sm, "nonnegative", 0, sv, "nonpositive", 0, sp, "normalize", 0, sz, "overwrite", 0, sN, "positive", 0, sf, "property", 0, sP, "regex", 0, sw, "size", 0, sb, "slugify", 0, sj, "startsWith", 0, sO, "toLowerCase", 0, sR, "toUpperCase", 0, sU, "trim", 0, sC, "uppercase", 0, sS], 72345);
      var c2 = e.i(72345);
      e.i(21391), e.i(53541);
      let c9 = { invalid_type: "invalid_type", too_big: "too_big", too_small: "too_small", invalid_format: "invalid_format", not_multiple_of: "not_multiple_of", unrecognized_keys: "unrecognized_keys", invalid_union: "invalid_union", invalid_key: "invalid_key", invalid_element: "invalid_element", invalid_value: "invalid_value", custom: "custom" };
      function c3(e10) {
        rf({ customError: e10 });
      }
      function c7() {
        return rf().customError;
      }
      er || (er = {}), e.s(["ZodFirstPartyTypeKind", 0, er, "ZodIssueCode", 0, c9, "getErrorMap", 0, c7, "setErrorMap", 0, c3], 97811), e.i(97811), e.s(["$brand", 0, ru, "ZodFirstPartyTypeKind", 0, er, "ZodIssueCode", 0, c9, "config", 0, rf, "getErrorMap", 0, c7, "setErrorMap", 0, c3], 21727), e.i(21727);
      var u4 = on, u6 = oi, c5 = e.i(33271);
      let c8 = { ...c6, ...c2, iso: c5 }, fe = /* @__PURE__ */ new Set(["$schema", "$ref", "$defs", "definitions", "$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor", "type", "enum", "const", "anyOf", "oneOf", "allOf", "not", "properties", "required", "additionalProperties", "patternProperties", "propertyNames", "minProperties", "maxProperties", "items", "prefixItems", "additionalItems", "minItems", "maxItems", "uniqueItems", "contains", "minContains", "maxContains", "minLength", "maxLength", "pattern", "format", "minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "multipleOf", "description", "default", "contentEncoding", "contentMediaType", "contentSchema", "unevaluatedItems", "unevaluatedProperties", "if", "then", "else", "dependentSchemas", "dependentRequired", "nullable", "readOnly"]);
      e.s(["bigint", 0, function(e10) {
        return o9(dy, e10);
      }, "boolean", 0, function(e10) {
        return o6(d_, e10);
      }, "date", 0, function(e10) {
        return so(dZ, e10);
      }, "number", 0, function(e10) {
        return oH(dd, e10);
      }, "string", 0, function(e10) {
        return oy(l$, e10);
      }], 29864);
      var ft = e.i(29864);
      e.s(["$brand", 0, ru, "$input", 0, ov, "$output", 0, op, "NEVER", 0, ro, "TimePrecision", 0, oB, "ZodAny", 0, dN, "ZodArray", 0, dM, "ZodBase64", 0, l3, "ZodBase64URL", 0, l5, "ZodBigInt", 0, dy, "ZodBigIntFormat", 0, dx, "ZodBoolean", 0, d_, "ZodCIDRv4", 0, l4, "ZodCIDRv6", 0, l2, "ZodCUID", 0, lL, "ZodCUID2", 0, lF, "ZodCatch", 0, cI, "ZodCodec", 0, cz, "ZodCustom", 0, cV, "ZodCustomStringFormat", 0, dn, "ZodDate", 0, dZ, "ZodDefault", 0, c_, "ZodDiscriminatedUnion", 0, dY, "ZodE164", 0, de, "ZodEmail", 0, lk, "ZodEmoji", 0, lj, "ZodEnum", 0, cr, "ZodError", 0, li, "ZodExactOptional", 0, cm, "ZodFile", 0, cs, "ZodFirstPartyTypeKind", 0, er, "ZodFunction", 0, cB, "ZodGUID", 0, lI, "ZodIPv4", 0, lH, "ZodIPv6", 0, l0, "ZodISODate", 0, u3, "ZodISODateTime", 0, u2, "ZodISODuration", 0, le, "ZodISOTime", 0, u5, "ZodIntersection", 0, d0, "ZodIssueCode", 0, c9, "ZodJWT", 0, dr, "ZodKSUID", 0, lW, "ZodLazy", 0, cL, "ZodLiteral", 0, ca, "ZodMAC", 0, lY, "ZodMap", 0, d5, "ZodNaN", 0, cE, "ZodNanoID", 0, lA, "ZodNever", 0, dU, "ZodNonOptional", 0, cx, "ZodNull", 0, dP, "ZodNullable", 0, cv, "ZodNumber", 0, dd, "ZodNumberFormat", 0, df, "ZodObject", 0, dB, "ZodOptional", 0, cc, "ZodPipe", 0, cT, "ZodPrefault", 0, cy, "ZodPreprocess", 0, cU, "ZodPromise", 0, cF, "ZodReadonly", 0, cj, "ZodRealError", 0, ln, "ZodRecord", 0, d2, "ZodSet", 0, ce, "ZodString", 0, l$, "ZodStringFormat", 0, lw, "ZodSuccess", 0, ck, "ZodSymbol", 0, dS, "ZodTemplateLiteral", 0, cA, "ZodTransform", 0, cl, "ZodTuple", 0, d4, "ZodType", 0, lb, "ZodULID", 0, lB, "ZodURL", 0, lC, "ZodUUID", 0, lE, "ZodUndefined", 0, dO, "ZodUnion", 0, dW, "ZodUnknown", 0, dC, "ZodVoid", 0, dD, "ZodXID", 0, lV, "ZodXor", 0, dH, "_ZodString", 0, ly, "_default", 0, cb, "_function", 0, cq, "any", 0, dz, "array", 0, dF, "base64", 0, l7, "base64url", 0, l8, "bigint", 0, d$, "boolean", 0, db, "catch", 0, cO, "check", 0, cG, "cidrv4", 0, l6, "cidrv6", 0, l9, "clone", 0, rR, "codec", 0, cC, "coerce", 0, ft, "config", 0, rf, "core", 0, u1, "cuid", 0, lM, "cuid2", 0, lJ, "custom", 0, cW, "date", 0, dL, "decode", 0, ld, "decodeAsync", 0, lf, "describe", 0, cK, "discriminatedUnion", 0, dQ, "e164", 0, dt, "email", 0, lS, "emoji", 0, lD, "encode", 0, ll, "encodeAsync", 0, lc, "endsWith", 0, sE, "enum", 0, ci, "exactOptional", 0, cp, "file", 0, cu, "flattenError", 0, r1, "float32", 0, dp, "float64", 0, dv, "formatError", 0, r4, "fromJSONSchema", 0, function(e10, t10) {
        var r10, i10;
        let n10, a10;
        if ("boolean" == typeof e10) return e10 ? c8.any() : c8.never();
        try {
          n10 = JSON.parse(JSON.stringify(e10));
        } catch {
          throw Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
        }
        let o10 = { version: (r10 = n10, i10 = t10?.defaultTarget, "https://json-schema.org/draft/2020-12/schema" === (a10 = r10.$schema) ? "draft-2020-12" : "http://json-schema.org/draft-07/schema#" === a10 ? "draft-7" : "http://json-schema.org/draft-04/schema#" === a10 ? "draft-4" : i10 ?? "draft-2020-12"), defs: n10.$defs || n10.definitions || {}, refs: /* @__PURE__ */ new Map(), processing: /* @__PURE__ */ new Set(), rootSchema: n10, registry: t10?.registry ?? o_ };
        return function e11(t11, r11) {
          if ("boolean" == typeof t11) return t11 ? c8.any() : c8.never();
          let i11 = function t12(r12, i12) {
            let n12;
            if (void 0 !== r12.not) {
              if ("object" == typeof r12.not && 0 === Object.keys(r12.not).length) return c8.never();
              throw Error("not is not supported in Zod (except { not: {} } for never)");
            }
            if (void 0 !== r12.unevaluatedItems) throw Error("unevaluatedItems is not supported");
            if (void 0 !== r12.unevaluatedProperties) throw Error("unevaluatedProperties is not supported");
            if (void 0 !== r12.if || void 0 !== r12.then || void 0 !== r12.else) throw Error("Conditional schemas (if/then/else) are not supported");
            if (void 0 !== r12.dependentSchemas || void 0 !== r12.dependentRequired) throw Error("dependentSchemas and dependentRequired are not supported");
            if (r12.$ref) {
              let t13 = r12.$ref;
              if (i12.refs.has(t13)) return i12.refs.get(t13);
              if (i12.processing.has(t13)) return c8.lazy(() => {
                if (!i12.refs.has(t13)) throw Error(`Circular reference not resolved: ${t13}`);
                return i12.refs.get(t13);
              });
              i12.processing.add(t13);
              let n13 = e11(function(e12, t14) {
                if (!e12.startsWith("#")) throw Error("External $ref is not supported, only local refs (#/...) are allowed");
                let r13 = e12.slice(1).split("/").filter(Boolean);
                if (0 === r13.length) return t14.rootSchema;
                let i13 = "draft-2020-12" === t14.version ? "$defs" : "definitions";
                if (r13[0] === i13) {
                  let i14 = r13[1];
                  if (!i14 || !t14.defs[i14]) throw Error(`Reference not found: ${e12}`);
                  return t14.defs[i14];
                }
                throw Error(`Reference not found: ${e12}`);
              }(t13, i12), i12);
              return i12.refs.set(t13, n13), i12.processing.delete(t13), n13;
            }
            if (void 0 !== r12.enum) {
              let e12 = r12.enum;
              if ("openapi-3.0" === i12.version && true === r12.nullable && 1 === e12.length && null === e12[0]) return c8.null();
              if (0 === e12.length) return c8.never();
              if (1 === e12.length) return c8.literal(e12[0]);
              if (e12.every((e13) => "string" == typeof e13)) return c8.enum(e12);
              let t13 = e12.map((e13) => c8.literal(e13));
              return t13.length < 2 ? t13[0] : c8.union([t13[0], t13[1], ...t13.slice(2)]);
            }
            if (void 0 !== r12.const) return c8.literal(r12.const);
            let a12 = r12.type;
            if (Array.isArray(a12)) {
              let e12 = a12.map((e13) => t12({ ...r12, type: e13 }, i12));
              return 0 === e12.length ? c8.never() : 1 === e12.length ? e12[0] : c8.union(e12);
            }
            if (!a12) return c8.any();
            switch (a12) {
              case "string": {
                let e12 = c8.string();
                if (r12.format) {
                  let t13 = r12.format;
                  "email" === t13 ? e12 = e12.check(c8.email()) : "uri" === t13 || "uri-reference" === t13 ? e12 = e12.check(c8.url()) : "uuid" === t13 || "guid" === t13 ? e12 = e12.check(c8.uuid()) : "date-time" === t13 ? e12 = e12.check(c8.iso.datetime()) : "date" === t13 ? e12 = e12.check(c8.iso.date()) : "time" === t13 ? e12 = e12.check(c8.iso.time()) : "duration" === t13 ? e12 = e12.check(c8.iso.duration()) : "ipv4" === t13 ? e12 = e12.check(c8.ipv4()) : "ipv6" === t13 ? e12 = e12.check(c8.ipv6()) : "mac" === t13 ? e12 = e12.check(c8.mac()) : "cidr" === t13 ? e12 = e12.check(c8.cidrv4()) : "cidr-v6" === t13 ? e12 = e12.check(c8.cidrv6()) : "base64" === t13 ? e12 = e12.check(c8.base64()) : "base64url" === t13 ? e12 = e12.check(c8.base64url()) : "e164" === t13 ? e12 = e12.check(c8.e164()) : "jwt" === t13 ? e12 = e12.check(c8.jwt()) : "emoji" === t13 ? e12 = e12.check(c8.emoji()) : "nanoid" === t13 ? e12 = e12.check(c8.nanoid()) : "cuid" === t13 ? e12 = e12.check(c8.cuid()) : "cuid2" === t13 ? e12 = e12.check(c8.cuid2()) : "ulid" === t13 ? e12 = e12.check(c8.ulid()) : "xid" === t13 ? e12 = e12.check(c8.xid()) : "ksuid" === t13 && (e12 = e12.check(c8.ksuid()));
                }
                "number" == typeof r12.minLength && (e12 = e12.min(r12.minLength)), "number" == typeof r12.maxLength && (e12 = e12.max(r12.maxLength)), r12.pattern && (e12 = e12.regex(new RegExp(r12.pattern))), n12 = e12;
                break;
              }
              case "number":
              case "integer": {
                let e12 = "integer" === a12 ? c8.number().int() : c8.number();
                "number" == typeof r12.minimum && (e12 = e12.min(r12.minimum)), "number" == typeof r12.maximum && (e12 = e12.max(r12.maximum)), "number" == typeof r12.exclusiveMinimum ? e12 = e12.gt(r12.exclusiveMinimum) : true === r12.exclusiveMinimum && "number" == typeof r12.minimum && (e12 = e12.gt(r12.minimum)), "number" == typeof r12.exclusiveMaximum ? e12 = e12.lt(r12.exclusiveMaximum) : true === r12.exclusiveMaximum && "number" == typeof r12.maximum && (e12 = e12.lt(r12.maximum)), "number" == typeof r12.multipleOf && (e12 = e12.multipleOf(r12.multipleOf)), n12 = e12;
                break;
              }
              case "boolean":
                n12 = c8.boolean();
                break;
              case "null":
                n12 = c8.null();
                break;
              case "object": {
                let t13 = {}, a13 = r12.properties || {}, o11 = new Set(r12.required || []);
                for (let [r13, n13] of Object.entries(a13)) {
                  let a14 = e11(n13, i12);
                  t13[r13] = o11.has(r13) ? a14 : a14.optional();
                }
                if (r12.propertyNames) {
                  let a14 = e11(r12.propertyNames, i12), o12 = r12.additionalProperties && "object" == typeof r12.additionalProperties ? e11(r12.additionalProperties, i12) : c8.any();
                  if (0 === Object.keys(t13).length) {
                    n12 = c8.record(a14, o12);
                    break;
                  }
                  let s11 = c8.object(t13).passthrough(), u10 = c8.looseRecord(a14, o12);
                  n12 = c8.intersection(s11, u10);
                  break;
                }
                if (r12.patternProperties) {
                  let a14 = r12.patternProperties, o12 = Object.keys(a14), s11 = [];
                  for (let t14 of o12) {
                    let r13 = e11(a14[t14], i12), n13 = c8.string().regex(new RegExp(t14));
                    s11.push(c8.looseRecord(n13, r13));
                  }
                  let u10 = [];
                  if (Object.keys(t13).length > 0 && u10.push(c8.object(t13).passthrough()), u10.push(...s11), 0 === u10.length) n12 = c8.object({}).passthrough();
                  else if (1 === u10.length) n12 = u10[0];
                  else {
                    let e12 = c8.intersection(u10[0], u10[1]);
                    for (let t14 = 2; t14 < u10.length; t14++) e12 = c8.intersection(e12, u10[t14]);
                    n12 = e12;
                  }
                  break;
                }
                let s10 = c8.object(t13);
                n12 = false === r12.additionalProperties ? s10.strict() : "object" == typeof r12.additionalProperties ? s10.catchall(e11(r12.additionalProperties, i12)) : s10.passthrough();
                break;
              }
              case "array": {
                let t13 = r12.prefixItems, a13 = r12.items;
                if (t13 && Array.isArray(t13)) {
                  let o11 = t13.map((t14) => e11(t14, i12)), s10 = a13 && "object" == typeof a13 && !Array.isArray(a13) ? e11(a13, i12) : void 0;
                  n12 = s10 ? c8.tuple(o11).rest(s10) : c8.tuple(o11), "number" == typeof r12.minItems && (n12 = n12.check(c8.minLength(r12.minItems))), "number" == typeof r12.maxItems && (n12 = n12.check(c8.maxLength(r12.maxItems)));
                } else if (Array.isArray(a13)) {
                  let t14 = a13.map((t15) => e11(t15, i12)), o11 = r12.additionalItems && "object" == typeof r12.additionalItems ? e11(r12.additionalItems, i12) : void 0;
                  n12 = o11 ? c8.tuple(t14).rest(o11) : c8.tuple(t14), "number" == typeof r12.minItems && (n12 = n12.check(c8.minLength(r12.minItems))), "number" == typeof r12.maxItems && (n12 = n12.check(c8.maxLength(r12.maxItems)));
                } else if (void 0 !== a13) {
                  let t14 = e11(a13, i12), o11 = c8.array(t14);
                  "number" == typeof r12.minItems && (o11 = o11.min(r12.minItems)), "number" == typeof r12.maxItems && (o11 = o11.max(r12.maxItems)), n12 = o11;
                } else n12 = c8.array(c8.any());
                break;
              }
              default:
                throw Error(`Unsupported type: ${a12}`);
            }
            return n12;
          }(t11, r11), n11 = t11.type || void 0 !== t11.enum || void 0 !== t11.const;
          if (t11.anyOf && Array.isArray(t11.anyOf)) {
            let a12 = t11.anyOf.map((t12) => e11(t12, r11)), o11 = c8.union(a12);
            i11 = n11 ? c8.intersection(i11, o11) : o11;
          }
          if (t11.oneOf && Array.isArray(t11.oneOf)) {
            let a12 = t11.oneOf.map((t12) => e11(t12, r11)), o11 = c8.xor(a12);
            i11 = n11 ? c8.intersection(i11, o11) : o11;
          }
          if (t11.allOf && Array.isArray(t11.allOf)) if (0 === t11.allOf.length) i11 = n11 ? i11 : c8.any();
          else {
            let a12 = n11 ? i11 : e11(t11.allOf[0], r11), o11 = +!n11;
            for (let i12 = o11; i12 < t11.allOf.length; i12++) a12 = c8.intersection(a12, e11(t11.allOf[i12], r11));
            i11 = a12;
          }
          true === t11.nullable && "openapi-3.0" === r11.version && (i11 = c8.nullable(i11)), true === t11.readOnly && (i11 = c8.readonly(i11)), void 0 !== t11.default && (i11 = i11.default(t11.default));
          let a11 = {};
          for (let e12 of ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"]) e12 in t11 && (a11[e12] = t11[e12]);
          for (let e12 of ["contentEncoding", "contentMediaType", "contentSchema"]) e12 in t11 && (a11[e12] = t11[e12]);
          for (let e12 of Object.keys(t11)) fe.has(e12) || (a11[e12] = t11[e12]);
          return Object.keys(a11).length > 0 && r11.registry.add(i11, a11), t11.description && (i11 = i11.describe(t11.description)), i11;
        }(n10, o10);
      }, "function", 0, cq, "getErrorMap", 0, c7, "globalRegistry", 0, o_, "gt", 0, sd, "gte", 0, sc, "guid", 0, lO, "hash", 0, dl, "hex", 0, du, "hostname", 0, ds, "httpUrl", 0, lU, "includes", 0, sI, "instanceof", 0, cQ, "int", 0, dm, "int32", 0, dg, "int64", 0, dw, "intersection", 0, d1, "invertCodec", 0, cR, "ipv4", 0, lK, "ipv6", 0, l1, "iso", 0, c5, "json", 0, c1, "jwt", 0, di, "keyof", 0, dJ, "ksuid", 0, lX, "lazy", 0, cM, "length", 0, sx, "literal", 0, co, "locales", 0, om, "looseObject", 0, dG, "looseRecord", 0, d7, "lowercase", 0, sk, "lt", 0, su, "lte", 0, sl, "mac", 0, lQ, "map", 0, d8, "maxLength", 0, sy, "maxSize", 0, sh, "meta", 0, cY, "mime", 0, sT, "minLength", 0, s$, "minSize", 0, s_, "multipleOf", 0, sg, "nan", 0, cP, "nanoid", 0, lZ, "nativeEnum", 0, cn, "negative", 0, sm, "never", 0, dj, "nonnegative", 0, sv, "nonoptional", 0, cw, "nonpositive", 0, sp, "normalize", 0, sz, "null", 0, dT, "nullable", 0, cg, "nullish", 0, ch, "number", 0, dc, "object", 0, dq, "optional", 0, cf, "overwrite", 0, sN, "parse", 0, la, "parseAsync", 0, lo, "partialRecord", 0, d3, "pipe", 0, cN, "positive", 0, sf, "prefault", 0, c$, "preprocess", 0, c4, "prettifyError", 0, r9, "promise", 0, cJ, "property", 0, sP, "readonly", 0, cD, "record", 0, d9, "refine", 0, cX, "regex", 0, sw, "regexes", () => u4, "registry", 0, oh, "safeDecode", 0, lp, "safeDecodeAsync", 0, lg, "safeEncode", 0, lm, "safeEncodeAsync", 0, lv, "safeParse", 0, ls, "safeParseAsync", 0, lu, "set", 0, ct, "setErrorMap", 0, c3, "size", 0, sb, "slugify", 0, sj, "startsWith", 0, sO, "strictObject", 0, dV, "string", 0, lx, "stringFormat", 0, da, "stringbool", 0, c0, "success", 0, cS, "superRefine", 0, cH, "symbol", 0, dI, "templateLiteral", 0, cZ, "toJSONSchema", 0, uQ, "toLowerCase", 0, sR, "toUpperCase", 0, sU, "transform", 0, cd, "treeifyError", 0, r6, "trim", 0, sC, "tuple", 0, d6, "uint32", 0, dh, "uint64", 0, dk, "ulid", 0, lq, "undefined", 0, dE, "union", 0, dX, "unknown", 0, dR, "uppercase", 0, sS, "url", 0, lR, "util", () => u6, "uuid", 0, lP, "uuidv4", 0, lT, "uuidv6", 0, lN, "uuidv7", 0, lz, "void", 0, dA, "xid", 0, lG, "xor", 0, dK], 18729);
      var fr = e.i(18729), fr = fr;
      let fi = Symbol.for("__cloudflare-context__");
      function fn() {
        return globalThis[fi];
      }
      function fa() {
        let e10 = globalThis;
        return e10.__NEXT_DATA__?.nextExport === true;
      }
      async function fo() {
        let e10 = fn();
        if (e10) return e10;
        if (fa()) {
          var t10;
          let e11 = await fs();
          return t10 = e11, globalThis[fi] = t10, e11;
        }
        throw Error(fu);
      }
      async function fs(e10) {
        let { getPlatformProxy: t10 } = await import(`${"__wrangler".replaceAll("_", "")}`), r10 = e10?.environment ?? process.env.NEXT_DEV_WRANGLER_ENV, { env: i10, cf: n10, ctx: a10 } = await t10({ ...e10, envFiles: [], environment: r10 });
        return { env: i10, cf: n10, ctx: a10 };
      }
      let fu = `

ERROR: \`getCloudflareContext\` has been called without having called \`initOpenNextCloudflareForDev\` from the Next.js config file.
You should update your Next.js config file as shown below:

   \`\`\`
   // next.config.mjs

   import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

   initOpenNextCloudflareForDev();

   const nextConfig = { ... };
   export default nextConfig;
   \`\`\`

`, fl = fr.object({ SUPABASE_URL: fr.string().url("SUPABASE_URL must be a valid URL"), SUPABASE_ANON_KEY: fr.string().min(1, "SUPABASE_ANON_KEY is required"), SESSION_SECRET: fr.string().min(16, "SESSION_SECRET must be at least 16 characters long").default("default-secret-key-32-characters-long-bodybarrel"), GMAIL_USER: fr.string().email("GMAIL_USER must be a valid email").optional(), GMAIL_APP_PASSWORD: fr.string().optional(), RAZORPAY_API_KEY: fr.string().optional(), RAZORPAY_SECRET: fr.string().optional(), STRIPE_SECRET_KEY: fr.string().optional(), DATABASE_URL: fr.string().optional(), DIRECT_URL: fr.string().optional() }), fd = null, fc = new TextEncoder(), ff = new TextDecoder();
      function fm(e10) {
        let t10 = e10.replace(/-/g, "+").replace(/_/g, "/");
        for (; t10.length % 4; ) t10 += "=";
        let r10 = atob(t10), i10 = new Uint8Array(r10.length);
        for (let e11 = 0; e11 < r10.length; e11++) i10[e11] = r10.charCodeAt(e11);
        return i10;
      }
      async function fp() {
        let e10 = function() {
          if (fd) return fd;
          let e11 = function() {
            if ("u" < typeof process || process?.env?.NEXT_RUNTIME === "edge") try {
              return function(e12 = { async: false }) {
                return e12.async ? fo() : function() {
                  let e13 = fn();
                  if (e13) return e13;
                  if (fa()) throw Error("  - make sure that the call is not at the top level and that the route is not static\n  - call `getCloudflareContext({async: true})` to use the `async` mode\n  - avoid calling `getCloudflareContext` in the route\n");
                  throw Error(fu);
                }();
              }();
            } catch {
              return;
            }
          }(), t11 = e11?.env || {}, r10 = { SUPABASE_URL: t11.SUPABASE_URL || process.env.SUPABASE_URL, SUPABASE_ANON_KEY: t11.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY, SESSION_SECRET: t11.SESSION_SECRET || process.env.SESSION_SECRET, GMAIL_USER: t11.GMAIL_USER || process.env.GMAIL_USER, GMAIL_APP_PASSWORD: t11.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD, RAZORPAY_API_KEY: t11.RAZORPAY_API_KEY || process.env.RAZORPAY_API_KEY, RAZORPAY_SECRET: t11.RAZORPAY_SECRET || process.env.RAZORPAY_SECRET, STRIPE_SECRET_KEY: t11.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY, DATABASE_URL: t11.DATABASE_URL || process.env.DATABASE_URL, DIRECT_URL: t11.DIRECT_URL || process.env.DIRECT_URL }, i10 = fl.safeParse(r10);
          if (!i10.success) {
            if (console.error("\u274C Environment validation failed:", JSON.stringify(i10.error.format(), null, 2)), "phase-production-build" !== process.env.NEXT_PHASE) throw Error(`Environment validation failed: ${i10.error.message}`);
            return fd = { ...r10, SESSION_SECRET: r10.SESSION_SECRET || "default-secret-key-32-characters-long-bodybarrel" };
          }
          return fd = i10.data;
        }().SESSION_SECRET, t10 = fc.encode(e10);
        return await crypto.subtle.importKey("raw", t10, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign", "verify"]);
      }
      async function fv(e10) {
        try {
          let [t10, r10] = e10.split(".");
          if (!t10 || !r10) return null;
          let i10 = await fp(), n10 = fm(t10), a10 = fm(r10);
          if (!await crypto.subtle.verify("HMAC", i10, a10, n10)) return null;
          return JSON.parse(ff.decode(n10));
        } catch (e11) {
          return console.error("verifySession Error:", e11), null;
        }
      }
      let fg = /* @__PURE__ */ new Map();
      async function fh(e10) {
        let { pathname: t10 } = e10.nextUrl;
        if (t10.startsWith("/_next") || t10.includes(".") || "/favicon.ico" === t10) return ed.next();
        let r10 = e10.headers.get("cf-connecting-ip") || e10.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
        if (!function(e11, t11) {
          let r11 = Date.now(), i11 = "api";
          if (t11.startsWith("/api/auth/otp") || t11.startsWith("/api/auth/verify") ? i11 = "auth" : t11.startsWith("/api/") || (i11 = "bypass"), "bypass" === i11) return true;
          let n11 = `${e11}:${i11}`, a10 = "auth" === i11 ? 5 : 60, o10 = a10 / 6e4, s10 = fg.get(n11);
          s10 || (s10 = { tokens: a10, lastRefill: r11 }, fg.set(n11, s10));
          let u10 = r11 - s10.lastRefill;
          if (s10.tokens = Math.min(a10, s10.tokens + u10 * o10), s10.lastRefill = r11, fg.size > 2e3) for (let [e12, t12] of fg.entries()) r11 - t12.lastRefill > 6e5 && fg.delete(e12);
          return s10.tokens >= 1 && (s10.tokens -= 1, true);
        }(r10, t10)) return console.warn(`[RATE LIMIT EXCEEDED] IP: ${r10} | Path: ${t10}`), ed.json({ success: false, error: { message: "Too many requests. Please try again later.", code: "TOO_MANY_REQUESTS" } }, { status: 429 });
        let i10 = e10.cookies.get("session")?.value, n10 = ed.next();
        if (t10.startsWith("/admin") || t10.startsWith("/api/admin")) {
          if (!i10) return t10.startsWith("/api/admin") ? ed.json({ error: "Unauthorized" }, { status: 401 }) : ed.redirect(new URL(`/login?redirect=${encodeURIComponent(t10)}`, e10.url));
          let r11 = await fv(i10);
          if (!r11 || "ADMIN" !== r11.role) return t10.startsWith("/api/admin") ? ed.json({ error: "Forbidden" }, { status: 403 }) : ed.redirect(new URL("/account", e10.url));
        }
        if (t10.startsWith("/account") || t10.startsWith("/checkout")) {
          if (!i10) return ed.redirect(new URL(`/login?redirect=${encodeURIComponent(t10)}`, e10.url));
          if (!await fv(i10)) {
            let r11 = ed.redirect(new URL(`/login?redirect=${encodeURIComponent(t10)}`, e10.url));
            r11.cookies.delete("session"), n10 = r11;
          }
        }
        return n10.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://gjlwnohlruwdfbjvrfas.supabase.co https://*.stripe.com https://checkout.razorpay.com https://images.unsplash.com; connect-src 'self' https://gjlwnohlruwdfbjvrfas.supabase.co https://api.stripe.com https://api.razorpay.com https://raw.githack.com https://dl.polyhaven.org; frame-src 'self' https://js.stripe.com https://checkout.razorpay.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"), n10.headers.set("X-Frame-Options", "DENY"), n10.headers.set("X-Content-Type-Options", "nosniff"), n10.headers.set("Referrer-Policy", "strict-origin-when-cross-origin"), n10.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()"), n10.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload"), n10;
      }
      e.s(["config", 0, { matcher: ["/((?!api/webhooks|_next/static|_next/image|favicon.ico).*)"] }, "middleware", 0, fh], 96592);
      let f_ = { ...e.i(96592) }, fb = "/middleware", fy = f_.middleware || f_.default;
      if ("function" != typeof fy) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${fb}" must export a function named \`middleware\` or a default function.`);
      let f$ = (e10) => tS({ ...e10, IncrementalCache: ra, incrementalCacheHandler: null, page: fb, handler: async (...e11) => {
        try {
          return await fy(...e11);
        } catch (n10) {
          let t10 = e11[0], r10 = new URL(t10.url), i10 = r10.pathname + r10.search;
          throw await s(n10, { path: i10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), n10;
        }
      } });
      async function fx(e10, t10) {
        let r10 = await f$({ request: { url: e10.url, method: e10.method, headers: $(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: fb }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, f$, "handler", 0, fx], 58217);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0bjtjym = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js", { otherChunks: ["chunks/[root-of-the-server]__1osrt2u._.js", "chunks/node_modules_next_dist_0o2-izl._.js"], runtimeModuleIds: [35825] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = ["NEXT_DEPLOYMENT_ID", "NEXT_CLIENT_ASSET_SUFFIX"];
      var r, n = ((r = n || {})[r.Runtime = 0] = "Runtime", r[r.Parent = 1] = "Parent", r[r.Update = 2] = "Update", r);
      let o = /* @__PURE__ */ new WeakMap();
      function u(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let l = u.prototype, i = Object.prototype.hasOwnProperty, a = "u" > typeof Symbol && Symbol.toStringTag;
      function s(e2, t2, r2) {
        i.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function c(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = f(t2), e2[t2] = r2), r2;
      }
      function f(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function d(e2, t2) {
        s(e2, "__esModule", { value: true }), a && s(e2, a, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) s(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? s(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : s(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      function h(e2, t2) {
        (null != t2 ? c(this.c, t2) : this.m).exports = e2;
      }
      l.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = c(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, d(n2, e2);
      }, l.j = function(e2, t2) {
        var r2, n2;
        let u2, l2, a2;
        null != t2 ? l2 = (u2 = c(this.c, t2)).exports : (u2 = this.m, l2 = this.e);
        let s2 = (r2 = u2, n2 = l2, (a2 = o.get(r2)) || (o.set(r2, a2 = []), r2.exports = r2.namespaceObject = new Proxy(n2, { get(e3, t3) {
          if (i.call(e3, t3) || "default" === t3 || "__esModule" === t3) return Reflect.get(e3, t3);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t3);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t3 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t3.includes(r3) || t3.push(r3);
          return t3;
        } })), a2);
        "object" == typeof e2 && null !== e2 && s2.push(e2);
      }, l.v = h, l.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? c(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, m = [null, p({}), p([]), p(p)];
      function b(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !m.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), d(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function g(e2) {
        let t2 = K(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = b(r2, y(r2), r2 && r2.__esModule);
      }
      function w(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function O(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function _() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      l.i = g, l.A = function(e2) {
        return this.r(e2)(g.bind(this));
      }, l.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, l.r = function(e2) {
        return K(e2, this.m).exports;
      }, l.f = function(e2) {
        function t2(t3) {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let k = Symbol("turbopack queues"), j = Symbol("turbopack exports"), C = Symbol("turbopack error");
      function P(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      l.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = _(), a2 = Object.assign(i2, { [j]: r2.exports, [k]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } }), s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[j] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (k in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [j]: {}, [k]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[j] = e5, P(t4);
                }, (e5) => {
                  r4[C] = e5, P(t4);
                }), r4;
              }
            }
            return { [j]: e4, [k]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[C]) throw e4[C];
            return e4[j];
          }), { promise: u3, resolve: l3 } = _(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[k](a3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(a2[C] = e3) : u2(a2[j]), P(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let v = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function E(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      v.prototype = URL.prototype, l.U = v, l.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, l.g = globalThis;
      let U = u.prototype, R = /* @__PURE__ */ new Map();
      l.M = R;
      let x = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return A(e2, t2, q(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!R.has(e3) || x.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => M.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) M.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = A(e2, t2, q(n3));
            M.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = A(e2, t2, q(r2.path)), l2)) M.has(o3) || M.set(o3, n2);
        }
        for (let e3 of o2) x.has(e3) || x.set(e3, n2);
        await n2;
      }
      U.l = function(e2) {
        return $(n.Parent, this.m.id, e2);
      };
      let T = Promise.resolve(void 0), S = /* @__PURE__ */ new WeakMap();
      function A(t2, r2, o2) {
        let u2 = e.loadChunkCached(t2, o2), l2 = S.get(u2);
        if (void 0 === l2) {
          let e2 = S.set.bind(S, u2, T);
          l2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case n.Runtime:
                u3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                u3 = `from module ${r2}`;
                break;
              case n.Update:
                u3 = "from an HMR update";
                break;
              default:
                E(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let l3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw l3.name = "ChunkLoadError", l3;
          }), S.set(u2, l2);
        }
        return l2;
      }
      function q(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      U.L = function(e2) {
        return A(n.Parent, this.m.id, e2);
      }, U.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, U.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, U.q = function(e2, t2) {
        h.call(this, `${e2}`, t2);
      }, U.b = function(e2, r2, n2, o2) {
        let u2 = "SharedWorker" === e2.name, l2 = [n2.map((e3) => q(e3)).reverse(), ""];
        for (let e3 of t) l2.push(globalThis[e3]);
        let i2 = new URL(q(r2), location.origin), a2 = JSON.stringify(l2);
        return u2 ? i2.searchParams.set("params", a2) : i2.hash = "#params=" + encodeURIComponent(a2), new e2(i2, o2 ? { ...o2, type: void 0 } : void 0);
      };
      let N = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      l.w = function(t2, r2, o2) {
        return e.loadWebAssembly(n.Parent, this.m.id, t2, r2, o2);
      }, l.u = function(t2, r2) {
        return e.loadWebAssemblyModule(n.Parent, this.m.id, t2, r2);
      };
      let I = {};
      l.c = I;
      let K = (e2, t2) => {
        let r2 = I[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return L(e2, n.Parent, t2.id);
      };
      function L(e2, t2, r2) {
        let n2 = R.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              E(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let o2 = f(e2), l2 = o2.exports;
        I[e2] = o2;
        let i2 = new u(o2, l2);
        try {
          n2(i2, o2, l2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && b(o2.exports, o2.namespaceObject), o2;
      }
      function W(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let l2 = n3 ?? u2, i2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (i2 || (l2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), i2 = true), t3.set(r4, l2));
            }
            r3 = o2 + 1;
          }
        }(t2, R)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : b(n2, y(n2), true);
      }
      l.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? b(t2.default, y(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), l.x = B, e = { registerChunk(e2, t2) {
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(e2);
        F.add(r2), function(e3) {
          let t3 = D.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && X(r3.runtimeModuleIds, r3.chunkPath);
            D.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? X(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = O(e4);
            if (F.has(t4)) continue;
            n2.add(t4);
            let r4 = D.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), D.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && X(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = O(e3), N.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await z(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => z(r2, n2) };
      let F = /* @__PURE__ */ new Set(), D = /* @__PURE__ */ new Map();
      function X(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = I[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          L(t3, n.Runtime, e3);
        }(t2, r2);
      }
      async function z(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let H = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: W }, H.forEach(W);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api\\/webhooks|_next\\/static|_next\\/image|favicon.ico).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_root_of_the_server_1osrt2u();
    require_node_modules_next_dist_0o2_izl();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0bjtjym();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": true, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "C:\\Users\\dhame\\Desktop\\Cosmetic-web", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": false, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "partialFallbacks": false, "dynamicOnHover": false, "varyParams": false, "prefetchInlining": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": false, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "serverExternalPackages": ["nodemailer"], "turbopack": { "root": "C:\\Users\\dhame\\Desktop\\Cosmetic-web" }, "distDirRoot": ".next" };
var BuildId = "nlN0oQSlaL5ZW5tzVbPsW";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/account", "regex": "^/account(?:/)?$", "routeKeys": {}, "namedRegex": "^/account(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/api/admin/abandoned-carts", "regex": "^/api/admin/abandoned\\-carts(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/abandoned\\-carts(?:/)?$" }, { "page": "/api/admin/abandoned-carts/recover", "regex": "^/api/admin/abandoned\\-carts/recover(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/abandoned\\-carts/recover(?:/)?$" }, { "page": "/api/admin/orders", "regex": "^/api/admin/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/orders(?:/)?$" }, { "page": "/api/admin/products", "regex": "^/api/admin/products(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/products(?:/)?$" }, { "page": "/api/admin/upload", "regex": "^/api/admin/upload(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/upload(?:/)?$" }, { "page": "/api/all-products", "regex": "^/api/all\\-products(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/all\\-products(?:/)?$" }, { "page": "/api/auth/logout", "regex": "^/api/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/logout(?:/)?$" }, { "page": "/api/auth/otp", "regex": "^/api/auth/otp(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/otp(?:/)?$" }, { "page": "/api/auth/verify", "regex": "^/api/auth/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/verify(?:/)?$" }, { "page": "/api/cart/sync", "regex": "^/api/cart/sync(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/cart/sync(?:/)?$" }, { "page": "/api/checkout/razorpay", "regex": "^/api/checkout/razorpay(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/checkout/razorpay(?:/)?$" }, { "page": "/api/checkout/razorpay/verify", "regex": "^/api/checkout/razorpay/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/checkout/razorpay/verify(?:/)?$" }, { "page": "/api/checkout/stripe", "regex": "^/api/checkout/stripe(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/checkout/stripe(?:/)?$" }, { "page": "/api/orders", "regex": "^/api/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/orders(?:/)?$" }, { "page": "/api/promo/validate", "regex": "^/api/promo/validate(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/promo/validate(?:/)?$" }, { "page": "/api/user", "regex": "^/api/user(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/user(?:/)?$" }, { "page": "/api/webhooks/stripe", "regex": "^/api/webhooks/stripe(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/webhooks/stripe(?:/)?$" }, { "page": "/cart", "regex": "^/cart(?:/)?$", "routeKeys": {}, "namedRegex": "^/cart(?:/)?$" }, { "page": "/checkout", "regex": "^/checkout(?:/)?$", "routeKeys": {}, "namedRegex": "^/checkout(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/science", "regex": "^/science(?:/)?$", "routeKeys": {}, "namedRegex": "^/science(?:/)?$" }, { "page": "/shop", "regex": "^/shop(?:/)?$", "routeKeys": {}, "namedRegex": "^/shop(?:/)?$" }, { "page": "/us", "regex": "^/us(?:/)?$", "routeKeys": {}, "namedRegex": "^/us(?:/)?$" }], "dynamic": [{ "page": "/api/orders/[id]", "regex": "^/api/orders/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/orders/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/products/[id]", "regex": "^/api/products/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/products/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/products/[id]/reviews", "regex": "^/api/products/([^/]+?)/reviews(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/products/(?<nxtPid>[^/]+?)/reviews(?:/)?$" }, { "page": "/orders/[id]", "regex": "^/orders/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/orders/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/products/[id]", "regex": "^/products/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/products/(?<nxtPid>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/account": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/account", "dataRoute": "/account.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/cart": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/cart", "dataRoute": "/cart.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/checkout": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/checkout", "dataRoute": "/checkout.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/login": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login", "dataRoute": "/login.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/science": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/science", "dataRoute": "/science.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/shop": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/shop", "dataRoute": "/shop.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/us": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/us", "dataRoute": "/us.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "d749549ea223dfddf1ee012d12289ba3", "previewModeSigningKey": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df", "previewModeEncryptionKey": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__1osrt2u._.js", "server/edge/chunks/node_modules_next_dist_0o2-izl._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api\\/webhooks|_next\\/static|_next\\/image|favicon.ico).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/((?!api/webhooks|_next/static|_next/image|favicon.ico).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } } }, "sortedMiddleware": ["/"], "functions": { "/_not-found/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/[root-of-the-server]__10b3iea._.js", "server/edge/chunks/ssr/node_modules_0kc3szj._.js", "server/edge/chunks/ssr/_08nogs4._.js", "server/edge/chunks/ssr/src_components_1psgvx0._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1zxnqeb._.js", "server/edge/chunks/ssr/node_modules_next_dist_12nr_xk._.js", "server/edge/chunks/ssr/node_modules_next_dist_1xc97ap._.js", "server/edge/chunks/ssr/src_app_error_tsx_1mtd4et._.js", "server/edge/chunks/ssr/src_app_global-error_tsx_024d8-7._.js", "server/app/_not-found/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app__not-found_page_actions_1cceiai.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0sdtsz7._.js", "server/edge/chunks/ssr/node_modules_next_dist_059m72z._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_build_templates_edge-ssr-app_03p_74r.js", "server/edge/chunks/ssr/node_modules_next_dist_197afnr._.js", "server/edge/chunks/ssr/[root-of-the-server]__1-_32qd._.js", "server/edge/chunks/ssr/node_modules_next_dist_1h65na3._.js", "server/edge/chunks/ssr/node_modules_1c9bqj1._.js", "server/edge/chunks/ssr/[root-of-the-server]__1wdbuq1._.js", "server/edge/chunks/ssr/node_modules_next_dist_0hvoqp9._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_0czwz5q._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1aeg8y3.js", "server/app/_not-found/page/react-loadable-manifest.js"], "name": "app/_not-found/page", "page": "/_not-found/page", "entrypoint": "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1aeg8y3.js", "matchers": [{ "regexp": "^/_not-found(?:/)?$", "originalSource": "/_not-found" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/admin/abandoned-carts/recover/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/abandoned-carts/recover/route_client-reference-manifest.js", "server/edge/chunks/1oeh_server_app_api_admin_abandoned-carts_recover_route_actions_05iw1ye.js", "server/edge/chunks/[root-of-the-server]__03wt7vh._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_1e540qk.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_144h1i7.js"], "name": "app/api/admin/abandoned-carts/recover/route", "page": "/api/admin/abandoned-carts/recover/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_144h1i7.js", "matchers": [{ "regexp": "^/api/admin/abandoned-carts/recover(?:/)?$", "originalSource": "/api/admin/abandoned-carts/recover" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/admin/abandoned-carts/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/abandoned-carts/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_abandoned-carts_route_actions_0yabbfe.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/[root-of-the-server]__1vsxezp._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0_-mkpf.js"], "name": "app/api/admin/abandoned-carts/route", "page": "/api/admin/abandoned-carts/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0_-mkpf.js", "matchers": [{ "regexp": "^/api/admin/abandoned-carts(?:/)?$", "originalSource": "/api/admin/abandoned-carts" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/admin/orders/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/orders/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_orders_route_actions_010ymyj.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/[root-of-the-server]__1yq3m9k._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_11g7c39.js"], "name": "app/api/admin/orders/route", "page": "/api/admin/orders/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_11g7c39.js", "matchers": [{ "regexp": "^/api/admin/orders(?:/)?$", "originalSource": "/api/admin/orders" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/admin/products/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/products/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_products_route_actions_01tq6ik.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/[root-of-the-server]__04px19o._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0br7fm1.js"], "name": "app/api/admin/products/route", "page": "/api/admin/products/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0br7fm1.js", "matchers": [{ "regexp": "^/api/admin/products(?:/)?$", "originalSource": "/api/admin/products" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/admin/upload/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/upload/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_upload_route_actions_1-je-by.js", "server/edge/chunks/[root-of-the-server]__07ieiw2._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_20y8c8f.js"], "name": "app/api/admin/upload/route", "page": "/api/admin/upload/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_20y8c8f.js", "matchers": [{ "regexp": "^/api/admin/upload(?:/)?$", "originalSource": "/api/admin/upload" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/all-products/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/all-products/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_all-products_route_actions_201rtvj.js", "server/edge/chunks/[root-of-the-server]__1pre-po._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1k1611-.js"], "name": "app/api/all-products/route", "page": "/api/all-products/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1k1611-.js", "matchers": [{ "regexp": "^/api/all-products(?:/)?$", "originalSource": "/api/all-products" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/auth/logout/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/logout/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_logout_route_actions_06skg_j.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/[root-of-the-server]__1wnnjmt._.js", "server/edge/chunks/_1wo6ura._.js", "server/edge/chunks/node_modules_next_dist_1naer9k._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1fammy1.js"], "name": "app/api/auth/logout/route", "page": "/api/auth/logout/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1fammy1.js", "matchers": [{ "regexp": "^/api/auth/logout(?:/)?$", "originalSource": "/api/auth/logout" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/auth/otp/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/otp/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_otp_route_actions_0op5zw8.js", "server/edge/chunks/_0x366k1._.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/_1lvb6xf._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1l5l3ip.js"], "name": "app/api/auth/otp/route", "page": "/api/auth/otp/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1l5l3ip.js", "matchers": [{ "regexp": "^/api/auth/otp(?:/)?$", "originalSource": "/api/auth/otp" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/auth/verify/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/verify/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_verify_route_actions_0ku1btj.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_06cltc5._.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1i_9b4f.js"], "name": "app/api/auth/verify/route", "page": "/api/auth/verify/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1i_9b4f.js", "matchers": [{ "regexp": "^/api/auth/verify(?:/)?$", "originalSource": "/api/auth/verify" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/cart/sync/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/cart/sync/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_cart_sync_route_actions_11swoi9.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_129g313._.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/node_modules_next_dist_1naer9k._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1r_4b67.js"], "name": "app/api/cart/sync/route", "page": "/api/cart/sync/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1r_4b67.js", "matchers": [{ "regexp": "^/api/cart/sync(?:/)?$", "originalSource": "/api/cart/sync" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/checkout/razorpay/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/checkout/razorpay/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_checkout_razorpay_route_actions_1fx76n3.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_1-xff3v.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_1vqoba0.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/node_modules_next_dist_1naer9k._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_03veiwz.js"], "name": "app/api/checkout/razorpay/route", "page": "/api/checkout/razorpay/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_03veiwz.js", "matchers": [{ "regexp": "^/api/checkout/razorpay(?:/)?$", "originalSource": "/api/checkout/razorpay" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/checkout/razorpay/verify/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/checkout/razorpay/verify/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_checkout_razorpay_verify_route_actions_0ecowj6.js", "server/edge/chunks/_0dbk6hc._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_11lrfrj.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0nhi1zw.js"], "name": "app/api/checkout/razorpay/verify/route", "page": "/api/checkout/razorpay/verify/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0nhi1zw.js", "matchers": [{ "regexp": "^/api/checkout/razorpay/verify(?:/)?$", "originalSource": "/api/checkout/razorpay/verify" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/checkout/stripe/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/checkout/stripe/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_checkout_stripe_route_actions_1st884t.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_01r9zev.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/node_modules_stripe_esm_stripe_esm_worker_0-fygh7.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_0psblvd.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1cthu7f.js"], "name": "app/api/checkout/stripe/route", "page": "/api/checkout/stripe/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1cthu7f.js", "matchers": [{ "regexp": "^/api/checkout/stripe(?:/)?$", "originalSource": "/api/checkout/stripe" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/orders/[id]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/orders/[id]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_orders_[id]_route_actions_14okgfl.js", "server/edge/chunks/[root-of-the-server]__1s92hit._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0yk50ne.js"], "name": "app/api/orders/[id]/route", "page": "/api/orders/[id]/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0yk50ne.js", "matchers": [{ "regexp": "^/api/orders/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/api/orders/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/orders/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/orders/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_orders_route_actions_12bmtif.js", "server/edge/chunks/_0npuclu._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_1v6qfip.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1naer9k._.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_18k3-bx.js"], "name": "app/api/orders/route", "page": "/api/orders/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_18k3-bx.js", "matchers": [{ "regexp": "^/api/orders(?:/)?$", "originalSource": "/api/orders" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/products/[id]/reviews/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/products/[id]/reviews/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_products_[id]_reviews_route_actions_1f36-8x.js", "server/edge/chunks/[root-of-the-server]__022ffcz._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0oymd4h.js"], "name": "app/api/products/[id]/reviews/route", "page": "/api/products/[id]/reviews/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0oymd4h.js", "matchers": [{ "regexp": "^/api/products/(?P<nxtPid>[^/]+?)/reviews(?:/)?$", "originalSource": "/api/products/[id]/reviews" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/products/[id]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/products/[id]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_products_[id]_route_actions_1sn1oej.js", "server/edge/chunks/[root-of-the-server]__1yw982f._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1sq6obf.js"], "name": "app/api/products/[id]/route", "page": "/api/products/[id]/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1sq6obf.js", "matchers": [{ "regexp": "^/api/products/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/api/products/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/promo/validate/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/promo/validate/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_promo_validate_route_actions_1ke8gvy.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_0e9ieg3._.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/_1lvb6xf._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0imbmh4.js"], "name": "app/api/promo/validate/route", "page": "/api/promo/validate/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0imbmh4.js", "matchers": [{ "regexp": "^/api/promo/validate(?:/)?$", "originalSource": "/api/promo/validate" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/user/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/user/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_user_route_actions_19-s-bs.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0osf28w.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_0g442yk.js", "server/edge/chunks/[root-of-the-server]__044zjrb._.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/_182ch3w._.js", "server/edge/chunks/node_modules_next_dist_1naer9k._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_019zg5e.js"], "name": "app/api/user/route", "page": "/api/user/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_019zg5e.js", "matchers": [{ "regexp": "^/api/user(?:/)?$", "originalSource": "/api/user" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/api/webhooks/stripe/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/webhooks/stripe/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_webhooks_stripe_route_actions_0v2sqat.js", "server/edge/chunks/[root-of-the-server]__0-1-ww9._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_06kf30f.js", "server/edge/chunks/_1dp7979._.js", "server/edge/chunks/node_modules_next_dist_1fa0zci._.js", "server/edge/chunks/node_modules_stripe_esm_stripe_esm_worker_0-fygh7.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1uxgfjm.js"], "name": "app/api/webhooks/stripe/route", "page": "/api/webhooks/stripe/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1uxgfjm.js", "matchers": [{ "regexp": "^/api/webhooks/stripe(?:/)?$", "originalSource": "/api/webhooks/stripe" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/orders/[id]/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/[root-of-the-server]__10b3iea._.js", "server/edge/chunks/ssr/node_modules_0kc3szj._.js", "server/edge/chunks/ssr/_08nogs4._.js", "server/edge/chunks/ssr/src_components_1psgvx0._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1zxnqeb._.js", "server/edge/chunks/ssr/node_modules_next_dist_12nr_xk._.js", "server/edge/chunks/ssr/node_modules_next_dist_1xc97ap._.js", "server/edge/chunks/ssr/src_app_error_tsx_1mtd4et._.js", "server/edge/chunks/ssr/src_app_global-error_tsx_024d8-7._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0rjxe4p._.js", "server/edge/chunks/ssr/_1e0ha_9._.js", "server/edge/chunks/ssr/src_app_orders_[id]_page_tsx_0n_g4z9._.js", "server/app/orders/[id]/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app_orders_[id]_page_actions_1pkv9-w.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0sdtsz7._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_build_templates_edge-ssr-app_04ebzch.js", "server/edge/chunks/ssr/node_modules_next_dist_059m72z._.js", "server/edge/chunks/ssr/node_modules_1c9bqj1._.js", "server/edge/chunks/ssr/[root-of-the-server]__0urntkc._.js", "server/edge/chunks/ssr/[root-of-the-server]__1wdbuq1._.js", "server/edge/chunks/ssr/node_modules_next_dist_0hvoqp9._.js", "server/edge/chunks/ssr/node_modules_next_dist_1h65na3._.js", "server/edge/chunks/ssr/node_modules_next_dist_197afnr._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_0czwz5q._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0awunc3.js", "server/app/orders/[id]/page/react-loadable-manifest.js"], "name": "app/orders/[id]/page", "page": "/orders/[id]/page", "entrypoint": "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0awunc3.js", "matchers": [{ "regexp": "^/orders/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/orders/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } }, "/products/[id]/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/[root-of-the-server]__10b3iea._.js", "server/edge/chunks/ssr/node_modules_0kc3szj._.js", "server/edge/chunks/ssr/_08nogs4._.js", "server/edge/chunks/ssr/src_components_1psgvx0._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1zxnqeb._.js", "server/edge/chunks/ssr/node_modules_next_dist_12nr_xk._.js", "server/edge/chunks/ssr/node_modules_next_dist_1xc97ap._.js", "server/edge/chunks/ssr/src_app_error_tsx_1mtd4et._.js", "server/edge/chunks/ssr/src_app_global-error_tsx_024d8-7._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0rjxe4p._.js", "server/edge/chunks/ssr/_0ll7sm_._.js", "server/edge/chunks/ssr/src_app_products_[id]_ProductDetailClient_tsx_1yoaut7._.js", "server/app/products/[id]/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app_products_[id]_page_actions_1m0z4ia.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0sdtsz7._.js", "server/edge/chunks/ssr/node_modules_next_dist_059m72z._.js", "server/edge/chunks/ssr/node_modules_1c9bqj1._.js", "server/edge/chunks/ssr/node_modules_next_dist_0hvoqp9._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_build_templates_edge-ssr-app_0w1p2oq.js", "server/edge/chunks/ssr/node_modules_next_dist_197afnr._.js", "server/edge/chunks/ssr/node_modules_next_dist_1h65na3._.js", "server/edge/chunks/ssr/_0sx15j_._.js", "server/edge/chunks/ssr/[root-of-the-server]__1wdbuq1._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_0czwz5q._.js", "server/edge/chunks/ssr/[root-of-the-server]__1f8qdeu._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1i24dm3.js", "server/app/products/[id]/page/react-loadable-manifest.js"], "name": "app/products/[id]/page", "page": "/products/[id]/page", "entrypoint": "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1i24dm3.js", "matchers": [{ "regexp": "^/products/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/products/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "nlN0oQSlaL5ZW5tzVbPsW", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "g5WC9XL8dLNxajWbX4V8RIi6K27hNh49rDQam/1R/ak=", "__NEXT_PREVIEW_MODE_ID": "d749549ea223dfddf1ee012d12289ba3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0103a355f11e773c94cd4ce3009f2a1f3c081adc72b4c7eb2acf632c13f6e799", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a82d6207434921e4eba945e042c128cd7e67809f0af0769894e8fa154c2980df" } } } };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/account/page": "/account", "/admin/page": "/admin", "/api/admin/abandoned-carts/recover/route": "/api/admin/abandoned-carts/recover", "/api/admin/abandoned-carts/route": "/api/admin/abandoned-carts", "/api/admin/orders/route": "/api/admin/orders", "/api/admin/products/route": "/api/admin/products", "/api/admin/upload/route": "/api/admin/upload", "/api/all-products/route": "/api/all-products", "/api/auth/logout/route": "/api/auth/logout", "/api/auth/otp/route": "/api/auth/otp", "/api/auth/verify/route": "/api/auth/verify", "/api/cart/sync/route": "/api/cart/sync", "/api/checkout/razorpay/route": "/api/checkout/razorpay", "/api/checkout/razorpay/verify/route": "/api/checkout/razorpay/verify", "/api/checkout/stripe/route": "/api/checkout/stripe", "/api/orders/[id]/route": "/api/orders/[id]", "/api/orders/route": "/api/orders", "/api/products/[id]/reviews/route": "/api/products/[id]/reviews", "/api/products/[id]/route": "/api/products/[id]", "/api/promo/validate/route": "/api/promo/validate", "/api/user/route": "/api/user", "/api/webhooks/stripe/route": "/api/webhooks/stripe", "/cart/page": "/cart", "/checkout/page": "/checkout", "/favicon.ico/route": "/favicon.ico", "/login/page": "/login", "/orders/[id]/page": "/orders/[id]", "/page": "/", "/products/[id]/page": "/products/[id]", "/science/page": "/science", "/shop/page": "/shop", "/us/page": "/us" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/admin/abandoned-carts": {}, "/api/admin/abandoned-carts/recover": {}, "/api/admin/orders": {}, "/api/admin/products": {}, "/api/admin/upload": {}, "/api/all-products": {}, "/api/auth/logout": {}, "/api/auth/otp": {}, "/api/auth/verify": {}, "/api/cart/sync": {}, "/api/checkout/razorpay": {}, "/api/checkout/razorpay/verify": {}, "/api/checkout/stripe": {}, "/api/orders": {}, "/api/orders/[id]": {}, "/api/products/[id]": {}, "/api/products/[id]/reviews": {}, "/api/promo/validate": {}, "/api/user": {}, "/api/webhooks/stripe": {}, "/orders/[id]": {}, "/products/[id]": {} } };
var PagesManifest = { "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/@opennextjs/aws/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
