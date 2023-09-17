import { Posts } from "@/models";
import { API } from "@/lib/app";

export default async function ClientPosts(req, res, next) {
    let { GET, Send } = new API(req, res)
//  query
let {query} = req
console.log(query);
    GET(
        async () => {
            let posts = await Posts.find().sort({ _id: -1 })
            Send(posts)
        })
}










