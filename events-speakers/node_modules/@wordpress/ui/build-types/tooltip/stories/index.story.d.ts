import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../..';
declare const meta: Meta<typeof Tooltip.Root>;
export default meta;
export declare const Default: StoryObj<typeof Tooltip.Root>;
/**
 * The `disabled` prop prevents the tooltip from showing, and can be used to
 * show the tooltip conditionally without rendering the underlying react
 * component conditionally (which could cause reconciliation issues).
 */
export declare const Disabled: StoryObj<typeof Tooltip.Root>;
/**
 * Use the `side` prop to control where the tooltip appears relative to the
 * trigger element.
 */
export declare const Positioning: StoryObj<typeof Tooltip.Root>;
/**
 * Use `Tooltip.Provider` to control the delay before tooltips appear.
 * This is useful when you have multiple tooltips and want them to share
 * the same delay configuration.
 */
export declare const WithProvider: StoryObj<typeof Tooltip.Root>;
//# sourceMappingURL=index.story.d.ts.map