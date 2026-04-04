// packages/dataviews/src/components/dataviews-layouts/table/column-header-menu.tsx
import { __, isRTL } from "@wordpress/i18n";
import { arrowLeft, arrowRight, unseen, funnel } from "@wordpress/icons";
import {
  Button,
  Icon,
  privateApis as componentsPrivateApis
} from "@wordpress/components";
import { forwardRef, Children, Fragment, useContext } from "@wordpress/element";
import { unlock } from "../../../lock-unlock.mjs";
import { SORTING_DIRECTIONS, sortArrows, sortLabels } from "../../../constants.mjs";
import DataViewsContext from "../../dataviews-context/index.mjs";
import getHideableFields from "../../../utils/get-hideable-fields.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var { Menu } = unlock(componentsPrivateApis);
function WithMenuSeparators({ children }) {
  return Children.toArray(children).filter(Boolean).map((child, i) => /* @__PURE__ */ jsxs(Fragment, { children: [
    i > 0 && /* @__PURE__ */ jsx(Menu.Separator, {}),
    child
  ] }, i));
}
var _HeaderMenu = forwardRef(function HeaderMenu({
  fieldId,
  view,
  fields,
  onChangeView,
  onHide,
  setOpenedFilter,
  canMove = true,
  canInsertLeft = true,
  canInsertRight = true
}, ref) {
  const visibleFieldIds = view.fields ?? [];
  const index = visibleFieldIds?.indexOf(fieldId);
  const isSorted = view.sort?.field === fieldId;
  let isHidable = false;
  let isSortable = false;
  let canAddFilter = false;
  let operators = [];
  const field = fields.find((f) => f.id === fieldId);
  const { setIsShowingFilter } = useContext(DataViewsContext);
  if (!field) {
    return null;
  }
  isHidable = field.enableHiding !== false;
  isSortable = field.enableSorting !== false;
  const header = field.header;
  operators = !!field.filterBy && field.filterBy?.operators || [];
  canAddFilter = !view.filters?.some((_filter) => fieldId === _filter.field) && !!(field.hasElements || field.Edit) && field.filterBy !== false && !field.filterBy?.isPrimary;
  if (!isSortable && !canMove && !isHidable && !canAddFilter) {
    return header;
  }
  const hiddenFields = getHideableFields(view, fields).filter(
    (f) => !visibleFieldIds.includes(f.id)
  );
  const canInsert = (canInsertLeft || canInsertRight) && !!hiddenFields.length;
  const isRtl = isRTL();
  return /* @__PURE__ */ jsxs(Menu, { children: [
    /* @__PURE__ */ jsxs(
      Menu.TriggerButton,
      {
        render: /* @__PURE__ */ jsx(
          Button,
          {
            size: "compact",
            className: "dataviews-view-table-header-button",
            ref,
            variant: "tertiary"
          }
        ),
        children: [
          header,
          view.sort && isSorted && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: sortArrows[view.sort.direction] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Menu.Popover, { style: { minWidth: "240px" }, children: /* @__PURE__ */ jsxs(WithMenuSeparators, { children: [
      isSortable && /* @__PURE__ */ jsx(Menu.Group, { children: SORTING_DIRECTIONS.map(
        (direction) => {
          const isChecked = view.sort && isSorted && view.sort.direction === direction;
          const value = `${fieldId}-${direction}`;
          return /* @__PURE__ */ jsx(
            Menu.RadioItem,
            {
              name: "view-table-sorting",
              value,
              checked: isChecked,
              onChange: () => {
                onChangeView({
                  ...view,
                  sort: {
                    field: fieldId,
                    direction
                  },
                  showLevels: false
                });
              },
              children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: sortLabels[direction] })
            },
            value
          );
        }
      ) }),
      canAddFilter && /* @__PURE__ */ jsx(Menu.Group, { children: /* @__PURE__ */ jsx(
        Menu.Item,
        {
          prefix: /* @__PURE__ */ jsx(Icon, { icon: funnel }),
          onClick: () => {
            setOpenedFilter(fieldId);
            setIsShowingFilter(true);
            onChangeView({
              ...view,
              page: 1,
              filters: [
                ...view.filters || [],
                {
                  field: fieldId,
                  value: void 0,
                  operator: operators[0]
                }
              ]
            });
          },
          children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: __("Add filter") })
        }
      ) }),
      (canMove || isHidable || canInsert) && field && /* @__PURE__ */ jsxs(Menu.Group, { children: [
        canMove && /* @__PURE__ */ jsx(
          Menu.Item,
          {
            prefix: /* @__PURE__ */ jsx(Icon, { icon: arrowLeft }),
            disabled: isRtl ? index >= visibleFieldIds.length - 1 : index < 1,
            onClick: () => {
              const targetIndex = isRtl ? index + 1 : index - 1;
              const newFields = [
                ...visibleFieldIds
              ];
              newFields.splice(index, 1);
              newFields.splice(
                targetIndex,
                0,
                fieldId
              );
              onChangeView({
                ...view,
                fields: newFields
              });
            },
            children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: __("Move left") })
          }
        ),
        canMove && /* @__PURE__ */ jsx(
          Menu.Item,
          {
            prefix: /* @__PURE__ */ jsx(Icon, { icon: arrowRight }),
            disabled: isRtl ? index < 1 : index >= visibleFieldIds.length - 1,
            onClick: () => {
              const targetIndex = isRtl ? index - 1 : index + 1;
              const newFields = [
                ...visibleFieldIds
              ];
              newFields.splice(index, 1);
              newFields.splice(
                targetIndex,
                0,
                fieldId
              );
              onChangeView({
                ...view,
                fields: newFields
              });
            },
            children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: __("Move right") })
          }
        ),
        canInsertLeft && !!hiddenFields.length && /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Menu.SubmenuTriggerItem, { children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: __("Insert left") }) }),
          /* @__PURE__ */ jsx(Menu.Popover, { children: hiddenFields.map((hiddenField) => {
            const insertIndex = isRtl ? index + 1 : index;
            return /* @__PURE__ */ jsx(
              Menu.Item,
              {
                onClick: () => {
                  onChangeView({
                    ...view,
                    fields: [
                      ...visibleFieldIds.slice(
                        0,
                        insertIndex
                      ),
                      hiddenField.id,
                      ...visibleFieldIds.slice(
                        insertIndex
                      )
                    ]
                  });
                },
                children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: hiddenField.label })
              },
              hiddenField.id
            );
          }) })
        ] }),
        canInsertRight && !!hiddenFields.length && /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Menu.SubmenuTriggerItem, { children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: __("Insert right") }) }),
          /* @__PURE__ */ jsx(Menu.Popover, { children: hiddenFields.map((hiddenField) => {
            const insertIndex = isRtl ? index : index + 1;
            return /* @__PURE__ */ jsx(
              Menu.Item,
              {
                onClick: () => {
                  onChangeView({
                    ...view,
                    fields: [
                      ...visibleFieldIds.slice(
                        0,
                        insertIndex
                      ),
                      hiddenField.id,
                      ...visibleFieldIds.slice(
                        insertIndex
                      )
                    ]
                  });
                },
                children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: hiddenField.label })
              },
              hiddenField.id
            );
          }) })
        ] }),
        isHidable && field && /* @__PURE__ */ jsx(
          Menu.Item,
          {
            prefix: /* @__PURE__ */ jsx(Icon, { icon: unseen }),
            onClick: () => {
              onHide(field);
              onChangeView({
                ...view,
                fields: visibleFieldIds.filter(
                  (id) => id !== fieldId
                )
              });
            },
            children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: __("Hide column") })
          }
        )
      ] })
    ] }) })
  ] });
});
var ColumnHeaderMenu = _HeaderMenu;
var column_header_menu_default = ColumnHeaderMenu;
export {
  column_header_menu_default as default
};
//# sourceMappingURL=column-header-menu.mjs.map
