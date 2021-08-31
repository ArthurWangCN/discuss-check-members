/*jshint esversion: 6*/ 
const url=require('url')
const cookieMap = {};
//去掉域名的sso登录地址
const RETURN_PATH = '/';
const loginUrl =`http://47.92.202.73/sso/login#/`;
//默认打开页，为空时写'/'
const openPage = '/';
// 设置cookie
const setCookie = (userAgent, cookies) => {
  let map = cookieMap[userAgent] || {};
  cookies.forEach((cookie) => {
    let [string, key, value] = cookie.match(/^(.*?)=(.*?);/);
    map[key] = value;
  });
  cookieMap[userAgent] = map;
};
let flag=false;
// 获取cookie
const getCookie = (userAgent) => {
  let map = cookieMap[userAgent] || {};
  let cookie = '';
  for (let key in map) {
    cookie += `${key}=${map[key]}; `;
  }
  return cookie;
};

 const proxyConfig = [
    //  {
    //     context: ["/jmanage"],
    //     target: "http://10.120.130.26:3000/",
    //     changeOrigin: true,
    //     pathRewrite:{'^/jmanage':'/mock/318/jmanage/api','^/knowledge':'/mock/318/jmanage/api'},
    //     // 监听代理请求，将cookie插入到请求头
    //     onProxyReq(proxyReq, req, res) {
    //         let query=url.parse(req.headers.referer).query;
    //         //proxyReq.setHeader('Cookie',getCookie(req.get('User-Agent'))+';'+query);
    //         proxyReq.setHeader('Cookie', `Ecp_ClientId=i210623090200000024; OKMSID_DEV=JDJhJDEwJHYwd1lUMWZHU0hKME5xN2JNZk5lTXUxR1VmSG1XWGc5bWhjaTFVMDFqdm92NzIvLnFQaUhx; OKMSID_DEV=JDJhJDEwJHYwd1lUMWZHU0hKME5xN2JNZk5lTXUxR1VmSG1XWGc5bWhjaTFVMDFqdm92NzIvLnFQaUhx; ASP.NET_SessionId=gzlbianyx3kkhzahebawgmqo`);
    //     },
    //     onProxyRes(proxyRes, req, res) {
    //       if(proxyRes.headers['set-cookie']) {
    //         setCookie(req.get('User-Agent'), proxyRes.headers['set-cookie']);
    //       }
    //     }
    //   },

 {
        context: ["/creation"],
        target: "http://47.92.202.73/",
        changeOrigin: true,
        // 监听代理请求，将cookie插入到请求头
        onProxyReq(proxyReq, req, res) {
            let query=url.parse(req.headers.referer).query;
            proxyReq.setHeader('Cookie',getCookie(req.get('User-Agent'))+';'+query);
            
        },
        onProxyRes(proxyRes, req, res) {
          if(proxyRes.headers['set-cookie']) {
            setCookie(req.get('User-Agent'), proxyRes.headers['set-cookie']);
          }
        }
      },
      {
      context: ['/foundation', '/Foundation','/pmc','/Pmc'],
      target: "http://okms.dev.cnki.net",
      changeOrigin: true,
    //   onProxyRes(proxyRes, req, res) {
    //     if(proxyRes.statusCode === 302) {
    //       if(proxyRes.headers['set-cookie']) {
    //           setCookie(req.get('User-Agent'), proxyRes.headers['set-cookie']);
    //       }
    //       proxyRes.headers['Location'] = RETURN_PATH;
    //     }
    //   }
    },
    {
      context: ['/'],
      bypass: function(req, res, proxyOptions) {
          if (req.url === '/' && !cookieMap[req.get('User-Agent')]) {
              res.redirect(loginUrl);
              return true;
          } else if (/^\/login/.test(req.url)) {
              delete cookieMap[req.get('User-Agent')];
              res.redirect(loginUrl);
              return true;
          }
      }
    }
];

const proxy = {};

proxyConfig.forEach(config => {
  if (typeof config.context === 'string') {
    proxy[config.context] = config;
  } else if (Array.isArray(config.context)) {
    config.context.forEach(context => {
      proxy[context] = config;
    });
  }
});

module.exports = {
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  proxy,
  index: 'index.html',
    openPage:'index.html'
};
