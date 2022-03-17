import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import AddIcon from '@mui/icons-material/Add';
import './AddItems.scss'
import { useDispatch } from 'react-redux';
import { addJobListAsync } from '../../Redux/joblistSlice';
import { useState } from 'react';


const AddItems = () => {
    const [jobName, setJobName] = useState('');
    const [priority, setPriority] = useState(null);
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        if (jobName && priority) {
            dispatch(
                addJobListAsync({
                    title: jobName,
                    category: priority,
                })
            );
        }
    };
    return (
        <div className="addItemsContainer">
            <div className="categoryText">
                Create New Job

            </div>

            <Form onSubmit={onSubmit} id="fullWidth" className="createContainer">
                <Form.Group className="jobNameContainer" fullwidth={true}>
                    <Form.Label>Job Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={jobName}
                        onChange={(event) => setJobName(event.target.value)}
                    />

                </Form.Group>

                <Form.Group className="jobPriorityContainer"  >
                    <Form.Label>Job Priority</Form.Label>
                    <Form.Select aria-label="Default select example" value={priority || ""} onChange={(e) => { setPriority(e.target.value) }}>
                        <option hidden selected>Choose</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Regular">Regular</option>
                        <option value="Trivial">Trivial</option>
                    </Form.Select>
                </Form.Group>


                <Button className="createButton" variant="primary" type="submit">
                    <AddIcon />  Create
                </Button>
            </Form>




        </div>
    )
}

export default AddItems