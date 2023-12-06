import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { LoadingButton } from '@mui/lab';


interface IConfirmDeleteDialogProps {
    open: boolean,
    setOpen(state: boolean): void,
    handleExecute: () => void,
    loading: boolean,
    title: string
    subTitle: string
}

export default function ConfirmDeleteDialog({ open, setOpen, title, subTitle, handleExecute, loading }: IConfirmDeleteDialogProps) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {subTitle}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} >Recusar</Button>
                <LoadingButton loading={loading} variant='text' onClick={handleExecute} autoFocus >
                    Aceitar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}