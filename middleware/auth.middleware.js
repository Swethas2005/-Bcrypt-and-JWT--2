// packages
let jwt = require("jsonwebtoken")

// local imports 
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// Authentication 

async function authenticate(req,res,next){
    try {
        let authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).send("Authorization missing the headers")
        }

        let token = authHeader.token.split(" ")[1]

        if(!token){
            return res.status(401).send("Token not found")
        }

        // verifying the token
        jwt.verify(token,JWT_SECRET_KEY , function(err, decoded) {
            if (err) {
             return res.status(401).send("user not authenticated, please login")
            }
            if(decoded){
                req.body.role = decoded.role
                next();
            }
          });

    } catch (error) {
        console.log(error)
        res.status(401).send("internal server error ")
    }
}

// Authorization
async function authorize(permittedRoles){
    return function (req,res,next){
        try {
           if(permittedRoles.includes(req.body.role)){
              next()
           }else{
            return res.status(401).send({message: "User doesn't have permission to see the route"})
           }
        } catch (error) {
            res.status(401).send("internal server error")
        }
    }
}

module.exports = {authenticate,authorize}