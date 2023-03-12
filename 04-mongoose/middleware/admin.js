function admin ( req, res, next ) {
    if(!req.user.isAdmin) return res.status(403).send("Access Deined: you don't have access to this api")
    next()
}

module.exports = admin