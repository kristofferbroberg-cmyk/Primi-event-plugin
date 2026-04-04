/**
 * External dependencies
 */
import type { ComponentType } from 'react';
/**
 * Internal dependencies
 */
import type { DataFormControlProps, Field } from '../../types';
export declare function getControl<Item>(field: Field<Item>, fallback: string | null): ComponentType<DataFormControlProps<Item>> | null;
export declare function getControlByType(type: string): ComponentType<DataFormControlProps<any>> | null;
//# sourceMappingURL=index.d.ts.map