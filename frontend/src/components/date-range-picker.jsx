import { useState, useEffect, useRef } from "react";
import iconArrowRight from "../assets/images/common/icon-arrow-right--gray.svg";

const DateRangePicker = ({dateRange, setDate}) => {
    const MONTH_NAMES = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    const [selectedStart, setSelectedStart] = useState(dateRange.startDate || null);
    const [selectedEnd, setSelectedEnd] = useState(dateRange.endDate || null);
    const [currentDate1, setCurrentDate1] = useState(new Date());
    const [currentDate2, setCurrentDate2] = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date;
    });
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    // Format date to DD/MM/YYYY
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Handle date click
    const handleDateClick = (dateStr) => {
        if (!selectedStart || (selectedStart && selectedEnd)) {
            // Start new selection
            setSelectedStart(dateStr);
            setSelectedEnd(null);
        } else if (selectedStart && !selectedEnd) {
            // Set end date
            const startDate = new Date(selectedStart);
            const endDate = new Date(dateStr);

            if (endDate >= startDate) {
                setSelectedEnd(dateStr);
            } else {
                // If end date is before start date, swap them
                setSelectedStart(dateStr);
                setSelectedEnd(selectedStart);
            }
        }
    };

    // Handle previous month
    const handlePrevMonth = (monthIndex) => {

        setCurrentDate1(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });

        setCurrentDate2(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });

    };

    // Handle next month
    const handleNextMonth = () => {

        setCurrentDate1(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });

        setCurrentDate2(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });

    };

    // Handle reset
    const handleReset = () => {
        setSelectedStart(null);
        setSelectedEnd(null);
        setCurrentDate1(new Date());
        setCurrentDate2(() => {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            return date;
        });
        setDate({ startDate: null, endDate: null });
    };

    // Handle apply
    const handleApply = () => {
        setShowPicker(false);
        setDate({ startDate: selectedStart, endDate: selectedEnd });
    };

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);

    const generateCalendar = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        // Format today's date properly without timezone issues
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();
        const todayStr = `${todayYear}-${String(todayMonth + 1).padStart(2, '0')}-${String(todayDate).padStart(2, '0')}`;

        const rows = [];
        let cells = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            cells.push(<td key={`empty-${i}`}></td>);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= lastDate; day++) {
            // Format date string properly without timezone issues
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const currentDate = new Date(year, month, day);

            const isSelected = selectedStart === dateStr || selectedEnd === dateStr;
            const isInRange = selectedStart && selectedEnd &&
                currentDate > new Date(selectedStart) && currentDate < new Date(selectedEnd);
            const isCurrentDay = dateStr === todayStr;

            // Build className
            let className = '';
            if (isSelected) className += ' selected';
            if (isInRange) className += ' in-range';
            if (isCurrentDay) className += ' currentDay';
            className = className.trim();

            cells.push(
                <td
                    key={dateStr}
                    data-date={dateStr}
                    className={className}
                    onClick={() => handleDateClick(dateStr)}
                >
                    {day}
                </td>
            );

            // Start a new row after every 7 cells
            if (cells.length === 7) {
                rows.push(<tr key={`row-${Math.floor(day / 7)}`}>{cells}</tr>);
                cells = [];
            }
        }

        // Add the last row if it has cells
        if (cells.length > 0) {
            // Fill remaining cells to complete the row
            while (cells.length < 7) {
                cells.push(<td key={`empty-end-${cells.length}`}></td>);
            }
            rows.push(<tr key="last-row">{cells}</tr>);
        }

        return (
            <table className="calendar">
                <thead>
                    <tr>
                        <th>CN</th><th>T2</th><th>T3</th><th>T4</th><th>T5</th><th>T6</th><th>T7</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    };

    return (
        <div className="relative" ref={pickerRef}>
            <button onClick={() => setShowPicker(!showPicker)} className={`button-filter button-filter--date ${showPicker ? " is-active" : ""}`} id="datePickerBtn">
                {selectedStart && selectedEnd
                    ? selectedStart === selectedEnd
                        ? `${formatDate(selectedStart)}`
                        : `${formatDate(selectedStart)} - ${formatDate(selectedEnd)}`
                    : selectedStart
                        ? formatDate(selectedStart) + " - ..."
                        : "Tất cả các ngày"}
            </button>

            {showPicker && (
                <div id="datePicker">
                    <div className="calendar-container">

                        <div className="calendar">
                            <div className="calendar-header">
                                <button onClick={() => handlePrevMonth()}>&lt;</button>
                                <h3 className="calendar-month">
                                    {MONTH_NAMES[currentDate1.getMonth()]} / {currentDate1.getFullYear()}
                                </h3>
                                <button className="sp-only" onClick={() => handleNextMonth(1)}>&gt;</button>
                                <div className="pc-only" style={{ width: "30px" }}>&nbsp;</div>
                            </div>
                            <div>{generateCalendar(currentDate1.getFullYear(), currentDate1.getMonth())}</div>
                        </div>

                        <div className="calendar">
                            <div className="calendar-header">
                                {/* <button onClick={() => handlePrevMonth(2)}>&lt;</button> */}
                                <span style={{ width: "30px" }}>&nbsp;</span>
                                <h3 className="calendar-month">
                                    {MONTH_NAMES[currentDate2.getMonth()]} / {currentDate2.getFullYear()}
                                </h3>
                                <button onClick={() => handleNextMonth()}>&gt;</button>
                            </div>
                            <div>{generateCalendar(currentDate2.getFullYear(), currentDate2.getMonth())}</div>
                        </div>

                    </div>

                    <div className="date-picker-footer">
                        <div className="selected-dates">
                            <span className={selectedStart ? "selected" : "not-selected"}>
                                {selectedStart ? formatDate(selectedStart) : "Chọn ngày bắt đầu"}
                            </span>
                            <img src={iconArrowRight} alt="icon" />
                            <span className={selectedEnd ? "selected" : "not-selected"}>
                                {selectedEnd ? formatDate(selectedEnd) : "Chọn ngày kết thúc"}
                            </span>
                        </div>
                        <div>
                            <button id="resetBtn" onClick={handleReset}>Xóa Thiết Lập</button>
                            <button id="applyBtn" onClick={handleApply}>Áp Dụng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
