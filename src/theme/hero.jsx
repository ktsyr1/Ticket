import { createStyles, Container, Title, Text, Button, rem } from '@mantine/core';
import { IconBrandWhatsapp, IconArticle, IconCar, IconHotelService, Icon2fa, } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: '#11284b',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
            'linear-gradient(70deg, rgba(130, 201, 30, 0) 0%, #32463354 70%), url(https://firebasestorage.googleapis.com/v0/b/ticket-e67c3.appspot.com/o/images%2F6903908a5635db48a24837b8979444975880767601992b.jpg?alt=media&token=456c1da6-2435-4ef7-9500-6fce7f92d460)',
        paddingTop: `calc(${theme.spacing.xl} * 3)`,
        paddingBottom: `calc(${theme.spacing.xl} * 3)`,
        direction: "rtl"
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    image: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    content: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        // marginRight: `calc(${theme.spacing.xl} * 3)`,

    },

    title: {
        color: theme.white,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        lineHeight: 1.05,
        // maxWidth: rem(500),
        fontSize: rem(48),

        [theme.fn.smallerThan('md')]: {
            // maxWidth: '100%',
            fontSize: rem(34),
            lineHeight: 1.15,
        },
    },

    description: {
        color: theme.white,
        opacity: 0.75,
        maxWidth: rem(500),

    },

    control: {
        paddingLeft: rem(50),
        paddingRight: rem(50),
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(22),

    },
}));

export function Hero() {
    const { classes } = useStyles();
    return (
        <div className={classes.root}>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>

                            <Text component="span" inherit variant="gradient" gradient={{ from: '#3F51B5', to: '#03A9F4' }} >
                                جمال بلا حدود
                            </Text>{' '}
                            وسياحة مريحة بين يديك
                        </Title>

                        <Text className={classes.description} mt={30}>
                            اكتشف جمال طربزون بأسلوب فريد وتجربة لا تُنسى لعشاق السفر. تكت مسافر هو مصدرك الممتاز لاستكشاف مدينة طربزون واكتشاف كنوزها السياحية الخفية. نحن نقدم لك رحلة سياحية استثنائية في هذه المدينة الخلابة على ساحل البحر الأسود.
                        </Text>

                        <Button
                            variant="gradient"
                            gradient={{ from: '#3F51B5', to: '#03A9F4' }}
                            size="xl"
                            className={classes.control}
                            mt={40}
                        >
                            <IconBrandWhatsapp />
                            <p>تواصل معنا على وتساب</p>                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}