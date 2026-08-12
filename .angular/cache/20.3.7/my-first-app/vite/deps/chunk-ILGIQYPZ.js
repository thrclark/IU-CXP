import {
  HttpClient
} from "./chunk-XJZWXA4I.js";
import {
  ApplicationConfig
} from "./chunk-XZ5YRCND.js";
import {
  Injectable,
  Subject,
  filter,
  map,
  of,
  setClassMetadata,
  share,
  take,
  tap,
  ɵɵdefineInjectable,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-WMAE3CWV.js";

// node_modules/espd-common/fesm2022/espd-common-setting.mjs
var SettingType;
(function(SettingType2) {
  SettingType2["SESSION_DURATION_SECONDS"] = "common.SESSION_DURATION_SECONDS";
  SettingType2["CUSTOM_FOOTER"] = "common.CUSTOM_FOOTER";
  SettingType2["CUSTOM_HEADER"] = "common.CUSTOM_HEADER";
  SettingType2["LOGO_URL"] = "common.LOGO_URL";
  SettingType2["LOGO_URL_MOBILE"] = "common.LOGO_URL_MOBILE";
  SettingType2["LOGO_DISPLAY"] = "common.LOGO_DISPLAY";
})(SettingType || (SettingType = {}));
var _SettingService = class _SettingService {
  constructor(http, config) {
    this.http = http;
    this.config = config;
    this.settings = {};
    this.loadedModules = [];
    this.dataUpdateSubject = new Subject();
    this.onDataUpdate = this.dataUpdateSubject.asObservable();
  }
  init(module) {
    const obs = this.http.get(`${this.config.settingsPath}?module=${module}`).pipe(tap((data) => {
      Object.assign(this.settings, data);
      this.initializeSettings(module);
    }), share());
    obs.subscribe(() => {
      this.loadedModules.push(module);
      this.dataUpdateSubject.next(module);
    });
    return obs;
  }
  //public get(key: SettingType): any {
  get(key) {
    return this.settings[key];
  }
  waitFor(...modules) {
    if (this.loadedModules.some((item) => modules.includes(item))) {
      return of(void 0);
    } else {
      return this.onDataUpdate.pipe(filter((m) => modules.includes(m)), take(1), map(() => void 0));
    }
  }
};
_SettingService.ɵfac = function SettingService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SettingService)(ɵɵinject(HttpClient), ɵɵinject(ApplicationConfig));
};
_SettingService.ɵprov = ɵɵdefineInjectable({
  token: _SettingService,
  factory: _SettingService.ɵfac
});
var SettingService = _SettingService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingService, [{
    type: Injectable
  }], () => [{
    type: HttpClient
  }, {
    type: ApplicationConfig
  }], null);
})();
var _SettingServiceImpl = class _SettingServiceImpl extends SettingService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initializeSettings() {
  }
};
_SettingServiceImpl.ɵfac = /* @__PURE__ */ (() => {
  let ɵSettingServiceImpl_BaseFactory;
  return function SettingServiceImpl_Factory(__ngFactoryType__) {
    return (ɵSettingServiceImpl_BaseFactory || (ɵSettingServiceImpl_BaseFactory = ɵɵgetInheritedFactory(_SettingServiceImpl)))(__ngFactoryType__ || _SettingServiceImpl);
  };
})();
_SettingServiceImpl.ɵprov = ɵɵdefineInjectable({
  token: _SettingServiceImpl,
  factory: _SettingServiceImpl.ɵfac
});
var SettingServiceImpl = _SettingServiceImpl;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingServiceImpl, [{
    type: Injectable
  }], null, null);
})();

export {
  SettingType,
  SettingService,
  SettingServiceImpl
};
//# sourceMappingURL=chunk-ILGIQYPZ.js.map
