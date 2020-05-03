const schemas = require("../schemas")

module.exports = function (app) {
    app.post("/api/weight", async function (req, res) {
        // Get user
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
        await schemas.Weight.deleteOne({
            _id: req.params.id,
            email: user[0].email
        })
        
    });

    app.get("/api/height/", async function(req, res){
        var user = await getUserByEmail(req._passport.session.user);
        return res.json({
            height: user[0].height
        })
    });

    app.post("/api/height", async function(req, res){
        await schemas.User.findOneAndUpdate({email: req._passport.session.user}, {height: req.body.height}, {new: true, useFindAndModify: false});
        res.sendStatus(200);
    });

    app.get("/api/messages", async function(req, res){        
        var user = await getUserByEmail(req._passport.session.user);
        messages = await schemas.Message.find({$or: [{userTo: user[0].email}, {userFrom: user[0].email}]})
        
        return res.json({
            messages: messages,
            currentUser: user
        })
        
    })

    app.post("/api/messages", async function(req, res){ 
        var newMessage = new schemas.Message({
            userTo: req.body.userTo.email,
            userFrom: req.body.currentUser[0].email,
            read: false,
            text: req.body.text,
            date: new Date(),

        })
        newMessage.save(function(err, message){
            return res.json({
            _id: message._id
            })
        });
    })

    app.post("/api/message/read", async function(req, res){
        await schemas.Message.findOneAndUpdate({_id: req.body._id}, {read: true}, {new: true, useFindAndModify: false});
        res.sendStatus(200);
    })

    app.post("/api/workout/new", async function(req, res){
        var user = await getUserByEmail(req._passport.session.user);

        // Create new workout and save exercises
        var newWorkout = new schemas.Workout({
            name: req.body[0].workoutName,
            userCreated: user[0].email,
            dateCreated: new Date(),
        })
        
        newWorkout.save(function(err, message){
            for (var i = 0; i < req.body.length; i++) {
                var newExercise = new schemas.Exercise({
                    workoutID: message._id,
                    exerciseTypeValue: req.body[i].exerciseTypeValue,
                    exerciseValue: req.body[i].exerciseValue,
                    customName: req.body[i].customName,
                    minutes: req.body[i].minutes,
                    seconds: req.body[i].seconds,
                    distance: req.body[i].distance,
                    weight: req.body[i].weight,
                    sets: req.body[i].sets,
                    repetitions: req.body[i].repetitions,
                    notes: req.body[i].notes
                })
                newExercise.save();
            }
        });
        return res.json({success: true});
    
    })

    app.get("/api/workout", async function(req, res){
        workouts = await schemas.Workout.find({userCreated: req._passport.session.user});
        var workoutData = [];
        for (var i = 0; i < workouts.length; i++){
            exercises = await schemas.Exercise.find({workoutID: workouts[i]._id});
            workoutData[i] = {workout: workouts[i], exercises: exercises}; 
        }
        return res.json({workouts: workoutData})
    });

    app.delete("/api/workout/:id", async function(req, res){
        await schemas.Workout.deleteOne({
            _id: req.params.id,
            userCreated: req._passport.session.user
        })
        await schemas.Exercise.deleteMany({
            workoutID: req.params.id
        })
        await schemas.AssignedWorkout.deleteMany({
            workoutID: req.params.id
        })

    });

    // Route to assign a workout to a client
    app.post("/api/workout/assign", async function(req, res){
        var assignment = new schemas.AssignedWorkout({
            user: req.body.client.email,
            pt: req._passport.session.user,
            workoutID: req.body.workoutSelected._id,
            day: req.body.day,
            dateAssigned: new Date(),
        })
        assignment.save();
        return res.json({success: true})
    });

    // Route to get all workouts assigned to current user
    app.get("/api/workout/assigned", async function(req, res){
        var user = await getUserByEmail(req._passport.session.user);

        var assignedWorkouts = await schemas.AssignedWorkout.find({user: user[0].email});

        // Get all workouts
        var workouts = [];
        for (var i = 0; i < assignedWorkouts.length; i++){
            workouts[i] = await schemas.Workout.findOne({_id: assignedWorkouts[i].workoutID})
        }
        
        // Get all exercises for each workout
        var workoutData = [];
        for (var i = 0; i < workouts.length; i++){
            exercises = await schemas.Exercise.find({workoutID: workouts[i]._id});
            workoutData[i] = {workout: workouts[i], exercises: exercises}; 
        }

        return res.json({
            workouts: workoutData,
            assignment: assignedWorkouts
        })
    });

    app.get("/api/user/relationship", async function (req, res){
        var currentUser = await getUserByEmail(req._passport.session.user);

        clientEmails = await schemas.Relationship.find({$or: [{user1: currentUser[0].email}, {user2: currentUser[0].email}]})
        var clients = [];

        for (var i = 0; i < clientEmails.length; i++){
            if (clientEmails[i].user1 !== currentUser[0].email){
                var user = await getUserByEmail(clientEmails[i].user1);
                clients.push(user[0]);
            } else if (clientEmails[i].user2 !== currentUser[0].email){
                var user = await getUserByEmail(clientEmails[i].user2);
                clients.push(user[0]);
            }
        }

        return res.json({
            clients: clients,
            currentUser: currentUser
        })
    });

    app.post("/api/user/relationship", async function(req, res) {
        var user1 = await getUserByEmail(req._passport.session.user);
        var user2 = await getUserByEmail(req.body.email);
        
        if(user2.length !== 0){
            // Checking only one user is a PT
            if(!(user1[0].ptBool && user2[0].ptBool)){
            var newRelationship = new schemas.Relationship({
                user1: user1[0].email,
                user2: req.body.email,
                active: true
            })
            newRelationship.save();
            return res.json({success: true});
            }
        }

        return res.json({success: false});

    });

    // Function to get user from email
    async function getUserByEmail(email) {
        return await schemas.User.find({email: email});
    }
}