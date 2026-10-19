const formatDate = (value) => {
  if (!value) return "";

  const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(value);
  if (!match) return "";

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, day ? Number(day) : 1);

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    (day && date.getDate() !== Number(day))
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
  }).format(date);
};

export const formatDateRange = (startDate, endDate, legacyValue = "") => {
  const start = formatDate(startDate);
  const isCurrent = String(endDate || "").toLowerCase() === "present";
  const end = formatDate(endDate);

  if (isCurrent) return start ? `${start} – Present` : "Present";
  if (start && end) return `${start} – ${end}`;
  return start || end || legacyValue || "";
};

export const getYearValue = (value) => {
  const match = String(value || "").match(/\b\d{4}\b/);
  return match ? match[0] : "";
};

export const getMonthValue = (value) => {
  const match = /^(\d{4}-\d{2})(?:-\d{2})?$/.exec(String(value || ""));
  return match ? match[1] : "";
};

export const getMonthOrPresentValue = (value) =>
  String(value || "").toLowerCase() === "present" ? "present" : getMonthValue(value);
