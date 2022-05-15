import { Component, ChangeEvent } from "react";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Modal,Container, Form,Button, Table, CloseButton, FormControl} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import InputMask from 'react-input-mask';

import 'react-toastify/dist/ReactToastify.css';
import { type } from "@testing-library/user-event/dist/type";
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');


const URL = "http://localhost:5000/";

type state = {
    record : any[];
}


export default class StudentList extends Component {
 
        state={
            result:[] ,
            show: false ,
            handleClose:false ,
            record:[],
            showOnCreate: false,
            handleCloseOnCreate: false
        }
     
    componentDidMount(){    
            this.getAllRecord();
    } 
    
    public updateRecord = async () => {  
                
            debugger
            let collection : any = await Object.freeze(this.state.record);
            
            if(collection.length > 0){
                if( collection[0]["name"] == undefined || collection[0]["name"] == "" || collection[0]["name"] == null)
                {
                    toast("Name must have a value")
                }

                if(collection[0]["width"] == undefined || collection[0]["width"] == "" || collection[0]["width"] == null)
                {
                    toast("Width must have a value")
                }

                if(collection[0]["length"] == undefined || collection[0]["length"] == "" || collection[0]["length"] == null)
                {
                    toast("Length must have a value")
                }
        }
        else{
            toast("One of the field not have a value")
        }
            let json = {Id: collection[0]["id"] ,Name:`${collection[0]["name"]}`,Length : parseFloat(collection[0]["length"]), Width :parseFloat(collection[0]["width"]), Code:`${collection[0]["code"]}`};
      
            await axios.put(`${URL}Ship/UpdateShip`, JSON.stringify(json), {
                headers: {
                             'Content-Type': 'application/json'
                }
            }
            ).then(res => { 
                console.log('Status ', res )           
                if(res.status == 200){
                    this.setState({
                        show:false
                    }) 
                    this.getAllRecord();          
                    toast("Data updated sucessfully!");  
                }  
                else{
                    toast("Invalid Data!");
                }    
            })
            .catch((error) => console.log( error.response.request._response ) );
                  
    }

    public getAllRecord = async() => {   
    
        try{
            const options = { 
             headers: {
                    "X-Custom-Header": "value",
                     'Accept': 'application/form-data',
                    'Content-Type': 'application/json',
                  }
                }            
            await axios.get(`${URL}Ship/GetAllShips`, options
             )
            .then((response) => {            
                console.log("Data ", response.data)
                this.setState({
                    result: response.data,
                    show: false,
                    showOnCreate: false
                });
            });
        }
        catch(err){
           // console.log(err.message);
        }
    }
 

    private editData = (_this : React.ChangeEvent<any>,  _data  : React.ChangeEvent<any>) => {                  
       
       let a : any[] = [];
       a.push(_data);       
        this.setState({
            show: true,
            record:a
        })
    }

    public delteObj = async (id:  React.ChangeEvent<any> ) => {        
      await axios.delete(`${URL}Ship/DeleteShip/${id}` 
        )
        .then(res => {            
            if(res.status === 200){                
                this.getAllRecord();          
                toast("Deleted Sucessfully!");
            }  
            else{
                toast("Invalid Data!");
            }      
        
    })
    }

    deleteData = async (a  : React.ChangeEvent<any>) =>{
        let objConfirm : boolean = window.confirm("Are you sure, want to delete it!");
        if(objConfirm)
        {
           await this.delteObj( a);
        }        
    }

    handleClose = () => {        
        this.setState({
            show:false
        })
    }

    handleCloseOnCreate = () => {        
        this.setState({
            showOnCreate:false
        })
    }

   saveDataOnCreate = async() => {           
        let collection : any =  await Object.freeze(this.state.record);        
        if(collection.length > 0){
                if( collection[0]["name"] == undefined || collection[0]["name"] == "" || collection[0]["name"] == null)
                {
                    toast("Name must have a value")
                }

                if(collection[0]["width"] == undefined || collection[0]["width"] == "" || collection[0]["width"] == null)
                {
                    toast("Width must have a value")
                }

                if(collection[0]["length"] == undefined || collection[0]["length"] == "" || collection[0]["length"] == null)
                {
                    toast("Length must have a value")
                }
        }
        else{
            toast("One of the field not have a value")
        }
        let json = {Name:`${collection[0]["name"]}`,Length : parseFloat(collection[0]["length"]), Width :parseFloat(collection[0]["width"]), Code:`${collection[0]["code"]}`};
        const res = await axios.post(`${URL}Ship/AddShip`,  JSON.stringify(json), {
            headers: {             
               'Content-Type': 'application/json'           
            }
        }).        
        then(res => {            
            if(res.status === 200){
                this.setState({
                    showOnCreate: false
                })
                this.getAllRecord();          
                toast("Data saved sucessfully!");  
            }  
            else{
                toast("Invalid Data!");
            }    
        })
        .catch((error) => console.log( error.response.request._response ) );
       
    }    


    changeCurrentState = (e: React.ChangeEvent<any>) => {

         
        let collection : any =  Object.freeze(this.state.record);
        let _collect = collection; 
        let targeted = e.target.value;  
        if(collection.length > 0){
            _collect = collection[0]; 
        }   

        this.setState({
           record:[
               {     
                   id: e.target.id === "txtid" ? targeted: _collect["id"],                  
                   name: e.target.id === "txtname" ? targeted : _collect["name"],
                   length: e.target.id === "txtlength" ? targeted : _collect["length"],
                   width: e.target.id === "txtwidth" ? targeted : _collect["width"],
                   code: e.target.id === "txtcode"   ? targeted : _collect["code"]
               }
             ]                              // return new object jasper object
          })
         } 


 

    render() {
        let collect = [];
        let collection : any =  Object.freeze(this.state.record); 
        if(collection.length>0){
            collect = collection[0]
        }    
        return(           
            <div className="Container">   
           
            <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
         

                    <Modal 
                    size="xl"
                    show={this.state.showOnCreate}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}            
                    >
                    <Modal.Header closeButton>
                    <Modal.Title>New</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control id="txtname" onChange={(e) => this.changeCurrentState(e)} type="text" placeholder="Name" />                            
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLength">
                            <Form.Label>Length(Meter)</Form.Label>
                            <Form.Control type ="number"  required id="txtlength"  onChange={(e) => this.changeCurrentState(e)}  placeholder="Length" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formWidth">
                             <Form.Label>Width(Meter)</Form.Label>
                            <Form.Control type ="number"  required id="txtwidth" onChange={(e) => this.changeCurrentState(e)}  placeholder="width" />
                        </Form.Group> 

                        <Form.Group className="mb-3" controlId="formCode">
                        <Form.Label>Code</Form.Label>
                        <InputMask className="form-control"  style={{textTransform: "uppercase"}} mask="aaaa-9999-**"  id="txtcode" onChange={(e) => this.changeCurrentState(e)}/>  
                        </Form.Group> 
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseOnCreate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveDataOnCreate}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>


            
                <div className="form-group">
            <button onClick={(e) => this.setState({showOnCreate:true})} type="button" className="btn btn-primary btn-lg float-right">
              Add<svg style={{verticalAlign:"middle"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
                
              </button>
              </div>

                    <Modal 
                    size="xl"
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}            
                    >
                    <Modal.Header closeButton>
                    <Modal.Title>{collection["name"]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                      
                        <Form.Group className="mb-3" controlId="formName">
                           
                        <Form.Control style={{display:"none"}} id="txtid"  onChange={(e) => this.changeCurrentState(e)}   defaultValue={collect["id"]}  type="text" placeholder="id" />
                            <Form.Label>Name</Form.Label>
                            <Form.Control id="txtname"  onChange={(e) => this.changeCurrentState(e)}   defaultValue={collect["name"]}  type="text" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLength">
                             <Form.Label>Length(Meter)</Form.Label>
                            <Form.Control type ="number" id="txtlength"  onChange={(e) => this.changeCurrentState(e)}   defaultValue={collect["length"]}  placeholder="Length" />
                        </Form.Group> 

                        <Form.Group className="mb-" controlId="formWidth">
                             <Form.Label>Width(Meter)</Form.Label>
                            <Form.Control id="txtwidth" type ="number"   onChange={(e) => this.changeCurrentState(e)}   defaultValue={collect["width"]}   placeholder="Width" />
                        </Form.Group>  
                        
                        <Form.Group className="mb-3" controlId="formCode">
                            <Form.Label>Code</Form.Label>
                            <InputMask  style={{textTransform: "uppercase"}} className="form-control" mask="aaaa-9999-**" defaultValue={collect["code"]}  id="txtcode" onChange={(e) => this.changeCurrentState(e)}/>  
                        </Form.Group>                  
                     </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.updateRecord }>
                        Update Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Length</th>
                    <th scope="col">Width</th> 
                    <th scope="Col">Code</th>  
                    <th scope="Col">Actions</th>                 
                    </tr>
                </thead>
                <tbody>
                    {this.state.result.map((data,key) => {                                   
                    return(
                    <tr key={key}>
                        <th scope="row">{data["id"]}</th>
                        <th>{data["name"]}</th>
                        <th>{data["length"]}</th>
                        <th>{data["width"]}</th>
                        <th>{data["code"]}</th>
                        <th><a href="#" onClick={((e) => this.editData(e, data))}>Edit</a>/<a href="#"  onClick={((e) => this.deleteData(data["id"]))} >Delete</a></th>
                    </tr>
                    )
                 })}
                </tbody>
                </Table>    
        </div>     
        )
    }

   
//https://stackoverflow.com/questions/46337471/how-to-allow-cors-in-react-js


}