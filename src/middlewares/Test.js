/**
 * Created by yuanjianxin on 2018/5/30.
 */

export default {

    async test1(ctx, next){

        ctx.test1 = "this is test1";

        console.log('==middle_test1 before===')
        await next();

        console.log('==middle_test1 after===')

    },


    async test2(ctx, next){
        ctx.test2 = "this is test2";

        console.log('==middle_test2 before===')
        await next();

        console.log('==middle_test2 after===')

    }

}