import { useState } from 'react';
import { createStyles, getStylesRef } from '@mantine/core';
import { IconHome, IconArticle, IconCar, IconHotelService, Icon2fa, } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
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
    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    }
}));


const data = [
    { label: 'الرئيسية', link: "/", Icon: IconHome, color: 'blue' },
    { label: 'اوتيلات', link: "/hotels", Icon: IconHotelService, color: 'cyan' },
    // { label: 'المنشورات', link: "/admin/posts", icon: IconArticle, color: 'green' },
    // { label: 'السيارة مع السائق', link: "/admin/car-with-driver", icon: IconCar, color: 'teal' },
];

export function Menu() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');

    const links = data?.map(({ link, label, Icon }) => (
        <Link href={link} key={label} className={cx(classes.link, { [classes.linkActive]: label === active })} >
            <Icon className={classes.linkIcon} stroke={1.5} />
            <span className="mr-20">{label}</span>
        </Link>
    ));

    return (
        <div className='menu' >
            {links}
        </div>
    );
}
