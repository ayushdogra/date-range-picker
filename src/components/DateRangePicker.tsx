// import React, { useState } from 'react';
// import '../calender.css'; // Import the external CSS file

// interface DateRangePickerProps {
//   onChange: (weekdays: string[], weekends: string[]) => void;
// }

// // Helper functions
// const getDaysInRange = (startDate: Date, endDate: Date): Date[] => {
//   const dates = [];
//   let currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     dates.push(new Date(currentDate));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return dates;
// };

// const isWeekend = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;

// const formatDate = (date: Date): string => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

// const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
//   const today = new Date();
//   const [selectedStart, setSelectedStart] = useState<Date | null>(null);
//   const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [month, setMonth] = useState(today.getMonth());
//   const [year, setYear] = useState(today.getFullYear());

//   // Month names array
//   const monthNames = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];

//   // Date selection handler
//   const handleDateClick = (date: Date) => {
//     if (!selectedStart || (selectedStart && selectedEnd)) {
//       setSelectedStart(date);
//       setSelectedEnd(null);
//     } else {
//       setSelectedEnd(date);
//     }
//   };

//   // Apply selected date range
//   const handleApply = () => {
//     if (selectedStart && selectedEnd) {
//       // Determine start and end dates irrespective of order
//       const startDate = selectedStart < selectedEnd ? selectedStart : selectedEnd;
//       const endDate = selectedStart < selectedEnd ? selectedEnd : selectedStart;

//       const allDates = getDaysInRange(startDate, endDate);
//       const weekdays = allDates.filter(date => !isWeekend(date)).map(formatDate);
//       const weekends = allDates.filter(isWeekend).map(formatDate);
//       onChange(weekdays, weekends);
//       setIsCalendarOpen(false);
//     }
//   };

//   // Render the calendar
//   const renderCalendar = (offset: number) => {
//     const currentMonth = (month + offset) % 12;
//     const currentYear = year + Math.floor((month + offset) / 12);
//     const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
//     const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0);
//     const daysInMonth = lastDateOfMonth.getDate();
//     const startDay = firstDayOfMonth.getDay();

//     const days = Array.from({ length: 42 }, (_, i) => {
//       if (i < startDay) {
//         const prevMonthDate = new Date(currentYear, currentMonth, -(startDay - i) + 1);
//         return { date: prevMonthDate, isCurrentMonth: false };
//       } else if (i < startDay + daysInMonth) {
//         const currentMonthDate = new Date(currentYear, currentMonth, i - startDay + 1);
//         return { date: currentMonthDate, isCurrentMonth: true };
//       } else {
//         const nextMonthDate = new Date(currentYear, currentMonth + 1, i - (startDay + daysInMonth) + 1);
//         return { date: nextMonthDate, isCurrentMonth: false };
//       }
//     });

//     // Determine start and end dates irrespective of order for rendering
//     const startDate = selectedStart && selectedEnd
//       ? (selectedStart < selectedEnd ? selectedStart : selectedEnd)
//       : null;
//     const endDate = selectedStart && selectedEnd
//       ? (selectedStart < selectedEnd ? selectedEnd : selectedStart)
//       : null;

//     return (
//       <div className="calendar">
//         <h4>{`${monthNames[currentMonth]}-${currentYear}`}</h4>
//         <div className="days-grid">
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div className="day-header" key={day}>{day}</div>
//           ))}
//           {days.map(({ date, isCurrentMonth }) => {
//             const isSelectedStart = selectedStart && formatDate(selectedStart) === formatDate(date);
//             const isSelectedEnd = selectedEnd && formatDate(selectedEnd) === formatDate(date);
//             const inRange = startDate && endDate && date > startDate && date < endDate;

//             // Determine highlight class based on date type (weekday/weekend)
//             const highlightClass = !isWeekend(date) && (isSelectedStart || isSelectedEnd || inRange) ? 'highlight' : '';

//             // Disable weekend buttons
//             const isDisabled = !isCurrentMonth || isWeekend(date);

//             return (
//               <button
//                 key={date.toString()}
//                 onClick={() => !isDisabled && handleDateClick(date)} // Only handle click if not disabled
//                 className={`date-button ${highlightClass} ${isSelectedStart ? 'selected' : ''} ${isSelectedEnd ? 'selected' : ''} ${inRange ? 'in-range' : ''}`}
//                 disabled={isDisabled} // Disable the button
//               >
//                 {date.getDate()}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="date-range-picker">
//       <h3>Date Range Picker</h3>
//       <input
//         type="text"
//         readOnly
//         value={
//           selectedStart && selectedEnd
//             ? `${formatDate(selectedStart)} ~ ${formatDate(selectedEnd)}`
//             : 'Select date range'
//         }
//         onClick={() => setIsCalendarOpen(!isCalendarOpen)}
//         className="date-input"
//       />
//       {isCalendarOpen && (
//         <div className="calendar-container">
//           <div className="month-year-selector">
//             <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
//               {monthNames.map((name, index) => (
//                 <option key={index} value={index}>{name}</option>
//               ))}
//             </select>
//             <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
//               {Array.from({ length: 15 }, (_, i) => 2020 + i).map(yearValue => (
//                 <option key={yearValue} value={yearValue}>{yearValue}</option>
//               ))}
//             </select>
//           </div>
//           <div className="calendars">
//             {renderCalendar(0)} {/* Current month */}
//             {renderCalendar(1)} {/* Next month */}
//           </div>
//           <button onClick={handleApply} className="apply-button">
//             Apply
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateRangePicker;

import React, { useState } from 'react';
import '../calender.css'; // Import the external CSS file

interface DateRangePickerProps {
  onChange: (weekdays: string[], weekends: string[]) => void;
}

// Helper functions
const getDaysInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const isWeekend = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;

const formatDate = (date: Date): string => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const today = new Date();
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Month names array
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Date selection handler
  const handleDateClick = (date: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      setSelectedEnd(date);
    }
  };

  // Apply selected date range
  const handleApply = () => {
    if (selectedStart && selectedEnd) {
      // Determine start and end dates irrespective of order
      const startDate = selectedStart < selectedEnd ? selectedStart : selectedEnd;
      const endDate = selectedStart < selectedEnd ? selectedEnd : selectedStart;

      const allDates = getDaysInRange(startDate, endDate);
      const weekdays = allDates.filter(date => !isWeekend(date)).map(formatDate);
      const weekends = allDates.filter(isWeekend).map(formatDate);
      onChange(weekdays, weekends);
      setIsCalendarOpen(false);
    }
  };

  // Set dates for predefined ranges
  const handlePredefinedRange = (days: number) => {
    const startDate = new Date(today);
    const endDate = new Date(today);
    startDate.setDate(today.getDate() - days);
    setSelectedStart(startDate);
    setSelectedEnd(endDate);
  };

  // Render the calendar
  const renderCalendar = (offset: number) => {
    const currentMonth = (month + offset) % 12;
    const currentYear = year + Math.floor((month + offset) / 12);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDateOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    const days = Array.from({ length: 42 }, (_, i) => {
      if (i < startDay) {
        const prevMonthDate = new Date(currentYear, currentMonth, -(startDay - i) + 1);
        return { date: prevMonthDate, isCurrentMonth: false };
      } else if (i < startDay + daysInMonth) {
        const currentMonthDate = new Date(currentYear, currentMonth, i - startDay + 1);
        return { date: currentMonthDate, isCurrentMonth: true };
      } else {
        const nextMonthDate = new Date(currentYear, currentMonth + 1, i - (startDay + daysInMonth) + 1);
        return { date: nextMonthDate, isCurrentMonth: false };
      }
    });

    // Determine start and end dates irrespective of order for rendering
    const startDate = selectedStart && selectedEnd
      ? (selectedStart < selectedEnd ? selectedStart : selectedEnd)
      : null;
    const endDate = selectedStart && selectedEnd
      ? (selectedStart < selectedEnd ? selectedEnd : selectedStart)
      : null;

    return (
      <div className="calendar">
        <h4>{`${monthNames[currentMonth]}-${currentYear}`}</h4>
        <div className="days-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div className="day-header" key={day}>{day}</div>
          ))}
          {days.map(({ date, isCurrentMonth }) => {
            const isSelectedStart = selectedStart && formatDate(selectedStart) === formatDate(date);
            const isSelectedEnd = selectedEnd && formatDate(selectedEnd) === formatDate(date);
            const inRange = startDate && endDate && date > startDate && date < endDate;

            // Determine highlight class based on date type (weekday/weekend)
            const highlightClass = !isWeekend(date) && (isSelectedStart || isSelectedEnd || inRange) ? 'highlight' : '';

            // Disable weekend buttons
            const isDisabled = !isCurrentMonth || isWeekend(date);

            return (
              <button
                key={date.toString()}
                onClick={() => !isDisabled && handleDateClick(date)} // Only handle click if not disabled
                className={`date-button ${highlightClass} ${isSelectedStart ? 'selected' : ''} ${isSelectedEnd ? 'selected' : ''} ${inRange ? 'in-range' : ''}`}
                disabled={isDisabled} // Disable the button
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="date-range-picker">
      <h3>Date Range Picker</h3>
      <input
        type="text"
        readOnly
        value={
          selectedStart && selectedEnd
            ? `${formatDate(selectedStart)} ~ ${formatDate(selectedEnd)}`
            : 'Select date range'
        }
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="date-input"
      />
      <div className="predefined-ranges">
        <button onClick={() => handlePredefinedRange(7)} className="predefined-button">Last 7 Days</button>
        <button onClick={() => handlePredefinedRange(30)} className="predefined-button">Last 30 Days</button>
      </div>
      {isCalendarOpen && (
        <div className="calendar-container">
          <div className="month-year-selector">
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
              {monthNames.map((name, index) => (
                <option key={index} value={index}>{name}</option>
              ))}
            </select>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {Array.from({ length: 15 }, (_, i) => 2020 + i).map(yearValue => (
                <option key={yearValue} value={yearValue}>{yearValue}</option>
              ))}
            </select>
          </div>
          <div className="calendars">
            {renderCalendar(0)} {/* Current month */}
            {renderCalendar(1)} {/* Next month */}
          </div>
          <button onClick={handleApply} className="apply-button">
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
