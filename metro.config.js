const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable experimental `require.context` support to support Expo Router
config.resolver.unstable_enablePackageExports = true;
config.transformer.unstable_allowRequireContext = true;

// Fix for 'import.meta' error in web builds by ensuring ESM packages are handled
config.resolver.blockList = /node_modules\/.*\/dist\/.*\.mjs$/;

module.exports = config;
