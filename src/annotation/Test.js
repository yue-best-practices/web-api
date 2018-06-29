/**
 * Created by yuanjianxin on 2018/5/29.
 */
export default (target, name, descriptor) => {
    let oldValue = descriptor.value;

    descriptor.value = async(ctx, next) => {

        //todo something
        console.log('==Decorator for Test==');


        // run old func
        await oldValue.apply(target, [ctx, next]);// oldValue.call(target,ctx,next); || oldValue.bind(target,ctx,next)();
    };

    return descriptor;

}