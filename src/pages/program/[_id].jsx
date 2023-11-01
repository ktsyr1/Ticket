import axios from "axios";
import { useRouter } from "next/router";
import { IconMapPin, IconStars, IconWifi, IconParking, IconUsers, IconCurrencyDollar, IconHourglassHigh } from '@tabler/icons-react';
import LineTitles, { ContactWa, Gallray } from "@/theme/Elements";
import SEO from "@/lib/SEO";

export async function getStaticPaths() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/program`);
    const paths = data.map((post) => ({ params: { _id: post._id } }));
    return { paths, fallback: false };
}
export async function getStaticProps(ctx) {
    let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/client/program/${encodeURIComponent(ctx.params._id)}`
    );
    return { props: { data }, revalidate: 1};
}

let styles = {
    image: {
        width: '320px',
        borderRadius: '20px',
        boxShadow: '0 0 10px #ddd'
    }
}
export default function HotelsOne({ data }) {
    let route = useRouter()
    return (
        <section className="page w-full">
            <SEO title={`البرامج السياحية | ${data?.name}`} description={data?.description} image={data?.image} />

            <LineTitles data={[{ href: "/program", title: "البرامج السياحية" }]} />
            <div className="bord page w-full p-20">
                <img src={data.image} alt={data.title} className="title-img" style={{width: '-webkit-fill-available !important'}} />
                <h1>{data.title}</h1>

                <div className="box m-a row space">
                    <p></p>
                    <ContactWa href={`${process.env.NEXT_PUBLIC_API.replace("/api", "")}${route.asPath}`} />
                </div>
                <div className="box grid p-20 m-a space bord" style={{ whiteSpace: 'nowrap' }} >
                    <div className="box row aitem"  >
                        <IconHourglassHigh stroke={1.5} />
                        <p className="mr-10"> {data.duration}</p>
                    </div>
                    <div className="box row aitem"  >
                        <IconCurrencyDollar stroke={1.5} />
                        <p className="mr-10"> {data.price}</p>
                    </div>
                    <div className="box row aitem"  >
                        <IconUsers stroke={1.5} />
                        <p className="mr-10"> {data.numberOfPeople}</p>
                    </div>
                </div>
                <b>الوصف  </b>
                <p> {data.description}</p>
                <b>نظرة عامة  </b>
                <p> {data.overview}</p>

            </div>
            <div className="bord page w-full p-20 mt-10">
                <h2>خطة البرنامج</h2>
                {data.plan.map((item, index) => (
                    <div key={index} className="plan-card" >
                        <div className="plan-card-title">
                            <p className="btn" style={{ position: 'absolute', margin: '10px' }}>اليوم {item.sortDay}</p>
                            <img src={item.image} alt={item.title} className="w-300 bord p-0" />
                        </div>
                        <div className="plan-card-body">
                            <div className="aitem box row">
                                <h3>{item.title}</h3>
                            </div>
                            <p>{item.description}</p>
                            <b>الأنشطة لهذا اليوم </b>
                            <p>{item.activities}</p>
                        </div>
                    </div>
                ))}
                <h2>يشمل البرنامج</h2>
                <p>{data.includes}</p>

                <h2>لا يشمل البرنامج</h2>
                <p>{data.excludes}</p>
            </div>
        </section>
    );
}

