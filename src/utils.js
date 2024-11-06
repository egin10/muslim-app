export const replaceToArabicNumerals = (input) => {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  return input.replace(/\d/g, (num) => arabicNumerals[parseInt(num)]);
};
