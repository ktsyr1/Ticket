import axios from "axios";
import { useRouter } from "next/router";
import { HeroPart } from "@/theme/Elements";
import SEO from "@/lib/SEO";
import NotFoundTitle from "../404";
import { IconSteeringWheel } from '@tabler/icons-react';
import { CardCarRental } from "@/theme/cards";

export async function getStaticProps() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-rental`);
    return { props: { data }, revalidate: 10 };
}

export default function CarRentals({ data }) {
    const router = useRouter();
    let about = "عرض جميع سيارات التأجير المتاحة"
    if (!data) return <NotFoundTitle />
    else return (
        <section className="box col m-a j">
            <SEO title="تاجير السيارات" description={about} />

            <HeroPart iconType={true} Icon={IconSteeringWheel} title="تاجير السيارات" about={about} />

            <div className="box grid m-a j">
                {data?.map((car) => <CardCarRental key={car._id} data={car} />)}
            </div>
        </section>
    );
}
