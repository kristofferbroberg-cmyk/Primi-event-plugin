"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/hooks/use-report-validity.ts
var use_report_validity_exports = {};
__export(use_report_validity_exports, {
  default: () => useReportValidity
});
module.exports = __toCommonJS(use_report_validity_exports);
var import_element = require("@wordpress/element");
function useReportValidity(ref, shouldReport) {
  (0, import_element.useEffect)(() => {
    if (shouldReport && ref.current) {
      const inputs = ref.current.querySelectorAll(
        "input, textarea, select"
      );
      inputs.forEach((input) => {
        input.reportValidity();
      });
    }
  }, [shouldReport, ref]);
}
//# sourceMappingURL=use-report-validity.cjs.map
