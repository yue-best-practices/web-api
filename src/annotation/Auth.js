/**
 * Created by yuanjianxin on 2018/5/29.
 */

/**
 * 验证用户是否登录
 * @param target
 * @param name
 * @param descriptor
 * @returns {*}
 */
export default (target, name, descriptor) => {
    let oldValue = descriptor.value;

    descriptor.value = async(ctx, next) => {

        //todo something
        let token = ctx.get('Authorization') || ctx.request.query.token;

        console.log('===token',token);

        if (!token) {
            ctx.status = 401;
            ctx.result = {
                code: 40001,
                msg: '未授权的请求',
            };
            return await next();
        }
        try{
            token=ctx.$helper.Crypto.symmetryDecrypt(ctx.$configs.secretKey,token);
        }catch (e){
            ctx.status = 401;
            ctx.result = {
                code: 40001,
                msg: '非法Token',
            };
            return await next();
        }

        let [userId,time]=token.split('|');
        let checkUserExist=await ctx.$dbHandler.get("user",userId);
        if(!checkUserExist){
            ctx.status = 401;
            ctx.result = {
                code: 40001,
                msg: '用户不存在',
            };
            return await next();
        }

        if(time<=Date.now()){
            ctx.status = 401;
            ctx.result = {
                code: 40001,
                msg: 'Token Expire',
            };
            return await next();
        }

        ctx.$auth={
            userId
        };

        // run old func
        await oldValue.apply(target, [ctx, next]);// oldValue.call(target,ctx,next); || oldValue.bind(target,ctx,next)();
    };

    return descriptor;

}