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
#### User Registiration
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
  "mysql" : bool
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
  "hotels" : auth-token
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
  "hotels" : auth-token
}
```
The `mysql` attribute contains a message used to indicate  database error .

The `hotels` attribute returns hotels list

### Authorization Required Routes