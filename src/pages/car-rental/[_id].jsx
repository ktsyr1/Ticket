import axios from "axios";
import { useRouter } from "next/router";
import { HeroPart } from "@/theme/Elements";
import SEO from "@/lib/SEO";
import NotFoundTitle from "../404";

// export async function getStaticPaths() {
//   const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-rental`);
//   const paths = data.map((car) => ({ params: { _id: car._id } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps(ctx) {
//   const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-rental/${encodeURIComponent(ctx.params._id)}`);
//   return { props: { data }, revalidate: 10 };
// }

export default function CarRentalDetail({ data }) {
    const router = useRouter();
    if (!data) return <NotFoundTitle />
    else return (
        <div className="box col m-a j">
            <SEO title={`${data.brand} ${data.model}`} description={data.description} image={data.image} />

            <HeroPart iconType={false} title={`${data.brand} ${data.model}`} />

            <div className="box grid m-a j">
                {/* عرض معلومات السيارة المعينة هنا */}
                {/* مثال: */}
                {/* <p>السعر: {data.price}</p> */}
            </div>
        </div>
    );
}
