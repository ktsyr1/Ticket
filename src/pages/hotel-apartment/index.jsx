import axios from "axios";
import { IconBuilding } from '@tabler/icons-react';
import { HeroPart } from "@/theme/Elements";
import SEO from "@/lib/SEO";
import { CardHotel } from "@/theme/cards";

export async function getStaticProps() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotel-apartment`);
    return { props: { data }, revalidate: 10 };
}

export default function HotelsApartment({ data }) {
    let about = "نقدم لكم شقق مفروشة للإيجار في طرابزون. تقع هذه المجمعات بمناطق راقية ذات اطلالات رائعة وقريبة من الخدمات العامة. الشقق مجهزة بالكامل من أجل إقامة ممتعة ومريحة. كما تتميز الشقق بمساحات وأسعار مختلفة تلائم الجميع "

    return (
        <section className="box col m-a j">
            <SEO title={`شقق فندقية `} description={about} />
            <HeroPart iconType={true} Icon={IconBuilding} title="شقق فندقية" about={about} />

            <div className="box grid m-a j">
                {data.map((e) => (
                    <CardHotel
                        key={e._id}
                        data={e}
                        href={`/hotel-apartment/${encodeURIComponent(e._id)}`}
                    />
                ))}
            </div>
        </section>
    );
} 