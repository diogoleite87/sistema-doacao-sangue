import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CollectionLocationImage from '../../images/collection-location.png'
import BloodTypeImage from '../../images/blood-type.png'
import DonationImage from '../../images/donation.png'
import PersonImage from '../../images/person.png'

interface Card {
    title: string,
    image: string,
    description: string,
    url: string
}

const cards: Card[] = [
    {
        title: "Doação de Sangue",
        image: DonationImage,
        description: "Encontre informações sobre doação de sangue nesta seção.",
        url: "/donation"
    },
    {
        title: "Pessoas / Doadores",
        image: PersonImage,
        description: "Explore dados relacionados a pessoas e doadores aqui.",
        url: "/person"
    },
    {
        title: "Locais de Coleta",
        image: CollectionLocationImage,
        description: "Descubra os locais disponíveis para doação de sangue nesta área.",
        url: "/collection-location"
    },
    {
        title: "Tipo Sanguíneo",
        image: BloodTypeImage,
        description: "Descubra os tipos sanguíneos disponíveis nesta seção.",
        url: "/blood-type"
    }
];

export default function HomeContainer() {

    const navigate = useNavigate()

    const handleNavigate = (url: string) => {
        navigate(url)
    }

    return (
        <Grid container spacing={3} mt={2}>
            {cards.map((card, index) => (
                <Grid item xs={6} key={index} >
                    <Card>
                        <CardMedia
                            component="img"
                            height="180"
                            image={card.image}
                            alt={card.title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {card.title}
                            </Typography>
                            <Box mt={1} display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant="body2" color="text.secondary" width='80%'>
                                    {card.description}
                                </Typography>
                                <Button variant="contained" size="small" onClick={() => handleNavigate(card.url)}>
                                    Navegar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}