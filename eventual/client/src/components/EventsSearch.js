import React from 'react'
import { useContext } from 'react';
import { SearchContext } from './SearchContext';
import { ThemeContext } from "./ThemeContext";
import Accordion from 'react-bootstrap/Accordion';

const EventsSearch = ({ search }) => {
    const {
        activeFilters, setActiveFilters,
        womanOnly, setWomanOnly,
        startDate, setStartDate,
        endDate, setEndDate,
        city, setCity,
        orderby, setOrderby,
        allFilters
    } = useContext(SearchContext);
    const {theme} = useContext(ThemeContext);

    return (
        <Accordion defaultActiveKey="1" className="eventsFilter mx-4 my-4" >
            <Accordion.Item eventKey="0" className="eventsFilter" data-theme={theme}>
                <Accordion.Header data-theme={theme}>Filters</Accordion.Header>
                <Accordion.Body data-theme={theme}>
                    <div id="categoryFilters" class="d-flex flex-row mb-3">
                        {Object.keys(allFilters).map(filt =>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value={activeFilters[filt]} checked={activeFilters[filt]}
                                    onChange={() => setActiveFilters({ ...activeFilters, [filt]: !activeFilters[filt] })} />
                                <label class="form-check-label">{filt}</label>
                            </div>
                        )}
                    </div>
                    <div id="womanOnlyFilter" class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="checkbox" value={womanOnly} checked={womanOnly}
                            onChange={() => setWomanOnly(!womanOnly)} />
                        <label class="form-check-label">Woman Only</label>
                    </div>
                    <div id="startAndEndDates" class="d-flex flex-row">
                        <div class="form-group mb-3 w-25">
                            <label>Start Date</label>
                            <input class="form-control" type="date" placeholder="Enter Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div class="form-group mb-3 w-25 mx-3">
                            <label>End Date</label>
                            <input class="form-control" type="date" placeholder="Enter Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <div id="city" class="d-flex flex-row">
                        <div class="form-group mb-3 w-25">
                            <label>City</label>
                            <input class="form-control" type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                    </div>
                    <div><label>Sort by:</label></div>
                    <div id="orderByOldest" class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="checkbox" value={orderby} checked={orderby=="oldest"}
                            onChange={() => setOrderby("oldest")} />
                        <label class="form-check-label">Oldest </label>
                    </div>
                    <div id="orderByNewest" class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="checkbox" value={orderby} checked={orderby=="newest"}
                            onChange={() => setOrderby("newest")} />
                        <label class="form-check-label">Newest </label>
                    </div>
                    <div id="orderByLikes" class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="checkbox" value={orderby} checked={orderby=="likes"}
                            onChange={() => setOrderby("likes")} />
                        <label class="form-check-label">Likes </label>
                    </div>
                    <div id="orderByJoined" class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="checkbox" value={orderby} checked={orderby=="joined"}
                            onChange={() => setOrderby("joined")} />
                        <label class="form-check-label">Joined </label>
                    </div>
                    <div id="orderByPopularity" class="form-check form-check-inline mb-3">
                        <input class="form-check-input" type="checkbox" value={orderby} checked={orderby=="popularity"}
                            onChange={() => setOrderby("popularity")} />
                        <label class="form-check-label">Popularity </label>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary" onClick={search}>Apply filters</button>
                    </div>

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default EventsSearch