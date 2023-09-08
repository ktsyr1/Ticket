import { User } from "@/models";
import { API, APIAuth, EmailSender } from "@/lib/app";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

export default async function users(req, res, next) {
        let { GET, PATCH, Send } = new API(req, res)
        let Auth = new APIAuth(req, res)
        let secret = process.env.secret

        let { body } = req
        GET(
                await Auth.isLogin(),
                async () => {
                        let users = await User
                                .find()
                                .sort({ _id: -1 })
                                .select('fullname email wa  ')
                        Send(users)
                });
        PATCH(
                // await Auth.isLogin(),
                async () => {
                        let user = await User.findOne(body)
                        if (!user) {
                                let USER = await User.create(body)
                                let payload = {
                                        email: body.email,
                                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
                                }
                                let token = jwt.sign(payload, secret,)

                                let url = `${process.env.NEXT_PUBLIC_API.slice(0, -4)}/auth/register?token=${token}`
                                // send tocken
                                // -------------------------------
                                let user = process.env.Email
                                let pass = process.env.Pass

                                const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
                                let siteName = " Ticket"
                                let content = `
                                        <center>
                                                <h3 >انت مدعو لتكون مسوؤل في موقع ${siteName}  </h3>
                                                <p>هذه الدعوة صالحة لمدة اسبوع</p>
                                                <a href="${url}" style="text-decoration:none;color: #03A9F4;font-weight:900;">قبول</a>
                                        </center>
                                `
                                const mailOptions = {
                                        from: user,
                                        to: USER.email,
                                        subject: " انت مدعو لتكون مسوؤل في موقعنا    ",
                                        html: content
                                };
                                try {
                                        const info = await transporter.sendMail(mailOptions);
                                        // this code
                                        Send({ msg: "لقد تم ارسال الدعوة" })
                                } catch (error) {
                                        console.log('Error:', error);
                                        res.status(500).json({ error: 'Failed to send email' });
                                }
                        } else Send({ msg: "الايميل مستخدم" })
                }
        )
}
