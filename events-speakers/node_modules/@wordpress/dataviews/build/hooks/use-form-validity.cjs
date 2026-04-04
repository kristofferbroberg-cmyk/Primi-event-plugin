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

// packages/dataviews/src/hooks/use-form-validity.ts
var use_form_validity_exports = {};
__export(use_form_validity_exports, {
  default: () => use_form_validity_default,
  useFormValidity: () => useFormValidity
});
module.exports = __toCommonJS(use_form_validity_exports);
var import_deepmerge = __toESM(require("deepmerge"));
var import_es6 = __toESM(require("fast-deep-equal/es6/index.js"));
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_field_types = __toESM(require("../field-types/index.cjs"));
var import_normalize_form = __toESM(require("../components/dataform-layouts/normalize-form.cjs"));
function isFormValid(formValidity) {
  if (!formValidity) {
    return true;
  }
  return Object.values(formValidity).every((fieldValidation) => {
    return Object.entries(fieldValidation).every(
      ([key, validation]) => {
        if (key === "children" && validation && typeof validation === "object") {
          return isFormValid(validation);
        }
        return validation.type !== "invalid" && validation.type !== "validating";
      }
    );
  });
}
function getFormFieldsToValidate(form, fields) {
  const normalizedForm = (0, import_normalize_form.default)(form);
  if (normalizedForm.fields.length === 0) {
    return [];
  }
  const fieldsMap = /* @__PURE__ */ new Map();
  fields.forEach((field) => {
    fieldsMap.set(field.id, field);
  });
  function processFormField(formField) {
    if ("children" in formField && Array.isArray(formField.children)) {
      const processedChildren = formField.children.map(processFormField).filter((child) => child !== null);
      if (processedChildren.length === 0) {
        return null;
      }
      const fieldDef2 = fieldsMap.get(formField.id);
      if (fieldDef2) {
        const [normalizedField2] = (0, import_field_types.default)([
          fieldDef2
        ]);
        return {
          id: formField.id,
          children: processedChildren,
          field: normalizedField2
        };
      }
      return {
        id: formField.id,
        children: processedChildren
      };
    }
    const fieldDef = fieldsMap.get(formField.id);
    if (!fieldDef) {
      return null;
    }
    const [normalizedField] = (0, import_field_types.default)([fieldDef]);
    return {
      id: formField.id,
      children: [],
      field: normalizedField
    };
  }
  const toValidate = normalizedForm.fields.map(processFormField).filter((field) => field !== null);
  return toValidate;
}
function setValidityAtPath(formValidity, fieldValidity, path) {
  if (!formValidity) {
    formValidity = {};
  }
  if (path.length === 0) {
    return formValidity;
  }
  const result = { ...formValidity };
  let current = result;
  for (let i = 0; i < path.length - 1; i++) {
    const segment = path[i];
    if (!current[segment]) {
      current[segment] = {};
    }
    current[segment] = { ...current[segment] };
    current = current[segment];
  }
  const finalKey = path[path.length - 1];
  current[finalKey] = {
    ...current[finalKey] || {},
    ...fieldValidity
  };
  return result;
}
function removeValidationProperty(formValidity, path, property) {
  if (!formValidity || path.length === 0) {
    return formValidity;
  }
  const result = { ...formValidity };
  let current = result;
  for (let i = 0; i < path.length - 1; i++) {
    const segment = path[i];
    if (!current[segment]) {
      return formValidity;
    }
    current[segment] = { ...current[segment] };
    current = current[segment];
  }
  const finalKey = path[path.length - 1];
  if (!current[finalKey]) {
    return formValidity;
  }
  const fieldValidity = { ...current[finalKey] };
  delete fieldValidity[property];
  if (Object.keys(fieldValidity).length === 0) {
    delete current[finalKey];
  } else {
    current[finalKey] = fieldValidity;
  }
  if (Object.keys(result).length === 0) {
    return void 0;
  }
  return result;
}
function handleElementsValidationAsync(promise, formField, promiseHandler) {
  const { elementsCounterRef, setFormValidity, path, item } = promiseHandler;
  const currentToken = (elementsCounterRef.current[formField.id] || 0) + 1;
  elementsCounterRef.current[formField.id] = currentToken;
  promise.then((result) => {
    if (currentToken !== elementsCounterRef.current[formField.id]) {
      return;
    }
    if (!Array.isArray(result)) {
      setFormValidity((prev) => {
        const newFormValidity = setValidityAtPath(
          prev,
          {
            elements: {
              type: "invalid",
              message: (0, import_i18n.__)("Could not validate elements.")
            }
          },
          [...path, formField.id]
        );
        return newFormValidity;
      });
      return;
    }
    if (formField.field?.isValid.elements && !formField.field.isValid.elements.validate(item, {
      ...formField.field,
      elements: result
    })) {
      setFormValidity((prev) => {
        const newFormValidity = setValidityAtPath(
          prev,
          {
            elements: {
              type: "invalid",
              message: (0, import_i18n.__)(
                "Value must be one of the elements."
              )
            }
          },
          [...path, formField.id]
        );
        return newFormValidity;
      });
    } else {
      setFormValidity((prev) => {
        return removeValidationProperty(
          prev,
          [...path, formField.id],
          "elements"
        );
      });
    }
  }).catch((error) => {
    if (currentToken !== elementsCounterRef.current[formField.id]) {
      return;
    }
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error) || (0, import_i18n.__)(
        "Unknown error when running elements validation asynchronously."
      );
    }
    setFormValidity((prev) => {
      const newFormValidity = setValidityAtPath(
        prev,
        {
          elements: {
            type: "invalid",
            message: errorMessage
          }
        },
        [...path, formField.id]
      );
      return newFormValidity;
    });
  });
}
function handleCustomValidationAsync(promise, formField, promiseHandler) {
  const { customCounterRef, setFormValidity, path } = promiseHandler;
  const currentToken = (customCounterRef.current[formField.id] || 0) + 1;
  customCounterRef.current[formField.id] = currentToken;
  promise.then((result) => {
    if (currentToken !== customCounterRef.current[formField.id]) {
      return;
    }
    if (result === null) {
      setFormValidity((prev) => {
        return removeValidationProperty(
          prev,
          [...path, formField.id],
          "custom"
        );
      });
      return;
    }
    if (typeof result === "string") {
      setFormValidity((prev) => {
        const newFormValidity = setValidityAtPath(
          prev,
          {
            custom: {
              type: "invalid",
              message: result
            }
          },
          [...path, formField.id]
        );
        return newFormValidity;
      });
      return;
    }
    setFormValidity((prev) => {
      const newFormValidity = setValidityAtPath(
        prev,
        {
          custom: {
            type: "invalid",
            message: (0, import_i18n.__)("Validation could not be processed.")
          }
        },
        [...path, formField.id]
      );
      return newFormValidity;
    });
  }).catch((error) => {
    if (currentToken !== customCounterRef.current[formField.id]) {
      return;
    }
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error) || (0, import_i18n.__)(
        "Unknown error when running custom validation asynchronously."
      );
    }
    setFormValidity((prev) => {
      const newFormValidity = setValidityAtPath(
        prev,
        {
          custom: {
            type: "invalid",
            message: errorMessage
          }
        },
        [...path, formField.id]
      );
      return newFormValidity;
    });
  });
}
function validateFormField(item, formField, promiseHandler) {
  if (formField.field?.isValid.required && !formField.field.isValid.required.validate(item, formField.field)) {
    return {
      required: { type: "invalid" }
    };
  }
  if (formField.field?.isValid.pattern && !formField.field.isValid.pattern.validate(item, formField.field)) {
    return {
      pattern: {
        type: "invalid",
        message: (0, import_i18n.__)("Value does not match the required pattern.")
      }
    };
  }
  if (formField.field?.isValid.min && !formField.field.isValid.min.validate(item, formField.field)) {
    return {
      min: {
        type: "invalid",
        message: (0, import_i18n.__)("Value is below the minimum.")
      }
    };
  }
  if (formField.field?.isValid.max && !formField.field.isValid.max.validate(item, formField.field)) {
    return {
      max: {
        type: "invalid",
        message: (0, import_i18n.__)("Value is above the maximum.")
      }
    };
  }
  if (formField.field?.isValid.minLength && !formField.field.isValid.minLength.validate(item, formField.field)) {
    return {
      minLength: {
        type: "invalid",
        message: (0, import_i18n.__)("Value is too short.")
      }
    };
  }
  if (formField.field?.isValid.maxLength && !formField.field.isValid.maxLength.validate(item, formField.field)) {
    return {
      maxLength: {
        type: "invalid",
        message: (0, import_i18n.__)("Value is too long.")
      }
    };
  }
  if (formField.field?.isValid.elements && formField.field.hasElements && !formField.field.getElements && Array.isArray(formField.field.elements) && !formField.field.isValid.elements.validate(item, formField.field)) {
    return {
      elements: {
        type: "invalid",
        message: (0, import_i18n.__)("Value must be one of the elements.")
      }
    };
  }
  let customError;
  if (!!formField.field && formField.field.isValid.custom) {
    try {
      const value = formField.field.getValue({ item });
      customError = formField.field.isValid.custom(
        (0, import_deepmerge.default)(
          item,
          formField.field.setValue({
            item,
            value
          })
        ),
        formField.field
      );
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error) || (0, import_i18n.__)("Unknown error when running custom validation.");
      }
      return {
        custom: {
          type: "invalid",
          message: errorMessage
        }
      };
    }
  }
  if (typeof customError === "string") {
    return {
      custom: {
        type: "invalid",
        message: customError
      }
    };
  }
  const fieldValidity = {};
  if (!!formField.field && formField.field.isValid.elements && formField.field.hasElements && typeof formField.field.getElements === "function") {
    handleElementsValidationAsync(
      formField.field.getElements(),
      formField,
      promiseHandler
    );
    fieldValidity.elements = {
      type: "validating",
      message: (0, import_i18n.__)("Validating\u2026")
    };
  }
  if (customError instanceof Promise) {
    handleCustomValidationAsync(customError, formField, promiseHandler);
    fieldValidity.custom = {
      type: "validating",
      message: (0, import_i18n.__)("Validating\u2026")
    };
  }
  if (Object.keys(fieldValidity).length > 0) {
    return fieldValidity;
  }
  if (formField.children.length > 0) {
    const result = {};
    formField.children.forEach((child) => {
      result[child.id] = validateFormField(item, child, {
        ...promiseHandler,
        path: [...promiseHandler.path, formField.id, "children"]
      });
    });
    const filteredResult = {};
    Object.entries(result).forEach(([key, value]) => {
      if (value !== void 0) {
        filteredResult[key] = value;
      }
    });
    if (Object.keys(filteredResult).length === 0) {
      return void 0;
    }
    return {
      children: filteredResult
    };
  }
  return void 0;
}
function getFormFieldValue(formField, item) {
  const fieldValue = formField?.field?.getValue({ item });
  if (formField.children.length === 0) {
    return fieldValue;
  }
  const childrenValues = formField.children.map(
    (child) => getFormFieldValue(child, item)
  );
  if (!childrenValues) {
    return fieldValue;
  }
  return {
    value: fieldValue,
    children: childrenValues
  };
}
function useFormValidity(item, fields, form) {
  const [formValidity, setFormValidity] = (0, import_element.useState)();
  const customCounterRef = (0, import_element.useRef)({});
  const elementsCounterRef = (0, import_element.useRef)({});
  const previousValuesRef = (0, import_element.useRef)({});
  const validate = (0, import_element.useCallback)(() => {
    const promiseHandler = {
      customCounterRef,
      elementsCounterRef,
      setFormValidity,
      path: [],
      item
    };
    const formFieldsToValidate = getFormFieldsToValidate(form, fields);
    if (formFieldsToValidate.length === 0) {
      setFormValidity(void 0);
      return;
    }
    const newFormValidity = {};
    const untouchedFields = [];
    formFieldsToValidate.forEach((formField) => {
      const value = getFormFieldValue(formField, item);
      if (previousValuesRef.current.hasOwnProperty(formField.id) && (0, import_es6.default)(
        previousValuesRef.current[formField.id],
        value
      )) {
        untouchedFields.push(formField.id);
        return;
      }
      previousValuesRef.current[formField.id] = value;
      const fieldValidity = validateFormField(
        item,
        formField,
        promiseHandler
      );
      if (fieldValidity !== void 0) {
        newFormValidity[formField.id] = fieldValidity;
      }
    });
    setFormValidity((existingFormValidity) => {
      let validity = {
        ...existingFormValidity,
        ...newFormValidity
      };
      const fieldsToKeep = [
        ...untouchedFields,
        ...Object.keys(newFormValidity)
      ];
      Object.keys(validity).forEach((key) => {
        if (validity && !fieldsToKeep.includes(key)) {
          delete validity[key];
        }
      });
      if (Object.keys(validity).length === 0) {
        validity = void 0;
      }
      const areEqual = (0, import_es6.default)(existingFormValidity, validity);
      if (areEqual) {
        return existingFormValidity;
      }
      return validity;
    });
  }, [item, fields, form]);
  (0, import_element.useEffect)(() => {
    validate();
  }, [validate]);
  return {
    validity: formValidity,
    isValid: isFormValid(formValidity)
  };
}
var use_form_validity_default = useFormValidity;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFormValidity
});
//# sourceMappingURL=use-form-validity.cjs.map
