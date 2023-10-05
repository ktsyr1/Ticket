import axios from "axios"; 
import { useRouter } from "next/router"; 
import { HeroPart } from "@/theme/Elements";
import SEO from "@/lib/SEO";
import { CardHotel } from "@/theme/cards";

export async function getStaticProps() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotels`);
    return { props: { data }, revalidate: 10 };
}

export default function Hotels({ data }) {
    const router = useRouter();
    let icon = <img src={"/icons/hotel.svg"} alt=" ايقونة الفنادق" className="w-50" />
    let about = "نقدم لكم شقق مفروشة للإيجار في طرابزون. تقع هذه المجمعات بمناطق راقية ذات اطلالات رائعة وقريبة من الخدمات العامة. الشقق مجهزة بالكامل من أجل إقامة ممتعة ومريحة. كما تتميز الشقق بمساحات وأسعار مختلفة تلائم الجميع "
    return (
        <div className="box col m-a j">
            <SEO title="الاوتيلات" description={about} />
            <HeroPart iconType={false} Icon={icon} title="الاوتيلات" about={about} />

            <div className="box grid m-a j">
                {data.map((e) => (
                    <CardHotel
                        key={e._id}
                        data={e}
                        href={`/hotels/${encodeURIComponent(e._id)}`}
                    />
                ))}
            </div>
        </div>
    );
}