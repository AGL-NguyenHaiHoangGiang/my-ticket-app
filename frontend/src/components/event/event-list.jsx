import EventCard from "./event-card";

function EventList({className, data}) {
  return (
    <ul className={`post__list ${className}`}>
      {data.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;