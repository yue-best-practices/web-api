/**
 * Created by yuanjianxin on 2018/5/9.
 */

const User=require('../model/User');

module.exports=class {


    async findById(id){
        let res=await User.findById(id);
        if(!res)
            return null;
        return res.get({ plain:true });
    }

}