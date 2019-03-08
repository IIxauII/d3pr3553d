module.exports = {
    verifyHex: function(hexString) {
        //hexString has to be in 0xFFFFFF format
        let colorCheck  = /^0x[0-9A-F]{6}$/i.test(hexString);
        if (colorCheck) {
            return true;
        } else {
            return false;
        }        
    }
};