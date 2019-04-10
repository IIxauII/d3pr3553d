module.exports = {
    verifyHex(hexString) {
        // hexString has to be in 0xFFFFFF format
        const colorCheck = /^0x[0-9A-F]{6}$/i.test(hexString);
        if (colorCheck) {
            return true;
        }
        return false;
    },
};
