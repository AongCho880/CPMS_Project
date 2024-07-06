import React from "react";
import { Link } from "react-router-dom";
import "../Style/Home.css";

const Home = () => {
  return (
    <div className="banner">
      <div className="blur-background"></div>
      <div className="home-container">
        <div className="home-content-box">
          <h1>Public Home</h1>
          <div className="home-links">
            {" "}
            {/* Updated class name */}
            <Link to="/shop-login">Shop</Link>
            <Link to="/customer-login">Customer</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import "../Style/Home.css";

// const Home = () => {
//   return (
//     <div className="banner">
//       <div className="d-flex flex-column align-item-center justify-content-center w-50">
//         <h1 className="mb-5"> Public Home</h1>
//         <div className="table text-align-center">
//           <Link to="/shop-login" className="mr-5">
//             {" "}
//             Shop{" "}
//           </Link>
//           <Link to="/customer-login" className="ml-5">
//             {" "}
//             Customer{" "}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import "../Style/Home.css";

// const Home = () => {
//   return (
//     <div className="banner">
//       <div className="blur-background"></div>
//       <div className="container">
//         <h1>Public Home</h1>
//         <div className="links">
//           <Link to="/shop-login">Shop</Link>
//           <Link to="/customer-login">Customer</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
