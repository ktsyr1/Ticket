import { API } from "@/lib/app";
import { HotelApartment } from "@/models";

export default async function hotels(req, res, next) {
    let { body } = req;
    let { GET, Send } = new API(req, res);

    GET(
        async () => {
            let hotels = await HotelApartment.find().select("-services")
            Send(hotels);
        }
    );

}
