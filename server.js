require("dotenv").config(); //import .env Variables
const app = require("express")();
const port = process.env.PORT || 1000;
const { POST } = require("./ApiRequests");


app.get("*", (request, response) => {

    if (request.url !== "undefined") {
        let url = request.url.split("").slice(1, request.url.length).join("")
        POST(url)
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