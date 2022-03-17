import React from 'react'
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import SvgIcon from '@mui/material/SvgIcon';
import Form from 'react-bootstrap/Form';
import { deleteJobListAsync, updateJobListAsync } from '../../Redux/joblistSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';



import './JobItem.scss'



function DialogErrorIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
    </SvgIcon>
  );
}


const PriorityStyle=({category})=>{


  if(category==="Urgent"){
    return  <div className="priorityBox" style={{backgroundColor:"red"}}>{category}</div>
  }
  if(category==="Regular"){
    return  <div className="priorityBox" style={{backgroundColor:"yellow"}}>{category}</div>
  }
  if (category==="Trivial"){
    return  <div className="priorityBox" style={{backgroundColor:"blue"}}>{category}</div>
  }


}


const JobItem = ({ id, title, category }) => {



  // AlertDialog
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDeleteClickDialogOpen = () => {

    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  //EditDialog
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const handleEditClickDialogOpen = () => {
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };


  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    // e.preventDefault();
    handleDeleteDialogClose()
    dispatch(deleteJobListAsync({ id }));
  };

  const handleUpdateClick = (e) => {
    


    // e.preventDefault();
    if (editPriority) {
      dispatch(
        updateJobListAsync({
          id: id,
          title: editJobName,
          category: editPriority,
        })
      );
    }
    handleEditDialogClose()
    window.location.reload()

  }

  const [editJobName, setEditJobName] = useState(title);

  const [editPriority, setEditPriority] = useState(category);

  return (
    <div>

         
        

          <div className="rowItem">
              <div  className="tableColContainer1">{title}</div>
              <div className="tableColContainer2" align="left">
                <PriorityStyle category={category}/>
              </div>
              <div className="tableColContainer3">
                <button name onClick={handleEditClickDialogOpen}>
                  <ModeEditOutlineOutlinedIcon />
                </button >
                <button name onClick={handleDeleteClickDialogOpen}>
                  <DeleteOutlineOutlinedIcon />
                </button>
              </div>
              </div>
         


      {/* DELETE DIALOG */}

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"


      >
        <div className="DeleteDialog">
          <DialogErrorIcon className="DeleteDialogIcon" sx={{ color: red[500] }} />

          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete it?"}
          </DialogTitle>

          <DialogActions>
            <button name onClick={handleDeleteDialogClose} className="DialogButtonCancel">Cancel</button>
            <button name onClick={handleDeleteClick} className="DialogButtonOK">
              Approve
            </button>
          </DialogActions>
        </div>
      </Dialog>





      {/* EDIT DIALOG */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="EditDialogContainer">
          <DialogTitle >
            {"Job Edit"}
          </DialogTitle>
          <Form >
            <Form.Group className="EditDialogFormGroup" >
              <Form.Label >Job Name</Form.Label>
              <Form.Control value={title} type="text"  />

            </Form.Group>



            <Form.Group className="EditDialogFormGroup"  >
              <Form.Label>Job Priority</Form.Label>
              <Form.Select  onChange={(e) => { setEditPriority(e.target.value) }}>
              <option value="0" selected="selected" disabled  hidden>{category}</option>
                <option value="Urgent">Urgent</option>
                <option value="Regular">Regular</option>
                <option value="Trivial">Trivial</option>
              </Form.Select>
            </Form.Group>


          </Form>
          <DialogActions>
            <button className="DialogButtonCancel" onClick={handleEditDialogClose}>Cancel</button>
            <button className="DialogButtonOK" onClick={handleUpdateClick} >
              Save
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default JobItem