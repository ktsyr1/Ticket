import { createStyles, Header, Autocomplete, Group, Burger, rem, getStylesRef } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';

import {
    IconMenu, IconSteeringWheel, IconCurrencyDollar, IconCalendarTime, IconMapPin, IconClockPlay
} from '@tabler/icons-react';
import Link from 'next/link';


const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        position: "absolute",
        marginBottom: 0,
        display: "flex",
        flexDirection: "column"
    },

    inner: {
        // height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', 
        width: '-webkit-fill-available'
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },
    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    },
    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));


export function NavHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();

    function openMenu() {
        document.querySelector(".menu")?.classList.toggle('menu-none')
    }
    return (
        <nav >
            <div className={classes.inner}>
                <IconMenu className={classes.linkIcon} stroke={1.5} onClick={openMenu} />

                <Link href="/" className="box row aitem">
                    <Image src={'/images/logo.png'} width={40} height={40} alt='logo ansfni' />
                    <p style={{ color: "#000" }}>تكت مسافر - Ticket Musafir </p>
                </Link>
                <div></div>
            </div>
            {/* <Menu /> */}
        </nav>
    );
}
