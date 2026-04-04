import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Notice from '../index';
declare const meta: Meta<typeof Notice.Root>;
export default meta;
type Story = StoryObj<typeof Notice.Root>;
export declare const Default: Story;
export declare const Info: Story;
export declare const Warning: Story;
export declare const Success: Story;
export declare const Error: Story;
/**
 * Omit Notice.CloseIcon to make the notice non-dismissable.
 */
export declare const NonDismissible: Story;
/**
 * Pass `icon={ null }` to hide the default decorative icon.
 */
export declare const WithoutIcon: Story;
export declare const WithoutActions: Story;
/**
 * Title only, no description or actions.
 */
export declare const TitleOnly: Story;
/**
 * Description only, no title or actions.
 */
export declare const DescriptionOnly: Story;
//# sourceMappingURL=index.story.d.ts.map