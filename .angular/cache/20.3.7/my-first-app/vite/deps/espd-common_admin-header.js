import {
  ButtonModule
} from "./chunk-AKN5OHOQ.js";
import "./chunk-ULNZEEHZ.js";
import {
  MessageComponent,
  MessageModule
} from "./chunk-HJ33OLO5.js";
import "./chunk-ILGIQYPZ.js";
import {
  RouterModule
} from "./chunk-VBAZ7EWY.js";
import "./chunk-AVEZ5KHV.js";
import "./chunk-XJZWXA4I.js";
import "./chunk-XEGWW4D7.js";
import {
  CommonModule
} from "./chunk-BIUBNZ56.js";
import "./chunk-AGCF4D2E.js";
import "./chunk-XZ5YRCND.js";
import {
  BehaviorSubject,
  Component,
  Injectable,
  Input,
  NgModule,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty
} from "./chunk-WMAE3CWV.js";
import "./chunk-WDMUDEB6.js";

// node_modules/espd-common/fesm2022/espd-common-admin-header.mjs
var _c0 = ["*"];
var _AdminHeaderComponent = class _AdminHeaderComponent {
  constructor() {
    this.headerText = "";
  }
};
_AdminHeaderComponent.ɵfac = function AdminHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminHeaderComponent)();
};
_AdminHeaderComponent.ɵcmp = ɵɵdefineComponent({
  type: _AdminHeaderComponent,
  selectors: [["espd-admin-header"]],
  inputs: {
    headerText: "headerText"
  },
  standalone: false,
  ngContentSelectors: _c0,
  decls: 4,
  vars: 1,
  consts: [[1, "container"], [1, "mb-3", "mb-md-6", "font-weight-bold"], [3, "config"]],
  template: function AdminHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0);
      ɵɵprojection(1);
      ɵɵelementStart(2, "h2", 1);
      ɵɵelement(3, "espd-message", 2);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵproperty("config", ctx.headerText);
    }
  },
  dependencies: [MessageComponent],
  styles: ["[_nghost-%COMP%]{display:block;background:light-dark(#f7f7f7,#222529);border-bottom:1px solid light-dark(#e9ecef,#4C5A69);padding-top:1rem}@media (min-width: 768px){[_nghost-%COMP%]{padding-top:2.5rem}}h1[_ngcontent-%COMP%]{font-size:1.4375rem}@media (min-width: 768px){h1[_ngcontent-%COMP%]{font-size:2rem}}"]
});
var AdminHeaderComponent = _AdminHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminHeaderComponent, [{
    type: Component,
    args: [{
      selector: "espd-admin-header",
      standalone: false,
      template: '<div class="container">\n	<ng-content />\n	<h2 class="mb-3 mb-md-6 font-weight-bold">\n		<espd-message [config]="headerText" />\n	</h2>\n</div>',
      styles: [":host{display:block;background:light-dark(#f7f7f7,#222529);border-bottom:1px solid light-dark(#e9ecef,#4C5A69);padding-top:1rem}@media (min-width: 768px){:host{padding-top:2.5rem}}h1{font-size:1.4375rem}@media (min-width: 768px){h1{font-size:2rem}}\n"]
    }]
  }], null, {
    headerText: [{
      type: Input
    }]
  });
})();
var _AdminHeaderClearComponent = class _AdminHeaderClearComponent extends AdminHeaderComponent {
};
_AdminHeaderClearComponent.ɵfac = /* @__PURE__ */ (() => {
  let ɵAdminHeaderClearComponent_BaseFactory;
  return function AdminHeaderClearComponent_Factory(__ngFactoryType__) {
    return (ɵAdminHeaderClearComponent_BaseFactory || (ɵAdminHeaderClearComponent_BaseFactory = ɵɵgetInheritedFactory(_AdminHeaderClearComponent)))(__ngFactoryType__ || _AdminHeaderClearComponent);
  };
})();
_AdminHeaderClearComponent.ɵcmp = ɵɵdefineComponent({
  type: _AdminHeaderClearComponent,
  selectors: [["espd-admin-header-clear"]],
  standalone: false,
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c0,
  decls: 4,
  vars: 1,
  consts: [[1, "mb-3", "mb-md-6", "font-weight-bold"], [3, "config"]],
  template: function AdminHeaderClearComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div");
      ɵɵprojection(1);
      ɵɵelementStart(2, "h2", 0);
      ɵɵelement(3, "espd-message", 1);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵproperty("config", ctx.headerText);
    }
  },
  dependencies: [MessageComponent],
  styles: ["[_nghost-%COMP%]{display:block}h1[_ngcontent-%COMP%]{font-size:1.4375rem}@media (min-width: 768px){h1[_ngcontent-%COMP%]{font-size:2rem}}"]
});
var AdminHeaderClearComponent = _AdminHeaderClearComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminHeaderClearComponent, [{
    type: Component,
    args: [{
      selector: "espd-admin-header-clear",
      standalone: false,
      template: '<div>\n	<ng-content />\n	<h2 class="mb-3 mb-md-6 font-weight-bold">\n		<espd-message [config]="headerText" />\n	</h2>\n</div>',
      styles: [":host{display:block}h1{font-size:1.4375rem}@media (min-width: 768px){h1{font-size:2rem}}\n"]
    }]
  }], null, null);
})();
var _AdminHeaderModule = class _AdminHeaderModule {
};
_AdminHeaderModule.ɵfac = function AdminHeaderModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminHeaderModule)();
};
_AdminHeaderModule.ɵmod = ɵɵdefineNgModule({
  type: _AdminHeaderModule,
  declarations: [AdminHeaderComponent, AdminHeaderClearComponent],
  imports: [ButtonModule, CommonModule, MessageModule, RouterModule],
  exports: [AdminHeaderComponent, AdminHeaderClearComponent]
});
_AdminHeaderModule.ɵinj = ɵɵdefineInjector({
  imports: [ButtonModule, CommonModule, MessageModule, RouterModule]
});
var AdminHeaderModule = _AdminHeaderModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminHeaderModule, [{
    type: NgModule,
    args: [{
      imports: [ButtonModule, CommonModule, MessageModule, RouterModule],
      declarations: [AdminHeaderComponent, AdminHeaderClearComponent],
      exports: [AdminHeaderComponent, AdminHeaderClearComponent]
    }]
  }], null, null);
})();
var _AdminHeaderService = class _AdminHeaderService {
  constructor() {
    this.templateSubject = new BehaviorSubject(null);
    this._template = this.templateSubject.asObservable();
  }
  get template() {
    return this._template;
  }
  setHeaderTemplate(templateRef) {
    this.templateSubject.next(templateRef);
  }
};
_AdminHeaderService.ɵfac = function AdminHeaderService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminHeaderService)();
};
_AdminHeaderService.ɵprov = ɵɵdefineInjectable({
  token: _AdminHeaderService,
  factory: _AdminHeaderService.ɵfac
});
var AdminHeaderService = _AdminHeaderService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminHeaderService, [{
    type: Injectable
  }], null, null);
})();
export {
  AdminHeaderClearComponent,
  AdminHeaderComponent,
  AdminHeaderModule,
  AdminHeaderService
};
//# sourceMappingURL=espd-common_admin-header.js.map
