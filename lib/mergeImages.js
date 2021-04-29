const mergeImg = require('merge-img');
const { resolve } = require('path');

module.exports = {
    async mergeImages(imgPathArray, imgSavePath) {
        mergeImg(imgPathArray)
            .then((img) => {
                img.write(imgSavePath, () => {
                    console.log('done');
                    resolve;
                });
            });
    }
}