import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/app2";
import { useState } from "react";
import { Storage } from "@/lib/firebase";

export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, async ({ NEXT_PUBLIC_API, query, config }) => {
        let url = `${NEXT_PUBLIC_API}/admin/car-with-driver/${ctx.query._id}`;
        let { data } = await axios.get(url, config);
        return { data, config, query: ctx.query };
    });
}

export default function EditCarWithDriver({ data, config, query }) {
    const { register, handleSubmit } = useForm({ defaultValues: data });
    let [res, setR] = useState()
    let route = useRouter();

    const onSubmit = (formData) => {
        let data = { ...formData, ...res };


        // Send updated data to the server
        axios.put(`/api/admin/car-with-driver/${query._id}`, data, config)
            .then(({ data }) => {
                message.success("تم تعديل السيارة مع السائق");
                route.push('/admin/car-with-driver');
            })
            .catch((error) => {
                message.error("حدث خطأ أثناء تعديل السيارة مع السائق");
            });
    }

    async function upImage(e) {
        let image = await Storage.add(e.target.files)
        setR({ ...res, carImage: image[0] })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>تعديل سيارة مع السائق</h1>

            <label htmlFor="title">العنوان</label>
            <input type="text" id="title" {...register("title")} />

            <label htmlFor="city">المدينة</label>
            <input type="text" id="city" {...register("city")} />

            <label htmlFor="carImage">صورة السيارة</label>
            <input type="file" id="carImage" {...register("carImage")} onChange={upImage} />

            <label htmlFor="duration">المدة</label>
            <input type="text" id="duration" {...register("duration")} />

            <label htmlFor="driver">السائق</label>
            <input type="text" id="driver" {...register("driver")} />

            <label htmlFor="tourDuration">مدة الجولة</label>
            <input type="text" id="tourDuration" {...register("tourDuration")} />

            <label htmlFor="price">السعر</label>
            <input type="number" id="price" {...register("price")} />

            <label htmlFor="additionalFeatures">مزايا إضافية (فصل بينها بفاصلة)</label>
            <input type="text" id="additionalFeatures" {...register("additionalFeatures")} />

            <label htmlFor="programDetails">تفاصيل البرنامج</label>
            <textarea id="programDetails" {...register("programDetails")} />

            <div className="mt-20 w-full box row">
                <button onClick={(e) => {
                    e.preventDefault();
                    route.back();
                }}
                    className="ml-10 btn p-10 w-full m-0 off" > عودة </button>
                <button type="submit" className="w-full">تعديل</button>
            </div>
        </form>
    );
}
