export default useKeyboardShortcut;
/**
 * A block selection object.
 */
export type WPKeyboardShortcutConfig = {
    /**
     * Handle keyboard events anywhere including inside textarea/input fields.
     */
    bindGlobal?: boolean | undefined;
    /**
     * Event name used to trigger the handler, defaults to keydown.
     */
    eventName?: string | undefined;
    /**
     * Disables the keyboard handler if the value is true.
     */
    isDisabled?: boolean | undefined;
    /**
     * React reference to the DOM element used to catch the keyboard event.
     */
    target?: import("react").RefObject<HTMLElement | null> | undefined;
};
/**
 * A block selection object.
 *
 * @typedef {Object} WPKeyboardShortcutConfig
 *
 * @property {boolean}                             [bindGlobal] Handle keyboard events anywhere including inside textarea/input fields.
 * @property {string}                              [eventName]  Event name used to trigger the handler, defaults to keydown.
 * @property {boolean}                             [isDisabled] Disables the keyboard handler if the value is true.
 * @property {React.RefObject<HTMLElement | null>} [target]     React reference to the DOM element used to catch the keyboard event.
 */
/**
 * Attach a keyboard shortcut handler.
 *
 * @see https://craig.is/killing/mice#api.bind for information about the `callback` parameter.
 *
 * @param {string[]|string}                                             shortcuts Keyboard Shortcuts.
 * @param {(e: Mousetrap.ExtendedKeyboardEvent, combo: string) => void} callback  Shortcut callback.
 * @param {WPKeyboardShortcutConfig}                                    options   Shortcut options.
 */
declare function useKeyboardShortcut(shortcuts: string[] | string, callback: (e: Mousetrap.ExtendedKeyboardEvent, combo: string) => void, { bindGlobal, eventName, isDisabled, target, }?: WPKeyboardShortcutConfig): void;
import Mousetrap from 'mousetrap';
//# sourceMappingURL=index.d.ts.map