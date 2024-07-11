module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "http://121.36.222.202:8081", 
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
    }
    //,disableHostCheck: true
  },
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false
  }
};
