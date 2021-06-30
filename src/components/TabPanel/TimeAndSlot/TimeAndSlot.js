import React, { useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import './time.css'
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

import TimePicker from 'rc-time-picker';

const format = 'h:mm a';

const now = moment().hour(0).minute(0);


export default class extends React.Component {


 
  
  state = {
    weekendsVisible: true,
    currentEvents: [],
    open : false,
    open1 : false,
    jsonObj1 : [],
    value : null,
    dateObj : '',
    timeObj : '',
    timeObj1 : '',
    country : '',
    time1 : moment(),
    time2 : moment(),
    time1Obj : '',
    time2Obj : '',
    publicId : ''


  }


  async componentDidMount(){


    const api = "/delivery-slots";

    const jwt = reactLocalStorage.get('id_token');
    const jwtToken ='Bearer '+jwt;
    var self=this;

    axios.get(api, {
      headers: {
      'Authorization': jwtToken,
      'Accept' : '*/*',
      'Content-Type': 'application/json',
      'App-Token' : 'A14BC'
      }
  })
  .then(product => {
  //console.log("token inside the get method: ", this.state.token);
  this.buildhtml(product.data) // would work

 
  })
  .catch(error =>{
      this.setState({
          isLoading: false,
          
          });
          });




  }



  buildhtml =(columnsResult) => 
  {
    var jsonObj = [];

    const country = reactLocalStorage.get('country');
    if(country == "Singapore")
    {
      

    columnsResult.forEach(function(column) 
   {
  
  
  
        var item = {}
        var str = column.start;
        var str1 = column.end;
        var res = str.slice(0, 19);
        var res1 = str1.slice(0, 19);
     
        var serverDateTime = res;
        var serverDateTime1 = res1;
  var d = new Date(serverDateTime+"+00:00");
  d.toLocaleString("en-US", {timeZone: "Asia/Singapore", hour12: true});
  
  var d1 = new Date(serverDateTime1+"+00:00");
  d1.toLocaleString("en-US", {timeZone: "Asia/Singapore", hour12: true});
  
  
  item ["title"] = (d.toLocaleString("en-US", {timeZone: "Asia/Singapore", hour12: true, timeStyle : "short"})) + " - " + (d1.toLocaleString("en-US", {timeZone: "Asia/Singapore", hour12: true, timeStyle : "short"}));
  
        item ["start"] = column.start;
        item ["end"] = column.end;
  
        item ["id"] = column.id;
    
  
        jsonObj.push(item);
  
  
    });
  
  
    this.setState({jsonObj1 : jsonObj});
    this.setState({country : 'Asia/Singapore'});

  
  
  }

  if(country == "India")
  {

    columnsResult.forEach(function(column) 
    {
 
      var item = {}
         var str = column.start;
         var str1 = column.end;
         var res = str.slice(0, 19);
         var res1 = str1.slice(0, 19);
      
         var serverDateTime = res;
         var serverDateTime1 = res1;
 var d = new Date(serverDateTime+"+00:00");
 d.toLocaleString("en-US", {timeZone: "Asia/Kolkata", hour12: true});
 
 var d1 = new Date(serverDateTime1+"+00:00");
 d1.toLocaleString("en-US", {timeZone: "Asia/Kolkata", hour12: true});
 
 item ["title"] = (d.toLocaleString("en-US", {timeZone: "Asia/Kolkata", hour12: true, timeStyle : "short"})) + " - " + (d1.toLocaleString("en-US", {timeZone: "Asia/Kolkata", hour12: true, timeStyle : "short"}));
 
         item ["start"] = column.start;
         item ["end"] = column.end;
 
         item ["id"] = column.id;
     
       
         jsonObj.push(item);
     });

     this.setState({jsonObj1 : jsonObj});


     this.setState({country : 'Asia/Kolkata'});

  }


}
  

  render() {
    return (
      <>
      <div className='demo-app'>
        <div className='demo-app-main'>
          {
                 this.state.jsonObj1.length &&         console.log(this.state.jsonObj1)

          }
          {
           this.state.jsonObj1.length && 

           
           
         
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
            }}
            timezone = {this.state.country}

            initialView='dayGridMonth'
            allDaySlot = 'false'
            eventOverlap = 'false'
            selectOvetlap = 'false'
            selectable = 'true'
            selectHelper = 'true'
            nextDayThreshold = '11:59:59 PM'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={this.state.jsonObj1}
            select={this.handleDateSelect}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
         
           
          />
        }
        </div>
      </div>
      <Dialog  aria-labelledby="form-dialog-title" open={this.state.open}   onClose={this.onCloseModal} style={{zIndex:'10 !important'}}>
        <DialogTitle id="form-dialog-title">Add Delivery Time Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <h6>From Time</h6>

          <TimePicker
    showSecond={false}
    defaultValue={now}
    className="xxx"
    onChange={this.onChange}
    format={format}
    use12Hours
  />
  <br></br>
   <h6 style={{marginTop:'20px'}}>To Time</h6>

<TimePicker
showSecond={false}
defaultValue={now}
className="xxx"
onChange={this.onChange1}
format={format}
use12Hours
/>
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
        <Button onClick={this.onCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.callApi} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog  aria-labelledby="form-dialog-title" open={this.state.open1}   onClose={this.onCloseModal} style={{zIndex:'10 !important'}}>
        <DialogTitle id="form-dialog-title">Update/Delete Delivery Time Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <h6>From Time</h6>

          <TimePicker
    showSecond={false}
    defaultValue={this.state.time1}
    className="xxx"
    onChange={this.onChange1_1}
format={format}
use12Hours
  />
  <br></br>
   <h6 style={{marginTop:'20px'}}>To Time</h6>

<TimePicker
showSecond={false}
defaultValue={this.state.time2}
className="xxx"
onChange={this.onChange1_2}
format={format}
use12Hours
/>
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
        <Button onClick={this.onCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.callApi2} color="primary">
            Update
          </Button>
          <Button onClick={this.callApi3} color="primary">
            Dealete
          </Button>
        </DialogActions>
      </Dialog>



      </>
    )
  }


  
  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }
  onCloseModal = () =>{
    this.setState({
      open: false,
      open1: false  

      });
  }


  callApi = () => {

    var d;
    var d1;

    const country = reactLocalStorage.get('country');

    var img_category = (this.state.dateObj+"T"+this.state.timeObj+":"+"00.000")
    var description = (this.state.dateObj+"T"+this.state.timeObj1+":"+"00.000")

    if(country == "Singapore")
    {
     d = new Date(img_category+"+08:00");
    d.toISOString();
    
     d1 = new Date(description+"+08:00");
    d1.toISOString();
    }
    if(country == "India")
    {
         d = new Date(img_category+"+05:30");
    d.toISOString();
    
     d1 = new Date(description+"+05:30");
    d1.toISOString();
    }
    

    const product = {
      "available": 1,
      start: d.toISOString(),
      end : d1.toISOString(),
      archieved:false, 
      }
      const jwt = reactLocalStorage.get('id_token');
      const jwtToken ='Bearer '+jwt;

      const headerObject = {
        'Authorization': jwtToken,
        'Accept' : '*/*',
        'Content-Type': 'application/json',
        'App-Token' : 'A14BC'
      }


    const api = "/delivery-slots";

    axios.post(api,product,{headers: headerObject} 
  )
  .then(product => {

    console.log(product)

  })
  .catch(error =>{
      this.setState({
          isLoading: false,
          
          });
          });
    

    
  }


  
  callApi2 = () => {

    var d;
    var d1;

    const country = reactLocalStorage.get('country');

    var img_category = (this.state.dateObj+"T"+this.state.time1Obj+":"+"00.000")
    var description = (this.state.dateObj+"T"+this.state.time2Obj+":"+"00.000")

    if(country == "Singapore")
    {
     d = new Date(img_category+"+08:00");
    d.toISOString();
    
     d1 = new Date(description+"+08:00");
    d1.toISOString();
    }
    if(country == "India")
    {
         d = new Date(img_category+"+05:30");
    d.toISOString();
    
     d1 = new Date(description+"+05:30");
    d1.toISOString();
    }
    

    const product = {
      id : (this.state.publicId).replace(/"/g,""),
      "available": 1,
      start: d.toISOString(),
      end : d1.toISOString(),
      archieved:false, 
      }
      const jwt = reactLocalStorage.get('id_token');
      const jwtToken ='Bearer '+jwt;

      const headerObject = {
        'Authorization': jwtToken,
        'Accept' : '*/*',
        'Content-Type': 'application/json',
        'App-Token' : 'A14BC'
      }


    const api = "/delivery-slots";

    axios.put(api,product,{headers: headerObject} 
  )
  .then(product => {

    console.log(product)

  })
  .catch(error =>{
      this.setState({
          isLoading: false,
          
          });
          });
    

    
  }


  callApi3 = () => {


    const jwt = reactLocalStorage.get('id_token');
    const jwtToken ='Bearer '+jwt;

    const headerObject = {
      'Authorization': jwtToken,
      'Accept' : '*/*',
      'Content-Type': 'application/json',
      'App-Token' : 'A14BC'
    }


  const api = "/delivery-slots/"+this.state.publicId+"";

  axios.delete(api,{headers: headerObject} 
)
.then(products => {

  console.log(products)

})
.catch(error =>{
    this.setState({
        isLoading: false,
        
        });
        });



  }




  handleDateSelect = (selectInfo) => {

    this.setState({
      open: true ,
      dateObj : selectInfo.startStr
      });


    
  }

  onChange = (value)  => {
    const number = moment(value, ["h:mm A"]).format("HH:mm");

    this.setState({
      timeObj : number,
      });

  }

  onChange1 = (value)  => {
    const number1 = moment(value, ["h:mm A"]).format("HH:mm");

    this.setState({
      timeObj1 : number1
      });

  }

  onChange1_1 = (value)  => {
    const number2 = moment(value, ["h:mm A"]).format("HH:mm");
    console.log(number2)

    this.setState({
      time1Obj : number2
      });

  }

  onChange1_2 = (value)  => {
    const number3 = moment(value, ["h:mm A"]).format("HH:mm");

    console.log(number3)

    this.setState({
      time2Obj : number3
      });

  }
  
  
  

  handleEventClick = (clickInfo) => {

  var start_date =  moment(clickInfo.event._instance.range.start).format('YYYY-MM-DD');


    this.setState({
      open1: true ,
      time1 : moment(clickInfo.event.title.slice(0,8),"hh:mm a"),
      time2 : moment(clickInfo.event.title.slice(9,18),"hh:mm a"),
      time1Obj : moment(clickInfo.event.title.slice(0,8), ["h:mm A"]).format("HH:mm"),
      time2Obj : moment(clickInfo.event.title.slice(9,18), ["h:mm A"]).format("HH:mm"),
      dateObj : start_date,
      publicId : clickInfo.event._def.publicId

      
      });
  }


}

function renderEventContent(eventInfo) {
  return (
    <>
 
      <i>{eventInfo.event.title}</i>
    </>
  )
}




