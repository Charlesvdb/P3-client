import React, { Component } from 'react'
import GuestLayout from '../../layout/GuestLayout'
import {signup} from '../../utils/auth'
import Axios from 'axios'
import env from 'dotenv'


export default class Signup extends Component {
   state = {
      user:{},
      usernamecheck:'Sign Up', //page title and 'username exists' message
      userlist:[], //list of existing users
      style:{}, //style for button
      style2: { //style for username input
         border:'2px solid white',
         boxShadow:'0px 2px 10px rgba(30, 143, 255, 0.301)'
      },
      style3:{ // style for page title (username check)
         fontSize:'2rem'
      }
   }

   //get list of existing users for username check
   componentDidMount(){
      Axios.get(`${process.env.REACT_APP_API}/auth/userList`)
      .then(response=>{
         this.setState({
            userlist:response.data
         })
      })
      .catch(err=>console.log(err))
   }
   
   //update state.user with input values
   formHandler = (e) => {
      let formdata = {...this.state.user}
      formdata[e.target.name] = e.target.value
      this.setState({
         user:formdata
      })

      let count = 0
      if (e.target.name === 'username'){
         this.state.userlist.forEach(el => {
            if (e.target.value === el.username) count++
         })
      }

      if (count > 0) {
         this.setState({
            usernamecheck:'Username already exists',
            style2:{border:'2px solid red', boxShadow:'0px 2px 10px rgba(255, 0, 0, 0.5)'},
            style3:{fontSize:'1.4rem', color:'red'}
         })
      } else {
         this.setState({
            usernamecheck:'Sign Up',
            style2:{border:'2px solid green', boxShadow:'0px 2px 10px rgba(0, 255, 0, 0.5)'},
            style3:{fontSize:'2rem', color:'dodgerblue'}
         })
      }
      if (formdata.username === ''){
         this.setState({
            usernamecheck:'Sign Up',
            style2:{border:'2px solid white', boxShadow:'0px 2px 10px rgba(30, 143, 255, 0.301)'},
            style3:{fontSize:'2rem', color:'dodgerblue'}
         })
      }
      
   }

   //submit signup
   submitHandler = (e) => {
      e.preventDefault()
      signup(this.state.user)
      .then((response)=>{
         this.setState({
            usernamecheck:'Welcome!',
            style:{backgroundColor:'#36a832', boxShadow:'0px 4px 10px #36a832'},
            style3:{fontSize:'1.8rem', color:'green'}
         })
         setTimeout(()=>{
            this.props.history.push('/profile')
         }, 1000)
      })
      .catch(err=>console.log(err))
   }

   render() {
      return (
         <GuestLayout>
         <div className='auth-container'>
            <h3 style={this.state.style3}>{this.state.usernamecheck}</h3>
            <form className='signup-form auth-form' onSubmit={this.submitHandler}>
               <input style={this.state.style2} name="username" type="text" onChange={this.formHandler} placeholder="username" required pattern='^[a-z0-9A-Z ]{3,20}$' title='Username must be 3 to 20 characters long. Use alphabetic or numerical characters only.'/>
               <input name="email" type="text" onChange={this.formHandler} placeholder="email" />
               <input name="tel" type="text" onChange={this.formHandler} placeholder="telephone" required pattern='^[0-9 -+]{6-14}$' title='Telephone must be 6 to 14 numbers long. Use numbers only.'/>
               <input name="password" type="password" onChange={this.formHandler} placeholder="password" required pattern='^.{8,16}$' title='Password must be 8 to 16 characters long.'/>
               <button type='submit' style={this.state.style}>Sign Up</button>
            </form>
         </div>
         </GuestLayout>
      )
   }
}
