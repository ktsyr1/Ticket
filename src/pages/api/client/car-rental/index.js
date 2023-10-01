import { CarRental } from "@/models";
import API from "@/lib/server";

export default async function CarRentalsAPI(req, res) {
    const app = new API(req, res);
    app.get(async () => {
        const carRentals = await CarRental.find().sort({ _id: -1 });
        app.Send(carRentals);
    });
}
