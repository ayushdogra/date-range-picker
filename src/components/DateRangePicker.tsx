import React, { useState } from "react";
import "../calendar.css"; // Import the external CSS file

interface DateRangePickerProps {
  onChange: ([dateRange, weekendDates]: [string[], string[]]) => void;
  predefinedRanges?: { label: string; daysOffset: number }[];
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Calendar: React.FC<{
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onDateClick: (date: Date) => void;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  isWeekend: (date: Date) => boolean;
}> = ({
  month,
  year,
  onMonthChange,
  onYearChange,
  onDateClick,
  selectedStart,
  selectedEnd,
  isWeekend,
}) => {
  const today = new Date();
  const days = getCalendarDays(month, year);

  const handleMonthChange = (change: number) => {
    const newMonth = month + change;
    if (newMonth < 0) {
      onYearChange(year - 1);
      onMonthChange(11);
    } else if (newMonth > 11) {
      onYearChange(year + 1);
      onMonthChange(0);
    } else {
      onMonthChange(newMonth);
    }
  };

  return (
    <div className="calendar">
      <div className="month-year-select">
        <button className="btn" onClick={() => handleMonthChange(-1)}>
          {"<<"}
        </button>
        <span>
          {monthNames[month]} {year}
        </span>
        <button className="btn" onClick={() => handleMonthChange(1)}>
          {">>"}
        </button>
      </div>
      <div className="days-grid">
        {weekDays.map((day) => (
          <div className="day-header" key={day}>
            {day}
          </div>
        ))}
        {days.map(({ date, isCurrentMonth }) => (
          <CalendarDay
            key={date.toString()}
            date={date}
            isCurrentMonth={isCurrentMonth}
            isSelected={isSelected(selectedStart, selectedEnd, date) || false}
            isInRange={isInRange(selectedStart, selectedEnd, date)}
            isDisabled={!isCurrentMonth || isWeekend(date)}
            onDateClick={() => onDateClick(date)}
          />
        ))}
      </div>
    </div>
  );
};

const CalendarDay: React.FC<{
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isDisabled: boolean;
  onDateClick: () => void;
}> = ({
  date,
  isCurrentMonth,
  isSelected,
  isInRange,
  isDisabled,
  onDateClick,
}) => (
  <button
    onClick={!isDisabled ? onDateClick : undefined}
    className={`date-button ${isCurrentMonth ? "" : "other-month"} ${
      isSelected ? "selected" : ""
    } ${isInRange ? "in-range" : ""}`}
    disabled={isDisabled}
  >
    {date.getDate()}
  </button>
);

const isSelected = (
  selectedStart: Date | null,
  selectedEnd: Date | null,
  date: Date
) => {
  return (
    (selectedStart && date.toDateString() === selectedStart.toDateString()) ||
    (selectedEnd && date.toDateString() === selectedEnd.toDateString())
  );
};

const isInRange = (
  selectedStart: Date | null,
  selectedEnd: Date | null,
  date: Date
) => {
  if (!selectedStart || !selectedEnd) return false;
  return (
    date > (selectedStart < selectedEnd ? selectedStart : selectedEnd) &&
    date < (selectedStart < selectedEnd ? selectedEnd : selectedStart)
  );
};

const getCalendarDays = (month: number, year: number) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDateOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDateOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  return Array.from({ length: 42 }, (_, i) => {
    const currentMonthDate = new Date(year, month, i - startDay + 1);
    return {
      date: currentMonthDate,
      isCurrentMonth: i >= startDay && i < startDay + daysInMonth,
    };
  });
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  predefinedRanges = [
    { label: "Last 7 Days", daysOffset: -7 },
    { label: "Next 7 Days", daysOffset: 7 },
  ],
}) => {
  const today = new Date();
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const handleDateClick = (date: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      setSelectedEnd(date);
    }
  };

  const handleApply = () => {
    if (selectedStart && selectedEnd) {
      const allDates = getDaysInRange(selectedStart, selectedEnd);

      const dateRange = [formatDate(selectedStart), formatDate(selectedEnd)];
      const weekendDates = allDates.filter(isWeekend).map(formatDate);

      onChange([dateRange, weekendDates]);

      setIsCalendarOpen(false);
    }
  };

  const handlePredefinedRange = (daysOffset: number) => {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + daysOffset);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.abs(daysOffset));

    setSelectedStart(startDate);
    setSelectedEnd(endDate);

    const allDates = getDaysInRange(startDate, endDate);

    const dateRange = [formatDate(startDate), formatDate(endDate)];
    const weekendDates = allDates.filter(isWeekend).map(formatDate);

    onChange([dateRange, weekendDates]);

    setIsCalendarOpen(false);
  };

  const handleClear = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  return (
    <div className="date-range-picker">
      <div className="input-container">
        <input
          type="text"
          readOnly
          value={
            selectedStart && selectedEnd
              ? `${formatDate(selectedStart)} ~ ${formatDate(selectedEnd)}`
              : "Select date range"
          }
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="date-input"
        />

        <button
          style={{
            opacity: selectedStart && selectedEnd ? 1 : 0,
          }}
          className="clear-button"
          onClick={handleClear}
        >
          &times;
        </button>
      </div>
      {isCalendarOpen && (
        <div className="calendar-container">
          <Calendar
            month={month}
            year={year}
            onMonthChange={setMonth}
            onYearChange={setYear}
            onDateClick={handleDateClick}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            isWeekend={isWeekend}
          />
          <div className="calendar-footer">
            <div className="predefined-ranges">
              {predefinedRanges.map((range, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePredefinedRange(range.daysOffset)}
                  className="btn secondary-btn"
                >
                  {range.label}
                </button>
              ))}
            </div>
            <button onClick={handleApply} className="apply-button">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const getDaysInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];

  const rangeStart = new Date(Math.min(startDate.getTime(), endDate.getTime()));
  const rangeEnd = new Date(Math.max(startDate.getTime(), endDate.getTime()));

  let currentDate = new Date(rangeStart);
  while (currentDate <= rangeEnd) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday is 0, Saturday is 6
};

export default DateRangePicker;
