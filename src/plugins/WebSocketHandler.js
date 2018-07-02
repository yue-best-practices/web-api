/**
 * Created by yuanjianxin on 2018/7/2.
 */
const HttpUtil=require('yue-http-util');
module.exports=class WebSocketHandler{

    static get instance(){
        if(!WebSocketHandler._instance)
            WebSocketHandler._instance=new WebSocketHandler();
        return WebSocketHandler._instance;
    }

    constructor(){
        this.host=null;
        this.port=null;
    }

    config({host,port}){
        this.host=host;
        this.port=port;
    }


    /**
     * 根据用户id 获取用户该连接的web socket地址
     * @param userId
     * @returns {Promise.<*>}
     */
    async getURIByUserId(userId){
        let method="get";
        let url=`${this.host}:${this.port}/getWebSocketUrl/${userId}`;
        let uri=null;
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,{},{});
            if(res && res.code==200)
                uri=res.data && res.data.wsUrl;
        }catch (e){
            console.error('==getURIByUserId Error==',e);
        }
        return uri;
    }


    /**
     * 发送消息
     * @param userId
     * @param message
     * @returns {Promise.<boolean>}
     */
    async sendMessage(userId,message){
        !(userId instanceof Array) && (userId=[userId]);
        !(message instanceof Array) && (message=[message]);

        let method="post";
        let url=`${this.host}:${this.port}/sendMessage`;
        let result=true;
        try{
            await HttpUtil.instance.sendRequest(method,url,{userId,message},{});
        }catch (e){
            console.error('==sendMessage Error==',e);
            result=false;
        }
        return result;
    }


    /**
     * 广播
     * @param message
     * @returns {Promise.<boolean>}
     */
    async broadcast(message){
        let method="post";
        let url=`${this.host}:${this.port}/broadcast`;
        let result=true;
        try{
            await HttpUtil.instance.sendRequest(method,url,{message},{});
        }catch (e){
            console.error('==Broadcast Error==',e);
            result=false;
        }
        return result;
    }

    /**
     * 检测用户是否在线
     * @param userId
     * @returns {Promise.<boolean>}
     */
    async isOnline(userId){
        let method="put";
        let url=`${this.host}:${this.port}/isOnline/${userId}`;
        let result=false;
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,{},{});
            if(res && res.code==200 && res.data)
                result=res.data.result;
        }catch (e){
            console.error('==isOnline Error==',e);
        }
        return result;
    }


};