// import API from "@/lib/server";
import { Hotel, HotelApartment, CarWithDriver, Program, CarRental, Posts } from "@/models";
import API from "nextjs-vip";

export default async function SiteMap(req, res, next) {

    let app = new API(req, res)
    app.get(async () => {
        let init = {
            hotels: await Hotel.find().select("createdAt"),
            hotelsApartment: await HotelApartment.find().select("createdAt"),
            carWithDriver: await CarWithDriver.find().select("createdAt"),
            program: await Program.find().select("createdAt"),
            carRental: await CarRental.find().select("createdAt"),
        }
        let page = await Posts.find().select("createdAt")
        let data = []
        let { domain } = req.query
        let urls = {
            hotels: "/hotels",
            hotelsApartment: "/hotel-apartment",
            carWithDriver: "/car-with-driver",
            program: "/program",
            carRental: "/car-rental",
        }
        function DATE(e) {
            if (e) {
                return new Date(e)?.toISOString().split('T')[0]
            } else return
        }
        Object
            .keys(init)
            .map(key => init[key].map(a => {
                data.push({
                    url: `${domain}${urls[key]}/${a._id}`,
                    date: DATE(a?.createdAt)
                })
            })
            )
        app.Send(data)
    }
    )
}
