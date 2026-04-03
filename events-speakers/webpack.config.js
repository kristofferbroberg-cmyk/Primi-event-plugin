const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

// Remove the default DependencyExtractionWebpackPlugin so we can add our own
// with a custom requestToExternal that bundles @wordpress/dataviews (not a
// registered WP global in core — only available inside Gutenberg route bundles).
const pluginsWithoutDEP = defaultConfig.plugins.filter(
	( plugin ) => ! ( plugin instanceof DependencyExtractionWebpackPlugin )
);

module.exports = {
	...defaultConfig,
	entry: {
		'admin-list': './src/admin-list/index.js',
	},
	// Mark CSS files as having side effects so they are not tree-shaken.
	module: {
		...defaultConfig.module,
		rules: [
			...( defaultConfig.module?.rules ?? [] ),
			{
				test: /\.css$/,
				sideEffects: true,
			},
		],
	},
	plugins: [
		...pluginsWithoutDEP,
		new DependencyExtractionWebpackPlugin( {
			requestToExternal( request ) {
				// Bundle DataViews and its sub-paths — not exposed as a WP global.
				if ( request.startsWith( '@wordpress/dataviews' ) ) {
					return null;
				}
				// All other @wordpress/* packages use the default globals.
			},
			requestToHandle( request ) {
				// Don't register DataViews paths (including CSS) as WP script handles.
				if ( request.startsWith( '@wordpress/dataviews' ) ) {
					return null;
				}
			},
		} ),
	],
};
