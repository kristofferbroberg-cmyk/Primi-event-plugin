/**
 * External dependencies
 */
import type { Meta } from '@storybook/react-vite';
/**
 * Internal dependencies
 */
import DataViewsPicker from '../index';
declare const meta: Meta<typeof DataViewsPicker>;
export default meta;
export declare const Default: {
    ({ perPageSizes, isMultiselectable, isGrouped, infiniteScrollEnabled, }: {
        perPageSizes: number[];
        isMultiselectable: boolean;
        isGrouped: boolean;
        infiniteScrollEnabled: boolean;
    }): import("react").JSX.Element;
    args: {
        perPageSizes: number[];
        isMultiselectable: boolean;
        isGrouped: boolean;
        infiniteScrollEnabled: boolean;
    };
    argTypes: {
        isMultiselectable: {
            control: string;
            description: string;
        };
        perPageSizes: {
            control: string;
            description: string;
        };
        isGrouped: {
            control: string;
            description: string;
        };
        infiniteScrollEnabled: {
            control: string;
            description: string;
        };
    };
};
export declare const WithModal: {
    ({ perPageSizes, isMultiselectable, isGrouped, infiniteScrollEnabled, }: {
        perPageSizes: number[];
        isMultiselectable: boolean;
        isGrouped: boolean;
        infiniteScrollEnabled: boolean;
    }): import("react").JSX.Element;
    args: {
        perPageSizes: number[];
        isMultiselectable: boolean;
        isGrouped: boolean;
        infiniteScrollEnabled: boolean;
    };
    argTypes: {
        isMultiselectable: {
            control: string;
            description: string;
        };
        perPageSizes: {
            control: string;
            description: string;
        };
        isGrouped: {
            control: string;
            description: string;
        };
        infiniteScrollEnabled: {
            control: string;
            description: string;
        };
    };
};
//# sourceMappingURL=index.story.d.ts.map