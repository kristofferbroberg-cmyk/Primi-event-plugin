// packages/dom/src/dom/get-rectangle-from-range.js
import { assertIsDefined } from "../utils/assert-is-defined.mjs";
function getRectangleFromRange(range) {
  if (!range.collapsed) {
    const rects2 = Array.from(range.getClientRects());
    if (rects2.length === 1) {
      return rects2[0];
    }
    const filteredRects = rects2.filter(({ width }) => width > 1);
    if (filteredRects.length === 0) {
      return range.getBoundingClientRect();
    }
    if (filteredRects.length === 1) {
      return filteredRects[0];
    }
    let {
      top: furthestTop,
      bottom: furthestBottom,
      left: furthestLeft,
      right: furthestRight
    } = filteredRects[0];
    for (const { top, bottom, left, right } of filteredRects) {
      if (top < furthestTop) {
        furthestTop = top;
      }
      if (bottom > furthestBottom) {
        furthestBottom = bottom;
      }
      if (left < furthestLeft) {
        furthestLeft = left;
      }
      if (right > furthestRight) {
        furthestRight = right;
      }
    }
    return new window.DOMRect(
      furthestLeft,
      furthestTop,
      furthestRight - furthestLeft,
      furthestBottom - furthestTop
    );
  }
  const { startContainer } = range;
  const { ownerDocument } = startContainer;
  if (startContainer.nodeName === "BR") {
    const { parentNode } = startContainer;
    assertIsDefined(parentNode, "parentNode");
    const index = (
      /** @type {Node[]} */
      Array.from(parentNode.childNodes).indexOf(startContainer)
    );
    assertIsDefined(ownerDocument, "ownerDocument");
    range = ownerDocument.createRange();
    range.setStart(parentNode, index);
    range.setEnd(parentNode, index);
  }
  const rects = range.getClientRects();
  if (rects.length > 1) {
    return null;
  }
  let rect = rects[0];
  if (!rect || rect.height === 0) {
    assertIsDefined(ownerDocument, "ownerDocument");
    const padNode = ownerDocument.createTextNode("\u200B");
    range = range.cloneRange();
    range.insertNode(padNode);
    rect = range.getClientRects()[0];
    assertIsDefined(padNode.parentNode, "padNode.parentNode");
    padNode.parentNode.removeChild(padNode);
  }
  return rect;
}
export {
  getRectangleFromRange as default
};
//# sourceMappingURL=get-rectangle-from-range.mjs.map
