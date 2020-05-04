// Import the libraries for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('./server');
var requestp = require("supertest-as-promised");
var agent = requestp.agent(app)

// Configure chai and server
chai.use(chaiHttp);
chai.should();

// Creating test item and user
var user = {
    "firstName": "Test",
    "lastName": "User",
    "email": "test@user.com",
    "password": "test"
};
var testItem = {
    "item": "Complete coursework"
}

// Testing user functions. Registering, and logging in.
describe("Users", () => {
    describe("Register User", () => {
        it("should register a new user", (done) => {
            chai.request(app)
                .post("/register")
                .type('form')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("Incorrect Password", () => {
        it("should fail to log test user in due to incorrect password", (done) => {
            agent
                .post('/login')
                .type('form')
                .send({
                    email: user.email,
                    password: "wrong"
                })
                .end((err, res) => {
                    res.should.redirectTo('/login');
                    done();
                });
        });
    });
    describe("Incorrect Email", () => {
        it("should fail to log test user in due to incorrect email", (done) => {
            agent
                .post('/login')
                .type('form')
                .send({
                    email: "wrong@wrongemail.com",
                    password: user.password
                })
                .end((err, res) => {
                    res.should.redirectTo('/login');
                    done();
                });
        });
    });
    describe("Log User In", () => {
        it("should log test user in successfully", (done) => {
            agent
                .post('/login')
                .type('form')
                .send({
                    email: user.email,
                    password: user.password
                })
                .end((err, res) => {
                    res.should.redirectTo('/todo');
                    done();
                });
        });
    });
});


// Testing item functions. Adding, editing and deleting items.
describe("Items", () => {
    describe("Get To Do List", () => {
        it("should get all user to do item", (done) => {
            agent
                .get('/todo')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("Add Item", () => {
        it("should add an item to test users to do list", (done) => {
            agent
                .post("/todo")
                .type('form')
                .send({
                    item: testItem.item
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("Edit Item", () => {
        it("should edit an items name", (done) => {
            agent
                .put("/todo/" + testItem.item)
                .type('form')
                .send({
                    old: testItem.item,
                    new: "Updated"
                })
                .end()
                .then(function (err, res) {
                    done()
                })
                .catch(function (err) {
                    done(err);
                })
        })
    });
    describe("Delete Item", () => {
        it("should delete an item", (done) => {
            agent
                .delete("/todo/" + "Updated")
                .type('form')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        })
    });
});

// Testing logging the user out
describe("Log User Out", () => {
    it("should log user out and return to login page", (done) => {
        agent
            .get("/logout")
            .type('form')
            .end((err, res) => {
                res.should.redirectTo('/login');
                done();
            });
    });
});

// Testing deleting a user
describe("Delete User", () => {
    it("should delete an existing user", (done) => {
        chai.request(app)
            .delete("/register/" + user.email)
            .type('form')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});