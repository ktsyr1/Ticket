"use client"

import { Input, setChange } from "@/lib/app";
import { useState } from "react";
import { useRouter } from "next/router"
import axios from "axios";
import { AuthServerSide } from "@/lib/app2";
import { message } from "antd";
export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, 'user', async ({ NEXT_PUBLIC_API, query, config }) => {
        let url = `${NEXT_PUBLIC_API}/client/user`
        let { data } = await axios.get(url, config);
        return { data, config }
    })
}
export default function UserEdit({ data, config }) {
    let [Data, setData] = useState(data)
    let set = e => setChange(e, Data, setData)
    let route = useRouter()

    function send(e) {
        e.preventDefault()
        // send data to the server
        axios.put('/api/client/user', Data, config)
            .then(({ data }) => {
                // alert
                message.success("تم تحديث المعلومات")
                // redirect to home page admin or user page
                route.push('/user/profile')
            })
    }
    return (
        <form className="w-300 m-a " onChange={set}>
            <h1>تحديث معلومات الحساب</h1>
            <Input name="fullname" title="الاسم الكامل" defaultValue={data?.fullname} />
            <Input name="email" title="الايميل" defaultValue={data?.email} />
            <Input name="wa" title="رقم الهاتف" defaultValue={data?.wa} />
            <button onClick={send} className="mt-20"> تحديث </button>

        </form>
    )
}
