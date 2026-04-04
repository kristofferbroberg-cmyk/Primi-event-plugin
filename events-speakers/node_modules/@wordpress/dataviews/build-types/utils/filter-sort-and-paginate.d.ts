import type { Field, View } from '../types';
/**
 * Applies the filtering, sorting and pagination to the raw data based on the view configuration.
 *
 * @param data   Raw data.
 * @param view   View config.
 * @param fields Fields config.
 *
 * @return Filtered, sorted and paginated data.
 */
export default function filterSortAndPaginate<Item>(data: Item[], view: View, fields: Field<Item>[]): {
    data: Item[];
    paginationInfo: {
        totalItems: number;
        totalPages: number;
    };
};
//# sourceMappingURL=filter-sort-and-paginate.d.ts.map