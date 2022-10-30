
import {Client} from "@googlemaps/google-maps-services-js";

const client = new Client({});


export default async function handler(req, res) {

    //type of request
    const { method } = req

    switch (method) {
        case 'GET':
            {
                client
                .elevation({
                  params: {
                    locations: [{ lat: 45, lng: -110 }],
                    key: "AIzaSyBhr3InTH8ovJezY3Ppwka6KWzGVLHh4Vg",
                  },
                  timeout: 1000, // milliseconds
                })
                .then((r) => {
                  console.log(r.data.results[0].elevation);
                })
                .catch((e) => {
                  console.log(e.response.data.error_message);
                });
                return res.status(201).json({ })

            }

        default:
            return res.status(400).json({ msg: "This method is not supported" })
    }

}