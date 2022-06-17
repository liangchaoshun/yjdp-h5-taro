module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
    devServer: {
      proxy: {
        '/api': {
          // url 会自动补全：`${target}/api`
          target: 'http://localhost:7717/wx/yjdp', // 本地服务
          // target: 'https://liangchaoshun.top/cms/yjdp', // 线上服务-无需端口
          secure: false,
          changeOrigin: true
        }
      }
    }
  }
}
