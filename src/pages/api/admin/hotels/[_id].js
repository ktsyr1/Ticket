// pages/api/hotels/[id].js
import { API, APIAuth } from "@/lib/app";
import { Hotel } from "@/models";

export default async function hotelOne(req, res, next) {
    let { query, body } = req;
    let { GET, PUT, DELETE, Send } = new API(req, res);
    let Auth = new APIAuth(req, res);

    GET(
        await Auth.isLogin(),
        async () => {
            let hotel = await Hotel.findById(query._id).select("-_id")
            Send(hotel);
        }
    );

    PUT(
        await Auth.isLogin(),
        async () => {
            let data = {
                ...body,
                services: {
                    freeParking: body.services.freeParking ? true : false,
                    freeWiFi: body.services.freeWiFi ? true : false,
                    breakfast: body.services.breakfast ? true : false,
                }
            }
            let updatedHotel = await Hotel.findByIdAndUpdate(query._id, data, {
                new: true,
            });
            Send(updatedHotel);
        }
    );

    DELETE(
        await Auth.isLogin(),
        async () => {
            await Hotel.findByIdAndRemove(query._id);
            Send({ msg: "تم حذف الفندق بنجاح" });
        }
    );
}
