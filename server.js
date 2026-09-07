const http = require("node:http");

const PORT = 3000;

// Dummy data
const users = [
    {
        "id": 1,
        "name": "A"
    },
    {
        "id": 2,
        "name": "B"
    }
]
const server = http.createServer((req, res) => {
    const parts = req.url.split("/");

    // GET METHOD ONLY
    if (req.method === "GET") {
        if (
            parts[1] === "users"
        ) {
            const id = Number(parts[2]);

            if (Number.isInteger(id) && id >= 0) {
                const user = users.find(user => user.id === id);
                if (user) {
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    
                    res.end(JSON.stringify({
                        user: user
                    }))
                } else {
                    res.writeHead(404, {
                        "Content-Type": "application/json"
                    });
                    
                    res.end(JSON.stringify({
                        message: `Not found user ${id}`
                    }))
                }
            } else if (!Number.isInteger(id) || id <= 0) {
                res.writeHead(400, {
                    "Content-Type": "application/json"
                });
            
                res.end(JSON.stringify({
                    message: "Id must is integer and not a negative number"
                }))
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
            
                res.end(JSON.stringify({
                    users: users
                }))
            }
        } else if (parts[1] === 'about') {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify(
                { "name": "User Management API", "version": "1.0.0" }
            ))
        } else if (parts[1] === "") {
            res.writeHead(200, {
                "Content-Type": "application/json"
            })

            res.end(JSON.stringify({
                message: "Welcome"
            }))
        } else {
            res.writeHead(404, {
                "Content-Type": "application/json"
            })

            res.end(JSON.stringify({
                message: "Something went wrong"
            }))
        }
    }

    // POST METHOD
    if (req.method === "POST") {
        let body = "";

        if (parts[1] === "users") {
            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", () => {
                let id = users.length + 1;
                let newUser = JSON.parse(body);
                newUser.id = id;

                // Validate
                const validator = typeof newUser.name === "string" && newUser.name !== null;
                if (validator) {
                    users.push(newUser);
                    res.writeHead(201, {
                        "Content-Type": "application/json"
                    })
    
                    res.end(JSON.stringify({
                        message: "Created!"
                    }))
                } else if (!validator) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    })
                    res.end(JSON.stringify({
                        message: "Name must be a string and not null"
                    }))
                } else {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    })
                    res.end(JSON.stringify({
                        message: "Cant create user"
                    }))
                }
            })
        }
    }

    // PUT METHOD
    if (req.method === "PUT") {
        if (parts[1] === "users") {
            const id = Number(parts[2]);

            if (Number.isInteger(id) && id > 0) {
                let body = "";

                const user = users.find(user => user.id === id);

                if (user) {
                    req.on("data", (chunk) => {
                        body += chunk;
                    }) 

                    req.on("end", () => {
                        const data = JSON.parse(body);
                        
                        const validator = 
                            typeof data.name === "string"
                        
                        if (validator) {
                            user.name = data.name

                            res.writeHead(200, {
                                "Content-Type": "application/json"
                            })
                            res.end(JSON.stringify({
                                message: "Updated!"
                            })) 
                        } else {
                            res.writeHead(400, {
                                "Content-Type": "application/json"
                            })
                            res.end(JSON.stringify({
                                message: "Name must be a string!"
                            })) 
                        }
                    })
                } else {
                    res.writeHead(404, {
                        "Content-Type": "application/json"
                    })

                    res.end(JSON.stringify({
                        message: `Not found user ${id}`
                    }))
                }
            }
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})