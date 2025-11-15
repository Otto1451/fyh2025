import Calendar from "react-calendar";
import { Card } from "react-bootstrap";
import { useState } from "react";
import "./Calendar.css"

export default function ExpiryCalendar({ warranties }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const expiryDates = warranties.map(w => ({
    ...w,
    dateObj: new Date(w.expiryDate)
  }));

  const tileClassName = ({ date, view }) => {
    // Highlight individual expiry days
    const isExpiryDay = expiryDates.some(
      w => w.dateObj.toDateString() === date.toDateString()
    );
    if (view === "month" && isExpiryDay) return "expiry-highlight";

    // Highlight whole month
    const isExpiryMonth = expiryDates.some(
      w =>
        w.dateObj.getFullYear() === date.getFullYear() &&
        w.dateObj.getMonth() === date.getMonth()
    );
    if (view === "year" && isExpiryMonth) return "expiry-month-highlight";

    // Highlight whole year
    const isExpiryYear = expiryDates.some(
      w => w.dateObj.getFullYear() === date.getFullYear()
    );
    if (view === "decade" && isExpiryYear) return "expiry-year-highlight";

    return null;
  };

  const warrantiesToday = selectedDate
    ? expiryDates.filter(
        w => w.dateObj.toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <>
      <Card className="bg-dark text-light">
        <h3 className="fw-bold mb-3">Warranty Expiry Calendar</h3>

        <div className="calendar-wrapper">
          <Calendar onClickDay={setSelectedDate} tileClassName={tileClassName} />
        </div>
            {selectedDate && (
            <>
            <h5>Expiring on: <strong>{selectedDate.toDateString()}</strong></h5>

            {warrantiesToday.length === 0 ? (
                <p className="text-muted mt-3">No warranties expire on this day.</p>
            ) : (
                warrantiesToday.map(w => (
                <div key={w.id} className="">
                    <strong>{w.product}</strong><br/>
                    <span className="text-danger">Expires: {w.expiryDate}</span>
                </div>
                ))
            )}
            </>
        )}
      </Card>
    </>
  );
}
