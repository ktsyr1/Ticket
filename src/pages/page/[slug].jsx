import SEO from "@/lib/SEO";
import axios from "axios";
import markdownIt from "markdown-it";
import Link from "next/link";
import { IconTags } from '@tabler/icons-react';

export async function getStaticPaths() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts`);
    let paths = data.map(App => ({ params: { slug: App.url } }))
    return { paths, fallback: true }
}

// get static props
export async function getStaticProps(ctx) {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts/${encodeURI(ctx.params.slug)}`);
    return { props: { data , slug:ctx.params.slug}, revalidate: 10 }
}

export default function PageOne({ data ,slug}) {

    let md = new markdownIt()
    let content = md.render(data?.content || '')

    const date = new Date(data?.create_at);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed, so we add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    return (
        <div className="box col aitem m-10 page w-full" >
            {/* content */}
            <SEO title={` ${slug}`} description={data?.bio} image={data?.image} />
            <div className="bord col page p-10 w-full">
                <img src={data?.image || "/images/logo-full.png"} alt={`صورة ${data?.title}`} className="" style={{ width: '-webkit-fill-available', borderRadius: '20px', boxShadow: '0 0 10px #ddd' }} loading="lazy" />

                <h1 className="m-0">{data?.title}</h1>
                <div className="box row m-10 aitem">
                    <p className="m-0 ml-10">{`${year}/${month}/${day} - ${hours}:${minutes}`}</p>
                    <IconTags stroke={1.5} className="m-10" size={17} />
                    <div className="m-0">{data?.cat?.map(a => <Link href={`/page?cat=${a}`} className={"mx-10"} key={a}>{a}</Link>)}</div>
                </div>
                <div className="m-20" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    )
}
