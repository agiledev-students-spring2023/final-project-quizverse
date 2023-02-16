# Deployment

Each team must deploy their completed software applications to a [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets/).

## Specific requirements

- Credentials for logging into databases, APIs, or other remote services, must never be shared in version control. They are usually stored in private settings files, such as `.env` or similar, which are not included in the version control repository. And so the continuous integration server will not have access to them when testing. Use Circle CI's or other similar server's method of setting [environmental variables](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project) for passing such credentials safely to the CI server.
- Each project must deploy their application front-and-back-ends to a single Digital Ocean Droplet - sign up for Digital Ocean using [this referral link](https://m.do.co/c/4d1066078eb0) to receive $100 of credit (full disclosure, I would receive $25 of credit for anyone who winds up spending $25 on Digital Ocean, but there is no need for you to spend anything since the $100 credit will easily get you through the course).
- Submit a link to your front-end code live on the web, and include that link on your README.md document.

## Extra credit opportunities

Include a note when submitting, if you have done any of the extra credit.

- Extra credit is given to teams that have deployed to a Docker container, although a non-containerized deployment to a Droplet is fine.
- Extra credit is given to teams that have a functioning Continuous Integration workflow, where **Circle CI** or similar hosted continuous integration server, runs a build and test cycle every time a branch is pushed to GitHub or a new pull request is issued.
- Extra credit is given to teams that have a Continuous Deployment setup, although a manual deployment is fine.

## Grading

Individuals will be graded, in part, according to...

- individual code contributions, as visible through [git logs](https://github.com/bloombar/git-developer-contribution-analysis) - make sure you commit your own work!
- proper adherence to the [Feature Branch git workflow](https://knowledge.kitchen/content/courses/agile-development-and-devops/slides/feature-branch-workflow/)
- the [proper setup and maintenance of a GitHub repository](./instructions-0c-project-setup.md)
- the quality of the work
