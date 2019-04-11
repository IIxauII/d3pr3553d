const axios = require('axios');
const randomInt = require('../../lib/randomInt.js');
const miniEmbed = require('../../lib/miniEmbed.js');
const imgEmbed = require('../../lib/imgEmbed.js');
const adminConfig = require('../../configs/admin.json');

const nasaKey = adminConfig.apis.nasa;

exports.run = (client, message, args) => {
    const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/';
    const roverOptions = ['curiosity', 'opportunity', 'spirit'];
    let requestString;
    let rover;
    let endpoint;

    function validateRover(arg) {
        roverOptions.forEach((element) => {
            if (element.includes(arg)) {
                rover = element;
            }
        });
        return rover;
    }

    async function getRandomImage() {
        axios.get(requestString)
            .then((response) => {
                console.log(requestString);
                const img = response.data.photos[randomInt.getRandomInt(0, response.data.photos.length - 1)].img_src;
                message.channel.send(imgEmbed.createImgEmbed(client, '0xbbddff', img));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getManifest() {
        axios.get(requestString)
            .then((response) => {
                const manifest = response.data.photo_manifest;
                const manifestArray = [{ name: 'rover', value: manifest.name },
                    { name: 'launch date', value: manifest.launch_date },
                    { name: 'landing date', value: manifest.landing_date },
                    { name: 'status', value: manifest.status },
                    { name: 'max sol', value: manifest.max_sol },
                    { name: 'max date', value: manifest.max_date },
                    { name: 'total photos', value: manifest.total_photos },
                ];
                message.channel.send(miniEmbed.createMiniEmbed(client, '0xbbddff', manifestArray));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if ('manifests'.includes(args[0])) {
        rover = validateRover(args[1]);
        endpoint = `manifests/${rover}`;
        requestString = `${baseUrl + endpoint}?api_key=${nasaKey}`;
        getManifest(requestString);
    } else {
        rover = validateRover(args[0]);
        endpoint = `rovers/${rover}/photos`;
        const query = `?sol=${args[1]}&api_key=${nasaKey}`;
        requestString = baseUrl + endpoint + query;
        getRandomImage(requestString);
    }
};

// needs to be extended, so much more stuff can be done -> https://api.nasa.gov/api.html#MarsPhotos
