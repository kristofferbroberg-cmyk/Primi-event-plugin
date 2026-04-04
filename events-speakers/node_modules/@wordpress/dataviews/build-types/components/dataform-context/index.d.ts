/**
 * Internal dependencies
 */
import type { NormalizedField } from '../../types';
type DataFormContextType<Item> = {
    fields: NormalizedField<Item>[];
};
declare const DataFormContext: import("react").Context<DataFormContextType<any>>;
export declare function DataFormProvider<Item>({ fields, children, }: React.PropsWithChildren<{
    fields: NormalizedField<Item>[];
}>): import("react").JSX.Element;
export default DataFormContext;
//# sourceMappingURL=index.d.ts.map