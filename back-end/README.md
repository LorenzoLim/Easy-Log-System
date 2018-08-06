# Overview
The ELS-Back-End is the API back end for the Easy Log System(ELS) application. This api is deployed on [Heroku](https://els-api.herokuapp.com/) and uses mLab for the database. You can find the deployed front end at [Netlify](https://easyloggingsystem.netlify.com).
____
### Purpose ###  
ELS is an easy to use app that allows DownerEDI employees to log hours spent on
projects across their sites. ELS looks to shorten the time spent on logging the hours and sending a report to the admin.
___
### Usage ###

Type into console:
```
git clone https://github.com/LorenzoLim/ELS-Back-End.git
npm install
```
Create an mLab or use an existing mLab account and create a new database.
[mLab](https://mlab.com)

Create a new file called ".env" on the root directory and add these variables.

DB_USER= Your mLab user on the new database
DB_PASSWORD= Your mLab password for the database
JWT_SECRET= Anything as long as it's the same value as the JWT_SECRET on the front end.

After the .env file has been made type into console:
```
npm start
```
Open a browser and use localhost:7000 as the URL and it should by default just say express. The app is only meant to be used for it's endpoints and don't display anything on the web. To view the front end have a look at the ELS front end.

Clone down the front end from this repository:
```
git clone https://github.com/Travis-Anderson83/ELS-Front-End.git
```
Have a look at the README.md of the front end to also set it up to use the full app.
____
#### End Points ###

GET https://els-api.herokuapp.com/
  * Returns the home page which is just text
  * Example:
  * ELS-Back-End
____
POST https://els-api.herokuapp.com/auth/register
  * Expects a JSON Object of an email and a password to register a new user and returns a JSON web token as a response.
  * Example:
```
    {
      "email": "john@gmail.com",
      "password": "Password1"
    }
```
____
POST https://els-api.herokuapp.com/auth
  * Expects a JSON object of an email and a password and verifies if the user exists, if they do it will respond with a JSON web token if not it will return an error saying they are unauthorized.
  * Example:
```
    {
      "email": "john@gmail.com",
      "password": "Password1"
    }
```
____
GET https://els-api.herokuapp.com/hours
  * Returns all the hours and which user and project they belong to in an array.
  * Example:
```
    {[
      {
        "id": "5a67df64839b280014691f44",
        "type": "Project",
        "project_id": The full project object,
        "user_id": The full user object
      },
      {
        etc..
      }
    ]}
```
____
GET https://els-api.herokuapp.com/hours/:id
  * Returns a specific hour by the id in the parameters.
  * Example:
```
  {
    "id": "5a67df64839b280014691f44",
    "type": "Project",
    "project_id": The full project object,
    "user_id": The full user object
  }
```
____
POST https://els-api.herokuapp.com/hours
  * Creates a new entry in the hours collection.
  * Example:
```
  {
    "selectedHourType": "Project",
    "selectedProject": "Millenium"
    "total": 8,
    "userId": "5a67c8ccc6ac890014f3e2d4"
  }
```
____
GET https://els-api.herokuapp.com/projects
  * Returns all the projects with all the users working on that projects.
  * Example:
```
  {[
    {"_id":"5a672d8bf5407a2cbcb658e7","projectNum":"0001","projectLocation":"Brisbane","projectName":"Clear Debris","projectStatus":"Active","__v":0,"projectUsers":[{"_id":"5a672b4bf5407a2cbcb658e1","email":"user@example.com","firstName":"Travis","lastName":"Anderson","role":"manager","__v":0},{"_id":"5a672c77f5407a2cbcb658e3","email":"user2@example.com","firstName":"Chris","lastName":"Hayward","role":"manager","__v":0}]},
    { etc ... }
  ]}
```
____
GET https://els-api.herokuapp.com/projects/:id
  * Returns a specific project and all the users working on the projects.
  * Example:
```
  {
    {"_id":"5a672d8bf5407a2cbcb658e7","projectNum":"0001","projectLocation":"Brisbane","projectName":"Clear Debris","projectStatus":"Active","__v":0,"projectUsers":[{"_id":"5a672b4bf5407a2cbcb658e1","email":"user@example.com","firstName":"Travis","lastName":"Anderson","role":"manager","__v":0},{"_id":"5a672c77f5407a2cbcb658e3","email":"user2@example.com","firstName":"Chris","lastName":"Hayward","role":"manager","__v":0}]}
  }
```
POST https://els-api.herokuapp.com/projects
  * Creates a new project and returns the newly created project.
  * Example:
```
  {
    "projectNum": "0006",
  	"projectLocation": "Melbourne",
  	"projectName": "Move Trucks",
  	"projectStatus": "Active",
  	"projectUsers": ["5a672b4bf5407a2cbcb658e1", "5a672c77f5407a2cbcb658e3", "5a672c8af5407a2cbcb658e4", "5a672cf9f5407a2cbcb658e5"]
  }
```
PUT https://els-api.herokuapp.com/projects/:id
  * Updates a project by ID.
  * Example:
```
  {
    "projectNum": "0006",
  	"projectLocation": "Melbourne",
  	"projectName": "Move Trucks",
  	"projectStatus": "Active",
  	"projectUsers": ["5a672b4bf5407a2cbcb658e1", "5a672c77f5407a2cbcb658e3", "5a672c8af5407a2cbcb658e4", "5a672cf9f5407a2cbcb658e5"]
  }
```
DELETE https://els-api.herokuapp.com/projects/:id
  * Deletes a project by ID.
  * Example:
```
  Returns text saying 'Deleted'
```
GET https://els-api.herokuapp.com/users/:id
  * Finds a user by ID.
  * Example:
```
  {
    "_id":"5a672b24f5407a2cbcb658e0",
    "email":"admin@example.com",
    "firstName":"Lorenzo",
    "lastName":"Lim",
    "role":"admin",
    "__v":0
  }
```
GET https://els-api.herokuapp.com/users
  * Returns all the users in an array.
  * Example:
```
  {[
    {
      "_id":"5a672b24f5407a2cbcb658e0",
      "email":"admin@example.com",
      "firstName":"Lorenzo",
      "lastName":"Lim",
      "role":"admin",
      "__v":0
    },
    { etc..}
  ]}
```
PUT https://els-api.herokuapp.com/users/:id
  * Updates a user by ID.
  * Example:
```
  {
    "_id":"5a672b24f5407a2cbcb658e0",
    "email":"admin@example.com",
    "firstName":"Lorenzo",
    "lastName":"Lim",
    "role":"admin",
  }
```
DELETE https://els-api.herokuapp.com/users/:id
  * Deletes a user by ID.
  * Example:
```
  Returns text saying 'Deleted'
```
