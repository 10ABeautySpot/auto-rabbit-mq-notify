const {get} = require("./request");

const getOverview = async (mq) => {
    const {host, port, user, password} = mq;
    const token = getAuthToken(user, password);
    return get(`http://${host}:${port}/api/overview?lengths_age=60&lengths_incr=5&msg_rates_age=60&msg_rates_incr=5`, {'Authorization': `${token}`})
}

const getAuthToken = (user, password) => {
    const authStr = Buffer.from(`${user}:${password}`).toString('base64');
    let authCode = `Basic ${authStr}`;
    return authCode;
}


module.exports = {getOverview}


