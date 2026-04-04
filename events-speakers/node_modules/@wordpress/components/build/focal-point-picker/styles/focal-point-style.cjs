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

// packages/components/src/focal-point-picker/styles/focal-point-style.ts
var focal_point_style_exports = {};
__export(focal_point_style_exports, {
  PointerCircle: () => PointerCircle
});
module.exports = __toCommonJS(focal_point_style_exports);
var import_base = __toESM(require("@emotion/styled/base"));
var import_utils = require("../../utils/index.cjs");
var PointerCircle = /* @__PURE__ */ (0, import_base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "e19snlhg0"
} : {
  target: "e19snlhg0",
  label: "PointerCircle"
})("background-color:transparent;cursor:grab;height:40px;margin:-20px 0 0 -20px;position:absolute;user-select:none;width:40px;will-change:transform;z-index:10000;background:rgba( 255, 255, 255, 0.4 );border:1px solid rgba( 255, 255, 255, 0.4 );border-radius:", import_utils.CONFIG.radiusRound, ";backdrop-filter:blur( 16px ) saturate( 180% );box-shadow:rgb( 0 0 0 / 10% ) 0px 0px 8px;@media not ( prefers-reduced-motion ){transition:transform 100ms linear;}", ({
  isDragging
}) => isDragging && `
			box-shadow: rgb( 0 0 0 / 12% ) 0px 0px 10px;
			transform: scale( 1.1 );
			cursor: grabbing;
			`, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvY2FsLXBvaW50LXN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVV1QyIsImZpbGUiOiJmb2NhbC1wb2ludC1zdHlsZS50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgQ09ORklHIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgUG9pbnRlckNpcmNsZSA9IHN0eWxlZC5kaXZgXG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRjdXJzb3I6IGdyYWI7XG5cdGhlaWdodDogNDBweDtcblx0bWFyZ2luOiAtMjBweCAwIDAgLTIwcHg7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dXNlci1zZWxlY3Q6IG5vbmU7XG5cdHdpZHRoOiA0MHB4O1xuXHR3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuXHR6LWluZGV4OiAxMDAwMDtcblx0YmFja2dyb3VuZDogcmdiYSggMjU1LCAyNTUsIDI1NSwgMC40ICk7XG5cdGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoIDI1NSwgMjU1LCAyNTUsIDAuNCApO1xuXHRib3JkZXItcmFkaXVzOiAkeyBDT05GSUcucmFkaXVzUm91bmQgfTtcblx0YmFja2Ryb3AtZmlsdGVyOiBibHVyKCAxNnB4ICkgc2F0dXJhdGUoIDE4MCUgKTtcblx0Ym94LXNoYWRvdzogcmdiKCAwIDAgMCAvIDEwJSApIDBweCAwcHggOHB4O1xuXG5cdEBtZWRpYSBub3QgKCBwcmVmZXJzLXJlZHVjZWQtbW90aW9uICkge1xuXHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxMDBtcyBsaW5lYXI7XG5cdH1cblxuXHQkeyAoIHsgaXNEcmFnZ2luZyB9OiB7IGlzRHJhZ2dpbmc6IGJvb2xlYW4gfSApID0+XG5cdFx0aXNEcmFnZ2luZyAmJlxuXHRcdGBcblx0XHRcdGJveC1zaGFkb3c6IHJnYiggMCAwIDAgLyAxMiUgKSAwcHggMHB4IDEwcHg7XG5cdFx0XHR0cmFuc2Zvcm06IHNjYWxlKCAxLjEgKTtcblx0XHRcdGN1cnNvcjogZ3JhYmJpbmc7XG5cdFx0XHRgIH1cbmA7XG4iXX0= */"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PointerCircle
});
//# sourceMappingURL=focal-point-style.cjs.map
