// pages/index.js
"use client"

// pages/index.js
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function HomePage() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(3);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to generate calendar
  const generateCalendar = (year, month) => {
    const totalDays = new Date(year, month, 0).getDate();
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    const calendar = [];

    let week = [];
    // Fill in empty days at the beginning of the month
    for (let i = 0; i < firstDayIndex; i++) {
      week.push(null);
    }

    // Fill in days of the month
    for (let day = 1; day <= totalDays; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      // Fill in empty days at the end of the month
      for (let i = week.length; i < 7; i++) {
        week.push(null);
      }
      calendar.push(week);
    }

    return calendar;
  };

  // Function to handle next month click
  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  // Function to handle previous month click
  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  // Generate the calendar
  const calendar = generateCalendar(year, month);

  // Render the calendar
  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
         
         
          <div className="mx-4">
            <span className="font-semibold">{year}</span>
          </div>
         
        </div>
        <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-white border border-black text-black rounded-sm  mx-2" onClick={handlePrevMonth}>
                <FaChevronLeft />
            </button>
            <h1 className="text-xl font-semibold">{months[month - 1]}</h1>
            <button className="px-4 py-2 bg-white border border-black text-black rounded  mx-2" onClick={handleNextMonth}>
                <FaChevronRight />
            </button>
           
        </div>
            <button className="px-4 py-2 bg-blue-500 text-black rounded-sm  ">
            Add Event
            </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        <div className="font-bold">Sun</div>
        <div className="font-bold">Mon</div>
        <div className="font-bold">Tue</div>
        <div className="font-bold">Wed</div>
        <div className="font-bold">Thu</div>
        <div className="font-bold">Fri</div>
        <div className="font-bold">Sat</div>
        {calendar.map((week, weekIndex) => (
          week.map((day, dayIndex) => (
            <div key={`${weekIndex}-${dayIndex}`} className={`p-2 border h-28 flex items-center justify-center ${day === null ? 'bg-gray-200' : ''}`}>
              {day !== null && <span>{day}</span>}
            </div>
          ))
        ))}
      </div>
    </div>
  );
}

export default HomePage;
