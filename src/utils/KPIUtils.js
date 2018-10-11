/* global gtag */

class KPIUtils {

    static registeredUser(causeID) {
        gtag('event', 'registered', {
            'event_category': 'user',
            'event_label': causeID
        });
    }

    static checkIn(validity) {
        gtag('event', 'valid', {
            'event_category': 'checkin',
            'event_label': validity,
        });
    }

    static quizCompleted() {
        gtag('event', 'quiz', {
            'event_category': 'UI interaction',
            'event_label': 'completed',
        });
    }

    // cause
    static causeSelected(causeID) {
        gtag('event', 'selected', {
            'event_category': 'cause',
            'event_label': causeID,
        });
    }

    // externalAccount
    static externalAccountSetup(account) {
        gtag('event', 'setup', {
            'event_category': 'external-account',
            'event_label': account,
        });
    }

    static activityInfo(activity, distance) {
        gtag('event', 'selected', {
            'event_category': 'cause',
            'event_label': activity,
            'value': distance
        });
    }

}

export default KPIUtils