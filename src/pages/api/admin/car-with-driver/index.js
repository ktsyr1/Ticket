import { CarWithDriver } from "@/models";
import { API, APIAuth } from "@/lib/app";

export default async function carWithDriver(req, res, next) {
    let { body } = req;
    let { GET, POST, Send } = new API(req, res);
    let Auth = new APIAuth(req, res);

    GET(
        await Auth.isLogin(),
        async () => {
            try {
                const carsWithDriver = await CarWithDriver.find().sort({ _id: -1 });
                Send(carsWithDriver);
            } catch (error) {
                Send({ error: "حدث خطأ في الخادم" }, 500);
            }
        }
    );

    POST(
        await Auth.isLogin(),
        async () => {

            const data = {
                ...body,
                additionalFeatures: body.additionalFeatures?.split(","),
            };
            try {
                console.log(data);
                const newCarWithDriver = await CarWithDriver.create(data);
                console.log(newCarWithDriver);
                Send(newCarWithDriver, 201);
            } catch (error) {
                Send({ error: "حدث خطأ في الخادم" }, 500);
            }
        }
    );
}
