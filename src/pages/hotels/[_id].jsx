import axios from "axios";
import { useRouter } from "next/router";
import { IconMapPin, IconStars, IconWifi, IconParking, } from '@tabler/icons-react';
import LineTitles, { ContactWa } from "@/theme/Elements";

export async function getStaticPaths() {
  let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotels`);
  const paths = data.map((post) => ({ params: { _id: post._id } }));
  return { paths, fallback: false };
}
let styles = {
  image: {
    width: '320px',
    borderRadius: '20px',
    boxShadow: '0 0 10px #ddd'
  }
}
export async function getStaticProps(ctx) {
  let { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/client/hotels/${encodeURIComponent(ctx.params._id)}`
  );
  return { props: { data }, revalidate: 10 * 60 };
}

export default function PageOne({ data }) {
  let route = useRouter()
  return (
    <div className="  m-10">
      <LineTitles data={[{ href: "/hotels", title: "الاوتيلات" }]} />
      <article className="  box col m-a page hotel  ">
        <div className="bord box col m-a page   m-0">
          <div className="box grid m-10 j hotel-title">
            <img src={data.image} alt={`صورة ${data.name}`} className="" style={styles.image}  loading="lazy"/>
            <div className="box col m-10 mx-20 w-300">
              <h1 className="m-0">{data.name}</h1>
              <div className="aitem box m-10 row">
                {/* icon city */}
                <IconMapPin size={18} />
                <p className="mr-10">{data.city} - {data.address}</p>
              </div>
              <div className="aitem box m-10 row">
                <IconStars size={18} />
                {/* icon stars */}
                <p className="mr-10">{data.rank}</p>
              </div>
              <ContactWa href={`${process.env.NEXT_PUBLIC_API.replace("/api", "")}${route.asPath}`} />
            </div>
          </div>
          <div className="box col m-10">
            <b>الوصف</b>
            <p>{data.description}</p>
          </div>
        </div>
        <div className=" bord my-10 p-20 row scroll" >
          <div className="box row "  >
            {data?.images.length > 0 
            	?data?.images?.map(a => <img src={a} key={a} style={{ borderRadius: '10px', height: '200px', margin: '5px' }}  loading="lazy"/>)
            	:<p className="aitem box h-100 j m-a">لايوجد صور </p>
            }
          </div>
        </div>
        <div className="box grid bord p-20">

          <div className="box col w-200">
            <b>الخدمات</b>
            <div className="aitem box m-10 row">

              {/* icon wifi */}
              <IconWifi size={18} />
              <p className="mr-10">{data.services.freeWiFi ? "" : "لا"} وايفاي مجانية</p>
            </div>
            <div className="aitem box m-10 row">

              {/* icon parking */}
              <IconParking size={18} />
              <p className="mr-10">{data.services.freeParking ? "" : "لا"} موقف سيارات مجانية</p>
            </div>
            <div className="aitem box m-10 row">

              {/* icon breakfast */}
              <IconWifi size={18} />
              <p className="mr-10">{data.services.breakfast ? "" : "لا"} فطور </p>
            </div>
          </div>
          <div className="box col w-300">
            <b>محيط مكان الإقامة</b>
            <p>{data.surroundingArea}</p>
          </div> </div>
      </article>
    </div>
  );
}

