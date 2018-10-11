class WalletUtils {

    constructor(transactions) {
        this.transactions = transactions;
    }

    getEnergySavingData() {
        if (this.transactions === undefined) return 0;
        return this.transactions.filter(transaction => transaction.source === "energy-saving");
    }

    getUserActivityData(activity) {
        if (this.transactions === undefined) return 0;
        return this.transactions.filter(transaction => transaction.source === "user-activity" && transaction.data.activity === activity);
    }

    getDistanceUserActivity(activity) {
        let distance = 0;
        const userActivity = this.getUserActivityData(activity);
        for (let index = 0; index < userActivity.length; index++) {
            const transaction = userActivity[index];
            distance += transaction.data.distance;
        }
        return distance;
    }

    getTokensEarnedInUserActivity(activity, recent = false) {
        let tokens = 0;
        let userActivity = this.getUserActivityData(activity);
        if (recent) {
            userActivity = userActivity.filter(activ => this.isRecent(activ.date));
        }
        for (let index = 0; index < userActivity.length; index++) {
            const transaction = userActivity[index];
            tokens += transaction.value;
        }
        return tokens;
    }

    getTokensEarnedInEnergySaving(recent = false) {
        let tokens = 0;
        let energySavings = this.getEnergySavingData();
        if (recent) {
            energySavings = energySavings.filter(energy => this.isRecent(energy.date));
        }
        for (let index = 0; index < energySavings.length; index++) {
            const transaction = energySavings[index];
            tokens += transaction.value;
        }
        return tokens;
    }

    getCompletedQuizzes() {
        if (this.transactions === undefined) return 0;
        return this.transactions.filter(transaction => transaction.source === "elearning");
    }


    getValidCheckins() {
        if (this.transactions === undefined) return 0;
        return this.transactions.filter(transaction => transaction.source === "checkin" && transaction.description === "valid"
            && !!transaction.data);
    }

    hasCheckedInToday(shopID) {
        const validTransactions = this.getValidCheckins();
        const checkIns = validTransactions.filter(transaction => transaction.data.shopID === shopID);
        if (checkIns.length === 0)
            return false;
        else {
            const lastCheckinDate = new Date(checkIns[checkIns.length - 1].date);
            var d = new Date();
            return (d.toDateString() === lastCheckinDate.toDateString());
        }
    }


    bonusCollectionsToday(bonusID, transactions) {
        const collects = transactions.filter(transaction => {
            if (!transaction.data) return false;
            if (transaction.data.bonusID === bonusID) {
                var d = new Date();
                return (d.toDateString() === new Date(transaction.date).toDateString());
            }
        });
        return collects;
    }

    bonusCollections(bonusID) {
        const collects = this.transactions.filter(transaction => {
            if (!transaction.data) return false;
            if (transaction.data.bonusID === bonusID) return true;
        });
        return collects;
    }

    isRecent(eventDate) {
        const currentTime = new Date(eventDate).getTime();
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first)).getTime();
        var lastday = new Date(curr.setDate(last)).getTime();
        return currentTime > firstday && currentTime < lastday
    }

    getTokensEarnedInQuizzes(recent = false) {
        let tokens = 0;
        let completedQuizzes = this.getCompletedQuizzes();
        if (recent) {
            completedQuizzes = completedQuizzes.filter(quiz => this.isRecent(quiz.date));
        }
        for (let index = 0; index < completedQuizzes.length; index++) {
            const transaction = completedQuizzes[index];
            tokens += transaction.value;
        }
        return tokens;
    }

    getTokensEarnedInCheckin(recent = false) {
        let tokens = 0;
        let checkins = this.getValidCheckins();
        if (recent) {
            checkins = checkins.filter(checkin => this.isRecent(checkin.date));
        }
        for (let index = 0; index < checkins.length; index++) {
            const transaction = checkins[index];
            tokens += transaction.value;
        }
        return tokens;
    }
}

export default WalletUtils