Lift Data Processor API

This is a Node.js API built with TypeScript to process lift data. It fetches data from a GET endpoint, filters it, transforms it into a specific structure, and sends it to a POST endpoint. The application uses ts-node and nodemon for development.

Features

Fetch data from an external API using a GET request.

Filter data based on specific criteria.

Map data to a predefined structure.

Send transformed data to another API using a POST request.

Supports hot-reloading during development with nodemon.

Prerequisites

Make sure you have the following installed on your system:

Node.js (v16 or later recommended)

npm (comes with Node.js)

Setup

Clone the repository:

git clone <repository-url>
cd lift-data-processor

Install dependencies:

npm install

Configure TypeScript and nodemon (already set up in the project).

Usage

Development

To start the server in development mode with hot-reloading:

npm run dev

The server will start on http://localhost:3000. Any changes to the src files will automatically restart the server.

Production

To compile the TypeScript code and run the application:

Compile TypeScript to JavaScript:

npx tsc

Start the server:

npm start

API Endpoints

Process Lift Data

GET /process-lift-data

Fetches data from the GET API, filters it, transforms it, and sends it to the POST API.

Returns a JSON response indicating the success of the operation.

Example Response
