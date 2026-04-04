// packages/components/src/draggable/index.tsx
import { throttle } from "@wordpress/compose";
import { useEffect, useRef } from "@wordpress/element";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var dragImageClass = "components-draggable__invisible-drag-image";
var cloneWrapperClass = "components-draggable__clone";
var clonePadding = 0;
var bodyClass = "is-dragging-components-draggable";
function Draggable({
  children,
  onDragStart,
  onDragOver,
  onDragEnd,
  appendToOwnerDocument = false,
  cloneClassname,
  elementId,
  transferData,
  __experimentalTransferDataType: transferDataType = "text",
  __experimentalDragComponent: dragComponent
}) {
  const dragComponentRef = useRef(null);
  const cleanupRef = useRef(() => {
  });
  function end(event) {
    event.preventDefault();
    cleanupRef.current();
    if (onDragEnd) {
      onDragEnd(event);
    }
  }
  function start(event) {
    const {
      ownerDocument
    } = event.target;
    event.dataTransfer.setData(transferDataType, JSON.stringify(transferData));
    const cloneWrapper = ownerDocument.createElement("div");
    cloneWrapper.style.top = "0";
    cloneWrapper.style.left = "0";
    const dragImage = ownerDocument.createElement("div");
    if ("function" === typeof event.dataTransfer.setDragImage) {
      dragImage.classList.add(dragImageClass);
      ownerDocument.body.appendChild(dragImage);
      event.dataTransfer.setDragImage(dragImage, 0, 0);
    }
    cloneWrapper.classList.add(cloneWrapperClass);
    if (cloneClassname) {
      cloneWrapper.classList.add(cloneClassname);
    }
    let x = 0;
    let y = 0;
    if (dragComponentRef.current) {
      x = event.clientX;
      y = event.clientY;
      cloneWrapper.style.transform = `translate( ${x}px, ${y}px )`;
      const clonedDragComponent = ownerDocument.createElement("div");
      clonedDragComponent.innerHTML = dragComponentRef.current.innerHTML;
      cloneWrapper.appendChild(clonedDragComponent);
      ownerDocument.body.appendChild(cloneWrapper);
    } else {
      const element = ownerDocument.getElementById(elementId);
      const elementRect = element.getBoundingClientRect();
      const elementWrapper = element.parentNode;
      const elementTopOffset = elementRect.top;
      const elementLeftOffset = elementRect.left;
      cloneWrapper.style.width = `${elementRect.width + clonePadding * 2}px`;
      const clone = element.cloneNode(true);
      clone.id = `clone-${elementId}`;
      x = elementLeftOffset - clonePadding;
      y = elementTopOffset - clonePadding;
      cloneWrapper.style.transform = `translate( ${x}px, ${y}px )`;
      Array.from(clone.querySelectorAll("iframe")).forEach((child) => child.parentNode?.removeChild(child));
      cloneWrapper.appendChild(clone);
      if (appendToOwnerDocument) {
        ownerDocument.body.appendChild(cloneWrapper);
      } else {
        elementWrapper?.appendChild(cloneWrapper);
      }
    }
    let cursorLeft = event.clientX;
    let cursorTop = event.clientY;
    function over(e) {
      if (cursorLeft === e.clientX && cursorTop === e.clientY) {
        return;
      }
      const nextX = x + e.clientX - cursorLeft;
      const nextY = y + e.clientY - cursorTop;
      cloneWrapper.style.transform = `translate( ${nextX}px, ${nextY}px )`;
      cursorLeft = e.clientX;
      cursorTop = e.clientY;
      x = nextX;
      y = nextY;
      if (onDragOver) {
        onDragOver(e);
      }
    }
    const throttledDragOver = throttle(over, 16);
    ownerDocument.addEventListener("dragover", throttledDragOver);
    ownerDocument.body.classList.add(bodyClass);
    if (onDragStart) {
      onDragStart(event);
    }
    cleanupRef.current = () => {
      if (cloneWrapper && cloneWrapper.parentNode) {
        cloneWrapper.parentNode.removeChild(cloneWrapper);
      }
      if (dragImage && dragImage.parentNode) {
        dragImage.parentNode.removeChild(dragImage);
      }
      ownerDocument.body.classList.remove(bodyClass);
      ownerDocument.removeEventListener("dragover", throttledDragOver);
    };
  }
  useEffect(() => () => {
    cleanupRef.current();
  }, []);
  return /* @__PURE__ */ _jsxs(_Fragment, {
    children: [children({
      onDraggableStart: start,
      onDraggableEnd: end
    }), dragComponent && /* @__PURE__ */ _jsx("div", {
      className: "components-draggable-drag-component-root",
      style: {
        display: "none"
      },
      ref: dragComponentRef,
      children: dragComponent
    })]
  });
}
var draggable_default = Draggable;
export {
  Draggable,
  draggable_default as default
};
//# sourceMappingURL=index.mjs.map
