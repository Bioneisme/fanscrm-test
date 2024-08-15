const CracoEnvPlugin = require('craco-plugin-env')

module.exports = {
    typescript: {
        enableTypeChecking: true,
    },
    eslint: {
        enable: true,
        mode: 'extends',
        configure: (eslintConfig, {env, paths}) => {
            return eslintConfig;
        },
        pluginOptions: (eslintPluginOptions, {env, paths}) => {
            return eslintPluginOptions;
        },
    },
    plugins: [
        {
            plugin: CracoEnvPlugin,
            options: {}
        }
    ]
};