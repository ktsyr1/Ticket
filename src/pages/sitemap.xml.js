import sitemap from "nextjs-vip/sitemap"

export async function getServerSideProps({ res }) {
    let { NEXT_PUBLIC_API } = process.env
    const request = await fetch(`${NEXT_PUBLIC_API}?domain=${NEXT_PUBLIC_API.replace("/api", "")}`)
    const data = await request.json()

    sitemap(res, data)

    return { props: {} }
} 

export default function s() { }