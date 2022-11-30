import dayjs from 'dayjs';

const dateFormat = (date: string) => dayjs(date).format('DD.MM.YYYY').toString();

const currentLongDateFormat = () => dayjs().format('YYYY-MM-DDTHH:mm:ss').toString();

export { dateFormat, currentLongDateFormat }
