// other components
import WalletUtils from '../../../../../utils/WalletUtils'


export const getElectricityInfo = function getElectricityInfo(transactions) {
  const walletUtils = new WalletUtils(transactions);
  const energySaving = walletUtils.getEnergySavingData();
  if (energySaving.length === 0) {
    return {
      activityName: 'electricity',
      lastResults: '...',
      tokensTotal: '...', 
      tokensRecent: '...',
    }
  }
  else {
    return {
      activityName: 'electricity',
      lastResults: walletUtils.getTokensEarnedInEnergySaving() / 10 + '% redução/mês',
      tokensTotal: walletUtils.getTokensEarnedInEnergySaving(),
      tokensRecent: walletUtils.getTokensEarnedInEnergySaving(true),
    }
  }
}

export const getUserActivityInfo = function getUserActivityInfo(transactions, activity) {
  const walletUtils = new WalletUtils(transactions);
  let userActivity, otherName = activity;
  if (activity === "walking") {
    otherName = "user_walking_context";
  }
  else if (activity === "biking") {
    otherName = "user_biking_context";
  }
  userActivity = walletUtils.getUserActivityData(otherName);
  if (userActivity.length === 0) {
    return {
      activityName: activity,
      lastResults: '...',
      tokensRecent: '...',
      tokensTotal: '...',
    }
  }
  else {
    const distance = walletUtils.getDistanceUserActivity(otherName);
    return {
      activityName: activity,
      lastResults: distance <= 1000 ? distance + ' m' : Math.floor(distance/1000) + ' km',
      tokensTotal: walletUtils.getTokensEarnedInUserActivity(otherName),
      tokensRecent: walletUtils.getTokensEarnedInUserActivity(otherName, true),
    }
  }
}

export const getQuizzesInfo = function getQuizzesInfo(transactions) {
  const walletUtils = new WalletUtils(transactions);
  const quizzes = walletUtils.getCompletedQuizzes();
  if (quizzes.length === 0) {
    return {
      activityName: 'elearning',
      lastResults: '...',
      tokensTotal: '...',
      tokensRecent: '...',
    }
  }
  else {
    return {
      activityName: 'elearning',
      lastResults: quizzes.length,
      tokensTotal: walletUtils.getTokensEarnedInQuizzes(),
      tokensRecent: walletUtils.getTokensEarnedInQuizzes(true),
    }
  }
}

export const getCheckinsInfo = function getCheckinsInfo(transactions) {
  const walletUtils = new WalletUtils(transactions);
  const checkins = walletUtils.getValidCheckins();
  if (checkins.length === 0) {
    return {
      activityName: 'checkin',
      lastResults: '...',
      tokensTotal: '...',
      tokensRecent: '...',
    }
  }
  else {
    return {
      activityName: 'checkin',
      lastResults: checkins.length,
      tokensTotal: walletUtils.getTokensEarnedInCheckin(),
      tokensRecent: walletUtils.getTokensEarnedInCheckin(true),
    }
  }
}