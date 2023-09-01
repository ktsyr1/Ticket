import { Posts, User } from "@/models";
import { API, APIAuth } from "@/lib/app";

/**
 * 
 * @route {"/user"}  
 * @method {GET} all Posts 
 * @method {POST} add Post
 * 
 */
export default async function posts(req, res, next) {
        let { body } = req
        let { GET, PUT, Send } = new API(req, res)
        let Auth = new APIAuth(req, res)
        let user_id = await Auth.UserId()

        GET(
                await Auth.isLogin(),
                async () => {

                        let user = await User.findOne(user_id)
                                .select('fullname email wa isAdmin isBlock verification')
                        let accounts = await Account.find({ user_id: user_id._id })
                                .sort({ _id: -1 })
                        Send({ user, accounts })

                })
        PUT(
                await Auth.isLogin(),
                async () => {
                        // types
                        let data = {
                                "fullname": body.fullname,
                                "email": body.email,
                                "wa": body.wa,
                        }
                        await User.updateOne(user_id, data)
                        let user = await User.findOne(user_id)
                                .select('fullname email wa isAdmin isBlock verification')
                        Send(user)

                })
}










