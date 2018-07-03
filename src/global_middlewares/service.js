/**
 * Created by yuanjianxin on 2018/4/26.
 */
const appConf=require('../configs/app.config')
const dbConf=require('../configs/db.config');
const DBHandler=require('grpc-node-db-handler');
const helper=require('yue-helper');
const WebSocketHandler = require('grpc-node-ws-handler');
module.exports = () => {

    WebSocketHandler.instance.config(appConf.wsServiceConf);
    DBHandler.instance.config(dbConf);
    return async(ctx, next) => {
        ctx.$configs=appConf;
        ctx.$dbHandler=DBHandler.instance;
        ctx.$helper=helper;
        ctx.$webSocketHandler=WebSocketHandler.instance;
        await next();

    }
};