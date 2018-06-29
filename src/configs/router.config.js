/**
 * Created by yuanjianxin on 2018/4/26.
 */

const routers=[];

import UserController from "../controllers/UserController";
// import {Test} from "../middlewares";


// routers.push({
//     path: '/test',
//     method: 'get',
//     controller: TestController,
//     func: 'test',
//     middleware: [Test.test1, Test.test2]
// });
routers.push({path: '/login', method: 'post', controller: UserController, func: 'login'});
routers.push({path: '/getWebSocketUrl', method: 'post', controller: UserController, func: 'getWebSocketUrl'});


module.exports=routers;