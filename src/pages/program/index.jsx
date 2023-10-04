// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { IconMapPin, IconStars , IconAirBalloon ,IconHourglassHigh ,IconCurrencyDollar} from '@tabler/icons-react';
// import { HeroPart } from "@/theme/Elements";
// import SEO from "@/lib/SEO";

// export async function getStaticProps() {
//     let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/program`);
//     return { props: { data }, revalidate: 10 };
// }

// export default function Program({ data }) {
//     const router = useRouter();
//     let icon = <img src={"/icons/hotel.svg"} alt=" ايقونة الفنادق" className="w-50" />
//     let about = "انطلق في مغامرة استثنائية واستكشف عجائب الطبيعة في هذا البرنامج المثير. ستتاح لك الفرصة لاستكشاف المناظر الطبيعية الساحرة، والغابات الكثيفة، والشلالات الرائعة. "
//     return (
//         <div className="box col m-a j">
//             <SEO title="البرامج السياحية" description={about} />
//             <HeroPart iconType={true} Icon={IconAirBalloon} title="البرامج السياحية" about={about} />

//             <div className="box grid m-a j">
//                 {data.map((e) => (
//                     <CardProgram
//                         key={e._id}
//                         title={e.title}
//                         image={e.image}
//                         price={e.price}
//                         duration={e.duration}
//                         href={`/program/${encodeURIComponent(e._id)}`}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }
// export const CardProgram = ({ title, image, href, price, duration }) => {
//     return (
//         <Link className="card" href={href}>
//             <img src={image || "/images/image-null.png"} alt={title} className="w-full h-auto mb-2" loading="lazy" />
//             <div style={{padding: '15px',color: '#555',marginBottom: '10px'}}><b>{title}</b></div>
//             {price && duration ? <div className="aitem box my-10 programCard row space"  >
//                 <div className="box row aitem">
//                     <IconHourglassHigh size={18} />
//                     <p className="mr-10">{duration}</p>
//                 </div>
//                 {price ? <div className="box row aitem">
//                     <IconCurrencyDollar size={18} />
//                     <p className="mr-10">{price}</p>
//                 </div> : <></>}
//             </div> : <></>}
//         </Link>
//     );
// };
export default function name() { }

