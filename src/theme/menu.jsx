import { useEffect, useState } from 'react';
import { createStyles, getStylesRef } from '@mantine/core';
import Link from 'next/link';
import Cookies from "js-cookie";
import {
    IconHome,
    IconBuilding,
    IconLayout2,
    IconHotelService,
    IconCar,
    IconListDetails,
    IconInfoSquareRounded,
    IconBrandWhatsapp,
    IconSteeringWheel,
    IconAirBalloon
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'deploy',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },
    linkHome: {
        ...theme.fn.focusStyles(),
        padding: '10px',
        color: '#666',
        fontSize: '15px',
        margin: '10px',
        borderBottom: '1px solid #888',
        display: 'flex',
        alignItems: 'center'
    },
    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    }
}));

const data = [ 
    { label: 'اوتيلات', link: "/hotels", Icon: IconHotelService, color: 'cyan' },
    { label: 'شقق فندقية', link: "/hotel-apartment", Icon: IconBuilding, color: 'green' },
    { label: 'السيارة مع السائق', link: "/car-with-driver", Icon: IconCar, color: 'teal' },
    { label: 'تاجير السيارات', link: "/car-rental", Icon: IconSteeringWheel, color: 'pink' },
    { label: 'البرامج السياحية', link: "/program", Icon: IconAirBalloon, color: 'pink' },
    { label: 'من نحن', link: "/page/about", Icon: IconInfoSquareRounded, color: 'blue' }, 

];

export function Menu() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        let token = Cookies.get("token")
        if (token?.length > 15) setIsLogin(true)
    }, [])

    const links = data?.map(({ link, label, Icon }) => (
        <Link href={link} key={label} className={cx(classes.link, { [classes.linkActive]: label === active })} >
            <Icon className={classes.linkIcon} stroke={1.5} />
            <span className="mr-20">{label}</span>
        </Link>
    ))

    return (
        <div className='menu ' > 
            {links}

        </div>
    );
}
