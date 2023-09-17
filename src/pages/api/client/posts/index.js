import { Posts } from "@/models";
import { API } from "@/lib/app";

export default async function ClientPosts(req, res, next) {
    let { GET, Send } = new API(req, res)
//  query
let {query} = req
console.log(query);
    GET(
        async () => {
            let Query = query?.cat ?{cat: { $in: [query?.cat]}} :{}
            let posts = await Posts.find(Query).sort({ _id: -1 })
            Send(posts)
        })
}










