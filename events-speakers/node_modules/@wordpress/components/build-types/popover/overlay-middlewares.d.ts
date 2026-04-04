/**
 * External dependencies
 */
import type { MiddlewareState } from '@floating-ui/react-dom';
export declare function overlayMiddlewares(): ({
    name: string;
    options?: any;
    fn: (state: MiddlewareState) => import("@floating-ui/core").MiddlewareReturn | Promise<import("@floating-ui/core").MiddlewareReturn>;
} | {
    name: string;
    fn({ rects }: MiddlewareState): {
        x: number;
        y: number;
        height: number;
        width: number;
    };
})[];
//# sourceMappingURL=overlay-middlewares.d.ts.map