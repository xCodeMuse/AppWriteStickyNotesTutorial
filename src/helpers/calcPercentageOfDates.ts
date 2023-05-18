export const calcPercentageOfDates = (startDate: Date, endDate: Date) => {
    const start = startDate.getTime();
    const now = Date.now();
    const end = endDate.getTime();
    const diff = end - start;
    const timePassed = now - start;

    const percentage = (timePassed / diff) * 100;

    return percentage < 100 ? percentage : 100;
};

export default calcPercentageOfDates;
