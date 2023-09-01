import { API, APIAuth } from "@/lib/app";

export default async function auth(req, res, next) {

    let { GET, PUT, POST, PATCH, ALL, Send } = new API(req, res)
    let Auth = new APIAuth(req, res)
    GET(
        await Auth.isLogin(),
        async () => {
            Send({ msg: "test" })
        })
}