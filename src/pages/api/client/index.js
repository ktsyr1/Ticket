import { API, APIAuth } from "@/lib/app";
import { Hotel } from "@/models";

export default async function auth(req, res, next) {

    let { GET, PUT, POST, PATCH, ALL, Send } = new API(req, res)

    GET(
        async () => {
            let hotels = await Hotel.find()
            Send({ hotels })
        })
}