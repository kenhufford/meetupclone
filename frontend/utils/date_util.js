
export const formatDate = date => {
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    };
    const daysOfWeek = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    const obj = new Date(date);
    const month = months[obj.getMonth()];
    const day = obj.getDate();
    const year = obj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

export const formatDateInput = date => {
  const months = {
    0: '01',
    1: '02',
    2: '03',
    3: '04',
    4: '05',
    5: '06',
    6: '07',
    7: '08',
    8: '09',
    9: '10',
    10: '11',
    11: '12',
  };
  const days = {
    1: '01',
    2: '02',
    3: '03',
    4: '04',
    5: '05',
    6: '06',
    7: '07',
    8: '08',
    9: '09',
    0: '00'
  };
    const obj = new Date(date);
    const month = months[obj.getMonth()];
    const day = obj.getDate() < 10 ? days[obj.getDate()] : obj.getDate()
    const year = obj.getFullYear();
    return `${year}-${month}-${day}`;
  };

export const formatDateWithDay = date => {
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    };
    const daysOfWeek = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    const obj = new Date(date);
    const month = months[obj.getMonth()];
    const day = obj.getDate();
    const year = obj.getFullYear();
    const dayOfWeek = daysOfWeek[obj.getDay()];
    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  };
  
  export const formatTime = date => {
    const obj = new Date(date);
    const fullHours = obj.getHours();
    let hours = fullHours % 12;
    if (hours === 0) hours = 12;
    const minutes = obj.getMinutes();
    const tmp = `0${minutes}`;
    const paddedMinutes = tmp.slice(tmp.length - 2);
    const ampm = fullHours < 12 || fullHours === 0 ? 'am' : 'pm';
    return `${hours}:${paddedMinutes}${ampm}`;
  };

  export const addWeek = (date, n) => {
    const obj = new Date(date);
    obj.setDate(obj.getDate() + 7 * n)
    return obj
  };

  export const addMonth = (date, n) => {
    const obj = new Date(date);
    obj.setMonth(obj.getMonth() + 1 * n)
    return obj
  };
  
  export const formatDateTime = date => (
    `${formatDate(date)} ${formatTime(date)}`
  );
  