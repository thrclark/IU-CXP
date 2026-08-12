import {
  IconDirective
} from "./chunk-ULNZEEHZ.js";
import {
  MessageComponent,
  MessageModule
} from "./chunk-HJ33OLO5.js";
import "./chunk-ILGIQYPZ.js";
import "./chunk-AVEZ5KHV.js";
import "./chunk-XJZWXA4I.js";
import "./chunk-XEGWW4D7.js";
import {
  CommonModule
} from "./chunk-BIUBNZ56.js";
import "./chunk-AGCF4D2E.js";
import "./chunk-XZ5YRCND.js";
import {
  Component,
  HostBinding,
  Input,
  NgModule,
  setClassMetadata,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-WMAE3CWV.js";
import "./chunk-WDMUDEB6.js";

// node_modules/espd-common/fesm2022/espd-common-layout-shell.mjs
var _c0 = [[["espd-shell-sidebar"]], [["espd-shell-stage"]]];
var _c1 = ["espd-shell-sidebar", "espd-shell-stage"];
function ShellComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 2);
    ɵɵlistener("click", function ShellComponent_Conditional_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.isSidebarClosed = !ctx_r1.isSidebarClosed);
    });
    ɵɵelement(1, "i", 3)(2, "espd-message", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("espdIcon", ctx_r1.isSidebarClosed ? "rvt-chevron-right" : "rvt-chevron-left");
  }
}
var _c2 = ["*"];
var _ShellComponent = class _ShellComponent {
  constructor() {
    this.size = "sm";
    this.collapsible = false;
    this.hideStageSm = false;
    this.isSidebarClosed = false;
  }
};
_ShellComponent.ɵfac = function ShellComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ShellComponent)();
};
_ShellComponent.ɵcmp = ɵɵdefineComponent({
  type: _ShellComponent,
  selectors: [["espd-shell"]],
  hostVars: 2,
  hostBindings: function ShellComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("noStageSm", ctx.hideStageSm);
    }
  },
  inputs: {
    size: "size",
    collapsible: "collapsible",
    hideStageSm: "hideStageSm"
  },
  standalone: false,
  ngContentSelectors: _c1,
  decls: 5,
  vars: 6,
  consts: [["type", "button", 1, "btn"], [1, "stage"], ["type", "button", 1, "btn", 3, "click"], [3, "espdIcon"], ["key", "common.shell.sidebar.toggle.sr", 1, "sr-only"]],
  template: function ShellComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c0);
      ɵɵelementStart(0, "div");
      ɵɵconditionalCreate(1, ShellComponent_Conditional_1_Template, 3, 1, "button", 0);
      ɵɵprojection(2);
      ɵɵelementEnd();
      ɵɵelementStart(3, "div", 1);
      ɵɵprojection(4, 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵclassMap(ɵɵinterpolate1("sidebar sidebar-", ctx.size));
      ɵɵclassProp("closed", ctx.isSidebarClosed && ctx.collapsible);
      ɵɵadvance();
      ɵɵconditional(ctx.collapsible ? 1 : -1);
    }
  },
  dependencies: [IconDirective, MessageComponent],
  styles: ["[_nghost-%COMP%]{position:relative;display:flex;flex-direction:column-reverse}@media (min-width: 768px){[_nghost-%COMP%]{flex-direction:row}}@media (max-width: 767.98px){.noStageSm[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%]{flex-grow:1}.noStageSm[_nghost-%COMP%]   .stage[_ngcontent-%COMP%]{display:none}}.sidebar[_ngcontent-%COMP%]{display:block;position:relative;flex-grow:0;flex-shrink:0;border-right:1px solid light-dark(#e9ecef,#333333);border-bottom:none;background:light-dark(#f7f7f7,#1a1a1a);transition:margin-left .3s ease;padding:2rem 1rem 1.5rem}.sidebar[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{display:none;z-index:1}.sidebar[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}@media (min-width: 768px){.sidebar[_ngcontent-%COMP%]{flex-basis:250px;width:250px;padding-left:1.5rem}.sidebar[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{display:block;position:absolute;width:42px;height:42px;left:250px;transition:left .3s ease;top:10px;background:light-dark(#f7f7f7,#343a40);border:none;border-radius:.25rem!important;border-top-left-radius:0!important;border-bottom-left-radius:0!important;padding-top:9px;padding-left:9px}.sidebar[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:24px;color:light-dark(#6c757d,#adb5bd)}.sidebar.closed[_ngcontent-%COMP%]{margin-left:-250px}.sidebar.sidebar-lg[_ngcontent-%COMP%]{flex-basis:350px;width:350px}.sidebar.sidebar-lg[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{left:350px}.sidebar.sidebar-lg.closed[_ngcontent-%COMP%]{margin-left:-350px}}@media (min-width: 992px){.sidebar[_ngcontent-%COMP%]{padding-top:2.5rem}}.stage[_ngcontent-%COMP%]{flex-grow:1;padding:2rem 1rem 4rem;position:relative}@media (min-width: 768px){.stage[_ngcontent-%COMP%]{width:1%}}@media (min-width: 992px){.stage[_ngcontent-%COMP%]{padding-left:4rem;padding-right:4rem;padding-top:2.5rem}}"]
});
var ShellComponent = _ShellComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellComponent, [{
    type: Component,
    args: [{
      selector: "espd-shell",
      standalone: false,
      template: `<div class="sidebar sidebar-{{size}}" [class.closed]="isSidebarClosed && collapsible">
	@if (collapsible) {
		<button class="btn" (click)="isSidebarClosed = !isSidebarClosed" type="button">
			<i [espdIcon]="isSidebarClosed ? 'rvt-chevron-right' : 'rvt-chevron-left'"></i>
			<espd-message key="common.shell.sidebar.toggle.sr" class="sr-only" />
		</button>
	}
	<ng-content select="espd-shell-sidebar" />
</div>
<div class="stage">
	<ng-content select="espd-shell-stage" />
</div>`,
      styles: [":host{position:relative;display:flex;flex-direction:column-reverse}@media (min-width: 768px){:host{flex-direction:row}}@media (max-width: 767.98px){:host.noStageSm .sidebar{flex-grow:1}:host.noStageSm .stage{display:none}}.sidebar{display:block;position:relative;flex-grow:0;flex-shrink:0;border-right:1px solid light-dark(#e9ecef,#333333);border-bottom:none;background:light-dark(#f7f7f7,#1a1a1a);transition:margin-left .3s ease;padding:2rem 1rem 1.5rem}.sidebar>button{display:none;z-index:1}.sidebar>button:focus{box-shadow:0 0 0 .125rem #fff,0 0 0 .25rem var(--primary-color)!important}@media (min-width: 768px){.sidebar{flex-basis:250px;width:250px;padding-left:1.5rem}.sidebar>button{display:block;position:absolute;width:42px;height:42px;left:250px;transition:left .3s ease;top:10px;background:light-dark(#f7f7f7,#343a40);border:none;border-radius:.25rem!important;border-top-left-radius:0!important;border-bottom-left-radius:0!important;padding-top:9px;padding-left:9px}.sidebar>button i{font-size:24px;color:light-dark(#6c757d,#adb5bd)}.sidebar.closed{margin-left:-250px}.sidebar.sidebar-lg{flex-basis:350px;width:350px}.sidebar.sidebar-lg>button{left:350px}.sidebar.sidebar-lg.closed{margin-left:-350px}}@media (min-width: 992px){.sidebar{padding-top:2.5rem}}.stage{flex-grow:1;padding:2rem 1rem 4rem;position:relative}@media (min-width: 768px){.stage{width:1%}}@media (min-width: 992px){.stage{padding-left:4rem;padding-right:4rem;padding-top:2.5rem}}\n"]
    }]
  }], null, {
    size: [{
      type: Input
    }],
    collapsible: [{
      type: Input
    }],
    hideStageSm: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["class.noStageSm"]
    }]
  });
})();
var _ShellStageComponent = class _ShellStageComponent {
};
_ShellStageComponent.ɵfac = function ShellStageComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ShellStageComponent)();
};
_ShellStageComponent.ɵcmp = ɵɵdefineComponent({
  type: _ShellStageComponent,
  selectors: [["espd-shell-stage"]],
  standalone: false,
  ngContentSelectors: _c2,
  decls: 1,
  vars: 0,
  template: function ShellStageComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  styles: ["[_nghost-%COMP%]{display:block}"]
});
var ShellStageComponent = _ShellStageComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellStageComponent, [{
    type: Component,
    args: [{
      selector: "espd-shell-stage",
      standalone: false,
      template: "<ng-content />",
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var _ShellSidebarComponent = class _ShellSidebarComponent {
};
_ShellSidebarComponent.ɵfac = function ShellSidebarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ShellSidebarComponent)();
};
_ShellSidebarComponent.ɵcmp = ɵɵdefineComponent({
  type: _ShellSidebarComponent,
  selectors: [["espd-shell-sidebar"]],
  standalone: false,
  ngContentSelectors: _c2,
  decls: 1,
  vars: 0,
  template: function ShellSidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  styles: ["[_nghost-%COMP%]{display:block}"]
});
var ShellSidebarComponent = _ShellSidebarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellSidebarComponent, [{
    type: Component,
    args: [{
      selector: "espd-shell-sidebar",
      standalone: false,
      template: "<ng-content />",
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var _ShellModule = class _ShellModule {
};
_ShellModule.ɵfac = function ShellModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ShellModule)();
};
_ShellModule.ɵmod = ɵɵdefineNgModule({
  type: _ShellModule,
  declarations: [ShellComponent, ShellStageComponent, ShellSidebarComponent],
  imports: [CommonModule, IconDirective, MessageModule],
  exports: [ShellComponent, ShellStageComponent, ShellSidebarComponent]
});
_ShellModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, MessageModule]
});
var ShellModule = _ShellModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellModule, [{
    type: NgModule,
    args: [{
      declarations: [ShellComponent, ShellStageComponent, ShellSidebarComponent],
      imports: [CommonModule, IconDirective, MessageModule],
      exports: [ShellComponent, ShellStageComponent, ShellSidebarComponent]
    }]
  }], null, null);
})();
export {
  ShellComponent,
  ShellModule,
  ShellSidebarComponent,
  ShellStageComponent
};
//# sourceMappingURL=espd-common_layout_shell.js.map
