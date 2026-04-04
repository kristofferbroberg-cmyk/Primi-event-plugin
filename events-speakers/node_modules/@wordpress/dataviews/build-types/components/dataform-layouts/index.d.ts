/**
 * Internal dependencies
 */
import type { NormalizedLayout } from '../../types';
import FormRowField from './row';
import FormDetailsField from './details';
export declare function getFormFieldLayout(type: string): {
    type: string;
    component: typeof FormRowField;
    wrapper: ({ children, layout, }: {
        children: React.ReactNode;
        layout: NormalizedLayout;
    }) => import("react").JSX.Element;
} | {
    type: string;
    component: typeof FormDetailsField;
    wrapper?: undefined;
} | undefined;
//# sourceMappingURL=index.d.ts.map