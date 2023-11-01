import { API } from "@/lib/app";
import { Hotel } from "@/models";

export default async function hotels(req, res, next) {
    let { body } = req;
    let { GET, Send } = new API(req, res);

    GET(
        async () => {
            let hotels = await Hotel.find()
            Send(hotels);
        }
    );

}
