const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
    const splitAuthorizationHeader = req.headers.authorization.split(" ");
    if (splitAuthorizationHeader.length !== 2) {
        return res.status(403).json({
            message: "Endpoint requires bearer token"
        })
    }

    const bearerToken = splitAuthorizationHeader[1];

    jwt.verify(
        bearerToken, 
        process.env.SECRET_KEY, 
        (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    message: "Invalid JWT"
                })
            }

            req.userId = decoded.userId;

            next();
        }
    );
}


module.exports = {
    authorize
}