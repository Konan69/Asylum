import React from "react";
import '../Styles/home.css'
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";

function Home() { 
  return (
  // <div>
  // <Link to ="/whitelist"> join whitelist </Link>
  // </div>
  
  <MDBCarousel showIndicators showControls fade touch={false}>
  <MDBCarouselItem itemId={1}>
    <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' className='d-block w-100' alt='...' />
    <MDBCarouselCaption>
      <h5>First slide label</h5>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </MDBCarouselCaption>
  </MDBCarouselItem>

  <MDBCarouselItem itemId={2}>
    <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg' className='d-block w-100' alt='...' />
    <MDBCarouselCaption>
      <h5>Second slide label</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </MDBCarouselCaption>
  </MDBCarouselItem>

  <MDBCarouselItem itemId={3}>
    <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' className='d-block w-100' alt='...' />
    <MDBCarouselCaption>
      <h5>Third slide label</h5>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </MDBCarouselCaption>
  </MDBCarouselItem>
</MDBCarousel>
  )
}

export default Home;