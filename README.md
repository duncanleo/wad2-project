# wad2-project
This is the code repository for the WAD2 project. It consists of both a backend Node.js API server as well as a Vue frontend.

Hot module reloading is available for the frontend.

### Assignment Submission Setup
There are some initial steps:

1. Create a file called `.env` with the following values (secrets are hardcoded here for submission purposes):
  ```
  COOKIE_KEY=8D3113A5976EFC31BB9A8BEBEBA8B
  NODE_ENV=development
  CODMW_2019_API_KEY=736a21872dmshe18dd2217b906a2p16b330jsn4ede3b603687
  FORTNITE_API_KEY=736a21872dmshe18dd2217b906a2p16b330jsn4ede3b603687
  APEX_LEGENDS_API_KEY=1b416b63-b65c-4496-8fd1-5dafe4696b1f
  MAPBOX_ACCESS_TOKEN=pk.eyJ1Ijoid2FkMnByb2oiLCJhIjoiY2t2eXJhZDZyM3A0dDJvbW9tcWhtbW1wYiJ9.4OWYhvQDZ7OSskmbF87dYA
  ```

2. There are two options to set up this repository. Docker is recommended.

  ##### Docker
  1. Run `docker-compose up` and wait for the build to complete. Once it is complete, the server should be ready at port 5000.
  
  ##### Local Setup
  1. Install PostgreSQL on your system (Windows - installer, Mac - `brew install postgresql && brew services start postgresql && psql -c "CREATE ROLE postgres LOGIN"`)
  3. Run `yarn install` to install Node.js dependencies
  4. Run `createdb wad2_project_dev` to create a database
  5. Run `yarn db:migrate` to migrate the database

### Assignment Submission Additional Information
If you are using the production deployment (https://wad2-project.herokuapp.com), here are some accounts that can be used for testing:

| Username | Password | Remarks |
| -- | -- | -- |
| tnarbplays@gmail.com | Abcd1234! | Leader for team TacticalMission & DemoTeam |
| aspiringmember@gmail.com | Abcd1234! | Member of team DemoTeam |
| tournamentcreator@gmail.com | Abcd1234! | Organizer Account |

### Additional Notes for developers

### Initialising the database with useful data
The initdata script contains data useful for the app. In this case, it will initialise the database with games that we support.

To do this, run `yarn db:initdata` in a terminal. Don't worry about running this too many times - the code here will ensure only 1 copy of data is made.
