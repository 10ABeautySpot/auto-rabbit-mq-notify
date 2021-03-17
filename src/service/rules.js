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
                rules.push({field, content, detail: analysisResult.details[field]});
            }
        })
    })
    return rules;
}

const notifyMqStatus = async (matchRules, mq) => {
    const rulesContent = matchRules.map(r => `<font color="info">${r.content} 阈值:${r.detail.max} 当前:${r.detail.current} </font> `).join("\n >")
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
