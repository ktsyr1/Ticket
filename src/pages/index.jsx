import axios from 'axios';
import Link from 'next/link';
import { CardHotel } from './hotels';

export const getStaticProps = async ({ query }) => {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API || '/api'}/client/`);
    return { props: { data } }
}
export default function Home({ data }) {
    return (
        <section className="box col m-10 " >
            {/* hero
            <p> hero</p>
            ansfni
            <p> ansfni</p> */}
            <h1>الاوتيلات</h1>
            <div className="box grid">
                {data?.hotels?.map(e => <CardHotel
                    key={e._id}
                    title={e.name}
                    image={e.image}
                    rank={e.rank}
                    city={e.city}
                    href={`/hotels/${encodeURIComponent(e._id)}`}
                />
                )}
            </div>
            {/* Q/A */}
            {/* <p> Q / A</p> */}
            {/* res */}
            {/* <p> res</p > */}
        </section>
    )
} 