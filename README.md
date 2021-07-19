# Booking

Foobar is a Python library for dealing with word pluralization.

## Installation

```bash
npm install
```


```bash
npm start
```

## Usage
### USERS
#### User Registration
```http
POST /users/register/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**|
| `surname` | `string` | **Required**|
| `email` | `string` | **Required**|
| `phoneNum` | `string` | **Required**|
| `password` | `string` | **Required**|

##### Response 
```javascript
{
  "message" : string,
  "mysql" : object
}
```
The `message` attribute contains a message used to indicate  success .

The `mysql` attribute describes if the transaction was not successful with MySql error.

#### User Login
```http
POST /users/login/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**|
| `password` | `string` | **Required**|

##### Response 
```javascript
{
  "message" : string,
  "token" : auth-token
}
```
The `message` attribute contains a message used to indicate  success or fail .

The `token` attribute returns JWT token for authorization

#### Get Hotel List
```http
GET /users/getHotels/
```
##### Response 
```javascript
{
  "mysql" : string,
  "hotels" : array of objects
}
```
The `mysql` attribute contains a message used to indicate  database error .

The `hotels` attribute returns hotels list

#### Get Hotel List by Name
```http
GET /users/getHotelByName/
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**|
##### Response 
```javascript
{
  "mysql" : string,
  "hotels" : array of objects
}
```
The `mysql` attribute contains a message used to indicate  database error .

The `hotels` attribute returns hotels list

### Authorization Required Routes

#### Get User Data
```http
GET /users/getData/
```
##### Response 
```javascript
{
  "mysql" : string
}
```
The `mysql` attribute contains a message used to indicate  database error or query result.

#### Make Hotel Reservation
```http
POST /users/makeRes/
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `hotelId` | `number` | **Required**|
| `userId` | `number` | **Required**|
| `guestCount` | `number` | **Required**|
| `checkIn` | `Date `| **Required** (yyyy-mm-dd)|
| `checkOut` | `Date `| **Required** (yyyy-mm-dd)|

##### Response 
```javascript
{
  "mysql" : string
}
```
The `mysql` attribute contains a message used to indicate  database error or success


