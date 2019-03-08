const miniEmbed = require("../../lib/miniEmbed.js");
const imgEmbed = require("../../lib/imgEmbed.js");
const axios = require('axios');
const adminConfig = require("../../configs/admin.json");
let nasaKey = adminConfig.apis.nasa;

exports.run = (client, message, args) => {
    let baseUrl = "https://api.nasa.gov/mars-photos/api/v1/";
    let roverOptions = ["curiosity", "opportunity", "spirit"];
    let requestString, rover, endpoint;

    
    if ("manifests".includes(args[0])) {        
        rover = validateRover(args[1]);
        endpoint = "manifests/" + rover;
    }

    function validateRover(arg) {
        let rover;
        roverOptions.forEach(element => {
            if (element.includes(arg)) {
                rover = element;
            }
        });
        return rover;
    }

    requestString = baseUrl + endpoint + "?api_key=" + nasaKey;

    getManifest(requestString);

    async function getManifest(requestString) {
        axios.get(requestString)
        .then(response => {
            let manifest = response.data.photo_manifest;
            let manifestArray = [{"name": "rover", "value": manifest.name},
                                {"name": "launch date", "value": manifest.launch_date},
                                {"name": "landing date", "value": manifest.landing_date},
                                {"name": "status", "value": manifest.status},
                                {"name": "max sol", "value": manifest.max_sol},
                                {"name": "max date", "value": manifest.max_date},
                                {"name": "total photos", "value": manifest.total_photos}
                                ]
            message.channel.send(miniEmbed.createMiniEmbed(client, "0xbbddff", manifestArray));
        })
        .catch(error => {
            console.log(error);
        });
    }
}

//needs to be extended, so much more stuff can be done -> https://api.nasa.gov/api.html#MarsPhotos