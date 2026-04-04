// packages/dataviews/src/components/dataviews-layouts/activity/index.tsx
import clsx from "clsx";
import { Spinner } from "@wordpress/components";
import { Stack } from "@wordpress/ui";
import getDataByGroup from "../utils/get-data-by-group.mjs";
import ActivityGroup from "./activity-group.mjs";
import ActivityItems from "./activity-items.mjs";
import { useDelayedLoading } from "../../../hooks/use-delayed-loading.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function ViewActivity(props) {
  const { empty, data, fields, isLoading, view, className } = props;
  const isDelayedLoading = useDelayedLoading(!!isLoading);
  const hasData = !!data?.length;
  const groupField = view.groupBy?.field ? fields.find((field) => field.id === view.groupBy?.field) : null;
  const dataByGroup = hasData && groupField ? getDataByGroup(data, groupField) : null;
  const isInfiniteScroll = view.infiniteScrollEnabled && !dataByGroup;
  if (!hasData) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx("dataviews-no-results", {
          "is-refreshing": isDelayedLoading
        }),
        children: empty
      }
    );
  }
  const isInert = !isInfiniteScroll && !!isLoading;
  const wrapperClassName = clsx("dataviews-view-activity", className, {
    "is-refreshing": !isInfiniteScroll && isDelayedLoading
  });
  const groupedEntries = dataByGroup ? Array.from(dataByGroup.entries()) : [];
  if (hasData && groupField && dataByGroup) {
    return /* @__PURE__ */ jsx(
      Stack,
      {
        direction: "column",
        gap: "sm",
        className: wrapperClassName,
        inert: isInert ? "true" : void 0,
        children: groupedEntries.map(
          ([groupName, groupData]) => /* @__PURE__ */ jsx(
            ActivityGroup,
            {
              groupName,
              groupData,
              groupField,
              showLabel: view.groupBy?.showLabel !== false,
              children: /* @__PURE__ */ jsx(
                ActivityItems,
                {
                  ...props,
                  data: groupData
                }
              )
            },
            groupName
          )
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: wrapperClassName,
        role: view.infiniteScrollEnabled ? "feed" : void 0,
        inert: isInert ? "true" : void 0,
        children: /* @__PURE__ */ jsx(ActivityItems, { ...props })
      }
    ),
    isInfiniteScroll && isLoading && /* @__PURE__ */ jsx("p", { className: "dataviews-loading-more", children: /* @__PURE__ */ jsx(Spinner, {}) })
  ] });
}
export {
  ViewActivity as default
};
//# sourceMappingURL=index.mjs.map
