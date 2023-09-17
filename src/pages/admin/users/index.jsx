import LineHeader from "@/theme/lineHeader";
import { Table, message, Popconfirm } from "antd";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { AuthServerSide } from '@/lib/app2'
import { LineTitlesAdmin } from "@/theme/Elements";

export async function getServerSideProps(ctx) {
	return AuthServerSide(ctx, async ({config, NEXT_PUBLIC_API}) => {
		let url = `${NEXT_PUBLIC_API}/admin/users`
		let { data } = await axios.get(url, config);

		return { data, config }
	})

}


export default function AdminUsers(props) {
	let [data, set] = useState(props?.data)
	let [invite, setInvite] = useState(false)
	const { register, handleSubmit } = useForm();
	const onSubmit = res => {
		// message.success("لقد تم ارسال الدعوة")
		setInvite(false)
		axios.patch("/api/admin/users", res, props.config)
			.then(({ data: DATA }) => message.success(DATA.msg))
	}
	function Delete(id) {
		let url = `${process.env.NEXT_PUBLIC_API}/admin/users/${id}`
		let filter = data.filter(a => a._id.toString() != id.toString())
		set(filter)
		axios.delete(url, props.config)
			.then(({ data }) => message.success(data.msg))
	}
	function FormInvite() {
		if (invite) {
			return (
				<form
					className="pup bord w-300 m-a p-20"
					style={{ top: '170px', right: '0', left: '0', zIndex: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1>دعوة ادمن</h1>
					<p>الايميل</p>
					<input type="email" id="email" {...register("email")} />

					<div className=" box row my-15" style={{ textAlign: "start" }}>
						<dev className="btn off w-full ml-10" onClick={() => setInvite(false)} >الغاء </dev>
						<input type='submit' className="mr-10 w-full" />
					</div>
				</form>
			)
		} else return <></>
	}
	const columns = [
		{ title: "الاسم", dataIndex: "fullname", key: "fullname" },
		{ title: "email", dataIndex: "email", key: "email", },
		{
			title: "الخيارات", dataIndex: "delete", key: "delete",
			render: (_, record) => (
				<div className="box row">
					{/* <Link href={`/admin/users/${record._id}`} className="btn ml-10 w-50 box j m-5" >edit</Link> */}
					<Popconfirm
						title="  أنت متأكدة من  حذف المستخدم"
						onConfirm={() => Delete(record._id)}
						okText="نعم"
						cancelText="لا"
					>
						<button className="mr-10 green ml-10 box aitem" >
							<Image src={"/icons/delete.svg"} width={20} height={20} alt="icon" />
							<p className="mx-10">     حذف المستخدم </p>
						</button>
					</Popconfirm>

				</div>
			)
		},

	];
	return (
		<div className="bord m-10 p-10 box col w-full ">
			<LineTitlesAdmin data={[]} />
			<div className="box row p-20">
				<h1 className="ml-20">المستخدمين</h1>
				<button onClick={() => setInvite(true)} >دعوة </button>
			</div>

			<FormInvite />
			<div>
				<Table dataSource={data} columns={columns} pagination={false} />
			</div>
		</div>

	)
}
