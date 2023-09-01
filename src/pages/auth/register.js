"use client"
import { message } from "antd"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";

export async function getServerSideProps(ctx) {
    let { token } = ctx.req.cookies

    if (token && token.length < 20) return { redirect: { permanent: false, destination: '/' } }
    else return { props: {} }
}

export default function Signup() {
    const { register, handleSubmit } = useForm();

    let route = useRouter()
    const onSubmit = res => {
        if (route.query.token) {
            axios.post('/api/auth', { ...res, token: route.query.token })
                .then(async ({ data }) => {
                    // alert
                    if (data.token) {
                        message.success("تم التسجيل  ")
                        // set token in cookie
                        Cookies.set('token', data.token)
                        // redirect to home user page
                        location.replace("/")

                    } else if (data.error) message.success(data.error, "err");
                })
        } else message.error("غير متاح لك التسجيل")
    }
    return (
        <form className='bord box col p-20 center ' onSubmit={handleSubmit(onSubmit)}>
            <h1>التسجيل</h1>
            <label htmlFor="fullname"  >الاسم الكامل </label>
            <input type="text" id="fullname" {...register("fullname")} />

            <label htmlFor="password"  >كلمة السر </label>
            <input type="password" id="password" {...register("password")} />

            <input type='submit' className="btn mt-20 w-full" value={"تسجيل"} />

        </form>
    )
}
