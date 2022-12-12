# CookUnity Backend Api

## Intro

A RESTful API which exposes two resources:
- /traces
- /statistics

## Requirements

### /traces
This endpoint will receive, via HTTP POST, an IP address in the format 100.100.100.100, and return the following information associated with that IP address:
- Country which issued the IP and its ISO code
- Coordinates for its location (latitude and longitude)
- An array of currencies for that country with:
- ISO code (USD, CAD, ARS)
- Symbol ($, £)
- Conversion rate from currency to USD
- Distance between United States and country of origin (in Kilometers)

### /statistics
A resource which, on an HTTP GET, returns:
- Longest distance from requested traces
- Most traced country

## Assumtions

- For each 3rd party API error, we are returning HTTP CODE 500 - Internal Server Error
- USA latitude & longitud are from Washigton DC (US Capital)
- We are using currency name as a symbol instead of currency symbol. ie: Argentinian Peso, not $ symbol.
- We are only caching GET Symbols endpoint (based on assignment recommendations)
- We created Docker config for future deploying.
- We are using config env variables. So, you need to configure them based on *.env.sample* file.
- We calculate distance (two point using lat,long) in Kms to USA using a well-known formula searched on Internet.
- Both resources body repsonses structure are not prettty equal to requested assigment due to GraphQL schema defined.

## Installation

```bash
$ npm install
```

## Running API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Playground GraphQL
http://localhost:3000/graphql

## Author

  Ignacio Capodanno
