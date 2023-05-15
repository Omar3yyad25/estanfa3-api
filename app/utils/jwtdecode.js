const jwt_decode = require ('jwt-decode');
const { serve } = require('swagger-ui-express');

function jwtdecode(session){
    try{
        session = session.replace("=", "")
        const token = parseJwt(session, 0)
        const innertoken = parseJwt(token.token, 1)
        const id = innertoken.id
        return id
    }
    catch(err){
       return false
    }
    return false
}

function parseJwt (token, part) {
    var base64Payload = token.split('.')[part];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());}


module.exports = {jwtdecode}