import CollectionsLocationContainer from "../../components/CollectionLocationsContainer";

import { DashboardContainer } from "../../components/DashboardContainer";
import { Typography } from "@mui/material";

export default function CollectionLocations() {

    return (
        <DashboardContainer>
            <Typography variant="h5" mt={5} mb={2} >
                Locais de Coleta
            </Typography>
            <CollectionsLocationContainer />
        </DashboardContainer>
    )
}