/**
 * Internal dependencies
 */
import type { DataFormControlProps } from '../../../types';
export type DataFormValidatedTextControlProps<Item> = DataFormControlProps<Item> & {
    /**
     * The input type of the control.
     */
    type?: 'text' | 'email' | 'tel' | 'url' | 'password';
    /**
     * Optional prefix element to display before the input.
     */
    prefix?: React.ReactElement;
    /**
     * Optional suffix element to display after the input.
     */
    suffix?: React.ReactElement;
};
export default function ValidatedText<Item>({ data, field, onChange, hideLabelFromVision, markWhenOptional, type, prefix, suffix, validity, }: DataFormValidatedTextControlProps<Item>): import("react").JSX.Element;
//# sourceMappingURL=validated-input.d.ts.map