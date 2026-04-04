import type { NormalizedFilter, View } from '../../types';
declare const Menu: any;
interface AddFilterProps {
    filters: NormalizedFilter[];
    view: View;
    onChangeView: (view: View) => void;
    setOpenedFilter: (filter: string | null) => void;
}
export declare function AddFilterMenu({ filters, view, onChangeView, setOpenedFilter, triggerProps, }: AddFilterProps & {
    triggerProps: React.ComponentProps<typeof Menu.TriggerButton>;
}): import("react").JSX.Element;
declare const _default: import("react").ForwardRefExoticComponent<AddFilterProps & import("react").RefAttributes<HTMLButtonElement>>;
export default _default;
//# sourceMappingURL=add-filter.d.ts.map