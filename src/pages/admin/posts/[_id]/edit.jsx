import axios from "axios"
import { useState } from "react"

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { AuthServerSide } from "@/lib/app2";

export async function getServerSideProps(ctx) {
        return await AuthServerSide(ctx, async ({ NEXT_PUBLIC_API, query, config }) => {
                let url = `${NEXT_PUBLIC_API}/admin/posts/${ctx.query._id}`
                let { data } = await axios.get(url, config);

                return { data, config, query: ctx.query }
        })
}

export default function AddPost({ data, config, query }) {
        const { register, handleSubmit } = useForm({ defaultValues: data });
        let route = useRouter()
        const onSubmit = res => {
                // const file = res.image
                // if (file) {
                //         const reader = new FileReader();
                //         reader.onloadend = () => res["image"] = reader.result
                //         reader.readAsDataURL(file[0]);
                // } else res["image"] = "/images/no-image.png"

                axios.put(`/api/admin/posts/${query._id}`, res, config)
                        .then(({ data }) => {
                                // alert
                                message.success("تم تعديل المنشور")
                                route.push('/admin/posts')
                                // redirect to home page admin or user page

                        })
        }
        return (
                <form onSubmit={handleSubmit(onSubmit)}  >
                        <h1>تعديل منشور</h1>
                        <label htmlFor="title"  >العنوان</label>
                        <input type="text" id="title" {...register("title")} />

                        <label htmlFor="url"  >الرابط   </label>
                        <input type="text" id="url" {...register("url")} />

                        <label htmlFor="cat"  >التصنيف   </label>
                        <input type="text" id="cat" {...register("cat")} />

                        <label htmlFor="image"  >الصورة   </label>
                        <input type="file" id="image" {...register("image")} />

                        <label htmlFor="bio"  >الوصف   </label>
                        <input type="text" id="bio" {...register("bio")} />

                        <label   >المحتوى   </label>
                        <textarea {...register("content")} className="h-200" >  </textarea>


                        <div className="mt-20 w-full box row">
                                <button onClick={(e) => {
                                        e.preventDefault()
                                        route.back()
                                }} className="ml-10 btn p-10 w-full m-0 off"  >عودة </button>
                                <button type="submit" className="  w-full">اضافة</button>
                        </div>
                </form>
        )
}





