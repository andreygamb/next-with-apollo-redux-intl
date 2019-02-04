const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        imagesFolder: 'img',
        imagesName: '[name].[hash].[ext]',
        optimizeImages: false
      }
    ]
  ],
  {
    exportPathMap: async function(defaultPathMap) {
      return {
        '/': { page: '/', query: { locale: 'ru' } },
        '/ru': { page: '/', query: { locale: 'ru' } },
        '/en': { page: '/', query: { locale: 'en' } }
      }
    },
    webpack: (config, { dev }) => {
      config.node = config.node || {}
      config.node.fs = 'empty'
      return config
    }
  }
)
