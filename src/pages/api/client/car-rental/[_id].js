import { CarRental } from "@/models";
import API from "@/lib/server";

export default async function CarRentalDetailAPI(req, res) {
    const { query } = req;
    const app = new API(req, res);

    app.get(async () => {
        const carRental = await CarRental.findById(query._id).select("-_id");
        app.Send(carRental);
    });
}
