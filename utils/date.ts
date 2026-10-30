/**
 * Date manipulation and salary cycle helpers
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const formatDate = (dateString: string | Date): string => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return '';

  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatShortDate = (dateString: string | Date): string => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return '';

  const day = date.getDate();
  const month = MONTHS[date.getMonth()];

  return `${day} ${month}`;
};

export const formatRelativeDate = (dateString: string | Date): string => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays === -1) return 'Tomorrow';
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < -1 && diffDays > -7) return `In ${Math.abs(diffDays)} days`;

  return formatShortDate(date);
};

export interface SalaryCycleInfo {
  cycleStart: string;
  cycleEnd: string;
  daysRemaining: number;
  totalDaysInCycle: number;
  daysPassed: number;
  cycleLabel: string;
  nextPaydayDate: string;
}

/**
 * Calculates current salary cycle details based on payday of month (e.g. 1st or 28th)
 */
export const getSalaryCycleDetails = (payday: number = 1): SalaryCycleInfo => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  let cycleStartDate: Date;
  let cycleEndDate: Date;
  let nextPaydayDate: Date;

  if (currentDate >= payday) {
    // Current cycle started this month on payday
    cycleStartDate = new Date(currentYear, currentMonth, payday);
    // Ends day before next month's payday
    nextPaydayDate = new Date(currentYear, currentMonth + 1, payday);
    cycleEndDate = new Date(currentYear, currentMonth + 1, payday - 1);
  } else {
    // Current cycle started last month on payday
    cycleStartDate = new Date(currentYear, currentMonth - 1, payday);
    // Ends day before this month's payday
    nextPaydayDate = new Date(currentYear, currentMonth, payday);
    cycleEndDate = new Date(currentYear, currentMonth, payday - 1);
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const totalDaysInCycle = Math.max(1, Math.round((nextPaydayDate.getTime() - cycleStartDate.getTime()) / oneDay));
  
  // Today up to next payday
  const todayZero = new Date(currentYear, currentMonth, currentDate);
  const daysRemaining = Math.max(1, Math.round((nextPaydayDate.getTime() - todayZero.getTime()) / oneDay));
  const daysPassed = Math.max(0, totalDaysInCycle - daysRemaining);

  const cycleLabel = `${formatShortDate(cycleStartDate)} - ${formatShortDate(cycleEndDate)}`;

  return {
    cycleStart: cycleStartDate.toISOString(),
    cycleEnd: cycleEndDate.toISOString(),
    daysRemaining,
    totalDaysInCycle,
    daysPassed,
    cycleLabel,
    nextPaydayDate: nextPaydayDate.toISOString(),
  };
};

