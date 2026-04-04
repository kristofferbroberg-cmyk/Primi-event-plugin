/**
 * External dependencies
 */
import type { MouseEventHandler } from 'react';
import { useRegistry } from '@wordpress/data';
import type { Action, ActionModal as ActionModalType } from '../../types';
export interface ActionTriggerProps<Item> {
    action: Action<Item>;
    onClick: MouseEventHandler;
    isBusy?: boolean;
    items: Item[];
    variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
}
export interface ActionModalProps<Item> {
    action: ActionModalType<Item>;
    items: Item[];
    closeModal: () => void;
}
interface ActionsMenuGroupProps<Item> {
    actions: Action<Item>[];
    item: Item;
    registry: ReturnType<typeof useRegistry>;
    setActiveModalAction: (action: ActionModalType<Item> | null) => void;
}
interface ItemActionsProps<Item> {
    item: Item;
    actions: Action<Item>[];
    isCompact?: boolean;
}
interface PrimaryActionsProps<Item> {
    item: Item;
    actions: Action<Item>[];
    registry: ReturnType<typeof useRegistry>;
    buttonVariant?: 'primary' | 'secondary' | 'tertiary' | 'link';
}
export declare function ActionModal<Item>({ action, items, closeModal, }: ActionModalProps<Item>): import("react").JSX.Element;
export declare function ActionsMenuGroup<Item>({ actions, item, registry, setActiveModalAction, }: ActionsMenuGroupProps<Item>): import("react").JSX.Element;
export default function ItemActions<Item>({ item, actions, isCompact, }: ItemActionsProps<Item>): import("react").JSX.Element;
export declare function PrimaryActions<Item>({ item, actions, registry, buttonVariant, }: PrimaryActionsProps<Item>): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map