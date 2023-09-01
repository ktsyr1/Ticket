import axios from 'axios';
import Link from 'next/link';

export const getStaticProps = async ({ query }) => {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API || '/api'}/client/posts`);
    return { props: { data } }
}
export default function Home({ data }) {
    return (
        <section className="box col aitem h-300 space" >
            {/* hero */}
            <p> hero</p>
            {/* ansfni */}
            <p> ansfni</p>
            {data?.map(a => (
                <Link href={`/page/${a.url}`} className="w-300 bord" key={a._id}>
                    <p>img</p>
                    <p>{a.title}</p>
                </Link>
            ))}
            {/* Q/A */}
            <p> Q / A</p>
            {/* res */}
            <p> res</p >
        </section>
    )
} 