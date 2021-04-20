const devConfig = {
    env: "dev",
    mqs: [
        {
            name: '雨水[测试]',
            host: "",
            port: 5672,
            user: "",
            password: "",
            maxConnection: 100,
            maxChannels: 100,
            maxMessageReady: 10
        },
        {
            name: '春分[测试]消费',
            host: "127.0.0.1",
            port: 11672,
            user: "",
            password: "",
            maxConnection: 100,
            maxChannels: 100,
            maxMessageReady: 10
        },
        {
            name: '春分[测试]分发mq 2.0',
            host: "127.0.0.1",
            port: 13672,
            user: "",
            password: "",
            maxConnection: 100,
            maxChannels: 100,
            maxMessageReady: 10
        },
        {
            name: '春分[测试]分发mq 1.0',
            host: "127.0.0.1",
            port: 15672,
            user: "",
            password: "",
            maxConnection: 100,
            maxChannels: 100,
            maxMessageReady: 10
        }
    ],
    wechatKey: ""
}

const prodConfig = {
    env: "prod",
    mqs: [{
        name: '雨水生产mq',
        host: "",
        port: 15672,
        user: "",
        password: "",
        maxConnection: 100,
        maxChannels: 100,
    },
        {
            name: '春分生产MQ',
            host: "",
            port: 15672,
            user: "",
            password: "",
            maxConnection: 100,
            maxChannels: 100,
            maxMessageReady: 100
        }],
    wechatKey: ""

}

const getConfig = () => {
    return process.env.NODE_ENV ==='production'? devConfig : prodConfig;
}
module.exports = {getConfig}
