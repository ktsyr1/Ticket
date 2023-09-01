// pages/api/hotels/index.js
import { API, APIAuth } from "@/lib/app";
import { Hotel } from "@/models";

export default async function hotels(req, res, next) {
    let { body } = req;
    let { GET, POST, Send } = new API(req, res);
    let Auth = new APIAuth(req, res);

    GET(
        await Auth.isLogin(),
        async () => {
            let hotels = await Hotel.find();
            Send(hotels);
        }
    );

    POST(
        await Auth.isLogin(),
        async () => {
            let data = {
                ...body,
                services: {
                    freeParking: body.services.freeParking ? true : false,
                    freeWiFi: body.services.freeWiFi ? true : false,
                    breakfast: body.services.breakfast ? true : false,
                }
            }
            let savedHotel = await Hotel.create(data);
            Send(savedHotel);
        }
    );
}
