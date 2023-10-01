import { CarRental } from "@/models";
import { APIAuth } from "@/lib/app";
import API from "@/lib/server";

export default async function CarRentalAPI(req, res, next) {
    const { body } = req;
    const app = new API(req, res);
    const Auth = new APIAuth(req, res);

    app.get(
        await Auth.isLogin(),
        async () => {
            const carRentals = await CarRental.find().sort({ _id: -1 });
            app.Send(carRentals);
        }
    )
    app.post(
        await Auth.isLogin(),
        async () => {
            const carRental = await CarRental.create(body);
            app.Send(carRental);
        }
    );
}
