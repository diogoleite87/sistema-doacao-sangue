import LocationsContainer from "../../components/LocationsContainer";

import { DashboardContainer } from "../../components/DashboardContainer";
import { Typography } from "@mui/material";

export default function Locations() {

    return (
        <DashboardContainer>
            <Typography variant="h5" mt={5} mb={2} >
                Cidades / Estados
            </Typography>
            <LocationsContainer />
        </DashboardContainer>
    )
}