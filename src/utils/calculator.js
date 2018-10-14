module.exports = {
  calculateDateEighteenYearsAgo: () => {
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 18);
    return newDate;
  },
};
