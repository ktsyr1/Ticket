import { CarWithDriver } from "@/models";
import { API, APIAuth } from "@/lib/app";

export default async function carWithDriverById(req, res, next) {
    let { body } = req;
    let { GET, PUT, DELETE, Send } = new API(req, res);
    let Auth = new APIAuth(req, res);

    const { _id } = req.query; // استخراج معرف السجل من الطلب

    GET(
        await Auth.isLogin(),
        async () => {
            try {
                const carWithDriver = await CarWithDriver.findById(_id);
                if (!carWithDriver) {
                    Send({ error: "العنصر غير موجود" }, 404);
                    return;
                }
                Send(carWithDriver);
            } catch (error) {
                Send({ error: "حدث خطأ في الخادم" }, 500);
            }
        }
    );

    PUT(
        await Auth.isLogin(),
        async () => {
            const {
                title,
                city,
                carImage,
                duration,
                driver,
                tourDuration,
                price,
                additionalFeatures,
                programDetails,
            } = body;

            const data = {
                title,
                city,
                carImage,
                duration,
                driver,
                tourDuration,
                price,
                additionalFeatures: additionalFeatures,
                programDetails,
            };

            try {
                const updatedCarWithDriver = await CarWithDriver.findByIdAndUpdate(
                    _id,
                    body,
                    { new: true }
                );
                Send(updatedCarWithDriver);
            } catch (error) {
                Send({ error: "حدث خطأ في الخادم" }, 500);
            }
        }
    );

    DELETE(
        await Auth.isLogin(),
        async () => {
            try {
                const deletedCarWithDriver = await CarWithDriver.findByIdAndDelete(_id);
                if (!deletedCarWithDriver) {
                    Send({ error: "العنصر غير موجود" }, 404);
                    return;
                }
                Send({ msg: "تم حذف العنصر بنجاح" });
            } catch (error) {
                Send({ error: "حدث خطأ في الخادم" }, 500);
            }
        }
    );
}
