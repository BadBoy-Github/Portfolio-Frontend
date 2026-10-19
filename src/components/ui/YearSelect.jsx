import PropTypes from "prop-types";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 101 }, (_, index) =>
  String(CURRENT_YEAR + 10 - index),
);

const YearSelect = ({ value, onChange, required = false }) => {
  const selectedYear = String(value || "");
  const years =
    selectedYear && !YEARS.includes(selectedYear)
      ? [selectedYear, ...YEARS]
      : YEARS;

  return (
    <select
      className="text-field"
      value={selectedYear}
      onChange={onChange}
      required={required}
    >
      <option value="">Select year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

YearSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default YearSelect;
