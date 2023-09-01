import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/app2";

export async function getServerSideProps(ctx) {
  return await AuthServerSide(ctx, async ({ query, config }) => ({ config, query }));
}

export default function AddCarWithDriver({ config, query }) {
  let route = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    let data = {
      ...formData,
      // additionalFeatures: formData.additionalFeatures?.split(","),
    };

    // Send data to the server
    axios.post('/api/admin/car-with-driver', formData, config)
      .then(({ data }) => {
        message.success("تم إضافة السيارة مع السائق");
        route.push('/admin/car-with-driver');
      })
      .catch((error) => {
        message.error("حدث خطأ أثناء إضافة السيارة مع السائق");
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>إضافة سيارة مع السائق</h1>

        <label htmlFor="title">العنوان</label>
        <input type="text" id="title" {...register("title")} />

        <label htmlFor="city">المدينة</label>
        <input type="text" id="city" {...register("city")} />

        {/* <label htmlFor="carImage">صورة السيارة</label>
        <input type="file" id="carImage" {...register("carImage")} /> */}

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
          <button
            onClick={(e) => {
              e.preventDefault();
              route.back();
            }}
            className="ml-10 btn p-10 w-full m-0 off"
          >
            عودة
          </button>
          <button type="submit" className="w-full">
            إضافة
          </button>
        </div>
      </form>
    </div>
  );
}
