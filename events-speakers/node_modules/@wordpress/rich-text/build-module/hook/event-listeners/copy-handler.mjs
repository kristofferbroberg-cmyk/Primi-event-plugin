// packages/rich-text/src/hook/event-listeners/copy-handler.js
import { toHTMLString } from "../../to-html-string.mjs";
import { isCollapsed } from "../../is-collapsed.mjs";
import { slice } from "../../slice.mjs";
import { getTextContent } from "../../get-text-content.mjs";
var copy_handler_default = (props) => (element) => {
  function onCopy(event) {
    const { record } = props.current;
    const { ownerDocument } = element;
    if (isCollapsed(record.current) || !element.contains(ownerDocument.activeElement)) {
      return;
    }
    const selectedRecord = slice(record.current);
    const plainText = getTextContent(selectedRecord);
    const html = toHTMLString({ value: selectedRecord });
    event.clipboardData.setData("text/plain", plainText);
    event.clipboardData.setData("text/html", html);
    event.clipboardData.setData("rich-text", "true");
    event.preventDefault();
    if (event.type === "cut") {
      ownerDocument.execCommand("delete");
    }
  }
  const { defaultView } = element.ownerDocument;
  defaultView.addEventListener("copy", onCopy);
  defaultView.addEventListener("cut", onCopy);
  return () => {
    defaultView.removeEventListener("copy", onCopy);
    defaultView.removeEventListener("cut", onCopy);
  };
};
export {
  copy_handler_default as default
};
//# sourceMappingURL=copy-handler.mjs.map
