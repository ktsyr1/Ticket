import { ITS } from "@/lib/app"
import { message } from "antd";
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/app2";

export async function getServerSideProps(ctx) {
        return await AuthServerSide(ctx, async ({ query, config }) => ({ config, query }))
}

export default function AddPost({ config, query }) {
        let route = useRouter()
        // let [Data, setData] = useState({})
        const { register, handleSubmit } = useForm();
        const onSubmit = res => {
                let image = ITS(res.image)
                delete res.image
                let data = { ...res, image }

                // send data to the server
                axios.post('/api/admin/posts', data, config)
                        .then(({ data }) => {
                                // alert
                                message.success("تم اضافة المنشور")
                                route.push('/admin/posts')
                        })
        }
        return (
                <div>
                        <form onSubmit={handleSubmit(onSubmit)}  >
                                <h1>اضافة منشور</h1>
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
                                <textarea {...register("content")} className="h-200">  </textarea>


                                <div className="mt-20 w-full box row">
                                        <button onClick={(e) => {
                                                e.preventDefault()
                                                route.back()
                                        }} className="ml-10 btn p-10 w-full m-0 off"  >عودة </button>
                                        <button type="submit" className="  w-full">اضافة</button>
                                </div>
                        </form>
                </div>
        )
}





