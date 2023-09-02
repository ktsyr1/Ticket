import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import LineHeader from "@/theme/lineHeader";
import { AuthServerSide } from "@/lib/app2";

export async function getServerSideProps(ctx) {
        return await AuthServerSide(ctx, async ({ NEXT_PUBLIC_API, query, config }) => {
                let url = `${NEXT_PUBLIC_API}/admin/posts/${query._id}`
                let { data } = await axios.get(url, config);
                return { data, config, query }
        })
}

export default function PostOne(props) {
        let route = useRouter()
        let { query, config } = props
        let [data, setData] = useState(props.data)

        return (
                <main>
                        <LineHeader data={[
                                { title: "المنشورات", href: "/admin/posts" }
                        ]} />
                        {/* header */}
                        <div className="box col aitem bord m-a " style={{ maxWidth: "600px" }}>
                                <h1>{data?.title}</h1>
                                <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                        </div>
                        {/* table */}
                </main>
        )
}
