# cert
## Api documentation

### post:

   #### /register:

    Requestbody:
    
        required: true
    
        content:
    
            application/json
    
                schema:
```JSON
{
    name: "name",
    email: "email",
    password: "password"
}
```
    responses:

        "200":
    
            description: Successfully created user
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: true,
    message: "user added successfully"
}
```
        "400":
    
            description: incomplete user data
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: false,
    message: "incomplete User Data"
}
```          
"401":
    
            description: incorrect username or password
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: false,
    message: "incorrect username or password"
}
```
"402":
    
            description: duplicate user
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: false,
    message: "duplicate user"
}
```

### post:

   #### /login:

    Requestbody:
    
        required: true
    
        content:
    
            application/json
    
                schema:
```JSON
{
    email: "email",
    password: "password"
}
```
    responses:

        "200":
    
            description: Successfully logged in
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: true,
    message: "user logged in successfully"
}
```
        "400":
    
            description: incomplete user data
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: false,
    message: "incomplete login data"
}
```          
"401":
    
            description: incorrect username or password
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: false,
    message: "incorrect username or password"
}
```

### get:

   #### /geteligibleusers:

    Requestbody:
    
        required: false
    
        content:
    
            application/json
    
                schema:
```JSON
{
    email: "email"
}
```
    responses:

        "200":
    
            description: Successfully fetched eligible users
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: true,
    message: "eligible users fetched",
    data: [{ },] // Array of objects
}
```
        "400":
    
            description: bad request
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: false,
    message: "bad request" // I don't really know how you can make a bad get request
}
```          
"401":
    
            description: no access
    
            content:
    
                application/json:
    
                    schema:
```JSON                    
{
    status: false,
    message: "unauthorized user"
}
```