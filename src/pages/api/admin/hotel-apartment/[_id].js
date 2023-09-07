// pages/api/hotels/[id].js
import { API, APIAuth } from "@/lib/app";
import { HotelApartment } from "@/models";

export default async function hotelOne(req, res, next) {
    let { query, body } = req;
    let { GET, PUT, DELETE, Send } = new API(req, res);
    let Auth = new APIAuth(req, res);

    GET(
        await Auth.isLogin(),
        async () => {
            let hotel = await HotelApartment.findById(query._id).select("-_id")
            Send(hotel);
        }
    );

    PUT(
        await Auth.isLogin(),
        async () => {

            let updatedHotel = await HotelApartment.findByIdAndUpdate(query._id, body, { new: true, });
            Send(updatedHotel);
        }
    );

    DELETE(
        await Auth.isLogin(),
        async () => {
            await HotelApartment.findByIdAndRemove(query._id);
            Send({ msg: "تم حذف الفندق بنجاح" });
        }
    );
}
