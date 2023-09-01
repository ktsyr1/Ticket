import { Input, setChange } from "@/lib/app"
import { AuthServerSide } from "@/lib/app2"
import { message } from "antd"
import axios from "axios"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

export async function getServerSideProps(ctx) {
    let { token } = ctx.req.cookies

    if (token && token.length > 20) return { redirect: { permanent: false, destination: '/' } }
    else return { props: {} }
}
export default function Login() {
    let [Data, setData] = useState({})
    let set = e => setChange(e, Data, setData)
    let route = useRouter()

    function send(e) {
        e.preventDefault()
        // send data to the server
        axios.put('/api/auth', Data)
            .then(async ({ data }) => {
                // alert
                if (data.token) {
                    message.success("تم تسجيل الدخول")
                    // set token in cookie
                    Cookies.set('token', data.token)

                    // redirect to home page admin or user page
                    location.reload(data.admin ? "/admin" : "/user")
                }
            })

    }
    return (
        <form >
            <h1>تسجيل الدخول</h1>
            <Input title="الايميل" name='email' onChange={set} />
            <Input title="كلمة السر" type="password" name='password' onChange={set} />
            <button onClick={send} className="mt-20">تسجيل الدخول</button>
            <Link href={"/auth/repassword"}>نسيت كلمة المرور؟</Link>

        </form>
    )
}
