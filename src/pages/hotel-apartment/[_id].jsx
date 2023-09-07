import axios from "axios";
import { useRouter } from "next/router";
import { IconMapPin, IconStars, IconWifi, IconParking, } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';

export async function getStaticPaths() {
  let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/hotel-apartment`);
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
    `${process.env.NEXT_PUBLIC_API}/client/hotel-apartment/${encodeURIComponent(ctx.params._id)}`
  );
  return { props: { data }, revalidate: 10 * 60 };
}

export default function PageOne({ data }) {

  return (
    <div className="  m-10">
      <article className="  box col m-a page hotel  ">
        <div className="bord box col m-a page   m-0">
          <div className="box grid m-10 j hotel-title">
            <img src={data.image} alt={`صورة ${data.name}`} className="" style={styles.image} loading="lazy" />
            <div className="box col m-10 mx-20 w-300">
              <h1 className="m-0">{data.name}</h1>
              <div className="aitem box m-10 row">
                {/* icon city */}
                <IconMapPin size={18} />
                <p className="mr-10">{data.city} - {data.address}</p>
              </div>

            </div>
          </div>
          <div className="box col m-10">
            <b>الوصف</b>
            <p>{data.about}</p>
          </div>
        </div>
        <div className=" bord my-10 p-20 row scroll" >
          <div className="box row "  >
            {data?.images.length > 0
              ? data?.images?.map(a => <img src={a} key={a} style={{ borderRadius: '10px', height: '200px', margin: '5px' }} loading="lazy" />)
              : <p className="aitem box h-100 j m-a">لايوجد صور </p>
            }
          </div>
        </div>
        <div className="box grid bord p-20">
          <div className="box col m-10">
            <b>interiorFeatures</b>
            <p>{data?.interiorFeatures}</p>
          </div>
          <div className="box col m-10">
            <b>accommodationFeatures</b>
            <p>{data?.accommodationFeatures}</p>
          </div>
          <div className="box col m-10">
            <b>generalDetails</b>
            <p>{data?.generalDetails}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
