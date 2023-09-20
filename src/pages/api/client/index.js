import { API, APIAuth } from "@/lib/app";
import { Hotel, HotelApartment ,CarWithDriver} from "@/models";

export default async function auth(req, res, next) {

    let { GET, PUT, POST, PATCH, ALL, Send } = new API(req, res)

    GET(
        async () => {
            let hotels = await Hotel.find().select("name image rank city").limit(3)
            let hotelsApartment = await HotelApartment.find().select("name image city").limit(3)
            let carWithDriver = await CarWithDriver.find().select("carImage title driver tourDuration city price").limit(3)
            Send({ hotels, hotelsApartment , carWithDriver })
        })
}