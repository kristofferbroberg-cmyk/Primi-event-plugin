/**
 * Internal dependencies
 */
import type { Field } from '../../types';
export type SpaceObject = {
    id: number;
    name: {
        title: string;
        description: string;
    };
    image: string;
    type: string;
    isPlanet: boolean;
    categories: string[];
    satellites: number;
    date: string;
    datetime: string;
    email: string;
};
export declare const data: SpaceObject[];
export declare const fields: Field<SpaceObject>[];
//# sourceMappingURL=fixtures.d.ts.map