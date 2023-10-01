import { message, Popconfirm, Table } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/server";
import { Storage } from "@/lib/firebase";
import Link from "next/link";

export async function getServerSideProps(ctx) {
    return AuthServerSide(ctx, async ({ query, config }) => {
        let url = `${process.env?.NEXT_PUBLIC_API}/admin/program`
        if (query?.id) {
            const { data } = await axios.get(`${url}/${query?.id}`);
            return { data, config, query }
        } else return { config, query }
    });
}

let upImg = async e => await Storage.add(e.target.files).then(a => a[0])

export default function AdminCarRentalAdd({ data, config: headers, query }) {
    const router = useRouter();
    const { register, handleSubmit } = useForm(query?.id ? { defaultValues: data } : {});
    const [title, setTitle] = useState(query?.id ? "تحديث معلومات البرنامج" : "إضافة برنامج جديدة");
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
            message.success(`تمت ${title} بنجاح`);
            router.push(url.replace("/api", ""));
        });
    };


    return (
        <div className="box grid">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{title}</h1>

                {/* حقول النموذج */}
                <label htmlFor="title">العنوان</label>
                <input type="text" id="title" {...register("title")} />

                <label>المدة</label>
                <input type="text" {...register("duration")} />

                <label>السعر</label>
                <input type="number" {...register("price")} />

                <label>كم شخص يشمل السعر</label>
                <input type="text" {...register("numberOfPeople")} />

                <label>الوصف</label>
                <textarea {...register("description")} />

                <label>نظرة عامة</label>
                <textarea {...register("overview")} />

                {/* إضافة صورة */}
                <label htmlFor="image">صورة البرنامج</label>
                <input type="file" id="image" name="image" onChange={async e => setRes({ image: await upImg(e) })} />

                <div className="mt-20 w-full box row">
                    <button onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }} className="ml-10 btn p-10 w-full m-0 off">عودة</button>
                    <button type="submit" className="w-full">{query?.id ? "تحديث" : "إضافة"}</button>
                </div>
            </form>
            <Plans data={data.plan} />
        </div>
    );
}

function Plans(props) {
    const [data, setData] = useState(props?.data)
    const { register, handleSubmit } = useForm()
    const [viewForms, setViewForms] = useState(false);
    const { query } = useRouter();
    const [One, setOne] = useState({});

    function Btn({ id }) {
        function Delete(_id) {
            //     let url = `${props.url}/${_id}`;
            //     axios.delete(url, props.config)
            //         .then(({ data: D }) => {
            //             message.success(D.msg);
            //             let filter = data.filter(a => a._id.toString() !== _id);
            //             setData(filter);
            //         });
        }
        return (
            <Popconfirm title="هل أنت متأكد من حذف البرنامج" onConfirm={() => Delete(id)} okText="نعم" cancelText="لا">
                <button className="err">حذف</button>
            </Popconfirm>
        );
    }
    const columns = [
        {
            title: "العنوان", dataIndex: "title", key: "title",
            render: (_, record) => <Link href={`/admin/program/form?id=${record._id}`}>{record.title}</Link>
        },
        { title: "وصف", dataIndex: "description", key: "description" },
        { title: "أنشطة", dataIndex: "activities", key: "activities" },
        {
            title: "الإجراءات", dataIndex: "actions", key: "actions",
            render: (_, record) => (
                <>
                    <Btn id={record._id} />
                    <button>up</button>
                    <button>down</button>
                </>
            )
        },
    ];
    let onSubmit = (DATA) => { console.log(DATA); }
    
    function Forms() {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{title}</h1>

                <label htmlFor="title">العنوان</label>
                <input type="text" id="title" {...register("title")} />

                <label>الوصف</label>
                <textarea {...register("description")} />

                <label htmlFor="activities">الانشطة</label>
                <input type="text" id="activities" {...register("activities")} />

                {/* إضافة صورة */}
                <label htmlFor="image">صورة البرنامج</label>
                <input type="file" id="image" name="image" onChange={async e => setOne({ image: await upImg(e) })} />

                <div className="mt-20 w-full box row">
                    <button onClick={(e) => {
                        e.preventDefault();
                        setViewForms(false)
                    }} className="ml-10 btn p-10 w-full m-0 off">عودة</button>
                    <button type="submit" className="w-full">{query?.id ? "تحديث" : "إضافة"}</button>
                </div>
            </form>
        )
    }
    return (
        <main className="box col m-10 bord w-full">
            <div className="aitem   box m-10 grid">
                <h1> الخطط</h1>
                <button onClick={e => setViewForms(true)} >اضافة</button>
            </div>
            {viewForms ?
                <Forms />
                : <></>}
            {/* جدول عرض البرامج */}
            <Table rowKey={record => record._id} dataSource={data} columns={columns} pagination={false} />
        </main>
    );

}
