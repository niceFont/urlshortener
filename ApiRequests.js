const https = require("https");


const postRequest = (url) => {
    return new Promise((resolve, reject) => {
        const options = {
            "method": "POST",
            "hostname": "www.googleapis.com",
            "port": null,
            "path": `/urlshortener/v1/url?key=${process.env.APIKEY}`,
            "headers": {
                "content-type": "application/json",
            }
        };

        let request = https.request(options, (response) => {
            let chunks = [];
            response.on("data", (chunk) => {
                chunks.push(chunk);
            });
            response.on("error", (err) => {
                reject(new Error(err));
            })
            response.on("end", () => {
                let body = Buffer.concat(chunks);
                resolve(body.toString());
            })

        })

        request.write(JSON.stringify({ longUrl: url }));
        request.end()



    })
}

module.exports = {
    POST: async function(url) {
        try {
            let request = await postRequest(url)
            return request;
        } catch (err) {
            throw err
        }
    }
}