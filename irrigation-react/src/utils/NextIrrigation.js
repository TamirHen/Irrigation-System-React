/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import moment from 'moment';

const nextIrrigation = (weekData, roundsData) => {
  if (!weekData || !roundsData) {
    return 'Error';
  }
  const nextSevenDays = [];
  const irrigationStartHours = Object.keys(roundsData)
    .map((round) => {
      if (roundsData[round] && roundsData[round].isActive)
        return moment(roundsData[round].startTime, 'HH:mm:ss');
    })
    .filter((round) => round !== undefined);
  if (irrigationStartHours.length === 0) {
    return 'Not set';
  }
  const sortedStartHours = irrigationStartHours.sort(
    (a, b) => a.valueOf() - b.valueOf(),
  );
  const minTime = sortedStartHours[0];
  const now = moment(new Date(), 'HH:mm:ss');

  for (let i = 0; i < 7; i++) {
    nextSevenDays[i] = moment().add(i, 'days').format('dddd');
    if (weekData[nextSevenDays[i].toLowerCase()]) {
      if (minTime.isAfter(now)) {
        return `${i === 0 ? 'Today' : nextSevenDays[i]} at ${minTime.format(
          'HH:mm',
        )}`;
      }

      if (i === 0) {
        // its today
        for (let j = 0; j < sortedStartHours.length; j++) {
          if (sortedStartHours[j].isAfter(now)) {
            return `Today at ${sortedStartHours[j].format('HH:mm')}`;
          }
        }
      } else {
        return `${nextSevenDays[i]} at ${minTime.format('HH:mm')}`;
      }
    }
  }
  return 'Not set';
};

export default nextIrrigation;
