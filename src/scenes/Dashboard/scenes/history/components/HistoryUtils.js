
class HistoryUtils {

    static findClosestDate(date, otherDates) {
        let closestDate = "";
        let minTimeDiff = Number.MAX_SAFE_INTEGER;
        var date1 = new Date(date);
        for (let index = 0; index < otherDates.length; index++) {
            const currentDate = otherDates[index];
            // distance between dates
            var date2 = new Date(currentDate);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            if (timeDiff < minTimeDiff) {
                minTimeDiff = timeDiff;
                closestDate = currentDate;
            }


        }
        return closestDate;
    }

    /**
     * Hide invalid transactions (value < 0), keeping bonus.
     * @param {transaction object} transaction 
     */
    static filterInvalid(transaction) {
        if (transaction.source === 'bonus') {
            return true
        }
        else {
            return transaction.value >= 0
        }
    }

    static getTransactionsByDate = (transactions) => {
        let byday = {};
        let transactionsByDay = [];
        function groupday(value) {
            byday[value.date] = byday[value.date] || [];
            byday[value.date].push(value);
        }
        transactions.map(groupday);
        transactions.reverse();

        for (var prop in byday) {
            transactionsByDay.push(byday[prop]);
        }
        transactionsByDay.sort(function (a, b) {
            return (a[0].date > b[0].date);
        });

        return transactionsByDay;
    }

    static getDatesInRange = (startDate, endDate) => {
        let dates = [],
            currentDate = startDate,
            addDays = function (days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    static getDifferentDates = (info) => {
        let differentDates = [];
        info.forEach(causeInfo => {
            const datesForCause = causeInfo.daysNames;
            datesForCause.forEach(date => {
                if (!differentDates.includes(date))
                    differentDates.push(date);
            });
        });

        // sort dates
        differentDates.sort(function (a, b) {
            return (a > b);
        });
        return differentDates;
    }

    static getPointsByDate = (transactionsByDay) => {
        const pointsByDate = [];
        for (let index = 0; index < transactionsByDay.length; index++) {
            const dayInfo = transactionsByDay[index];
            let toAdd = HistoryUtils.sumTransactions(dayInfo);
            if (index > 0)
                toAdd += pointsByDate[index - 1];
            pointsByDate.push(toAdd);
        }
        return pointsByDate;
    }



    static sumTransactions = (transactions) => {
        let sum = 0;
        transactions.forEach(transaction => {
            sum += transaction.value;
        });
        return sum;
    }
}

export default HistoryUtils;