import { Bloodtype, Home, LocalHospital, Person, Place, VolunteerActivism } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom';

interface MyListItemProps {
    icon: JSX.Element
    router: string
    iconText: string
}

function MyListItem({ icon, router, iconText }: MyListItemProps) {

    const navigate = useNavigate()

    const handleSection = () => navigate(router)

    return (
        <ListItem onClick={handleSection} >
            <ListItemButton sx={{ p: 1, borderRadius: 2 }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={iconText} />
            </ListItemButton>
        </ListItem>
    )
}

export function DrawerListItem() {

    return (
        <List>
            <MyListItem icon={<Home />} router='/' iconText="Início" />
            <MyListItem icon={<Person />} router='/person' iconText="Pessoas" />
            <MyListItem icon={<VolunteerActivism />} router='/donation' iconText="Doações" />
            <MyListItem icon={<Bloodtype />} router='/blood-type' iconText="Tipo Sanguíneo" />
            <MyListItem icon={<LocalHospital />} router='/collection-location' iconText="Locais de Coleta" />
            <MyListItem icon={<Place />} router='/location' iconText="Cidade / Estado" />
        </List>
    )
}