import { AuthServerSide } from '@/lib/app2'
import Link from 'next/link'
import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, rem, } from '@mantine/core';
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
    { title: 'المستخدمين', href: "/admin/users", icon: IconUsers, color: 'green' },
    { title: 'المنشورات', href: "/admin/posts", icon: IconArticle, color: 'green' },
    { title: 'السيارة مع السائق', href: "/admin/car-with-driver", icon: IconCar, color: 'green' },
    { title: 'اوتيلات', href: "/admin/hotels", icon: IconHotelService, color: 'green' },
    { title: 'شقق فندقية', href: "/admin/hotel-apartment", icon: IconHotelService, color: 'green' },
    { title: 'تاجير السيارات', href: "/admin/car-rental", icon: IconSteeringWheel, color: 'green' },
    { title: 'البرامج السياحية', href: "/admin/program", icon: IconAirBalloon, color: 'green' },
];

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },

    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 150,
        borderRadius: theme.radius.md,
        height: rem(90),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease, transform 100ms ease',

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.05)',
        },
    },
}));

export default function ActionsGrid() {
    const { classes, theme } = useStyles();

    const items = mockdata.map((item) => (
        <Link href={item.href} key={item.title} className="aitem bord box col h-100 j w-200 m-10">
            <item.icon color={theme.colors[item.color][6]} size="2rem" />
            <Text size="xs" mt={7}>
                {item.title}
            </Text>
        </Link>
    ));

    return (
        <div>
            <h1 className="m-20"> لوحة التحكم</h1>
            <div className="box grid">
                {items}
            </div>
        </div>
    );
}
