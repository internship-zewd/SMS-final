const {sign, verify} = require('jsonwebtoken')

const createToken = (user) => {
    const accessToken = sign({ username: user.username, id: user.id}, process.env.jwtsecret);
    return accessToken
}

const validateToken= (req, res, next) => {
    const accessToken = req.body.accessToken

    if(!accessToken) return res.status(400).json({error: "User not authenticated"});

    try {
        const validToken = verify(accessToken, process.env.jwtsecret)
        if(validToken) {
            req.authenticated = true
            return next
        }
    } catch (err) {
        return res.status(400).json({error: err})
    }
}
module.exports = {
    createToken,
    validateToken
}