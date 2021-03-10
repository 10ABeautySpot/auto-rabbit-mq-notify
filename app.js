const logger = require('pino')();
const schedule = require('node-schedule');
const {sendWechatMessage} = require("./common/wechat-bot");
const {getConfig} = require("./common/config");
const {notifyWhenMatch} = require("./service/rules");
const {analyseOverview} = require("./service/analyst");
const {getOverview} = require("./common/mq-api");

const overViewJob = schedule.scheduleJob('0,10,20,30,40,50 * * * * ?', async function () {
    for (const mq of getConfig().mqs) {
        let overview = await getOverview(mq);
        let result = analyseOverview(overview, mq);
        notifyWhenMatch(result, mq);
    }
});


const workEndJob = schedule.scheduleJob('0 30 18 * * ?', async function () {
    sendWechatMessage("下班啦~~~");
});

const workStartJob = schedule.scheduleJob('0 30 8 * * ?', async function () {
    sendWechatMessage("早上好，新的一天开始啦！");
});

