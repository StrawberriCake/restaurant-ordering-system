const { defineConfig } = require('@vue/cli-service')
// const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true
});

module.exports = {
  devServer: {
    allowedHosts: [
      'localhost',
      process.env.VUE_APP_ALLOWED_HOST
    ],
  },
};

// module.exports = {
//   outputDir: path.resolve(__dirname, '../backend/public'),
//   devServer: {
//     proxy: {
//       '/': {
//         target: 'http://localhost:8081'
//       }
//     }
//   }
// }
