API V1 Documentation
====================

Table of Contents
-----------------

*   [Event](#event)
    *   [Create](#eventcreate)
    *   [List](#eventlist)
    *   [Remove](#eventremove)

*   [Flight](#flight)
    *   [Create](#flightcreate)
    *   [Remove](#flightremove)
    *   [List](#flightlist)
    *   [Get](#flightget)
    *   [Reserve](#flight)

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

| Property                 | Type   | Required | Description                   |
| ------------------------ | ------ | -------- | ----------------------------- |
| secret                   | String | Required | Secret key                    |
| event.id                 | String | Required | Event ID                      |
| flight.name              | String | Required | Flight name                   |
| flight.type              | String | Required | Flight aircraft               |
| flight.airport.departure | String | Required | Flight airport departure ICAO |
| flight.airport.arrival   | String | Required | Flight airport arrival ICAO   |
| flight.time.departure    | String | Required | Flight departure time (UTC)   |

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
| response.data.flight.type              | String | Flight aircraft               |
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
| flight.id      | String | Required | Flight name                   |
| reserver.token | String | Required | Reserver's IVAO login token   |

**Response**

Returns a 200 HTTP status code and a JSON object.
