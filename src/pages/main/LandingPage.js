import React, {Component} from 'react'
import GuestLayout from '../../layout/GuestLayout'
import axios from 'axios'
import CarComponent from './CarComponent'


export default class LandingPage extends Component {
   state={
      cars:[], //all cars
      carsfound:[], //cars matching search results
      resultsL:0 //number of cars matching search results
   }

   //get all cars from database
   componentDidMount(){
      axios.get(`${process.env.REACT_APP_API}/cars/all`, {withCredentials: true})
      .then(response=>{
         this.setState({
            cars:response.data,
            carsfound:response.data
         })
      })
   }

   //update state.carsfound with cars matching input values
   searchCars = (e) => {
      let foundcars = this.state.cars.filter(car=>{
         if (car.name){
            if (car.name.toLowerCase().includes(e.target.value.toLowerCase())) return true
         }
      })
      this.setState({
         carsfound:foundcars
      })
   }

   //sort cars by price
   sortByPrice = () => {
      if (this.state.sortprice){
         let cars = this.state.carsfound.sort((a,b)=>{
            return a.price - b.price
         })
         this.setState({
            carsfound:cars,
            sortprice:false
         })
      } else {
         let cars = this.state.carsfound.sort((a,b)=>{
            return b.price - a.price
         })
         this.setState({
            carsfound:cars,
            sortprice:true
         })
      }
   }

   //sort cars by year
   sortByYear = () => {
      if (this.state.sortyear){
         let cars = this.state.carsfound.sort((a,b)=>{
            return a.year - b.year
         })
         this.setState({
            carsfound:cars,
            sortyear:false
         })
      } else {
         let cars = this.state.carsfound.sort((a,b)=>{
            return b.year - a.year
         })
         this.setState({
            carsfound:cars,
            sortyear:true
         })
      }
   }
   
   ////sort cars by name
   sortByName = () => {
      if (this.state.sortname){
         let cars = this.state.carsfound.sort((a,b)=>{
            if (a.name > b.name) return 1
            else if (b.name > a.name) return -1
            else return 0
         })
         this.setState({
            carsfound:cars,
            sortname:false
         })
      } else {
         let cars = this.state.carsfound.sort((a,b)=>{
            if (a.name > b.name) return -1
            else if (b.name > a.name) return 1
            else return 0
         })
         this.setState({
            carsfound:cars,
            sortname:true
         })
      }
   }

   //sort cars by kilometers
   sortByKM = () => {
      if (this.state.sortkm){
         let cars = this.state.carsfound.sort((a,b)=>{
            return a.kilometers - b.kilometers
         })
         this.setState({
            carsfound:cars,
            sortkm:false
         })
      } else {
         let cars = this.state.carsfound.sort((a,b)=>{
            return b.kilometers - a.kilometers
         })
         this.setState({
            carsfound:cars,
            sortkm:true
         })
      }
   }

   //count number of cars matching search results
   results = () => {
      if (this.state.carsfound.length !== this.state.cars.length) {
         return `${this.state.carsfound.length} results`
      }
   }
   
   render(){
      return (
         <GuestLayout >
         <div className='landing-page'>
            <div className='main-header'>
               <h1><span>GET</span>Cars</h1>
               <h4>The easiest place to buy cars online</h4>
               <h4>With over {this.state.cars.length - 1} cars to choose from</h4>
            </div>
            <div className='search-container'>
               <input type="text" onChange={this.searchCars} placeholder='Find the car for you'/>
               <p className='results-length'>{
                  this.results()
               }</p>
               <div className='sort-options'>
                  <button onClick={this.sortByName} >Name</button>
                  <button onClick={this.sortByPrice} >Price</button>
                  <button onClick={this.sortByYear} >Year</button>
                  <button onClick={this.sortByKM} >KM</button>

               </div>
            </div>
            <div className='search-results'>
               {this.state.carsfound.map(car=>(
                  <CarComponent
                     id={car._id}
                     image={car.image}
                     name={car.name}
                     price={car.price}
                     km={car.kilometers}
                     owner={car.owner.username}
                  />
               ))}
            </div>
            </div>
         </GuestLayout>
      )
   }
}
