import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../services/events';
import Title from '../components/title';
import EventList from '../components/event/event-list';
import Pagination from '../components/pagination';
import DateRangePicker from '../components/date-range-picker';
import TypePicker from '../components/event-type-picker';

const EventCategory = () => {
  const [events, setEvents] = useState([]);
  const [limit] = useState(32); // Default limit for pagination
  const [page, setPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(0); // Total pages for pagination
  const { categorySlug } = useParams();
  const [category, setCategory] = useState(null);
  const categorySlugMap = {
    "live-concert": "music",
    "san-khau-nghe-thuat": "theatersandart",
    "the-thao": "sport",
    "khac": "others"
  };
  const categoryDisplayMap = {
    music: "Live Concert",
    theatersandart: "Sân khấu & Nghệ thuật",
    sport: "Thể thao",
    others: "Khác"
  };
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [location, setLocation] = useState('all');
  const [isFree, setFree] = useState(false);

  const fetchData = async (currentPage, selectedDate, location, isFree) => {
    try {

      const response = await EventService.getAll(limit, currentPage, category, selectedDate.startDate, selectedDate.endDate, location, isFree);
      // console.log('Fetched events:', response.body);
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
    const mappedCategory = categorySlugMap[categorySlug];
    if (mappedCategory) {
      setCategory(mappedCategory);
      setPage(1);
    } else {
      console.warn("Slug không hợp lệ:", categorySlug);
    }
    window.scrollTo(0, 0);
  }, [categorySlug]);

  useEffect(() => {
    if (!category) return;
    fetchData(page, dateRange, location, isFree);
  }, [page, category, dateRange, location, isFree]);



  return (
    <>
      <section className="event-section">
        <div className="container">

          {/* tiêu đề và bộ lọc */}
          <div className="heading">
            <Title className='title' text={`${categoryDisplayMap[category]}${location !== 'all' ? ` - ${location}` : ''}`} />
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

export default EventCategory;
