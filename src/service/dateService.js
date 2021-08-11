const formatDateShortMonthShortYear = date => {
  return Intl.DateTimeFormat("en-GB", {
    year: "2-digit",
    month: "short",
  }).format(date);
};

export { formatDateShortMonthShortYear };
