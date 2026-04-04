// packages/components/src/navigation/menu/search-no-results-found.tsx
import { __ } from "@wordpress/i18n";
import { useNavigationContext } from "../context.mjs";
import { ItemBaseUI, ItemUI } from "../styles/navigation-styles.mjs";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
function NavigationSearchNoResultsFound({
  search
}) {
  const {
    navigationTree: {
      items
    }
  } = useNavigationContext();
  const resultsCount = Object.values(items).filter((item) => item._isVisible).length;
  if (!search || !!resultsCount) {
    return null;
  }
  return /* @__PURE__ */ _jsx(ItemBaseUI, {
    children: /* @__PURE__ */ _jsxs(ItemUI, {
      children: [__("No results found."), " "]
    })
  });
}
export {
  NavigationSearchNoResultsFound as default
};
//# sourceMappingURL=search-no-results-found.mjs.map
