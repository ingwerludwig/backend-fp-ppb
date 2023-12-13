# Backend Mobile Programming Final Project Repository 
This repository is used to fulfill Mobile Programming Final Project.

## This application built with
* [Express JS](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* other libraries included in "package.json" file

## Collaborator of This Project
* Muhammad Afdal Abdallah 50252012163
* Ingwer Ludwig 5025201259


## Getting Started
* Install Node.js
* Install npm
* Install project dependencies:
    
    - Install all dependencies defined in package.json:
    ```bash
        npm install
    ```
    
* Setup environment variables

    This project uses [dotenv](https://www.npmjs.com/package/dotenv), please configure the proper environment variables before running this application.
    
    - Copy the `.env.example` file and rename it to `.env`
    - Edit all sample fields with the correct environment variables for the application server
    - For `PREDICT_API_URL`, Use Local or Deployed link of API in branch in this repository

* Database migration (using [Sequelize](http://docs.sequelizejs.com)):
    - Edit Database Configuration in `src/config/config.json`
    - run: 
        ```bash 
            npx sequelize-cli db:migrate 
        ```
    - undo: 
        ```bash
            npx sequelize-cli db:migrate:undo
        ```
    - help: 
        ```bash
            npx sequelize-cli help
        ```
* Database seed
    - Run seeder for Menu data and Admin data (You can change Admin data in `src/seeders` admin seed)
        ```bash
            npx sequelize-cli db:seed:all
        ```

* Cloud Bucket Configuration
    - Copy the `example.serviceaccountkey.json` file and rename it to `serviceaccountkey.json`
    - Copy the content of your service account key to `serviceaccountkey.json` with the access of Google Storage Object Admin for your bucket

* Start Your Application 
```bash
    npm start
```

## API Documentation
[Countlories API Documentation](https://myprivatepersonal.postman.co/workspace/PPB-FP-BACKEND~31694c8e-6ab1-4438-b8cb-7f1db18bf3f3/collection/26715144-3e7299cf-129c-4f22-b9a5-13a037150c56?action=share&creator=26715144&active-environment=26715144-a314cfaa-996d-493d-af8e-4323bd811da7)
or
You can export the postman collection from this repository
