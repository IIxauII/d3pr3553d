const axios = require('axios');
const randomInt = require('../../lib/randomInt.js');
const miniEmbed = require('../../lib/miniEmbed.js');
const imgEmbed = require('../../lib/imgEmbed.js');
const adminConfig = require('../../configs/admin.json');
const mainConfig = require('../../configs/main.json');
const microEmbed = require('../../lib/microEmbed.js');

const nasaKey = adminConfig.apis.nasa;

exports.run = (client, message, args) => {
    const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/';
    const roverOptions = ['curiosity', 'opportunity', 'spirit'];
    const marsEmbedColor = '0xbbddff';
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
                //console.log(requestString);
                const photos = response
                    .data
                    .photos[randomInt.getRandomInt(0, response.data.photos.length - 1)];
                if (!photos || !photos.img_src) {
                    displayNoImgFoundOnGivenSol();
                } else {
                    let img = photos.img_src;
                    message.channel.send(imgEmbed.createImgEmbed(client, marsEmbedColor, img));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getManifest() {
        axios.get(requestString)
            .then((response) => {
                const manifest = response.data.photo_manifest;
                //console.log(manifest);
                const manifestArray = [{ name: 'rover', value: manifest.name },
                    { name: 'launch date', value: manifest.launch_date },
                    { name: 'landing date', value: manifest.landing_date },
                    { name: 'status', value: manifest.status },
                    { name: 'max sol', value: manifest.max_sol },
                    { name: 'max date', value: manifest.max_date },
                    { name: 'total photos', value: manifest.total_photos },
                ];
                message.channel.send(miniEmbed.createMiniEmbed(client, marsEmbedColor, manifestArray));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function displayHelp() {
        const helpArray = [];
        helpArray.push(miniEmbed.createMiniEmbedFields('Mars Command', 'Provides images from the NASA rovers on mars.'));
        helpArray.push(miniEmbed.createMiniEmbedFields('Rovers {string}', 'curiosity, opportunity, spirit'));
        helpArray.push(miniEmbed.createMiniEmbedFields('Sol {number}', 'from which mars day to fetch image'));
        helpArray.push(miniEmbed.createMiniEmbedFields('Manifests {string}', 'fetch manifests of given rover'));
        helpArray.push(miniEmbed.createMiniEmbedFields('Example: Fetch image from spirit', `${mainConfig.prefix}mars spirit 100`));
        helpArray.push(miniEmbed.createMiniEmbedFields('Example: Fetch image from curiosity', `${mainConfig.prefix}mars cur 111`));
        helpArray.push(miniEmbed.createMiniEmbedFields('Example: Fetch manifest from opportunity', `${mainConfig.prefix}mars man op`));
        helpArray.push(miniEmbed.createMiniEmbedFields('Info', 'On some sols there may have been no picture taken!'));
        message.channel.send(miniEmbed.createMiniEmbed(client, marsEmbedColor, helpArray));
    }

    // to test !xmars cur 5
    function displayNoImgFoundOnGivenSol() {
        message.channel.send(microEmbed.createMicroEmbed(client, `Rover ${rover} did not shoot any pictures on sol ${args[1]}`, ' ', marsEmbedColor));
    }

    if (!args || !args.length) {
        displayHelp();
    } else if ('manifests'.includes(args[0])) {
        rover = validateRover(args[1]);
        if (!rover) {
            displayHelp();
            return;
        }
        endpoint = `manifests/${rover}`;
        requestString = `${baseUrl + endpoint}?api_key=${nasaKey}`;
        getManifest(requestString);
    } else {
        rover = validateRover(args[0]);
        if (!rover) {
            displayHelp();
            return;
        }
        endpoint = `rovers/${rover}/photos`;
        const query = `?sol=${args[1]}&api_key=${nasaKey}`;
        requestString = baseUrl + endpoint + query;
        getRandomImage(requestString);
    }
};

// needs to be extended, so much more stuff can be done -> https://api.nasa.gov/api.html#MarsPhotos
