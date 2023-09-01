"use client"
import { Input, setChange } from "@/lib/app"
import { message } from "antd"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useState } from "react"

export async function getServerSideProps(ctx) {
    let { token } = ctx.req.cookies

    if (token && token.length > 20) return { redirect: { permanent: false, destination: '/' } }
    else return { props: {} }
}
export default function NewPassword() {
    let [Data, setData] = useState({})
    let set = e => setChange(e, Data, setData)
    let route = useRouter()
    function send(e) {
        e.preventDefault()
        // send data to the server
        if (Data.password === Data.repassword) {
            let token = route.query.token
            let config = { headers: { token } }
            axios.post('/api/pass', Data, config)
                .then(async ({ data }) => {
                    // this code
                    if (data.token) {
                        message.success(data.msg)
                        // set token in cookie
                        Cookies.set('token', data.token)
                        if (data.account) {
                            Cookies.set('account', JSON.stringify(data.account))
                            Cookies.set('nav', JSON.stringify({ nav: data.nav }))
                            // redirect to home page admin or user page
                            route.push(data.admin ? "/admin" : "/user")
                        } else {
                            // if not account ads to new account, redirect to home page
                            setTimeout(() => location.reload("/"), 1000)
                        }
                    } else if (data.error) message.error(data.error);




                })
        } else {
            // alert
            message.error("كلمات المرور غير متطابقة", "err")
        }
    }
    return (
        <div>
            <form >
                <h1>   تغيير كلمة السر</h1>
                <Input title="كلمة السر الجديدة" type='password' name='password' onChange={set} />
                <Input title="اعادة كلمة السر الجديدة" type='password' name='repassword' onChange={set} />

                <button onClick={send} className="mt-20">ارسال  </button>
            </form>
        </div>
    )
}
