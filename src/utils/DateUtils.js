class DateUtils {

    static quizAvailableForDate = (quiz) => {

        const quizDate = new Date(String(quiz.date));
        quizDate.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        var available = (currentDate.getTime() - quizDate.getTime()) >= 0;
        return available;
    }

    static formatDate = (dateString, abbreviation = true, justDate = false) => {
        // var monthNames = [
        //     "janeiro", "fevereiro", "março",
        //     "abril", "maio", "junho", "julho",
        //     "agosto", "setembro", "outubro",
        //     "novembro", "dezembro"
        // ];
        var monthNamesShort = [
            "jan", "fev", "mar",
            "abr", "maio", "jun", "jul",
            "ago", "set", "out",
            "nov", "dez"
        ];
        const d = new Date(dateString);
        const todayDate = new Date();
        // today
        if (d.toDateString() === todayDate.toDateString()) {
            return abbreviation ? `${d.getHours()}:${DateUtils.getMinutesHelper(d)}` : 'Hoje';
        }
        // yesterday
        var timeDiff = d.getTime() - todayDate.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays == -1) {
            if (justDate) {
                return `Ontem`;
            }
            else {
                return `Ontem ${d.getHours()}:${DateUtils.getMinutesHelper(d)}`
            }
        }
        var day = d.getDate();
        var monthIndex = d.getMonth();
        var year = String(d.getFullYear()).substring(2, 4);

        return day + ' ' + monthNamesShort[monthIndex] + ' ' + year;
    }

    static sortByDate = (a, b) => {
        return new Date(b.date) - new Date(a.date);
    }

    static getMinutesHelper = (d) => {
        return (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
    }

    static getHoursMinutes = (dateString) => {
        const d = new Date(dateString);
        return `${d.getHours()}:${DateUtils.getMinutesHelper(d)}`;

    }
}


export default DateUtils