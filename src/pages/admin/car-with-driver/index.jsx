import { Popconfirm, Table, message } from "antd";
import axios from "axios";
import Link from "next/link"; 
import { useState } from "react";
import { AuthServerSide } from "@/lib/app2"; 
import { LineTitlesAdmin } from "@/theme/Elements";

export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, async ({ NEXT_PUBLIC_API, config }) => {
        let url = `${NEXT_PUBLIC_API}/admin/car-with-driver`;
        let { data } = await axios.get(url, config);

        return { data, config, url };
    });
}

export default function CarWithDriverAdmin(props) {
    let [data, set] = useState(props.data);

    function Delete(_id) {
        let url = `${props.url}/${_id}`;

        axios
            .delete(url, props.config)
            .then(({ data: D }) => {
                message.success(D.msg);
                let filter = data.filter((a) => a._id.toString() !== _id);
                set(filter);
            })
            .catch((error) => {
                message.error("حدث خطأ أثناء حذف العنصر.");
            });
    }

    function Btn({ id }) {
        return (
            <Popconfirm
                title="هل أنت متأكد من حذف السجل؟"
                onConfirm={() => Delete(id)}
                okText="نعم"
                cancelText="لا"
            >
                <button className="err">حذف</button>
            </Popconfirm>
        );
    }

    const columns = [
        {
            title: "العنوان",
            dataIndex: "title",
            key: "title",
            render: (_, record) => (
                <Link href={`/admin/car-with-driver/${record._id}`}>
                    {record.title}
                </Link>
            ),
        },
        {
            title: "المدينة",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "مدة الجولة",
            dataIndex: "tourDuration",
            key: "tourDuration",
        },
        {
            title: "السائق",
            dataIndex: "driver",
            key: "driver",
        },
        {
            title: "السعر",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "حذف",
            dataIndex: "delete",
            key: "delete",
            render: (_, record) => <Btn id={record._id} />,
        },
    ];

    return (
        <main className="bord box m-10 col w-full">
            <LineTitlesAdmin data={[]} />

            {/* header */}
            <div className="aitem box m-10 grid">
                <h1>قائمة السيارة مع السائق</h1>
                <Link href="/admin/car-with-driver/add" className="btn mx-10">
                    إضافة
                </Link>
            </div>
            {/* table */}
            <Table  rowKey={record => record._id} dataSource={data} columns={columns} pagination={false} />
        </main>
    );
}
