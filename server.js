const http = require("node:http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/users' && req.method === "GET") {
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

        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        
        res.end(JSON.stringify({
            users: users
        }))
    } else if (req.url === '/about' && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(
            { "name": "User Management API", "version": "1.0.0" }
        ))
    } else if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })

        res.end(JSON.stringify({
            message: "Welcome"
        }))
    } else {
        res.writeHead(400, {
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