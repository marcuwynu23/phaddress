const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	bail: false, // Stop compilation after the first error
	mode: "production", // Set the mode to production
	entry: "./index.js", // Entry point for the application
	output: {
		path: path.resolve(__dirname, "build"), // Output directory
		filename: "index.js", // Output filename
	},
	target: "node", // Target environment
	module: {
		rules: [
			{
				test: /\.html$/, // Rule for HTML files
				use: "html-loader", // Use html-loader to process HTML files
			},
			// Add other loaders here if needed
		],
	},
	resolve: {
		fallback: {
			// Fallback for missing dependencies
			fsevents: false,
			// Add other fallbacks as necessary
			// 'child_process': false, // Uncomment if you want to ignore child_process
			// 'fs': false, // Uncomment if you want to ignore fs
		},
		extensions: [".js", ".json"], // Resolve these extensions
	},
	ignoreWarnings: [
		{
			module: /mongodb\/lib\/deps\.js/,
			message: /Can't resolve/,
		},
		{
			module: /ws\/lib\//,
			message: /Can't resolve/,
		},
	],
	plugins: [
		new webpack.ContextReplacementPlugin(
			/express[/\\]lib/,
			path.resolve(__dirname, "node_modules")
		),
		new webpack.ContextReplacementPlugin(
			/nunjucks[/\\]src/,
			path.resolve(__dirname, "node_modules")
		),
		new webpack.IgnorePlugin({
			resourceRegExp: /^\.\/.*$/,
			contextRegExp: /node_modules\/(cosmiconfig|fluent-ffmpeg|import-fresh|typescript)/,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "json", to: "json" }, // Copy JSON files
				{ from: "public", to: "public" }, // Copy the public directory
				{ from: "view", to: "view" }, // Copy the view directory
			],
		}),
	],
	stats: {
		errorDetails: true, // Show detailed error information
	},
	performance: {
		hints: false, // Disable performance hints
	},
	externals: {
		sharp: "commonjs sharp", // Treat sharp as an external CommonJS module
	},
};
