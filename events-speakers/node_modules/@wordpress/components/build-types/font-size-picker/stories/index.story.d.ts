/**
 * External dependencies
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
/**
 * Internal dependencies
 */
import FontSizePicker from '../';
declare const meta: Meta<typeof FontSizePicker>;
export default meta;
type FontSizePickerStory = StoryObj<typeof FontSizePicker>;
export declare const Default: FontSizePickerStory;
export declare const WithSlider: FontSizePickerStory;
/**
 * With custom font sizes disabled via the `disableCustomFontSizes` prop, the user will
 * only be able to pick one of the predefined sizes passed in `fontSizes`.
 */
export declare const WithCustomSizesDisabled: FontSizePickerStory;
/**
 * When there are more than 5 font size options, the UI is no longer a toggle group.
 */
export declare const WithMoreFontSizes: FontSizePickerStory;
/**
 * When units like `px` are specified explicitly, it will be shown as a label hint.
 */
export declare const WithUnits: FontSizePickerStory;
/**
 * The label hint will not be shown if it is a complex CSS value. Some examples of complex CSS values
 * in this context are CSS functions like `calc()`, `clamp()`, and `var()`.
 */
export declare const WithComplexCSSValues: FontSizePickerStory;
//# sourceMappingURL=index.story.d.ts.map