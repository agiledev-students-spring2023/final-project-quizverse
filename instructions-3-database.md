# Database Integration

Each team must have completed and [demo'd](https://knowledge.kitchen/Scrum_development_framework#Demo_for_Stakeholders) the integration of a database into their software application projects by the end of the corresponding Sprint.

## Technical requirements

### Musts...

- A MongoDB database hosted on a [free MongoDB Atlas](https://www.mongodb.com/cloud/atlas) instance must be used to store all dynamic data of the app.
- The database must be integrated into the Express.js back-end code using [mongoose](https://mongoosejs.com/).
- Any credentials used to log into a database or other remote service must be stored in a hidden file called `.env` that is excluded from version control by adding it to your .gitignore file. Load these credentials from environmental variables into your project using the [dotenv](https://github.com/motdotla/dotenv) module.
- When receiving data from the front-end to store into the database, always do data validation before sending that data to the database. Use the [express-validator](https://express-validator.github.io/docs/) module, or something similar to perform data validation prior to sending any data originating from the request to the database.

### Must nots...

- Do not host a MongoDB instance locally on your own machine, unless you plan to be working offline for extended periods of time.
- You are forbidden from storing any credentials used by your app to log into remote services, such as MongoDB or 3rd-party APIs in version control.
- You are forbidden from using **HTTP Basic Authentication** or session-based authentication for any account registration or log in functionality your app requires.

### May...

- Any account registration or log in functionality required by an app must use **JSON Web Tokens** (JWT) to validate authorization.

## Grading

Individuals will be graded, in part, according to...

- individual code contributions, as visible through [git logs](https://github.com/bloombar/git-developer-contribution-analysis) - make sure you commit your own work!
- proper adherence to the [Feature Branch git workflow](https://knowledge.kitchen/Feature_branch_version_control_workflow)
- the quality of the work
- the proper setup and use of a [Sprint Task Board](https://knowledge.kitchen/GitHub_for_team_collaboration#Project_boards) to indicate the Sprint Backlog and accurate status of all of their work at all times during the Sprint
