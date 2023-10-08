import React, { useState, useEffect } from "react";
import "./adminsection.css";
import Reqbox from "../reqbox/Reqbox";
import Pagenavigation from "../pagenavigation/Pagenavigation";
import Location from "../location/Location";

export default function Adminsection(props) {
  const cat = props.cat;
  const ticketName = props.ticketName;
  const [sortby, setSortBy] = useState(false);
  const [byReqDates, setbyReqDates] = useState(false);
  const [byFrequency, setbyFrequency] = useState(false);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [getTickets, setGetTickets] = useState([]);
  const authToken = localStorage.getItem("authorization");
  const [selectedLocation, setSelectedLocation] = useState("");

  const fetchTickets = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:3080/auth/getTickets?ticketStatus=${status}`,
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setGetTickets(data.tickets);
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to fetch tickets: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const filteredTickets = getTickets.filter((ticket) => {
    return (
      ticket.status === selectedStatus &&
      ticket.category === cat.toUpperCase() &&
      ticket.title === ticketName.toUpperCase() &&
      (!selectedLocation || ticket.raisedBy.location === selectedLocation)
    );
  });
 
  const SortByReqdate = () => {
    setbyReqDates(true);
    setbyFrequency(false)
    const sortedByDateTickets = [...filteredTickets].sort((a, b) => {
      const dateA = new Date(a.dateRaised);
      const dateB = new Date(b.dateRaised);
      return dateA - dateB; 
    });
    setSortedTickets(sortedByDateTickets); 
  };
  const SortByFrequency = () => {
    setbyFrequency(true);
    setbyReqDates(false)
    
    const sortedByfrequencyTickets = [...filteredTickets].sort((a, b) => {
      const countA = new Date(a.raisedBy.ticketCount);
      const countB = new Date(b.raisedBy.ticketCount);
      return countB - countA; 
    });
    setSortedTickets(sortedByfrequencyTickets); 
  };

  useEffect(() => {
    fetchTickets("pending");
  }, []);

  const handlePending = (status) => {
    setSelectedStatus(status);
    fetchTickets("pending");
  };
  const handleInreview = (status) => {
    setSelectedStatus(status);
    fetchTickets("inreview");
  };
  const handleResolved = (status) => {
    setSelectedStatus(status);
    fetchTickets("resolved");
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <section className="admin_section">
        <div className="container">
          <div className="heading">
            <div>
              REQUESTS FOR<br></br>
              <span>{cat}</span>
            </div>
          </div>
          <div className="container">
            {sortby && (
              <div className="sortby-dropdown">
                <div className="dropdown-heading center">Sort by</div>
                <div className="category" onClick={SortByReqdate}>
                  Requests date
                </div>
                <div className="category" onClick={SortByFrequency}>Frequent requests</div>
              </div>
            )}
            <div className="dots3" onClick={() => setSortBy(!sortby)}>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
        <Location onLocationChange={handleLocationChange} />
        <div className="center">
          <div className="req-status admin_status">
            <div className="pending" onClick={() => handlePending("pending")}>
              Pending
            </div>
            <div
              className="inreview"
              onClick={() => handleInreview("inreview")}
            >
              In review
            </div>
            <div
              className="resolved"
              onClick={() => handleResolved("resolved")}
            >
              Resolved
            </div>
          </div>
        </div>
        {byReqDates ||byFrequency ? (
          sortedTickets.length > 0 ? (
            sortedTickets.map((ticket) => (
              <Reqbox key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <h3 className="center">No {selectedStatus} Tickets</h3>
          )
        ) : filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <Reqbox key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <h3 className="center">No {selectedStatus} Tickets</h3>
        )}
        <Pagenavigation />
      </section>
    </>
  );
}