# Booking

............

## Installation

```bash
npm install
```


```bash
npm start
```

## Usage
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

#### Response 
```javascript
{
  "message" : string,
  "mysql" : bool
}
```
The `message` attribute contains a message commonly used to indicate  success .

The `mysql` attribute describes if the transaction was not successful with MySql error.

### Authorization Required Routes