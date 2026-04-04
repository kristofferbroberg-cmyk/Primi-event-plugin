// packages/dataviews/src/components/dataform-controls/array.tsx
import { privateApis, Spinner } from "@wordpress/components";
import { useCallback, useMemo } from "@wordpress/element";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import useElements from "../../hooks/use-elements.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedFormTokenField } = unlock(privateApis);
function ArrayControl({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { label, placeholder, getValue, setValue, isValid } = field;
  const value = getValue({ item: data });
  const { elements, isLoading } = useElements({
    elements: field.elements,
    getElements: field.getElements
  });
  const arrayValueAsElements = useMemo(
    () => Array.isArray(value) ? value.map((token) => {
      const element = elements?.find(
        (suggestion) => suggestion.value === token
      );
      return element || { value: token, label: token };
    }) : [],
    [value, elements]
  );
  const onChangeControl = useCallback(
    (tokens) => {
      const valueTokens = tokens.map((token) => {
        if (typeof token === "object" && "value" in token) {
          return token.value;
        }
        return token;
      });
      onChange(setValue({ item: data, value: valueTokens }));
    },
    [onChange, setValue, data]
  );
  if (isLoading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsx(
    ValidatedFormTokenField,
    {
      required: !!isValid?.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      label: hideLabelFromVision ? void 0 : label,
      value: arrayValueAsElements,
      onChange: onChangeControl,
      placeholder,
      suggestions: elements?.map((element) => element.value),
      __experimentalValidateInput: (token) => {
        if (field.isValid?.elements && elements) {
          return elements.some(
            (element) => element.value === token || element.label === token
          );
        }
        return true;
      },
      __experimentalExpandOnFocus: elements && elements.length > 0,
      __experimentalShowHowTo: !field.isValid?.elements,
      displayTransform: (token) => {
        if (typeof token === "object" && "label" in token) {
          return token.label;
        }
        if (typeof token === "string" && elements) {
          const element = elements.find(
            (el) => el.value === token
          );
          return element?.label || token;
        }
        return token;
      },
      __experimentalRenderItem: ({ item }) => {
        if (typeof item === "string" && elements) {
          const element = elements.find(
            (el) => el.value === item
          );
          return /* @__PURE__ */ jsx("span", { children: element?.label || item });
        }
        return /* @__PURE__ */ jsx("span", { children: item });
      }
    }
  );
}
export {
  ArrayControl as default
};
//# sourceMappingURL=array.mjs.map
