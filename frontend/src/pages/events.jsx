import Title from '../components/title';
import EventList from '../components/event/event-list';
import Pagination from '../components/pagination';

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventService from '../services/events';
import DateRangePicker from '../components/date-range-picker';
import TypePicker from '../components/event-type-picker';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [limit] = useState(32); // Default limit for pagination
  const [page, setPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(0); // Total pages for pagination
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [location, setLocation] = useState('all');
  const [isFree, setFree] = useState(false);
 
  // Handle location state from SearchBox
  const locationState = useLocation().state;
  
  useEffect(() => {
    if (locationState && locationState.location) {
      setLocation(locationState.location);
      setPage(1);
    }
  }, [locationState]);

  const fetchData = async (currentPage, selectedDate, location, isFree) => {
    try {      
      const response = await EventService.getAll(limit, currentPage, '', selectedDate.startDate, selectedDate.endDate, location, isFree);
      
      setEvents(response.body);
      setTotalPages(response.totalPages);

      if (response.currentPage !== currentPage) {
        setPage(response.currentPage);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchData(page, dateRange, location, isFree);
    window.scrollTo(0, 0);
  }, [page, dateRange, location, isFree]);

  return (
    <>
      <section className="event-section">
        <div className="container">
          <div className="heading">
            <Title className='title' text={`Tất cả sự kiện${location !== 'all' ? ` - ${location}` : ''}`} />
            <div className="filter">
              <TypePicker
                setLocation={setLocation}
                setFree={setFree}
              />
              <DateRangePicker dateRange={dateRange} setDate={setDateRange} />
            </div>
          </div>

          {/* danh sách event */}
          {events.length > 0 ? (
            <EventList className="" data={events} />
          ) : (
            <div className="no-events">
              <p>Không có sự kiện nào trong danh mục này.</p>
            </div>
          )}

          {/* phân trang */}
          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
