import Link from "next/link";
import {
    IconHourglassHigh,
    IconArmchair,
    IconManualGearbox,
    IconSteeringWheel,
    IconCurrencyDollar,
    IconCalendarTime,
    IconMap,
    IconMapPin,
    IconStars,
    IconWifi,
    IconParking,
} from '@tabler/icons-react';
import { IconBreakfast, IconFuelType } from "./icons";


export function CardHotel({ data, href }) {
    let { name, image, rank, city } = data
    let RowData = ({ el, Icon, text }) => {
        if (el) return (
            <div className="box row aitem  my-10"  >
                <Icon size={18} />
                <p className="mr-10">{el} {text}</p>
            </div>
        )
    }
    return (
        <Link className="card" href={href}>
            <img src={image || "/images/image-null.png"} alt={name} className="w-full h-auto mb-2" loading="lazy" />
            <b className="footer"> {name} </b>
            <div className="box col aitem space po"  >
                <div className="box row space px-10 w-full"  >
                    <RowData el={city} Icon={IconMapPin} />
                    <RowData el={rank} Icon={IconStars} />
                </div>
                <div className="box row space w-full"  >
                    <RowData el={data?.services?.freeWiFi} Icon={IconWifi} text="واي فاي " />
                    <RowData el={data?.services?.freeParking} Icon={IconParking} text="موقف سيارات" />
                    <RowData el={data?.services?.breakfast} Icon={IconBreakfast} text="افطار" />
                </div>
            </div>
        </Link>
    );
};



export function CardCWD({ data, href }) {

    const RowData = ({ title, Icon }) => {
        return (
            <div className="box row aitem "   >
                <Icon stroke={1.5} />
                <p className="m-10 ">{title}</p>
            </div>
        );
    };
    return (
        <Link className="card" href={href}>
            <img src={data?.carImage || "/images/logo-full.png"} alt={data?.title} className="w-full h-auto mb-2" />
            <div className="footer" >
                <b className="text-lg font-semibold">{data?.title}</b>
                <div className="box col">
                    <div className="box row space" style={{ width: '280px' }}>
                        <RowData title={data?.driver} Icon={IconSteeringWheel} />
                        <RowData title={data?.tourDuration} Icon={IconCalendarTime} />
                    </div>
                    <div className="box row space" style={{ width: '280px' }}>
                        <RowData title={data?.city} Icon={IconMap} />
                        <RowData title={data?.price} Icon={IconCurrencyDollar} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const CardCarRental = ({ data, href }) => {
    let { image, price, duration } = data
    let title = `${data.brand} ${data.model} ${data.year}`
    let Item = ({ Icon, value }) => value ? <div className="box aitem row my-10" style={{ width: '130px' }}> <Icon size={30} /> <p className="mr-10">{value}</p> </div> : <></>
    return (
        <Link className="card" href={href || `/car-rental/${data._id}`} style={{ color: "#555" }}>
            <img src={image || "/images/image-null.png"} alt={title} className="w-full h-auto mb-2" loading="lazy" />
            <div style={{ padding: '15px', color: '#555', marginBottom: '10px', paddingBottom: '0' }}><b>{title}</b></div>
            <div className="box grid mx-10 mb-10 mt-0" style={{ backgroundColor: '#eee', padding: '10px', borderRadius: '10px' }}>

                <Item Icon={IconHourglassHigh} value={duration} />
                <Item Icon={IconCurrencyDollar} value={price} />

                <Item Icon={IconArmchair} value={data.seats} />
                <Item Icon={IconManualGearbox} value={data.transmission} />
                <Item Icon={IconFuelType} value={data.fuelType} />

                {data.childSeat ? <div className="box aitem row my-10" style={{ width: '130px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17 4.5C17 5.9 15.9 7 14.5 7S12 5.9 12 4.5 13.1 2 14.5 2 17 3.1 17 4.5M15 8H14.2C12.1 8 10.1 6.8 9.1 4.9C9 4.8 8.9 4.7 8.9 4.6L7.1 5.4C7.6 6.8 9.2 8.6 11.5 9.5L9.7 14.5L5.8 13.4L3 18.9L5 19.4L6.8 15.8L11.3 17C12.3 17.2 13.3 16.7 13.7 15.8L16 9.4C16.2 8.7 15.7 8 15 8M18.9 7L15.5 16.4C14.9 18 13.4 19 11.8 19C11.5 19 11.1 19 10.8 18.9L7.9 18.1L7 19.9L9 20.4L10.4 20.8C10.9 20.9 11.4 21 11.9 21C14.4 21 16.6 19.5 17.5 17.1L21 7H18.9Z" fill="#555" /></svg>
                    <p className="mr-10">{data.childSeat ? "متاح" : "غير متاح"}</p>
                </div> : <></>}
            </div>
        </Link>
    );
};

export const CardProgram = ({ data, href }) => {
    let { title, image, price, duration } = data

    return (
        <Link className="card" href={href}>
            <img src={image || "/images/image-null.png"} alt={title} className="w-full h-auto mb-2" loading="lazy" />
            <div style={{ padding: '15px', color: '#555', marginBottom: '10px' }}><b>{title}</b></div>
            {price && duration ? <div className="aitem box my-10 programCard row space"  >
                <div className="box row aitem">
                    <IconHourglassHigh size={18} />
                    <p className="mr-10">{duration}</p>
                </div>
                {price ? <div className="box row aitem">
                    <IconCurrencyDollar size={18} />
                    <p className="mr-10">{price}</p>
                </div> : <></>}
            </div> : <></>}
        </Link>
    );
};
