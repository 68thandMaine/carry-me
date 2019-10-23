import React, { useState, useEffect } from 'react';
import SvgViewer from '../../components/initialAnnimation/svgViewer';
import LandingPage from '../landingPage/landingPage';

function SplashPage() {
    const [thisView, set_thisView] = useState('svgViewer');
    useEffect(()=>{
        showView();
    })
    function changeView(){
        
       if(thisView=="svgViewer") {
        showView("landingPage");
        set_thisView("landingPage");
       }
    
       if(thisView=="landingPage") {
        showView("svgViewer")
        set_thisView("svgViewer");
       } 
    }

    function showView() {
        let viewToShow = thisView;
        switch(viewToShow) {
            case 'svgViewer':
                  return  <SvgViewer />   
                
            case 'landingPage':
                  return <LandingPage />
                
            default:
                return <SvgViewer />
                
        }
    }

    return (
        <div>
         
{showView()}
        <button onClick={()=>changeView()}
        >change to landingPage</button>

        </div>
    )
} 
export default SplashPage