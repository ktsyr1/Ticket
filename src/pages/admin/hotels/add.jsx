import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/app2";
import { useState } from "react";
import { Storage } from "@/lib/firebase";

export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, async ({ query, config }) => ({ config, query }));
}

export default function AddHotel({ config, query }) {
    let route = useRouter();
    const { register, handleSubmit } = useForm();
    let [res, setR] = useState()

    const onSubmit = (formData) => {

        let data = { ...formData, ...res };

        // Send data to the server
        axios.post('/api/admin/hotels', data, config)
            .then(({ data }) => {
                message.success("تم إضافة الفندق");
                route.push('/admin/hotels');
            })
            .catch((error) => message.error("حدث خطأ أثناء إضافة الفندق"))
    }
    async function upImage(e) {
        let image = await Storage.add(e.target.files)
        setR({ ...res, image: image[0] })
    }
    async function upImages(e) {
        let images = await Storage.add(e.target.files)
        setR({ ...res, images })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>إضافة فندق</h1>

                <label htmlFor="name">اسم الفندق</label>
                <input type="text" id="name" {...register("name")} />

                <label htmlFor="category">التقييم</label>
                <input type="range" id="rank" {...register("rank")} min="0" max="5" />

                <label htmlFor="city">المدينة</label>
                <input type="text" id="city" {...register("city")} />

                <label htmlFor="address">العنوان</label>
                <input type="text" id="address" {...register("address")} />

                <label htmlFor="image">صورة الفندق</label>
                <input type="file" id="image" name={"image"} onChange={upImage} />

                <label htmlFor="images">الصور</label>
                <input type="file" id="images" name={"images"} onChange={upImages} multiple />

                <label htmlFor="description">الوصف</label>
                <textarea id="description" {...register("description")} />

                <label htmlFor="surroundingArea">المنطقة المحيطة بالفندق</label>
                <textarea id="surroundingArea" {...register("surroundingArea")} />

                <b>الخدمات</b>
                <div className="box row aitem" >
                    <input type="checkbox" id="services.freeWiFi" {...register("services.freeWiFi")} className="ml-10" />
                    <label htmlFor="services.freeWiFi">wifi مجاني</label>
                </div>

                <div className="box row aitem" >
                    <input type="checkbox" id="services.freeParking" {...register("services.freeParking")} className="ml-10" />
                    <label htmlFor="services.freeParking">موقف سيارات مجاني</label>
                </div>

                <div className="box row aitem" >
                    <input type="checkbox" id="services.breakfast" {...register("services.breakfast")} className="ml-10" />
                    <label htmlFor="services.breakfast"> فطور مجاني</label>
                </div>

                <div className="mt-20 w-full box row">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            route.back();
                        }}
                        className="ml-10 btn p-10 w-full m-0 off" > عودة </button>
                    <button type="submit" className="w-full"> إضافة </button>
                </div>
            </form>
        </div>
    );
}
