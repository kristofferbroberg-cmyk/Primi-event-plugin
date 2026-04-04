import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from '../../../..';
declare const meta: Meta<typeof Fieldset.Root>;
export default meta;
type Story = StoryObj<typeof Fieldset.Root>;
export declare const Default: Story;
/**
 * When `hideFromVision` is set on `Fieldset.Legend`, the legend is visually
 * hidden but remains accessible to screen readers.
 */
export declare const HiddenLegend: Story;
/**
 * To add rich content (such as links) to the description, use `Fieldset.Details`.
 *
 * Although this content is not associated with the fieldset using direct semantics,
 * it is made discoverable to screen reader users via a visually hidden description,
 * alerting them to the presence of additional information below.
 *
 * If the content only includes plain text, use `Fieldset.Description` instead,
 * so the readout is not unnecessarily verbose for screen reader users.
 */
export declare const WithDetails: Story;
//# sourceMappingURL=index.story.d.ts.map