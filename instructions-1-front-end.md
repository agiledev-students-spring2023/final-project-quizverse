# Front-End Development

Each team must have completed and [demo'd](https://knowledge.kitchen/content/courses/agile-development-and-devops/slides/scrum/#91) the working front-end of their group project by the end of the corresponding Sprint.

## Technical requirements

The following requirements outline what must be, must not be, and may be done during the front-end development sprint.

### Musts...

- All front-end code must be generated using React.js.
- All component definitions must be written as **functions**, not as classes.
- All component content must be written using **JSX**, not only plain Javascript.
- All styles must be custom-coded in external CSS files - one for each component.
- Basic layout of each screen must be accomplished using the CSS flexbox system.
- Front-end screens must be custom-designed to look clean, contemporary, and sharp, not like a wireframe.
- Any data that will ultimately come from a back-end server or API in the completed application must be mocked for now using the mock-API tool, [mockaroo](https://mockaroo.com/mock_apis), or another similar tool if Mockaroo is not sufficient for a justifiable reason.
- Any user-generated images that will be displayed by your app must be temporarily mocked with a random image API service, such as [Picsum](https://picsum.photos/).
- Front-ends must include all screens in the completed application and should closely match the clickable prototypes created previously, unless the team believes an alternate user experience is beneficial.
- Ay mismatch between the clickable prototypes and the front-end app code delivered must be explained during the stakeholder demo.
- If your app will eventually have user registration and login functionality, all front-end screens to support this must be created, although they should be non-functional for now.
- Instructions on how to set up and run the project must be included in the README.md file in version control. It must be possible for anybody to follow the instructions on the README.md to build and run the entire project on their local machines.

### Must nots...

- State managers, such as [Redux](https://react-redux.js.org/) or [Mobx](https://mobx.js.org/README.html#introduction) must not be used.
- Account registration or log in functionality must not be included - that can be added later during back-end development. But do include the non-functional screens for these.
- Any data that will be coming from a server or API must not be hard-coded within your front-end code... mock the API for now and fetch the data from the server within the front-end code.
- Any user-generated images must not be hard-coded in the front-end code, but must be mocked with a random image service for now.

### May...

- You may use front-end design frameworks, such as [Bootstrap for React](https://react-bootstrap.github.io/) or [Material UI](https://material-ui.com/).
- You may use a 3rd-party module, such as [react-burger-menu](https://github.com/negomi/react-burger-menu) for a hamburger menu or other [primary navigation](https://knowledge.kitchen/mediawiki/Navigation_components#Global_Navigation).

## Grading

Individuals will be graded, in part, according to...

- individual code contributions, as visible through git logs - make sure you commit your own work!
- proper adherence to the [Feature Branch git workflow](https://knowledge.kitchen/content/courses/agile-development-and-devops/slides/feature-branch-workflow/)
- the [proper setup and maintenance of a GitHub repository](./instructions-0c-project-setup.md)
- the quality of the work
