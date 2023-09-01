import { API } from "@/lib/app";
import { CarWithDriver } from "@/models";

export default async function allCars(req, res, next) {
    let { GET, Send } = new API(req, res);

    GET(async () => {
        let allCars = await CarWithDriver.find();
        Send(allCars);
    });
}
