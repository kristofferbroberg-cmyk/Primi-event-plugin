/**
 * Demonstrates how to build a custom layout using DataViews sub-components.
 *
 * Instead of using the default DataViews UI, this story shows how to:
 * - Use `<DataViews>` as a context provider (wrapping custom children)
 * - Compose your own layout with built-in sub-components:
 *   - `<DataViews.Search />` - Search input
 *   - `<DataViews.FiltersToggle />` - Button to show/hide filters
 *   - `<DataViews.FiltersToggled />` - The filter UI itself
 *   - `<DataViews.Pagination />` - Page navigation
 *   - `<DataViews.ViewConfig />` - View settings (columns, density, etc.)
 *   - `<DataViews.LayoutSwitcher />` - Switch between table/grid/list views
 *   - `<DataViews.BulkActionToolbar />` - Actions for selected items
 *   - `<DataViews.Layout />` - The data display (table, grid, etc.)
 *
 * This pattern is useful when you need full control over the UI layout
 * while still leveraging DataViews' data management and state handling.
 */
export declare const FreeCompositionComponent: () => import("react").JSX.Element;
export default FreeCompositionComponent;
//# sourceMappingURL=free-composition.d.ts.map