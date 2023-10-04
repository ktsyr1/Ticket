// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { HeroPart } from "@/theme/Elements";
// import SEO from "@/lib/SEO";
// import NotFoundTitle from "../404";
// import {
//     IconMapPin,
//     IconAirBalloon,
//     IconHourglassHigh,
//     IconCurrencyDollar,
//     IconArmchair,
//     IconManualGearbox,
//     IconSteeringWheel,
// } from '@tabler/icons-react';

// export async function getStaticProps() {
//     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/client/car-rental`);
//     return { props: { data }, revalidate: 10 };
// }

// export default function CarRentals({ data }) {
//     const router = useRouter();
//     let about = "عرض جميع سيارات التأجير المتاحة"
//     if (!data) return <NotFoundTitle />
//     else return (
//         <div className="box col m-a j">
//             <SEO title="تاجير السيارات" description={about} />

//             <HeroPart iconType={true} Icon={IconSteeringWheel} title="تاجير السيارات" about={about} />

//             <div className="box grid m-a j">
//                 {data?.map((car) => <CardCarRental {...car} title={`${car.brand} ${car.model} ${car.year}`} />)}
//             </div>
//         </div>
//     );
// }

// export const CardCarRental = (data) => {
//     let { title, image, href, price, duration } = data
//     let Item = ({ Icon, value }) => value ? <div className="box aitem row my-10" style={{ width: '130px' }}> <Icon size={30} /> <p className="mr-10">{value}</p> </div> : <></>
//     let Row = ({ children }) => <div className="box row c"> {children}</div>
//     return (
//         <Link className="card" href={href || `/car-rental/${data._id}`} style={{ color: "#555" }}>
//             <img src={image || "/images/image-null.png"} alt={title} className="w-full h-auto mb-2" loading="lazy" />
//             <div style={{ padding: '15px', color: '#555', marginBottom: '10px', paddingBottom: '0' }}><b>{title}</b></div>
//             <div className="box grid mx-10 mb-10 mt-0" style={{ backgroundColor: '#eee', padding: '10px', borderRadius: '10px' }}>

//                 <Item Icon={IconHourglassHigh} value={duration} />
//                 <Item Icon={IconCurrencyDollar} value={price} />

//                 <Item Icon={IconArmchair} value={data.seats} />
//                 <Item Icon={IconManualGearbox} value={data.transmission} />
//                 {data.fuelType ? <div className="box aitem row my-10" style={{ width: '130px' }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
//                         <path d="M22 10.2325V15.8834C22 18.7668 22 20.2085 21.1213 21.1042C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1042C2 20.2085 2 18.7668 2 15.8834V13.0869C2 10.9906 2 9.94241 2.55325 9.14745C3.1065 8.3525 4.07697 8.00623 6.0179 7.3137L14.0179 4.45927C17.6539 3.16195 19.4718 2.51329 20.7359 3.42756C21.4239 3.92513 21.7374 4.73349 21.8803 6" stroke="#555" stroke-width="1.5" stroke-linecap="round" />
//                         <path d="M9 14C9 12.5858 9 11.8787 9.43934 11.4393C9.87868 11 10.5858 11 12 11C13.4142 11 14.1213 11 14.5607 11.4393C15 11.8787 15 12.5858 15 14C15 15.4142 15 16.1213 14.5607 16.5607C14.1213 17 13.4142 17 12 17C10.5858 17 9.87868 17 9.43934 16.5607C9 16.1213 9 15.4142 9 14Z" stroke="#555" stroke-width="1.5" />
//                         <path d="M15 11L16 10" stroke="#555" stroke-width="1.5" stroke-linecap="round" />
//                         <path d="M9 11L8 10" stroke="#555" stroke-width="1.5" stroke-linecap="round" />
//                         <path d="M15 17L16 18" stroke="#555" stroke-width="1.5" stroke-linecap="round" />
//                         <path d="M9 17L8 18" stroke="#555" stroke-width="1.5" stroke-linecap="round" />
//                         <path d="M5 7.06009C5 5.75506 5 5.10254 5.33815 4.65303C5.4252 4.53731 5.52676 4.43372 5.64021 4.34492C6.08089 4 6.7206 4 8 4H8.81818C9.32544 4 9.57907 4 9.78716 4.05687C10.3519 4.21122 10.7929 4.66113 10.9442 5.23713" stroke="#555" stroke-width="1.5" stroke-linecap="round" />
//                     </svg>
//                     <p className="mr-10">{data.fuelType}</p>
//                 </div> : <></>}
//                 {data.childSeat ? <div className="box aitem row my-10" style={{ width: '130px' }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17 4.5C17 5.9 15.9 7 14.5 7S12 5.9 12 4.5 13.1 2 14.5 2 17 3.1 17 4.5M15 8H14.2C12.1 8 10.1 6.8 9.1 4.9C9 4.8 8.9 4.7 8.9 4.6L7.1 5.4C7.6 6.8 9.2 8.6 11.5 9.5L9.7 14.5L5.8 13.4L3 18.9L5 19.4L6.8 15.8L11.3 17C12.3 17.2 13.3 16.7 13.7 15.8L16 9.4C16.2 8.7 15.7 8 15 8M18.9 7L15.5 16.4C14.9 18 13.4 19 11.8 19C11.5 19 11.1 19 10.8 18.9L7.9 18.1L7 19.9L9 20.4L10.4 20.8C10.9 20.9 11.4 21 11.9 21C14.4 21 16.6 19.5 17.5 17.1L21 7H18.9Z" /></svg>
//                     <p className="mr-10">{data.childSeat ? "متاح" : "غير متاح"}</p>
//                 </div> : <></>}
//             </div>
//         </Link>
//     );
// };




export default function name() { }