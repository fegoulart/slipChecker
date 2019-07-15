# Payment Slip Checker

This app is a REST API to validate manually typed Brazilian payment slip codes.
It accepts both título / boleto  and convênio / concessionárias typed codes.

 
## Definitions

  

### important definitions adopted

#### título
Título typed data has 47 digits
Título amount must be less than R$ 100 mi (100 millions reais) 
Título currency must be BRL (Brazilian Real).
It's considered that due date (data de vencimento) is always at or before 21st - February - 2025
 

#### convênio
 Convênio typed data has 48 digits  

  
Check also missing aspects below.

## Architecture

  

### container

I used a default Node docker container to avoid environment issues.

### relevant modules used

#### production
  "express": "~4.17.1",  
  "moment": "^2.24.0",  
  
#### testing
  "chai": "~4.2.0",  
  "mocha": "~6.1.4",  
 
 
### api design

  

Single endpoint.
Expects a POST request with form-data field called `typedData` 

Sample request:

    POST  HTTP/1.1
    Host: localhost:8080?
    Content-Type: application/x-www-form-urlencoded
    User-Agent: PostmanRuntime/7.15.0
    Cache-Control: no-cache
    Postman-Token: b9136d90-e864-42dd-9c49-724bb7c71e6a,c675d09d-abb1-4867-80d1-1cd859ce1652
    Host: localhost:8080
    accept-encoding: gzip, deflate
    content-length: 72
    Connection: keep-alive
    cache-control: no-cache
    
    typedData=23792.40308+90000.871286+57003.613700+4+79460000122399 

 Sample response (status 200)

```json
{
    "validData": true,
    "amount": 1223.99,
    "dueDate": "10/07/2019",
    "barcode": "23791794600001223990000000000000000000000000",
    "message": "Titulo successfully verified."
}
```

## Tests

  

I've used chai, mocha and supertest modules.


### Running tests

  

```

npm run test

```
or


```

npm run coverage

```
  

## Building the server

  
### Docker
```

docker build -t slipchecker .
docker create --name slipchecker -p 8080:8080 slipchecker
docker start slipchecker

```

### Local

Inside app folder:
```

npm install
npm run start

```


  
## Missing aspects

  

As a MVP some aspects are missing:

  
- Título amount more or equal to R$ 100 mi (100 millions reais) .
- Título currency  different from BRL (Brazilian Real).
- Título due date at or after 22nd - February - 2025.

