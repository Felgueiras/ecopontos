import WalletUtils from "./WalletUtils";

class BonusUtils {

    constructor(bonuses) {
        this.bonuses = bonuses;
    }


    getBonusByID = (bonusID) => {
        const bonuses = this.bonuses.filter(bonus => bonus.id === bonusID);
        if (bonuses.length === 1) {
            return bonuses[0];
        }
        return undefined;
    }


}

export const checkConstraints = (bonus, transactions) => {
    if (!bonus) return false;
    if (!bonus.constraints) {
        return true;
    }
    const { constraints, id } = bonus;
    const { period, times } = constraints;
    let walletUtils = new WalletUtils(transactions);
    let valid = true;

    if (period === "day") {
        const transactionsToday = walletUtils.bonusCollectionsToday(id, transactions);
        if (transactionsToday.length == times) {
            valid = false;
        }
    }
    return valid;
}

export const howManyCollectsAvailableToday = (bonus, transactions) => {
    const { constraints, id: bonusID } = bonus;
    const { times: max } = constraints;
    let walletUtils = new WalletUtils(transactions);

    const numCollectsToday = walletUtils.bonusCollectionsToday(bonusID, transactions).length;
    return max - numCollectsToday;
}


export const bonusAvailableForDate = (bonus, date = undefined) => {

    const bonusStart = new Date(String(bonus.start));
    bonusStart.setHours(0, 0, 0, 0);

    const bonusExpires = new Date(String(bonus.expires));
    bonusExpires.setHours(0, 0, 0, 0);

    let currentDate;
    if (!date) {
        // use today as default
        currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
    }
    else {
        // use date param
        currentDate = date;
        currentDate.setHours(0, 0, 0, 0);
    }

    var available = (currentDate.getTime() - bonusStart.getTime() >= 0) && (currentDate.getTime() - bonusExpires.getTime() <= 0);

    return available;
}

export const newBonus = (bonus) => {

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return bonusAvailableForDate(bonus) && bonusAvailableForDate(bonus, yesterday);
}

export const causeBonus = (bonuses, supportedCauseID) => {
    let causeBonus = [];
    bonuses.forEach(bonus => {
        const { cause } = bonus;
        if (cause === supportedCauseID) {
            causeBonus.push(bonus);
        }
    });
    return causeBonus;
}

export const isCauseBonus = (bonus) => {
    return bonus.cause !== undefined;
}



export default BonusUtils