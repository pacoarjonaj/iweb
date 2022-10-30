
import {Client} from "@googlemaps/google-maps-services-js";

const client = new Client({});


export default async function handler(req, res) {

    //type of request
    const { 
        method,
        query: {lat, lng}
    } = req

    switch (method) {
        case 'GET':
            {
              const point = await client
                .elevation({
                  params: {
                    locations: [{ lat: lat, lng: lng }],
                    key: "AIzaSyBhr3InTH8ovJezY3Ppwka6KWzGVLHh4Vg",
                  },
                  timeout: 1000, // milliseconds
                })
                .catch((e) => {
                  console.log(e.response.data.error_message);
                });
                return res.status(201).json({result: point ? point.data : null})

            }

        default:
            return res.status(400).json({ msg: "This method is not supported" })
    }

}