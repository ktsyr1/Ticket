import { API } from "@/lib/app";
import { CarWithDriver } from "@/models"; // تحديد النموذج المناسب

export default async function carOne(req, res, next) {
    let { query } = req;
    let { GET, Send } = new API(req, res);

    GET(async () => {
        let car = await CarWithDriver.findOne({ _id: query._id });
        Send(car);
    });
}
