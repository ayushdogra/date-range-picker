import React, { useState } from 'react';
import DateRangePicker from './components/DateRangePicker';

const App: React.FC = () => {
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [weekends, setWeekends] = useState<string[]>([]);

  const handleDateRangeChange = (weekdays: string[], weekends: string[]) => {
    setWeekdays(weekdays);
    setWeekends(weekends);
  };

  return (
    <div>
      {/* <h2>Date Range Picker</h2> */}
      <DateRangePicker onChange={handleDateRangeChange} />
      
      {weekdays.length > 0 && (
        <div style={{ marginTop: '20px', textAlign:'center' }}>
          <h3>Weekday Dates:</h3>
          <p>{weekdays.join(', ')}</p> {/* Dates displayed as a comma-separated list */}
        </div>
      )}

      {weekends.length > 0 && (
        <div style={{ marginTop: '20px', textAlign:'center' }}>
          <h3>Weekend Dates:</h3>
          <p>{weekends.join(', ')}</p> {/* Dates displayed as a comma-separated list */}
        </div>
      )}
    </div>
  );
};

export default App;
