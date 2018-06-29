/**
 * Created by yuanjianxin on 2018/4/10.
 */

/**
 * 跨域中间键
 */

module.exports=async (ctx,next)=>{


    let host=ctx.request.headers.origin || '*';//nignx代理的时候，这里可能需要调一下
    ctx.set('Access-Control-Allow-Origin', host);
    ctx.set('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,credentials,X-XSRF-TOKEN,authorization');
    ctx.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    ctx.set('Access-Control-Allow-Credentials',true);
    ctx.set('Access-Control-Max-Age',10000000);
    ctx.set('X-Powered-By',' 3.2.1');
    ctx.set('Access-Control-Expose-Headers','X-Client-ID');

    if(ctx.method.toLocaleLowerCase() !== 'options')
        return await next()

    ctx.status = 204;

}