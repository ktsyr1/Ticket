import Link from "next/link";


export default function LineHeader({ data }) {
    return (
        <div className="box row mx-15 mt-10">
            <Link href={"/admin"} >لوحة التحكم</Link>
            {data?.map(a => (<Link href={a.href} key={a.href} > / {a.title}</Link>))}
        </div>
    )

}