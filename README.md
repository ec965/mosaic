# User Land

A basic CRUD app with users.

# Server

## API Reference

### `/auth`

#### `POST` `/auth/login`

Client request:

```json
{
  "username": "USERNAME",
  "password": "PASSWORD"
}
```

Server response:

```json
{
  "token": "JWT_TOKEN"
}
```

#### `POST` `/auth/register`

Client request:

```json
{
  "username": "USERNAME",
  "password": "PASSWORD"
}
```

Server response:

```json
{
  "message": "Registration successful",
  "user": "USERNAME"
}
```

### `/app`

This is a secure route. A JWT must be included as the Bearer Token.

#### `GET` `/app`

Client does not need to send a JSON.

Server response:

```json
{
  "user": {
      "username": "username_test",
      "userId": 1
  },
  "data": [
      {
          "id": 2,
          "data": "this is a test again"
      },
      {
          "id": 4,
          "data": "1,2"
      },
      {
          "id": 5,
          "data": "1,2"
      },
      {
          "id": 3,
          "data": "dasdfasdf"
      }
  ]
}
```

#### POST `/app`

Client request:
```JSON
{
  "data": "DATA"
}
```

Server response: `200`

#### PUT `/app`

Client request:

```JSON
{
  "id": "ID_OF_DATA",
  "data": "REVISED_DATA"
}
```

Server response: `200`

#### DELETE `/app`

Client request:
```JSON
{
  "id": "ID_OF_DATA",
}
```

Server reponse: `200`
