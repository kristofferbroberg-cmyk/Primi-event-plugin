// packages/components/src/form-file-upload/index.tsx
import { useRef } from "@wordpress/element";
import Button from "../button/index.mjs";
import { maybeWarnDeprecated36pxSize } from "../utils/deprecated-36px-size.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function FormFileUpload({
  accept,
  children,
  multiple = false,
  onChange,
  onClick,
  render,
  ...props
}) {
  const ref = useRef(null);
  const openFileDialog = () => {
    ref.current?.click();
  };
  if (!render) {
    maybeWarnDeprecated36pxSize({
      componentName: "FormFileUpload",
      __next40pxDefaultSize: props.__next40pxDefaultSize,
      // @ts-expect-error - We don't "officially" support all Button props but this likely happens.
      size: props.size
    });
  }
  const ui = render ? render({
    openFileDialog
  }) : (
    // Disable reason: the parent component already takes care of the `__next40pxDefaultSize` prop.
    // eslint-disable-next-line @wordpress/components-no-missing-40px-size-prop
    /* @__PURE__ */ _jsx(Button, {
      onClick: openFileDialog,
      ...props,
      children
    })
  );
  const compatAccept = accept?.includes("audio/*") ? `${accept}, audio/mp3, audio/x-m4a, audio/x-m4b, audio/x-m4p, audio/x-wav, audio/webm` : accept;
  return /* @__PURE__ */ _jsxs("div", {
    className: "components-form-file-upload",
    children: [ui, /* @__PURE__ */ _jsx("input", {
      type: "file",
      ref,
      multiple,
      style: {
        display: "none"
      },
      accept: compatAccept,
      onChange,
      onClick,
      "data-testid": "form-file-upload-input"
    })]
  });
}
var form_file_upload_default = FormFileUpload;
export {
  FormFileUpload,
  form_file_upload_default as default
};
//# sourceMappingURL=index.mjs.map
