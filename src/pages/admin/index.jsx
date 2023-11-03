import { AuthServerSide } from '@/lib/app2'
import Link from 'next/link'
import { Text } from '@mantine/core';
import {
    IconUsers,
    IconSteeringWheel,
    IconRepeat,
    IconArticle,
    IconCar,
    IconHotelService,
    IconReport,
    IconCashBanknote,
    IconCoin,
    IconAirBalloon,
} from '@tabler/icons-react';

export async function getServerSideProps(ctx) {
    return AuthServerSide(ctx, () => ({}))
}

const mockdata = [
    { title: 'المستخدمين', href: "/admin/users", icon: IconUsers },
    { title: 'المنشورات', href: "/admin/posts", icon: IconArticle },
    { title: 'السيارة مع السائق', href: "/admin/car-with-driver", icon: IconCar },
    { title: 'اوتيلات', href: "/admin/hotels", icon: IconHotelService },
    { title: 'شقق فندقية', href: "/admin/hotel-apartment", icon: IconHotelService },
    { title: 'تاجير السيارات', href: "/admin/car-rental", icon: IconSteeringWheel },
    { title: 'البرامج السياحية', href: "/admin/program", icon: IconAirBalloon },
];

export default function AdminHome() {
    const items = mockdata.map((item) => (
        <Link href={item.href} key={item.title} className="aitem bord box col h-100 j w-200 m-10">
            <item.icon color={"#555"} size="2rem" />
            <Text size="xs" mt={7}>
                {item.title}
            </Text>
        </Link>
    ));

    return (
        <div>
            <h1 className="m-20"> لوحة التحكم</h1>
            <div className="box grid"> {items} </div>
        </div>
    );
}
