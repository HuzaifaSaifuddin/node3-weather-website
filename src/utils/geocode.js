const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaHV6YWlmYTE4IiwiYSI6ImNrajQ0cmE5MTJpNmEydG54MjNrNnE4YXMifQ.dQGXlqrQUVIbBzvUTWgjuQ`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const result = body.features[0]

            callback(undefined, {
                latitude: result.center[1],
                longitude: result.center[0],
                location: result.place_name,
            })
        }
    })
}

module.exports = geocode
