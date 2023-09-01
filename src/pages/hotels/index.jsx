import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
// import { Card } from "@/components"; 
import { IconMapPin, IconStars, IconCashBanknote, IconCoin, } from '@tabler/icons-react';

export async function getStaticProps() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotels`);
    return { props: { data }, revalidate: 10 * 60 };
}

export default function AllPosts({ data }) {
    const router = useRouter();

    return (
        <div className="box grid m-a j">
            {data.map((e) => (
                <Card
                    key={e._id}
                    title={e.name}
                    image={e.image}
                    rank={e.rank}
                    city={e.city}
                    href={`/hotels/${encodeURIComponent(e._id)}`}
                />
            ))}
        </div>
    );
}

const Card = ({ title, image, href, rank, city }) => {
    return (
        <Link className="card" href={href}>
            <img src={image || "/images/logo.png"} alt={title} className="w-full h-auto mb-2" loading="lazy"/>
            <div className="box row aitem my-10 space po"  >
                <div className="box row aitem">
                    <IconMapPin size={18} />
                    <p className="mr-10">{city}</p>
                </div>
                <div className="box row aitem">
                    <IconStars size={18} />
                    <p className="mr-10">{rank}</p>
                </div>
            </div>
            <div className="footer">
                <b>{title}</b>

            </div>
        </Link>
    );
};

