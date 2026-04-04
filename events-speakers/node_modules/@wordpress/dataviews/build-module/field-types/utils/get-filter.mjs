// packages/dataviews/src/field-types/utils/get-filter.ts
import { getOperatorByName } from "../../utils/operators.mjs";
function getFilter(fieldType) {
  return fieldType.validOperators.reduce((accumulator, operator) => {
    const operatorObj = getOperatorByName(operator);
    if (operatorObj?.filter) {
      accumulator[operator] = operatorObj.filter;
    }
    return accumulator;
  }, {});
}
export {
  getFilter as default
};
//# sourceMappingURL=get-filter.mjs.map
