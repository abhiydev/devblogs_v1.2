const { createProxyMiddleware } = require("http-proxy-middleware");
const { ModuleRunner } = require("vite/module-runner");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
      secure: false,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
  );
};
