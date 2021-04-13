"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayjsDateProvider = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

class DayjsDateProvider {
  dateNow() {
    return (0, _dayjs.default)().toDate();
  }

  compareInHours(start_date, end_date) {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    const compareDate = (0, _dayjs.default)(end_date_utc).diff(start_date_utc, 'hours');
    return compareDate;
  }

  compareInDays(start_date, end_date) {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    const compareDate = (0, _dayjs.default)(end_date_utc).diff(start_date_utc, 'days');
    return compareDate;
  }

  convertToUTC(date) {
    const utcDate = (0, _dayjs.default)(date).utc().local().format();
    return utcDate;
  }

  addDays(days) {
    return (0, _dayjs.default)().add(days, 'days').toDate();
  }

  addHours(hours) {
    return (0, _dayjs.default)().add(hours, 'hour').toDate();
  }

  compareIfBefore(start_date, end_date) {
    return (0, _dayjs.default)(start_date).isBefore(end_date);
  }

}

exports.DayjsDateProvider = DayjsDateProvider;