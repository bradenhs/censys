## Censys

Simple search interface for the [Censys](https://censys.io) IPv4 database.

Go to [censys.bradenhs.com](https://censys.bradenhs.com) to see a live version of the project.

## Development

To get the project running on your local machine run these commands (you'll need git and node on your system).

```
git clone git@github.com/bradenhs/censys
cd censys
npm install
npm start
```

After executing these the project should be running in development mode. A bundler should be active and its results being served at http://localhost:1234. The typechecker and unit test runner will be running in separate processes.

While the `npm start` command is running you can run the automated ui tests by opening [Cypress](https://cypress.io) with this command:

```
npm run cypress
```
