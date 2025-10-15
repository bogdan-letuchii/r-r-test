/**
 * Утилиты для склонения слов в русском языке
 */

/**
 * Возвращает правильную форму слова "смена" в зависимости от числа
 * @param count - количество смен
 * @returns "смена" | "смены" | "смен"
 */
export const getShiftsWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'смен';
  }

  if (lastDigit === 1) {
    return 'смена';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'смены';
  }

  return 'смен';
};

/**
 * Возвращает правильную форму слова "человек" в зависимости от числа
 * @param count - количество людей
 * @returns "человек" | "человека"
 */
export const getWorkersWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'человек';
  }

  if (lastDigit === 1) {
    return 'человек';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'человека';
  }

  return 'человек';
};

/**
 * Возвращает правильную форму слова "отзыв" в зависимости от числа
 * @param count - количество отзывов
 * @returns "отзыв" | "отзыва" | "отзывов"
 */
export const getReviewsWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'отзывов';
  }

  if (lastDigit === 1) {
    return 'отзыв';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'отзыва';
  }

  return 'отзывов';
};
