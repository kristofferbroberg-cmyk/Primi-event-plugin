import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '../index';
declare const meta: Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof IconButton>;
export declare const Default: Story;
export declare const Outline: Story;
export declare const Minimal: Story;
export declare const Neutral: Story;
export declare const NeutralOutline: Story;
export declare const Disabled: Story;
export declare const WithDifferentIcons: Story;
/**
 * The pressed state is only available for buttons with `tone="neutral"` and
 * `variant="minimal"` and can be toggled via the `aria-pressed` HTML attribute.
 */
export declare const Pressed: Story;
export declare const WithShortcut: Story;
//# sourceMappingURL=index.story.d.ts.map