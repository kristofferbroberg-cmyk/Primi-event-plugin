import type { RefObject } from 'react';
import type { NormalizedField, NormalizedFilter, View } from '../../types';
interface OperatorSelectorProps {
    filter: NormalizedFilter;
    view: View;
    onChangeView: (view: View) => void;
}
interface FilterProps extends OperatorSelectorProps {
    addFilterRef: RefObject<HTMLButtonElement | null>;
    openedFilter: string | null;
    fields: NormalizedField<any>[];
}
export default function Filter({ addFilterRef, openedFilter, fields, ...commonProps }: FilterProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=filter.d.ts.map