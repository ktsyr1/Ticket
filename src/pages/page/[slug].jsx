import axios from "axios";

export async function getStaticPaths() {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts`);
    let paths = data.map(App => ({ params: { slug: App.url } }))
    return { paths, fallback: true }
}

// get static props
export async function getStaticProps(ctx) {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/posts/${encodeURI(ctx.params.slug)}`);
    return { props: { data }, revalidate: 10 * 60 }
}

export default function PageOne({ data }) {
    return (
        <article className="box col aitem" >
            {/* content */}
            <h1>Page One</h1>
            <p>content</p>
        </article>
    )
}
