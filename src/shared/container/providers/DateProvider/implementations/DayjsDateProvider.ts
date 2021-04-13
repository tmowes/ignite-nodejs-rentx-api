import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate()
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date)
    const end_date_utc = this.convertToUTC(end_date)
    const compareDate = dayjs(end_date_utc).diff(start_date_utc, 'hours')
    return compareDate
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date)
    const end_date_utc = this.convertToUTC(end_date)
    const compareDate = dayjs(end_date_utc).diff(start_date_utc, 'days')
    return compareDate
  }

  convertToUTC(date: Date): string {
    const utcDate = dayjs(date).utc().local().format()
    return utcDate
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date)
  }
}
