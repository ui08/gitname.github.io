// // import React from 'react';
// // import Carousel from "react-multi-carousel";
// // import "react-multi-carousel/lib/styles.css";



// // export default function AppCarousel() {
// //   const responsive = {
// //     desktop: {
// //       breakpoint: { max: 3000, min: 1024 },
// //       items: 3,
// //       slidesToSlide: 3 // optional, default to 1.
// //     },
// //     tablet: {
// //       breakpoint: { max: 1024, min: 464 },
// //       items: 2,
// //       slidesToSlide: 2 // optional, default to 1.
// //     },
// //     mobile: {
// //       breakpoint: { max: 464, min: 0 },
// //       items: 1,
// //       slidesToSlide: 1 // optional, default to 1.
// //     }
// //   };
// //   return (
// //     <Carousel
// //   swipeable={false}
// //   draggable={false}
// //   showDots={true}
// //   responsive={responsive}
// //   ssr={true} // means to render carousel on server-side.
// //   infinite={true}
// //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
// //   autoPlaySpeed={1000}
// //   keyBoardControl={true}
// //   customTransition="all .5"
// //   transitionDuration={500}
// //   containerClass="carousel-container"
// //   removeArrowOnDeviceType={["tablet", "mobile"]}
// //   deviceType={this.props.deviceType}
// //   dotListClass="custom-dot-list-style"
// //   itemClass="carousel-item-padding-40-px"
// // >
// //   <div>Item 1</div>
// //   <div>Item 2</div>
// //   <div>Item 3</div>
// //   <div>Item 4</div>
// // </Carousel>
// //   )
// // }

// import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// // import "./styles.css";
// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 1,
//     slidesToSlide: 4 // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 768 },
//     items: 1,
//     slidesToSlide: 3 // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: { max: 767, min: 464 },
//     items: 1,
//     slidesToSlide: 1 // optional, default to 1.
//   }
// };
// const sliderImageUrl = [
//   //First image url
//   {
//     url:
//       "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1"
//   },
//   {
//     url:
//       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*"
//   },
//   //Second image url
//   {
//     url:
//       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*"
//   },
//   //Third image url
//   {
//     url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
//   },

//   //Fourth image url

//   {
//     url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU"
//   }
// ];
// const AppCarousel = () => {
//   return (
//     <div className="parent">
//       <Carousel
//         responsive={responsive}
//         autoPlay={true}
//         swipeable={true}
//         draggable={true}
//         showDots={true}
//         infinite={true}
//         partialVisible={false}
//         dotListClass="custom-dot-list-style"
//       >
//         {sliderImageUrl.map((imageUrl, index) => {
//           return (
//             <div className="slider" key={index}>
//               <img src={imageUrl.url} alt="movie" />
//             </div>
//           );
//         })}
//       </Carousel>
//     </div>
//   );
// };
// export default AppCarousel;
