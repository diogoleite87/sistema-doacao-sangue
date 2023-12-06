import PersonsContainer from "../../components/PersonsContainer";

import { DashboardContainer } from "../../components/DashboardContainer";
import { Typography } from "@mui/material";

export default function Persons() {

    return (
        <DashboardContainer>
            <Typography variant="h5" mt={5} mb={2} >
                Pessoas / Doadores
            </Typography>
            <PersonsContainer />
        </DashboardContainer>
    )
}