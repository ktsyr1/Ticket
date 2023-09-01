import { API, APIAuth } from "@/lib/app";
import { Action, Posts } from "@/models";

/**
 * 
 * @route {"/user"}  
 * @method {GET}  get post 
 * @method {GET} DELETE post 
 * 
 */

export default async function postOne(req, res, next) {
        let { body } = req
        let { id, GET, PUT, DELETE, PATCH, Send } = new API(req, res)
        let Auth = new APIAuth(req, res)

        GET(
                await Auth.isLogin(),
                async () => {
                        // types
                        let posts = await Posts.findOne(id)
                        Send(posts)
                })
        PUT(
                await Auth.isLogin(),
                async () => {
                        // types

                        await Posts.updateOne(id, body)
                        Send({ msg: "تم تحديث المنشور" })
                })
        DELETE(
                await Auth.isLogin(),
                async () => {
                        // types
                        await Posts.deleteOne(id)
                        Send({ msg: "تم حذف المنشور" })

                })

}
