# Project: Share My Skill
# 📁 Collection: Category 


## End-point: Get all users from categories
### Description: 
Method: GET
>```
>{{URL}}/api/category?cat=ভালো-লাগার-হাজার-উপায়
>```
### Query Params

|Param|value|
|---|---|
|cat|ভালো-লাগার-হাজার-উপায়|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Get Category By Id
### Description: 
Method: GET
>```
>{{URL}}/api/category/6076cfa408541e2ba057e905
>```
### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Create new category
### Description: 
Method: POST
>```
>{{URL}}/api/category
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|application/json|


### Body formdata

|Param|value|Type|
|---|---|---|
|categoryName|Web & Applications|text|
|subCategoryName[0]|UX design|text|
|subCategoryName[1]|App Building|text|
|subCategoryName[2]|Web Design|text|
|subCategoryName[3]|Development Consultancy|text|
|image|/C:/Users/User/Pictures/CSE/syed.jpg|file|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Add Subcategories
### Description: 
Method: PUT
>```
>{{URL}}/api/category/6076cfa408541e2ba057e905
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|application/json|


### Body (**raw**)

```json
{
    "subCategoryName": [
        "Editing in Premiere pro",
        "Making Promos",
        "VFX"
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Get all users from subcategories
### Description: 
Method: GET
>```
>{{URL}}/api/category?sub=typing,মেডিটেশন
>```
### Query Params

|Param|value|
|---|---|
|sub|typing,মেডিটেশন|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: User 


## End-point: Get all user
### Description: 
Method: GET
>```
>{{URL}}/api/user
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Get or Create User By Id
### Description: 
Method: GET
>```
>{{URL}}/api/user/get-or-create
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|application/json|


### Body (**raw**)

```json
{
    "uid": "UwIQyDBB6ZeJLcaxH3RAoDYbCKK2",
    "email": "shwarup101@gmail.com",
    "emailVerified": true,
    "displayName": "shw arup",
    "isAnonymous": false,
    "photoURL": "https://lh3.googleusercontent.com/a/AATXAJx47a6lXNvOlKpJw8Dk-3Sy6NaVM-lw5sumvmsR=s96-c",
    "providerData": [
      {
        "providerId": "google.com",
        "uid": "100261839498154755166",
        "displayName": "shw arup",
        "email": "shwarup101@gmail.com",
        "phoneNumber": null,
        "photoURL": "https://lh3.googleusercontent.com/a/AATXAJx47a6lXNvOlKpJw8Dk-3Sy6NaVM-lw5sumvmsR=s96-c"
      }
    ],
    "stsTokenManager": {
      "refreshToken": "ACzBnChynceyeZjRZM4R4RsVnZK0cnTuuOjteFPCU2cFoAYUd8rJ0ayiGqs65TFRDjqQxskPE7TWYP79YBOza6nT2V0s6Tp2lk-9hdSuoYIo-1cR9t2wvec4pYT8Ry8uEOk72Dx8480XWK48aONgS5AxOlE59MulnSI4k-ubw0oEgsIP1dA-tjWIqFwToSPMn1FtpUL37Se5hqYB9c9lszs7zHnwpILYJ4qMlPJAb1J22ih3v-lJWNl8yiZhz_4H_c092oPjV6G2qYKQjcqd1csyRzFbnsHH-wiUGnPOsMMLpE6JmmmCyKwgXtFxX0O1FujIeh2GKikzxa_YhZmMiB3DuRq6gjpIzw2SJzq0g7qvVDVAcgNp1-d14gCFyt905meQiWW9LR_2pigTpkl1IhzuiUO7gk1Lrdj9LUrO1KuG97MrKe9QwXs",
      "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM1MDM0MmIwMjU1MDAyYWI3NWUwNTM0YzU4MmVjYzY2Y2YwZTE3ZDIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoic2h3IGFydXAiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeDQ3YTZsWE52T2xLcEp3OERrLTNTeTZOYVZNLWx3NXN1bXZtc1I9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGFjLXByb2plY3QtMWQ4YTAiLCJhdWQiOiJsYWMtcHJvamVjdC0xZDhhMCIsImF1dGhfdGltZSI6MTYzMzQyNzIyMiwidXNlcl9pZCI6IlV3SVF5REJCNlplSkxjYXhIM1JBb0RZYkNLSzIiLCJzdWIiOiJVd0lReURCQjZaZUpMY2F4SDNSQW9EWWJDS0syIiwiaWF0IjoxNjMzNDI3MjIyLCJleHAiOjE2MzM0MzA4MjIsImVtYWlsIjoic2h3YXJ1cDEwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMDI2MTgzOTQ5ODE1NDc1NTE2NiJdLCJlbWFpbCI6WyJzaHdhcnVwMTAxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.FxHXkuyayToL9cTtLi1-XLXV8LOlE5xAp4suLq2B4fRPxsooCN2S07HqceFukccFjifgbtryOZ11K-aDFL0Fg25bXARFF80xKrdbaDMe7nnqENyGeBieTkKz7p03eY-0LCaSK3wEX3gs-Mqq1r_driGJSqlMwMB9MX2GRLBPfzgIvVjFgRjqEvLInLmzTU6nQTTnqCGSktipmWvbTZD4CQCnJU1b3fB4QNChhLoQ-hgdT5bAUESBAaMpu82N6LHDDUdDaiLdsZwEjFM8D6Zwvn58qmhGdgGsXLX1OrfwQHCrwK1kbgK7ZNboZyj7XGG-tTVF133M9zqNettGuUkYVQ",
      "expirationTime": 1633430822149
    },
    "createdAt": "1633427222074",
    "lastLoginAt": "1633427222075",
    "apiKey": "AIzaSyAOjNU0FBeJXD75cYE4F_4fhwlNPo2i4eY",
    "appName": "[DEFAULT]"
  }
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Get Necessary Details for homepage
### Description: 
Method: GET
>```
>{{URL}}/api/user/home?limit=2
>```
### Query Params

|Param|value|
|---|---|
|limit|2|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Register User
### Description: 
Method: PUT
>```
>{{URL}}/api/user/register
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|application/json|


### Body formdata

|Param|value|Type|
|---|---|---|
|name|Asmani|text|
|type|skiller|text|
|category|6076cfa408541e2ba057e904|text|
|subcategory|Typing|text|
|description|My Name is Asmani|text|
|whatsapp|01961229150|text|
|bkash|01713035069|text|
|longDescription|If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.|text|
|location|Dhaka|text|
|isPopular|true|text|
|projectPrice [0]|1200|text|
|projectPrice [1]|2400|text|
|projectPrice [2]|4800|text|
|projectDescriptions[0]|A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs.|text|
|projectDescriptions[1]|Medium is an American online publishing platform developed by Evan Williams and launched in August 2012. It is owned by A Medium Corporation|text|
|projectDescriptions[2]|Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, sewage systems, pipelines, structural components of buildings, and railways|text|
|image|/C:/Users/User/Pictures/CSE/syed.jpg|file|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Get Single User By Id
### Description: 
Method: GET
>```
>{{URL}}/api/user/6076cfa408541e2ba057e331
>```
### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Search User + Category 
### Description: 
Method: GET
>```
>{{URL}}/api/search?text=a
>```
### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|text|a|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Admin 


## End-point: Toggle popularity of user or category
### Description: 
Method: PUT
>```
>{{URL}}/api/admin/toggle?field=category
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|application/json|


### Body (**raw**)

```json
{
    "id" : "616c654d7dd6f8fab23c21da"
}
```

### Query Params

|Param|value|
|---|---|
|field|category|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Review 


## End-point: Get reviews for a single user
### Description: 
Method: GET
>```
>{{URL}}/api/review/6076cfa408541e2ba057e335
>```
### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Order 


## End-point: Get all orders for a user
### Description: 
Method: GET
>```
>{{URL}}/api/order/6076cfa408541e2ba057e331
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

_________________________________________________
Author: [bautistaj](https://github.com/bautistaj)

Package: [postman-to-markdown](https://github.com/bautistaj)
