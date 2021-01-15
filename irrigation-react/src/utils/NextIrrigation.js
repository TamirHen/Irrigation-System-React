/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import moment from 'moment';

const nextIrrigation = (weekData, roundsData) => {
  console.log(weekData);
  console.log(roundsData);
  if (weekData || roundsData) {
    return 'Error';
  }
  const nextSevenDays = [];
  for (let i = 0; i < 7; i++) {
    nextSevenDays[i] = moment().add(i, 'days').format('dddd');
    let nextIrrigationTime = moment(new Date(), 'HH:mm:ss');
    let nextRound;
    if (weekData[nextSevenDays[i].toLowerCase()] === true) {
      for (const [, round] of Object.entries(roundsData)) {
        const startTimeMoment = moment(round.startTime, 'HH:mm:ss');
        if (round.isActive && startTimeMoment.isAfter(new Date(), 'HH:mm:ss')) {
          if (startTimeMoment.isBefore(nextIrrigationTime)) {
            nextIrrigationTime = startTimeMoment;
            nextRound = round;
          }
        }
      }
      const times = nextRound.startTime.split(':');
      return `${nextSevenDays[i]} ${times[0]}:${times[1]}`;
    }
  }
  return 'Not set';
};

export default nextIrrigation;
