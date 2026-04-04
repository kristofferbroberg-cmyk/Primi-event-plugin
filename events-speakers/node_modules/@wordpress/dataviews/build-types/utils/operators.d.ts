import type { ReactElement } from 'react';
/**
 * Internal dependencies
 */
import type { FilterOperator, NormalizedFilter, Operator, Option } from '../types';
declare const getOperatorByName: (name: string | undefined) => {
    name: Operator;
    label: string;
    filterText: (filter: NormalizedFilter, activeElements: Option[]) => ReactElement;
    filter?: FilterOperator<any>;
    selection: "single" | "multi" | "custom";
} | undefined;
declare const getAllOperatorNames: () => Operator[];
declare const isSingleSelectionOperator: (name: string) => boolean;
declare const isRegisteredOperator: (name: string) => boolean;
export { getOperatorByName, getAllOperatorNames, isSingleSelectionOperator, isRegisteredOperator, };
//# sourceMappingURL=operators.d.ts.map