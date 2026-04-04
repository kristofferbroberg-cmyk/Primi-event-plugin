import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Card from '../index';
declare const meta: Meta<typeof Card.Root>;
export default meta;
type Story = StoryObj<typeof Card.Root>;
export declare const Default: Story;
/**
 * `Card.FullBleed` breaks out of the card's padding to span
 * edge-to-edge. Useful for images, dividers, or embedded content.
 */
export declare const WithFullBleed: Story;
/**
 * A minimal card with only a header.
 */
export declare const HeaderOnly: Story;
/**
 * Use the `render` prop to change the underlying HTML elements for
 * better semantics. Here, `Card.Root` renders as a `<section>` and
 * `Card.Title` renders as an `<h2>`.
 */
export declare const CustomSemantics: Story;
//# sourceMappingURL=index.story.d.ts.map