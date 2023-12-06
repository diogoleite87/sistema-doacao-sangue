import PersonContainer from "../../components/PersonContainer";

import { DashboardContainer } from "../../components/DashboardContainer";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Person() {

    let { id } = useParams();

    return (
        <DashboardContainer>
            <Typography variant="h5" mt={5} mb={2} >
                Código do Doador: {id}
            </Typography>
            <PersonContainer personId={Number(id)} />
        </DashboardContainer>
    )
}