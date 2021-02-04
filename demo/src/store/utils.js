export const header = () => ({
    headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
    }
});