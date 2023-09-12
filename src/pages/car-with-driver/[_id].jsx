import LineTitles, { ContactWa } from "@/theme/Elements";
import axios from "axios";
import { useRouter } from "next/router";
import SEO from "@/lib/SEO";
import markdownIt from "markdown-it";
import {
    IconCar, IconSteeringWheel, IconCurrencyDollar, IconCalendarTime, IconMapPin, IconClockPlay
} from '@tabler/icons-react';

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
let styles = {
    image: {
        borderRadius: '20px',
        width: '100%',
        boxShadow: '0 0 10px #ddd'
    }
}
export default function CarWithDriverOne({ data }) {
    const route = useRouter();
    let test = {
        "duration": "12",
        "tourDuration": "10 ساعات",
        "additionalFeatures": [
            "واي فاي مجاني ",
            " مشروبات مجانية"
        ]
    }
    let md = new markdownIt()
    let programDetails = md.render(data?.programDetails || '')
    return (
        <div className="aitem box col j  page w-full">
            <SEO title={data?.title} description={data?.programDetails} />
            <LineTitles data={[{ href: "/car-with-driver", title: "سيارة مع سائق" }]} />

            {/* عرض بيانات المنتج هنا */}
            <div className="bord box col m-a page   m-0">
                <div className="box col m-10 j  ">
                    <img src={data.carImage} alt={`صورة ${data.title}`} className="" style={styles.image} loading="lazy" />
                    <h1 className="m-0">{data.title}</h1>
                    <div className="box grid " style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between'
                    }} >
                        <div className="box col w-300" >
                            <div className="box row" style={{ width: '280px' }}>
                                <RowData title={data?.city} Icon={IconMapPin} />
                                <RowData title={data?.driver} Icon={IconSteeringWheel} />
                            </div>
                            <div className="box row" style={{ width: '280px' }}>
                                <RowData title={data?.duration} Icon={IconCalendarTime} />
                                <RowData title={data?.tourDuration} Icon={IconClockPlay} />
                            </div>
                            <div className="box row" style={{ width: '280px' }}>
                                <RowData title={data?.price} Icon={IconCurrencyDollar} />
                            </div>
                        </div>
                        <div className=" mx-20 m-a" style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <ContactWa href={`${process.env.NEXT_PUBLIC_API.replace("/api", "")}${route.asPath}`} />
                        </div>
                    </div>
                </div>
                <div className="box col m-10">
                    <b>معلومات عن البرنامج</b>
                    <div dangerouslySetInnerHTML={{ __html: programDetails }} />
                </div>
                <div className="box col m-10">
                    <b>ميزات إضافية</b>
                    <div dangerouslySetInnerHTML={{ __html: data?.additionalFeatures }} />
                </div>

            </div>
        </div>
    );
}


const RowData = ({ title, Icon, width = 150 }) => {
    return (
        <div className="box row aitem " style={{ width }}  >
            <Icon stroke={1.5} />
            <p className="m-10 ">{title}</p>
        </div>
    );
};

