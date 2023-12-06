import HomeContainer from "../../components/HomeContainer";

import { DashboardContainer } from "../../components/DashboardContainer";
import { Typography } from "@mui/material";

export default function Home() {

    return (
        <DashboardContainer>
            <Typography variant="h5" mt={5} mb={2} >
                Sistema de Agendamento de Doação de Sangue
            </Typography>
            <HomeContainer />
        </DashboardContainer>
    )
}