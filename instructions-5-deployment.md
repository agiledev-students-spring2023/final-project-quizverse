# Deployment

Each team must deploy their completed software applications to a [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets/).

## Specific requirements

- Each project must include a functioning Continuous Integration workflow, where **Travis CI** runs a build and test cycle every time a branch is pushed to GitHub or a new pull request is issued.
- Credentials for logging into databases, APIs, or other remote services, must never be shared in version control, and so Travis CI will not have access to them when testing. Use Travis' [encrypted environmental variables](https://docs.travis-ci.com/user/environment-variables/#defining-encrypted-variables-in-travisyml) technique for passing such credentials safely to Travis. See [this discussion](https://stackoverflow.com/questions/9338428/using-secret-api-keys-on-travis-ci) for examples.
- Each project must deploy their application front-and-back-ends to a single Digital Ocean Droplet - sign up for Digital Ocean using [this referral link](https://m.do.co/c/4d1066078eb0) to receive $100 of credit (full disclosure, I would receive $25 of credit for anyone who winds up spending $25 on Digital Ocean, but there is no need for you to spend anything since the $100 credit will easily get you through the course).
- Submit a link to your front-end code live on the web, and include that link on your README.md document.

## Extra credit opportunities

Include a note when submitting, if you have done any of the extra credit.

- Extra credit is given to teams that have deployed to a Docker container, although a non-containerized deployment to a Droplet is fine.
- Extra credit is given to teams that have a Continuous Deployment setup, although a manual deployment is fine.
