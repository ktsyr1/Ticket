import axios from "axios"
// import nodemailer from 'nodemailer';

export default async function Auth(token) {
    if (token) {
        let URLs = `${process.env.NEXT_PUBLIC_API}/auth`
        let config = { headers: { token } }
        return axios.get(URLs, config)
            .then(({ data }) => (data))
    }
    else return false
}
export async function AuthServerSide(ctx, fun) {
    let { NEXT_PUBLIC_API } = process.env
    let { cookies, query, config, token } = SSRctx(ctx)
    let redirect = () => ({ redirect: { permanent: false, destination: '/auth/login' } })

    if (!token) return redirect()
    else {
        let { auth } = await Auth(token)
        if (auth === false) return redirect()
        else {
            try {
                if (typeof fun === 'function') {
                    let data = await fun({ cookies, query, config, NEXT_PUBLIC_API })
                    return { props: { ...data, config } }
                }
            } catch (err) { return redirect() }
        }
    }
}
export function SSRctx(ctx) {
    let { cookies } = ctx.req
    let query = ctx.query
    let { token } = cookies
    let config = { headers: { token: cookies?.token, } }
    return { cookies, token, query, config }
}
export function open(q) {
    document.querySelector(q).classList.toggle('none')
}
// export function MailSender() {
//     let user = process.env.Email
//     let pass = process.env.Pass
//     const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
// }