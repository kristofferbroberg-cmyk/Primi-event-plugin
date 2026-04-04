/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react-vite';
/**
 * Internal dependencies
 */
import FormTokenField from '../';
declare const meta: Meta<typeof FormTokenField>;
export default meta;
export declare const Default: StoryFn<typeof FormTokenField>;
export declare const Async: StoryFn<typeof FormTokenField>;
export declare const DropdownSelector: StoryFn<typeof FormTokenField>;
/**
 * The rendered content of each token can be customized by passing a
 * render function to the `displayTransform` prop.
 *
 * Similarly, each suggestion can be customized by passing a
 * render function to the `__experimentalRenderItem` prop. (This is still an
 * experimental feature and is subject to change.)
 */
export declare const WithCustomRenderedItems: StoryFn<typeof FormTokenField>;
/**
 * Only values for which the `__experimentalValidateInput` function returns
 * `true` will be tokenized. (This is still an experimental feature and is
 * subject to change.)
 *
 * In this example, the user can only add tokens that are already in the list.
 */
export declare const ValidateNewTokens: StoryFn<typeof FormTokenField>;
//# sourceMappingURL=index.story.d.ts.map