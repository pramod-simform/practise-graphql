# My First GraphQL App using Apollo Server Package

## Prerequisites

Before running this project, please ensure that you have the following dependencies installed:

- Node.js (v16.13.1)
- npm (v8.1.2)
- TypeScript (Install globally or at the project level using `npm i -g typescript@next`)

## Getting Started

To run the project in development mode, use the following command:

```bash
npm run dev
```

For production mode, use:

```bash
npm start
```

## Database Setup

I have included a sample 'db' folder to help you get started. Additionally, there's a database seeder available. Create an .env file and add your DB_URL there. To seed the database, run the following command:

```bash
npm run db:seed
```

## Environment Variables

Please create a custom .env file based on the provided .env.example. This file will store environment-specific configurations.

## Authentication

For authentication, include the Authorization header in your requests. A sample key is provided in the .env file. If you wish to generate a new token manually, you can use the generateToken utility method found in the utils file. Here's an example of a token:

`Authorization: eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJJc3N1ZWQgQXQiOiIyMDIzLTA8LTI0VDEyOjA5OjAwLjM0N1oiLCJFeHBpcmF0aW9uIjoiMjAyMy0wOC0yNFQxMjowOTowMC4zNDdaIiwiVXNlcm5hbWUiOiJKYXZhSW5Vc2UiLCJSb2xlIjoiQWRtaW4ifQ.0EMtRIuPR8kRs7ZBuMfTSV6Zl4yjuhFl_-6IhLI6Iq4`

## Data Caching

We've implemented data caching using the Memcached caching system. Authentication has not been integrated at this stage. You can utilize it directly once installed. To install, please follow the steps in the link below:

```bash
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-memcached-on-ubuntu-20-04
```
