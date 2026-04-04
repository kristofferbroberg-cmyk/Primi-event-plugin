// packages/components/src/form-token-field/styles.ts
import _styled from "@emotion/styled/base";
import { css } from "@emotion/react";
import { Flex } from "../flex/index.mjs";
import { space } from "../utils/space.mjs";
import { boxSizingReset } from "../utils/index.mjs";
var deprecatedPaddings = ({
  __next40pxDefaultSize,
  hasTokens
}) => !__next40pxDefaultSize && /* @__PURE__ */ css("padding-top:", space(hasTokens ? 1 : 0.5), ";padding-bottom:", space(hasTokens ? 1 : 0.5), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:deprecatedPaddings;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QkkiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBGbGV4IH0gZnJvbSAnLi4vZmxleCc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uL3V0aWxzL3NwYWNlJztcbmltcG9ydCB7IGJveFNpemluZ1Jlc2V0IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG50eXBlIFRva2Vuc0FuZElucHV0V3JhcHBlclByb3BzID0ge1xuXHRfX25leHQ0MHB4RGVmYXVsdFNpemU6IGJvb2xlYW47XG5cdGhhc1Rva2VuczogYm9vbGVhbjtcbn07XG5cbmNvbnN0IGRlcHJlY2F0ZWRQYWRkaW5ncyA9ICgge1xuXHRfX25leHQ0MHB4RGVmYXVsdFNpemUsXG5cdGhhc1Rva2Vucyxcbn06IFRva2Vuc0FuZElucHV0V3JhcHBlclByb3BzICkgPT5cblx0ISBfX25leHQ0MHB4RGVmYXVsdFNpemUgJiZcblx0Y3NzYFxuXHRcdHBhZGRpbmctdG9wOiAkeyBzcGFjZSggaGFzVG9rZW5zID8gMSA6IDAuNSApIH07XG5cdFx0cGFkZGluZy1ib3R0b206ICR7IHNwYWNlKCBoYXNUb2tlbnMgPyAxIDogMC41ICkgfTtcblx0YDtcblxuZXhwb3J0IGNvbnN0IFRva2Vuc0FuZElucHV0V3JhcHBlckZsZXggPSBzdHlsZWQoIEZsZXggKWBcblx0cGFkZGluZzogN3B4O1xuXHQkeyBib3hTaXppbmdSZXNldCB9XG5cblx0JHsgZGVwcmVjYXRlZFBhZGRpbmdzIH1cbmA7XG4iXX0= */");
var TokensAndInputWrapperFlex = /* @__PURE__ */ _styled(Flex, process.env.NODE_ENV === "production" ? {
  target: "ehq8nmi0"
} : {
  target: "ehq8nmi0",
  label: "TokensAndInputWrapperFlex"
})("padding:7px;", boxSizingReset, " ", deprecatedPaddings, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0QnVEIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgRmxleCB9IGZyb20gJy4uL2ZsZXgnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi91dGlscy9zcGFjZSc7XG5pbXBvcnQgeyBib3hTaXppbmdSZXNldCB9IGZyb20gJy4uL3V0aWxzJztcblxudHlwZSBUb2tlbnNBbmRJbnB1dFdyYXBwZXJQcm9wcyA9IHtcblx0X19uZXh0NDBweERlZmF1bHRTaXplOiBib29sZWFuO1xuXHRoYXNUb2tlbnM6IGJvb2xlYW47XG59O1xuXG5jb25zdCBkZXByZWNhdGVkUGFkZGluZ3MgPSAoIHtcblx0X19uZXh0NDBweERlZmF1bHRTaXplLFxuXHRoYXNUb2tlbnMsXG59OiBUb2tlbnNBbmRJbnB1dFdyYXBwZXJQcm9wcyApID0+XG5cdCEgX19uZXh0NDBweERlZmF1bHRTaXplICYmXG5cdGNzc2Bcblx0XHRwYWRkaW5nLXRvcDogJHsgc3BhY2UoIGhhc1Rva2VucyA/IDEgOiAwLjUgKSB9O1xuXHRcdHBhZGRpbmctYm90dG9tOiAkeyBzcGFjZSggaGFzVG9rZW5zID8gMSA6IDAuNSApIH07XG5cdGA7XG5cbmV4cG9ydCBjb25zdCBUb2tlbnNBbmRJbnB1dFdyYXBwZXJGbGV4ID0gc3R5bGVkKCBGbGV4IClgXG5cdHBhZGRpbmc6IDdweDtcblx0JHsgYm94U2l6aW5nUmVzZXQgfVxuXG5cdCR7IGRlcHJlY2F0ZWRQYWRkaW5ncyB9XG5gO1xuIl19 */"));
export {
  TokensAndInputWrapperFlex
};
//# sourceMappingURL=styles.mjs.map
