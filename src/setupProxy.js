const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy.createProxyMiddleware(["/api", , "/auth"], { target: "https://cloudpt.me/" , changeOrigin: true}));
};