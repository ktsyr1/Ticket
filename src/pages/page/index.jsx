import SEO from "@/lib/SEO";
import axios from "axios";
import markdownIt from "markdown-it";
import Link from "next/link";

// get static props
export async function getStaticProps(ctx) {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts?cat=${ctx.query?.cat}`);
    return { props: { data }, revalidate: 10 }
}

export default function PageOne({ data }) {

    let md = new markdownIt()
    let content = md.render(data?.content || '')

    return (
        <div className="aitem bord box col page w-full" >
            {/* content */}
            <SEO title={` ${data?.title}`} description={data?.bio} image={data?.image} />
            <div>
                {data?.map(a => (
                    <Link href={`/page/${a.url}`} key={a._id}>
                        <img src={a.image || "/images/logo-full.png"} alt={`صورة ${a.title}`} className="" style={{ width: '320px', borderRadius: '20px', boxShadow: '0 0 10px #ddd' }} loading="lazy" />
                        <h1 className="m-0">{a.title}</h1>

                    </Link>
                ))}

            </div>
        </div>
    )
}
