import axios from "axios";
import { useRouter } from "next/router";
import { IconMapPin } from '@tabler/icons-react';
import markdownIt from "markdown-it";
import LineTitles, { ContactWa } from "@/theme/Elements";
import SEO from "@/lib/SEO";
import { Gallray } from "../../theme/Elements";

export async function getStaticPaths() {
  let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotel-apartment`);
  const paths = data.map((post) => ({ params: { _id: post._id } }));
  return { paths, fallback: false };
}
let styles = {
  image: { width: '320px', borderRadius: '20px', boxShadow: '0 0 10px #ddd' }
}
export async function getStaticProps(ctx) {
  let { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/client/hotel-apartment/${encodeURIComponent(ctx.params._id)}`
  );
  return { props: { data }, revalidate: 10 };
}

export default function HotelsApartmentOne({ data }) {
  let route = useRouter()
  let md = new markdownIt()
  let interiorFeatures = md.render(data?.interiorFeatures || '')
  let accommodationFeatures = md.render(data?.accommodationFeatures || '')
  let generalDetails = md.render(data?.generalDetails || '')
  return (
    <div className="  m-10">
      <SEO title={`شقق فندقية | ${data?.name}`} description={data?.about} image={data?.image} />

      <LineTitles data={[{ href: "/hotel-apartment", title: "الشقق الفندقية" }]} />
      <div className="  box col m-a page hotel  ">
        <div className="part">
          <div className=" hotel-title">
            <img src={data.image} alt={`صورة ${data.name}`} className="" style={styles.image} loading="lazy" />
            <div className="box col m-10 mx-20 w-300">
              <h1 className="m-0">{data.name}</h1>
              <div className="aitem box m-10 row">
                <IconMapPin size={18} />
                <p className="mr-10">{data.city} - {data.address}</p>
              </div>
             <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', width: '-webkit-fill-available' }}>
                                <p></p>
                                <ContactWa href={`${process.env.NEXT_PUBLIC_API.replace("/api", "")}${route.asPath}`} />
                            </div>
            </div>
          </div>
          <div className="box col m-10">
            <b>الوصف</b>
            <p>{data.about}</p>
          </div>
        </div>
        <Gallray data={data?.images} />

        <div className="box col bord p-20 page w-full">
          <div className="box col m-10">
            <b>الميزات الداخلية</b>
            <div dangerouslySetInnerHTML={{ __html: interiorFeatures }} />
          </div>
          <div className="box col m-10">
            <b>ميزات الإقامة</b>
            <div dangerouslySetInnerHTML={{ __html: accommodationFeatures }} />
          </div>
          <div className="box col m-10">
            <b>الميزات الداخلية</b>
            <div dangerouslySetInnerHTML={{ __html: generalDetails }} />
          </div>
        </div>
      </div>
    </div>
  );
}
