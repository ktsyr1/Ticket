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
        axios.post('/api/admin/hotel-apartment', data, config)
            .then(({ data }) => {
                message.success("تم إضافة الشقق الفندقية");
                route.push('/admin/hotel-apartment');
            })
            .catch((error) => message.error("حدث خطأ أثناء إضافة الشقة الفندقية"))
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
                <h1>إضافة شقة فندقية</h1>

                <label htmlFor="name">اسم الشقة الفندقية</label>
                <input type="text" id="name" {...register("name")} />

                <label htmlFor="city">   المدينة  </label>
                <input type="text" id="name" {...register("city")} />

                <label htmlFor="image">صورة الفندق</label>
                <input type="file" id="image" name={"image"} onChange={upImage} />

                <label htmlFor="images">الصور</label>
                <input type="file" id="images" name={"images"} onChange={upImages} multiple />

                <label htmlFor="about">   الوصف</label>
                <textarea id="about" {...register("about")} />

                <label htmlFor="interiorFeatures">الميزات الداخلية</label>
                <textarea id="interiorFeatures" {...register("interiorFeatures")} />

                <label htmlFor="accommodationFeatures">ميزات الإقامة</label>
                <textarea id="accommodationFeatures" {...register("accommodationFeatures")} />

                <label htmlFor="generalDetails">  تفاصيل عامة</label>
                <textarea id="generalDetails" {...register("generalDetails")} />

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

