import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { message, Popconfirm, Table } from "antd";
import { AuthServerSide } from "@/lib/server";
import { LineTitlesAdmin } from "@/theme/Elements";

export async function getServerSideProps(ctx) {
    return AuthServerSide(ctx, async (cookies, query, config) => {
        const url = `${process.env?.NEXT_PUBLIC_API}/admin/program`;
        const { data } = await axios.get(url, config);
        return { data, config, url };
    });
}

export default function AdminProgram(props) {
    const [data, setData] = useState(props?.data);

    function Delete(_id) {
        let url = `${props.url}/${_id}`;
        axios.delete(url, props.config)
            .then(({ data: D }) => {
                message.success(D.msg);
                let filter = data.filter(a => a._id.toString() !== _id);
                setData(filter);
            });
    }

    function Btn({ id }) {
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
        { title: "المدة", dataIndex: "duration", key: "duration" },
        { title: "السعر", dataIndex: "price", key: "price" },
        { title: "عدد الأشخاص", dataIndex: "numberOfPeople", key: "numberOfPeople" },
        { title: "وصف", dataIndex: "description", key: "description" },
        { title: "نظرة عامة", dataIndex: "overview", key: "overview" },
        {
            title: "الإجراءات", dataIndex: "actions", key: "actions",
            render: (_, record) => <Btn id={record._id} />
        },
    ];

    return (
        <main className="box col m-10 bord w-full">
            <LineTitlesAdmin data={[]} />

            {/* header */}
            <div className="aitem   box m-10 grid">
                <h1>إدارة البرامج</h1>
                <Link href="/admin/program/form" className="btn mx-10">اضافة </Link>
            </div>
            {/* جدول عرض البرامج */}
            <Table rowKey={record => record._id} dataSource={data} columns={columns} pagination={false} />
        </main>
    );
}
