API V1 Documentation
====================

Table of Contents
-----------------

*   [Event](#event)
    *   [Create](#eventcreate)
    *   [List](#eventlist)
    *   [Remove](#eventremove)
    *   [Toggle](#eventtoggle)

*   [Flight](#flight)
    *   [Create](#flightcreate)
    *   [Remove](#flightremove)
    *   [List](#flightlist)
    *   [Get](#flightget)
    *   [Reserve](#flightreserve)
    *   [Reserved](#flightreserved)
    *   [Cancel](#flightcancel)

*   [Airline](#airline)
    *   [Create](#airlinecreate)
    *   [Get](#airlineget)

*  [Route](#route)
    *   [Create](#routecreate)
    *   [Get](#routeget)

*   [Token](#token)
    *   [Fetch](#tokenfetch)

Event
-----

### Event/Create

Create event

**HTTP request**

`POST /api/v1/event/create`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property    | Type   | Required | Description       |
| ----------- | ------ | -------- | ----------------- |
| secret      | String | Required | Secret key        |
| event.name  | String | Required | Event name        |
| event.desc  | String | Required | Event description |
| event.cover | String | Required | Cover URL         |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property               | Type   | Description |
| ---------------------- | ------ | ----------- |
| response.data.event.id | String | Event ID    |

### Event/List

List all avaliable events

**HTTP Request**

`GET /api/v1/event/list`

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property             | Type   | Description     |
| -------------------- | ------ | --------------- |
| response.data.events | Array  | Array of events |

### Event/Remove

Remove event

**HTTP Request**

`DELETE /api/v1/event/remove`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| secret   | String | Required | Secret key  |
| event.id | String | Required | Event ID    |

**Response**

Returns a 200 HTTP status code and a JSON object.

### Event/Toggle

Toggle event to be available

**HTTP Request**

`POST /api/v1/event/toggle`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| secret   | String | Required | Secret key  |
| event.id | String | Required | Event ID    |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property                   | Type   | Description     |
| -------------------------- | ------ | --------------- |
| response.data.event.isOpen | Array  | New event state |

Flight
------

### Flight/Create

Create flight slot

**HTTP request**

`POST /api/v1/flight/create`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property                 | Type   | Required | Description                       |
| ------------------------ | ------ | -------- | --------------------------------- |
| secret                   | String | Required | Secret key                        |
| event.id                 | String | Required | Event ID                          |
| flight.name              | String | Required | Flight name                       |
| flight.type              | String | Required | Flight type (`dep`, `arr`, `pri`) |
| flight.aircraft          | String | Required | Flight aircraft                   |
| flight.distance          | Number | Required | Flight distance                   |
| flight.airline.code      | String |          | Flight airline ICAO               |
| flight.airport.departure | String | Required | Flight airport departure ICAO     |
| flight.airport.arrival   | String | Required | Flight airport arrival ICAO       |
| flight.time.departure    | String | Required | Flight departure time (UTC)       |
| flight.time.arrival      | String | Required | Flight estimated arrival time     |
| flight.time.total        | String | Required | Flight estimated total time       |


**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property                | Type   | Description |
| ----------------------- | ------ | ----------- |
| response.data.flight.id | String | Flight ID   |

### Flight/Remove

Remove flight slot

**HTTP request**

`DELETE /api/v1/flight/remove`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property  | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| secret    | String | Required | Secret key  |
| event.id  | String | Required | Event ID    |
| flight.id | String | Required | Flight ID   |

**Response**

Returns a 200 HTTP status code and a JSON object.

### Flight/List

List flight IDs

**HTTP request**

`GET /api/v1/flight/list/:evid/:page`

**Path parameters**

| Parameter | Description     |
| --------- | --------------- |
| evid      | Event ID        |
| page      | Pagination page |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property              | Type  | Description        |
| --------------------- | ----- | ------------------ |
| response.data.flights | Array | Array of Flight ID |

### Flight/Get

Get flight details

**HTTP request**

`GET /api/v1/flight/get/:evid/:flid`

**Path parameters**

| Parameter | Description |
| --------- | ----------- |
| evid      | Event ID    |
| flid      | Flight ID   |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property                               | Type   | Description                   |
| -------------------------------------- | ------ | ----------------------------- |
| response.data.flight.flight            | String | Flight name                   |
| response.data.flight.aircraft          | String | Flight aircraft               |
| response.data.flight.airport.departure | String | Flight airport departure ICAO |
| response.data.flight.airport.arrival   | String | Flight airport arrival ICAO   |
| response.data.flight.time.departure    | String | Flight departure time (UTC)   |

### Flight/Reserve

Reserve flight

**HTTP request**

`POST /api/v1/flight/reserve`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property       | Type   | Required | Description                   |
| -------------- | ------ | -------- | ----------------------------- |
| event.id       | String | Required | Event ID                      |
| flight.id      | String | Required | Flight ID                     |
| reserver.token | String | Required | Reserver's IVAO login token   |

**Response**

Returns a 200 HTTP status code and a JSON object.

### Flight/Reserved

List of flights that reserved by user (Limit at 50 records)

**HTTP request**

`GET /api/v1/flight/reserved/:vid`

**Path parameters**

| Parameter | Description |
| --------- | ----------- |
| vid       | User VID    |

**Response**

Returns a 200 HTTP status code and a JSON object.

### Flight/Cancel

Cancel reserved flight

**HTTP request**

`POST /api/v1/flight/cancel`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property       | Type   | Required | Description                   |
| -------------- | ------ | -------- | ----------------------------- |
| token          | String | Required | User IVAOTOKEN                |
| event.id       | String | Required | Event ID                      |
| flight.id      | String | Required | Flight ID                     |

Airline
-------

### Airline/Create

Create airline record

**HTTP request**

`POST /api/v1/airline/create`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property     | Type   | Required | Description  |
| ------------ | ------ | -------- | ------------ |
| secret       | String | Required | Secret key   |
| airline.code | String | Required | Airline ICAO |
| airline.name | String | Required | Airline name |

**Response**

Returns a 200 HTTP status code and a JSON object.

### Airline/Get

Get airline record

**HTTP request**

`GET /api/v1/airline/get/:code`

**Path parameters**

| Parameter | Description  |
| --------- | ------------ |
| code      | Airline ICAO |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property                              | Type   | Description  |
| ------------------------------------- | ------ | ------------ |
| response.data.airline.code            | String | Airline ICAO |
| response.data.airline.name            | String | Airline name |

Route
-----

### Route/Create

Create route record

**HTTP request**

`POST /api/v1/route/create`

**Request headers**

| Request header | Description      |
| -------------- | ---------------- |
| Content-Type   | application/json |

**Request body**

| Property          | Type   | Required | Description       |
| ----------------- | ------ | -------- | ----------------- |
| secret            | String | Required | Secret key        |
| airport.departure | String | Required | Departure airport |
| airport.arrival   | String | Required | Arrival airport   |
| route             | String | Required | Flight route      |

**Response**

Returns a 200 HTTP status code and a JSON object.

### Route/Get

Get route record

**HTTP request**

`GET /api/v1/airline/route/:dep/:arr`

**Path parameters**

| Parameter | Description       |
| --------- | ----------------- |
| dep       | Departure airport |
| arr       | Arrival airport   |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property                              | Type   | Description       |
| ------------------------------------- | ------ | ----------------- |
| response.data.route.airport.departure | String | Departure airport |
| response.data.route.airport.arrival   | String | Arrival airport   |
| response.data.route.route             | String | Flight route      |

Token
-----

### Token/Fetch

Fetch token data from IVAO Login API

**HTTP request**

`GET /api/v1/token/fetch/:token`

**Path parameters**

| Parameter | Description |
| --------- | ----------- |
| token     | IVAOTOKEN   |
