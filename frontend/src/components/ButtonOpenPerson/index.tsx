import { OpenInNew } from "@mui/icons-material"
import { IconButton } from "@mui/material"

interface IButtonOpenPersonProps {
    personId: number
}

export default function ButtonOpenPerson({ personId }: IButtonOpenPersonProps) {

    const handleOpenPersonNewWindow = () => {
        const url = `/person/${personId}`;

        window.open(url, '_blank');
    }

    return (
        <IconButton onClick={handleOpenPersonNewWindow} sx={{ ml: 1 }} size="small">
            <OpenInNew fontSize="small" />
        </IconButton>
    )
}