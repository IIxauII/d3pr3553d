const lolChampionData = require('../media/lol/champion.json');
const lolProfilIconData = require('../media/lol/profileicon.json');

module.exports = {
    fetchImagesByKey(champId) {
        let imgPath = '';
        for (champ in lolChampionData.data) {
            //console.log(champ);
            if (lolChampionData.data[champ].key == champId) {
                imgPath = `./media/lol/img/champion/${lolChampionData.data[champ].image.full}`;
                //console.log('FOUND');
                break;
            }
        }
        return imgPath;
    },
    fetchProfilIconById(profilIconId) {
        let imgData = {
            path: '',
            name: '',
        };
        for (icon in lolProfilIconData.data) {
            if (lolProfilIconData.data[icon].id == profilIconId) {
                imgData.path = `./media/lol/img/profileicon/${lolProfilIconData.data[icon].image.full}`;
                imgData.name = lolProfilIconData.data[icon].image.full;
                break;
            }
        }
        return imgData;
    }
}