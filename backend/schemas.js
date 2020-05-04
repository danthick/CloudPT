var mongoose = require("mongoose")

// User data structure
var User = mongoose.model("user", {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    height: Number,
    ptBool: Boolean
});

// Weight data structure
var Weight = mongoose.model("weight",{
    email: String,
    weight: Number,
    date: Date,
});

// Messages data structure
var Message = mongoose.model("message", {
    userTo: String,
    userFrom: String,
    read: Boolean,
    text: String,
    date: String,
});

var Workout = mongoose.model("workout", {
    name: String,
    userCreated: String,
    dateCreated: Date,
})

var Exercise = mongoose.model("exercise", {
    workoutID: String,
    exerciseTypeValue: String,
    exerciseValue: String,
    bodyPartValue: String,
    customName: String,
    minutes: String,
    seconds: String,
    distance: String,
    weight: String,
    sets: String,
    repetitions: String,
    notes: String,
})

var Relationship = mongoose.model("relationship", {
    user1: String,
    user2: String,
    active: Boolean
})

var AssignedWorkout = mongoose.model("assignedworkout", {
    user: String,
    pt: String,
    workoutID: String,
    day: String,
    dateAssigned: Date
});

// Export data structures
module.exports.User = User;
module.exports.Weight = Weight;
module.exports.Message = Message;
module.exports.Workout = Workout;
module.exports.Exercise = Exercise;
module.exports.Relationship = Relationship;
module.exports.AssignedWorkout = AssignedWorkout;