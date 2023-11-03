import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/app2";
import { Storage } from "@/lib/firebase";
import { useState } from "react";
import { ButtonForm } from "@/theme/Elements";

export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, async ({ NEXT_PUBLIC_API, query, config }) => {
        let url = `${NEXT_PUBLIC_API}/admin/hotel-apartment/${ctx.query._id}`;
        let { data } = await axios.get(url, config);
        return { data, config, query: ctx.query };
    });
}


export default function EditHotel({ data, config, query }) {
    let route = useRouter();
    const { register, handleSubmit } = useForm({ defaultValues: data });
    let [res, setR] = useState()

    const onSubmit = (formData) => {
        let Data = { ...data, ...formData, ...res };

        // Send data to the server
        axios.put(`/api/admin/hotel-apartment/${query._id}`, Data, config)
            .then(({ data }) => {
                message.success("تم التحديث ");
                route.push('/admin/hotel-apartment');
            })
            .catch((error) => message.error("حدث خطأ أثناء التحديث "))
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

                <label htmlFor="rank">التقييم</label>
                <input type="range" id="rank" {...register("rank")} min="0" max="5" />

                <label htmlFor="image">صورة الفندق</label>
                <input type="file" id="image" name={"image"} onChange={upImage} />

                <label htmlFor="images">الصور</label>
                <input type="file" id="images" name={"images"} onChange={upImages} multiple />

                <label htmlFor="roomCount">   عدد الغرف  </label>
                <input type="text" id="roomCount" {...register("roomCount")} />

                <div className="box row aitem my-20" >
                    <input type="checkbox" id="breakfast" {...register("breakfast")} className="ml-10" />
                    <label htmlFor="breakfast"> فطور مجاني</label>
                </div>

                <label htmlFor="about">   الوصف</label>
                <textarea id="about" {...register("about")} />

                <label htmlFor="interiorFeatures">الميزات الداخلية</label>
                <textarea id="interiorFeatures" {...register("interiorFeatures")} />

                <label htmlFor="accommodationFeatures">ميزات الإقامة</label>
                <textarea id="accommodationFeatures" {...register("accommodationFeatures")} />

                <label htmlFor="generalDetails">  تفاصيل عامة</label>
                <textarea id="generalDetails" {...register("generalDetails")} />

                <ButtonForm />
            </form>
        </div>
    );
}
