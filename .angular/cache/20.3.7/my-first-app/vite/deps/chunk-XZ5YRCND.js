import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-WMAE3CWV.js";

// node_modules/espd-common/fesm2022/espd-common-config.mjs
var MODULE_NAME = "espd-common";
var _ApplicationConfig = class _ApplicationConfig {
  constructor() {
    this.messagePath = "/messages";
    this.settingsPath = "/settings";
    this.userAttributePath = "";
    this.alertListDefaultTimeout = 5;
    this.enableRoutePageTitles = true;
    this.pageTitleMessageKey = "common.pageTitle";
    this.applicationNameSetting = "APPLICATION_NAME";
  }
};
_ApplicationConfig.ɵfac = function ApplicationConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ApplicationConfig)();
};
_ApplicationConfig.ɵprov = ɵɵdefineInjectable({
  token: _ApplicationConfig,
  factory: _ApplicationConfig.ɵfac
});
var ApplicationConfig = _ApplicationConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicationConfig, [{
    type: Injectable
  }], null, null);
})();

export {
  MODULE_NAME,
  ApplicationConfig
};
//# sourceMappingURL=chunk-XZ5YRCND.js.map
