/**
 * Add type guard for isPlainObject until the below PR gets merged:
 *
 * @see https://github.com/jonschlinkert/is-plain-object/pull/29
 */
declare module 'is-plain-object' {
    function isPlainObject(value: unknown): value is Record<PropertyKey, unknown>;
}
//# sourceMappingURL=types.d.ts.map