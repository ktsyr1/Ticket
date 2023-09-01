import { API } from "@/lib/app";
import { Hotel } from "@/models";

export default async function hotelOne(req, res, next) {
    let { query } = req;
    let { GET, Send } = new API(req, res);

    GET(
        async () => {
            let hotel = await Hotel.findById(query._id).select("-_id")
            Send(hotel);
        }
    );
}
