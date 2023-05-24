const decode = require('./jwtdecode')

function basic(req, res, next) {
    const session = req.cookies['bezkoder-session']  // get sellerId from cookies
    console.log(session)
    if (!session){
        console.log("no session")
        return res.redirect("http://estanfa3.com/login.html")
    }

    const sellerId = decode.jwtdecode(session);

    if (!sellerId){
        console.log("no sellerId")
        return res.redirect("http://estanfa3.com/login.html")
    }

    req.sellerId = sellerId

    next()
}


module.exports = {basic}