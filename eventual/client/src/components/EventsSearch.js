import React from 'react'
import { useContext } from 'react';
import { SearchContext } from './SearchContext';
import Accordion from 'react-bootstrap/Accordion';

const EventsSearch = ({ search }) => {
    const {
        activeFilters, setActiveFilters,
        womanOnly, setWomanOnly,
        startDate, setStartDate,
        endDate, setEndDate,
        city, setCity,
        allFilters
    } = useContext(SearchContext);

    return (
        <Accordion defaultActiveKey="1" className="mx-4 my-4">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filters</Accordion.Header>
                <Accordion.Body>
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
                    <div>
                        <button type="submit" class="btn btn-primary" onClick={search}>Apply filters</button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default EventsSearch