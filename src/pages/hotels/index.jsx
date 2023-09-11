import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconMapPin, IconStars, IconCashBanknote, IconCoin, } from '@tabler/icons-react';
import { HeroPart } from "@/theme/Elements";
import SEO from "@/lib/SEO";

export async function getStaticProps() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotels`);
    return { props: { data } };
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
                        title={e.name}
                        image={e.image}
                        rank={e.rank}
                        city={e.city}
                        href={`/hotels/${encodeURIComponent(e._id)}`}
                    />
                ))}
            </div>
        </div>
    );
}
export const CardHotel = ({ title, image, href, rank, city }) => {
    return (
        <Link className="card" href={href}>
            <img src={image || "/images/logo.png"} alt={title} className="w-full h-auto mb-2" loading="lazy" />
            <div className="box row aitem my-10 space po"  >
                <div className="box row aitem">
                    <IconMapPin size={18} />
                    <p className="mr-10">{city}</p>
                </div>
                {rank ? <div className="box row aitem">
                    <IconStars size={18} />
                    <p className="mr-10">{rank}</p>
                </div> : <></>}
            </div>
            <div className="footer">
                <b>{title}</b>

            </div>
        </Link>
    );
};

