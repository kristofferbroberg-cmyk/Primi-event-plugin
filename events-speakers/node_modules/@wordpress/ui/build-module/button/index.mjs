// packages/ui/src/button/index.ts
import { Button as ButtonButton } from "./button.mjs";
import { ButtonIcon } from "./icon.mjs";
var Button = Object.assign(ButtonButton, {
  /**
   * An icon component specifically designed to work well when rendered inside
   * a `Button` component.
   */
  Icon: ButtonIcon
});
export {
  Button
};
//# sourceMappingURL=index.mjs.map
