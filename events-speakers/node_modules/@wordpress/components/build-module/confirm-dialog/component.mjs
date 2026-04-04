// packages/components/src/confirm-dialog/component.tsx
import { __ } from "@wordpress/i18n";
import { useCallback, useEffect, useRef, useState } from "@wordpress/element";
import Modal from "../modal/index.mjs";
import { useContextSystem, contextConnect } from "../context/index.mjs";
import { Flex } from "../flex/index.mjs";
import Button from "../button/index.mjs";
import { Text } from "../text/index.mjs";
import { VStack } from "../v-stack/index.mjs";
import * as styles from "./styles.mjs";
import { useCx } from "../utils/hooks/use-cx.mjs";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var UnconnectedConfirmDialog = (props, forwardedRef) => {
  const {
    isOpen: isOpenProp,
    onConfirm,
    onCancel,
    children,
    confirmButtonText,
    cancelButtonText,
    isBusy,
    ...otherProps
  } = useContextSystem(props, "ConfirmDialog");
  const cx = useCx();
  const wrapperClassName = cx(styles.wrapper);
  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState();
  const [shouldSelfClose, setShouldSelfClose] = useState();
  useEffect(() => {
    const isIsOpenSet = typeof isOpenProp !== "undefined";
    setIsOpen(isIsOpenSet ? isOpenProp : true);
    setShouldSelfClose(!isIsOpenSet);
  }, [isOpenProp]);
  const handleEvent = useCallback((callback) => (event) => {
    callback?.(event);
    if (shouldSelfClose) {
      setIsOpen(false);
    }
  }, [shouldSelfClose, setIsOpen]);
  const handleEnter = useCallback((event) => {
    const isConfirmOrCancelButton = event.target === cancelButtonRef.current || event.target === confirmButtonRef.current;
    if (!isConfirmOrCancelButton && event.key === "Enter") {
      handleEvent(onConfirm)(event);
    }
  }, [handleEvent, onConfirm]);
  const cancelLabel = cancelButtonText ?? __("Cancel");
  const confirmLabel = confirmButtonText ?? __("OK");
  return /* @__PURE__ */ _jsx(_Fragment, {
    children: isOpen && /* @__PURE__ */ _jsx(Modal, {
      onRequestClose: handleEvent(onCancel),
      onKeyDown: handleEnter,
      closeButtonLabel: cancelLabel,
      isDismissible: true,
      ref: forwardedRef,
      overlayClassName: wrapperClassName,
      __experimentalHideHeader: true,
      ...otherProps,
      children: /* @__PURE__ */ _jsxs(VStack, {
        spacing: 8,
        children: [/* @__PURE__ */ _jsx(Text, {
          children
        }), /* @__PURE__ */ _jsxs(Flex, {
          direction: "row",
          justify: "flex-end",
          children: [/* @__PURE__ */ _jsx(Button, {
            __next40pxDefaultSize: true,
            ref: cancelButtonRef,
            variant: "tertiary",
            onClick: handleEvent(onCancel),
            accessibleWhenDisabled: true,
            disabled: isBusy,
            children: cancelLabel
          }), /* @__PURE__ */ _jsx(Button, {
            __next40pxDefaultSize: true,
            ref: confirmButtonRef,
            variant: "primary",
            onClick: handleEvent(onConfirm),
            accessibleWhenDisabled: true,
            disabled: isBusy,
            isBusy,
            children: confirmLabel
          })]
        })]
      })
    })
  });
};
var ConfirmDialog = contextConnect(UnconnectedConfirmDialog, "ConfirmDialog");
var component_default = ConfirmDialog;
export {
  ConfirmDialog,
  component_default as default
};
//# sourceMappingURL=component.mjs.map
