const axios = require('axios');


async function requestSpotifyAccessToken() {

    let _credentials = Buffer.from(`${process.env.SPOTIFY_CLIENTID}:${process.env.SPOTIFY_CLIENTSECRET}`).toString('base64');
    try {
        let _res = await axios.post(
            'https://accounts.spotify.com/api/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${_credentials}`
                }
            }
        );

        return _res;
    } catch (error) {
        console.log("fallo en la peticion de access token..........")
        return null;
    }



}

module.exports = {
    fetchSpotifyPlaylist : (req , res) => {
        try {
            
            


        } catch (error) {
            
        }
    }
}