import {
  SettingService
} from "./chunk-ILGIQYPZ.js";
import {
  HttpClient
} from "./chunk-XJZWXA4I.js";
import {
  ApplicationConfig
} from "./chunk-XZ5YRCND.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injectable,
  NgModule,
  Observable,
  RuntimeError,
  Subject,
  assertInInjectionContext,
  assertNotInReactiveContext,
  computed,
  filter,
  inject,
  input,
  map,
  of,
  setClassMetadata,
  share,
  signal,
  take,
  takeUntil,
  tap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomProperty,
  ɵɵinject,
  ɵɵnextContext,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-WMAE3CWV.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    ngDevMode && assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new Observable((subscriber) => {
    if (destroyRef.destroyed) {
      subscriber.next();
      return;
    }
    const unregisterFn = destroyRef.onDestroy(subscriber.next.bind(subscriber));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe(takeUntil(destroyed$));
  };
}
function toSignal(source, options) {
  typeof ngDevMode !== "undefined" && ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  if (ngDevMode && requiresCleanup && !options?.injector) {
    assertInInjectionContext(toSignal);
  }
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
      /* StateKind.NoValue */
    }, { equal });
  } else {
    state = signal({ kind: 1, value: options?.initialValue }, { equal });
  }
  let destroyUnregisterFn;
  const sub = source.subscribe({
    next: (value) => state.set({ kind: 1, value }),
    error: (error) => {
      state.set({ kind: 2, error });
      destroyUnregisterFn?.();
    },
    complete: () => {
      destroyUnregisterFn?.();
    }
    // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
    // "complete".
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  destroyUnregisterFn = cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, { equal: options?.equal });
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}

// node_modules/espd-common/fesm2022/espd-common-i18n.mjs
function MessageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵdomElement(0, "span", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵdomProperty("innerHTML", ctx_r0.settingValue(), ɵɵsanitizeHtml);
  }
}
function MessageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵtextInterpolate(ctx_r0.message());
  }
}
var _MessageService = class _MessageService {
  constructor(http, config) {
    this.http = http;
    this.config = config;
    this.messages = {};
    this.loadedModules = [];
    this.dataUpdateSubject = new Subject();
    this.onDataUpdate = this.dataUpdateSubject.asObservable();
  }
  init(module) {
    const obs = this.http.get(`${this.config.messagePath}?module=${module}`).pipe(tap((data) => Object.assign(this.messages, data)), share());
    obs.subscribe(() => {
      this.loadedModules.push(module);
      this.dataUpdateSubject.next(module);
    });
    return obs;
  }
  waitFor(...modules) {
    if (this.loadedModules.some((item) => modules.includes(item))) {
      return of(void 0);
    } else {
      return this.onDataUpdate.pipe(filter((m) => modules.includes(m)), take(1), map((_m) => void 0));
    }
  }
  get(key, ...args) {
    let value = this.messages[key];
    if (!value) {
      console.warn("Message not found:", key);
      value = "";
    }
    for (let i = 0; i < args.length; i++) {
      value = value.replace(new RegExp(`\\{${i}\\}`, "g"), args[i]?.toString() ?? "");
    }
    return value;
  }
  evaluate(config) {
    if (config) {
      if (typeof config === "string") {
        return config;
      } else {
        if (config.text) {
          return config.text;
        } else if (config.key) {
          return this.get(config.key, ...config.args || []);
        }
      }
    }
    return "";
  }
};
_MessageService.ɵfac = function MessageService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MessageService)(ɵɵinject(HttpClient), ɵɵinject(ApplicationConfig));
};
_MessageService.ɵprov = ɵɵdefineInjectable({
  token: _MessageService,
  factory: _MessageService.ɵfac
});
var MessageService = _MessageService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageService, [{
    type: Injectable
  }], () => [{
    type: HttpClient
  }, {
    type: ApplicationConfig
  }], null);
})();
var _MessageComponent = class _MessageComponent {
  constructor() {
    this.key = input(...ngDevMode ? [void 0, {
      debugName: "key"
    }] : []);
    this.args = input(...ngDevMode ? [void 0, {
      debugName: "args"
    }] : []);
    this.setting = input(...ngDevMode ? [void 0, {
      debugName: "setting"
    }] : []);
    this.config = input(...ngDevMode ? [void 0, {
      debugName: "config"
    }] : []);
    this.settingValue = computed(() => this.computeSetting(), ...ngDevMode ? [{
      debugName: "settingValue"
    }] : []);
    this.message = computed(() => this.computeMessage(), ...ngDevMode ? [{
      debugName: "message"
    }] : []);
    this.messageService = inject(MessageService);
    this.settingService = inject(SettingService);
    this.messageUpdateSignal = toSignal(this.messageService.onDataUpdate);
    this.settingUpdateSignal = toSignal(this.settingService.onDataUpdate);
  }
  computeMessage() {
    this.messageUpdateSignal();
    if (this.config()) {
      return this.messageService.evaluate(this.config());
    } else if (this.key()) {
      return this.messageService.get(this.key(), ...this.args() || []);
    } else {
      return "";
    }
  }
  computeSetting() {
    this.settingUpdateSignal();
    return this.settingService.get(this.setting()) || "";
  }
};
_MessageComponent.ɵfac = function MessageComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MessageComponent)();
};
_MessageComponent.ɵcmp = ɵɵdefineComponent({
  type: _MessageComponent,
  selectors: [["espd-message"]],
  inputs: {
    key: [1, "key"],
    args: [1, "args"],
    setting: [1, "setting"],
    config: [1, "config"]
  },
  decls: 2,
  vars: 1,
  consts: [[3, "innerHTML"]],
  template: function MessageComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵconditionalCreate(0, MessageComponent_Conditional_0_Template, 1, 1, "span", 0)(1, MessageComponent_Conditional_1_Template, 1, 1);
    }
    if (rf & 2) {
      ɵɵconditional(ctx.setting() ? 0 : 1);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var MessageComponent = _MessageComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageComponent, [{
    type: Component,
    args: [{
      selector: "espd-message",
      template: '@if (setting()) {<span [innerHTML]="settingValue()"></span>} @else {{{message()}}}',
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var _MessageModule = class _MessageModule {
  static forRoot() {
    return {
      ngModule: _MessageModule,
      providers: [MessageService]
    };
  }
};
_MessageModule.ɵfac = function MessageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MessageModule)();
};
_MessageModule.ɵmod = ɵɵdefineNgModule({
  type: _MessageModule,
  imports: [MessageComponent],
  exports: [MessageComponent]
});
_MessageModule.ɵinj = ɵɵdefineInjector({});
var MessageModule = _MessageModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageModule, [{
    type: NgModule,
    args: [{
      imports: [MessageComponent],
      exports: [MessageComponent],
      providers: []
    }]
  }], null, null);
})();

export {
  takeUntilDestroyed,
  MessageService,
  MessageComponent,
  MessageModule
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v20.3.9
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-HJ33OLO5.js.map
