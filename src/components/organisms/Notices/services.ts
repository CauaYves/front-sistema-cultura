import dayjs from 'dayjs';

const useNoticesService = {
    isDateGreaterThanToday(dateString: string): boolean {
        const inputDate = dayjs(dateString);
        const today = dayjs();
        return inputDate.isAfter(today);
    },
    formatISODate(ISODate: string) {
        const slicedDate = ISODate.slice(0, 10);
        const year = slicedDate.slice(0, 4);
        const month = slicedDate.slice(5, 7);
        const day = slicedDate.slice(8, 10);
        const formatedDate = `${day}/${month}/${year}`;
        return formatedDate;
    },
    handleSetIsLoading(setLoading: any, bool: boolean) {
        setLoading(bool);
    },
};

export default useNoticesService;
