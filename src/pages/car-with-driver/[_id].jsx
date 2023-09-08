import LineTitles from "@/theme/Elements";
import axios from "axios";
import { useRouter } from "next/router";

export async function getStaticPaths() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-with-driver`);
    const paths = data.map((post) => ({ params: { _id: post._id } }));
    return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
    let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/client/car-with-driver/${encodeURIComponent(ctx.params._id)}`
    );
    return { props: { data }, revalidate: 10 * 60 };
}

export default function PageOne({ data }) {
    const router = useRouter();

    return (
        <article className="box col aitem">

            <LineTitles data={[{ href: "/hotel-apartment", title: "الشقق الفندقية" }]} />

            {/* عرض بيانات المنتج هنا */}
        </article>
    );
}
