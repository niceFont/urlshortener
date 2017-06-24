require("dotenv").config(); //import .env Variables
const app = require("express")();
const port = process.env.PORT || 1000;
const { POST } = require("./ApiRequests");


app.get("/", (request, response) => {
    console.log(request.query.url)
    if (request.query.url !== undefined) {
        POST(request.query.url)
            .then((data) => {
                console.log(data)
                return response.send(data)
            })
            .catch((err) => {
                console.error(err)
            })
    } else response.send("Error: No query given!")
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})