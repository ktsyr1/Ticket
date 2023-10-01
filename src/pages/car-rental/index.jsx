import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { HeroPart } from "@/theme/Elements";
import SEO from "@/lib/SEO";

export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-rental`);
  return { props: { data }, revalidate: 10 };
}

export default function CarRentals({ data }) {
  const router = useRouter();

  return (
    <div className="box col m-a j">
      <SEO title="سيارات التأجير" description="عرض جميع سيارات التأجير المتاحة" />

      <HeroPart iconType={false} title="سيارات التأجير" />

      <div className="box grid m-a j">
        {data.map((car) => (
          <div key={car._id} className="car-card">
            {/* عرض معلومات السيارة هنا */}
            {/* مثال: */}
            <p>{car.brand} - {car.model}</p>
            <Link href={`/car-rental/${car._id}`} className="btn">عرض التفاصيل </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

 
