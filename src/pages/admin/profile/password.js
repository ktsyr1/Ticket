"use client"
import { Input, setChange } from "@/lib/app"
import axios from "axios"
import Cookies from "js-cookie"
import { useState } from "react"
import { useRouter } from "next/router"
import { AuthServerSide } from "@/lib/app2"
import { message } from "antd"

export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, 'user', async ({ NEXT_PUBLIC_API, query, config }) => {
        return { config }
    })
}

export default function Login({ config }) {
    let [Data, setData] = useState({})
    let set = e => setChange(e, Data, setData)
    let route = useRouter()
    function send(e) {
        e.preventDefault()
        // send data to the server
        if (Data.newpassword === Data.renewpassword) {

            axios.put('/api/pass', Data, config)
                .then(({ data }) => {
                    // this code
                    // alert
                    message.success(data.msg)
                    // redirect to home page admin or user page
                    route.push('/user/profile')
                })
        } else message.error("كلمة المرور غير متطابقة")
    }
    return (
        <div>
            <form >
                <h1>   تغيير كلمة السر</h1>
                <Input title="كلمة السر القديمة" type='password' name='password' onChange={set} />
                <Input title="كلمة السر الجديدة" type='password' name='newpassword' onChange={set} />
                <Input title="اعادة كلمة السر الجديدة" type='password' name='renewpassword' onChange={set} />

                <button onClick={send} className="mt-20">ارسال  </button>
            </form>
        </div>
    )
}
