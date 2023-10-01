import { message, Popconfirm, Table } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthServerSide } from "@/lib/server";
import { Storage } from "@/lib/firebase";
import Link from "next/link";
import { IconChevronUp, IconChevronDown, IconCashBanknote, IconCoin, } from '@tabler/icons-react';

export async function getServerSideProps(ctx) {
    return AuthServerSide(ctx, async ({ query, config }) => {
        let url = `${process.env?.NEXT_PUBLIC_API}/admin/program`
        if (query?.id) {
            const { data } = await axios.get(`${url}/${query?.id}`);
            return { data, config, query }
        } else return { config, query }
    });
}


export default function AdminCarRentalAdd({ data, config }) {
    return <div className="box grid"><Plans data={data.plan} config={config} /></div>
}

function Plans(props) {
 const router = useRouter();
    let upImg = async e => await Storage.add(e.target.files).then(a => a[0])
    const [data, setData] = useState(props?.data.sort((a, b) => b.sortDay + a.sortDay))
    const { register, handleSubmit, reset } = useForm()
    const [viewForms, setViewForms] = useState(false);
    const { query } = useRouter();
    // const [One, setOne] = useState({});
    const [title, setTitle] = useState("تحديث معلومات البرنامج");
    useEffect(() => {

        let config = {
            method: "put",
            url: `/api/admin/program/${query?.id}`,
            data: {plan:data},
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
        let sortArray = [...data, { ...DATA, sortDay: data.length ? data.length + 1 : 1 }]
        sortArray = sortArray.sort((a, b) => b.sortDay + a.sortDay);

        // put to api
        setData(sortArray)
        reset({})
        setViewForms(!viewForms)
    }

    function Forms() {
        return (
            <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'fixed', zIndex: '10' }}>
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
