import axios from "axios"; 
import { useRouter } from "next/router";
import { IconAirBalloon } from '@tabler/icons-react';
import { HeroPart } from "@/theme/Elements";
import SEO from "@/lib/SEO";
import { CardProgram } from "@/theme/cards";

export async function getStaticProps() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/program`);
    return { props: { data }, revalidate: 10 };
}

export default function Program({ data }) {
    const router = useRouter();
    let icon = <img src={"/icons/hotel.svg"} alt=" ايقونة الفنادق" className="w-50" />
    let about = "انطلق في مغامرة استثنائية واستكشف عجائب الطبيعة في هذا البرنامج المثير. ستتاح لك الفرصة لاستكشاف المناظر الطبيعية الساحرة، والغابات الكثيفة، والشلالات الرائعة. "
    return (
        <section className="box col m-a j">
            <SEO title="البرامج السياحية" description={about} />
            <HeroPart iconType={true} Icon={IconAirBalloon} title="البرامج السياحية" about={about} />

            <div className="box grid m-a j">
                {data.map((e) => (
                    <CardProgram
                        key={e._id}
                        data={e}
                        href={`/program/${encodeURIComponent(e._id)}`}
                    />
                ))}
            </div>
        </section>
    );
}
