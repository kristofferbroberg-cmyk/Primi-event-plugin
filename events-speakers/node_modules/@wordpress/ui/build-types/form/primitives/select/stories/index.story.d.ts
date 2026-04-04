import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '../../../..';
declare const meta: Meta<typeof Select.Root>;
export default meta;
type Story = StoryObj<typeof Select.Root>;
export declare const Default: Story;
export declare const Compact: Story;
/**
 * The `minimal` variant must be used judiciously, because in many
 * contexts it can be unclear to users that it is a select trigger.
 *
 * Combined with the `small` size, `minimal` can be used to create a
 * very low-profile `Select`, intended for rare use cases like
 * a pagination control.
 */
export declare const Minimal: Story;
/**
 * By passing an `items` array to `Select.Root`, the `Select.Trigger` will be able to
 * render a `label` string for each item rather than the raw `value` string. In this
 * case, the option with an empty string value has a `"Select"` label string.
 *
 * This may be easier than writing a custom render function for the `Select.Trigger`.
 */
export declare const WithEmptyValueOption: Story;
/**
 * When accessibly labeling a `Select`, note that the label must be associated with the `Select.Trigger`,
 * not the `Select.Root`.
 *
 * Whether labeling with `aria-label`, `htmlFor`, or `aria-labelledby`, the association must be made to the `Select.Trigger`.
 */
export declare const Labeling: Story;
export declare const WithOverflow: Story;
export declare const Disabled: Story;
export declare const WithDisabledItem: Story;
/**
 * For custom needs, a `Select.Trigger` can take a custom render function as its children,
 * while `Select.Item` can take arbitrary content as children.
 */
export declare const WithCustomTriggerAndItem: Story;
/**
 * Popovers in Gutenberg are managed with explicit z-index values, which can create
 * situations where a popover renders below another popover, when you want it to be rendered above.
 *
 * The `--wp-ui-select-z-index` CSS variable, available on the `Select.Popup` component,
 * is an escape hatch that can be used to override the z-index of a given `Select` popover
 * on a case-by-case basis.
 */
export declare const WithCustomZIndex: Story;
//# sourceMappingURL=index.story.d.ts.map