import axios from "axios";
import SEO from "@/lib/SEO";
import { HeroPart } from "@/theme/Elements";
import { IconCar } from '@tabler/icons-react';
import { CardCWD } from "@/theme/cards";

export async function getStaticProps() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-with-driver`);
    return { props: { data }, revalidate: 10 };
}

export default function CarWithDriver({ data }) {
    let about = "نحن نقدم لكم خدمة تأجير سيارة مع سائق في طرابزون.ستحصلون على تجربة سفر مريحة ومميزة مع محترفين يضمنون لكم الوصول إلى وجهتكم بأمان وراحة.سياراتنا مجهزة بأحدث التقنيات والراحة لضمان تجربة سفر فاخرة."

    return (
        <section className="box col m-a j">
            <SEO title={`سيارة مع سائق`} description={about} />
            <HeroPart iconType={true} Icon={IconCar} title="سيارة مع سائق" about={about} />

            <div className="box grid m-a j">
                {data.map((e) => (
                    <CardCWD
                        key={e._id}
                        data={e}
                        href={`/car-with-driver/${encodeURIComponent(e._id)}`}
                    />
                ))}
            </div>
        </section>
    );
}
