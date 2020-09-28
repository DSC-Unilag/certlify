# cert
## Api documentation

post:

    /register:

    Requestbody:
    
        required:true
    
        content:
    
            application/json
    
                schema:
```JSON
                    {
                        name,
                        email,
                        password
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
						status:true,
						message:"user added successfully"
					}
```