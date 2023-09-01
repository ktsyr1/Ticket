import { Posts } from "@/models";
import { API, APIAuth } from "@/lib/app";

export default async function posts(req, res, next) {
        let { body } = req
        let { GET, POST, Send } = new API(req, res)
        let Auth = new APIAuth(req, res)

        GET(
                await Auth.isLogin(),
                async () => {
                        // types
                        let posts = await Posts.find().sort({ _id: -1 })
                        Send(posts)

                })
        POST(
                await Auth.isLogin(),
                async () => {
                        let { title, content, url, bio, image } = body
                        let data = { title, content, url, bio, image, cat: body?.cat?.split(",") }

                        let posts = await Posts.create(data)
                        Send(posts)

                })
}










