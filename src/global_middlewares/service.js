/**
 * Created by yuanjianxin on 2018/4/26.
 */
const appConf=require('../configs/app.config')
const dbConf=require('../configs/db.config');
const DBHandler=require('yue-db-handler');
const helper=require('yue-helper');
module.exports = () => {

    DBHandler.instance.config(dbConf);
    return async(ctx, next) => {
        ctx.$configs=appConf;
        ctx.$dbHandler=DBHandler.instance;
        ctx.$helper=helper;
        await next();

    }
};