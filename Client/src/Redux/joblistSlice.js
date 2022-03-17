import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const getJobListAsync = createAsyncThunk(
	'joblist/getJobListAsync',
	async () => {
		const res = await fetch('http://localhost:5000/api/posts');
		if (res.ok) {
			const jobs = await res.json();
			return { jobs };
		}
	}
);
export const addJobListAsync = createAsyncThunk(
	'joblist/addJobListAsync',
	async (payload) => {
		const res = await fetch('http://localhost:5000/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title,category:payload.category }),
		});

		if (res.ok) {
			const jobs = await res.json();
			return { jobs };
		}
	}
);

export const deleteJobListAsync = createAsyncThunk(
	'joblist/deleteJobListAsync',
	async (payload) => {
		const res = await fetch(`http://localhost:5000/api/posts/${payload.id}`, {
			method: 'DELETE',
		});

		if (res.ok) {
			return { id: payload.id };
		}
	}
);
export const updateJobListAsync = createAsyncThunk(
	'joblist/updateJobListAsync',
	async (payload) => {
		const res = await fetch(`http://localhost:5000/api/posts/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title,category:payload.category }),
		});

		if (res.ok) {
			const jobs = await res.json();
			return { jobs };
		}
	}
	  
);

export const jobSlice = createSlice({
	name: 'joblist',
	initialState: [],
	reducers: {
		addJob: (state, action) => {
			const job = {
				id: nanoid(),
				title: action.payload.title,
                category:action.payload.category,
			};
			state.push(job);
		},
	
		deleteJob: (state, action) => {
			return state.filter((job) => job.id !== action.payload.id);
		},
		updateJob: (state, action) => {
			const job = {
				id: action._id,
				title: action.payload.title,
                category:action.payload.category,
			};
			state.push(job);
		},
	},
	extraReducers: {
		[getJobListAsync.fulfilled]: (state, action) => {
			return action.payload.jobs;
		},
		[addJobListAsync.fulfilled]: (state, action) => {
			state.push(action.payload.jobs);
		},
		
		[deleteJobListAsync.fulfilled]: (state, action) => {
			return state.filter((job) => job._id !== action.payload.id);
		},
		[updateJobListAsync.fulfilled]: (state, action) => {
			return action.payload.jobs;
		},
	},
});


export const { addJob, deleteJob,updateJob } = jobSlice.actions;

export default jobSlice.reducer;