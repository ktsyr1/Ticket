import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/server";
import { Storage } from "@/lib/firebase";

export async function getServerSideProps(ctx) {
    return AuthServerSide(ctx, async ({ query, config }) => {
        let url = `${process.env?.NEXT_PUBLIC_API}/admin/car-rental`
        if (query?.id) {
            const { data } = await axios.get(`${url}/${query?.id}`);
            return { data, config, query }
        } else return { config, query }
    });
}


export default function AdminCarRentalAdd({ data, config: headers, query }) {
    const router = useRouter();
    const { register, handleSubmit } = useForm(query?.id ? { defaultValues: data } : {});
    const [title, setTitle] = useState(query?.id ? "تحديث معلومات السيارة" : "إضافة سيارة جديدة");
    const [res, setRes] = useState({});

    const onSubmit = (formData) => {
        let NewData = { ...formData, ...res }

        let url = `/api${router.pathname.replace("/form", "").replace("?id=", "")}`
        let config = {
            method: query?.id ? "put" : 'post',
            url: `${url}/${query?.id ? query?.id : ""}`,
            data: query?.id ? { ...data, ...NewData } : NewData,
            headers
        }
        axios(config).then(({ data }) => {
            message.success("تمت إضافة السيارة بنجاح");
            router.push(url.replace("/api", ""));
        });
    };

    async function uploadImage(e) {
        const image = await Storage.add(e.target.files);
        setRes({ ...res, image: image[0] });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{title}</h1>

                <label htmlFor="brand">الماركة</label>
                <input type="text" id="brand" {...register("brand")} />

                <label htmlFor="model">الموديل</label>
                <input type="text" id="model" {...register("model")} />

                <label htmlFor="year">السنة</label>
                <input type="number" id="year" {...register("year")} />

                <label htmlFor="image">صورة السيارة</label>
                <input type="file" id="image" name="image" onChange={uploadImage} />

                <label htmlFor="price">السعر</label>
                <input type="number" id="price" {...register("price")} />

                <label htmlFor="transmission">ناقل الحركة</label>
                <input type="text" id="transmission" {...register("transmission")} />

                <label htmlFor="fuelType">نوع الوقود</label>
                <input type="text" id="fuelType" {...register("fuelType")} />

                <label htmlFor="insurance">التأمين</label>
                <textarea id="insurance"   {...register("insurance")} />
                

                <label htmlFor="seats">عدد المقاعد</label>
                <input type="number" id="seats" {...register("seats")} />

                <label htmlFor="duration">المدة</label>
                <input type="text" id="duration" {...register("duration")} />

                <label htmlFor="pickupLocation">مكان الاستلام</label>
                <input type="text" id="pickupLocation" {...register("pickupLocation")} />

                <label htmlFor="dropoffLocation">مكان التسليم</label>
                <input type="text" id="dropoffLocation" {...register("dropoffLocation")} />

                <div className=" box row my-20">
                <input type="checkbox" id="childSeat" {...register("childSeat")} />
                <label htmlFor="childSeat">كرسي الطفل</label>
</div>
                <label htmlFor="description">الوصف</label>
                <textarea id="description" {...register("description")} />

                <label htmlFor="priceIncludes">السعر يشمل</label>
                <textarea id="priceIncludes" {...register("priceIncludes")} />

                <div className="mt-20 w-full box row">
                    <button onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }} className="ml-10 btn p-10 w-full m-0 off">عودة</button>
                    <button type="submit" className="w-full">إضافة</button>
                </div>
            </form>
        </div>
    );
}
