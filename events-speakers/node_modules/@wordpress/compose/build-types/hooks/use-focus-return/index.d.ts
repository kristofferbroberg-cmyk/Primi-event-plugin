export default useFocusReturn;
/**
 * Adds the unmount behavior of returning focus to the element which had it
 * previously as is expected for roles like menus or dialogs.
 *
 * @param {() => void} [onFocusReturn] Overrides the default return behavior.
 * @return {React.RefCallback<HTMLElement>} Element Ref.
 *
 * @example
 * ```js
 * import { useFocusReturn } from '@wordpress/compose';
 *
 * const WithFocusReturn = () => {
 *     const ref = useFocusReturn()
 *     return (
 *         <div ref={ ref }>
 *             <Button />
 *             <Button />
 *         </div>
 *     );
 * }
 * ```
 */
declare function useFocusReturn(onFocusReturn?: () => void): React.RefCallback<HTMLElement>;
//# sourceMappingURL=index.d.ts.map