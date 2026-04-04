"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/field-types/datetime.tsx
var datetime_exports = {};
__export(datetime_exports, {
  default: () => datetime_default
});
module.exports = __toCommonJS(datetime_exports);
var import_date = require("@wordpress/date");
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
var import_constants = require("../constants.cjs");
var import_is_valid_required = __toESM(require("./utils/is-valid-required.cjs"));
var import_render_default = __toESM(require("./utils/render-default.cjs"));
var format = {
  datetime: (0, import_date.getSettings)().formats.datetime,
  weekStartsOn: (0, import_date.getSettings)().l10n.startOfWeek
};
function getValueFormatted({
  item,
  field
}) {
  const value = field.getValue({ item });
  if (["", void 0, null].includes(value)) {
    return "";
  }
  let formatDatetime;
  if (field.type !== "datetime") {
    formatDatetime = format;
  } else {
    formatDatetime = field.format;
  }
  return (0, import_date.dateI18n)(formatDatetime.datetime, (0, import_date.getDate)(value));
}
var sort = (a, b, direction) => {
  const timeA = new Date(a).getTime();
  const timeB = new Date(b).getTime();
  return direction === "asc" ? timeA - timeB : timeB - timeA;
};
var datetime_default = {
  type: "datetime",
  render: import_render_default.default,
  Edit: "datetime",
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [
    import_constants.OPERATOR_ON,
    import_constants.OPERATOR_NOT_ON,
    import_constants.OPERATOR_BEFORE,
    import_constants.OPERATOR_AFTER,
    import_constants.OPERATOR_BEFORE_INC,
    import_constants.OPERATOR_AFTER_INC,
    import_constants.OPERATOR_IN_THE_PAST,
    import_constants.OPERATOR_OVER
  ],
  validOperators: [
    import_constants.OPERATOR_ON,
    import_constants.OPERATOR_NOT_ON,
    import_constants.OPERATOR_BEFORE,
    import_constants.OPERATOR_AFTER,
    import_constants.OPERATOR_BEFORE_INC,
    import_constants.OPERATOR_AFTER_INC,
    import_constants.OPERATOR_IN_THE_PAST,
    import_constants.OPERATOR_OVER
  ],
  format,
  getValueFormatted,
  validate: {
    required: import_is_valid_required.default,
    elements: import_is_valid_elements.default
  }
};
//# sourceMappingURL=datetime.cjs.map
