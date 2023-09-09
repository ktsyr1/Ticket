import Link from "next/link";
import { IconHome, IconBrandWhatsapp } from '@tabler/icons-react';


export default function LineTitles({ data }) {
    return (
        <div className="bord box page row aitem m-a">
            <IconHome stroke={1.5} className="m-10" />
            <Link href={"/"} className="ml-10" > الرئيسية </Link>
            {data?.map(a => (<div key={a.href} className="box row aitem" ><span>/</span> <Link href={a.href} className="mr-10" > {a.title}</Link></div>))}
        </div>
    )
}

export function HeroPart({ Icon, iconType, title, about }) {
    return (
        <div className="aitem box col m-a page m-a">
            {iconType ? <Icon stroke={1.5} className="m-10" size={50} /> : Icon}
            <h1> {title} </h1>
            <p> {about} </p>
        </div>
    )
}

export function ContactWa({ href = " ", title = "تواصل معنا  " }) {
    return (
        <Link href={`https://wa.me/905365475371?text=${href}`} className=" box row  btn " style={{ alignItems: 'center', width: 'max-content' }}>
            <IconBrandWhatsapp stroke={1.5} className="m-10" size={20} />
            <p className="ml-10"> {title} </p>
        </Link>
    )
}