import { User } from "@/models";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import API from "nextjs-vip";

export default async function auth(req, res, next) {

    let secret = process.env.secret
    let { body } = req 
    let app = new API(req, res)

    app.get(true, async () => {
        let { token } = req.headers
        if (token) {
            let detoken = await jwt.verify(token, secret)
            let data = await User.findOne({ email: detoken.email })

            if (data) app.Send({ auth: true })
            else app.Send({ auth: false })

        } else app.Send({ auth: false })
    })
    app.post(async () => {
        if (body.token) {
            try {
                let detoken = jwt.verify(body.token, secret)
                let user = await User.findOne({ email: detoken.email })
                if (user) {
                    const hash = await bcrypt.hash(body.password, 12)
                    let data = { fullname: body.fullname, password: hash, }

                    await User.updateOne({ email: user.email }, data)
                    let token = jwt.sign({ email: user.email, _id: user._id, }, secret)
                    // this code
                    app.Send({ token, msg: " لقد تم التسجيل في الموقع" })
                }
            } catch (error) {
                app.Send({ msg: "انتهت  صلاحية الدعوة" })
            }
        }
    })
    // login build
    app.put(async () => {
        let findEmail = await User.findOne({ email: body.email })
        if (findEmail) {

            let compare = await bcrypt.compare(body.password, findEmail.password)
            if (!compare) {
                return app.Send({ error: 'المعلومات غير صحيحة' }, 200)
            } else {
                let token = jwt.sign({ email: body.email, _id: findEmail._id, }, secret)
                app.Send({ token, admin: findEmail.isAdmin })
            }
        } else return app.Send(res, { error: 'المعلومات غير صحيحة' }, 200)
    })

}






