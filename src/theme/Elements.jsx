import Link from "next/link";
import { IconHome, IconBrandWhatsapp } from '@tabler/icons-react';


export function Gallray({ data }) {
    let images = data?.map(a => <img src={a} key={a} style={{ borderRadius: '10px', height: '200px', margin: '5px' }} loading="lazy" />)
    let notFound = <p className="aitem box h-100 j m-a">لايوجد صور </p>
    return (
        <div className=" bord my-10 p-20 box col page w-full" >
            <b>معرض الصور</b>
            <div className=" box row scroll " >
                {data.length > 0 ? images : notFound}
            </div>
        </div>
    )
}

export default function LineTitles({ data }) {
    return (
        <div className="bord box page row aitem m-a w-full">
            <Link href={"/"} className="ml-10 box row aitem" >
                <IconHome stroke={1.5} className="m-10" />
                <p> الرئيسية </p>
            </Link>
            {data?.map(a => (<div key={a.href} className="box row aitem" ><span>/</span> <Link href={a.href} className="mr-10" > {a.title}</Link></div>))}
        </div>
    )
}

export function LineTitlesAdmin({ data }) {
    return (
        <div className=" aitem box p-10 row w-full">
            <Link href={"/"} className="ml-10 box row aitem bord pl-20" >
                <IconHome stroke={1.5} className="m-10" />
                <p> الرئيسية </p>
            </Link>
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
