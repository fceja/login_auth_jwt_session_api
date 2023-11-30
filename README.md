## Description
A NodeJS / ExpressJS API that provides endpoints for: creating, retrieving, and logging-in users. </br>
Implemented with JWT authentication

**Note: Requires postgres database instance, table initialization not included in repo yet
 
## Installation
![](https://img.shields.io/badge/Unix-informational?style=flat&logo=unix&logoColor=white&color=eaeaea)
![](https://img.shields.io/badge/OS-Linux-informational?style=flat&logo=linux&logoColor=white&color=eaeaea)
![](https://shields.io/badge/OS-MacOS-informational?style=flat&logo=Apple&logoColor=white&color=eaeaea)
1. Clone repo
2. Install Node
   - ```https://nodejs.org/en/download```
3. At project root, run:
   - ```npm install```
   - This will install all project package dependencies
4. At project root, create ```.env``` file with following environment variables:
   - ```
     AUTH_JWT_SECRET_KEY="" // random secure string
     AUTH_JWT_TOKEN_EXPIRY="10" // seconds
     DB_HOST=""
     DB_NAME=""
     DB_USER=""
     DB_PASSWORD=""
     DB_PORT=""
     SERVER_PORT="3000"
     SESSION_COOKIE_SECRET_KEY="" // random secure string
     ```
   - Replace empty strings with values.

6. At project root, run:
   - ```npm run dev```
   - Server should now be running on port: ```3000```

## Available Endpoints
 - ```POST``` - ```http://localhost:3000/user/create```
   - creates user in db
   - JSON payload: ```{ "email": "", "password": ""}```
 - ```POST``` - ```http://localhost:3000/auth/login```
   - if login successful, assigns jwt to session
   - JSON payload: ```{ "email": "", "password": ""}```
  
  </br>
  
  - ```GET``` - ```http://localhost:3000/user/getUser```
    - retrieves logged in user info, jwt authentication required
  - ```GET``` - ```http://localhost:3000/user/getUsers```
    - if admin, retrieves all user info in db, jwt authentication required
  
  </br>
  
  - ```GET``` - ```http://localhost:3000/test```
    - test endpoint, jwt authentication required
  - ```GET``` - ```http://localhost:3000/```
    - public endpoint, jwt authentication not required

## Technologies & Tools
<p>
  <a
    href="https://www.typescriptlang.org/"
    target="_blank"
    rel="noreferrer"
    style="text-decoration:none"
  >
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
      alt="typescript"
      width="40"
      height="40"
    />
  </a>
  <a href="https://nodejs.org/en/about" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg"
      alt="nodejs"
      width="40"
      height="40"
    />
  </a>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer">
    <img
      src="https://expressjs.com/images/favicon.png"
      alt="expressjs"
      width="40"
      height="40"
    />
  </a>
  <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"
      width="40"
      height="40"
      alt="posgres"
    />
  </a>
  <a href="https://jwt.io/" target="_blank" rel="noreferrer">
    <img
      src="https://jwt.io/img/favicon/apple-icon-72x72.png"
      width="40"
      height="40"
      alt="jsonwebtoken"
    />
  </a>
  <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      alt="aws"
      width="40"
      height="40"
    />
  </a>
</p>
