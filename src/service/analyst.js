var _ = require('lodash');
const analyseOverview = (overview, mq) => {
    //default result
    const result = {
        overMaxMessageReady: false,
        unacknowledged: false,
        overMaxConnection: false,
        overMaxChannels: false,
        details: {}
    };
    const {queue_totals, object_totals} = overview;
    const {connections, channels} = object_totals;
    //未确认的数据超过阈值
    if (queue_totals.messages_unacknowledged > 0) {
        result.unacknowledged = true;
        result.details.unacknowledged = {
            max: 0,
            current: queue_totals.messages_unacknowledged
        }
    }
    //入队列数据持续上升
    if (queue_totals.messages_details.samples) {
        const samples = queue_totals.messages_details.samples;
        let itemUpTrend = samples.filter((item, index) => {
            return (index + 1 < samples.length) && (item.sample > samples[index + 1].sample)
        });

        if (itemUpTrend.length > 0) {
            result.queueMessageUp = true;
            let index = _.findIndex(samples,a => a.timestamp === itemUpTrend[0].timestamp);
            result.details.queueMessageUp = {
                from: samples[index + 1].sample,
                to: samples[index].sample,
            }
        }

    }
    //ready 数据超过阈值
    if (mq.maxMessageReady && queue_totals.messages_ready > 0) {
        result.overMaxMessageReady = true;
        result.details.overMaxMessageReady = {
            max: 0,
            current: queue_totals.messages_ready
        }
    }
    //最大连接数超过阈值
    if (mq.maxConnection && connections > mq.maxConnection) {
        result.overMaxConnection = true;
        result.details.overMaxConnection = {
            max: mq.maxConnection,
            current: connections
        }
    }
    //最大通道数超过阈值
    if (mq.maxChannels && channels > mq.maxChannels) {
        result.overMaxChannels = true;
        result.details.overMaxChannels = {
            max: mq.maxChannels,
            current: channels
        }
    }

    return result;
}

module.exports = {analyseOverview}
