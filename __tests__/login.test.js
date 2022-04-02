
const request = require('supertest')
//const { login } = require('../controllers/auth.controllers')
const app = require('../index')

describe("GET / ", () => {
    test("checks if server is accessible", async () => {
      const response = await request(app).get("/");
      expect(response.body).toEqual({"data": [], "message": "You are welcome guys", "status": false});
      expect(response.statusCode).toBe(200);
    });
});


describe("POST / ", () => {
    test("Success Login", async () => {
            const response = await request(app).post("/login").send({
                email: "roshbon@gmail.com",
                password: "Password1@"
            
            })
            expect(response.body.message).toEqual("Successfully logged in");
            expect(response.body.status).toEqual(true)
            expect(response.headers.token).toBeDefined()
            expect(response.statusCode).toBe(200)

 
    });
});


describe("POST / ", () => {
    test("Failed Login", async () => {
            const response = await request(app).post("/login").send({
                email: "ff@gmail.com",
                password: "1111@"
            
            })
            expect(response.body.status).toEqual(false)
            expect(response.statusCode).toBe(400)

 
    })
})


// describe("POST /create", () => {
//     test("It responds with the newly created user", async () => {
//       const newUser = await request(app).post("/user/create") .send({
        
//         });
  
//       expect(newUser.body).toHaveProperty("id");
//       expect(newUser.body.name).toBe("");
//       expect(newUser.statusCode).toBe(200);

//     });
//   });
  
// describe("GET /users", () => {
//     test("returns a list of users", async () => {
//       const response = await request(app)
//         .get("/user")
//         // add an authorization header with the token
//         .set("authorization", auth.token);
//       expect(response.body.length).toBe(1);
//       expect(response.statusCode).toBe(200);
//     });
//   });
  
//   describe("GET /users without auth", () => {
//     test("requires login", async () => {
//       // don't add an authorization header with the token...see what happens!
//       const response = await request(app).get("/user");
//       expect(response.statusCode).toBe(401);
//       expect(response.body.message).toBe("Unauthorized");
//     });
//   });


// describe('Space test suite', () => {
//     it('tests /login', async() => {
//         const response = await request(login).get("/login")
//         expect(response.body).toEqual({status:true, message: "Successfully logged in "})
//         expect(response.statusCode).toBe(200)

//     });

//     // Insert other tests below this line

//     // Insert other tests above this line
// });