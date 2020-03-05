const schemas = require("../schemas")

module.exports = function (app) {
    app.post("/api/weight", async function (req, res) {
        // Get user
        var user = await getUserByEmail(req._passport.session.user);
        var newWeight = new schemas.Weight({
            email: user[0].email,
            weight: req.body.weight,
            date: req.body.date
        })
        newWeight.save();
    })

    app.get("/api/weight/", async function(req, res){
        // Get user
        var user = await getUserByEmail(req._passport.session.user);
        // Get all weights
        var weights = await schemas.Weight.find({
            email: user[0].email
        })
        return res.json({
            weights: weights
        })
    });

    // Function to get user from email
    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }
}