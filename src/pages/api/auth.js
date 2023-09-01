import { Account, User } from "@/models";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { API } from "@/lib/app";
import nodemailer from 'nodemailer';

export default async function auth(req, res, next) {

        let secret = process.env.secret
        let { body } = req
        let { GET, PUT, POST, PATCH, ALL, Send } = new API(req, res)

        GET(true, async () => {
                let { token } = req.headers
                if (token) {
                        let detoken = await jwt.verify(token, secret)
                        let data = await User.findOne({ email: detoken.email })

                        if (data) Send({ auth: true })
                        else Send({ auth: false })

                } else Send({ auth: false })
        })
        POST(async () => {
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
                                        Send({ token, msg: " لقد تم التسجيل في الموقع" })
                                }
                        } catch (error) {
                                console.log(error);
                                Send({ msg: "انتهت  صلاحية الدعوة" })
                        }
                }
        })
        // login build
        PUT(async () => {
                let findEmail = await User.findOne({ email: body.email })
                if (findEmail) {

                        let compare = await bcrypt.compare(body.password, findEmail.password)
                        if (!compare) {
                                return Send({ error: 'المعلومات غير صحيحة' }, 200)
                        } else {
                                let token = jwt.sign({ email: body.email, _id: findEmail._id, }, secret)
                                Send({ token, admin: findEmail.isAdmin })
                        }
                } else return Send(res, { error: 'المعلومات غير صحيحة' }, 200)
        })

}

async function EmailSender(toEmail, subject, html) {
        let user = process.env.Email
        let pass = process.env.Pass
        const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
        const mailOptions = {
                from: user,
                to: toEmail,
                subject,
                html
        };
        return await transporter.sendMail(mailOptions);

}








