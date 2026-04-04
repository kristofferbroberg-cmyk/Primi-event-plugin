/**
 * External dependencies
 */
import { screen } from '@testing-library/react';
export declare const monthNameFormatter: (localeCode: string, timeZone?: string) => Intl.DateTimeFormat;
export declare const dateNumberFormatter: (localeCode: string, timeZone?: string) => Intl.DateTimeFormat;
export declare const getDateButton: (date: Date, options?: Parameters<typeof screen.getByRole>[1], locale?: string) => HTMLElement;
export declare const getDateCell: (date: Date, options?: Parameters<typeof screen.getByRole>[1], locale?: string) => HTMLElement;
export declare const queryDateCell: (date: Date, options?: Parameters<typeof screen.getByRole>[1], locale?: string) => HTMLElement | null;
//# sourceMappingURL=index.d.ts.map