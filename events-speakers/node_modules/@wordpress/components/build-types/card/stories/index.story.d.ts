/**
 * External dependencies
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
/**
 * Internal dependencies
 */
import { Card } from '..';
declare const meta: Meta<typeof Card>;
export default meta;
export declare const Default: StoryObj<typeof Card>;
/**
 * `CardMedia` provides a container for full-bleed content within a `Card`,
 * such as images, video, or even just a background color. The corners will be rounded if necessary.
 */
export declare const FullBleedContent: StoryObj<typeof Card>;
/**
 * The Card component supports three approaches to padding:
 * 1. Default padding (medium) - no size prop needed
 * 2. Token-based padding - using size tokens: xSmall, small, medium, large
 * 3. Logical padding - customize each direction using logical properties
 *
 * Each component (Card, CardHeader, CardBody) can have its own padding configuration.
 */
export declare const PaddingVariations: StoryObj<typeof Card>;
//# sourceMappingURL=index.story.d.ts.map