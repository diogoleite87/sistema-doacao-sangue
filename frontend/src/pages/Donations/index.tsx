import DonationsContainer from "../../components/DonationsContainer";

import { DashboardContainer } from "../../components/DashboardContainer";
import { Typography } from "@mui/material";

export default function Donations() {

    return (
        <DashboardContainer>
            <Typography variant="h5" mt={5} mb={2} >
                Doações
            </Typography>
            <DonationsContainer />
        </DashboardContainer>
    )
}