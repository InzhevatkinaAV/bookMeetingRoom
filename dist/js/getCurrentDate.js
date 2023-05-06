const formatter = new Intl.DateTimeFormat('RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

export function getCurrentDate() {
    const currentDate = new Date();
    const formattedCurrentDate = formatter.format(currentDate);
    const arrayCurrentDate = formattedCurrentDate.replace(/[^0-9]/gi, ' ').split(' ').filter(e => e != '');

    return arrayCurrentDate;
}