import { createStyles, Header, Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
// import { MantineLogo } from '@mantine/ds';
import Link from 'next/link';
import { Menu } from './menu';


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
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    return (
        <nav >
            <div className={classes.inner}>
                <Group>
                    {/* <Image src={'/images/menu.png'} width={40} height={40} alt='logo ansfni' onClick={openMenu} /> */}
                    <Image src={'/images/logo.png'} width={40} height={40} alt='logo ansfni' />
                    <p style={{ color: "#000" }}>تكت مسافر - Ticket Musafir </p>

                </Group>

            </div>
            <Menu />
        </nav>
    );
}
