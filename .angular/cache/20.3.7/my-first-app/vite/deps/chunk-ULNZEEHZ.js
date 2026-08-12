import {
  DomSanitizer
} from "./chunk-AVEZ5KHV.js";
import {
  Directive,
  HostBinding,
  Input,
  inject,
  setClassMetadata,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineDirective,
  ɵɵstyleMap
} from "./chunk-WMAE3CWV.js";

// node_modules/espd-common/fesm2022/espd-common-icon.mjs
var _IconDirective = class _IconDirective {
  constructor() {
    this.sanitizer = inject(DomSanitizer);
    this.icon = "";
    this.hidden = true;
  }
  get iconClass() {
    return "icon-" + this.icon;
  }
  get styles() {
    if (this.background) {
      return this.sanitizer.bypassSecurityTrustStyle(`background: ${this.background};
				width: 2.25rem;
				height: 2.25rem;
				display: inline-flex;
				justify-content: center;
    		align-items: center;
				border-radius: 50% ;`);
    } else {
      return null;
    }
  }
};
_IconDirective.ɵfac = function IconDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _IconDirective)();
};
_IconDirective.ɵdir = ɵɵdefineDirective({
  type: _IconDirective,
  selectors: [["", "espdIcon", ""]],
  hostVars: 5,
  hostBindings: function IconDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("aria-hidden", ctx.hidden);
      ɵɵstyleMap(ctx.styles);
      ɵɵclassMap(ctx.iconClass);
    }
  },
  inputs: {
    icon: [0, "espdIcon", "icon"],
    background: "background"
  }
});
var IconDirective = _IconDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconDirective, [{
    type: Directive,
    args: [{
      selector: "[espdIcon]",
      standalone: true
    }]
  }], null, {
    icon: [{
      type: Input,
      args: ["espdIcon"]
    }],
    background: [{
      type: Input
    }],
    iconClass: [{
      type: HostBinding,
      args: ["class"]
    }],
    hidden: [{
      type: HostBinding,
      args: ["attr.aria-hidden"]
    }],
    styles: [{
      type: HostBinding,
      args: ["style"]
    }]
  });
})();

export {
  IconDirective
};
//# sourceMappingURL=chunk-ULNZEEHZ.js.map
