## Description
A NodeJS / ExpressJS API that provides endpoints for: creating, retrieving, and logging-in users. </br>

Authentication implemented via session cookie.

<br/>
**Note: Requires postgres database instance, table initialization not included in repo (yet)

<br />

## Installation
![](https://img.shields.io/badge/OS-Linux%20%7C%20MacOS%20%7C%20Windows-eaeaea)

1. Install Node
   - ```
     https://nodejs.org/en/download
     ```
2. Clone repo
3. Install dependencies, at project root run:
   - ```
     npm install
     ```
4. At project root, create `.env` file with following environment variables:
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

5. Start development server, run:
   - ```
     npm run dev
     ```
   - Server should now be running on http://localhost:3000/

<br />

##  Endpoint Usage
- Create User
  - ```
    curl -X POST \
     http://localhost:3000/user/create \
     -H 'Content-Type: application/json' \
     -d '{ "email": "", "password": "" }'
    ```
- User Login (assigns session cookie)
   - ```
     COOKIE=$(curl -X POST \
      http://localhost:3000/auth/login \
      -H 'Content-Type: application/json' \
      -d '{ "email": "", "password": "" }' \
      -i | grep -Fi 'Set-Cookie' | awk '{print $2}')
     ```
- Get Logged-in User Info
  - ```
    curl -X GET \
      http://localhost:3000/user/getUser \
      -H "Cookie: $COOKIE"
    ```
- Get All Users
  - ```
    curl -X GET \
     http://localhost:3000/user/getUsers \
     -H "Cookie: $COOKIE"
    ```
- Test Authorized Endpoint
  - ```
    curl -X GET \
     http://localhost:3000/test \
     -H "Cookie: $COOKIE"
    ```
- Test Public Endpoint   
   - ```
      curl -X GET \
       http://localhost:3000/
     ```

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
      width="70"
      height="70"
    /></a>
  <a href="https://nodejs.org/en/about" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg"
      alt="nodejs"
      width="70"
      height="70"
    /></a>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer">
    <img
      src="https://expressjs.com/images/favicon.png"
      alt="expressjs"
      width="70"
      height="70"
    /></a>
  <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"
      width="70"
      height="70"
      alt="posgres"
    /></a>
  <a href="https://jwt.io/" target="_blank" rel="noreferrer">
    <img
      src="https://jwt.io/img/favicon/apple-icon-72x72.png"
      width="70"
      height="70"
      alt="jsonwebtoken"
    /></a>
  <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      alt="aws"
      width="70"
      height="70"
    /></a>
</p>
