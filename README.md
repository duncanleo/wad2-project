# wad2-project
This is the code repository for the WAD2 project. It consists of both a backend Node.js API server as well as a Vue frontend.

Hot module reloading is available for the frontend.

### Development
##### Initial Setup
1. Install PostgreSQL on your system (Windows - installer, Mac - `brew install postgresql && brew services start postgresql && psql -c "CREATE ROLE postgres LOGIN"`)
2. Copy `.env.example` to `.env`. The default value is suitable for development.
3. Run `createdb places_dev` to create a database

##### Running
1. Run `yarn dev`

### Production
1. Build `yarn build`
2. Run `yarn start`
