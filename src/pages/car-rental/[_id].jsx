import axios from "axios";
import { useRouter } from "next/router";
import { HeroPart } from "@/theme/Elements";
import SEO from "@/lib/SEO";

export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-rental`);
  const paths = data.map((car) => ({ params: { _id: car._id } }));
  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-rental/${encodeURIComponent(ctx.params._id)}`);
  return { props: { data }, revalidate: 10 };
}

export default function CarRentalDetail({ data }) {
  const router = useRouter();

  return (
    <div className="box col m-a j">
      <SEO title={`${data.brand} ${data.model}`} description={data.description} image={data.image} />

      <HeroPart iconType={false} title={`${data.brand} ${data.model}`} />

      <div className="box grid m-a j">
        {/* عرض معلومات السيارة المعينة هنا */}
        {/* مثال: */}
        {/* <p>السعر: {data.price}</p> */}
      </div>
    </div>
  );
}


let a ={
  image: String,
  brand: String,  model: String,
  price: Number,

  transmission: String,
  year: Number,
  fuelType: String,
  seats: Number,
  childSeat: Boolean,
  
  pickupLocation: String,
  dropoffLocation: String,
  
  description: String,  
  priceIncludes: String,
  
  

  insurance: String,
  duration: String,
}