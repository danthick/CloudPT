const schemas = require("../schemas")

module.exports = function (app) {
    app.post("/api/weight", async function (req, res) {
        // Get user
        console.log(req.body)
        var user = await getUserByEmail(req._passport.session.user);
        var newWeight = new schemas.Weight({
            email: user[0].email,
            weight: req.body.weight,
            date: req.body.date
        });
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

    app.delete("/api/weight/:id", async function(req, res){
        // Get user
        var user = await getUserByEmail(req._passport.session.user);
        // Get all weights
        var weights = await schemas.Weight.deleteOne({
            _id: req.params.id,
            email: user[0].email
        })
        
    });

    app.get("/api/height/", async function(req, res){
        // Get user
        var user = await getUserByEmail(req._passport.session.user);
        return res.json({
            height: user[0].height
        })
    });

    app.post("/api/height", async function(req, res){
        // Add or update height to user
        await schemas.User.findOneAndUpdate({email: req._passport.session.user}, {height: req.body.height}, {new: true, useFindAndModify: false});
    });


    // Function to get user from email
    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }
}