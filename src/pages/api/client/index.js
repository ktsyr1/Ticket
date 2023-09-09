import { API, APIAuth } from "@/lib/app";
import { Hotel, HotelApartment } from "@/models";

export default async function auth(req, res, next) {

    let { GET, PUT, POST, PATCH, ALL, Send } = new API(req, res)

    GET(
        async () => {
            let hotels = await Hotel.find().select("name image rank city")
            let hotelsApartment = await HotelApartment.find().select("name image city")
            Send({ hotels, hotelsApartment })
        })
}