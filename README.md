# api with Postgresql and Express project

### Part of Udacity: JavaScript Fullstack course

This is a project which aims to create an api using both Postgresql and Express together with unit testing jasmine. We will start by setting up the environment. The package manager used here is [npm](https://www.npmjs.com/), all commands will be through it, so make sure to have it installed globally on your machine.

## Setting up the app

Start by install the required packages by running `npm install` on the root of the project.<br>
Install and setup [Postgresql](https://www.postgresql.org/) on your machine<br>

## Setting up the Database

Create a new user and grant it all privileges to the databases by running these commands in Sql shell (psql): <br>
start with user creation: `CREATE USER project_admin WITH PASSWORD projectPassword123;`<br>
then development database: `CREATE DATABASE store_front;` <br>
then testing database: `CREATE DATABASE store_front_test;` <br>
followed by the next two commands for granting user privileges to the database: <br>
`GRANT ALL PRIVILEGES ON DATABASE store_front TO project_admin;` <br>
`GRANT ALL PRIVILEGES ON DATABASE store_front TO project_admin;` <br>

## Running the app

To start the application run `npm run start` or `npm run watch` which will start the app and will start looking for any changes on the code.<br>
The ip address of the app and the port (initially the used IP address 127.0.0.1 and the used port is 3000 and for the database port it is 5432) will pop in the terminal, to change these two head to the .env file and change it to you preference.

## Env variables

- Note: .env variables are not supposed to be shared.<br>

POSTGRES_HOST=127.0.0.1 <br>
PORT=3000 <br>
POSTGRES_PORT=5432 <br>
CURRENT_ENV=dev <br>
POSTGRES_DB=store_front <br>
POSTGRES_DB_TEST=store_front_test <br>
POSTGRES_USER=project_admin <br>
POSTGRES_PASSWORD=projectPassword123 <br>
BCRYPT_PASSWORD=1ts_a_5ecret_Shhh <br>
SALT_ROUNDS=10 <br>
TOKEN_SECRET=Alb8alh12ksmsq1zzA!! <br>

## Testing the app

To test the app run `npm run test`. Test result will be on the terminal.
