import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { message, Popconfirm, Table } from "antd";
import { AuthServerSide } from "@/lib/server";
import { LineTitlesAdmin } from "@/theme/Elements";

export async function getServerSideProps(ctx) {
    return AuthServerSide(ctx, async (cookies, query, config) => {
        const url = `${process.env?.NEXT_PUBLIC_API}/admin/car-rental`;
        console.log({ url });
        const { data } = await axios.get(url, config);
        return { data, config, url };
    });
}

export default function AdminCarRental(props) {
    const [data, setData] = useState(props?.data);

    function Delete(_id) {
        const url = `${props.url}/${_id}`;
        axios.delete(url, props.config)
            .then(({ data: D }) => {
                message.success(D.msg);
                const filter = data.filter(a => a._id.toString() !== _id);
                setData(filter);
            });
    }

    function RenderDeleteButton({ id }) {
        return (
            <Popconfirm
                title="هل أنت متأكد من حذف العنصر؟"
                onConfirm={() => Delete(id)}
                okText="نعم"
                cancelText="لا"
            >
                <button className="err">حذف</button>
            </Popconfirm>
        )
    }
    const columns = [
        {
            title: "الماركة - الموديل - السنة", dataIndex: "brand", key: "brand",
            render: (_, record) => (
                <Link href={`${props.url.replace("/api", "")}/form?id=${record._id}`}>
                    {record.brand} - {record.model} - {record.year}
                </Link>
            )
        },
        { title: "ناقل الحركة", dataIndex: "transmission", key: "transmission", },
        { title: "السعر", dataIndex: "price", key: "price", },
        { title: "عدد المقاعد", dataIndex: "seats", key: "seats", },
        { title: "المدة", dataIndex: "duration", key: "duration", },
        {
            title: "كرسي الأطفال",
            dataIndex: "childSeats",
            key: "childSeats",
            render: (text) => (text ? "نعم" : " لا يوجد"),
        },
        {
            title: "حذف",
            key: "delete",
            render: (_, record) => <RenderDeleteButton id={record._id} />
        },
    ];


    return (
        <main className="bord box m-10 col w-full">
            <LineTitlesAdmin data={[]} />

            {/* header */}
            <div className="aitem   box m-10 grid">
                <h1>   ايجار سيارات</h1>
                <Link href="/admin/car-rental/form" className="btn mx-10">اضافة </Link>
            </div>
            {/* table */}
            <Table rowKey={record => record._id} dataSource={data} columns={columns} pagination={false} />
        </main>
    );
}
