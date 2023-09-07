// pages/api/admin/hotels/index.js
import { API, APIAuth } from "@/lib/app";
import { HotelApartment } from "@/models";

export default async function hotels(req, res, next) {
    let { body } = req;
    let { GET, POST, Send } = new API(req, res);
    let Auth = new APIAuth(req, res);

    GET(
        await Auth.isLogin(),
        async () => {
            let hotels = await HotelApartment.find();
            Send(hotels);
        }
    );

    POST(
        await Auth.isLogin(),
        async () => {
            let saved = await HotelApartment.create(body);
            Send(saved);
        }
    );
}
