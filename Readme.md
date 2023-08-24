# My first GraphQl App using Apollo Server Package

## Please find below all the things which we should know for run this project.

**I am running this project on Node version:**
`v16.13.1`

**NPM version:**
`8.1.2`

**We can run the project in development mode using the following command:**

`npm run dev`


**I have install typescript@next for tsc globally or at project level using following command:**

`npm i -g typescript@next`

**After this we can run the project using production mode:**

`npm start`

**I have also attached the sample db folder for start the app first time. I have also created a db seeder. We just need to create a env file and add the DB_URL there. Please find the seeder command below:**

`npm run db:seed`


**I have attached a sample env file (.env.example). Here from you can create your custom original env file.**

**For authentication, please add the Authorization in the header. I have added sample key in the env file. If you want then copy it to the original env file. Also if you want to generate the new token then I have also added the generateToken util method in the utils file. You can generate the token manually and send it in the header. Please find the sample token below:**

`Authorization: eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJJc3N1ZWQgQXQiOiIyMDIzLTA4LTI0VDEyOjA5OjAwLjM0N1oiLCJFeHBpcmF0aW9uIjoiMjAyMy0wOC0yNFQxMjowOTowMC4zNDdaIiwiVXNlcm5hbWUiOiJKYXZhSW5Vc2UiLCJSb2xlIjoiQWRtaW4ifQ.0EMtRIuPR8kRs7ZBuMfTSV6Zl4yjuhFl_-6IhLI6Iq4`