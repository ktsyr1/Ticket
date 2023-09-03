import axios from 'axios';
import Link from 'next/link';
import { CardHotel } from './hotels';
import { Hero } from '../theme/hero';

export const getStaticProps = async ({ query }) => {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API || '/api'}/client/`);
    return { props: { data } }
}
export default function Home({ data }) {
    return (
        <section className="box col m-10 " >
            {/* <Hero /> */}
            <h1 style={{ fontSize: 'xx-large', marginTop: '20px' }}>الاوتيلات</h1>
            <div className="box grid">
                {data?.hotels?.map(e =>
                    <CardHotel key={e._id} title={e.name} image={e.image} rank={e.rank} city={e.city} href={`/hotels/${encodeURIComponent(e._id)}`} />
                )}
            </div>
        </section>
    )
} 