import React from 'react'
import Footer from '../../components/footer/Footer'
import NavBar from '../../components/navbar/NavBar'
import GethelpPopup from '../../components/gethelp/Gethelp'
import Box from '../../components/box/Box'
import Launch from "../../assets/New Product Launch.png"
import Marketing from "../../assets/IMG_4774.png"
import Expansion from "../../assets/1BSC8075.png"
import Revenue from "../../assets/Revenue.png"
import Others from "../../assets/Others.png"
import { useModal } from "../../components/modalProvider/Modalprovider";

export default function Businessupdates() {
  const {user,isAuthenticated} = useModal();
  return (
    <>
      <NavBar/>
      <section  className='gethelp-tickets raiseTicket'>
        <div className='heading'>
            <div>SELECT CATEGORY <br></br>
                 FOR <span>BUSINESS UPDATES</span></div>
        </div>
        <div className='ticket-box '>
        {(!isAuthenticated || (isAuthenticated&& user.role==="client")) && 
        <>
            <GethelpPopup ticketName='NEW PRODUCT LAUNCH' cat="BUSINESS UPDATES" image={Launch}/>
            <GethelpPopup  ticketName='MARKETING'cat="BUSINESS UPDATES"image={Marketing}/>
            <GethelpPopup  ticketName='EXPANSION OF BUSINESS'cat="BUSINESS UPDATES"image={Expansion}/>
            <GethelpPopup  ticketName='REVENUE'cat="BUSINESS UPDATES"image={Revenue}/>
            <GethelpPopup  ticketName='OTHERS'cat="BUSINESS UPDATES"image={Others}/>
        </>}
        {isAuthenticated && user.role==="admin" && 
        <>
            <Box ticketName='NEW PRODUCT LAUNCH'link="/admin/new-product-launch"image={Launch}/>
            <Box  ticketName='MARKETING'link="/admin/marketing"image={Marketing}/>
            <Box  ticketName='EXPANSION OF BUSINESS'link="/admin/expansion-of-business"image={Expansion}/>
            <Box  ticketName='REVENUE'link="/admin/revenue"image={Revenue}/>
            <Box  ticketName='OTHERS'link="/admin/others"image={Others}/>
        </>}
           
        </div>
    </section>
    <Footer/>
    </>
  )
}
