import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../index';
declare const meta: Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof Button>;
export declare const Default: Story;
export declare const Outline: Story;
export declare const Minimal: Story;
export declare const Compact: Story;
export declare const Small: Story;
export declare const Neutral: Story;
export declare const NeutralOutline: Story;
export declare const Unstyled: Story;
export declare const AllTonesAndVariants: Story;
export declare const WithIcon: Story;
export declare const Loading: Story;
/**
 * The pressed state is only available for buttons with `tone="neutral"` and
 * `variant="minimal"` and can be toggled via the `aria-pressed` HTML attribute.
 */
export declare const Pressed: Story;
//# sourceMappingURL=index.story.d.ts.map