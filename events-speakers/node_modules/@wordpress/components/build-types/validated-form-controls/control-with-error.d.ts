/**
 * Internal dependencies
 */
import type { ValidatedControlProps } from './components/types';
/**
 * HTML elements that support the Constraint Validation API.
 *
 * Here, we exclude HTMLButtonElement because although it does technically support the API,
 * normal buttons are actually exempted from any validation.
 * @see https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/willValidate
 */
type ValidityTarget = HTMLFieldSetElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export declare const ControlWithError: import("react").ForwardRefExoticComponent<{
    /**
     * Whether the control is required.
     */
    required?: boolean;
    /**
     * Label the control as "optional" when _not_ `required`, instead of the inverse.
     */
    markWhenOptional?: boolean;
    customValidity?: ValidatedControlProps["customValidity"];
    /**
     * A function that returns the actual element on which the validity data should be applied.
     */
    getValidityTarget: () => ValidityTarget | null | undefined;
    /**
     * The control component to apply validation to.
     *
     * As `children` will be cloned with additional props,
     * the component at the root of `children` should accept
     * `label`, `onChange`, and `required` props, and process them
     * appropriately.
     */
    children: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
} & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=control-with-error.d.ts.map