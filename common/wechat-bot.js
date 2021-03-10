const {getConfig} = require("./config");
const {post} = require("./request");
const sendWechatMessage = async (content) => {
    const key = getConfig().wechatKey;
    await post("https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=" + key, JSON.stringify({
        "msgtype": "markdown",
        "markdown": {
            "content": content,
        }
    }));
}

module.exports = {sendWechatMessage}
