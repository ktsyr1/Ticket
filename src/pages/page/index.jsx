import SEO from "@/lib/SEO";
import axios from "axios";
import markdownIt from "markdown-it";
import Link from "next/link";

// get static props
PageOne.getInitialProps = async (ctx) => { 
    let {cat} = ctx.query// ?.cat
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts?cat=${cat}`);
    return { data, cat }
}

export default function PageOne(props) {
    let { data, cat }= props
    let md = new markdownIt()
    let content = md.render(data?.content || '')
    let title = `نتيجة تصنيف  ${cat}`
    return (
        <div className="aitem m-10 box col page w-full" >
            {/* content */}
            <SEO title={title} description={data?.bio} image={data?.image} />
            <h1 className="bord w-full"> {title}</h1>
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
