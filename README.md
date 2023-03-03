# kredfeed

## Run API

Change to the api directory
```bash
$ cd api
```

Create a database called kredfeed in your postgres client and
Setup an environment variable for de DB connection

```bash
$ export DATABASE_URL="postgresql://postgres@localhost:5432/kredfeed?schema=public" 
```

and

```bash
$ npm install
```

```bash
$ npm run build && npm start
```

Server should be listening by default on port 8080

## Example requests

### Create Person

```bash
curl --location --request POST 'http://localhost:8080/person' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Pollos Hermanos",
    "email": "contacto@polloshermanos.com",
    "phone": "5551234567",
    "address": {
        "street": "Cochabamba",
        "number": "1514",
        "postalCode": "37000",
        "city": "Leon",
        "country": "Mexico"
    },
    "legalRepresentative": {
        "name": "Humberto Guerrero",
        "email": "humberto@polloshermanos.com",
        "phone": "5551234567",
        "address": {
            "street": "Cochabamba",
            "number": "1514",
            "postalCode": "37000",
            "city": "Leon",
            "country": "Mexico"
        }
    }
}
'
```

### Get Person

```
curl --location --request GET 'http://localhost:8080/person/2fe51293-65dc-46d3-a35f-6e4bdb3eaf11'
```
