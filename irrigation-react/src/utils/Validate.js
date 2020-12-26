const validateWeek = (data) => {
  if (
    (data.firstRoundStart && !data.firstRoundEnd) ||
    (!data.firstRoundStart && data.firstRoundEnd)
  ) {
    return 'Round 1 is invalid';
  }
  if (
    (data.secondRoundStart && !data.secondRoundEnd) ||
    (!data.secondRoundStart && data.secondRoundEnd)
  ) {
    return 'Round 2 is invalid';
  }
  if (
    (data.thirdRoundStart && !data.thirdRoundEnd) ||
    (!data.thirdRoundStart && data.thirdRoundEnd)
  ) {
    return 'Round 3 is invalid';
  }
  if (data.firstRoundStart > data.firstRoundEnd) {
    return 'Error in round 1: end time before start time';
  }
  if (data.secondRoundStart > data.secondRoundEnd) {
    return 'Error in round 2: end time before start time';
  }
  if (data.thirdRoundStart > data.thirdRoundEnd) {
    return 'Error in round 3: end time before start time';
  }
  if (data.isFirstRoundActive && !data.firstRoundStart && !data.firstRoundEnd) {
    return 'Error: round 1 is active but empty';
  }
  if (
    data.isSecondRoundActive &&
    !data.secondRoundStart &&
    !data.secondRoundEnd
  ) {
    return 'Error: round 2 is active but empty';
  }
  if (data.isThirdRoundActive && !data.thirdRoundStart && !data.thirdRoundEnd) {
    return 'Error: round 3 is active but empty';
  }
  return 'valid';
};

export default validateWeek;
