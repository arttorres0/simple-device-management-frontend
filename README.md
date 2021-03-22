# Device Management Frontend

This is an Angular project, with the purpose to consume the [Device Management Backend project](https://github.com/arttorres0/simple-device-management-backend) API.
It is currently deployed in Heroku, check this [URL](http://device-management-frontend.herokuapp.com/) if you want to see the live version of this project.

## Requirements

This project was created using the following dependencies:
```
node -v
v12.14.1
npm -v
6.13.6
ng -v
Angular CLI: 8.3.22
```

## Setup

Run `npm install` to install project dependencies. Also, don't forget to change environment variables as you need (dev and prod).

## Running as dev

```
ng serve
```

## Deployment

In order to deploy in Heroku, a server using Express was installed in this project. To simulate the deployment, run the commands:

```
npm run build-app (for a dev deployment) or npm run postinstall (for a prod deployment)
npm run start
```
