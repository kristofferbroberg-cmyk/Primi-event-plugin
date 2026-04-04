// packages/rich-text/src/private-apis.js
import { lock } from "./lock-unlock.mjs";
import { useRichText } from "./hook/index.mjs";
var privateApis = {};
lock(privateApis, {
  useRichText
});
export {
  privateApis
};
//# sourceMappingURL=private-apis.mjs.map
