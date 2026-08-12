import {
  IconDirective
} from "./chunk-ULNZEEHZ.js";
import {
  MessageComponent,
  MessageModule,
  MessageService,
  takeUntilDestroyed
} from "./chunk-HJ33OLO5.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-VBAZ7EWY.js";
import {
  CommonModule,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-BIUBNZ56.js";
import {
  MODULE_NAME
} from "./chunk-XZ5YRCND.js";
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver$1,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
  Subject,
  TemplateRef,
  ViewContainerRef,
  __decorate,
  __metadata,
  animationFrameScheduler,
  effect,
  fromEvent,
  inject,
  isDevMode,
  merge,
  model,
  of,
  setClassMetadata,
  timer,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor
} from "./chunk-WMAE3CWV.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/@angular/cdk/fesm2022/clipboard.mjs
var PendingCopy = class {
  _document;
  _textarea;
  constructor(text, _document) {
    this._document = _document;
    const textarea = this._textarea = this._document.createElement("textarea");
    const styles = textarea.style;
    styles.position = "fixed";
    styles.top = styles.opacity = "0";
    styles.left = "-999em";
    textarea.setAttribute("aria-hidden", "true");
    textarea.value = text;
    textarea.readOnly = true;
    (this._document.fullscreenElement || this._document.body).appendChild(textarea);
  }
  /** Finishes copying the text. */
  copy() {
    const textarea = this._textarea;
    let successful = false;
    try {
      if (textarea) {
        const currentFocus = this._document.activeElement;
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        successful = this._document.execCommand("copy");
        if (currentFocus) {
          currentFocus.focus();
        }
      }
    } catch {
    }
    return successful;
  }
  /** Cleans up DOM changes used to perform the copy operation. */
  destroy() {
    const textarea = this._textarea;
    if (textarea) {
      textarea.remove();
      this._textarea = void 0;
    }
  }
};
var Clipboard = class _Clipboard {
  _document = inject(DOCUMENT);
  constructor() {
  }
  /**
   * Copies the provided text into the user's clipboard.
   *
   * @param text The string to copy.
   * @returns Whether the operation was successful.
   */
  copy(text) {
    const pendingCopy = this.beginCopy(text);
    const successful = pendingCopy.copy();
    pendingCopy.destroy();
    return successful;
  }
  /**
   * Prepares a string to be copied later. This is useful for large strings
   * which take too long to successfully render and be copied in the same tick.
   *
   * The caller must call `destroy` on the returned `PendingCopy`.
   *
   * @param text The string to copy.
   * @returns the pending copy operation.
   */
  beginCopy(text) {
    return new PendingCopy(text, this._document);
  }
  static ɵfac = function Clipboard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Clipboard)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _Clipboard,
    factory: _Clipboard.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Clipboard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CDK_COPY_TO_CLIPBOARD_CONFIG = new InjectionToken("CDK_COPY_TO_CLIPBOARD_CONFIG");
var CdkCopyToClipboard = class _CdkCopyToClipboard {
  _clipboard = inject(Clipboard);
  _ngZone = inject(NgZone);
  /** Content to be copied. */
  text = "";
  /**
   * How many times to attempt to copy the text. This may be necessary for longer text, because
   * the browser needs time to fill an intermediate textarea element and copy the content.
   */
  attempts = 1;
  /**
   * Emits when some text is copied to the clipboard. The
   * emitted value indicates whether copying was successful.
   */
  copied = new EventEmitter();
  /** Copies that are currently being attempted. */
  _pending = /* @__PURE__ */ new Set();
  /** Whether the directive has been destroyed. */
  _destroyed;
  /** Timeout for the current copy attempt. */
  _currentTimeout;
  constructor() {
    const config = inject(CDK_COPY_TO_CLIPBOARD_CONFIG, {
      optional: true
    });
    if (config && config.attempts != null) {
      this.attempts = config.attempts;
    }
  }
  /** Copies the current text to the clipboard. */
  copy(attempts = this.attempts) {
    if (attempts > 1) {
      let remainingAttempts = attempts;
      const pending = this._clipboard.beginCopy(this.text);
      this._pending.add(pending);
      const attempt = () => {
        const successful = pending.copy();
        if (!successful && --remainingAttempts && !this._destroyed) {
          this._currentTimeout = this._ngZone.runOutsideAngular(() => setTimeout(attempt, 1));
        } else {
          this._currentTimeout = null;
          this._pending.delete(pending);
          pending.destroy();
          this.copied.emit(successful);
        }
      };
      attempt();
    } else {
      this.copied.emit(this._clipboard.copy(this.text));
    }
  }
  ngOnDestroy() {
    if (this._currentTimeout) {
      clearTimeout(this._currentTimeout);
    }
    this._pending.forEach((copy) => copy.destroy());
    this._pending.clear();
    this._destroyed = true;
  }
  static ɵfac = function CdkCopyToClipboard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkCopyToClipboard)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkCopyToClipboard,
    selectors: [["", "cdkCopyToClipboard", ""]],
    hostBindings: function CdkCopyToClipboard_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function CdkCopyToClipboard_click_HostBindingHandler() {
          return ctx.copy();
        });
      }
    },
    inputs: {
      text: [0, "cdkCopyToClipboard", "text"],
      attempts: [0, "cdkCopyToClipboardAttempts", "attempts"]
    },
    outputs: {
      copied: "cdkCopyToClipboardCopied"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkCopyToClipboard, [{
    type: Directive,
    args: [{
      selector: "[cdkCopyToClipboard]",
      host: {
        "(click)": "copy()"
      }
    }]
  }], () => [], {
    text: [{
      type: Input,
      args: ["cdkCopyToClipboard"]
    }],
    attempts: [{
      type: Input,
      args: ["cdkCopyToClipboardAttempts"]
    }],
    copied: [{
      type: Output,
      args: ["cdkCopyToClipboardCopied"]
    }]
  });
})();
var ClipboardModule = class _ClipboardModule {
  static ɵfac = function ClipboardModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClipboardModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ClipboardModule,
    imports: [CdkCopyToClipboard],
    exports: [CdkCopyToClipboard]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClipboardModule, [{
    type: NgModule,
    args: [{
      imports: [CdkCopyToClipboard],
      exports: [CdkCopyToClipboard]
    }]
  }], null, null);
})();

// node_modules/ngx-bootstrap/utils/fesm2022/ngx-bootstrap-utils.mjs
var Trigger = class {
  constructor(open, close) {
    this.open = open;
    this.close = close || open;
  }
  isManual() {
    return this.open === "manual" || this.close === "manual";
  }
};
var DEFAULT_ALIASES = {
  hover: ["mouseover", "mouseout"],
  focus: ["focusin", "focusout"]
};
function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
  const trimmedTriggers = (triggers || "").trim();
  if (trimmedTriggers.length === 0) {
    return [];
  }
  const parsedTriggers = trimmedTriggers.split(/\s+/).map((trigger) => trigger.split(":")).map((triggerPair) => {
    const alias = aliases[triggerPair[0]] || triggerPair;
    return new Trigger(alias[0], alias[1]);
  });
  const manualTriggers = parsedTriggers.filter((triggerPair) => triggerPair.isManual());
  if (manualTriggers.length > 1) {
    throw new Error("Triggers parse error: only one manual trigger is allowed");
  }
  if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
    throw new Error("Triggers parse error: manual trigger can't be mixed with other triggers");
  }
  return parsedTriggers;
}
function listenToTriggersV2(renderer, options) {
  const parsedTriggers = parseTriggers(options.triggers);
  const target = options.target;
  if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
    return Function.prototype;
  }
  const listeners = [];
  const _registerHide = [];
  const registerHide = () => {
    _registerHide.forEach((fn) => listeners.push(fn()));
    _registerHide.length = 0;
  };
  parsedTriggers.forEach((trigger) => {
    const useToggle = trigger.open === trigger.close;
    const showFn = useToggle ? options.toggle : options.show;
    if (!useToggle && trigger.close && options.hide) {
      const triggerClose = trigger.close;
      const optionsHide = options.hide;
      const _hide = () => renderer.listen(target, triggerClose, optionsHide);
      _registerHide.push(_hide);
    }
    if (showFn) {
      listeners.push(renderer.listen(target, trigger.open, () => showFn(registerHide)));
    }
  });
  return () => {
    listeners.forEach((unsubscribeFn) => unsubscribeFn());
  };
}
function registerOutsideClick(renderer, options) {
  if (!options.outsideClick) {
    return Function.prototype;
  }
  return renderer.listen("document", "click", (event) => {
    if (options.target && options.target.contains(event.target)) {
      return;
    }
    if (options.targets && options.targets.some((target) => target.contains(event.target))) {
      return;
    }
    if (options.hide) {
      options.hide();
    }
  });
}
function registerEscClick(renderer, options) {
  if (!options.outsideEsc) {
    return Function.prototype;
  }
  return renderer.listen("document", "keyup.esc", (event) => {
    if (options.target && options.target.contains(event.target)) {
      return;
    }
    if (options.targets && options.targets.some((target) => target.contains(event.target))) {
      return;
    }
    if (options.hide) {
      options.hide();
    }
  });
}
var win = typeof window !== "undefined" && window || {};
var document2 = win.document;
var location = win.location;
var gc = win.gc ? () => win.gc() : () => null;
var performance = win.performance ? win.performance : null;
var Event = win.Event;
var MouseEvent = win.MouseEvent;
var KeyboardEvent = win.KeyboardEvent;
var EventTarget = win.EventTarget;
var History = win.History;
var Location = win.Location;
var EventListener = win.EventListener;
var BsVerions;
(function(BsVerions2) {
  BsVerions2["isBs4"] = "bs4";
  BsVerions2["isBs5"] = "bs5";
})(BsVerions || (BsVerions = {}));
var guessedVersion;
function _guessBsVersion() {
  const spanEl = win.document.createElement("span");
  spanEl.innerText = "testing bs version";
  spanEl.classList.add("d-none");
  spanEl.classList.add("pl-1");
  win.document.head.appendChild(spanEl);
  const checkPadding = win.getComputedStyle(spanEl).paddingLeft;
  if (checkPadding && parseFloat(checkPadding)) {
    win.document.head.removeChild(spanEl);
    return "bs4";
  }
  win.document.head.removeChild(spanEl);
  return "bs5";
}
function isBs4() {
  if (guessedVersion)
    return guessedVersion === "bs4";
  guessedVersion = _guessBsVersion();
  return guessedVersion === "bs4";
}
function isBs5() {
  if (guessedVersion)
    return guessedVersion === "bs5";
  guessedVersion = _guessBsVersion();
  return guessedVersion === "bs5";
}
function getBsVer() {
  return {
    isBs4: isBs4(),
    isBs5: isBs5()
  };
}
function OnChange() {
  const sufix = "Change";
  return function OnChangeHandler(target, propertyKey) {
    const _key = ` __${propertyKey}Value`;
    Object.defineProperty(target, propertyKey, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get() {
        return this[_key];
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(value) {
        const prevValue = this[_key];
        this[_key] = value;
        if (prevValue !== value && this[propertyKey + sufix]) {
          this[propertyKey + sufix].emit(value);
        }
      }
    });
  };
}
var _messagesHash = {};
var _hideMsg = typeof console === "undefined" || !("warn" in console);
function warnOnce(msg) {
  if (!isDevMode() || _hideMsg || msg in _messagesHash) {
    return;
  }
  _messagesHash[msg] = true;
  console.warn(msg);
}

// node_modules/ngx-bootstrap/positioning/fesm2022/ngx-bootstrap-positioning.mjs
var MapPlacementInToRL;
(function(MapPlacementInToRL2) {
  MapPlacementInToRL2["top"] = "top";
  MapPlacementInToRL2["bottom"] = "bottom";
  MapPlacementInToRL2["left"] = "left";
  MapPlacementInToRL2["right"] = "right";
  MapPlacementInToRL2["auto"] = "auto";
  MapPlacementInToRL2["end"] = "right";
  MapPlacementInToRL2["start"] = "left";
  MapPlacementInToRL2["top left"] = "top left";
  MapPlacementInToRL2["top right"] = "top right";
  MapPlacementInToRL2["right top"] = "right top";
  MapPlacementInToRL2["right bottom"] = "right bottom";
  MapPlacementInToRL2["bottom right"] = "bottom right";
  MapPlacementInToRL2["bottom left"] = "bottom left";
  MapPlacementInToRL2["left bottom"] = "left bottom";
  MapPlacementInToRL2["left top"] = "left top";
  MapPlacementInToRL2["top start"] = "top left";
  MapPlacementInToRL2["top end"] = "top right";
  MapPlacementInToRL2["end top"] = "right top";
  MapPlacementInToRL2["end bottom"] = "right bottom";
  MapPlacementInToRL2["bottom end"] = "bottom right";
  MapPlacementInToRL2["bottom start"] = "bottom left";
  MapPlacementInToRL2["start bottom"] = "start bottom";
  MapPlacementInToRL2["start top"] = "left top";
})(MapPlacementInToRL || (MapPlacementInToRL = {}));
var PlacementForBs5;
(function(PlacementForBs52) {
  PlacementForBs52["top"] = "top";
  PlacementForBs52["bottom"] = "bottom";
  PlacementForBs52["left"] = "start";
  PlacementForBs52["right"] = "end";
  PlacementForBs52["auto"] = "auto";
  PlacementForBs52["end"] = "end";
  PlacementForBs52["start"] = "start";
  PlacementForBs52["top left"] = "top start";
  PlacementForBs52["top right"] = "top end";
  PlacementForBs52["right top"] = "end top";
  PlacementForBs52["right bottom"] = "end bottom";
  PlacementForBs52["bottom right"] = "bottom end";
  PlacementForBs52["bottom left"] = "bottom start";
  PlacementForBs52["left bottom"] = "start bottom";
  PlacementForBs52["left top"] = "start top";
  PlacementForBs52["top start"] = "top start";
  PlacementForBs52["top end"] = "top end";
  PlacementForBs52["end top"] = "end top";
  PlacementForBs52["end bottom"] = "end bottom";
  PlacementForBs52["bottom end"] = "bottom end";
  PlacementForBs52["bottom start"] = "bottom start";
  PlacementForBs52["start bottom"] = "start bottom";
  PlacementForBs52["start top"] = "start top";
})(PlacementForBs5 || (PlacementForBs5 = {}));
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  const window2 = element.ownerDocument.defaultView;
  const css = window2?.getComputedStyle(element, null);
  return property ? css && css[property] : css;
}
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }
  const noOffsetParent = null;
  let offsetParent = element?.offsetParent;
  let sibling = void 0;
  while (offsetParent === noOffsetParent && element.nextElementSibling && sibling !== element.nextElementSibling) {
    sibling = element.nextElementSibling;
    offsetParent = sibling.offsetParent;
  }
  const nodeName = offsetParent && offsetParent.nodeName;
  if (!nodeName || nodeName === "BODY" || nodeName === "HTML") {
    return sibling ? sibling.ownerDocument.documentElement : document.documentElement;
  }
  if (offsetParent && ["TH", "TD", "TABLE"].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, "position") === "static") {
    return getOffsetParent(offsetParent);
  }
  return offsetParent;
}
function isOffsetContainer(element) {
  const {
    nodeName
  } = element;
  if (nodeName === "BODY") {
    return false;
  }
  return nodeName === "HTML" || getOffsetParent(element.firstElementChild) === element;
}
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }
  return node;
}
function findCommonOffsetParent(element1, element2) {
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }
  const order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  const start = order ? element1 : element2;
  const end = order ? element2 : element1;
  const range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  const commonAncestorContainer = range.commonAncestorContainer;
  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }
    return getOffsetParent(commonAncestorContainer);
  }
  const element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
function getFixedPositionOffsetParent(element) {
  if (!element || !element.parentElement) {
    return document.documentElement;
  }
  let el = element.parentElement;
  while (el?.parentElement && getStyleComputedProperty(el, "transform") === "none") {
    el = el.parentElement;
  }
  return el || document.documentElement;
}
function getBordersSize(styles, axis) {
  const sideA = axis === "x" ? "Left" : "Top";
  const sideB = sideA === "Left" ? "Right" : "Bottom";
  return parseFloat(styles[`border${sideA}Width`]) + parseFloat(styles[`border${sideB}Width`]);
}
function getSize(axis, body, html) {
  const _body = body;
  const _html = html;
  return Math.max(_body[`offset${axis}`], _body[`scroll${axis}`], _html[`client${axis}`], _html[`offset${axis}`], _html[`scroll${axis}`], 0);
}
function getWindowSizes(document3) {
  const body = document3.body;
  const html = document3.documentElement;
  return {
    height: getSize("Height", body, html),
    width: getSize("Width", body, html)
  };
}
function getClientRect(offsets) {
  return __spreadProps(__spreadValues({}, offsets), {
    right: (offsets.left || 0) + offsets.width,
    bottom: (offsets.top || 0) + offsets.height
  });
}
function isNumeric(n) {
  return n !== "" && !isNaN(parseFloat(n)) && isFinite(Number(n));
}
function isNumber(value) {
  return typeof value === "number" || Object.prototype.toString.call(value) === "[object Number]";
}
function getBoundingClientRect(element) {
  const rect = element.getBoundingClientRect();
  if (!(rect && isNumber(rect.top) && isNumber(rect.left) && isNumber(rect.bottom) && isNumber(rect.right))) {
    return rect;
  }
  const result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
  const sizes = element.nodeName === "HTML" ? getWindowSizes(element.ownerDocument) : void 0;
  const width = sizes?.width || element.clientWidth || isNumber(rect.right) && isNumber(result.left) && rect.right - result.left || 0;
  const height = sizes?.height || element.clientHeight || isNumber(rect.bottom) && isNumber(result.top) && rect.bottom - result.top || 0;
  let horizScrollbar = element.offsetWidth - width;
  let vertScrollbar = element.offsetHeight - height;
  if (horizScrollbar || vertScrollbar) {
    const styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, "x");
    vertScrollbar -= getBordersSize(styles, "y");
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }
  return getClientRect(result);
}
function getOffsetRectRelativeToArbitraryNode(children, parent, fixedPosition = false) {
  const isHTML = parent.nodeName === "HTML";
  const childrenRect = getBoundingClientRect(children);
  const parentRect = getBoundingClientRect(parent);
  const styles = getStyleComputedProperty(parent);
  const borderTopWidth = parseFloat(styles.borderTopWidth);
  const borderLeftWidth = parseFloat(styles.borderLeftWidth);
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top ?? 0, 0);
    parentRect.left = Math.max(parentRect.left ?? 0, 0);
  }
  const offsets = getClientRect({
    top: (childrenRect.top ?? 0) - (parentRect.top ?? 0) - borderTopWidth,
    left: (childrenRect.left ?? 0) - (parentRect.left ?? 0) - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;
  if (isHTML) {
    const marginTop = parseFloat(styles.marginTop);
    const marginLeft = parseFloat(styles.marginLeft);
    if (isNumber(offsets.top)) {
      offsets.top -= borderTopWidth - marginTop;
    }
    if (isNumber(offsets.bottom)) {
      offsets.bottom -= borderTopWidth - marginTop;
    }
    if (isNumber(offsets.left)) {
      offsets.left -= borderLeftWidth - marginLeft;
    }
    if (isNumber(offsets.right)) {
      offsets.right -= borderLeftWidth - marginLeft;
    }
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }
  return offsets;
}
function getParentNode(element) {
  if (element.nodeName === "HTML") {
    return element;
  }
  return element.parentNode || element.host;
}
function getScrollParent(element) {
  if (!element) {
    return document.body;
  }
  switch (element.nodeName) {
    case "HTML":
    case "BODY":
      return element.ownerDocument.body;
    case "#document":
      return element.body;
    default:
  }
  const {
    overflow,
    overflowX,
    overflowY
  } = getStyleComputedProperty(element);
  if (/(auto|scroll|overlay)/.test(String(overflow) + String(overflowY) + String(overflowX))) {
    return element;
  }
  return getScrollParent(getParentNode(element));
}
function getScroll(element, side = "top") {
  const upperSide = side === "top" ? "scrollTop" : "scrollLeft";
  const nodeName = element.nodeName;
  if (nodeName === "BODY" || nodeName === "HTML") {
    const html = element.ownerDocument.documentElement;
    const scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }
  return element[upperSide];
}
function getViewportOffsetRectRelativeToArtbitraryNode(element, excludeScroll = false) {
  const html = element.ownerDocument.documentElement;
  const relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  const width = Math.max(html.clientWidth, window.innerWidth || 0);
  const height = Math.max(html.clientHeight, window.innerHeight || 0);
  const scrollTop = !excludeScroll ? getScroll(html) : 0;
  const scrollLeft = !excludeScroll ? getScroll(html, "left") : 0;
  const offset = {
    top: scrollTop - Number(relativeOffset?.top) + Number(relativeOffset?.marginTop),
    left: scrollLeft - Number(relativeOffset?.left) + Number(relativeOffset?.marginLeft),
    width,
    height
  };
  return getClientRect(offset);
}
function isFixed(element) {
  const nodeName = element.nodeName;
  if (nodeName === "BODY" || nodeName === "HTML") {
    return false;
  }
  if (getStyleComputedProperty(element, "position") === "fixed") {
    return true;
  }
  return isFixed(getParentNode(element));
}
function getBoundaries(target, host, padding = 0, boundariesElement, fixedPosition = false) {
  let boundaries = {
    top: 0,
    left: 0
  };
  const offsetParent = fixedPosition ? getFixedPositionOffsetParent(target) : findCommonOffsetParent(target, host);
  if (boundariesElement === "viewport") {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    let boundariesNode;
    if (boundariesElement === "scrollParent") {
      boundariesNode = getScrollParent(getParentNode(host));
      if (boundariesNode.nodeName === "BODY") {
        boundariesNode = target.ownerDocument.documentElement;
      }
    } else if (boundariesElement === "window") {
      boundariesNode = target.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }
    const offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);
    if (offsets && boundariesNode.nodeName === "HTML" && !isFixed(offsetParent)) {
      const {
        height,
        width
      } = getWindowSizes(target.ownerDocument);
      if (isNumber(boundaries.top) && isNumber(offsets.top) && isNumber(offsets.marginTop)) {
        boundaries.top += offsets.top - offsets.marginTop;
      }
      if (isNumber(boundaries.top)) {
        boundaries.bottom = Number(height) + Number(offsets.top);
      }
      if (isNumber(boundaries.left) && isNumber(offsets.left) && isNumber(offsets.marginLeft)) {
        boundaries.left += offsets.left - offsets.marginLeft;
      }
      if (isNumber(boundaries.top)) {
        boundaries.right = Number(width) + Number(offsets.left);
      }
    } else if (offsets) {
      boundaries = offsets;
    }
  }
  if (isNumber(boundaries.left)) {
    boundaries.left += padding;
  }
  if (isNumber(boundaries.top)) {
    boundaries.top += padding;
  }
  if (isNumber(boundaries.right)) {
    boundaries.right -= padding;
  }
  if (isNumber(boundaries.bottom)) {
    boundaries.bottom -= padding;
  }
  return boundaries;
}
function getArea({
  width,
  height
}) {
  return width * height;
}
function computeAutoPlacement(placement, refRect, target, host, allowedPositions = ["top", "bottom", "right", "left"], boundariesElement = "viewport", padding = 0) {
  if (placement.indexOf("auto") === -1) {
    return placement;
  }
  const boundaries = getBoundaries(target, host, padding, boundariesElement);
  const rects = {
    top: {
      width: boundaries?.width ?? 0,
      height: (refRect?.top ?? 0) - (boundaries?.top ?? 0)
    },
    right: {
      width: (boundaries?.right ?? 0) - (refRect?.right ?? 0),
      height: boundaries?.height ?? 0
    },
    bottom: {
      width: boundaries?.width ?? 0,
      height: (boundaries?.bottom ?? 0) - (refRect?.bottom ?? 0)
    },
    left: {
      width: (refRect.left ?? 0) - (boundaries?.left ?? 0),
      height: boundaries?.height ?? 0
    }
  };
  const sortedAreas = Object.keys(rects).map((key) => __spreadProps(__spreadValues({
    position: key
  }, rects[key]), {
    area: getArea(rects[key])
  })).sort((a, b) => b.area - a.area);
  let filteredAreas = sortedAreas.filter(({
    width,
    height
  }) => {
    return width >= target.clientWidth && height >= target.clientHeight;
  });
  filteredAreas = filteredAreas.filter(({
    position
  }) => {
    return allowedPositions.some((allowedPosition) => {
      return allowedPosition === position;
    });
  });
  const computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].position : sortedAreas[0].position;
  const variation = placement.split(" ")[1];
  target.className = target.className.replace(/bs-tooltip-auto/g, `bs-tooltip-${getBsVer().isBs5 ? PlacementForBs5[computedPlacement] : computedPlacement}`);
  return computedPlacement + (variation ? `-${variation}` : "");
}
function getOffsets(data) {
  return {
    width: data.offsets.target.width,
    height: data.offsets.target.height,
    left: Math.floor(data.offsets.target.left ?? 0),
    top: Math.round(data.offsets.target.top ?? 0),
    bottom: Math.round(data.offsets.target.bottom ?? 0),
    right: Math.floor(data.offsets.target.right ?? 0)
  };
}
function getOppositePlacement(placement) {
  const hash = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  return placement.replace(/left|right|bottom|top/g, (matched) => hash[matched]);
}
function getOppositeVariation(variation) {
  if (variation === "right") {
    return "left";
  } else if (variation === "left") {
    return "right";
  }
  return variation;
}
var parse = (value, def = 0) => value ? parseFloat(value) : def;
function getOuterSizes(element) {
  const window2 = element.ownerDocument.defaultView;
  const styles = window2?.getComputedStyle(element);
  const x = parse(styles?.marginTop) + parse(styles?.marginBottom);
  const y = parse(styles?.marginLeft) + parse(styles?.marginRight);
  return {
    width: Number(element.offsetWidth) + y,
    height: Number(element.offsetHeight) + x
  };
}
function getReferenceOffsets(target, host, fixedPosition) {
  const commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(target) : findCommonOffsetParent(target, host);
  return getOffsetRectRelativeToArbitraryNode(host, commonOffsetParent, fixedPosition);
}
function getTargetOffsets(target, hostOffsets, position) {
  const placement = position.split(" ")[0];
  const targetRect = getOuterSizes(target);
  const targetOffsets = {
    width: targetRect.width,
    height: targetRect.height
  };
  const isHoriz = ["right", "left"].indexOf(placement) !== -1;
  const mainSide = isHoriz ? "top" : "left";
  const secondarySide = isHoriz ? "left" : "top";
  const measurement = isHoriz ? "height" : "width";
  const secondaryMeasurement = !isHoriz ? "height" : "width";
  targetOffsets[mainSide] = (hostOffsets[mainSide] ?? 0) + hostOffsets[measurement] / 2 - targetRect[measurement] / 2;
  targetOffsets[secondarySide] = placement === secondarySide ? (hostOffsets[secondarySide] ?? 0) - targetRect[secondaryMeasurement] : hostOffsets[getOppositePlacement(secondarySide)] ?? 0;
  return targetOffsets;
}
function isModifierEnabled(options, modifierName) {
  return !!options.modifiers[modifierName]?.enabled;
}
var availablePositions = {
  top: ["top", "top start", "top end"],
  bottom: ["bottom", "bottom start", "bottom end"],
  start: ["start", "start top", "start bottom"],
  end: ["end", "end top", "end bottom"]
};
function checkPopoverMargin(placement, checkPosition) {
  if (!getBsVer().isBs5) {
    return false;
  }
  return availablePositions[checkPosition].includes(placement);
}
function checkMargins(placement) {
  if (!getBsVer().isBs5) {
    return "";
  }
  if (checkPopoverMargin(placement, "end")) {
    return "ms-2";
  }
  if (checkPopoverMargin(placement, "start")) {
    return "me-2";
  }
  if (checkPopoverMargin(placement, "top")) {
    return "mb-2";
  }
  if (checkPopoverMargin(placement, "bottom")) {
    return "mt-2";
  }
  return "";
}
function updateContainerClass(data, renderer) {
  const target = data.instance.target;
  let containerClass = target.className;
  const dataPlacement = getBsVer().isBs5 ? PlacementForBs5[data.placement] : data.placement;
  if (data.placementAuto) {
    containerClass = containerClass.replace(/bs-popover-auto/g, `bs-popover-${dataPlacement}`);
    containerClass = containerClass.replace(/ms-2|me-2|mb-2|mt-2/g, "");
    containerClass = containerClass.replace(/bs-tooltip-auto/g, `bs-tooltip-${dataPlacement}`);
    containerClass = containerClass.replace(/\sauto/g, ` ${dataPlacement}`);
    if (containerClass.indexOf("popover") !== -1) {
      containerClass = containerClass + " " + checkMargins(dataPlacement);
    }
    if (containerClass.indexOf("popover") !== -1 && containerClass.indexOf("popover-auto") === -1) {
      containerClass += " popover-auto";
    }
    if (containerClass.indexOf("tooltip") !== -1 && containerClass.indexOf("tooltip-auto") === -1) {
      containerClass += " tooltip-auto";
    }
  }
  containerClass = containerClass.replace(/left|right|top|bottom|end|start/g, `${dataPlacement.split(" ")[0]}`);
  if (renderer) {
    renderer.setAttribute(target, "class", containerClass);
    return;
  }
  target.className = containerClass;
}
function setStyles(element, styles, renderer) {
  if (!element || !styles) {
    return;
  }
  Object.keys(styles).forEach((prop) => {
    let unit = "";
    if (["width", "height", "top", "right", "bottom", "left"].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = "px";
    }
    if (renderer) {
      renderer.setStyle(element, prop, `${String(styles[prop])}${unit}`);
      return;
    }
    element.style[prop] = String(styles[prop]) + unit;
  });
}
function arrow(data) {
  let targetOffsets = data.offsets.target;
  const arrowElement = data.instance.target.querySelector(".arrow");
  if (!arrowElement) {
    return data;
  }
  const isVertical = ["left", "right"].indexOf(data.placement.split(" ")[0]) !== -1;
  const len = isVertical ? "height" : "width";
  const sideCapitalized = isVertical ? "Top" : "Left";
  const side = sideCapitalized.toLowerCase();
  const altSide = isVertical ? "left" : "top";
  const opSide = isVertical ? "bottom" : "right";
  const arrowElementSize = getOuterSizes(arrowElement)[len];
  const placementVariation = data.placement.split(" ")[1];
  if ((data.offsets.host[opSide] ?? 0) - arrowElementSize < (targetOffsets[side] ?? 0)) {
    targetOffsets[side] -= (targetOffsets[side] ?? 0) - ((data.offsets.host[opSide] ?? 0) - arrowElementSize);
  }
  if (Number(data.offsets.host[side]) + Number(arrowElementSize) > (targetOffsets[opSide] ?? 0)) {
    targetOffsets[side] += Number(data.offsets.host[side]) + Number(arrowElementSize) - Number(targetOffsets[opSide]);
  }
  targetOffsets = getClientRect(targetOffsets);
  const css = getStyleComputedProperty(data.instance.target);
  const targetMarginSide = parseFloat(css[`margin${sideCapitalized}`]) || 0;
  const targetBorderSide = parseFloat(css[`border${sideCapitalized}Width`]) || 0;
  let center;
  if (!placementVariation) {
    center = Number(data.offsets.host[side]) + Number(data.offsets.host[len] / 2 - arrowElementSize / 2);
  } else {
    const targetBorderRadius = parseFloat(css["borderRadius"]) || 0;
    const targetSideArrowOffset = Number(targetMarginSide + targetBorderSide + targetBorderRadius);
    center = side === placementVariation ? Number(data.offsets.host[side]) + targetSideArrowOffset : Number(data.offsets.host[side]) + Number(data.offsets.host[len] - targetSideArrowOffset);
  }
  let sideValue = center - (targetOffsets[side] ?? 0) - targetMarginSide - targetBorderSide;
  sideValue = Math.max(Math.min(targetOffsets[len] - (arrowElementSize + 5), sideValue), 0);
  data.offsets.arrow = {
    [side]: Math.round(sideValue),
    [altSide]: ""
    // make sure to unset any eventual altSide value from the DOM node
  };
  data.instance.arrow = arrowElement;
  return data;
}
function flip(data) {
  data.offsets.target = getClientRect(data.offsets.target);
  if (!isModifierEnabled(data.options, "flip")) {
    data.offsets.target = __spreadValues(__spreadValues({}, data.offsets.target), getTargetOffsets(data.instance.target, data.offsets.host, data.placement));
    return data;
  }
  const boundaries = getBoundaries(
    data.instance.target,
    data.instance.host,
    0,
    // padding
    "viewport",
    false
    // positionFixed
  );
  let placement = data.placement.split(" ")[0];
  let variation = data.placement.split(" ")[1] || "";
  const offsetsHost = data.offsets.host;
  const target = data.instance.target;
  const host = data.instance.host;
  const adaptivePosition = computeAutoPlacement("auto", offsetsHost, target, host, data.options.allowedPositions);
  const flipOrder = [placement, adaptivePosition];
  flipOrder.forEach((step, index) => {
    if (placement !== step || flipOrder.length === index + 1) {
      return;
    }
    placement = data.placement.split(" ")[0];
    const overlapsRef = placement === "left" && Math.floor(data.offsets.target.right ?? 0) > Math.floor(data.offsets.host.left ?? 0) || placement === "right" && Math.floor(data.offsets.target.left ?? 0) < Math.floor(data.offsets.host.right ?? 0) || placement === "top" && Math.floor(data.offsets.target.bottom ?? 0) > Math.floor(data.offsets.host.top ?? 0) || placement === "bottom" && Math.floor(data.offsets.target.top ?? 0) < Math.floor(data.offsets.host.bottom ?? 0);
    const overflowsLeft = Math.floor(data.offsets.target.left ?? 0) < Math.floor(boundaries.left ?? 0);
    const overflowsRight = Math.floor(data.offsets.target.right ?? 0) > Math.floor(boundaries.right ?? 0);
    const overflowsTop = Math.floor(data.offsets.target.top ?? 0) < Math.floor(boundaries.top ?? 0);
    const overflowsBottom = Math.floor(data.offsets.target.bottom ?? 0) > Math.floor(boundaries.bottom ?? 0);
    const overflowsBoundaries = placement === "left" && overflowsLeft || placement === "right" && overflowsRight || placement === "top" && overflowsTop || placement === "bottom" && overflowsBottom;
    const isVertical = ["top", "bottom"].indexOf(placement) !== -1;
    const flippedVariation = isVertical && variation === "left" && overflowsLeft || isVertical && variation === "right" && overflowsRight || !isVertical && variation === "left" && overflowsTop || !isVertical && variation === "right" && overflowsBottom;
    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }
      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }
      data.placement = placement + (variation ? ` ${variation}` : "");
      data.offsets.target = __spreadValues(__spreadValues({}, data.offsets.target), getTargetOffsets(data.instance.target, data.offsets.host, data.placement));
    }
  });
  return data;
}
function initData(targetElement, hostElement, position, options) {
  if (!targetElement || !hostElement) {
    return;
  }
  const hostElPosition = getReferenceOffsets(targetElement, hostElement);
  if (!position.match(/^(auto)*\s*(left|right|top|bottom|start|end)*$/) && !position.match(/^(left|right|top|bottom|start|end)*(?: (left|right|top|bottom|start|end))*$/)) {
    position = "auto";
  }
  const placementAuto = !!position.match(/auto/g);
  let placement = position.match(/auto\s(left|right|top|bottom|start|end)/) ? position.split(" ")[1] || "auto" : position;
  const matches = placement.match(/^(left|right|top|bottom|start|end)* ?(?!\1)(left|right|top|bottom|start|end)?/);
  if (matches) {
    placement = matches[1] + (matches[2] ? ` ${matches[2]}` : "");
  }
  if (["left right", "right left", "top bottom", "bottom top"].indexOf(placement) !== -1) {
    placement = "auto";
  }
  placement = computeAutoPlacement(placement, hostElPosition, targetElement, hostElement, options ? options.allowedPositions : void 0);
  const targetOffset = getTargetOffsets(targetElement, hostElPosition, placement);
  return {
    options: options || {
      modifiers: {}
    },
    instance: {
      target: targetElement,
      host: hostElement,
      arrow: void 0
    },
    offsets: {
      target: targetOffset,
      host: hostElPosition,
      arrow: void 0
    },
    positionFixed: false,
    placement,
    placementAuto
  };
}
function preventOverflow(data) {
  if (!isModifierEnabled(data.options, "preventOverflow")) {
    return data;
  }
  const transformProp = "transform";
  const targetStyles = data.instance.target.style;
  const {
    top,
    left,
    [transformProp]: transform
  } = targetStyles;
  targetStyles.top = "";
  targetStyles.left = "";
  targetStyles[transformProp] = "";
  const boundaries = getBoundaries(
    data.instance.target,
    data.instance.host,
    0,
    // padding
    data.options.modifiers.preventOverflow?.boundariesElement || "scrollParent",
    false
    // positionFixed
  );
  targetStyles.top = top;
  targetStyles.left = left;
  targetStyles[transformProp] = transform;
  const order = ["left", "right", "top", "bottom"];
  const check = {
    primary(placement) {
      let value = data.offsets.target[placement];
      if ((data.offsets.target[placement] ?? 0) < (boundaries[placement] ?? 0)) {
        value = Math.max(data.offsets.target[placement] ?? 0, boundaries[placement] ?? 0);
      }
      return {
        [placement]: value
      };
    },
    secondary(placement) {
      const isPlacementHorizontal = placement === "right";
      const mainSide = isPlacementHorizontal ? "left" : "top";
      const measurement = isPlacementHorizontal ? "width" : "height";
      let value = data.offsets.target[mainSide];
      if ((data.offsets.target[placement] ?? 0) > (boundaries[placement] ?? 0)) {
        value = Math.min(data.offsets.target[mainSide] ?? 0, (boundaries[placement] ?? 0) - data.offsets.target[measurement]);
      }
      return {
        [mainSide]: value
      };
    }
  };
  order.forEach((placement) => {
    const side = ["left", "top", "start"].indexOf(placement) !== -1 ? check["primary"] : check["secondary"];
    data.offsets.target = __spreadValues(__spreadValues({}, data.offsets.target), side(placement));
  });
  return data;
}
function shift(data) {
  const placement = data.placement;
  const basePlacement = placement.split(" ")[0];
  const shiftVariation = placement.split(" ")[1];
  if (shiftVariation) {
    const {
      host,
      target
    } = data.offsets;
    const isVertical = ["bottom", "top"].indexOf(basePlacement) !== -1;
    const side = isVertical ? "left" : "top";
    const measurement = isVertical ? "width" : "height";
    const shiftOffsets = {
      start: {
        [side]: host[side]
      },
      end: {
        [side]: (host[side] ?? 0) + host[measurement] - target[measurement]
      }
    };
    data.offsets.target = __spreadValues(__spreadValues({}, target), {
      [side]: side === shiftVariation ? shiftOffsets.start[side] : shiftOffsets.end[side]
    });
  }
  return data;
}
var Positioning = class {
  position(hostElement, targetElement) {
    return this.offset(
      hostElement,
      targetElement
      /*, false*/
    );
  }
  offset(hostElement, targetElement) {
    return getReferenceOffsets(targetElement, hostElement);
  }
  positionElements(hostElement, targetElement, position, appendToBody, options) {
    const chainOfModifiers = [flip, shift, preventOverflow, arrow];
    const _position = MapPlacementInToRL[position];
    const data = initData(targetElement, hostElement, _position, options);
    if (!data) {
      return;
    }
    return chainOfModifiers.reduce((modifiedData, modifier) => modifier(modifiedData), data);
  }
};
var positionService = new Positioning();
function positionElements(hostElement, targetElement, placement, appendToBody, options, renderer) {
  const data = positionService.positionElements(hostElement, targetElement, placement, appendToBody, options);
  if (!data) {
    return;
  }
  const offsets = getOffsets(data);
  setStyles(targetElement, {
    "will-change": "transform",
    top: "0px",
    left: "0px",
    transform: `translate3d(${offsets.left}px, ${offsets.top}px, 0px)`
  }, renderer);
  if (data.instance.arrow) {
    setStyles(data.instance.arrow, data.offsets.arrow, renderer);
  }
  updateContainerClass(data, renderer);
}
var _PositioningService = class _PositioningService {
  constructor(ngZone, rendererFactory, platformId) {
    this.update$$ = new Subject();
    this.positionElements = /* @__PURE__ */ new Map();
    this.isDisabled = false;
    if (isPlatformBrowser(platformId)) {
      ngZone.runOutsideAngular(() => {
        this.triggerEvent$ = merge(fromEvent(window, "scroll", {
          passive: true
        }), fromEvent(window, "resize", {
          passive: true
        }), of(0, animationFrameScheduler), this.update$$);
        this.triggerEvent$.pipe(takeUntilDestroyed()).subscribe(() => {
          if (this.isDisabled) {
            return;
          }
          this.positionElements.forEach((positionElement) => {
            positionElements(_getHtmlElement(positionElement.target), _getHtmlElement(positionElement.element), positionElement.attachment, positionElement.appendToBody, this.options, rendererFactory.createRenderer(null, null));
          });
        });
      });
    }
  }
  position(options) {
    this.addPositionElement(options);
  }
  get event$() {
    return this.triggerEvent$;
  }
  disable() {
    this.isDisabled = true;
  }
  enable() {
    this.isDisabled = false;
  }
  addPositionElement(options) {
    this.positionElements.set(_getHtmlElement(options.element), options);
  }
  calcPosition() {
    this.update$$.next(null);
  }
  deletePositionElement(elRef) {
    this.positionElements.delete(_getHtmlElement(elRef));
  }
  setOptions(options) {
    this.options = options;
  }
};
_PositioningService.ɵfac = function PositioningService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PositioningService)(ɵɵinject(NgZone), ɵɵinject(RendererFactory2), ɵɵinject(PLATFORM_ID));
};
_PositioningService.ɵprov = ɵɵdefineInjectable({
  token: _PositioningService,
  factory: _PositioningService.ɵfac,
  providedIn: "root"
});
var PositioningService = _PositioningService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PositioningService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }, {
    type: RendererFactory2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], null);
})();
function _getHtmlElement(element) {
  if (typeof element === "string") {
    return document.querySelector(element);
  }
  if (element instanceof ElementRef) {
    return element.nativeElement;
  }
  return element ?? null;
}

// node_modules/ngx-bootstrap/component-loader/fesm2022/ngx-bootstrap-component-loader.mjs
var ContentRef = class {
  constructor(nodes, viewRef, componentRef) {
    this.nodes = nodes;
    this.viewRef = viewRef;
    this.componentRef = componentRef;
  }
};
var ComponentLoader = class {
  /**
   * Do not use this directly, it should be instanced via
   * `ComponentLoadFactory.attach`
   * @internal
   */
  constructor(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _applicationRef, _posService, _document) {
    this._viewContainerRef = _viewContainerRef;
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._injector = _injector;
    this._componentFactoryResolver = _componentFactoryResolver;
    this._ngZone = _ngZone;
    this._applicationRef = _applicationRef;
    this._posService = _posService;
    this._document = _document;
    this.onBeforeShow = new EventEmitter();
    this.onShown = new EventEmitter();
    this.onBeforeHide = new EventEmitter();
    this.onHidden = new EventEmitter();
    this._providers = [];
    this._isHiding = false;
    this.containerDefaultSelector = "body";
    this._listenOpts = {};
    this._globalListener = Function.prototype;
  }
  get isShown() {
    if (this._isHiding) {
      return false;
    }
    return !!this._componentRef;
  }
  attach(compType) {
    this._componentFactory = this._componentFactoryResolver.resolveComponentFactory(compType);
    return this;
  }
  // todo: add behaviour: to target element, `body`, custom element
  to(container) {
    this.container = container || this.container;
    return this;
  }
  position(opts) {
    if (!opts) {
      return this;
    }
    this.attachment = opts.attachment || this.attachment;
    this._elementRef = opts.target || this._elementRef;
    return this;
  }
  provide(provider) {
    this._providers.push(provider);
    return this;
  }
  // todo: appendChild to element or document.querySelector(this.container)
  show(opts = {}) {
    this._subscribePositioning();
    this._innerComponent = void 0;
    if (!this._componentRef) {
      this.onBeforeShow.emit();
      this._contentRef = this._getContentRef(opts.content, opts.context, opts.initialState);
      const injector = Injector.create({
        providers: this._providers,
        parent: this._injector
      });
      if (!this._componentFactory) {
        return;
      }
      this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
      this._applicationRef.attachView(this._componentRef.hostView);
      this.instance = this._componentRef.instance;
      Object.assign(this._componentRef.instance, opts);
      if (this.container instanceof ElementRef) {
        this.container.nativeElement.appendChild(this._componentRef.location.nativeElement);
      }
      if (typeof this.container === "string" && typeof this._document !== "undefined") {
        const selectedElement = this._document.querySelector(this.container) || this._document.querySelector(this.containerDefaultSelector);
        if (!selectedElement) {
          return;
        }
        selectedElement.appendChild(this._componentRef.location.nativeElement);
      }
      if (!this.container && this._elementRef && this._elementRef.nativeElement.parentElement) {
        this._elementRef.nativeElement.parentElement.appendChild(this._componentRef.location.nativeElement);
      }
      if (this._contentRef.componentRef) {
        this._innerComponent = this._contentRef.componentRef.instance;
        this._contentRef.componentRef.changeDetectorRef.markForCheck();
        this._contentRef.componentRef.changeDetectorRef.detectChanges();
      }
      this._componentRef.changeDetectorRef.markForCheck();
      this._componentRef.changeDetectorRef.detectChanges();
      this.onShown.emit(opts.id ? {
        id: opts.id
      } : this._componentRef.instance);
    }
    this._registerOutsideClick();
    return this._componentRef;
  }
  hide(id2) {
    if (!this._componentRef) {
      return this;
    }
    this._posService.deletePositionElement(this._componentRef.location);
    this.onBeforeHide.emit(this._componentRef.instance);
    const componentEl = this._componentRef.location.nativeElement;
    componentEl.parentNode?.removeChild(componentEl);
    this._contentRef?.componentRef?.destroy();
    if (this._viewContainerRef && this._contentRef?.viewRef) {
      this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
    }
    this._contentRef?.viewRef?.destroy();
    this._componentRef?.destroy();
    this._contentRef = void 0;
    this._componentRef = void 0;
    this._removeGlobalListener();
    this.onHidden.emit(id2 ? {
      id: id2
    } : null);
    return this;
  }
  toggle() {
    if (this.isShown) {
      this.hide();
      return;
    }
    this.show();
  }
  dispose() {
    if (this.isShown) {
      this.hide();
    }
    this._unsubscribePositioning();
    if (this._unregisterListenersFn) {
      this._unregisterListenersFn();
    }
  }
  listen(listenOpts) {
    this.triggers = listenOpts.triggers || this.triggers;
    this._listenOpts.outsideClick = listenOpts.outsideClick;
    this._listenOpts.outsideEsc = listenOpts.outsideEsc;
    listenOpts.target = listenOpts.target || this._elementRef?.nativeElement;
    const hide = this._listenOpts.hide = () => listenOpts.hide ? listenOpts.hide() : void this.hide();
    const show = this._listenOpts.show = (registerHide) => {
      listenOpts.show ? listenOpts.show(registerHide) : this.show(registerHide);
      registerHide();
    };
    const toggle = (registerHide) => {
      this.isShown ? hide() : show(registerHide);
    };
    if (this._renderer) {
      this._unregisterListenersFn = listenToTriggersV2(this._renderer, {
        target: listenOpts.target,
        triggers: listenOpts.triggers,
        show,
        hide,
        toggle
      });
    }
    return this;
  }
  _removeGlobalListener() {
    if (this._globalListener) {
      this._globalListener();
      this._globalListener = Function.prototype;
    }
  }
  attachInline(vRef, template) {
    if (vRef && template) {
      this._inlineViewRef = vRef.createEmbeddedView(template);
    }
    return this;
  }
  _registerOutsideClick() {
    if (!this._componentRef || !this._componentRef.location) {
      return;
    }
    let unsubscribeOutsideClick = Function.prototype;
    let unsubscribeEscClick = Function.prototype;
    if (this._listenOpts.outsideClick) {
      const target = this._componentRef.location.nativeElement;
      setTimeout(() => {
        if (this._renderer && this._elementRef) {
          unsubscribeOutsideClick = registerOutsideClick(this._renderer, {
            targets: [target, this._elementRef.nativeElement],
            outsideClick: this._listenOpts.outsideClick,
            hide: () => this._listenOpts.hide && this._listenOpts.hide()
          });
        }
      });
    }
    if (this._listenOpts.outsideEsc && this._renderer && this._elementRef) {
      const target = this._componentRef.location.nativeElement;
      unsubscribeEscClick = registerEscClick(this._renderer, {
        targets: [target, this._elementRef.nativeElement],
        outsideEsc: this._listenOpts.outsideEsc,
        hide: () => this._listenOpts.hide && this._listenOpts.hide()
      });
    }
    this._globalListener = () => {
      unsubscribeOutsideClick();
      unsubscribeEscClick();
    };
  }
  getInnerComponent() {
    return this._innerComponent;
  }
  _subscribePositioning() {
    if (this._zoneSubscription || !this.attachment) {
      return;
    }
    this.onShown.subscribe(() => {
      this._posService.position({
        element: this._componentRef?.location,
        target: this._elementRef,
        attachment: this.attachment,
        appendToBody: this.container === "body"
      });
    });
    this._zoneSubscription = this._ngZone.onStable.subscribe(() => {
      if (!this._componentRef) {
        return;
      }
      this._posService.calcPosition();
    });
  }
  _unsubscribePositioning() {
    if (!this._zoneSubscription) {
      return;
    }
    this._zoneSubscription.unsubscribe();
    this._zoneSubscription = void 0;
  }
  _getContentRef(content, context, initialState) {
    if (!content) {
      return new ContentRef([]);
    }
    if (content instanceof TemplateRef) {
      if (this._viewContainerRef) {
        const _viewRef = this._viewContainerRef.createEmbeddedView(content, context);
        _viewRef.markForCheck();
        return new ContentRef([_viewRef.rootNodes], _viewRef);
      }
      const viewRef = content.createEmbeddedView({});
      this._applicationRef.attachView(viewRef);
      return new ContentRef([viewRef.rootNodes], viewRef);
    }
    if (typeof content === "function") {
      const contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
      const modalContentInjector = Injector.create({
        providers: this._providers,
        parent: this._injector
      });
      const componentRef = contentCmptFactory.create(modalContentInjector);
      Object.assign(componentRef.instance, initialState);
      this._applicationRef.attachView(componentRef.hostView);
      return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }
    const nodes = this._renderer ? [this._renderer.createText(`${content}`)] : [];
    return new ContentRef([nodes]);
  }
};
var _ComponentLoaderFactory = class _ComponentLoaderFactory {
  constructor(_componentFactoryResolver, _ngZone, _injector, _posService, _applicationRef, _document) {
    this._componentFactoryResolver = _componentFactoryResolver;
    this._ngZone = _ngZone;
    this._injector = _injector;
    this._posService = _posService;
    this._applicationRef = _applicationRef;
    this._document = _document;
  }
  /**
   *
   * @param _elementRef
   * @param _viewContainerRef
   * @param _renderer
   */
  createLoader(_elementRef, _viewContainerRef, _renderer) {
    return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._applicationRef, this._posService, this._document);
  }
};
_ComponentLoaderFactory.ɵfac = function ComponentLoaderFactory_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ComponentLoaderFactory)(ɵɵinject(ComponentFactoryResolver$1), ɵɵinject(NgZone), ɵɵinject(Injector), ɵɵinject(PositioningService), ɵɵinject(ApplicationRef), ɵɵinject(DOCUMENT));
};
_ComponentLoaderFactory.ɵprov = ɵɵdefineInjectable({
  token: _ComponentLoaderFactory,
  factory: _ComponentLoaderFactory.ɵfac,
  providedIn: "root"
});
var ComponentLoaderFactory = _ComponentLoaderFactory;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComponentLoaderFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: ComponentFactoryResolver$1
  }, {
    type: NgZone
  }, {
    type: Injector
  }, {
    type: PositioningService
  }, {
    type: ApplicationRef
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();

// node_modules/ngx-bootstrap/tooltip/fesm2022/ngx-bootstrap-tooltip.mjs
var _c0 = ["*"];
var _TooltipConfig = class _TooltipConfig {
  constructor() {
    this.adaptivePosition = true;
    this.placement = "top";
    this.triggers = "hover focus";
    this.delay = 0;
  }
};
_TooltipConfig.ɵfac = function TooltipConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TooltipConfig)();
};
_TooltipConfig.ɵprov = ɵɵdefineInjectable({
  token: _TooltipConfig,
  factory: _TooltipConfig.ɵfac,
  providedIn: "root"
});
var TooltipConfig = _TooltipConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _TooltipContainerComponent = class _TooltipContainerComponent {
  get _bsVersions() {
    return getBsVer();
  }
  constructor(config) {
    Object.assign(this, config);
  }
  ngAfterViewInit() {
    this.classMap = {
      in: false,
      fade: false
    };
    if (this.placement) {
      if (this._bsVersions.isBs5) {
        this.placement = PlacementForBs5[this.placement];
      }
      this.classMap[this.placement] = true;
    }
    this.classMap[`tooltip-${this.placement}`] = true;
    this.classMap["in"] = true;
    if (this.animation) {
      this.classMap["fade"] = true;
    }
    if (this.containerClass) {
      this.classMap[this.containerClass] = true;
    }
  }
};
_TooltipContainerComponent.ɵfac = function TooltipContainerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TooltipContainerComponent)(ɵɵdirectiveInject(TooltipConfig));
};
_TooltipContainerComponent.ɵcmp = ɵɵdefineComponent({
  type: _TooltipContainerComponent,
  selectors: [["bs-tooltip-container"]],
  hostAttrs: ["role", "tooltip"],
  hostVars: 3,
  hostBindings: function TooltipContainerComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("id", ctx.id);
      ɵɵclassMap("show tooltip in tooltip-" + ctx.placement + " bs-tooltip-" + ctx.placement + " " + ctx.placement + " " + ctx.containerClass);
    }
  },
  ngContentSelectors: _c0,
  decls: 3,
  vars: 0,
  consts: [[1, "tooltip-arrow", "arrow"], [1, "tooltip-inner"]],
  template: function TooltipContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵdomElement(0, "div", 0);
      ɵɵdomElementStart(1, "div", 1);
      ɵɵprojection(2);
      ɵɵdomElementEnd();
    }
  },
  styles: [".tooltip[_nghost-%COMP%]{display:block;pointer-events:none;position:absolute}.tooltip[_nghost-%COMP%]   .tooltip-arrow[_ngcontent-%COMP%]{position:absolute}"],
  changeDetection: 0
});
var TooltipContainerComponent = _TooltipContainerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipContainerComponent, [{
    type: Component,
    args: [{
      selector: "bs-tooltip-container",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class]": '"show tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
        "[attr.id]": "this.id",
        role: "tooltip"
      },
      template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `,
      standalone: true,
      styles: [":host.tooltip{display:block;pointer-events:none;position:absolute}:host.tooltip .tooltip-arrow{position:absolute}\n"]
    }]
  }], () => [{
    type: TooltipConfig
  }], null);
})();
var id = 0;
var _TooltipDirective = class _TooltipDirective {
  /**
   * Returns whether or not the tooltip is currently being shown
   */
  get isOpen() {
    return this._tooltip.isShown;
  }
  set isOpen(value) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }
  /** @deprecated - please use `tooltip` instead */
  set htmlContent(value) {
    warnOnce("tooltipHtml was deprecated, please use `tooltip` instead");
    this.tooltip = value;
  }
  /** @deprecated - please use `placement` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _placement(value) {
    warnOnce("tooltipPlacement was deprecated, please use `placement` instead");
    this.placement = value;
  }
  /** @deprecated - please use `isOpen` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _isOpen(value) {
    warnOnce("tooltipIsOpen was deprecated, please use `isOpen` instead");
    this.isOpen = value;
  }
  get _isOpen() {
    warnOnce("tooltipIsOpen was deprecated, please use `isOpen` instead");
    return this.isOpen;
  }
  /** @deprecated - please use `isDisabled` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _enable(value) {
    warnOnce("tooltipEnable was deprecated, please use `isDisabled` instead");
    this.isDisabled = !value;
  }
  get _enable() {
    warnOnce("tooltipEnable was deprecated, please use `isDisabled` instead");
    return this.isDisabled;
  }
  /** @deprecated - please use `container="body"` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _appendToBody(value) {
    warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
    this.container = value ? "body" : this.container;
  }
  get _appendToBody() {
    warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
    return this.container === "body";
  }
  /** @deprecated - will replaced with customClass */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _popupClass(value) {
    warnOnce("tooltipClass deprecated");
  }
  /** @deprecated - removed */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _tooltipContext(value) {
    warnOnce("tooltipContext deprecated");
  }
  /** @deprecated */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  set _tooltipPopupDelay(value) {
    warnOnce("tooltipPopupDelay is deprecated, use `delay` instead");
    this.delay = value;
  }
  /** @deprecated -  please use `triggers` instead */
  get _tooltipTrigger() {
    warnOnce("tooltipTrigger was deprecated, please use `triggers` instead");
    return this.triggers;
  }
  set _tooltipTrigger(value) {
    warnOnce("tooltipTrigger was deprecated, please use `triggers` instead");
    this.triggers = (value || "").toString();
  }
  constructor(_viewContainerRef, cis, config, _elementRef, _renderer, _positionService) {
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this._positionService = _positionService;
    this.tooltipId = id++;
    this.adaptivePosition = true;
    this.tooltipChange = new EventEmitter();
    this.placement = "top";
    this.triggers = "hover focus";
    this.containerClass = "";
    this.isDisabled = false;
    this.delay = 0;
    this.tooltipAnimation = true;
    this.tooltipFadeDuration = 150;
    this.tooltipStateChanged = new EventEmitter();
    this._tooltip = cis.createLoader(this._elementRef, _viewContainerRef, this._renderer).provide({
      provide: TooltipConfig,
      useValue: config
    });
    Object.assign(this, config);
    this.onShown = this._tooltip.onShown;
    this.onHidden = this._tooltip.onHidden;
  }
  ngOnInit() {
    this._tooltip.listen({
      triggers: this.triggers,
      show: () => this.show()
    });
    this.tooltipChange.subscribe((value) => {
      if (!value) {
        this._tooltip.hide();
      }
    });
    this.onShown.subscribe(() => {
      this.setAriaDescribedBy();
    });
    this.onHidden.subscribe(() => {
      this.setAriaDescribedBy();
    });
  }
  setAriaDescribedBy() {
    this._ariaDescribedby = this.isOpen ? `tooltip-${this.tooltipId}` : void 0;
    if (this._ariaDescribedby) {
      this._renderer.setAttribute(this._elementRef.nativeElement, "aria-describedby", this._ariaDescribedby);
    } else {
      this._renderer.removeAttribute(this._elementRef.nativeElement, "aria-describedby");
    }
  }
  /**
   * Toggles an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  toggle() {
    if (this.isOpen) {
      return this.hide();
    }
    this.show();
  }
  /**
   * Opens an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  show() {
    this._positionService.setOptions({
      modifiers: {
        flip: {
          enabled: this.adaptivePosition
        },
        preventOverflow: {
          enabled: this.adaptivePosition,
          boundariesElement: this.boundariesElement || "scrollParent"
        }
      }
    });
    if (this.isOpen || this.isDisabled || this._delayTimeoutId || !this.tooltip) {
      return;
    }
    const showTooltip = () => {
      if (this._delayTimeoutId) {
        this._delayTimeoutId = void 0;
      }
      this._tooltip.attach(TooltipContainerComponent).to(this.container).position({
        attachment: this.placement
      }).show({
        content: this.tooltip,
        placement: this.placement,
        containerClass: this.containerClass,
        id: `tooltip-${this.tooltipId}`
      });
    };
    const cancelDelayedTooltipShowing = () => {
      if (this._tooltipCancelShowFn) {
        this._tooltipCancelShowFn();
      }
    };
    if (this.delay) {
      if (this._delaySubscription) {
        this._delaySubscription.unsubscribe();
      }
      this._delaySubscription = timer(this.delay).subscribe(() => {
        showTooltip();
        cancelDelayedTooltipShowing();
      });
      if (this.triggers) {
        parseTriggers(this.triggers).forEach((trigger) => {
          if (!trigger.close) {
            return;
          }
          this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, trigger.close, () => {
            this._delaySubscription?.unsubscribe();
            cancelDelayedTooltipShowing();
          });
        });
      }
    } else {
      showTooltip();
    }
  }
  /**
   * Closes an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  hide() {
    if (this._delayTimeoutId) {
      clearTimeout(this._delayTimeoutId);
      this._delayTimeoutId = void 0;
    }
    if (!this._tooltip.isShown) {
      return;
    }
    if (this._tooltip.instance?.classMap) {
      this._tooltip.instance.classMap["in"] = false;
    }
    setTimeout(() => {
      this._tooltip.hide();
    }, this.tooltipFadeDuration);
  }
  ngOnDestroy() {
    this._tooltip.dispose();
    this.tooltipChange.unsubscribe();
    if (this._delaySubscription) {
      this._delaySubscription.unsubscribe();
    }
    this.onShown.unsubscribe();
    this.onHidden.unsubscribe();
  }
};
_TooltipDirective.ɵfac = function TooltipDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TooltipDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory), ɵɵdirectiveInject(TooltipConfig), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(PositioningService));
};
_TooltipDirective.ɵdir = ɵɵdefineDirective({
  type: _TooltipDirective,
  selectors: [["", "tooltip", ""], ["", "tooltipHtml", ""]],
  inputs: {
    adaptivePosition: "adaptivePosition",
    tooltip: "tooltip",
    placement: "placement",
    triggers: "triggers",
    container: "container",
    containerClass: "containerClass",
    boundariesElement: "boundariesElement",
    isOpen: "isOpen",
    isDisabled: "isDisabled",
    delay: "delay",
    htmlContent: [0, "tooltipHtml", "htmlContent"],
    _placement: [0, "tooltipPlacement", "_placement"],
    _isOpen: [0, "tooltipIsOpen", "_isOpen"],
    _enable: [0, "tooltipEnable", "_enable"],
    _appendToBody: [0, "tooltipAppendToBody", "_appendToBody"],
    tooltipAnimation: "tooltipAnimation",
    _popupClass: [0, "tooltipClass", "_popupClass"],
    _tooltipContext: [0, "tooltipContext", "_tooltipContext"],
    _tooltipPopupDelay: [0, "tooltipPopupDelay", "_tooltipPopupDelay"],
    tooltipFadeDuration: "tooltipFadeDuration",
    _tooltipTrigger: [0, "tooltipTrigger", "_tooltipTrigger"]
  },
  outputs: {
    tooltipChange: "tooltipChange",
    onShown: "onShown",
    onHidden: "onHidden",
    tooltipStateChanged: "tooltipStateChanged"
  },
  exportAs: ["bs-tooltip"],
  features: [ɵɵProvidersFeature([ComponentLoaderFactory, PositioningService])]
});
var TooltipDirective = _TooltipDirective;
__decorate([OnChange(), __metadata("design:type", Object)], TooltipDirective.prototype, "tooltip", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipDirective, [{
    type: Directive,
    args: [{
      selector: "[tooltip], [tooltipHtml]",
      exportAs: "bs-tooltip",
      standalone: true,
      providers: [ComponentLoaderFactory, PositioningService]
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }, {
    type: TooltipConfig
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: PositioningService
  }], {
    adaptivePosition: [{
      type: Input
    }],
    tooltip: [{
      type: Input
    }],
    tooltipChange: [{
      type: Output
    }],
    placement: [{
      type: Input
    }],
    triggers: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    containerClass: [{
      type: Input
    }],
    boundariesElement: [{
      type: Input
    }],
    isOpen: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    onShown: [{
      type: Output
    }],
    onHidden: [{
      type: Output
    }],
    htmlContent: [{
      type: Input,
      args: ["tooltipHtml"]
    }],
    _placement: [{
      type: Input,
      args: ["tooltipPlacement"]
    }],
    _isOpen: [{
      type: Input,
      args: ["tooltipIsOpen"]
    }],
    _enable: [{
      type: Input,
      args: ["tooltipEnable"]
    }],
    _appendToBody: [{
      type: Input,
      args: ["tooltipAppendToBody"]
    }],
    tooltipAnimation: [{
      type: Input
    }],
    _popupClass: [{
      type: Input,
      args: ["tooltipClass"]
    }],
    _tooltipContext: [{
      type: Input,
      args: ["tooltipContext"]
    }],
    _tooltipPopupDelay: [{
      type: Input,
      args: ["tooltipPopupDelay"]
    }],
    tooltipFadeDuration: [{
      type: Input
    }],
    _tooltipTrigger: [{
      type: Input,
      args: ["tooltipTrigger"]
    }],
    tooltipStateChanged: [{
      type: Output
    }]
  });
})();
var _TooltipModule = class _TooltipModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _TooltipModule,
      providers: []
    };
  }
};
_TooltipModule.ɵfac = function TooltipModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TooltipModule)();
};
_TooltipModule.ɵmod = ɵɵdefineNgModule({
  type: _TooltipModule,
  imports: [CommonModule, TooltipDirective, TooltipContainerComponent],
  exports: [TooltipDirective]
});
_TooltipModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
var TooltipModule = _TooltipModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, TooltipDirective, TooltipContainerComponent],
      exports: [TooltipDirective]
    }]
  }], null, null);
})();

// node_modules/espd-common/fesm2022/espd-common-button.mjs
var _c02 = ["*"];
function ButtonComponent_ng_template_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 4);
  }
}
function ButtonComponent_ng_template_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("espdIcon", ctx_r0.icon);
  }
}
function ButtonComponent_ng_template_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "espd-message", 6);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("config", ctx_r0.textConfig);
  }
}
function ButtonComponent_ng_template_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ButtonComponent_ng_template_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "espd-message", 8);
  }
}
function ButtonComponent_ng_template_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "espd-message", 9);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("key", ctx_r0.iconMesssage);
  }
}
function ButtonComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
    ɵɵconditionalCreate(1, ButtonComponent_ng_template_0_Conditional_1_Template, 1, 0, "i", 4)(2, ButtonComponent_ng_template_0_Conditional_2_Template, 1, 1, "i", 5);
    ɵɵconditionalCreate(3, ButtonComponent_ng_template_0_Conditional_3_Template, 1, 1, "espd-message", 6);
    ɵɵtemplate(4, ButtonComponent_ng_template_0_ng_container_4_Template, 1, 0, "ng-container", 7);
    ɵɵconditionalCreate(5, ButtonComponent_ng_template_0_Conditional_5_Template, 1, 0, "espd-message", 8)(6, ButtonComponent_ng_template_0_Conditional_6_Template, 1, 1, "espd-message", 9);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.color === "close" ? 1 : ctx_r0.icon ? 2 : -1);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r0.hasTextConfig ? 3 : -1);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.color === "close" ? 5 : ctx_r0.iconMesssage ? 6 : -1);
  }
}
function ButtonComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 10)(1, "span");
    ɵɵelementContainer(2, 11);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const content_r2 = ɵɵreference(1);
    ɵɵclassMap(ctx_r0.classes);
    ɵɵproperty("routerLink", ctx_r0.routerPath)("queryParams", ctx_r0.queryParams)("target", ctx_r0.target);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
function ButtonComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 12)(1, "span");
    ɵɵelementContainer(2, 11);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const content_r2 = ɵɵreference(1);
    ɵɵclassMap(ctx_r0.classes);
    ɵɵproperty("href", ctx_r0.path, ɵɵsanitizeUrl)("target", ctx_r0.target);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
function ButtonComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 16);
    ɵɵelement(1, "espd-message", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassProp("spinner--xs", !ctx_r0.small())("spinner--xxs", ctx_r0.small());
  }
}
function ButtonComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 13)(1, "span");
    ɵɵconditionalCreate(2, ButtonComponent_Conditional_4_Conditional_2_Template, 2, 4, "span", 14);
    ɵɵelementStart(3, "span", 15);
    ɵɵelementContainer(4, 11);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const content_r2 = ɵɵreference(1);
    ɵɵclassMap(ctx_r0.classes);
    ɵɵclassProp("disable-hover-decoration", ctx_r0.disableHoverTextDecoration)("loading", ctx_r0.loading());
    ɵɵproperty("type", ctx_r0.type)("disabled", ctx_r0.disabled() || ctx_r0.loading());
    ɵɵadvance(2);
    ɵɵconditional(ctx_r0.loading() ? 2 : -1);
    ɵɵadvance();
    ɵɵclassProp("invisible", ctx_r0.loading());
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
var _c1 = (a0) => [a0];
function ColorButtonComponent_ng_template_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "espd-message", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("args", ɵɵpureFunction1(1, _c1, ctx_r0.colors[0]));
  }
}
function ColorButtonComponent_ng_template_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "espd-message", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("args", ɵɵpureFunction1(1, _c1, ctx_r0.colors[0]));
  }
}
function ColorButtonComponent_ng_template_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "espd-message", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("args", ɵɵpureFunction1(1, _c1, ctx_r0.colors[1]));
  }
}
function ColorButtonComponent_ng_template_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "espd-message", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("config", ctx_r0.config.text);
  }
}
function ColorButtonComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵconditionalCreate(1, ColorButtonComponent_ng_template_0_Conditional_1_Template, 1, 3, "espd-message", 5);
    ɵɵelementEnd();
    ɵɵelementStart(2, "div", 6);
    ɵɵconditionalCreate(3, ColorButtonComponent_ng_template_0_Conditional_3_Template, 1, 3, "espd-message", 5);
    ɵɵconditionalCreate(4, ColorButtonComponent_ng_template_0_Conditional_4_Template, 1, 3, "espd-message", 5);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 7);
    ɵɵconditionalCreate(6, ColorButtonComponent_ng_template_0_Conditional_6_Template, 1, 1, "espd-message", 8);
    ɵɵelementEnd();
    ɵɵprojection(7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ctx_r0.styles.leftStyle);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.colors.length > 0 ? 1 : -1);
    ɵɵadvance();
    ɵɵproperty("ngStyle", ctx_r0.styles.rightStyle);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.colors.length === 1 ? 3 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.colors.length > 1 ? 4 : -1);
    ɵɵadvance(2);
    ɵɵconditional((ctx_r0.config == null ? null : ctx_r0.config.text) ? 6 : -1);
  }
}
function ColorButtonComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 9);
    ɵɵelementContainer(1, 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const content_r2 = ɵɵreference(1);
    ɵɵclassMap(ctx_r0.classes);
    ɵɵproperty("routerLink", ctx_r0.routerPath)("queryParams", ctx_r0.queryParams);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
function ColorButtonComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 11);
    ɵɵelementContainer(1, 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const content_r2 = ɵɵreference(1);
    ɵɵclassMap(ctx_r0.classes);
    ɵɵproperty("href", ctx_r0.path, ɵɵsanitizeUrl);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
function ColorButtonComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 13);
    ɵɵelement(1, "espd-message", 15);
    ɵɵelementEnd();
  }
}
function ColorButtonComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 12);
    ɵɵconditionalCreate(1, ColorButtonComponent_Conditional_4_Conditional_1_Template, 2, 0, "span", 13);
    ɵɵelementStart(2, "span", 14);
    ɵɵelementContainer(3, 10);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const content_r2 = ɵɵreference(1);
    ɵɵclassMap(ctx_r0.classes);
    ɵɵclassProp("disable-hover-decoration", ctx_r0.disableHoverTextDecoration)("loading", ctx_r0.loading);
    ɵɵproperty("type", ctx_r0.type)("disabled", ctx_r0.disabled || ctx_r0.loading);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.loading ? 1 : -1);
    ɵɵadvance();
    ɵɵclassProp("invisible", ctx_r0.loading);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
var _ButtonComponent = class _ButtonComponent {
  constructor() {
    this.injector = inject(Injector);
    this.type = "button";
    this.color = "primary";
    this.outline = false;
    this.secondary = model(false, ...ngDevMode ? [{
      debugName: "secondary"
    }] : []);
    this.small = model(false, ...ngDevMode ? [{
      debugName: "small"
    }] : []);
    this.disabled = model(false, ...ngDevMode ? [{
      debugName: "disabled"
    }] : []);
    this.loading = model(false, ...ngDevMode ? [{
      debugName: "loading"
    }] : []);
    this.rounded = model(false, ...ngDevMode ? [{
      debugName: "rounded"
    }] : []);
    this.block = false;
    this.disableHoverTextDecoration = false;
    this.target = "_self";
    this.effects = {};
  }
  onClick() {
    this.config?.click?.();
  }
  get classes() {
    return `btn btn-${this.outline || this.secondary() ? "outline-" : ""}${this.color}
		${this.block ? "btn-block" : ""} ${this.small() ? "btn-sm" : ""}
		${this.isRounded ? "rounded-circle" : ""} ${this.icon ? "btn-icon" : ""}`;
  }
  get icon() {
    if (this.color === "remove") return "rvt-close-circle-solid";
    if (this.color === "edit") return "rvt-pencil";
    return this.getIconSuffix();
  }
  get iconMesssage() {
    if (this.color === "remove") return "common.remove";
    if (this.color === "edit") return "common.edit";
    return null;
  }
  get hasTextConfig() {
    return this.isTextual(this.content);
  }
  get textConfig() {
    return this.isTextual(this.content) ? this.content : "";
  }
  get contentTemplate() {
    return this.isTemplate(this.content) ? this.content : null;
  }
  get content() {
    return this.config?.text || this.config?.content;
  }
  get isRounded() {
    return this.rounded() || !!this.icon;
  }
  ngOnChanges(changes) {
    if (changes.config?.currentValue) {
      const config = changes.config.currentValue;
      this.type = config.type || "button";
      this.color = config.color || "primary";
      ["secondary", "small", "disabled", "loading", "rounded"].forEach((field) => this.assignBooleanConfigOption(field));
      this.routerPath = config.routerPath;
      this.queryParams = config.queryParams;
      this.path = config.path;
      this.target = config.target || "_self";
    }
  }
  assignBooleanConfigOption(configKey) {
    let configValue = this.config[configKey];
    if (configValue === void 0) {
      configValue = false;
    }
    if (this.isBooleanSignal(configValue)) {
      this.effects[configKey]?.destroy();
      this.effects[configKey] = effect(() => this[configKey].set(configValue()), {
        injector: this.injector
      });
    } else {
      this[configKey].set(configValue);
    }
  }
  isBooleanSignal(value) {
    return typeof value !== "boolean";
  }
  getIconSuffix() {
    if ((this.color || "").startsWith("icon-")) {
      return this.color.substring(5) || null;
    } else {
      return null;
    }
  }
  isTextual(content) {
    return !!content && (typeof content === "string" || Object.prototype.hasOwnProperty.call(content, "key"));
  }
  isTemplate(content) {
    return !!content && content instanceof TemplateRef;
  }
};
_ButtonComponent.ɵfac = function ButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ButtonComponent)();
};
_ButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: _ButtonComponent,
  selectors: [["espd-button"]],
  hostVars: 2,
  hostBindings: function ButtonComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function ButtonComponent_click_HostBindingHandler() {
        return ctx.onClick();
      });
    }
    if (rf & 2) {
      ɵɵclassProp("block", ctx.block);
    }
  },
  inputs: {
    type: "type",
    color: "color",
    outline: "outline",
    secondary: [1, "secondary"],
    small: [1, "small"],
    disabled: [1, "disabled"],
    loading: [1, "loading"],
    rounded: [1, "rounded"],
    block: "block",
    disableHoverTextDecoration: "disableHoverTextDecoration",
    routerPath: "routerPath",
    queryParams: "queryParams",
    path: "path",
    target: "target",
    config: "config"
  },
  outputs: {
    secondary: "secondaryChange",
    small: "smallChange",
    disabled: "disabledChange",
    loading: "loadingChange",
    rounded: "roundedChange"
  },
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c02,
  decls: 5,
  vars: 1,
  consts: [["content", ""], [3, "class", "routerLink", "queryParams", "target"], [3, "class", "href", "target"], [3, "class", "disable-hover-decoration", "loading", "type", "disabled"], ["espdIcon", "rvt-close", "aria-hidden", "true"], ["aria-hidden", "true", 3, "espdIcon"], [3, "config"], [4, "ngTemplateOutlet"], ["key", "common.close", 1, "sr-only"], [1, "sr-only", 3, "key"], [3, "routerLink", "queryParams", "target"], [3, "ngTemplateOutlet"], [3, "href", "target"], [3, "type", "disabled"], ["role", "status", "aria-busy", "true", 1, "spinner-border", 3, "spinner--xs", "spinner--xxs"], [1, "d-flex", "justify-content-center"], ["role", "status", "aria-busy", "true", 1, "spinner-border"], ["key", "common.loading", 1, "sr-only"]],
  template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵtemplate(0, ButtonComponent_ng_template_0_Template, 7, 4, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      ɵɵconditionalCreate(2, ButtonComponent_Conditional_2_Template, 3, 6, "a", 1)(3, ButtonComponent_Conditional_3_Template, 3, 5, "a", 2)(4, ButtonComponent_Conditional_4_Template, 5, 12, "button", 3);
    }
    if (rf & 2) {
      ɵɵadvance(2);
      ɵɵconditional(ctx.routerPath !== void 0 ? 2 : ctx.path !== void 0 ? 3 : 4);
    }
  },
  dependencies: [CommonModule, NgTemplateOutlet, RouterModule, RouterLink, IconDirective, MessageModule, MessageComponent],
  styles: ["[_nghost-%COMP%]{display:inline-block}.block[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   button.btn-close[_ngcontent-%COMP%]{background-color:#ffffff80;border:none;padding:.5rem;line-height:.5;color:#000000b3}[_nghost-%COMP%]   button.btn-close[_ngcontent-%COMP%]:hover{background-color:var(--primary-color);color:#fff}[_nghost-%COMP%]   button.btn-close[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}[_nghost-%COMP%]   button.btn-icon[_ngcontent-%COMP%]{line-height:0;color:light-dark(#6c757d,#adb5bd);padding:.5rem}[_nghost-%COMP%]   button.btn-icon[_ngcontent-%COMP%]:hover{background:light-dark(#e9ecef,#4C5A69)}[_nghost-%COMP%]   button.btn-icon[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}.disable-hover-decoration[_ngcontent-%COMP%]:hover{text-decoration:none!important}"]
});
var ButtonComponent = _ButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{
      selector: "espd-button",
      imports: [CommonModule, RouterModule, IconDirective, MessageModule],
      template: `<ng-template #content>
	<ng-content />
	@if (color === 'close') {
		<i espdIcon="rvt-close" aria-hidden="true"></i>
	} @else if (icon) {
		<i [espdIcon]="icon" aria-hidden="true"></i>
	}
	@if (hasTextConfig) {
		<espd-message [config]="textConfig" />
	}
	<ng-container *ngTemplateOutlet="contentTemplate" />
	@if (color === 'close') {
		<espd-message key="common.close" class="sr-only" />
	} @else if (iconMesssage) {
		<espd-message [key]="iconMesssage" class="sr-only" />
	}
</ng-template>

@if (routerPath !== undefined) {
	<a [class]="classes"
			[routerLink]="routerPath"
			[queryParams]="queryParams"
			[target]="target">
		<span>
			<ng-container [ngTemplateOutlet]="content" />
		</span>
	</a>
} @else if (path !== undefined) {
	<a [class]="classes"
			[href]="path"
			[target]="target">
		<span>
			<ng-container [ngTemplateOutlet]="content" />
		</span>
	</a>
} @else {
	<button [class]="classes"
			[class.disable-hover-decoration]="disableHoverTextDecoration"
			[class.loading]="loading()"
			[type]="type"
			[disabled]="disabled() || loading()">
		<span>
			@if (loading()) {
				<span class="spinner-border" [class.spinner--xs]="!small()" [class.spinner--xxs]="small()" role="status" aria-busy="true">
					<espd-message key="common.loading" class="sr-only" />
				</span>
			}
			<span [class.invisible]="loading()" class="d-flex justify-content-center">
				<ng-container [ngTemplateOutlet]="content" />
			</span>
		</span>
	</button>
}`,
      styles: [":host{display:inline-block}:host.block{display:block}:host button.btn-close{background-color:#ffffff80;border:none;padding:.5rem;line-height:.5;color:#000000b3}:host button.btn-close:hover{background-color:var(--primary-color);color:#fff}:host button.btn-close:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}:host button.btn-icon{line-height:0;color:light-dark(#6c757d,#adb5bd);padding:.5rem}:host button.btn-icon:hover{background:light-dark(#e9ecef,#4C5A69)}:host button.btn-icon:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}.disable-hover-decoration:hover{text-decoration:none!important}\n"]
    }]
  }], null, {
    type: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    outline: [{
      type: Input
    }],
    block: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["class.block"]
    }],
    disableHoverTextDecoration: [{
      type: Input
    }],
    routerPath: [{
      type: Input
    }],
    queryParams: [{
      type: Input
    }],
    path: [{
      type: Input
    }],
    target: [{
      type: Input
    }],
    config: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _ButtonModule = class _ButtonModule {
};
_ButtonModule.ɵfac = function ButtonModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ButtonModule)();
};
_ButtonModule.ɵmod = ɵɵdefineNgModule({
  type: _ButtonModule,
  imports: [ButtonComponent],
  exports: [ButtonComponent]
});
_ButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [ButtonComponent]
});
var ButtonModule = _ButtonModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonModule, [{
    type: NgModule,
    args: [{
      imports: [ButtonComponent],
      exports: [ButtonComponent]
    }]
  }], null, null);
})();
var _ColorButtonComponent = class _ColorButtonComponent {
  constructor() {
    this.type = "button";
    this.colors = ["#000000", "#808080"];
    this.disabled = false;
    this.loading = false;
    this.disableHoverTextDecoration = false;
    this.styles = {};
    this.styles = {
      leftStyle: {},
      rightStyle: {}
    };
    this.updateColors();
  }
  get classes() {
    return "btn d-flex swatch";
  }
  ngOnChanges(changes) {
    if (changes.config?.currentValue) {
      this.type = this.config.type || this.type;
      this.colors = this.config.colors || this.colors;
      this.disabled = this.config.disabled || this.disabled;
      this.loading = this.config.loading || this.loading;
      this.routerPath = this.config.routerPath || this.routerPath;
      this.queryParams = this.config.queryParams || this.queryParams;
      this.path = this.config.path || this.path;
    }
    this.updateColors();
  }
  onClick() {
    this.config?.click?.();
  }
  updateColors() {
    if (this.colors.length === 1) {
      this.styles.leftStyle = {
        background: this.colors[0]
      };
      this.styles.rightStyle = {
        background: this.colors[0]
      };
    } else if (this.colors.length > 1) {
      this.styles.leftStyle = {
        background: this.colors[0]
      };
      this.styles.rightStyle = {
        background: this.colors[1]
      };
    }
  }
};
_ColorButtonComponent.ɵfac = function ColorButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ColorButtonComponent)();
};
_ColorButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: _ColorButtonComponent,
  selectors: [["espd-color-button"]],
  hostBindings: function ColorButtonComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function ColorButtonComponent_click_HostBindingHandler() {
        return ctx.onClick();
      });
    }
  },
  inputs: {
    type: "type",
    colors: "colors",
    disabled: "disabled",
    loading: "loading",
    disableHoverTextDecoration: "disableHoverTextDecoration",
    routerPath: "routerPath",
    queryParams: "queryParams",
    path: "path",
    config: "config"
  },
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c02,
  decls: 5,
  vars: 1,
  consts: [["content", ""], [3, "class", "routerLink", "queryParams"], [3, "class", "href"], [3, "class", "disable-hover-decoration", "loading", "type", "disabled"], [1, "swatchcolor-left", 3, "ngStyle"], ["key", "common.button.color", 1, "sr-only", 3, "args"], [1, "swatchcolor-right", 3, "ngStyle"], [1, "sr-only"], [3, "config"], [3, "routerLink", "queryParams"], [3, "ngTemplateOutlet"], [3, "href"], [3, "type", "disabled"], ["role", "status", "aria-busy", "true", 1, "spinner-border", "spinner--xs"], [1, "d-flex"], ["key", "common.loading", 1, "sr-only"]],
  template: function ColorButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵtemplate(0, ColorButtonComponent_ng_template_0_Template, 8, 6, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      ɵɵconditionalCreate(2, ColorButtonComponent_Conditional_2_Template, 2, 5, "a", 1)(3, ColorButtonComponent_Conditional_3_Template, 2, 4, "a", 2)(4, ColorButtonComponent_Conditional_4_Template, 4, 12, "button", 3);
    }
    if (rf & 2) {
      ɵɵadvance(2);
      ɵɵconditional(ctx.routerPath !== void 0 ? 2 : ctx.path !== void 0 ? 3 : 4);
    }
  },
  dependencies: [CommonModule, NgTemplateOutlet, NgStyle, RouterModule, RouterLink, MessageModule, MessageComponent],
  styles: ["a[_ngcontent-%COMP%]:focus, button[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}.swatch[_ngcontent-%COMP%]{padding:2px;border:2px solid #4C5A69;border-radius:5px;position:relative}.swatchcolor-left[_ngcontent-%COMP%]{height:40px;width:20px;border-top-left-radius:5px;border-bottom-left-radius:5px}.swatchcolor-right[_ngcontent-%COMP%]{height:40px;width:20px;border-top-right-radius:5px;border-bottom-right-radius:5px}.disable-hover-decoration[_ngcontent-%COMP%]:hover{text-decoration:none!important}"]
});
var ColorButtonComponent = _ColorButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorButtonComponent, [{
    type: Component,
    args: [{
      selector: "espd-color-button",
      imports: [CommonModule, RouterModule, MessageModule],
      template: '<ng-template #content>\n	<div class="swatchcolor-left" [ngStyle]="styles.leftStyle">\n		@if (colors.length > 0) {\n			<espd-message key="common.button.color" [args]="[colors[0]]" class="sr-only" />\n		}\n	</div>\n	<div class="swatchcolor-right" [ngStyle]="styles.rightStyle">\n		@if (colors.length === 1) {\n			<espd-message key="common.button.color" [args]="[colors[0]]" class="sr-only" />\n		}\n		@if (colors.length > 1) {\n			<espd-message key="common.button.color" [args]="[colors[1]]" class="sr-only" />\n		}\n	</div>\n	<span class="sr-only">@if (config?.text) {\n		<espd-message [config]="config!.text" />\n	}</span>\n	<ng-content />\n</ng-template>\n\n@if (routerPath !== undefined) {\n	<a [class]="classes"\n		[routerLink]="routerPath"\n		[queryParams]="queryParams">\n		<ng-container [ngTemplateOutlet]="content" />\n	</a>\n} @else if (path !== undefined) {\n	<a [class]="classes" [href]="path">\n		<ng-container [ngTemplateOutlet]="content" />\n	</a>\n} @else  {\n	<button [class]="classes"\n			[class.disable-hover-decoration]="disableHoverTextDecoration"\n			[class.loading]="loading"\n			[type]="type"\n			[disabled]="disabled || loading">\n		@if (loading) {\n			<span class="spinner-border spinner--xs" role="status" aria-busy="true">\n				<espd-message key="common.loading" class="sr-only" />\n			</span>\n		}\n		<span [class.invisible]="loading" class="d-flex">\n			<ng-container [ngTemplateOutlet]="content" />\n		</span>\n	</button>\n}',
      styles: ["a:focus,button:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}.swatch{padding:2px;border:2px solid #4C5A69;border-radius:5px;position:relative}.swatchcolor-left{height:40px;width:20px;border-top-left-radius:5px;border-bottom-left-radius:5px}.swatchcolor-right{height:40px;width:20px;border-top-right-radius:5px;border-bottom-right-radius:5px}.disable-hover-decoration:hover{text-decoration:none!important}\n"]
    }]
  }], () => [], {
    type: [{
      type: Input
    }],
    colors: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    disableHoverTextDecoration: [{
      type: Input
    }],
    routerPath: [{
      type: Input
    }],
    queryParams: [{
      type: Input
    }],
    path: [{
      type: Input
    }],
    config: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _CopyButtonComponent = class _CopyButtonComponent {
  constructor() {
    this.value = "";
    this.tooltipText = "";
    this.clipboard = inject(Clipboard);
    this.messageService = inject(MessageService);
  }
  ngOnInit() {
    this.messageService.waitFor(MODULE_NAME).subscribe(() => {
      this.tooltipText = this.messageService.get("common.copy");
    });
  }
  copy() {
    this.tooltipText = this.messageService.get("common.copied");
    this.clipboard.copy(this.value);
    setTimeout(() => {
      this.tooltipText = this.messageService.get("common.copy");
    }, 1e3);
  }
};
_CopyButtonComponent.ɵfac = function CopyButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CopyButtonComponent)();
};
_CopyButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: _CopyButtonComponent,
  selectors: [["espd-copy-button"]],
  inputs: {
    value: "value"
  },
  decls: 3,
  vars: 2,
  consts: [["color", "link", "placement", "top", 3, "click", "tooltip", "delay"], ["espdIcon", "rvt-copy"], ["key", "common.copy", 1, "sr-only"]],
  template: function CopyButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "espd-button", 0);
      ɵɵlistener("click", function CopyButtonComponent_Template_espd_button_click_0_listener() {
        return ctx.copy();
      });
      ɵɵelement(1, "i", 1)(2, "espd-message", 2);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("tooltip", ctx.tooltipText)("delay", 250);
    }
  },
  dependencies: [ButtonComponent, IconDirective, MessageModule, MessageComponent, TooltipModule, TooltipDirective],
  styles: ["[_nghost-%COMP%]{display:inline-block}"]
});
var CopyButtonComponent = _CopyButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CopyButtonComponent, [{
    type: Component,
    args: [{
      selector: "espd-copy-button",
      imports: [ButtonComponent, IconDirective, MessageModule, TooltipModule],
      template: '<espd-button color="link"\n		(click)="copy()"\n		placement="top"\n		[tooltip]="tooltipText" [delay]="250">\n	<i espdIcon="rvt-copy"></i>\n	<espd-message key="common.copy" class="sr-only" />\n</espd-button>\n',
      styles: [":host{display:inline-block}\n"]
    }]
  }], null, {
    value: [{
      type: Input
    }]
  });
})();

export {
  ComponentLoaderFactory,
  ButtonComponent,
  ButtonModule,
  ColorButtonComponent,
  CopyButtonComponent
};
/*! Bundled license information:

ngx-bootstrap/utils/fesm2022/ngx-bootstrap-utils.mjs:
  (**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
*/
//# sourceMappingURL=chunk-AKN5OHOQ.js.map
