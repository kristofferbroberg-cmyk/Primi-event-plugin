/**
 * Internal dependencies
 */
import type { Option } from '../types';
export default function useElements({ elements, getElements, }: {
    elements?: Option[];
    getElements?: () => Promise<Option[]>;
}): {
    elements: Option<any>[];
    isLoading: boolean;
};
//# sourceMappingURL=use-elements.d.ts.map