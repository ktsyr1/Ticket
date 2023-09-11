import LineTitles from "@/theme/Elements";
import axios from "axios";
import { useRouter } from "next/router";
import SEO from "@/lib/SEO";

export async function getStaticPaths() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-with-driver`);
    const paths = data.map((post) => ({ params: { _id: post._id } }));
    return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
    let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/client/car-with-driver/${encodeURIComponent(ctx.params._id)}`
    );
    return { props: { data } };
}

export default function CarWithDriverOne({ data }) {
    const router = useRouter();

    return (
        <div className="aitem box col j m-a page w-full">
            <SEO title={data?.title} description={data?.programDetails} />
            <LineTitles data={[{ href: "/car-with-driver", title: "سيارة مع سائق" }]} />
 <div className=" bord box col j m-a w-full">
            {/* عرض بيانات المنتج هنا */}
        </div>        </div>
    );
}
