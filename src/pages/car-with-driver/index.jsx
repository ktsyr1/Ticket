import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import SEO from "@/lib/SEO";
import { HeroPart } from "@/theme/Elements";
import { IconCar, IconSteeringWheel, IconCurrencyDollar, IconCalendarTime, IconMap } from '@tabler/icons-react';


export async function getStaticProps() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-with-driver`);
    return { props: { data }, revalidate: 10 * 60 };
}

export default function CarWithDriver({ data }) {
    const router = useRouter();
    let about = "نحن نقدم لكم خدمة تأجير سيارة مع سائق في طرابزون.ستحصلون على تجربة سفر مريحة ومميزة مع محترفين يضمنون لكم الوصول إلى وجهتكم بأمان وراحة.سياراتنا مجهزة بأحدث التقنيات والراحة لضمان تجربة سفر فاخرة."

    return (
        <div className="box col m-a j">
            <SEO title={`سيارة مع سائق`} description={about} />
            <HeroPart iconType={true} Icon={IconCar} title="سيارة مع سائق" about={about} />

            <div className="box grid m-a j">
                {data.map((e) => (
                    <Card
                        key={e._id}
                        data={e}
                        title={e.title}
                        image={e?.carImage}
                        href={`/car-with-driver/${encodeURIComponent(e._id)}`}
                    />
                ))}
            </div>
        </div>
    );
}

const Card = ({ data, image, href }) => {
    return (
        <Link className="card" href={href}>
            <img src={data?.carImage || "/images/logo-full.png"} alt={data?.title} className="w-full h-auto mb-2" />
            <div className="footer" >
                <b className="text-lg font-semibold">{data?.title}</b>
                <div className="box col">
                    <div className="box row space" style={{ width: '280px' }}>
                        <RowData title={data?.driver} Icon={IconSteeringWheel} />
                        <RowData title={data?.tourDuration} Icon={IconCalendarTime} />
                    </div>
                    <div className="box row space" style={{ width: '280px' }}>
                        <RowData title={data?.city} Icon={IconMap} />
                        <RowData title={data?.price} Icon={IconCurrencyDollar} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

const RowData = ({ title, Icon, width = 150 }) => {
    return (
        <div className="box row aitem "   >
            <Icon stroke={1.5} />
            <p className="m-10 ">{title}</p>
        </div>
    );
};

