/**
 * Created by yuanjianxin on 2018/5/9.
 */
const App=require('yue-web-app-core');
const appConf=require('./configs/app.config');
const routerConf=require('./configs/router.config');

const app=new App();
app.Middleware = appConf.globalMiddlewareConf;
app.Body=appConf.bodyConf;
app.Routes=routerConf;
app.Service=appConf.serviceConf;
app.Port=appConf.port;
app.run();