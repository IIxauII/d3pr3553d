/* eslint-disable no-unused-vars */
const {
    ms, s, m, h, d,
} = require('time-convert');

exports.run = (client, message, args) => {
    const upTime = ms.to(d, h, m, s)(client.uptime);
    message.reply(`Client has been up for: ${upTime[0]} days, ${upTime[1]} hours, ${upTime[2]} minutes, ${upTime[3]} seconds!`);
};
