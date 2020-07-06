const path = require('path');
console.log(path);

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/morney-website/' : '/',
    lintOnSave: false,
    chainWebpack: config => {
        const dir = path.resolve('src/assets/icons');

        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(dir).end()
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({
                extract: false
            }).end()
            .use('svgo-loader').loader('svgo-loader')
            .tap(options => ({
                ...options,
                plugins: [{
                    removeAttrs: {
                        attrs: 'fill'
                    }
                }]
            })).end()

        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{
            plainSprite: true
        }]);
        config.module.rule('svg').exclude.add(dir) //其他svg loader 排除 icons 目录
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}