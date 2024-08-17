// packages
let jwt = require("jsonwebtoken");

// local imports 
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
let blacklistedToken = require("../models/blacklisted");

// Authentication 

async function authenticate(req, res, next) {
    try {
        let authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send("Authorization header missing");
        }

        let token = authHeader.split(" ")[1]; // Fixed the issue here

        if (!token) {
            return res.status(401).send("Token not found");
        }

        let isBlacklisted = await blacklistedToken.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).send("user logged out . Please login again.");
        }

        // Verifying the token
        jwt.verify(token, JWT_SECRET_KEY, function(err, decoded) {
            if (err) {
                return res.status(401).send("User not authenticated, please login");
            }
            if (decoded) {
                req.body.role = decoded.role;
                next();
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

// Authorization
async function authorize(permittedRoles) {
    return function (req, res, next) {
        try {
            if (permittedRoles.includes(req.body.role)) {
                next();
            } else {
                return res.status(401).send({ message: "User doesn't have permission to access this route" });
            }
        } catch (error) {
            res.status(500).send("Internal server error");
        }
    }
}

module.exports = { authenticate, authorize };
