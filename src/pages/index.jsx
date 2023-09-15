import axios from 'axios';
import Link from 'next/link';
import { CardHotel } from './hotels';
import { Hero } from '../theme/hero';
import { IconBuilding } from '@tabler/icons-react';
import SEO from '@/lib/SEO';

export const getStaticProps = async ({ query }) => {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API || '/api'}/client/`);
    return { props: { data }, revalidate: 0 }
}

export default function Home({ data }) {
    return (
        <section className="box col m-10 " >
            <SEO
                title="تكت مسافر - Ticket Musafir"
                description="افضل خدمة لاروع مكان"
            />
            {/* <Hero /> */}
            <div className="box row m-10">
                <img src="/icons/hotel.svg" alt=" ايقونة الاوتيلات" width="30" />
                <h2 style={{ fontSize: "xx-large" }} className="mr-10" >الاوتيلات</h2>
            </div>

            <div className="box grid">
                {data?.hotels?.map(e =>
                    <CardHotel key={e._id} title={e.name} image={e.image} rank={e.rank} city={e.city} href={`/hotels/${encodeURIComponent(e._id)}`} />
                )}
            </div>
            <div className="box row m-10">

                <IconBuilding stroke={1.5} className="m-10" size={50} />
                <h2 style={{ fontSize: "xx-large" }} className="mr-10" >الشقق الفنادقية</h2>
            </div>

            <div className="box grid">
                {data?.hotelsApartment?.map(e =>
                    <CardHotel key={e._id} title={e.name} image={e.image} city={e.city} href={`/hotel-apartment/${encodeURIComponent(e._id)}`} />
                )}
            </div>
        </section>
    )
} 