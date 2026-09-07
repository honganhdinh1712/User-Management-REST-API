const http = require("node:http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parts = req.url.split("/");

    if (
        req.method === "GET" &&
        parts[1] === "users"
    ) {
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
        const id = Number(parts[2]);

        if (!Number.isInteger(id) || id <= 0) {
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
        } else {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
        
            res.end(JSON.stringify({
                users: users
            }))
        }
    } else if (parts[1] === 'about' && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(
            { "name": "User Management API", "version": "1.0.0" }
        ))
    } else if (parts[1] === "" && req.method === "GET") {
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
})

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})