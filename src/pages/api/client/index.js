import API from "@/lib/server";
import { Hotel, HotelApartment, CarWithDriver, Program ,CarRental} from "@/models";

export default async function HomePage(req, res, next) {

    let app = new API(req, res)
    app.get(
        async () => {
            let hotels = await Hotel.find().select("name image rank city").limit(3)
            let hotelsApartment = await HotelApartment.find().select("name image city").limit(3)
            let carWithDriver = await CarWithDriver.find().select("carImage title driver tourDuration city price").limit(3)
            let program = await Program.find().select("image title price duration").limit(3)
            let carRental = await CarRental.find().select("	 brand model year image duration price seats transmission fuelType duration").limit(3)

            app.Send({
                hotels,
                hotelsApartment,
                carWithDriver,
                program,
                carRental
            })
        }
    )
}
