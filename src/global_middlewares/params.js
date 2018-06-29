/**
 * Created by yuanjianxin on 2018/4/10.
 */


/**
 * 参数处理中间键
 */

const mime=function (request) {
    let str=request.header['content-type'] || '';
    return str.split(';')[0];
}

module.exports=async (ctx,next)=>{

    //todo 这里做参数解析处理 可能需要之后补充

    ctx.$query=ctx.request.query;

    if(mime(ctx.request)==='multipart/form-data'){
        ctx.$files=ctx.request.body.files;
        ctx.$body=ctx.request.body.fields;
    }else{
        ctx.$body=ctx.request.body;
    }
    await next();



    //todo 这里统一做数据返回格式

    ctx.body=ctx.result || "Not Found";

    ctx.status=ctx.status || (ctx.result && 200 || 404);

}