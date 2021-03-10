var _ = require('lodash');
const {sendWechatMessage} = require("../common/wechat-bot");
const overviewRules = {
    name: "overview",
    rules: [{
        field: "hasUnacknowledged",
        content: "存在未确认的消息"
    }, {
        field: "overMaxConnection",
        content: "超过预期连接数阈值"
    }
    ]
}

const allRules = [overviewRules]

const findMatchRule = (analysisResult) => {
    let rules = [];
    let pickRulesKey = _.keys(_.pickBy(analysisResult, (value) => !!value));
    allRules.forEach(groupRule => {
        groupRule.rules.forEach(ruleItem => {
            if (pickRulesKey.indexOf(ruleItem.field) >= 0) {
                rules.push(ruleItem);
            }
        })
    })
    return rules;
}

const notifyMqStatus = async (matchRules, mq) => {
    const rulesContent= matchRules.map(r=>`<font color="info">${r.content} </font> `).join("\n >")
    let markdownContent = `## MQ助手发现异常\n  [${mq.name}](http://${mq.host}:${mq.port})\n > ${rulesContent}`;
    await sendWechatMessage(markdownContent)
}

const notifyWhenMatch = (analysisResult, mq) => {
    const matchRules = findMatchRule(analysisResult);
    if(matchRules.length>0){
        notifyMqStatus(matchRules, mq);
    }
}

module.exports = {notifyWhenMatch}
