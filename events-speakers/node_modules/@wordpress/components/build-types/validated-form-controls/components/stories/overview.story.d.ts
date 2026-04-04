/**
 * External dependencies
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
/**
 * Internal dependencies
 */
import { ValidatedInputControl } from '..';
import type { ControlWithError } from '../../control-with-error';
declare const meta: Meta<typeof ControlWithError>;
export default meta;
type Story = StoryObj<typeof ControlWithError>;
/**
 * When there are multiple controls with errors, attempting to submit will
 * move focus to the first control with an error.
 */
export declare const WithMultipleControls: Story;
/**
 * Help text can be configured to be hidden when a custom error is reported. Whether to opt for this approach
 * will depend on context.
 */
export declare const WithHelpTextReplacement: Story;
/**
 * To provide feedback from server-side validation, the `customValidity` prop can be used
 * to show additional status indicators while waiting for the server response,
 * and after the response is received.
 *
 * These indicators are intended for asynchronous validation calls that may take more than 1 second to complete.
 * They may be unnecessary when responses are generally quick.
 */
export declare const AsyncValidation: StoryObj<typeof ValidatedInputControl>;
/**
 * Custom validity errors are effective immediately, even when they are not yet visible
 * to the user. For example, in this form where the initial value is already invalid,
 * the error message will be shown to the user once the submit button is clicked,
 * even if the input has never been interacted with.
 */
export declare const CustomErrorsOnSubmit: StoryObj<typeof ValidatedInputControl>;
/**
 * While it is recommended to rely on the built-in behavior for showing errors by
 * using a `form` element and `type="submit"` button around validated fields,
 * it is also possible to show errors at arbitrary times.
 * This can be done by calling the [`reportValidity()` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity)
 * on a ref of the field itself, or the wrapping `form` element.
 */
export declare const ShowingErrorsAtArbitraryTimes: StoryObj<typeof ValidatedInputControl>;
/**
 * A `form` wrapper and `type="submit"` button can be used to force validation when
 * the user tries to commit their changes, while still allowing the modal to be closed by canceling.
 * Optionally, the `shouldCloseOnClickOutside`, `isDismissible`, and `shouldCloseOnEsc` props
 * on `Modal` can be disabled to force users to more explicitly signal whether they are trying to
 * "submit close" or "cancel close" the dialog, as well as preventing data loss on accidental closures.
 */
export declare const ValidateInModal: StoryObj<typeof ValidatedInputControl>;
/**
 * [Form methods](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement#instance_methods) like
 * `reportValidity()` can be used to validate the fields when a popover is about to be closed,
 * and prevent the closing of the popover when invalid.
 */
export declare const ValidateOnPopoverClose: StoryObj<typeof ValidatedInputControl>;
//# sourceMappingURL=overview.story.d.ts.map