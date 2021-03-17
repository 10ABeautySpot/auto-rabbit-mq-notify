const analyseOverview = (overview, mq) => {
    //default result
    const result = {unacknowledged: false, overMaxConnection: false, overMaxChannels: false,details:{}};
    const {queue_totals, object_totals} = overview;
    const {connections,channels} = object_totals;
    //update status
    if (queue_totals.messages_unacknowledged > 0) {
        result.unacknowledged = true;
        result.details.unacknowledged={
            max:0,
            current:queue_totals.messages_unacknowledged
        }
    }

    if (mq.maxConnection && connections > mq.maxConnection) {
        result.overMaxConnection = true;
        result.details.overMaxConnection={
            max:mq.maxConnection,
            current:connections
        }
    }

    if (mq.maxChannels && channels > mq.maxChannels) {
        result.overMaxChannels = true;
        result.details.overMaxChannels={
            max:mq.maxChannels,
            current:channels
        }
    }

    return result;
}

module.exports = {analyseOverview}
