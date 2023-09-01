import { User } from "@/models";
import { API, APIAuth } from "@/lib/app";

export default async function users(req, res, next) {
        let { GET, id, PATCH, ALL, DELETE, Send } = new API(req, res)
        let Auth = new APIAuth(req, res) 
        GET(
                await Auth.isLogin(),
                async () => {
                        let users = await User.findOne(id).select('fullname email ')
                        Send(users)
                })


        DELETE(
                await Auth.isLogin(),
                async () => {
                        await User.deleteOne(id)
                        Send({ msg: "تم حذف الحساب" })
                }
        )
}
