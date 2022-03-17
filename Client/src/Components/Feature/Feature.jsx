import React from 'react'
import Form from 'react-bootstrap/Form';

import SearchIcon from '@mui/icons-material/Search';
import './Feature.scss'

import { useState } from 'react';
import JobList from '../JobList/JobList';

const Feature = () => {
  const [priority, setPriority] = useState(null);
  const [search, setSearch] = useState("");

  const handleFilterClick = (e) => {
    e.preventDefault();
    setPriority(e.target.value);

  };
  return (
    <div>

      <div className="filterContainer">

        <div className="JobListText">
          Job List

        </div>

        <Form className="formContainer">
          <Form.Group className="searchContainer" >
            <SearchIcon className="searchIcon" />
            <Form.Control type="text" placeholder="Search"
              onChange={(e) => { setSearch(e.target.value.toLowerCase()) }} />

          </Form.Group>

          <Form.Group className="filterSelect"  >

            <Form.Select onChange={handleFilterClick} aria-label="Default select example">
              <option value="" selected>Priority (all)</option>
              <option value="Urgent">Urgent</option>
              <option value="Regular">Regular</option>
              <option value="Trivial">Trivial</option>
            </Form.Select>
          </Form.Group>
        </Form>

        <div className="tableHeadContainer">
          <div className="tableColContainer1">Name</div>
          <div className="tableColContainer2">Priority</div>
          <div className="tableColContainer3">Action</div>
        </div>
      </div>
      {
        priority === null ? (
          <>
            <JobList priority="Urgent" search={search} />
            <JobList priority="Trivial" search={search} />
            <JobList priority="Regular" search={search} />
          </>
        ) : (
          <JobList priority={priority} search={search} />
        )
      }


    </div>
  )
}

export default Feature