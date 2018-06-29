/**
 * Created by yuanjianxin on 2018/5/9.
 */
const Sequelize=require('sequelize');
const DbConfig=require('./configs/db.config');


const sequelize = new Sequelize(
    DbConfig.database,
    DbConfig.username,
    DbConfig.password,
    DbConfig
);

sequelize.authenticate();
module.exports=sequelize;