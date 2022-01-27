const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmF2ZWVua3VtYXIwMSIsImEiOiJja3lwZDhjY3IwOHU1MzFsdWd4czJ4NGc1In0.MTF4oQd7iWsTitV9i9lfiA'
    
    request( { url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find a valid location. Try another search.', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }

    })
}

module.exports = geocode