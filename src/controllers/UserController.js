/**
 * Created by yuanjianxin on 2018/4/26.
 */
import {Auth}  from '../annotation'
import BaseController from "./BaseController";
export default class TestController extends BaseController {

    async login(ctx,next){
        let phone=ctx.$body.phone;
        let password=ctx.$body.password;
        if(!phone || !password){
            ctx.result={
                code:101,
                message:"Invalid Parameter"
            };
            return await next();
        }

        let userInfo=await ctx.$dbHandler.getOne('user','phone',phone);

        if(!userInfo){
            ctx.result={
                code:102,
                message:"The user does not exist"
            };
            return await next();
        }

        if(userInfo.password!=password){
            ctx.result={
                code:102,
                message:"Invalid Password"
            };
            return await next();
        }

        let token=`${userInfo.id}|${Date.now()+30000}`; //todo 加密串组成 userId|time
        token=ctx.$helper.Crypto.symmetryEncrypt(ctx.$configs.secretKey,token);

        ctx.result={
            code:200,
            message:'OK',
            data:{
                token
            }
        };

        await next();
    }

    @Auth
    async getWebSocketUrl(ctx,next){
        console.log('=userId==',ctx.$auth.userId);
        ctx.result={
            code:200,
            message:"OK",
            data:{
                wsUrl:'哈哈哈'
            }
        };
        await next();
    }


}