export const formatDate = (dateString: Date) => {
    const dateObject = new Date(dateString);

    if (isNaN(dateObject.getTime())) {
        return 'Data inválida';
    }

    const formattedDate = dateObject.toISOString().split('T')[0];

    return formattedDate;
};
