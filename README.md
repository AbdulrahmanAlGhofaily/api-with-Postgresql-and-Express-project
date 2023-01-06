# api with Postgresql and Express project

### Part of Udacity: JavaScript Fullstack course

This is a project which aims to create an api using both Postgresql and Express together with unit testing jasmine. We will start by setting up the environment. The package manager used here is [npm](https://www.npmjs.com/), all commands will be through it, so make sure to have it installed globally on your machine.

## Setting up the app

Start by install the required packages by running `npm install` on the root of the project.<br>
Install and setup [Postgresql](https://www.postgresql.org/) on your machine<br>
Create a new user for your postgresql databases, the user name should be `project_admin` and the password `projectPassword123` (Note: These two two should be secret, but for the project sake I shared it).<br>
Create two databases, the first one for the development and it called `store_front`, the second one is for testing and it called `store_front_test`.
To add the schemas to the development database, run `npm run db-up`. And to drop it run `npm run db-down`

## Running the app

To start the application run `npm run start` or `npm run watch` which will start the app and will start looking for any changes on the code.<br>
The ip address of the app and the port will pop in the terminal, to change these two head to the .env file and change it to you preference.

## Testing the app

To test the app run `npm run test`. Test result will be on the terminal.
