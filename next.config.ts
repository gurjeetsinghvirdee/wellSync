const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components')
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles')
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib')
    config.resolve.alias['@pages'] = path.resolve(__dirname, 'pages')
    return config
  }
};