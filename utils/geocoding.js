const axios = require("axios");
// helper
async function getCoordinates(location) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

    const response = await axios.get(url, {
        headers: {
            "User-Agent": "Stayora"
        }
    });

    if (response.data.length === 0) {
        return null;
    }

    return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon),
    };
}

module.exports=getCoordinates;