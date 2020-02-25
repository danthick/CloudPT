const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy.createProxyMiddleware(["/api", , "/otherApi"], { target: "http://localhost:4000/" }));
};