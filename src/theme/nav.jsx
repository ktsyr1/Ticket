import { createStyles, Header, Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
// import { MantineLogo } from '@mantine/ds';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        position: "absolute",
        marginBottom: 0
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


export function NavHeader({ links }) {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();

    const items =[]
     links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={link.ok === true ? " btn" : " "}
        // onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={56} className={classes.header} mb={120}>
            <div className={classes.inner}>
                <Group>
                    {/* <Burger opened={opened} onClick={toggle} size="sm" />*/}
                    <b style={{ fontSize: "30px" }}>Ticket</b>
                    {/* <Image src={'/images/logo.png'} width={40} height={40} alt='logo ansfni' /> */}

                </Group>

                <Group>
                    <Group ml={50} spacing={5} className={classes.links}>
                        {items}
                    </Group>
                </Group>
            </div>
        </Header>
    );
}
