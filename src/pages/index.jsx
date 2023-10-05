import axios from 'axios';
import Link from 'next/link';
import SEO from '@/lib/SEO';
import { IconBuilding, IconCar, IconAirBalloon, IconSteeringWheel } from '@tabler/icons-react';
import { CardCarRental, CardProgram, CardCWD, CardHotel } from '@/theme/cards';

export const getStaticProps = async ({ query }) => {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/`);
    return { props: { data }, revalidate: 10 }
}
export default function Home({ data }) {
    return (
        <section className="box col m-10 " >
            <SEO
                title="تكت مسافر - Ticket Musafir"
                description="افضل خدمة لاروع مكان"
            />

            <Part data={data?.hotels} title={"الاوتيلات"} Icon={IconHotel} href='/hotels' Card={CardHotel} />

            <Part data={data?.hotelsApartment} title={" الشقق الفنادقية"} Icon={IconBuilding} href='/hotel-apartment' Card={CardHotel} />

            <Part data={data?.carWithDriver} title={"سيارة مع سائق"} Icon={IconCar} href='/car-with-driver' Card={CardCWD} />

            <Part data={data?.carRental} title={"تاجير السيارات"} Icon={IconSteeringWheel} href='/car-rental' Card={CardCarRental} />

            <Part data={data?.program} title="البرامج السياحية" href='/program' Icon={IconAirBalloon} Card={CardProgram} />

        </section>
    )
}

function Part({ data, title, Icon, href, Card }) {
    let link = {
        margin: '10px 20px', color: '#fff', backgroundColor: '#4caf50', textAlign: 'center', minWidth: '80px', borderRadius: '10px'
    }
    return (
        <>
            <div className="aitem box m-10 row">
                <Icon stroke={1.5} className="m-10" size={30} />
                <h2 style={{ fontSize: "large" }} className="mr-10" >{title}</h2>
                <Link href={href} className="box j aitem" style={link} >المزيد</Link>
            </div>
            <div className="box grid">
                {data?.map(e =>
                    <Card
                        key={e._id}
                        data={e}
                        href={`${href}/${encodeURIComponent(e._id)}`}
                    />
                )}
            </div>
        </>
    )
}

let IconHotel = () => (
    <svg fill="#555" width={30} height={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
        <path d="M19.32,6.77,8,3V21h4V15h4v6h4V7.72A1,1,0,0,0,19.32,6.77Z" style={{ fill: "rgb(44, 169, 188)", strokeWidth: 2 }} />
        <path d="M12,21V15h4v6ZM8,21H20V7.72a1,1,0,0,0-.68-1L8,3ZM4,10A1,1,0,0,1,5,9H8V21H4ZM3,21H21" style={{ fill: "none", stroke: "rgb(0, 0, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeLidth: 2 }} />
    </svg>
) 