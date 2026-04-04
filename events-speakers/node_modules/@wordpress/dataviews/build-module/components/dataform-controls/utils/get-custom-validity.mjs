// packages/dataviews/src/components/dataform-controls/utils/get-custom-validity.ts
function getCustomValidity(isValid, validity) {
  let customValidity;
  if (isValid?.required && validity?.required) {
    customValidity = validity?.required?.message ? validity.required : void 0;
  } else if (isValid?.pattern && validity?.pattern) {
    customValidity = validity.pattern;
  } else if (isValid?.min && validity?.min) {
    customValidity = validity.min;
  } else if (isValid?.max && validity?.max) {
    customValidity = validity.max;
  } else if (isValid?.minLength && validity?.minLength) {
    customValidity = validity.minLength;
  } else if (isValid?.maxLength && validity?.maxLength) {
    customValidity = validity.maxLength;
  } else if (isValid?.elements && validity?.elements) {
    customValidity = validity.elements;
  } else if (validity?.custom) {
    customValidity = validity.custom;
  }
  return customValidity;
}
export {
  getCustomValidity as default
};
//# sourceMappingURL=get-custom-validity.mjs.map
