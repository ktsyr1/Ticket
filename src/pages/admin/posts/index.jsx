
import { Popconfirm, Table, message } from "antd";
import axios from "axios";
import Link from "next/link";
import LineHeader from "@/theme/lineHeader";
import { useState } from "react";
import { AuthServerSide } from "@/lib/app2";
import { LineTitlesAdmin } from "@/theme/Elements";

export async function getServerSideProps(ctx) {
	return await AuthServerSide(ctx, async ({ NEXT_PUBLIC_API, config }) => {
		let url = `${NEXT_PUBLIC_API}/admin/posts`
		let { data } = await axios.get(url, config);

		return { data, config, url }
	})
}

export default function Posts(props) {
	let [data, set] = useState(props.data)

	function Delete(_id) {
		// this code 
		let url = `${props.url}/${_id}`

		axios.delete(url, props.config)
			.then(({ data: D }) => {
				message.success(D.msg)
				let filter = data.filter(a => a._id.toString() != _id)
				set(filter)
			})
	}
	function Btn({ id }) {
		return (
			<Popconfirm title="هل أنت متأكدة من حذف المنشور" onConfirm={() => Delete(id)} okText="نعم" cancelText="لا" >
				<button className="err"  >حذف </button>
			</Popconfirm>
		)
	}
	const columns = [
		{
			title: "الاسم", dataIndex: "title", key: "title",
			render: (_, record) => <Link href={`/admin/posts/${record._id}/edit`} className="  w-50 box j" >{record.title}</Link>
		}, {
			title: "التصنيف", dataIndex: "cat", key: "cat",
			render: (_, record) => <>{record?.cat?.map(a => a)}</>
		},
		{ title: " تاريخ الانشاء ", dataIndex: "create_at", key: "create_at", },
		{ title: "حذف", dataIndex: "delete", key: "delete", render: (_, record) => <Btn id={record._id} /> }
	];

	return (
		<main className="  bord box m-10 col w-full">
			<LineTitlesAdmin data={[]} />

			{/* header */}
			<div className="aitem   box m-10 grid">
				<h1> المنشورات</h1>
				<Link href="/admin/posts/add" className="btn mx-10">اضافة منشور</Link>
			</div>
			{/* table */}
			<Table dataSource={data} columns={columns} pagination={false} />
		</main>
	);
}
