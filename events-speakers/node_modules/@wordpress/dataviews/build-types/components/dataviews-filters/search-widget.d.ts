import type { NormalizedFilter, View, Option } from '../../types';
interface SearchWidgetProps {
    view: View;
    filter: NormalizedFilter & {
        elements: Option[];
    };
    onChangeView: (view: View) => void;
}
export default function SearchWidget(props: SearchWidgetProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=search-widget.d.ts.map