import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send({success: false, message: "you must be logged in"})
        }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).send({success: false, message: "Failed to authenticate token."})
    }
}
export const isAdmin = function(req,res,next) {
    const isAdminRole = req.user.role === "admin"
    if(!isAdminRole){
        return res.status(401).send({success: false, message: "Unauthorized Access"})
    }
    next()
}