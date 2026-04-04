"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/components/dataviews-layouts/table/column-header-menu.tsx
var column_header_menu_exports = {};
__export(column_header_menu_exports, {
  default: () => column_header_menu_default
});
module.exports = __toCommonJS(column_header_menu_exports);
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_lock_unlock = require("../../../lock-unlock.cjs");
var import_constants = require("../../../constants.cjs");
var import_dataviews_context = __toESM(require("../../dataviews-context/index.cjs"));
var import_get_hideable_fields = __toESM(require("../../../utils/get-hideable-fields.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var { Menu } = (0, import_lock_unlock.unlock)(import_components.privateApis);
function WithMenuSeparators({ children }) {
  return import_element.Children.toArray(children).filter(Boolean).map((child, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_element.Fragment, { children: [
    i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Separator, {}),
    child
  ] }, i));
}
var _HeaderMenu = (0, import_element.forwardRef)(function HeaderMenu({
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
  const { setIsShowingFilter } = (0, import_element.useContext)(import_dataviews_context.default);
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
  const hiddenFields = (0, import_get_hideable_fields.default)(view, fields).filter(
    (f) => !visibleFieldIds.includes(f.id)
  );
  const canInsert = (canInsertLeft || canInsertRight) && !!hiddenFields.length;
  const isRtl = (0, import_i18n.isRTL)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      Menu.TriggerButton,
      {
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.Button,
          {
            size: "compact",
            className: "dataviews-view-table-header-button",
            ref,
            variant: "tertiary"
          }
        ),
        children: [
          header,
          view.sort && isSorted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: import_constants.sortArrows[view.sort.direction] })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Popover, { style: { minWidth: "240px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WithMenuSeparators, { children: [
      isSortable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Group, { children: import_constants.SORTING_DIRECTIONS.map(
        (direction) => {
          const isChecked = view.sort && isSorted && view.sort.direction === direction;
          const value = `${fieldId}-${direction}`;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: import_constants.sortLabels[direction] })
            },
            value
          );
        }
      ) }),
      canAddFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Group, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Menu.Item,
        {
          prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.funnel }),
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
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: (0, import_i18n.__)("Add filter") })
        }
      ) }),
      (canMove || isHidable || canInsert) && field && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu.Group, { children: [
        canMove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Menu.Item,
          {
            prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.arrowLeft }),
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
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: (0, import_i18n.__)("Move left") })
          }
        ),
        canMove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Menu.Item,
          {
            prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.arrowRight }),
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
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: (0, import_i18n.__)("Move right") })
          }
        ),
        canInsertLeft && !!hiddenFields.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.SubmenuTriggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: (0, import_i18n.__)("Insert left") }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Popover, { children: hiddenFields.map((hiddenField) => {
            const insertIndex = isRtl ? index + 1 : index;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: hiddenField.label })
              },
              hiddenField.id
            );
          }) })
        ] }),
        canInsertRight && !!hiddenFields.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.SubmenuTriggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: (0, import_i18n.__)("Insert right") }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Popover, { children: hiddenFields.map((hiddenField) => {
            const insertIndex = isRtl ? index : index + 1;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: hiddenField.label })
              },
              hiddenField.id
            );
          }) })
        ] }),
        isHidable && field && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Menu.Item,
          {
            prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.unseen }),
            onClick: () => {
              onHide(field);
              onChangeView({
                ...view,
                fields: visibleFieldIds.filter(
                  (id) => id !== fieldId
                )
              });
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: (0, import_i18n.__)("Hide column") })
          }
        )
      ] })
    ] }) })
  ] });
});
var ColumnHeaderMenu = _HeaderMenu;
var column_header_menu_default = ColumnHeaderMenu;
//# sourceMappingURL=column-header-menu.cjs.map
