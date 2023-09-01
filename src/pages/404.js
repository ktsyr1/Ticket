import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(220),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
       // color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
color: "#9b9b9b",

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(38),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(500),
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));

export default function NotFoundTitle() {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>الصفحة غير متوفرة </Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                للأسف ، هذه ليست سوى صفحة 404. ربما أخطأت في كتابة العنوان ، أو تم نقل الصفحة إلى عنوان URL آخر.
            </Text>
            <Group position="center">
                <Link href="/" className='btn'> العودة للصفحة الرئيسية </Link>
            </Group>
        </Container>
    );
}
