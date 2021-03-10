const analyseOverview = (overview,mq) => {
    //default result
    const result = {hasUnacknowledged: false, overMaxConnection: false};
    const {queue_totals,object_totals} = overview;
    const {connections} = object_totals;
    //update status
    if (queue_totals.messages_unacknowledged > 0) {
        result.hasUnacknowledged = true;
    }

    if (mq.maxConnection && connections>mq.maxConnection) {
        result.overMaxConnection = true;
    }

    return result;
}

module.exports = {analyseOverview}
