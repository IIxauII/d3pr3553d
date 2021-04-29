const adminConfig = require('../configs/admin.json');

module.exports = {
    isUserAdmin(memberId) {
        let userIsAdmin = false;
        for (admin in adminConfig.admins) {
            if (memberId === adminConfig.admins[admin]) {
                userIsAdmin = true;
            }
        }
        return userIsAdmin;
    },
    reportUnauthorized(member, commandName) {
        console.log(`Alert!: ${member.user.username} ${member.id} tried to use ${commandName} command!`);
    }
}