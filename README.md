# wad2-project
This is the code repository for the WAD2 project. It consists of both a backend Node.js API server as well as a Vue frontend.

Hot module reloading is available for the frontend.

### Development
##### Initial Setup
1. Install PostgreSQL on your system (Windows - installer, Mac - `brew install postgresql && brew services start postgresql && psql -c "CREATE ROLE postgres LOGIN"`)
2. Copy `.env.example` to `.env`. The default value is suitable for development.
3. Run `createdb wad2_project_dev` to create a database
4. Run `yarn db:migrate` to migrate the database

### Initialising the database with useful data
The initdata script contains data useful for the app. In this case, it will initialise the database with games that we support.

To do this, run `yarn db:initdata` in a terminal. Don't worry about running this too many times - the code here will ensure only 1 copy of data is made.

##### Running
1. Run `yarn dev`

### Production
1. Build `yarn build`
2. Run `yarn start`
