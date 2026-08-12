import {
  MessageModule
} from "./chunk-HJ33OLO5.js";
import {
  SettingService,
  SettingType
} from "./chunk-ILGIQYPZ.js";
import "./chunk-XJZWXA4I.js";
import {
  CommonModule
} from "./chunk-BIUBNZ56.js";
import "./chunk-AGCF4D2E.js";
import {
  MODULE_NAME
} from "./chunk-XZ5YRCND.js";
import {
  Component,
  ElementRef,
  Inject,
  NgModule,
  setClassMetadata,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-WMAE3CWV.js";
import "./chunk-WDMUDEB6.js";

// node_modules/espd-common/fesm2022/espd-common-footer.mjs
var _FooterComponent = class _FooterComponent {
  constructor(element, settingService) {
    settingService.waitFor(MODULE_NAME).subscribe(() => {
      element.nativeElement.innerHTML = settingService.get(SettingType.CUSTOM_FOOTER) || "";
    });
  }
};
_FooterComponent.ɵfac = function FooterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FooterComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(SettingService));
};
_FooterComponent.ɵcmp = ɵɵdefineComponent({
  type: _FooterComponent,
  selectors: [["espd-footer"]],
  standalone: false,
  decls: 0,
  vars: 0,
  template: function FooterComponent_Template(rf, ctx) {
  },
  encapsulation: 2
});
var FooterComponent = _FooterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterComponent, [{
    type: Component,
    args: [{
      selector: "espd-footer",
      template: "",
      standalone: false
    }]
  }], () => [{
    type: ElementRef,
    decorators: [{
      type: Inject,
      args: [ElementRef]
    }]
  }, {
    type: SettingService
  }], null);
})();
var _FooterModule = class _FooterModule {
};
_FooterModule.ɵfac = function FooterModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FooterModule)();
};
_FooterModule.ɵmod = ɵɵdefineNgModule({
  type: _FooterModule,
  declarations: [FooterComponent],
  imports: [CommonModule, MessageModule],
  exports: [FooterComponent]
});
_FooterModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, MessageModule]
});
var FooterModule = _FooterModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterModule, [{
    type: NgModule,
    args: [{
      declarations: [FooterComponent],
      imports: [CommonModule, MessageModule],
      exports: [FooterComponent]
    }]
  }], null, null);
})();
export {
  FooterComponent,
  FooterModule
};
//# sourceMappingURL=espd-common_footer.js.map
