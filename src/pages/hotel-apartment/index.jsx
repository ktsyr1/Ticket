import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconMapPin, IconBuilding, IconCashBanknote, IconCoin, } from '@tabler/icons-react';
import { CardHotel } from "../hotels";
import { HeroPart } from "@/theme/Elements";

export async function getStaticProps() {
    // let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotel-apartment`);
    return { props: { data: "" }, revalidate: 10 * 60 };
}

export default function AllPosts({ data }) {
    const router = useRouter();

    return (
        <div className="box col m-a j">
            {/* <HeroPart
                iconType={true}
                Icon={IconBuilding}
                title="شقق فندقية"
                about="نقدم لكم شقق مفروشة للإيجار في طرابزون. تقع هذه المجمعات بمناطق راقية ذات اطلالات رائعة وقريبة من الخدمات العامة. الشقق مجهزة بالكامل من أجل إقامة ممتعة ومريحة. كما تتميز الشقق بمساحات وأسعار مختلفة تلائم الجميع "
            />
        <div className="box grid m-a j">
            {data.map((e) => (
                <CardHotel
                    key={e._id}
                    title={e.name}
                    image={e.image}
                    city={e.city}
                    href={`/hotel-apartment/${encodeURIComponent(e._id)}`}
                />
            ))}
            </div> */}
        </div>
    );
} 