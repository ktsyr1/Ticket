import axios from "axios";
import { Popconfirm, Table, message } from "antd";
import { AuthServerSide } from "@/lib/app2";
import { useState } from "react";
import LineHeader from "@/theme/lineHeader";
import Link from "next/link";
import { LineTitlesAdmin } from "@/theme/Elements";

export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, async ({ NEXT_PUBLIC_API, config }) => {
        let url = `${NEXT_PUBLIC_API}/admin/hotels`
        let { data } = await axios.get(url, config);
        return { data, config, url };
    });
}
export default function HotelPage(props) {

    let [data, setD] = useState(props.data);

    function Delete(_id) {
        let url = `${props.url}/${_id}`;
        axios
            .delete(url, props.config)
            .then(({ data: D }) => {
                message.success(D.msg);
                let filter = data.filter((a) => a._id.toString() !== _id);
                setD(filter);
            })
            .catch(err => message.error("حدث خطأ أثناء حذف العنصر."))
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
            title: "اسم الفندق", dataIndex: "name", key: "name",
            render: (_, record) => <Link href={`/admin/hotels/${encodeURIComponent(record._id)}`}>{record.name}</Link>,
        },
        { title: "التقييم", dataIndex: "rank", key: "rank", },
        { title: "المدينة", dataIndex: "city", key: "city", },
        { title: "العنوان", dataIndex: "address", key: "address", },
        {
            title: "حذف", dataIndex: "delete", key: "delete",
            render: (_, record) => <Btn id={record._id} />,
        },
    ];

    return (
        <main className="bord box m-10 col w-full">
            <LineTitlesAdmin data={[]} />
            <div className="aitem box m-10 grid">
                <h1 className="text-xl font-semibold mb-4">قائمة الفنادق</h1>
                <Link href="/admin/hotels/add" className="btn mx-10"> إضافة </Link>
            </div>
            <Table dataSource={data} columns={columns} />
        </main>
    );
}