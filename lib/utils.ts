import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getWorkingDaysInMonth = (year: string, month: string) => {
  const daysInMonth = dayjs().daysInMonth();

  let workingDays = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = dayjs(`${year}-${month}-${day}`);
    const dayOfWeek = currentDay.day();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
  }

  return workingDays;
};
