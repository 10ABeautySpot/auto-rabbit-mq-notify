var _ = require('lodash');
const {sendWechatMessage} = require("../common/wechat-bot");
const overviewRules = {
    name: "overview",
    rules: [{
        field: "unacknowledged",
        content: "overview-存在未确认的消息"
    }, {
        field: "overMaxConnection",
        content: "overview-超过预期连接数阈值"
    }, {
        field: "overMaxChannels",
        content: "overview-超过预期通道数阈值"
    }, {
        field: "overMaxMessageReady",
        content: "overview-超过预期Ready数据阈值"
    }, {
        field: "queueMessageUp",
        content: "overview-入队列数据持续上升"
    }
    ]
}

const allRules = [overviewRules]

const findMatchRule = (analysisResult) => {
    let rules = [];
    let pickRulesKey = _.keys(_.pickBy(analysisResult, (value) => !!value));
    allRules.forEach(groupRule => {
        groupRule.rules.forEach(ruleItem => {
            let {field, content} = ruleItem
            if (pickRulesKey.indexOf(field) >= 0) {
                let detail = analysisResult.details[field];
                if (detail) {
                    rules.push({field, content, detail: detail});
                } else {
                    rules.push({field, content});
                }
            }
        })
    })
    return rules;
}

const notifyMqStatus = async (matchRules, mq) => {

    const rulesContent = matchRules.map(r => {
        console.log("r", r);
        if (r.detail && r.detail.current) {
            return `<font color="info">${r.content} </font> <font color="comment"> 阈值:${r.detail.max} 当前:${r.detail.current}</font>`
        }
        if (r.detail && r.detail.from) {
            return `<font color="info">${r.content} </font> <font color="comment">从${r.detail.from} 到${r.detail.to}</font> `
        }
        return `<font color="info">${r.content} </font> `
    }).join("\n >")
    let markdownContent = `## MQ助手发现异常\n  [${mq.name}](http://${mq.host}:${mq.port})\n > ${rulesContent}`;
    await sendWechatMessage(markdownContent)
}

const notifyWhenMatch = (analysisResult, mq) => {
    const matchRules = findMatchRule(analysisResult);
    if (matchRules.length > 0) {
        notifyMqStatus(matchRules, mq);
    }
}

module.exports = {notifyWhenMatch}
