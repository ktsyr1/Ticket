
import axios from "axios";
import { AuthServerSide } from "@/lib/app2";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { Table, message } from "antd";

export async function getServerSideProps(ctx) {
    return await AuthServerSide(ctx, 'user', async ({ NEXT_PUBLIC_API, query, config }) => {
        let url = `${NEXT_PUBLIC_API}/client/user`
        let { data } = await axios.get(url, config);
        return { data, config }
    })
}
// { user, accounts }
export default function UserProfile({ data, config }) {
    let route = useRouter()
    function logout(e) {
        Object.keys(Cookies.get()).forEach((cn) => Cookies.remove(cn));
        route.reload("/")
    }
    let [select, setSelect] = useState(JSON.parse(config?.headers?.account))
    async function DEL(record) {
    }
    function setAC(record) { // set account cookies
        Cookies.set('account', JSON.stringify(record))
        setSelect(record)
        message.success(`تم اختيار ${record.title}`)
    }
    const columns = [
        { title: "الاسم", dataIndex: "title", key: "title", },
        { title: "اسم المستخدم", dataIndex: "account_id", key: "account_id", },
        {
            title: "  حذف", dataIndex: "delete", key: "delete",
            render: (_, record) => <button onClick={() => DEL(record)}> حذف</button>
        },
        {
            title: "اختيار", dataIndex: "select", key: "select",
            render: (_, record) => {
                if (record._id != select?._id) return <button onClick={() => setAC(record)}> اختيار</button >
                else return <p>تم الاختيار</p>
            }
        },
    ];
    return (
        <div >
            <div className="box col aitem bord m-a w-300 h-300 space">
                <h1>{data?.user?.fullname}</h1>
                <p>{data?.user?.email}</p>
                <p>{data?.user?.wa}</p>
                <div className="w-full ">
                    <Link href={'/user/profile/edit'} className="btn w-full box my-10  j" >تعديل الملف الشخصي</Link>
                    <Link href={'/user/profile/password'} className="btn w-full box my-10  j" >تغيير كلمة المرور    </Link>
                    <button className="w-full" onClick={logout}>تسجيل خروج</button>
                </div>
            </div>
            <div className="box grid aitem bord m-10 p-10">
                <h1>   الحسابات الاعلانية</h1>
                <Link href={`/user/accounts/add`} className="btn mx-10">اضافة حساب جديد</Link>
            </div>
            {data?.accounts.length > 0 ? <Table  rowKey={record => record._id} dataSource={data.accounts} columns={columns} pagination={false} /> : ""}

        </div>
    )
}
