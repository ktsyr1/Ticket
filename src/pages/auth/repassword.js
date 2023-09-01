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

export default function Login() {
    let [Data, setData] = useState({})
    let set = e => setChange(e, Data, setData)
    let { push } = useRouter()
    function send(e) {
        e.preventDefault()
        // send data to the server
        axios.patch('/api/pass', Data)
            .then(({ data }) => {
                // alert
                message.success(data.msg)
                // redirect to home page admin or user page
                if (data.state) push("/")
            })
    }
    return (
        <div>
            <form >
                <h1>   نسيت كلمة السر</h1>
                <Input title="الايميل" name='email' onChange={set} />
                <button onClick={send} className="mt-20">ارسال  </button>
            </form>
        </div>
    )
}
