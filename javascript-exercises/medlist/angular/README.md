# Angular Medlist Kata

## The Application
This application displays of a patient's medications. The medications are fetched via a REST endpoint on a local docker image.

## The Challenge
1. Wire in a way to search for a medication and filter the data shown in the table. No need to submit an actual REST call to the server for this, just manipulate the existing list in the frontend.
2. Implement adding/deleting of a medication into the front end. No need to submit an actual REST call to the server for these, just manipulate the existing list in the frontend.

Be sure to test your code!

## Development server

Run `ng serve --port=4401` for a dev server. Navigate to `http://localhost:4401/`. The app will automatically reload if you change any of the source files. Ensure `mock-rest-backend` docker image is running on your machine on localhost:8000

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


