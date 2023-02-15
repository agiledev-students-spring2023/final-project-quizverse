# App Map & Wireframes

Create an **app map** and a complete set of **wireframe diagrams** for the [Minimum Viable Product](https://en.wikipedia.org/wiki/Minimum_viable_product) (MVP) of your application.

## Software

All team members must use the same software. **You are not allowed to use platform-specific or proprietary software**, such as Sketch or Figma, unless all members can run the software on their own computers without a paid license.

Use any software of your choice:

- [draw.io](https://draw.io) is recommended for all teams on any platform. It is always free and works wonderfully on the web or as a desktop app.
- The free trial of [Figma](https://www.figma.com/) is a fantastic cross-platform web app or desktop app for teams that want more commercial-quality tools.
- Do not use any Adobe products for this exercise.

Both Draw.io and Figma have extensions for Visual Studio Code that, while not a replacement for either app, may be useful for some tasks:

- [Draw.io VSCode Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
- [Figma x VS Code](https://marketplace.visualstudio.com/items?itemName=idered.figma)

## Wireframe requirements

### Mobile-first design

The wireframe diagrams must show the mobile-friendly layout of your application.

You can optionally also do a layout that is appropriate for a tablet or desktop device if you desire once the mobile wireframes are complete.

### No annotations

Do not include any annotations or notes in the diagrams themselves - you will have an opportunity to write any important notes when you write descriptions of each of these diagrams in the `UX-DESIGN.md` document.

### Number of diagrams

Create one wireframe diagram for each type of "screen", "page", or "view" that a user may encounter.

- one wireframe for each type of 'page' the user may encounter
- one wireframe for any dynamic elements that are not visible when a given 'page' first loads, but appear dynamically when the user clicks, hovers over something, or performs some other action.

Every aspect of the app must be diagrammed... nothing should be left to the imagination.

#### Example scenario

You are designing a simple banking app. The user sees a Dashboard screen with a summary of their account balances. They can click on any account to see an Account screen showing recent activity on just that account. On the Account screen, there is a button to make a transfer - clicking that button pops up an overlay on top of the Account screen with a Transfer Details form. Filling out the form and clicking submit shows a Transfer Success confirmation screen if the transfer was successful, or a Transfer Failure screen if the transfer failed for some reason.

In this scenario, you would design wireframe diagrams for each of the Dashboard, Account, Account with Transfer Form overlayed on top, Account with Transfer Success overlayed on top, and Acount with Transfer Failure overlayed on top.

### Diagram widths

All wireframe diagrams must have exactly the same width... heights can vary as necessary.

### Consistency

Interface components that are intended to appear in the same position on multiple screens must be at exactly the same position in those diagrams.

Keep these diagrams looking consistent and sharp, not sloppy and inconsistent.

#### Example scenario

Your app has a logo or "hamburger menu" at the top of each screen. Those elements must appear at the top of each wireframe diagram in exactly the same position.

### Placeholder content

Include dummy text that gives a sense of the purpose of each bit of text, but is not the actual text you intend to write for the app.

Do not use any photographs, images, icons, or other graphic visual elements. Instead, use gray boxes where images would go.

##### Example scenario

You are diagramming a user profile screen, which shows the user's photo and full name. Use a gray box with the words, "user photo" in the middle and an imaginary user's name... make it easy to understand that a user's name goes in that spot. Don't just write the text "User's Name" or some such thing, although that is normal and a fine practice in some contexts... just not here.

### Keep it focused

Address what you know as the common considerations for wireframe diagrams.

## App map requirements

### Focus on hierarchy

Show the parent/child relationships of the different screens. Think about your content in terms of sections.

### Limit your ambitions

Do not attempt to show every possible link among every screen in an app map. Do indicate the key parent/child relationships.

### Keep it focused

Address the common considerations you know about app maps.

## Exporting files

### Save as PNG images

Save all diagrams as individual PNG files.

### Include only the diagram content in the image file

Make sure the image files are sized exactly to match the diagram, with no extra space around the diagram. This will be important once we import them into a prototype.

### Example scenario

In draw.io, this can be achieved by first selecting the parts of the diagram you wish to include in the exported file, and then selecting the option in the export screen to export only the selected items.

## Submitting

### File organization

Add both the source files and the exported "flat" PNG files of the wireframe and app map diagrams to your team's Git repository in the directory named `ux-design`.

### UX-DESIGN.md

Overwrite the contents of the `UX-DESIGN.md` document in your team's project repository with a new version that shows the app map and each of the wireframe diagrams.

- The diagrams must be displayed in a logical order and in a visual size that is easy to view when posted on GitHub.com.
- Make this document easy-to-read, with clear headings and sub-headings, and good formatting of text.
- For the wireframe diagrams, include the title of each diagram, as well as a simple explanation of the purpose of the screen it represents.
- Any functionality of the screen that is not obvious should be written into the document.

### Stage, commit, and push

Use git to stage, commit, and push your work to GitHub.com
