const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

// Mock
const mockServe = require("./mock");

// EVN
const isDev = process.env.NODE_ENV === "development";

const pathJoin = (dir) => path.join(__dirname, dir);

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      css: { importLoaders: 2 },
      less: { lessOptions: { javascriptEnabled: true } },
    },
  },
  publicPath: isDev ? "/" : "./",
  productionSourceMap: false,
  devServer: {
    proxy: {},
    setupMiddlewares(middlewares, devServer) {
      if (!devServer) throw new Error("webpack-dev-server is not defined");
      mockServe(devServer.app);
      return middlewares;
    },
  },
  chainWebpack: (config) => {
    // 去掉预加载
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    // 打包视图
    // (isPro || isSit) &&
    //   config
    //     .plugin("webpack-bundle-analyzer")
    //     .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);

    // SVG
    config.module.rule("svg").exclude.add(pathJoin("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(pathJoin("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end()
      .before("svg-sprite-loader")
      .use("./loader/svg-change-color.js")
      .loader("./loader/svg-change-color.js")
      .end();
  },
  configureWebpack: () => ({
    plugins: [
      // 大于244kib的会再次压缩
      new CompressionWebpackPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 0,
        minRatio: 0.8,
      }),
      // 压缩代码
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          output: { comments: false },
          compress: {
            drop_console: true,
            drop_debugger: true,
            // pure_funcs: ["console.log"],
          },
        },
      }),
    ],
  }),
});
