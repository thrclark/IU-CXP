import {
  AnimationBuilder,
  CollapseDirective,
  CollapseModule
} from "./chunk-NNN7ZGX2.js";
import {
  animate,
  style
} from "./chunk-G6EKMRMM.js";
import {
  ButtonComponent,
  ComponentLoaderFactory
} from "./chunk-AKN5OHOQ.js";
import {
  IconDirective
} from "./chunk-ULNZEEHZ.js";
import {
  MessageComponent,
  MessageModule,
  MessageService
} from "./chunk-HJ33OLO5.js";
import {
  SettingService,
  SettingType
} from "./chunk-ILGIQYPZ.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterModule
} from "./chunk-VBAZ7EWY.js";
import "./chunk-AVEZ5KHV.js";
import "./chunk-XJZWXA4I.js";
import "./chunk-XEGWW4D7.js";
import {
  CommonModule,
  NgClass,
  NgTemplateOutlet
} from "./chunk-BIUBNZ56.js";
import "./chunk-AGCF4D2E.js";
import {
  ApplicationConfig,
  MODULE_NAME
} from "./chunk-XZ5YRCND.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  filter,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-WMAE3CWV.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/ngx-bootstrap/dropdown/fesm2022/ngx-bootstrap-dropdown.mjs
var _c0 = ["*"];
var _c1 = (a0) => ({
  dropdown: a0
});
var _BsDropdownConfig = class _BsDropdownConfig {
  constructor() {
    this.autoClose = true;
    this.insideClick = false;
    this.isAnimated = false;
    this.stopOnClickPropagation = false;
  }
};
_BsDropdownConfig.ɵfac = function BsDropdownConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownConfig)();
};
_BsDropdownConfig.ɵprov = ɵɵdefineInjectable({
  token: _BsDropdownConfig,
  factory: _BsDropdownConfig.ɵfac,
  providedIn: "root"
});
var BsDropdownConfig = _BsDropdownConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _BsDropdownState = class _BsDropdownState {
  constructor() {
    this.direction = "down";
    this.autoClose = true;
    this.insideClick = false;
    this.isAnimated = false;
    this.stopOnClickPropagation = false;
    this.isOpenChange = new EventEmitter();
    this.isDisabledChange = new EventEmitter();
    this.toggleClick = new EventEmitter();
    this.counts = 0;
    this.dropdownMenu = new Promise((resolve) => {
      this.resolveDropdownMenu = resolve;
    });
  }
};
_BsDropdownState.ɵfac = function BsDropdownState_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownState)();
};
_BsDropdownState.ɵprov = ɵɵdefineInjectable({
  token: _BsDropdownState,
  factory: _BsDropdownState.ɵfac,
  providedIn: "platform"
});
var BsDropdownState = _BsDropdownState;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownState, [{
    type: Injectable,
    args: [{
      providedIn: "platform"
    }]
  }], () => [], null);
})();
var DROPDOWN_ANIMATION_TIMING = "220ms cubic-bezier(0, 0, 0.2, 1)";
var dropdownAnimation = [style({
  height: 0,
  overflow: "hidden"
}), animate(DROPDOWN_ANIMATION_TIMING, style({
  height: "*",
  overflow: "hidden"
}))];
var _BsDropdownContainerComponent = class _BsDropdownContainerComponent {
  get direction() {
    return this._state.direction;
  }
  constructor(_state, cd, _renderer, _element, _builder) {
    this._state = _state;
    this.cd = cd;
    this._renderer = _renderer;
    this._element = _element;
    this.isOpen = false;
    this._factoryDropDownAnimation = _builder.build(dropdownAnimation);
    this._subscription = _state.isOpenChange.subscribe((value) => {
      this.isOpen = value;
      const dropdown = this._element.nativeElement.querySelector(".dropdown-menu");
      this._renderer.addClass(this._element.nativeElement.querySelector("div"), "open");
      if (dropdown) {
        this._renderer.addClass(dropdown, "show");
        if (dropdown.classList.contains("dropdown-menu-right") || dropdown.classList.contains("dropdown-menu-end")) {
          this._renderer.setStyle(dropdown, "left", "auto");
          this._renderer.setStyle(dropdown, "right", "0");
        }
        if (this.direction === "up") {
          this._renderer.setStyle(dropdown, "top", "auto");
          this._renderer.setStyle(dropdown, "transform", "translateY(-101%)");
        }
      }
      if (dropdown && this._state.isAnimated) {
        this._factoryDropDownAnimation.create(dropdown).play();
      }
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }
  /** @internal */
  _contains(el) {
    return this._element.nativeElement.contains(el);
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
};
_BsDropdownContainerComponent.ɵfac = function BsDropdownContainerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownContainerComponent)(ɵɵdirectiveInject(BsDropdownState), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(AnimationBuilder));
};
_BsDropdownContainerComponent.ɵcmp = ɵɵdefineComponent({
  type: _BsDropdownContainerComponent,
  selectors: [["bs-dropdown-container"]],
  hostAttrs: [2, "display", "block", "position", "absolute", "z-index", "1040"],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 9,
  consts: [[3, "ngClass"]],
  template: function BsDropdownContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0);
      ɵɵprojection(1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵclassProp("dropup", ctx.direction === "up")("show", ctx.isOpen)("open", ctx.isOpen);
      ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c1, ctx.direction === "down"));
    }
  },
  dependencies: [NgClass],
  encapsulation: 2,
  changeDetection: 0
});
var BsDropdownContainerComponent = _BsDropdownContainerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownContainerComponent, [{
    type: Component,
    args: [{
      selector: "bs-dropdown-container",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgClass],
      host: {
        style: "display:block;position: absolute;z-index: 1040"
      },
      template: `
    <div [class.dropup]="direction === 'up'"
         [ngClass]="{dropdown: direction === 'down'}"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content>
    </div>
  `
    }]
  }], () => [{
    type: BsDropdownState
  }, {
    type: ChangeDetectorRef
  }, {
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: AnimationBuilder
  }], null);
})();
var _BsDropdownDirective = class _BsDropdownDirective {
  /**
   * Indicates that dropdown will be closed on item or document click,
   * and after pressing ESC
   */
  set autoClose(value) {
    this._state.autoClose = value;
  }
  get autoClose() {
    return this._state.autoClose;
  }
  /**
   * Indicates that dropdown will be animated
   */
  set isAnimated(value) {
    this._state.isAnimated = value;
  }
  get isAnimated() {
    return this._state.isAnimated;
  }
  /**
   * This attribute indicates that the dropdown shouldn't close on inside click when autoClose is set to true
   */
  set insideClick(value) {
    this._state.insideClick = value;
  }
  get insideClick() {
    return this._state.insideClick;
  }
  /**
   * Disables dropdown toggle and hides dropdown menu if opened
   */
  set isDisabled(value) {
    this._isDisabled = value;
    this._state.isDisabledChange.emit(value);
    if (value) {
      this.hide();
    }
  }
  get isDisabled() {
    return this._isDisabled;
  }
  /**
   * Returns whether or not the popover is currently being shown
   */
  get isOpen() {
    if (this._showInline) {
      return this._isInlineOpen;
    }
    return this._dropdown.isShown;
  }
  set isOpen(value) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }
  get _showInline() {
    return !this.container;
  }
  constructor(_elementRef, _renderer, _viewContainerRef, _cis, _state, _config, _builder) {
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this._viewContainerRef = _viewContainerRef;
    this._cis = _cis;
    this._state = _state;
    this._config = _config;
    this.dropup = false;
    this._isInlineOpen = false;
    this._isDisabled = false;
    this._subscriptions = [];
    this._isInited = false;
    this._state.autoClose = this._config.autoClose;
    this._state.insideClick = this._config.insideClick;
    this._state.isAnimated = this._config.isAnimated;
    this._state.stopOnClickPropagation = this._config.stopOnClickPropagation;
    this._factoryDropDownAnimation = _builder.build(dropdownAnimation);
    this._dropdown = this._cis.createLoader(this._elementRef, this._viewContainerRef, this._renderer).provide({
      provide: BsDropdownState,
      useValue: this._state
    });
    this.onShown = this._dropdown.onShown;
    this.onHidden = this._dropdown.onHidden;
    this.isOpenChange = this._state.isOpenChange;
  }
  ngOnInit() {
    if (this._isInited) {
      return;
    }
    this._isInited = true;
    this._dropdown.listen({
      // because of dropdown inline mode
      outsideClick: false,
      triggers: this.triggers,
      show: () => this.show()
    });
    this._subscriptions.push(this._state.toggleClick.subscribe((value) => this.toggle(value)));
    this._subscriptions.push(this._state.isDisabledChange.pipe(filter((value) => value)).subscribe(() => this.hide()));
  }
  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  show() {
    if (this.isOpen || this.isDisabled) {
      return;
    }
    if (this._showInline) {
      if (!this._inlinedMenu) {
        this._state.dropdownMenu.then((dropdownMenu) => {
          this._dropdown.attachInline(dropdownMenu.viewContainer, dropdownMenu.templateRef);
          this._inlinedMenu = this._dropdown._inlineViewRef;
          this.addBs4Polyfills();
          if (this._inlinedMenu) {
            this._renderer.addClass(this._inlinedMenu.rootNodes[0].parentNode, "open");
          }
          this.playAnimation();
        }).catch();
      }
      this.addBs4Polyfills();
      this._isInlineOpen = true;
      this.onShown.emit(true);
      this._state.isOpenChange.emit(true);
      this.playAnimation();
      return;
    }
    this._state.dropdownMenu.then((dropdownMenu) => {
      const _dropup = this.dropup || typeof this.dropup !== "undefined" && this.dropup;
      this._state.direction = _dropup ? "up" : "down";
      const _placement = this.placement || (_dropup ? "top start" : "bottom start");
      this._dropdown.attach(BsDropdownContainerComponent).to(this.container).position({
        attachment: _placement
      }).show({
        content: dropdownMenu.templateRef,
        placement: _placement
      });
      this._state.isOpenChange.emit(true);
    }).catch();
  }
  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  hide() {
    if (!this.isOpen) {
      return;
    }
    if (this._showInline) {
      this.removeShowClass();
      this.removeDropupStyles();
      this._isInlineOpen = false;
      this.onHidden.emit(true);
    } else {
      this._dropdown.hide();
    }
    this._state.isOpenChange.emit(false);
  }
  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover. With parameter <code>true</code> allows toggling, with parameter <code>false</code>
   * only hides opened dropdown. Parameter usage will be removed in ngx-bootstrap v3
   */
  toggle(value) {
    if (this.isOpen || !value) {
      return this.hide();
    }
    return this.show();
  }
  /** @internal */
  _contains(event) {
    return this._elementRef.nativeElement.contains(event.target) || this._dropdown.instance && this._dropdown.instance._contains(event.target);
  }
  navigationClick(event) {
    const ref = this._elementRef.nativeElement.querySelector(".dropdown-menu");
    if (!ref) {
      return;
    }
    const firstActive = this._elementRef.nativeElement.ownerDocument.activeElement;
    const allRef = ref.querySelectorAll(".dropdown-item");
    switch (event.keyCode) {
      case 38:
        if (this._state.counts > 0) {
          allRef[--this._state.counts].focus();
        }
        break;
      case 40:
        if (this._state.counts + 1 < allRef.length) {
          if (firstActive.classList !== allRef[this._state.counts].classList) {
            allRef[this._state.counts].focus();
          } else {
            allRef[++this._state.counts].focus();
          }
        }
        break;
      default:
    }
    event.preventDefault();
  }
  ngOnDestroy() {
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
    this._dropdown.dispose();
  }
  addBs4Polyfills() {
    this.addShowClass();
    this.checkRightAlignment();
    this.addDropupStyles();
  }
  playAnimation() {
    if (this._state.isAnimated && this._inlinedMenu) {
      setTimeout(() => {
        if (this._inlinedMenu) {
          this._factoryDropDownAnimation.create(this._inlinedMenu.rootNodes[0]).play();
        }
      });
    }
  }
  addShowClass() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.addClass(this._inlinedMenu.rootNodes[0], "show");
    }
  }
  removeShowClass() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.removeClass(this._inlinedMenu.rootNodes[0], "show");
    }
  }
  checkRightAlignment() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      const isRightAligned = this._inlinedMenu.rootNodes[0].classList.contains("dropdown-menu-right") || this._inlinedMenu.rootNodes[0].classList.contains("dropdown-menu-end");
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "left", isRightAligned ? "auto" : "0");
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "right", isRightAligned ? "0" : "auto");
    }
  }
  addDropupStyles() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "top", this.dropup ? "auto" : "100%");
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "transform", this.dropup ? "translateY(-101%)" : "translateY(0)");
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], "bottom", "auto");
    }
  }
  removeDropupStyles() {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], "top");
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], "transform");
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], "bottom");
    }
  }
};
_BsDropdownDirective.ɵfac = function BsDropdownDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory), ɵɵdirectiveInject(BsDropdownState), ɵɵdirectiveInject(BsDropdownConfig), ɵɵdirectiveInject(AnimationBuilder));
};
_BsDropdownDirective.ɵdir = ɵɵdefineDirective({
  type: _BsDropdownDirective,
  selectors: [["", "bsDropdown", ""], ["", "dropdown", ""]],
  hostVars: 6,
  hostBindings: function BsDropdownDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown.arrowDown", function BsDropdownDirective_keydown_arrowDown_HostBindingHandler($event) {
        return ctx.navigationClick($event);
      })("keydown.arrowUp", function BsDropdownDirective_keydown_arrowUp_HostBindingHandler($event) {
        return ctx.navigationClick($event);
      });
    }
    if (rf & 2) {
      ɵɵclassProp("dropup", ctx.dropup)("open", ctx.isOpen)("show", ctx.isOpen);
    }
  },
  inputs: {
    placement: "placement",
    triggers: "triggers",
    container: "container",
    dropup: "dropup",
    autoClose: "autoClose",
    isAnimated: "isAnimated",
    insideClick: "insideClick",
    isDisabled: "isDisabled",
    isOpen: "isOpen"
  },
  outputs: {
    isOpenChange: "isOpenChange",
    onShown: "onShown",
    onHidden: "onHidden"
  },
  exportAs: ["bs-dropdown"],
  features: [ɵɵProvidersFeature([BsDropdownState, ComponentLoaderFactory, BsDropdownConfig])]
});
var BsDropdownDirective = _BsDropdownDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownDirective, [{
    type: Directive,
    args: [{
      selector: "[bsDropdown], [dropdown]",
      exportAs: "bs-dropdown",
      providers: [BsDropdownState, ComponentLoaderFactory, BsDropdownConfig],
      standalone: true,
      host: {
        "[class.dropup]": "dropup",
        "[class.open]": "isOpen",
        "[class.show]": "isOpen"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }, {
    type: BsDropdownState
  }, {
    type: BsDropdownConfig
  }, {
    type: AnimationBuilder
  }], {
    placement: [{
      type: Input
    }],
    triggers: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    dropup: [{
      type: Input
    }],
    autoClose: [{
      type: Input
    }],
    isAnimated: [{
      type: Input
    }],
    insideClick: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    isOpen: [{
      type: Input
    }],
    isOpenChange: [{
      type: Output
    }],
    onShown: [{
      type: Output
    }],
    onHidden: [{
      type: Output
    }],
    navigationClick: [{
      type: HostListener,
      args: ["keydown.arrowDown", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.arrowUp", ["$event"]]
    }]
  });
})();
var _BsDropdownMenuDirective = class _BsDropdownMenuDirective {
  constructor(_state, _viewContainer, _templateRef) {
    _state.resolveDropdownMenu({
      templateRef: _templateRef,
      viewContainer: _viewContainer
    });
  }
};
_BsDropdownMenuDirective.ɵfac = function BsDropdownMenuDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownMenuDirective)(ɵɵdirectiveInject(BsDropdownState), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(TemplateRef));
};
_BsDropdownMenuDirective.ɵdir = ɵɵdefineDirective({
  type: _BsDropdownMenuDirective,
  selectors: [["", "bsDropdownMenu", ""], ["", "dropdownMenu", ""]],
  exportAs: ["bs-dropdown-menu"]
});
var BsDropdownMenuDirective = _BsDropdownMenuDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownMenuDirective, [{
    type: Directive,
    args: [{
      selector: "[bsDropdownMenu],[dropdownMenu]",
      exportAs: "bs-dropdown-menu",
      standalone: true
    }]
  }], () => [{
    type: BsDropdownState
  }, {
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }], null);
})();
var _BsDropdownToggleDirective = class _BsDropdownToggleDirective {
  constructor(_changeDetectorRef, _dropdown, _element, _renderer, _state) {
    this._changeDetectorRef = _changeDetectorRef;
    this._dropdown = _dropdown;
    this._element = _element;
    this._renderer = _renderer;
    this._state = _state;
    this.isOpen = false;
    this._subscriptions = [];
    this._subscriptions.push(this._state.isOpenChange.subscribe((value) => {
      this.isOpen = value;
      if (value) {
        this._documentClickListener = this._renderer.listen("document", "click", (event) => {
          if (this._state.autoClose && event.button !== 2 && !this._element.nativeElement.contains(event.target) && !(this._state.insideClick && this._dropdown._contains(event))) {
            this._state.toggleClick.emit(false);
            this._changeDetectorRef.detectChanges();
          }
        });
        this._escKeyUpListener = this._renderer.listen(this._element.nativeElement, "keyup.esc", () => {
          if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
            this._changeDetectorRef.detectChanges();
          }
        });
      } else {
        this._documentClickListener && this._documentClickListener();
        this._escKeyUpListener && this._escKeyUpListener();
      }
    }));
    this._subscriptions.push(this._state.isDisabledChange.subscribe((value) => this.isDisabled = value || void 0));
  }
  onClick(event) {
    if (this._state.stopOnClickPropagation) {
      event.stopPropagation();
    }
    if (this.isDisabled) {
      return;
    }
    this._state.toggleClick.emit(true);
  }
  ngOnDestroy() {
    if (this._documentClickListener) {
      this._documentClickListener();
    }
    if (this._escKeyUpListener) {
      this._escKeyUpListener();
    }
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
};
_BsDropdownToggleDirective.ɵfac = function BsDropdownToggleDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownToggleDirective)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(BsDropdownDirective), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(BsDropdownState));
};
_BsDropdownToggleDirective.ɵdir = ɵɵdefineDirective({
  type: _BsDropdownToggleDirective,
  selectors: [["", "bsDropdownToggle", ""], ["", "dropdownToggle", ""]],
  hostVars: 3,
  hostBindings: function BsDropdownToggleDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function BsDropdownToggleDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("aria-haspopup", true)("disabled", ctx.isDisabled)("aria-expanded", ctx.isOpen);
    }
  },
  exportAs: ["bs-dropdown-toggle"]
});
var BsDropdownToggleDirective = _BsDropdownToggleDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownToggleDirective, [{
    type: Directive,
    args: [{
      selector: "[bsDropdownToggle],[dropdownToggle]",
      exportAs: "bs-dropdown-toggle",
      host: {
        "[attr.aria-haspopup]": "true"
      },
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: BsDropdownDirective
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: BsDropdownState
  }], {
    isDisabled: [{
      type: HostBinding,
      args: ["attr.disabled"]
    }],
    isOpen: [{
      type: HostBinding,
      args: ["attr.aria-expanded"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var _BsDropdownModule = class _BsDropdownModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _BsDropdownModule,
      providers: []
    };
  }
};
_BsDropdownModule.ɵfac = function BsDropdownModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BsDropdownModule)();
};
_BsDropdownModule.ɵmod = ɵɵdefineNgModule({
  type: _BsDropdownModule,
  imports: [BsDropdownDirective, BsDropdownContainerComponent, BsDropdownMenuDirective, BsDropdownToggleDirective],
  exports: [BsDropdownMenuDirective, BsDropdownToggleDirective, BsDropdownDirective]
});
_BsDropdownModule.ɵinj = ɵɵdefineInjector({});
var BsDropdownModule = _BsDropdownModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BsDropdownModule, [{
    type: NgModule,
    args: [{
      imports: [BsDropdownDirective, BsDropdownContainerComponent, BsDropdownMenuDirective, BsDropdownToggleDirective],
      exports: [BsDropdownMenuDirective, BsDropdownToggleDirective, BsDropdownDirective]
    }]
  }], null, null);
})();

// node_modules/espd-common/fesm2022/espd-common-header.mjs
var _c02 = ["*"];
var _c12 = ["rla"];
function HeaderNavItemComponent_Conditional_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HeaderNavItemComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 2, 1);
    ɵɵtemplate(2, HeaderNavItemComponent_Conditional_0_ng_container_2_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const content_r2 = ɵɵreference(3);
    ɵɵproperty("routerLink", ctx_r0.route)("queryParams", ctx_r0.queryParams)("routerLinkActiveOptions", ctx_r0.isActiveMatchOptions);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
function HeaderNavItemComponent_Conditional_1_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HeaderNavItemComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 4);
    ɵɵtemplate(1, HeaderNavItemComponent_Conditional_1_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    const content_r2 = ɵɵreference(3);
    ɵɵproperty("href", ctx_r0.href, ɵɵsanitizeUrl);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
function HeaderNavItemComponent_Conditional_1_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HeaderNavItemComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 5);
    ɵɵtemplate(1, HeaderNavItemComponent_Conditional_1_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵnextContext(2);
    const content_r2 = ɵɵreference(3);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
function HeaderNavItemComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, HeaderNavItemComponent_Conditional_1_Conditional_0_Template, 2, 2, "a", 4)(1, HeaderNavItemComponent_Conditional_1_Conditional_1_Template, 2, 1, "button", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.href ? 0 : 1);
  }
}
function HeaderNavItemComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function HeaderNavListComponent_ul_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 4);
    ɵɵprojection(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassProp("dropdown-menu-right", ctx_r0.dropRight);
    ɵɵproperty("id", ɵɵinterpolate1("header-nav-list-", ctx_r0.id));
  }
}
var _c2 = ["mobileMenuRef"];
var _c3 = [[["", "desktop-menu", ""]], [["", "mobile-menu", ""]]];
var _c4 = ["[desktop-menu]", "[mobile-menu]"];
var _c5 = (a0) => ({
  "d-none d-md-inline": a0
});
function HeaderComponent_ng_template_0_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("src", ctx_r0.logoMobileUrl, ɵɵsanitizeUrl);
  }
}
function HeaderComponent_ng_template_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 7);
    ɵɵconditionalCreate(1, HeaderComponent_ng_template_0_Conditional_1_Conditional_1_Template, 1, 1, "img", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("src", ctx_r0.logoUrl, ɵɵsanitizeUrl)("ngClass", ɵɵpureFunction1(3, _c5, !!ctx_r0.logoMobileUrl));
    ɵɵadvance();
    ɵɵconditional(ctx_r0.logoMobileUrl ? 1 : -1);
  }
}
function HeaderComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵconditionalCreate(1, HeaderComponent_ng_template_0_Conditional_1_Template, 2, 5);
    ɵɵelementStart(2, "div", 5)(3, "h1");
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 6);
    ɵɵtext(6);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.logoDisplay ? 1 : -1);
    ɵɵadvance();
    ɵɵclassProp("ml-0", !ctx_r0.logoDisplay);
    ɵɵadvance();
    ɵɵclassProp("sr-only", !ctx_r0.applicationNameDisplay);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.applicationName);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.subtitle);
  }
}
function HeaderComponent_Conditional_4_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HeaderComponent_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 11);
    ɵɵtemplate(1, HeaderComponent_Conditional_4_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    const lockupContent_r3 = ɵɵreference(1);
    ɵɵproperty("routerLink", ctx_r0.lockupRoute);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", lockupContent_r3);
  }
}
function HeaderComponent_Conditional_4_Conditional_4_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HeaderComponent_Conditional_4_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 18);
    ɵɵtemplate(1, HeaderComponent_Conditional_4_Conditional_4_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    const lockupContent_r3 = ɵɵreference(1);
    ɵɵproperty("href", ctx_r0.lockupHref, ɵɵsanitizeUrl);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", lockupContent_r3);
  }
}
function HeaderComponent_Conditional_4_Conditional_4_Conditional_1_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(5);
    ɵɵproperty("src", ctx_r0.logoMobileUrl, ɵɵsanitizeUrl);
  }
}
function HeaderComponent_Conditional_4_Conditional_4_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 7);
    ɵɵconditionalCreate(1, HeaderComponent_Conditional_4_Conditional_4_Conditional_1_Conditional_1_Conditional_1_Template, 1, 1, "img", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(4);
    ɵɵproperty("src", ctx_r0.logoUrl, ɵɵsanitizeUrl)("ngClass", ɵɵpureFunction1(3, _c5, !!ctx_r0.logoMobileUrl));
    ɵɵadvance();
    ɵɵconditional(ctx_r0.logoMobileUrl ? 1 : -1);
  }
}
function HeaderComponent_Conditional_4_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵconditionalCreate(1, HeaderComponent_Conditional_4_Conditional_4_Conditional_1_Conditional_1_Template, 2, 5);
    ɵɵelementStart(2, "div", 5)(3, "h1");
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 6);
    ɵɵtext(6);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.logoDisplay ? 1 : -1);
    ɵɵadvance();
    ɵɵclassProp("ml-0", !ctx_r0.logoDisplay);
    ɵɵadvance();
    ɵɵclassProp("sr-only", !ctx_r0.applicationNameDisplay);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.applicationName);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.subtitle);
  }
}
function HeaderComponent_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, HeaderComponent_Conditional_4_Conditional_4_Conditional_0_Template, 2, 2, "a", 18)(1, HeaderComponent_Conditional_4_Conditional_4_Conditional_1_Template, 7, 7, "div", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵconditional(ctx_r0.lockupHref !== void 0 ? 0 : 1);
  }
}
function HeaderComponent_Conditional_4_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.user.initials, " ");
  }
}
function HeaderComponent_Conditional_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵconditionalCreate(1, HeaderComponent_Conditional_4_Conditional_8_Conditional_1_Template, 2, 1, "div", 19);
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.user.initials ? 1 : -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.user.username, " ");
  }
}
function HeaderComponent_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 20);
    ɵɵlistener("click", function HeaderComponent_Conditional_4_Conditional_9_Template_button_click_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.mobileClicked());
    });
    ɵɵelement(1, "i", 21)(2, "espd-message", 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵattribute("aria-expanded", ctx_r0.mobileMenuOpen);
    ɵɵadvance();
    ɵɵproperty("espdIcon", ctx_r0.mobileMenuOpen ? "rvt-close" : "rvt-menu");
  }
}
function HeaderComponent_Conditional_4_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.user.initials, " ");
  }
}
function HeaderComponent_Conditional_4_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵconditionalCreate(1, HeaderComponent_Conditional_4_Conditional_13_Conditional_1_Template, 2, 1, "div", 19);
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.user.initials ? 1 : -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.user.username, " ");
  }
}
function HeaderComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3)(1, "div", 9)(2, "div", 10);
    ɵɵlistener("click", function HeaderComponent_Conditional_4_Template_div_click_2_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.headerClicked());
    });
    ɵɵconditionalCreate(3, HeaderComponent_Conditional_4_Conditional_3_Template, 2, 2, "a", 11)(4, HeaderComponent_Conditional_4_Conditional_4_Template, 2, 1);
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 12)(6, "div", 13);
    ɵɵprojection(7);
    ɵɵconditionalCreate(8, HeaderComponent_Conditional_4_Conditional_8_Template, 3, 2, "div", 14);
    ɵɵelementEnd();
    ɵɵconditionalCreate(9, HeaderComponent_Conditional_4_Conditional_9_Template, 3, 2, "button", 15);
    ɵɵelementStart(10, "div", 16, 1);
    ɵɵprojection(12, 1);
    ɵɵconditionalCreate(13, HeaderComponent_Conditional_4_Conditional_13_Template, 3, 2, "div", 14);
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵconditional(ctx_r0.lockupRoute !== void 0 ? 3 : 4);
    ɵɵadvance(5);
    ɵɵconditional(ctx_r0.user ? 8 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.hasMobileContent ? 9 : -1);
    ɵɵadvance();
    ɵɵproperty("collapse", !ctx_r0.mobileMenuOpen);
    ɵɵadvance(3);
    ɵɵconditional(ctx_r0.user ? 13 : -1);
  }
}
var _HeaderNavComponent = class _HeaderNavComponent {
  constructor() {
    this.linkActiveOptions = _HeaderNavComponent.defaultActiveMatchOptions;
    this.ariaLabel = "";
    this.matchOptions = _HeaderNavComponent.defaultActiveMatchOptions;
    this.messageService = inject(MessageService);
  }
  ngOnChanges() {
    this.matchOptions = __spreadValues(__spreadValues({}, _HeaderNavComponent.defaultActiveMatchOptions), this.linkActiveOptions);
    this.ariaLabel = this.messageService.evaluate(this.label || "");
  }
  get isActiveMatchOptions() {
    return this.matchOptions;
  }
};
_HeaderNavComponent.defaultActiveMatchOptions = {
  fragment: "ignored",
  matrixParams: "ignored",
  paths: "exact",
  queryParams: "ignored"
};
_HeaderNavComponent.ɵfac = function HeaderNavComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HeaderNavComponent)();
};
_HeaderNavComponent.ɵcmp = ɵɵdefineComponent({
  type: _HeaderNavComponent,
  selectors: [["espd-header-nav"]],
  inputs: {
    label: "label",
    linkActiveOptions: "linkActiveOptions"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c02,
  decls: 3,
  vars: 1,
  template: function HeaderNavComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "nav")(1, "ul");
      ɵɵprojection(2);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵattribute("aria-label", ctx.ariaLabel);
    }
  },
  styles: ["[_nghost-%COMP%]{display:block}nav[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin:0;padding:0}"]
});
var HeaderNavComponent = _HeaderNavComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderNavComponent, [{
    type: Component,
    args: [{
      selector: "espd-header-nav",
      standalone: false,
      template: '<nav [attr.aria-label]="ariaLabel">\n	<ul>\n		<ng-content />\n	</ul>\n</nav>',
      styles: [":host{display:block}nav>ul{display:flex;flex-direction:row;align-items:center;margin:0;padding:0}\n"]
    }]
  }], null, {
    label: [{
      type: Input
    }],
    linkActiveOptions: [{
      type: Input
    }]
  });
})();
var _HeaderNavItemComponent = class _HeaderNavItemComponent {
  constructor() {
    this.queryParams = null;
    this.linkActiveOptions = {};
    this.nested = false;
    this.parentHeaderNav = inject(HeaderNavComponent);
    this.isActiveMatchOptions = HeaderNavComponent.defaultActiveMatchOptions;
  }
  get role() {
    return "listitem";
  }
  ngOnChanges() {
    this.isActiveMatchOptions = __spreadValues(__spreadValues({}, this.parentHeaderNav.isActiveMatchOptions), this.linkActiveOptions);
  }
  get isActive() {
    return this.routerLinkActive?.isActive || false;
  }
};
_HeaderNavItemComponent.ɵfac = function HeaderNavItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HeaderNavItemComponent)();
};
_HeaderNavItemComponent.ɵcmp = ɵɵdefineComponent({
  type: _HeaderNavItemComponent,
  selectors: [["espd-header-nav-item"]],
  viewQuery: function HeaderNavItemComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c12, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.routerLinkActive = _t.first);
    }
  },
  hostVars: 3,
  hostBindings: function HeaderNavItemComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("role", ctx.role);
      ɵɵclassProp("nested", ctx.nested);
    }
  },
  inputs: {
    route: "route",
    queryParams: "queryParams",
    href: "href",
    linkActiveOptions: "linkActiveOptions"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c02,
  decls: 4,
  vars: 1,
  consts: [["content", ""], ["rla", "routerLinkActive"], ["routerLinkActive", "", "ariaCurrentWhenActive", "page", 3, "routerLink", "queryParams", "routerLinkActiveOptions"], [4, "ngTemplateOutlet"], [3, "href"], ["type", "button", 1, "font-weight-normal"]],
  template: function HeaderNavItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵconditionalCreate(0, HeaderNavItemComponent_Conditional_0_Template, 3, 4, "a", 2)(1, HeaderNavItemComponent_Conditional_1_Template, 2, 1);
      ɵɵtemplate(2, HeaderNavItemComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      ɵɵconditional(ctx.route ? 0 : 1);
    }
  },
  dependencies: [NgTemplateOutlet, RouterLink, RouterLinkActive],
  styles: ['[_nghost-%COMP%]{display:block}espd-header-nav-list + [_nghost-%COMP%], espd-header-nav-item + [_nghost-%COMP%]:not(.nested){margin-left:1rem}a[_ngcontent-%COMP%], button[_ngcontent-%COMP%], .dropdown-toggle[_ngcontent-%COMP%]{display:block;color:var(--header-bar-text-color);padding:0;margin:0;font-size:inherit;line-height:1.5;box-shadow:none;border:none;background-color:transparent;position:relative}a[aria-current=page][_ngcontent-%COMP%]:after, button[aria-current=page][_ngcontent-%COMP%]:after, .dropdown-toggle[aria-current=page][_ngcontent-%COMP%]:after{content:"";display:block;background-color:var(--primary-color);width:100%;height:.3rem;position:absolute;bottom:-1.65rem}a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:focus, button[_ngcontent-%COMP%]:hover, button[_ngcontent-%COMP%]:focus, .dropdown-toggle[_ngcontent-%COMP%]:hover, .dropdown-toggle[_ngcontent-%COMP%]:focus{outline:.125rem solid var(--primary-color);outline-offset:.125rem;text-decoration:none}.nested[_nghost-%COMP%]   a[_ngcontent-%COMP%], .nested[_nghost-%COMP%]   button[_ngcontent-%COMP%]{width:100%;padding:.375rem 1rem;font-size:.875rem;text-align:left;color:inherit}.nested[_nghost-%COMP%]   a[_ngcontent-%COMP%]:hover, .nested[_nghost-%COMP%]   a[_ngcontent-%COMP%]:focus, .nested[_nghost-%COMP%]   button[_ngcontent-%COMP%]:hover, .nested[_nghost-%COMP%]   button[_ngcontent-%COMP%]:focus{outline:none;background-color:var(--primary-color);color:#fff!important}.nested[_nghost-%COMP%]   a[aria-current=page][_ngcontent-%COMP%]:after, .nested[_nghost-%COMP%]   button[aria-current=page][_ngcontent-%COMP%]:after{height:100%;width:.3rem;bottom:auto;top:0;left:0}']
});
var HeaderNavItemComponent = _HeaderNavItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderNavItemComponent, [{
    type: Component,
    args: [{
      selector: "espd-header-nav-item",
      standalone: false,
      template: '@if (route) {\n	<a [routerLink]="route"\n			[queryParams]="queryParams"\n			routerLinkActive\n			[routerLinkActiveOptions]="isActiveMatchOptions"\n			#rla="routerLinkActive"\n			ariaCurrentWhenActive="page">\n		<ng-container *ngTemplateOutlet="content" />\n	</a>\n} @else {\n	@if (href) {\n		<a [href]="href">\n			<ng-container *ngTemplateOutlet="content" />\n		</a>\n	} @else {\n		<button type="button" class="font-weight-normal">\n			<ng-container *ngTemplateOutlet="content" />\n		</button>\n	}\n}\n\n<ng-template #content>\n	<ng-content />\n</ng-template>',
      styles: [':host{display:block}espd-header-nav-list+:host,espd-header-nav-item+:host:not(.nested){margin-left:1rem}a,button,.dropdown-toggle{display:block;color:var(--header-bar-text-color);padding:0;margin:0;font-size:inherit;line-height:1.5;box-shadow:none;border:none;background-color:transparent;position:relative}a[aria-current=page]:after,button[aria-current=page]:after,.dropdown-toggle[aria-current=page]:after{content:"";display:block;background-color:var(--primary-color);width:100%;height:.3rem;position:absolute;bottom:-1.65rem}a:hover,a:focus,button:hover,button:focus,.dropdown-toggle:hover,.dropdown-toggle:focus{outline:.125rem solid var(--primary-color);outline-offset:.125rem;text-decoration:none}:host.nested a,:host.nested button{width:100%;padding:.375rem 1rem;font-size:.875rem;text-align:left;color:inherit}:host.nested a:hover,:host.nested a:focus,:host.nested button:hover,:host.nested button:focus{outline:none;background-color:var(--primary-color);color:#fff!important}:host.nested a[aria-current=page]:after,:host.nested button[aria-current=page]:after{height:100%;width:.3rem;bottom:auto;top:0;left:0}\n']
    }]
  }], null, {
    route: [{
      type: Input
    }],
    queryParams: [{
      type: Input
    }],
    href: [{
      type: Input
    }],
    linkActiveOptions: [{
      type: Input
    }],
    nested: [{
      type: HostBinding,
      args: ["class.nested"]
    }],
    role: [{
      type: HostBinding,
      args: ["attr.role"]
    }],
    routerLinkActive: [{
      type: ViewChild,
      args: ["rla"]
    }]
  });
})();
var _HeaderNavListComponent = class _HeaderNavListComponent {
  get role() {
    return "listitem";
  }
  constructor() {
    this.label = "";
    this.dropRight = false;
    this.id = _HeaderNavListComponent.nextId++;
  }
  ngAfterContentInit() {
    this.updateChildren();
    this.children.changes.subscribe(() => this.updateChildren());
  }
  updateChildren() {
    setTimeout(() => {
      this.children.forEach((c) => {
        c.nested = true;
      });
    });
  }
};
_HeaderNavListComponent.nextId = 0;
_HeaderNavListComponent.ɵfac = function HeaderNavListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HeaderNavListComponent)();
};
_HeaderNavListComponent.ɵcmp = ɵɵdefineComponent({
  type: _HeaderNavListComponent,
  selectors: [["espd-header-nav-list"]],
  contentQueries: function HeaderNavListComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, HeaderNavItemComponent, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  hostVars: 1,
  hostBindings: function HeaderNavListComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("role", ctx.role);
    }
  },
  inputs: {
    label: "label",
    dropRight: "dropRight"
  },
  standalone: false,
  ngContentSelectors: _c02,
  decls: 4,
  vars: 2,
  consts: [["dropdown", "", 1, "dropdown"], ["type", "button", "dropdownToggle", "", 1, "dropdown-toggle"], [3, "config"], ["class", "dropdown-menu", "role", "menu", 3, "dropdown-menu-right", "id", 4, "dropdownMenu"], ["role", "menu", 1, "dropdown-menu", 3, "id"]],
  template: function HeaderNavListComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0)(1, "button", 1);
      ɵɵelement(2, "espd-message", 2);
      ɵɵelementEnd();
      ɵɵtemplate(3, HeaderNavListComponent_ul_3_Template, 2, 4, "ul", 3);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵattribute("aria-controls", "header-nav-list-" + ctx.id);
      ɵɵadvance();
      ɵɵproperty("config", ctx.label);
    }
  },
  dependencies: [BsDropdownMenuDirective, BsDropdownToggleDirective, BsDropdownDirective, MessageComponent],
  styles: ["[_nghost-%COMP%]{display:block}espd-header-nav-list + [_nghost-%COMP%], espd-header-nav-item + [_nghost-%COMP%]{margin-left:1rem}.dropdown-toggle[_ngcontent-%COMP%]{background:transparent;border:none;padding:0;overflow:visible;color:var(--header-bar-text-color)}.dropdown-toggle[_ngcontent-%COMP%]:hover, .dropdown-toggle[_ngcontent-%COMP%]:focus{outline:.125rem solid var(--primary-color);outline-offset:.125rem;text-decoration:none}.dropdown-toggle[_ngcontent-%COMP%]:hover:after, .dropdown-toggle[_ngcontent-%COMP%]:focus:after{background-color:var(--primary-color);color:#fff}.dropdown-toggle[_ngcontent-%COMP%]:after{width:1.25rem;height:1.25rem;line-height:1.25rem;font-size:.75rem;border-radius:999rem;background:#4c5a69;color:#707784}.dropdown-menu-right[_ngcontent-%COMP%]{right:0!important;left:auto!important}"]
});
var HeaderNavListComponent = _HeaderNavListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderNavListComponent, [{
    type: Component,
    args: [{
      selector: "espd-header-nav-list",
      standalone: false,
      template: `<div class="dropdown" dropdown>
	<button class="dropdown-toggle" type="button" [attr.aria-controls]="'header-nav-list-' + id" dropdownToggle>
		<espd-message [config]="label" />
	</button>
	<ul *dropdownMenu
			class="dropdown-menu"
			[class.dropdown-menu-right]="dropRight"
			role="menu"
			id="header-nav-list-{{id}}">
		<ng-content />
	</ul>
</div>`,
      styles: [":host{display:block}espd-header-nav-list+:host,espd-header-nav-item+:host{margin-left:1rem}.dropdown-toggle{background:transparent;border:none;padding:0;overflow:visible;color:var(--header-bar-text-color)}.dropdown-toggle:hover,.dropdown-toggle:focus{outline:.125rem solid var(--primary-color);outline-offset:.125rem;text-decoration:none}.dropdown-toggle:hover:after,.dropdown-toggle:focus:after{background-color:var(--primary-color);color:#fff}.dropdown-toggle:after{width:1.25rem;height:1.25rem;line-height:1.25rem;font-size:.75rem;border-radius:999rem;background:#4c5a69;color:#707784}.dropdown-menu-right{right:0!important;left:auto!important}\n"]
    }]
  }], () => [], {
    label: [{
      type: Input
    }],
    dropRight: [{
      type: Input
    }],
    role: [{
      type: HostBinding,
      args: ["attr.role"]
    }],
    children: [{
      type: ContentChildren,
      args: [HeaderNavItemComponent]
    }]
  });
})();
var _HeaderComponent = class _HeaderComponent {
  constructor(settingService, appConfig) {
    this.applicationNameDisplay = true;
    this.subtitle = "";
    this.customHeaderOnly = false;
    this.lockupClicked = new EventEmitter();
    this.mobileMenuClicked = new EventEmitter();
    this.logoDisplay = true;
    this.customHeader = "";
    this.mobileMenuOpen = false;
    this.changeDetector = inject(ChangeDetectorRef);
    settingService.waitFor(MODULE_NAME).subscribe(() => {
      this.customHeader = settingService.get(SettingType.CUSTOM_HEADER) || "";
      this.applicationName = settingService.get(appConfig.applicationNameSetting);
      this.logoUrl = settingService.get(SettingType.LOGO_URL);
      this.logoMobileUrl = settingService.get(SettingType.LOGO_URL_MOBILE);
      this.logoDisplay = settingService.get(SettingType.LOGO_DISPLAY);
    });
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
  get hasMobileContent() {
    return !!this.mobileMenuRef?.nativeElement.children.length;
  }
  headerClicked() {
    this.lockupClicked.emit();
  }
  mobileClicked() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.mobileMenuClicked.emit(this.mobileMenuOpen);
  }
  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.mobileMenuClicked.emit(this.mobileMenuOpen);
  }
};
_HeaderComponent.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HeaderComponent)(ɵɵdirectiveInject(SettingService), ɵɵdirectiveInject(ApplicationConfig));
};
_HeaderComponent.ɵcmp = ɵɵdefineComponent({
  type: _HeaderComponent,
  selectors: [["espd-header"]],
  viewQuery: function HeaderComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.mobileMenuRef = _t.first);
    }
  },
  inputs: {
    applicationNameDisplay: "applicationNameDisplay",
    subtitle: "subtitle",
    lockupRoute: "lockupRoute",
    lockupHref: "lockupHref",
    customHeaderOnly: "customHeaderOnly",
    user: "user"
  },
  outputs: {
    lockupClicked: "lockupClicked",
    mobileMenuClicked: "mobileMenuClicked"
  },
  exportAs: ["header"],
  standalone: false,
  ngContentSelectors: _c4,
  decls: 5,
  vars: 2,
  consts: [["lockupContent", ""], ["mobileMenuRef", ""], [3, "innerHTML"], [1, "wrapper"], [1, "lockup"], [1, "brand-name"], [1, "subtitle"], ["loading", "lazy", "alt", "", 3, "src", "ngClass"], ["loading", "lazy", "alt", "", 1, "d-md-none", 3, "src"], [1, "container"], [3, "click"], [3, "routerLink"], [1, "d-flex", "ml-3"], [1, "d-none", "d-lg-flex", "flex-row", "align-items-center"], [1, "avatar"], ["type", "button", "aria-controls", "navbarNavDropdown", 1, "toggler", "d-lg-none"], ["id", "navbarNavDropdown", 1, "navbar-collapse", "d-lg-none", "shadow", 3, "collapse"], [4, "ngTemplateOutlet"], [3, "href"], [1, "initials"], ["type", "button", "aria-controls", "navbarNavDropdown", 1, "toggler", "d-lg-none", 3, "click"], [3, "espdIcon"], ["key", "common.header.toggleMenu.sr", 1, "sr-only"]],
  template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c3);
      ɵɵtemplate(0, HeaderComponent_ng_template_0_Template, 7, 7, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      ɵɵelementStart(2, "header");
      ɵɵelement(3, "div", 2);
      ɵɵconditionalCreate(4, HeaderComponent_Conditional_4_Template, 14, 5, "div", 3);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵproperty("innerHTML", ctx.customHeader, ɵɵsanitizeHtml);
      ɵɵadvance();
      ɵɵconditional(!ctx.customHeaderOnly ? 4 : -1);
    }
  },
  dependencies: [NgClass, NgTemplateOutlet, RouterLink, CollapseDirective, IconDirective, MessageComponent],
  styles: [".wrapper[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:1rem;background-color:var(--header-bar-background-color);box-shadow:0 .1875rem .375rem #24314212;position:relative;font-size:.875rem}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;max-width:86.25rem;padding-left:1.5rem;padding-right:1.5rem;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:last-child, .wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:last-child > div[_ngcontent-%COMP%]{justify-content:end;flex-grow:1}.wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--header-bar-text-color)}.wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus{color:var(--primary-color);text-decoration:none}.wrapper[_ngcontent-%COMP%]   .lockup[_ngcontent-%COMP%]{display:flex;align-items:center;color:var(--header-bar-text-color)}.wrapper[_ngcontent-%COMP%]   .brand-name[_ngcontent-%COMP%]{margin-left:1rem;display:flex;flex-direction:column}.wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1rem;line-height:1.1;font-weight:700;margin-bottom:0;text-transform:var(--app-name-transform)}.wrapper[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-size:.75rem;line-height:1.1;margin-top:.125rem;text-transform:var(--subtitle-transform)}.wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:2.125rem;width:auto}.wrapper[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]{color:var(--header-bar-text-color);display:flex;align-items:center;margin-left:1.5rem}.wrapper[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]   .initials[_ngcontent-%COMP%]{align-items:center;background-color:var(--accent-color);border-radius:999rem;color:#fff;display:flex;flex-shrink:0;font-weight:700;justify-content:center;overflow:hidden;height:2rem;width:2rem;margin-right:.5rem}.wrapper[_ngcontent-%COMP%]   #navbarNavDropdown[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]{margin-left:0}.wrapper[_ngcontent-%COMP%]   .toggler[_ngcontent-%COMP%]{background:#e2e7e9;border:none;border-radius:999rem;display:inline-flex;align-items:center;justify-content:center;color:#222529;width:2rem;height:2rem;transition:box-shadow .15s ease-in-out}.wrapper[_ngcontent-%COMP%]   .toggler[_ngcontent-%COMP%]:hover{text-decoration:none}.wrapper[_ngcontent-%COMP%]   .toggler[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}.wrapper[_ngcontent-%COMP%]   .toggler[aria-expanded=true][_ngcontent-%COMP%]{background:var(--primary-color-dark-15);color:#fff}.wrapper[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]{background:#f8f9fa;position:absolute;top:66px;width:100%;border-top:1px solid #e2e7e9;left:0;padding:1.5rem;z-index:1}@media (min-width: 768px){.wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:2.75rem}.wrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.25rem}.wrapper[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-size:.875rem}.wrapper[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]{top:76px}}"]
});
var HeaderComponent = _HeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{
      selector: "espd-header",
      exportAs: "header",
      standalone: false,
      template: `<ng-template #lockupContent>
	<div class="lockup">
		@if (logoDisplay) {
			<img [src]="logoUrl"			 loading="lazy" alt="" [ngClass]="{'d-none d-md-inline': !!logoMobileUrl}">
			@if (logoMobileUrl) {
				<img [src]="logoMobileUrl" loading="lazy" alt="" class="d-md-none">
			}
		}
		<div class="brand-name" [class.ml-0]="!logoDisplay">
			<h1 [class.sr-only]="!applicationNameDisplay">{{applicationName}}</h1>
			<div class="subtitle">{{subtitle}}</div>
		</div>
	</div>
</ng-template>

<header>
	<div [innerHTML]="customHeader"></div>
	@if (!customHeaderOnly) {
		<div class="wrapper">
			<div class="container">
				<div (click)="headerClicked()">
					@if (lockupRoute !== undefined) {
						<a [routerLink]="lockupRoute">
							<ng-container *ngTemplateOutlet="lockupContent" />
						</a>
					} @else {
						@if (lockupHref !== undefined) {
							<a [href]="lockupHref">
								<ng-container *ngTemplateOutlet="lockupContent" />
							</a>
						} @else {
							<div class="lockup">
								@if (logoDisplay) {
									<img [src]="logoUrl"			 loading="lazy" alt="" [ngClass]="{'d-none d-md-inline': !!logoMobileUrl}">
									@if (logoMobileUrl) {
										<img [src]="logoMobileUrl" loading="lazy" alt="" class="d-md-none">
									}
								}
								<div class="brand-name" [class.ml-0]="!logoDisplay">
									<h1 [class.sr-only]="!applicationNameDisplay">{{applicationName}}</h1>
									<div class="subtitle">{{subtitle}}</div>
								</div>
							</div>
						}
					}
				</div>
				<div class="d-flex ml-3">
					<div class="d-none d-lg-flex flex-row align-items-center">
						<ng-content select="[desktop-menu]" />
						@if (user) {
							<div class="avatar">
								@if (user.initials) {
									<div class="initials">
										{{user.initials}}
									</div>
								}
								{{user.username}}
							</div>
						}
					</div>
					@if (hasMobileContent) {
						<button
							class="toggler d-lg-none"
							type="button"
							aria-controls="navbarNavDropdown"
							[attr.aria-expanded]="mobileMenuOpen"
							(click)="mobileClicked()">
							<i [espdIcon]="mobileMenuOpen ? 'rvt-close' : 'rvt-menu'"></i>
							<espd-message class="sr-only" key="common.header.toggleMenu.sr" />
						</button>
					}
					<div #mobileMenuRef class="navbar-collapse d-lg-none shadow" id="navbarNavDropdown" [collapse]="!mobileMenuOpen">
						<ng-content select="[mobile-menu]" />
						@if (user) {
							<div class="avatar">
								@if (user.initials) {
									<div class="initials">
										{{user.initials}}
									</div>
								}
								{{user.username}}
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	}
</header>`,
      styles: [".wrapper{padding-top:1rem;padding-bottom:1rem;background-color:var(--header-bar-background-color);box-shadow:0 .1875rem .375rem #24314212;position:relative;font-size:.875rem}.wrapper .container{margin-left:auto;margin-right:auto;max-width:86.25rem;padding-left:1.5rem;padding-right:1.5rem;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.wrapper .container>:last-child,.wrapper .container>:last-child>div{justify-content:end;flex-grow:1}.wrapper a{color:var(--header-bar-text-color)}.wrapper a:hover,.wrapper a:focus{color:var(--primary-color);text-decoration:none}.wrapper .lockup{display:flex;align-items:center;color:var(--header-bar-text-color)}.wrapper .brand-name{margin-left:1rem;display:flex;flex-direction:column}.wrapper h1{font-size:1rem;line-height:1.1;font-weight:700;margin-bottom:0;text-transform:var(--app-name-transform)}.wrapper .subtitle{font-size:.75rem;line-height:1.1;margin-top:.125rem;text-transform:var(--subtitle-transform)}.wrapper img{height:2.125rem;width:auto}.wrapper .avatar{color:var(--header-bar-text-color);display:flex;align-items:center;margin-left:1.5rem}.wrapper .avatar .initials{align-items:center;background-color:var(--accent-color);border-radius:999rem;color:#fff;display:flex;flex-shrink:0;font-weight:700;justify-content:center;overflow:hidden;height:2rem;width:2rem;margin-right:.5rem}.wrapper #navbarNavDropdown .avatar{margin-left:0}.wrapper .toggler{background:#e2e7e9;border:none;border-radius:999rem;display:inline-flex;align-items:center;justify-content:center;color:#222529;width:2rem;height:2rem;transition:box-shadow .15s ease-in-out}.wrapper .toggler:hover{text-decoration:none}.wrapper .toggler:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}.wrapper .toggler[aria-expanded=true]{background:var(--primary-color-dark-15);color:#fff}.wrapper .navbar-collapse{background:#f8f9fa;position:absolute;top:66px;width:100%;border-top:1px solid #e2e7e9;left:0;padding:1.5rem;z-index:1}@media (min-width: 768px){.wrapper img{height:2.75rem}.wrapper h1{font-size:1.25rem}.wrapper .subtitle{font-size:.875rem}.wrapper .navbar-collapse{top:76px}}\n"]
    }]
  }], () => [{
    type: SettingService
  }, {
    type: ApplicationConfig
  }], {
    applicationNameDisplay: [{
      type: Input
    }],
    subtitle: [{
      type: Input
    }],
    lockupRoute: [{
      type: Input
    }],
    lockupHref: [{
      type: Input
    }],
    customHeaderOnly: [{
      type: Input
    }],
    user: [{
      type: Input
    }],
    lockupClicked: [{
      type: Output
    }],
    mobileMenuClicked: [{
      type: Output
    }],
    mobileMenuRef: [{
      type: ViewChild,
      args: ["mobileMenuRef"]
    }]
  });
})();
var _HeaderModule = class _HeaderModule {
};
_HeaderModule.ɵfac = function HeaderModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HeaderModule)();
};
_HeaderModule.ɵmod = ɵɵdefineNgModule({
  type: _HeaderModule,
  declarations: [HeaderComponent, HeaderNavComponent, HeaderNavListComponent, HeaderNavItemComponent],
  imports: [CommonModule, RouterModule, BsDropdownModule, CollapseModule, ButtonComponent, IconDirective, MessageModule],
  exports: [HeaderComponent, HeaderNavComponent, HeaderNavListComponent, HeaderNavItemComponent]
});
_HeaderModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, RouterModule, BsDropdownModule, CollapseModule, ButtonComponent, MessageModule]
});
var HeaderModule = _HeaderModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderModule, [{
    type: NgModule,
    args: [{
      declarations: [HeaderComponent, HeaderNavComponent, HeaderNavListComponent, HeaderNavItemComponent],
      imports: [CommonModule, RouterModule, BsDropdownModule, CollapseModule, ButtonComponent, IconDirective, MessageModule],
      exports: [HeaderComponent, HeaderNavComponent, HeaderNavListComponent, HeaderNavItemComponent]
    }]
  }], null, null);
})();
export {
  HeaderComponent,
  HeaderModule,
  HeaderNavComponent,
  HeaderNavItemComponent,
  HeaderNavListComponent
};
//# sourceMappingURL=espd-common_header.js.map
