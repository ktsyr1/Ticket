import SEO from "@/lib/SEO";
import axios from "axios";
import markdownIt from "markdown-it";
import Link from "next/link";

// get static props
PageOne.getInitialProps = async (ctx) => { 
    let {cat} = ctx.query// ?.cat
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts?cat=${cat}`);
    return { props: { data, cat}, revalidate: 10 }
}

export default function PageOne({ data, cat }) {

    let md = new markdownIt()
    let content = md.render(data?.content || '')

    return (
        <div className="aitem m-10 box col page w-full" >
            {/* content */}
            <SEO title={` ${cat}`} description={data?.bio} image={data?.image} />
            <div>
                {data?.map(a => (
                    <Link href={`/page/${a.url}`} className="bord w-300 box col m-10" key={a._id}>
                        <img src={a.image || "/images/logo-full.png"} alt={`صورة ${a.title}`} className="" style={{ width: '280px', borderRadius: '20px', boxShadow: '0 0 10px #ddd' }} loading="lazy" />
                        <h1 className="m-0">{a.title}</h1>

                    </Link>
                ))}

            </div>
        </div>
    )
}
