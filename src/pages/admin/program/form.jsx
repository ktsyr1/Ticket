import { message, Popconfirm, Table } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/server";
import { Storage } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';

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
        <div className="box grid j">
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

                <label>السعر يشمل </label>
                <textarea {...register("includes")} />

                <label>السعر لا يشمل </label>
                <textarea {...register("excludes")} />

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
            {data?.plan ? <Plans data={data?.plan} config={headers} /> : <></>}
        </div>
    )
}

function Plans(props) {
    let upImg = async e => await Storage.add(e.target.files).then(a => a[0])
    const [data, setData] = useState(props?.data.sort((a, b) => b.sortDay + a.sortDay))
    const { register, handleSubmit, reset } = useForm()
    const [viewForms, setViewForms] = useState(false);
    const { query } = useRouter();
    const [res, setRes] = useState({});
    // const [One, setOne] = useState({});
    const [title, setTitle] = useState("تحديث معلومات البرنامج");
    useEffect(() => {

        let config = {
            method: "put",
            url: `/api/admin/program/${query?.id}`,
            data: { plan: data },
            headers: props.config
        }
        axios(config).then(({ data }) => {
            message.success(`تمت ${title} بنجاح`);
        });
    }, [data])
    function Btn({ sortDay }) {
        function Delete() {
            let filter = data.filter(a => a.sortDay !== sortDay);
            let newSD = filter.map((a, i) => ({ ...a, sortDay: i + 1 }))
            newSD = newSD.sort((a, b) => b.sortDay + a.sortDay)

            setData(newSD);
            // put to api
        }
        return (
            <Popconfirm title="هل أنت متأكد من حذف البرنامج" onConfirm={Delete} okText="نعم" cancelText="لا">
                <button className="err">حذف</button>
            </Popconfirm>
        );
    }
    function setSort(i, moveUp) {
        let array = data
        i--
        const target = array[i];
        const newI = moveUp ? i - 1 : i + 1;
        if (newI < array.length || i < 1) {
            array[i] = array[newI]
            array[newI] = target

            array = array.map((a, i) => ({ ...a, sortDay: i + 1 }))

            // put to api
            setData(array)
        }
    }
    function Sorting({ _ }) {
        if (data.length > 1) {
            let i = _.sortDay
            let BTN = (I, up, _if) => _if ? <button className="mx-5" onClick={() => setSort(i, up)} > <I /></button> : <div style={{ width: '90px' }} />
            return (
                <div className="w-full box row">
                    {BTN(IconChevronUp, true, i > 1)}
                    {BTN(IconChevronDown, false, data.length > i)}
                </div>
            )
        } else return <></>
    }

    const columns = [
        {
            title: "العنوان", dataIndex: "title", key: "title",
            // render: (_, record) => <Link href={`/admin/program/form?id=${record._id}`}>{record.title}</Link>
        },
        { title: "وصف", dataIndex: "description", key: "description" },
        { title: "أنشطة", dataIndex: "activities", key: "activities" },
        { title: "ترتيب اليوم", dataIndex: "sortDay", key: "sortDay" },
        {
            title: "الإجراءات", dataIndex: "actions", key: "actions",
            render: (_, record) => (
                <div className="box row">
                    <Btn sortDay={record.sortDay} />
                    <Sorting _={record} />
                </div>
            )
        },
    ];
    let onSubmit = (DATA) => {
        let sortArray = [...data, { ...DATA, ...res, sortDay: data.length ? data.length + 1 : 1 }]
        sortArray = sortArray.sort((a, b) => b.sortDay + a.sortDay);

        // put to api
        setData(sortArray)
        reset({})
        setViewForms(!viewForms)
    }

    function Forms() {
        return (
            <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'fixed', zIndex: '10', top: '80px', right: '0', left: '0' }} >
                <h1>{title}</h1>

                <label htmlFor="title">العنوان</label>
                <input type="text" id="title" {...register("title")} />

                <label>الوصف</label>
                <textarea {...register("description")} />

                <label htmlFor="activities">الانشطة</label>
                <input type="text" id="activities" {...register("activities")} />

                {/* إضافة صورة */}
                <label htmlFor="image">صورة البرنامج</label>
                <input type="file" id="image" name="image" onChange={async e => setRes({ image: await upImg(e) })} />

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
        <main className="box col m-10 bord page">
            <div className="aitem   box m-10 grid">
                <h1 className="mx-10"> الخطط</h1>
                <button onClick={e => setViewForms(!viewForms)} >اضافة</button>
            </div>
            {viewForms ?
                <Forms />
                : <></>}
            {/* جدول عرض البرامج */}
            <Table dataSource={data} columns={columns} className="programs" pagination={false} rowKey={record => record.title} />
        </main>
    );

}
