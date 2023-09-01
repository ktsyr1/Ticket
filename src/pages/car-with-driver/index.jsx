import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
// import { Card } from "@/components"; 

export async function getStaticProps() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-with-driver`);
    return { props: { data }, revalidate: 10 * 60 };
}

export default function AllPosts({ data }) {
    const router = useRouter();

    return (
        <div className="box grid">
            {data.map((e) => (
                <Card
                    key={e._id}
                    title={e.title}
                    image={e.image}
                    href={`/car-with-driver/${encodeURIComponent(e._id)}`}
                />
            ))}
        </div>
    );
}

const Card = ({ title, image, href }) => {
    return (
        <Link className="box col w-300 aitem bord" href={href}>
            <img src={image || "/images/logo.png"} alt={title} className="w-full h-auto mb-2" />
            <h3 className="text-lg font-semibold">{title}</h3>
        </Link>
    );
};

