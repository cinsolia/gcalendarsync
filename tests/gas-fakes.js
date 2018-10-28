module.exports = { calendarEvent, calendarGuest };

function calendarEvent(options) {
  options = options || {};
  const {
    id,
    title,
    description,
    location,
    color,
    isAllDayEvent,
    allDayStartDate,
    allDayEndDate,
    startTime,
    endTime
  } = options;
  const guests = array(options.guests);
  const fake = {
    getId: jest.fn().mockReturnValue(id),
    getTitle: jest.fn().mockReturnValue(title),
    getDescription: jest.fn().mockReturnValue(description),
    getLocation: jest.fn().mockReturnValue(location),
    getGuestList: jest.fn().mockReturnValue(guests),
    getColor: jest.fn().mockReturnValue(color),
    isAllDayEvent: jest.fn().mockReturnValue(isAllDayEvent),
    getAllDayStartDate: jest.fn().mockReturnValue(allDayStartDate || new Date()),
    getAllDayEndDate: jest.fn().mockReturnValue(allDayEndDate || new Date()),
    getStartTime: jest.fn().mockReturnValue(startTime || new Date()),
    getEndTime: jest.fn().mockReturnValue(endTime || new Date())
  };
  return fake;
}

function calendarGuest(options) {
  options = options || {};
  let { email } = options;
  return {
    getEmail: jest.fn().mockReturnValue(email)
  };
}

const array = value => value || [];
