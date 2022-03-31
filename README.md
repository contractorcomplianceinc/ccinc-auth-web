# CC.js Project

## Introduction

This project is used to demonstrate how to use CC.js to allow a user to authorize a 3rd-party API.

## How It Works

To make it easier for one of our hiring org / contractors to utilize our API, `CC.js` has been created to assist with the authorization process.

### Authorization Flow

Authorization is done in a few steps:

1. `GET /oauth/authorize`: User authorizes the 3rd party to access CC data. Returns access *code*
2. `POST /oauth/token`: Get an access *token* using the code. Use the token in the `Authorization: Bearer {token}` header.


#### `oauth/authorize`

The first step is to make make a `GET` request to our API at the following URL: `https://api.contractorcompliance.io/oauth/authorize?...`

You will need to pass in the following url params:

```json
{
    "client_id": "{client id}",
    "redirect_uri": "{redirect url}",
    "response_type": "code",
    "scope": "*",
    "state": "{state}",
}
```

```
curl --location --request GET "https://api.contractorcompliance.io/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope=*&state={state}"
```

* `client_id`: The ID number obtained when setting up the new `passport:client`. See [Server Setup](#server-setup).
* `redirect_uri`: 
* `{state}` can be a random string. Its used to verify on the client side that the server returned the correct response.

## Server Setup {#server-setup}

In order to setup the API, we need to create a passport client on the server. Run the following command to create the client:

```bash
php artisan passport:client \
    --public
    --name="CLIENT NAME"
    --redirect_url="REDIRECT URL"
```

<mark>
NOTE
: Copy the client id and secret. You will need these later.
</mark>

## Client Setup

Here are the steps a client needs to do in order to setup their project to use the CC.js library:






---

## Project Start

```bash
yarn install && yarn serve
```