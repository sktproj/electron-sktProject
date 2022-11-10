class DateUtil {
  static getCurrentDate() {
    const CurrentDate = new Date();

    const year = CurrentDate.getFullYear();
    const month = CurrentDate.getMonth();
    const day = CurrentDate.getDate();

    return new Date(year, month, day);
  }

  static getCurrentDateToString() {
    const CurrentDate = new Date();

    const year = CurrentDate.getFullYear();
    const month = ('0' + (CurrentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + CurrentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  static getRemainingDays(currentDate, targetDate) {
    let CurrentDate = currentDate;
    let TargetDate = targetDate;
    if (typeof currentDate === 'string') {
      currentDate = currentDate.split('-');
      CurrentDate = new Date(currentDate);
    }
    if (typeof targetDate === 'string') {
      targetDate = targetDate.split('-');
      TargetDate = new Date(targetDate);
    }

    const diff = TargetDate - CurrentDate;

    const remainingDays = diff / (24 * 60 * 60 * 1000);
    return remainingDays;
  }
}

module.exports = DateUtil;
