/**
 * Internal dependencies
 */
import type { FieldValidity, FormValidity, NormalizedForm, NormalizedFormField } from '../../types';
export declare function DataFormLayout<Item>({ data, form, onChange, validity, children, as, }: {
    data: Item;
    form: NormalizedForm;
    onChange: (value: any) => void;
    validity?: FormValidity;
    children?: (FieldLayout: (props: {
        data: Item;
        field: NormalizedFormField;
        onChange: (value: any) => void;
        hideLabelFromVision?: boolean;
        markWhenOptional?: boolean;
        validity?: FieldValidity;
    }) => React.JSX.Element | null, childField: NormalizedFormField, childFieldValidity?: FieldValidity, markWhenOptional?: boolean) => React.JSX.Element;
    as?: React.ComponentType<{
        children: React.ReactNode;
    }>;
}): import("react").JSX.Element;
//# sourceMappingURL=data-form-layout.d.ts.map