import SEO from "@/lib/SEO";
import axios from "axios";
import markdownIt from "markdown-it";
import Link from "next/link";

export async function getStaticPaths() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts`);
    let paths = data.map(App => ({ params: { slug: App.url } }))
    return { paths, fallback: true }
}

// get static props
export async function getStaticProps(ctx) {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts/${encodeURI(ctx.params.slug)}`);
    return { props: { data }, revalidate: 10 }
}

export default function PageOne({ data }) {

    let md = new markdownIt()
    let content = md.render(data?.content || '')

    return (
        <article className="box col aitem" >
            {/* content */}
            <SEO title={` ${data?.title}`} description={data?.bio} image={data?.image} />
            <div className="bord col page p-10">
                <img src={data?.image || "/images/logo-full.png"} alt={`صورة ${data.title}`} className="" style={{ width: '320px', borderRadius: '20px', boxShadow: '0 0 10px #ddd' }} loading="lazy" />

                <h1 className="m-0">{data.title}</h1>
                <div className="box row m-10">
                    <p className="m-0">{new Date(data.create_at)}</p>
                    <p className="m-0">{data?.cat?.map(a => <Link href={`/page?cat=${a}`} >{a}</Link>)}</p>

                </div>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </article>
    )
}
