import BloodTypesContainer from "../../components/BloodTypesContainer";

import { DashboardContainer } from "../../components/DashboardContainer";
import { Typography } from "@mui/material";

export default function BloodTypes() {

    return (
        <DashboardContainer>
            <Typography variant="h5" mt={5} mb={2} >
                Tipos Sanguíneos
            </Typography>
            <BloodTypesContainer />
        </DashboardContainer>
    )
}