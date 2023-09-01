import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import { IconUsers, IconArticle, IconCar, IconHotelService, Icon2fa, IconDatabaseImport, IconReceipt2, IconSwitchHorizontal, IconLogout, } from '@tabler/icons-react';

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
        marginRight: theme.spacing.sm,
    },
    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    },
}));


const data = [
    { label: 'المستخدمين', link: "/admin/users", icon: IconUsers, color: 'blue' },
    { label: 'المنشورات', link: "/admin/posts", icon: IconArticle, color: 'green' },
    { label: 'السيارة مع السائق', link: "/admin/car-with-driver", icon: IconCar, color: 'teal' },
    { label: 'اوتيلات', link: "/admin/hotels", icon: IconHotelService, color: 'cyan' },
];

export function Menu() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span className="mr-20">{item.label}</span>
        </a>
    ));

    return (
        <div className='bord w-300 m-10 menu'>
            <div className='box col' style={{width: '280px'}}>

                {links}
            </div>

        </div>
    );
}
