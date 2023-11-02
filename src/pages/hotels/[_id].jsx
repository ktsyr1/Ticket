import axios from "axios";
import { useRouter } from "next/router";
import { IconMapPin, IconStars, IconWifi, IconParking, } from '@tabler/icons-react';
import LineTitles, { ContactWa, Gallray } from "@/theme/Elements";
import SEO from "@/lib/SEO";
import { IconBreakfast } from "../../theme/icons";

export async function getStaticPaths() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotels`);
    const paths = data.map((post) => ({ params: { _id: post._id } }));
    return { paths, fallback: false };
}
export async function getStaticProps(ctx) {
    let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/client/hotels/${encodeURIComponent(ctx.params._id)}`
    );
    return { props: { data }, revalidate: 10 };
}

export default function HotelsOne({ data }) {
    let route = useRouter()
    return (
        <section className="page w-full" >
            <SEO title={`اوتيل | ${data?.name}`} description={data?.description} image={data?.image} />

            <LineTitles data={[{ href: "/hotels", title: "الاوتيلات" }]} />
            <div className="  box col m-a page hotel  ">
                <div className="bord box col m-a page   m-0">
                    <div className=" hotel-title">
                        <img src={data.image} alt={`صورة ${data.name}`} className="title-img" loading="lazy" />
                        <div className="box grid">
                            <div className="box col m-10 mx-20 w-300">
                                <h1 className="m-0">{data.name}</h1>
                                <div className="aitem box m-10 row">
                                    {/* icon city */}
                                    <IconMapPin size={18} />
                                    <p className="mr-10">{data.city} - {data.address}</p>
                                </div>
                                <div className="aitem box m-10 row">
                                    <IconStars size={18} />
                                    {/* icon stars */}
                                    <p className="mr-10">{data.rank}</p>
                                </div>

                            </div>
                            <div style={{ display: 'flex',margin: '0 20px', justifyContent: 'flex-end', flexDirection: 'row', width: '-webkit-fill-available' }}>
                                <p></p>
                                <ContactWa href={`${process.env.NEXT_PUBLIC_API.replace("/api", "")}${route.asPath}`} />
                            </div>
                        </div>
                    </div>
                    <div className="box col m-10">
                        <b>الوصف</b>
                        <p>{data.description}</p>
                    </div>
                </div>
                <Gallray data={data?.images} />

                <div className="box col bord p-20 page w-full">
                    <div className="box col ">
                        <b>محيط مكان الإقامة</b>
                        <p>{data.surroundingArea}</p>
                    </div>
                    <div className="box col ">
                        <b>الخدمات</b>
                        <div className="box grid my-10">

                            <div className="aitem box m-10 row">
                                {/* icon wifi */}
                                <IconWifi size={18} />
                                <p className="mr-10">{data.services.freeWiFi ? "" : "لا"} وايفاي مجانية</p>
                            </div>
                            <div className="aitem box m-10 row">
                                <IconParking size={18} />
                                <p className="mr-10">{data.services.freeParking ? "" : "لا"} موقف سيارات مجانية</p>
                            </div>
                            <div className="aitem box m-10 row">
                                <IconBreakfast size={18} />
                                <p className="mr-10">{data.services.breakfast ? "" : "لا"} فطور </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

