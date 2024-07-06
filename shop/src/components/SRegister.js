// import React, {Fragment, useState, useRef} from "react";
// import { Link } from "react-router-dom";
// // import QRCode from "qrcode.react";

// const SRegister = ({ handleClose }) => {
//   const [inputs, setInputs] = useState({
//     s_name: "",
//     s_phone: "",
//     s_password: "",
//     s_div: "",
//     s_dist: "",
//     s_subdist: "",
//     s_union: "",
//     s_road: "",
//     s_frontNID: null,
//     s_backNID: null,
//     s_Photo: null,
//     s_selfiePhoto: null,
//     s_location: "",
//     latitude: null,
//     longitude: null
//   });

// const { s_name, s_phone, s_password, s_div, s_dist, s_subdist, s_union, s_road,s_frontNID, s_backNID,
// s_Photo, s_selfiePhoto, s_location, latitude, longitude } = inputs;

// const frontVideoRef = useRef(null);
// const frontCanvasRef = useRef(null);
// const backVideoRef = useRef(null);
// const backCanvasRef = useRef(null);
// const photoVideoRef = useRef(null);
// const photoCanvasRef = useRef(null);
// const selfieVideoRef = useRef(null);
// const selfieCanvasRef = useRef(null);

// const [frontCameraActive, setFrontCameraActive] = useState(false);
// const [backCameraActive, setBackCameraActive] = useState(false);
// const [photoCameraActive, setPhotoCameraActive] = useState(false);
// const [selfieCameraActive, setSelfieCameraActive] = useState(false);

// const onChange = e => {
//     if (e.target.type === 'file') {
//         setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
//     } else {
//         setInputs({ ...inputs, [e.target.name]: e.target.value });
//     }
// };

// const startFrontCamera = () => {
//     setFrontCameraActive(true);
//     initializeFrontCamera();
//     // Clear c_frontNID state and hide captured image
//     setInputs({ ...inputs, s_frontNID: null });
// };

// const startBackCamera = () => {
//     setBackCameraActive(true);
//     initializeBackCamera();
//     // Clear c_backNID state and hide captured image
//     setInputs({ ...inputs, s_backNID: null });
// };

// const startPhotoCamera = () => {
//     setPhotoCameraActive(true);
//     initializePhotoCamera();
//     // Clear s_Photo state and hide captured image
//     setInputs({ ...inputs, s_Photo: null });
// };

// const startSelfieCamera = () => {
//     setSelfieCameraActive(true);
//     initializeSelfieCamera();
//     // Clear s_selfiePhoto state and hide captured image
//     setInputs({ ...inputs, s_selfiePhoto: null });
// };

// const stopFrontCamera = () => {
//     setFrontCameraActive(false);
//     const video = frontVideoRef.current;
//     if (video) {
//         const stream = video.srcObject;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     }
// };

// const stopBackCamera = () => {
//     setBackCameraActive(false);
//     const video = backVideoRef.current;
//     if (video) {
//         const stream = video.srcObject;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     }
// };

// const stopPhotoCamera = () => {
//     setPhotoCameraActive(false);
//     const video = photoVideoRef.current;
//     if (video) {
//         const stream = video.srcObject;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     }
// };

// const stopSelfieCamera = () => {
//     setSelfieCameraActive(false);
//     const video = selfieVideoRef.current;
//     if (video) {
//         const stream = video.srcObject;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     }
// };

// const initializeFrontCamera = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = frontVideoRef.current;
//         if (video) {
//             video.srcObject = stream;
//         }
//     } catch (error) {
//         console.error("Error accessing front camera:", error);
//     }
// };

// const initializeBackCamera = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = backVideoRef.current;
//         if (video) {
//             video.srcObject = stream;
//         }
//     } catch (error) {
//         console.error("Error accessing back camera:", error);
//     }
// };

// const initializePhotoCamera = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = photoVideoRef.current;
//         if (video) {
//             video.srcObject = stream;
//         }
//     } catch (error) {
//         console.error("Error accessing selfie camera:", error);
//     }
// };

// const initializeSelfieCamera = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = selfieVideoRef.current;
//         if (video) {
//             video.srcObject = stream;
//         }
//     } catch (error) {
//         console.error("Error accessing selfie camera:", error);
//     }
// };

// const captureFrontPhoto = () => {
//     const video = frontVideoRef.current;
//     const canvas = frontCanvasRef.current;
//     const context = canvas.getContext('2d');

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//         console.error("Front Video or canvas element not found.");
//         return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');

//     // Set the captured picture name in the input field
//     setInputs({ ...inputs, s_frontNID: dataURL}); // Use inputs.s_phone

//     stopFrontCamera();
// };

// const captureBackPhoto = () => {
//     const video = backVideoRef.current;
//     const canvas = backCanvasRef.current;
//     const context = canvas.getContext('2d');

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//         console.error("Back Video or canvas element not found.");
//         return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');
//     setInputs({ ...inputs, s_backNID: dataURL });
//     stopBackCamera();
// };

// const captures_Photo = () => {
//     const video = photoVideoRef.current;
//     const canvas = photoCanvasRef.current;
//     const context = canvas.getContext('2d');

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//         console.error("Photo Video or canvas element not found.");
//         return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');
//     setInputs({ ...inputs, s_Photo: dataURL });
//     stopPhotoCamera();
// };

// const captures_SelfiePhoto = () => {
//     const video = selfieVideoRef.current;
//     const canvas = selfieCanvasRef.current;
//     const context = canvas.getContext('2d');

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//         console.error("Selfie Video or canvas element not found.");
//         return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');
//     setInputs({ ...inputs, s_selfiePhoto: dataURL });
//     stopSelfieCamera();
// };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         const locationLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//         setInputs({
//           ...inputs,
//           s_location: locationLink, // Store URL instead of JSX
//           // latitude,
//           // longitude
//         });
//       });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleRegistrationSubmit = async e => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/auth/shop-register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           s_name,
//           s_phone,
//           s_password,
//           s_div,
//           s_dist,
//           s_subdist,
//           s_union,
//           s_road,
//           s_frontNID,
//           s_backNID,
//           s_Photo,
//           s_selfiePhoto,
//           s_location // Use stored URL
//         }),
//       });

//       const data = await response.json();
//       console.log("Data: ", data);

//       if (response.ok) {
//         console.log("Registration successful:", data);

//         handleClose(); // Close the registration form modal
//       } else {
//         console.error("Registration failed:", data);
//       }
//     } catch (error) {
//       console.error("Error registering shop:", error.message);
//     }
//   };

//   return (
//     <Fragment>
//             <div className="container-fluid align-items-center justify-content-center">
//                 <div className="row">
//                     <div className="col-md-8 offset-md-2">
//                         <h1 className="mt-3 text-center">Register</h1>
//                         <form onSubmit={handleRegistrationSubmit} className="mt-4">
//                          <div className="mb-3">
//                         <label htmlFor="s_name" className="form-label">
//                             Shop Name
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="s_name"
//                             name="s_name"
//                             placeholder="Enter shop name"
//                             onChange={(e) => onChange(e)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="s_phone" className="form-label">
//                             Phone Number
//                         </label>
//                         <input
//                             type="tel"
//                             className="form-control"
//                             id="s_phone"
//                             name="s_phone"
//                             placeholder="Enter phone number"
//                             onChange={(e) => onChange(e)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="s_password" className="form-label">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="s_password"
//                             name="s_password"
//                             placeholder="Password"
//                             onChange={(e) => onChange(e)}
//                             required
//                         />
//                     </div>

//                     <div className="mb-3">
//                             <label htmlFor="s_division" className="form-label">
//                                 Division
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_div"
//                                 name="s_div"
//                                 placeholder="Enter division"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="s_district" className="form-label">
//                                 District
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_dist"
//                                 name="s_dist"
//                                 placeholder="Enter district"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="s_subdist" className="form-label">
//                                 Sub-District
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_subdist"
//                                 name="s_subdist"
//                                 placeholder="Enter sub-district"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="s_union" className="form-label">
//                                 Union/City-Corporation
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_union"
//                                 name="s_union"
//                                 placeholder="Enter union/city-corporation"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="s_road" className="form-label">
//                                 Road
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_road"
//                                 name="s_road"
//                                 placeholder="Road/Thana"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>

//                     <div className="mb-3">
//                                 <label htmlFor="s_frontNID" className="form-label">
//                                     Front NID Image
//                                 </label>
//                                 <div className="d-flex flex-column align-items-center">
//                                     {s_frontNID && <img src={s_frontNID} alt="Front NID" className="img-fluid mt-3" />}
//                                     {!frontCameraActive ? (
//                                         <button className="btn btn-primary" onClick={startFrontCamera}>Take Front NID photo</button>
//                                     ) : (
//                                         <Fragment>
//                                             <video ref={frontVideoRef} width="240" height="180" autoPlay></video>
//                                             <canvas ref={frontCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                             <div className="d-flex flex-column align-items-center mt-3">
//                                                 <button className="btn btn-danger" onClick={stopFrontCamera}>Stop Camera</button>
//                                                 <button className="btn btn-primary mt-2" onClick={captureFrontPhoto}>Capture Front NID</button>
//                                             </div>
//                                         </Fragment>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="s_backNID" className="form-label">
//                                     Back NID Image
//                                 </label>
//                                 <div className="d-flex flex-column align-items-center">
//                                     {s_backNID && <img src={s_backNID} alt="Back NID" className="img-fluid mt-3" />}
//                                     {!backCameraActive ? (
//                                         <button className="btn btn-primary" onClick={startBackCamera}>Take Back NID photo</button>
//                                     ) : (
//                                         <Fragment>
//                                             <video ref={backVideoRef} width="240" height="180" autoPlay></video>
//                                             <canvas ref={backCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                             <div className="d-flex flex-column align-items-center mt-3">
//                                                 <button className="btn btn-danger" onClick={stopBackCamera}>Stop Camera</button>
//                                                 <button className="btn btn-primary mt-2" onClick={captureBackPhoto}>Capture Back NID</button>
//                                             </div>
//                                         </Fragment>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="s_Photo" className="form-label">
//                                     Shop Photo
//                                 </label>
//                                 <div className="d-flex flex-column align-items-center">
//                                     {s_Photo && <img src={s_Photo} alt="Photo" className="img-fluid mt-3" />}
//                                     {!photoCameraActive ? (
//                                         <button className="btn btn-primary" onClick={startPhotoCamera}>Take a Shop photo</button>
//                                     ) : (
//                                         <Fragment>
//                                             <video ref={photoVideoRef} width="240" height="180" autoPlay></video>
//                                             <canvas ref={photoCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                             <div className="d-flex flex-column align-items-center mt-3">
//                                                 <button className="btn btn-danger" onClick={stopPhotoCamera}>Stop Camera</button>
//                                                 <button className="btn btn-primary mt-2" onClick={captures_Photo}>Capture Shop Photo</button>
//                                             </div>
//                                         </Fragment>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="s_selfiePhoto" className="form-label">
//                                     Profile Photo
//                                 </label>
//                                 <div className="d-flex flex-column align-items-center">
//                                     {s_selfiePhoto && <img src={s_selfiePhoto} alt="Selfie" className="img-fluid mt-3" />}
//                                     {!selfieCameraActive ? (
//                                         <button className="btn btn-primary" onClick={startSelfieCamera}>Take a profile photo</button>
//                                     ) : (
//                                         <Fragment>
//                                             <video ref={selfieVideoRef} width="240" height="180" autoPlay></video>
//                                             <canvas ref={selfieCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                             <div className="d-flex flex-column align-items-center mt-3">
//                                                 <button className="btn btn-danger" onClick={stopSelfieCamera}>Stop Camera</button>
//                                                 <button className="btn btn-primary mt-2" onClick={captures_SelfiePhoto}>Capture Profile Photo</button>
//                                             </div>
//                                         </Fragment>
//                                     )}
//                                 </div>
//                             </div>

//                     <div className="mb-3">
//                         <label htmlFor="s_location" className="form-label">
//                             Google Map Location
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="s_location"
//                             name="s_location"
//                             placeholder="Enter map location"
//                 value={s_location}
//                             onChange={(e) => onChange(e)}
//                 required
//                         />
//                         <button
//                         type="button"
//                         className="btn btn-primary btn-block my-3"
//                         onClick={getCurrentLocation}
//                     >
//                         Get Current Location
//                         </button>

//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         Register
//                     </button>

//                     <button
//                         type="button"
//                         className="btn btn-secondary ms-2"
//                         onClick={handleClose}
//                     >
//                         Cancel
//                     </button>
//                         </form>
//                         <p className="text-center mt-3">Already have an account?</p>
//                         <Link className="btn btn-success btn-block my-3" to="/shop-login">
//                             Login
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
// );
// };

// export default SRegister;

// import React, {Fragment, useState, useRef} from "react";
// import { Link } from "react-router-dom";
// // import QRCode from "qrcode.react";

// const SRegister = ({ setAuth }) => {
//   const [inputs, setInputs] = useState({
//     s_name: "",
//     s_phone: "",
//     s_password: "",
//     s_div: "",
//     s_dist: "",
//     s_subdist: "",
//     s_union: "",
//     s_road: "",
//     s_frontNID: null,
//     s_backNID: null,
//     s_Photo: null,
//     s_selfiePhoto: null,
//     s_location: "",
//     latitude: null,
//     longitude: null
//   });

//   const { s_name, s_phone, s_password, s_div, s_dist, s_subdist, s_union, s_road,s_frontNID, s_backNID,
// s_Photo, s_selfiePhoto, s_location, latitude, longitude } = inputs;

// const frontVideoRef = useRef(null);
// const frontCanvasRef = useRef(null);
// const backVideoRef = useRef(null);
// const backCanvasRef = useRef(null);
// const photoVideoRef = useRef(null);
// const photoCanvasRef = useRef(null);
// const selfieVideoRef = useRef(null);
// const selfieCanvasRef = useRef(null);

// const [frontCameraActive, setFrontCameraActive] = useState(false);
// const [backCameraActive, setBackCameraActive] = useState(false);
// const [photoCameraActive, setPhotoCameraActive] = useState(false);
// const [selfieCameraActive, setSelfieCameraActive] = useState(false);

// const onChange = e => {
//     if (e.target.type === 'file') {
//         setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
//     } else {
//         setInputs({ ...inputs, [e.target.name]: e.target.value });
//     }
// };

// const startFrontCamera = () => {
//     setFrontCameraActive(true);
//     initializeFrontCamera();
//     // Clear c_frontNID state and hide captured image
//     setInputs({ ...inputs, s_frontNID: null });
// };

// const startBackCamera = () => {
//     setBackCameraActive(true);
//     initializeBackCamera();
//     // Clear c_backNID state and hide captured image
//     setInputs({ ...inputs, s_backNID: null });
// };

// const startPhotoCamera = () => {
//     setPhotoCameraActive(true);
//     initializePhotoCamera();
//     // Clear s_Photo state and hide captured image
//     setInputs({ ...inputs, s_Photo: null });
// };

// const startSelfieCamera = () => {
//     setSelfieCameraActive(true);
//     initializeSelfieCamera();
//     // Clear s_selfiePhoto state and hide captured image
//     setInputs({ ...inputs, s_selfiePhoto: null });
// };

// const stopFrontCamera = () => {
//     setFrontCameraActive(false);
//     const video = frontVideoRef.current;
//     if (video) {
//         const stream = video.srcObject;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     }
// };

// const stopBackCamera = () => {
//     setBackCameraActive(false);
//     const video = backVideoRef.current;
//     if (video) {
//         const stream = video.srcObject;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     }
// };

// const stopPhotoCamera = () => {
//     setPhotoCameraActive(false);
//     const video = photoVideoRef.current;
//     if (video) {
//         const stream = video.srcObject;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     }
// };

// const stopSelfieCamera = () => {
//     setSelfieCameraActive(false);
//     const video = selfieVideoRef.current;
//     if (video) {
//         const stream = video.srcObject;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     }
// };

// const initializeFrontCamera = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = frontVideoRef.current;
//         if (video) {
//             video.srcObject = stream;
//         }
//     } catch (error) {
//         console.error("Error accessing front camera:", error);
//     }
// };

// const initializeBackCamera = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = backVideoRef.current;
//         if (video) {
//             video.srcObject = stream;
//         }
//     } catch (error) {
//         console.error("Error accessing back camera:", error);
//     }
// };

// const initializePhotoCamera = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = photoVideoRef.current;
//         if (video) {
//             video.srcObject = stream;
//         }
//     } catch (error) {
//         console.error("Error accessing selfie camera:", error);
//     }
// };

// const initializeSelfieCamera = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = selfieVideoRef.current;
//         if (video) {
//             video.srcObject = stream;
//         }
//     } catch (error) {
//         console.error("Error accessing selfie camera:", error);
//     }
// };

// const captureFrontPhoto = () => {
//     const video = frontVideoRef.current;
//     const canvas = frontCanvasRef.current;
//     const context = canvas.getContext('2d');

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//         console.error("Front Video or canvas element not found.");
//         return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');

//     // Set the captured picture name in the input field
//     setInputs({ ...inputs, s_frontNID: dataURL}); // Use inputs.s_phone

//     stopFrontCamera();
// };

// const captureBackPhoto = () => {
//     const video = backVideoRef.current;
//     const canvas = backCanvasRef.current;
//     const context = canvas.getContext('2d');

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//         console.error("Back Video or canvas element not found.");
//         return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');
//     setInputs({ ...inputs, s_backNID: dataURL });
//     stopBackCamera();
// };

// const captures_Photo = () => {
//     const video = photoVideoRef.current;
//     const canvas = photoCanvasRef.current;
//     const context = canvas.getContext('2d');

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//         console.error("Photo Video or canvas element not found.");
//         return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');
//     setInputs({ ...inputs, s_Photo: dataURL });
//     stopPhotoCamera();
// };

// const captures_SelfiePhoto = () => {
//     const video = selfieVideoRef.current;
//     const canvas = selfieCanvasRef.current;
//     const context = canvas.getContext('2d');

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//         console.error("Selfie Video or canvas element not found.");
//         return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');
//     setInputs({ ...inputs, s_selfiePhoto: dataURL });
//     console.log("dfghjk:   ",dataURL);
//     stopSelfieCamera();
// };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         const locationLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//         setInputs({
//           ...inputs,
//           s_location: locationLink, // Store URL instead of JSX
//           // latitude,
//           // longitude
//         });
//       });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleRegistrationSubmit = async e => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/auth/shop-register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           s_name,
//           s_phone,
//           s_password,
//           s_div,
//           s_dist,
//           s_subdist,
//           s_union,
//           s_road,
//           s_frontNID,
//           s_backNID,
//           s_Photo,
//           s_selfiePhoto,
//           s_location // Use stored URL
//         }),
//       });

//       const data = await response.json();
//       console.log("Data: ", data);

//       if (data.token) {
//         console.log("Registration successful:", data);
//         localStorage.setItem("token", data.token);
//         setAuth(true);
//  // Close the registration form modal
//       } else {
//         setAuth(false);
//         // toast.error(parseRes);
//       }

//     } catch (error) {
//       console.error("Error registering shop:", error.message);
//     }
//   };

//   return (
//     <Fragment>
//             <div className="container-fluid align-items-center justify-content-center">
//                 <div className="row">
//                     <div className="col-md-8 offset-md-2">
//                         <h1 className="mt-3 text-center">Register</h1>
//                         <form onSubmit={handleRegistrationSubmit} className="mt-4">
//                          <div className="mb-3">
//                         <label htmlFor="s_name" className="form-label">
//                             Shop Name
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="s_name"
//                             name="s_name"
//                             placeholder="Enter shop name"
//                             onChange={(e) => onChange(e)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="s_phone" className="form-label">
//                             Phone Number
//                         </label>
//                         <input
//                             type="tel"
//                             className="form-control"
//                             id="s_phone"
//                             name="s_phone"
//                             placeholder="Enter phone number"
//                             onChange={(e) => onChange(e)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="s_password" className="form-label">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="s_password"
//                             name="s_password"
//                             placeholder="Password"
//                             onChange={(e) => onChange(e)}
//                             required
//                         />
//                     </div>
//                     <div className="row mb-3">
//                         <div className="col-md-4">
//                             <label htmlFor="s_division" className="form-label">
//                                 Division
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_div"
//                                 name="s_div"
//                                 placeholder="Enter division"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label htmlFor="s_district" className="form-label">
//                                 District
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_dist"
//                                 name="s_dist"
//                                 placeholder="Enter district"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label htmlFor="s_subdist" className="form-label">
//                                 Sub-District
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_subdist"
//                                 name="s_subdist"
//                                 placeholder="Enter sub-district"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <div className="col-md-6">
//                             <label htmlFor="s_union" className="form-label">
//                                 Union/City-Corporation
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_union"
//                                 name="s_union"
//                                 placeholder="Enter union/city-corporation"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-6">
//                             <label htmlFor="s_road" className="form-label">
//                                 Road
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="s_road"
//                                 name="s_road"
//                                 placeholder="Road/Thana"
//                                 onChange={(e) => onChange(e)}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="mb-3">
//                                 <label htmlFor="s_frontNID" className="form-label">
//                                     Front NID Image
//                                 </label>
//                                 <div className="d-flex flex-column align-items-center">
//                                     {s_frontNID && <img src={s_frontNID} alt="Front NID" className="img-fluid mt-3" />}
//                                     {!frontCameraActive ? (
//                                         <button className="btn btn-primary" onClick={startFrontCamera}>Take Front NID photo</button>
//                                     ) : (
//                                         <Fragment>
//                                             <video ref={frontVideoRef} width="240" height="180" autoPlay></video>
//                                             <canvas ref={frontCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                             <div className="d-flex flex-column align-items-center mt-3">
//                                                 <button className="btn btn-danger" onClick={stopFrontCamera}>Stop Camera</button>
//                                                 <button className="btn btn-primary mt-2" onClick={captureFrontPhoto}>Capture Front NID</button>
//                                             </div>
//                                         </Fragment>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="s_backNID" className="form-label">
//                                     Back NID Image
//                                 </label>
//                                 <div className="d-flex flex-column align-items-center">
//                                     {s_backNID && <img src={s_backNID} alt="Back NID" className="img-fluid mt-3" />}
//                                     {!backCameraActive ? (
//                                         <button className="btn btn-primary" onClick={startBackCamera}>Take Back NID photo</button>
//                                     ) : (
//                                         <Fragment>
//                                             <video ref={backVideoRef} width="240" height="180" autoPlay></video>
//                                             <canvas ref={backCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                             <div className="d-flex flex-column align-items-center mt-3">
//                                                 <button className="btn btn-danger" onClick={stopBackCamera}>Stop Camera</button>
//                                                 <button className="btn btn-primary mt-2" onClick={captureBackPhoto}>Capture Back NID</button>
//                                             </div>
//                                         </Fragment>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="s_Photo" className="form-label">
//                                     Shop Photo
//                                 </label>
//                                 <div className="d-flex flex-column align-items-center">
//                                     {s_Photo && <img src={s_Photo} alt="Photo" className="img-fluid mt-3" />}
//                                     {!photoCameraActive ? (
//                                         <button className="btn btn-primary" onClick={startPhotoCamera}>Take a Shop photo</button>
//                                     ) : (
//                                         <Fragment>
//                                             <video ref={photoVideoRef} width="240" height="180" autoPlay></video>
//                                             <canvas ref={photoCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                             <div className="d-flex flex-column align-items-center mt-3">
//                                                 <button className="btn btn-danger" onClick={stopPhotoCamera}>Stop Camera</button>
//                                                 <button className="btn btn-primary mt-2" onClick={captures_Photo}>Capture Shop Photo</button>
//                                             </div>
//                                         </Fragment>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="s_selfiePhoto" className="form-label">
//                                     Profile Photo
//                                 </label>
//                                 <div className="d-flex flex-column align-items-center">
//                                     {s_selfiePhoto && <img src={s_selfiePhoto} alt="Selfie" className="img-fluid mt-3" />}
//                                     {!selfieCameraActive ? (
//                                         <button className="btn btn-primary" onClick={startSelfieCamera}>Take a profile photo</button>
//                                     ) : (
//                                         <Fragment>
//                                             <video ref={selfieVideoRef} width="240" height="180" autoPlay></video>
//                                             <canvas ref={selfieCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                             <div className="d-flex flex-column align-items-center mt-3">
//                                                 <button className="btn btn-danger" onClick={stopSelfieCamera}>Stop Camera</button>
//                                                 <button className="btn btn-primary mt-2" onClick={captures_SelfiePhoto}>Capture Profile Photo</button>
//                                             </div>
//                                         </Fragment>
//                                     )}
//                                 </div>
//                             </div>

//                     <div className="mb-3">
//                         <label htmlFor="s_location" className="form-label">
//                             Google Map Location
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="s_location"
//                             name="s_location"
//                             placeholder="Enter map location"
//                 value={s_location}
//                             onChange={(e) => onChange(e)}
//                 required
//                         />
//                         <button
//                         type="button"
//                         className="btn btn-primary btn-block my-3"
//                         onClick={getCurrentLocation}
//                     >
//                         Get Current Location
//                         </button>

//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         Register
//                     </button>

//                     {/* <button
//                         type="button"
//                         className="btn btn-secondary ms-2"
//                         onClick={handleClose}
//                     >
//                         Cancel
//                     </button> */}
//                         </form>
//                         <p className="text-center mt-3">Already have an account?</p>
//                         <Link className="btn btn-success btn-block my-3" to="/shop-login">
//                             Login
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
// );
// };

// export default SRegister;

import React, { Fragment, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
// import QRCode from "qrcode.react";

const SRegister = ({ handleClose }) => {
  const [inputs, setInputs] = useState({
    s_name: "",
    s_phone: "",
    s_password: "",
    s_div: "",
    s_dist: "",
    s_subdist: "",
    s_union: "",
    s_word: "",
    s_road: "",
    s_frontNID: null,
    s_backNID: null,
    s_Photo: null,
    s_selfiePhoto: null,
    s_location: "",
    latitude: null,
    longitude: null,
  });

  const {
    s_name,
    s_phone,
    s_password,
    s_div,
    s_dist,
    s_subdist,
    s_union,
    s_word,
    s_road,
    s_frontNID,
    s_backNID,
    s_Photo,
    s_selfiePhoto,
    s_location,
    latitude,
    longitude,
  } = inputs;

  const frontVideoRef = useRef(null);
  const frontCanvasRef = useRef(null);
  const backVideoRef = useRef(null);
  const backCanvasRef = useRef(null);
  const photoVideoRef = useRef(null);
  const photoCanvasRef = useRef(null);
  const selfieVideoRef = useRef(null);
  const selfieCanvasRef = useRef(null);

  const [frontCameraActive, setFrontCameraActive] = useState(false);
  const [backCameraActive, setBackCameraActive] = useState(false);
  const [photoCameraActive, setPhotoCameraActive] = useState(false);
  const [selfieCameraActive, setSelfieCameraActive] = useState(false);

  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [UC, setUC] = useState("");
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [UCs, setUCS] = useState([]);

  const handleDivisionChange = async (e) => {
    const selectedDivision = e.target.value;
    setDivision(selectedDivision);
    setInputs({
      ...inputs,
      s_div: selectedDivision, // Reset union in inputs
    });
    setDistrict(""); // Reset district when division changes
    try {
      const response = await fetch(
        `http://localhost:5000/location/shop-loc/${selectedDivision}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDistricts(data);
      } else {
        console.error("Failed to fetch districts.");
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setInputs({
      ...inputs,
      s_dist: selectedDistrict, // Reset union in inputs
    });
    setSubDistrict(""); // Reset district when division changes
    try {
      // Fetch sub-districts based on the selected district
      const response = await fetch(
        `http://localhost:5000/location/shop-locsub/${selectedDistrict}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const dat = await response.json();
        console.log("from sub-dis------------", dat);
        // console.log("from frontend------------", data[0]);

        setSubDistricts(dat); // Set the fetched sub-districts
      } else {
        console.error("Failed to fetch sub-districts.");
      }
    } catch (error) {
      console.error("Error fetching sub-districts:", error);
    }
  };

  const handleSubDistrictChange = async (e) => {
    const selectedSubDistrict = e.target.value;
    setSubDistrict(selectedSubDistrict);
    setInputs({
      ...inputs,
      s_subdist: selectedSubDistrict, // Reset union in inputs
    });
    setUC(""); // Reset district when division changes
    try {
      // Fetch sub-districts based on the selected district
      const response = await fetch(
        `http://localhost:5000/location/shop-locuc/${selectedSubDistrict}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("from sub-dis------------", data);
        // console.log("from frontend------------", data[0]);

        setUCS(data); // Set the fetched sub-districts
      } else {
        console.error("Failed to fetch sub-districts.");
      }
    } catch (error) {
      console.error("Error fetching sub-districts:", error);
    }
  };

  const handleUCChange = (e) => {
    setUC(e.target.value);
    setInputs({
      ...inputs,
      s_union: UC, // Reset union in inputs
    });
  };

  const onChange = (e) => {
    if (e.target.type === "file") {
      setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  const startFrontCamera = () => {
    setFrontCameraActive(true);
    initializeFrontCamera();
    // Clear c_frontNID state and hide captured image
    setInputs({ ...inputs, s_frontNID: null });
  };

  const startBackCamera = () => {
    setBackCameraActive(true);
    initializeBackCamera();
    // Clear c_backNID state and hide captured image
    setInputs({ ...inputs, s_backNID: null });
  };

  const startPhotoCamera = () => {
    setPhotoCameraActive(true);
    initializePhotoCamera();
    // Clear s_Photo state and hide captured image
    setInputs({ ...inputs, s_Photo: null });
  };

  const startSelfieCamera = () => {
    setSelfieCameraActive(true);
    initializeSelfieCamera();
    // Clear s_selfiePhoto state and hide captured image
    setInputs({ ...inputs, s_selfiePhoto: null });
  };

  const stopFrontCamera = () => {
    setFrontCameraActive(false);
    const video = frontVideoRef.current;
    if (video) {
      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  const stopBackCamera = () => {
    setBackCameraActive(false);
    const video = backVideoRef.current;
    if (video) {
      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  const stopPhotoCamera = () => {
    setPhotoCameraActive(false);
    const video = photoVideoRef.current;
    if (video) {
      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  const stopSelfieCamera = () => {
    setSelfieCameraActive(false);
    const video = selfieVideoRef.current;
    if (video) {
      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  const initializeFrontCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = frontVideoRef.current;
      if (video) {
        video.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing front camera:", error);
    }
  };

  const initializeBackCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = backVideoRef.current;
      if (video) {
        video.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing back camera:", error);
    }
  };

  const initializePhotoCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = photoVideoRef.current;
      if (video) {
        video.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing selfie camera:", error);
    }
  };

  const initializeSelfieCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = selfieVideoRef.current;
      if (video) {
        video.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing selfie camera:", error);
    }
  };

  const captureFrontPhoto = () => {
    const video = frontVideoRef.current;
    const canvas = frontCanvasRef.current;
    const context = canvas.getContext("2d");

    // Ensure video and canvas are available
    if (!video || !canvas) {
      console.error("Front Video or canvas element not found.");
      return;
    }

    // Draw video frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");

    // Set the captured picture name in the input field
    setInputs({ ...inputs, s_frontNID: dataURL }); // Use inputs.s_phone

    stopFrontCamera();
  };

  const captureBackPhoto = () => {
    const video = backVideoRef.current;
    const canvas = backCanvasRef.current;
    const context = canvas.getContext("2d");

    // Ensure video and canvas are available
    if (!video || !canvas) {
      console.error("Back Video or canvas element not found.");
      return;
    }

    // Draw video frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setInputs({ ...inputs, s_backNID: dataURL });
    stopBackCamera();
  };

  const captures_Photo = () => {
    const video = photoVideoRef.current;
    const canvas = photoCanvasRef.current;
    const context = canvas.getContext("2d");

    // Ensure video and canvas are available
    if (!video || !canvas) {
      console.error("Photo Video or canvas element not found.");
      return;
    }

    // Draw video frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setInputs({ ...inputs, s_Photo: dataURL });
    stopPhotoCamera();
  };

  const captures_SelfiePhoto = () => {
    const video = selfieVideoRef.current;
    const canvas = selfieCanvasRef.current;
    const context = canvas.getContext("2d");

    // Ensure video and canvas are available
    if (!video || !canvas) {
      console.error("Selfie Video or canvas element not found.");
      return;
    }

    // Draw video frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setInputs({ ...inputs, s_selfiePhoto: dataURL });
    stopSelfieCamera();
  };

  const getCurrentLocation = () => {
    const options = {
      enableHighAccuracy: true, // Request high accuracy position
      timeout: 10000, // Increase timeout to 10 seconds
      maximumAge: 0, // Force the browser to get the current location from the device's GPS
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          setInputs({
            ...inputs,
            s_location: locationLink,
          });
        },
        (error) => {
          console.error("Error getting current position:", error);
        },
        options // Pass options object
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  //   const getCurrentLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(position => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         const locationLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  //         setInputs({
  //           ...inputs,
  //           s_location: locationLink, // Store URL instead of JSX
  //           // latitude,
  //           // longitude
  //         });
  //       });
  //     } else {
  //       alert("Geolocation is not supported by this browser.");
  //     }
  //   };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/shop-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          s_name,
          s_phone,
          s_password,
          s_div,
          s_dist,
          s_subdist,
          s_union,
          s_word,
          s_road,
          s_frontNID,
          s_backNID,
          s_Photo,
          s_selfiePhoto,
          s_location, // Use stored URL
        }),
      });

      const data = await response.json();
      console.log("Data: ", data);

      if (response.ok) {
        console.log("Registration successful:", data);
        alert("Registration successful!");
        handleClose(); // Close the registration form modal
      } else {
        console.error("Registration failed:", data);
      }
    } catch (error) {
      console.error("Error registering shop:", error.message);
    }
  };

  return (
    <Fragment>
      <div className="container-fluid align-items-center justify-content-center">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="mt-3 text-center">Register</h1>
            <form onSubmit={handleRegistrationSubmit} className="mt-4">
              <div className="mb-3">
                <label htmlFor="s_name" className="form-label">
                  Shop Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="s_name"
                  name="s_name"
                  placeholder="Enter shop name"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="s_phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="s_phone"
                  name="s_phone"
                  placeholder="Enter phone number"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="s_password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="s_password"
                  name="s_password"
                  placeholder="Password"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <Form.Group controlId="division">
                <Form.Label>Division</Form.Label>
                <Form.Control
                  as="select"
                  value={s_div}
                  onChange={handleDivisionChange}
                  required
                >
                  <option value="">Select Division</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Sylhet">Sylhet</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="district">
                <Form.Label>District</Form.Label>
                <Form.Control
                  as="select"
                  value={s_dist}
                  onChange={handleDistrictChange}
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.district}>
                      {district.district}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Label>Sub-district</Form.Label>
              <Form.Control
                as="select"
                value={s_subdist}
                onChange={handleSubDistrictChange}
                required
              >
                <option value="">Select Sub-district</option>
                {subDistricts.map((subDistrict, index) => (
                  <option key={index} value={subDistrict.upazila}>
                    {subDistrict.upazila}
                  </option>
                ))}
              </Form.Control>

              <Form.Label>Select Union/City-Corporation</Form.Label>
              <Form.Control
                as="select"
                value={s_union}
                onChange={handleUCChange}
                required
              >
                <option value="">Select Union/City-Corporation</option>
                {UCs.map((UC, index) => (
                  <option key={index} value={UC.unions}>
                    {UC.unions}
                  </option>
                ))}
              </Form.Control>
              <div className="mb-3">
                <label htmlFor="s_word" className="form-label">
                  Word
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="s_word"
                  name="s_word"
                  placeholder="word"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="s_road" className="form-label">
                  Road
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="s_road"
                  name="s_road"
                  placeholder="Road/Thana"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="s_frontNID" className="form-label">
                  Front NID Image
                </label>
                <div className="d-flex flex-column align-items-center">
                  {s_frontNID && (
                    <img
                      src={s_frontNID}
                      alt="Front NID"
                      className="img-fluid mt-3"
                    />
                  )}
                  {!frontCameraActive ? (
                    <button
                      className="btn btn-primary"
                      onClick={startFrontCamera}
                    >
                      Take Front NID photo
                    </button>
                  ) : (
                    <Fragment>
                      <video
                        ref={frontVideoRef}
                        width="240"
                        height="180"
                        autoPlay
                      ></video>
                      <canvas
                        ref={frontCanvasRef}
                        style={{ display: "none" }}
                        width="240"
                        height="180"
                      ></canvas>
                      <div className="d-flex flex-column align-items-center mt-3">
                        <button
                          className="btn btn-danger"
                          onClick={stopFrontCamera}
                        >
                          Stop Camera
                        </button>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={captureFrontPhoto}
                        >
                          Capture Front NID
                        </button>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="s_backNID" className="form-label">
                  Back NID Image
                </label>
                <div className="d-flex flex-column align-items-center">
                  {s_backNID && (
                    <img
                      src={s_backNID}
                      alt="Back NID"
                      className="img-fluid mt-3"
                    />
                  )}
                  {!backCameraActive ? (
                    <button
                      className="btn btn-primary"
                      onClick={startBackCamera}
                    >
                      Take Back NID photo
                    </button>
                  ) : (
                    <Fragment>
                      <video
                        ref={backVideoRef}
                        width="240"
                        height="180"
                        autoPlay
                      ></video>
                      <canvas
                        ref={backCanvasRef}
                        style={{ display: "none" }}
                        width="240"
                        height="180"
                      ></canvas>
                      <div className="d-flex flex-column align-items-center mt-3">
                        <button
                          className="btn btn-danger"
                          onClick={stopBackCamera}
                        >
                          Stop Camera
                        </button>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={captureBackPhoto}
                        >
                          Capture Back NID
                        </button>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="s_Photo" className="form-label">
                  Shop Photo
                </label>
                <div className="d-flex flex-column align-items-center">
                  {s_Photo && (
                    <img src={s_Photo} alt="Photo" className="img-fluid mt-3" />
                  )}
                  {!photoCameraActive ? (
                    <button
                      className="btn btn-primary"
                      onClick={startPhotoCamera}
                    >
                      Take a Shop photo
                    </button>
                  ) : (
                    <Fragment>
                      <video
                        ref={photoVideoRef}
                        width="240"
                        height="180"
                        autoPlay
                      ></video>
                      <canvas
                        ref={photoCanvasRef}
                        style={{ display: "none" }}
                        width="240"
                        height="180"
                      ></canvas>
                      <div className="d-flex flex-column align-items-center mt-3">
                        <button
                          className="btn btn-danger"
                          onClick={stopPhotoCamera}
                        >
                          Stop Camera
                        </button>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={captures_Photo}
                        >
                          Capture Shop Photo
                        </button>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="s_selfiePhoto" className="form-label">
                  Profile Photo
                </label>
                <div className="d-flex flex-column align-items-center">
                  {s_selfiePhoto && (
                    <img
                      src={s_selfiePhoto}
                      alt="Selfie"
                      className="img-fluid mt-3"
                    />
                  )}
                  {!selfieCameraActive ? (
                    <button
                      className="btn btn-primary"
                      onClick={startSelfieCamera}
                    >
                      Take a profile photo
                    </button>
                  ) : (
                    <Fragment>
                      <video
                        ref={selfieVideoRef}
                        width="240"
                        height="180"
                        autoPlay
                      ></video>
                      <canvas
                        ref={selfieCanvasRef}
                        style={{ display: "none" }}
                        width="240"
                        height="180"
                      ></canvas>
                      <div className="d-flex flex-column align-items-center mt-3">
                        <button
                          className="btn btn-danger"
                          onClick={stopSelfieCamera}
                        >
                          Stop Camera
                        </button>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={captures_SelfiePhoto}
                        >
                          Capture Profile Photo
                        </button>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="s_location" className="form-label">
                  Google Map Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="s_location"
                  name="s_location"
                  placeholder="Enter map location"
                  value={s_location}
                  onChange={(e) => onChange(e)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-primary btn-block my-3"
                  onClick={getCurrentLocation}
                  required
                >
                  Get Current Location
                </button>
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>

              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={handleClose}
              >
                Cancel
              </button>
            </form>
            <p className="text-center mt-3">Already have an account?</p>
            <Link className="btn btn-success btn-block my-3" to="/shop-login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SRegister;

// import React, { Fragment, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// // import QRCode from "qrcode.react";

// const SRegister = ({ handleClose }) => {
//   const [inputs, setInputs] = useState({
//     s_name: "",
//     s_phone: "",
//     s_password: "",
//     s_div: "",
//     s_dist: "",
//     s_subdist: "",
//     s_union: "",
//     s_word: "",
//     s_road: "",
//     s_frontNID: null,
//     s_backNID: null,
//     s_Photo: null,
//     s_selfiePhoto: null,
//     s_location: "",
//     latitude: null,
//     longitude: null,
//   });

//   const {
//     s_name,
//     s_phone,
//     s_password,
//     s_div,
//     s_dist,
//     s_subdist,
//     s_union,
//     s_word,
//     s_road,
//     s_frontNID,
//     s_backNID,
//     s_Photo,
//     s_selfiePhoto,
//     s_location,
//     latitude,
//     longitude,
//   } = inputs;

//   const frontVideoRef = useRef(null);
//   const frontCanvasRef = useRef(null);
//   const backVideoRef = useRef(null);
//   const backCanvasRef = useRef(null);
//   const photoVideoRef = useRef(null);
//   const photoCanvasRef = useRef(null);
//   const selfieVideoRef = useRef(null);
//   const selfieCanvasRef = useRef(null);

//   const [frontCameraActive, setFrontCameraActive] = useState(false);
//   const [backCameraActive, setBackCameraActive] = useState(false);
//   const [photoCameraActive, setPhotoCameraActive] = useState(false);
//   const [selfieCameraActive, setSelfieCameraActive] = useState(false);

//   const onChange = (e) => {
//     if (e.target.type === "file") {
//       setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
//     } else {
//       setInputs({ ...inputs, [e.target.name]: e.target.value });
//     }
//   };

//   const startFrontCamera = () => {
//     setFrontCameraActive(true);
//     initializeFrontCamera();
//     // Clear c_frontNID state and hide captured image
//     setInputs({ ...inputs, s_frontNID: null });
//   };

//   const startBackCamera = () => {
//     setBackCameraActive(true);
//     initializeBackCamera();
//     // Clear c_backNID state and hide captured image
//     setInputs({ ...inputs, s_backNID: null });
//   };

//   const startPhotoCamera = () => {
//     setPhotoCameraActive(true);
//     initializePhotoCamera();
//     // Clear s_Photo state and hide captured image
//     setInputs({ ...inputs, s_Photo: null });
//   };

//   const startSelfieCamera = () => {
//     setSelfieCameraActive(true);
//     initializeSelfieCamera();
//     // Clear s_selfiePhoto state and hide captured image
//     setInputs({ ...inputs, s_selfiePhoto: null });
//   };

//   const stopFrontCamera = () => {
//     setFrontCameraActive(false);
//     const video = frontVideoRef.current;
//     if (video) {
//       const stream = video.srcObject;
//       if (stream) {
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     }
//   };

//   const stopBackCamera = () => {
//     setBackCameraActive(false);
//     const video = backVideoRef.current;
//     if (video) {
//       const stream = video.srcObject;
//       if (stream) {
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     }
//   };

//   const stopPhotoCamera = () => {
//     setPhotoCameraActive(false);
//     const video = photoVideoRef.current;
//     if (video) {
//       const stream = video.srcObject;
//       if (stream) {
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     }
//   };

//   const stopSelfieCamera = () => {
//     setSelfieCameraActive(false);
//     const video = selfieVideoRef.current;
//     if (video) {
//       const stream = video.srcObject;
//       if (stream) {
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     }
//   };

//   const initializeFrontCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       const video = frontVideoRef.current;
//       if (video) {
//         video.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing front camera:", error);
//     }
//   };

//   const initializeBackCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       const video = backVideoRef.current;
//       if (video) {
//         video.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing back camera:", error);
//     }
//   };

//   const initializePhotoCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       const video = photoVideoRef.current;
//       if (video) {
//         video.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing selfie camera:", error);
//     }
//   };

//   const initializeSelfieCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       const video = selfieVideoRef.current;
//       if (video) {
//         video.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing selfie camera:", error);
//     }
//   };

//   const captureFrontPhoto = () => {
//     const video = frontVideoRef.current;
//     const canvas = frontCanvasRef.current;
//     const context = canvas.getContext("2d");

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//       console.error("Front Video or canvas element not found.");
//       return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL("image/png");

//     // Set the captured picture name in the input field
//     setInputs({ ...inputs, s_frontNID: dataURL }); // Use inputs.s_phone

//     stopFrontCamera();
//   };

//   const captureBackPhoto = () => {
//     const video = backVideoRef.current;
//     const canvas = backCanvasRef.current;
//     const context = canvas.getContext("2d");

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//       console.error("Back Video or canvas element not found.");
//       return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL("image/png");
//     setInputs({ ...inputs, s_backNID: dataURL });
//     stopBackCamera();
//   };

//   const captures_Photo = () => {
//     const video = photoVideoRef.current;
//     const canvas = photoCanvasRef.current;
//     const context = canvas.getContext("2d");

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//       console.error("Photo Video or canvas element not found.");
//       return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL("image/png");
//     setInputs({ ...inputs, s_Photo: dataURL });
//     stopPhotoCamera();
//   };

//   const captures_SelfiePhoto = () => {
//     const video = selfieVideoRef.current;
//     const canvas = selfieCanvasRef.current;
//     const context = canvas.getContext("2d");

//     // Ensure video and canvas are available
//     if (!video || !canvas) {
//       console.error("Selfie Video or canvas element not found.");
//       return;
//     }

//     // Draw video frame onto canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL("image/png");
//     setInputs({ ...inputs, s_selfiePhoto: dataURL });
//     stopSelfieCamera();
//   };

//   const getCurrentLocation = () => {
//     const options = {
//       enableHighAccuracy: true, // Request high accuracy position
//       timeout: 10000, // Increase timeout to 10 seconds
//       maximumAge: 0, // Force the browser to get the current location from the device's GPS
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           const locationLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//           setInputs({
//             ...inputs,
//             s_location: locationLink,
//           });
//         },
//         (error) => {
//           console.error("Error getting current position:", error);
//         },
//         options // Pass options object
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   //   const getCurrentLocation = () => {
//   //     if (navigator.geolocation) {
//   //       navigator.geolocation.getCurrentPosition(position => {
//   //         const latitude = position.coords.latitude;
//   //         const longitude = position.coords.longitude;
//   //         const locationLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//   //         setInputs({
//   //           ...inputs,
//   //           s_location: locationLink, // Store URL instead of JSX
//   //           // latitude,
//   //           // longitude
//   //         });
//   //       });
//   //     } else {
//   //       alert("Geolocation is not supported by this browser.");
//   //     }
//   //   };

//   const handleRegistrationSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/auth/shop-register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           s_name,
//           s_phone,
//           s_password,
//           s_div,
//           s_dist,
//           s_subdist,
//           s_union,
//           s_word,
//           s_road,
//           s_frontNID,
//           s_backNID,
//           s_Photo,
//           s_selfiePhoto,
//           s_location, // Use stored URL
//         }),
//       });

//       const data = await response.json();
//       console.log("Data: ", data);

//       if (response.ok) {
//         console.log("Registration successful:", data);

//         handleClose(); // Close the registration form modal
//       } else {
//         console.error("Registration failed:", data);
//       }
//     } catch (error) {
//       console.error("Error registering shop:", error.message);
//     }
//   };

//   return (
//     <Fragment>
//       <div className="container-fluid align-items-center justify-content-center">
//         <div className="row">
//           <div className="col-md-8 offset-md-2">
//             <h1 className="mt-3 text-center">Register</h1>
//             <form onSubmit={handleRegistrationSubmit} className="mt-4">
//               <div className="mb-3">
//                 <label htmlFor="s_name" className="form-label">
//                   Shop Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="s_name"
//                   name="s_name"
//                   placeholder="Enter shop name"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="s_phone" className="form-label">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   className="form-control"
//                   id="s_phone"
//                   name="s_phone"
//                   placeholder="Enter phone number"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="s_password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="s_password"
//                   name="s_password"
//                   placeholder="Password"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="s_division" className="form-label">
//                   Division
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="s_div"
//                   name="s_div"
//                   placeholder="Enter division"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="s_district" className="form-label">
//                   District
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="s_dist"
//                   name="s_dist"
//                   placeholder="Enter district"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="s_subdist" className="form-label">
//                   Sub-District
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="s_subdist"
//                   name="s_subdist"
//                   placeholder="Enter sub-district"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="s_union" className="form-label">
//                   Union/City-Corporation
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="s_union"
//                   name="s_union"
//                   placeholder="Enter union/city-corporation"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="s_word" className="form-label">
//                   Word
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="s_word"
//                   name="s_word"
//                   placeholder="word"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="s_road" className="form-label">
//                   Road
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="s_road"
//                   name="s_road"
//                   placeholder="Road/Thana"
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="s_frontNID" className="form-label">
//                   Front NID Image
//                 </label>
//                 <div className="d-flex flex-column align-items-center">
//                   {s_frontNID && (
//                     <img
//                       src={s_frontNID}
//                       alt="Front NID"
//                       className="img-fluid mt-3"
//                     />
//                   )}
//                   {!frontCameraActive ? (
//                     <button
//                       className="btn btn-primary"
//                       onClick={startFrontCamera}
//                     >
//                       Take Front NID photo
//                     </button>
//                   ) : (
//                     <Fragment>
//                       <video
//                         ref={frontVideoRef}
//                         width="240"
//                         height="180"
//                         autoPlay
//                       ></video>
//                       <canvas
//                         ref={frontCanvasRef}
//                         style={{ display: "none" }}
//                         width="240"
//                         height="180"
//                       ></canvas>
//                       <div className="d-flex flex-column align-items-center mt-3">
//                         <button
//                           className="btn btn-danger"
//                           onClick={stopFrontCamera}
//                         >
//                           Stop Camera
//                         </button>
//                         <button
//                           className="btn btn-primary mt-2"
//                           onClick={captureFrontPhoto}
//                         >
//                           Capture Front NID
//                         </button>
//                       </div>
//                     </Fragment>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="s_backNID" className="form-label">
//                   Back NID Image
//                 </label>
//                 <div className="d-flex flex-column align-items-center">
//                   {s_backNID && (
//                     <img
//                       src={s_backNID}
//                       alt="Back NID"
//                       className="img-fluid mt-3"
//                     />
//                   )}
//                   {!backCameraActive ? (
//                     <button
//                       className="btn btn-primary"
//                       onClick={startBackCamera}
//                     >
//                       Take Back NID photo
//                     </button>
//                   ) : (
//                     <Fragment>
//                       <video
//                         ref={backVideoRef}
//                         width="240"
//                         height="180"
//                         autoPlay
//                       ></video>
//                       <canvas
//                         ref={backCanvasRef}
//                         style={{ display: "none" }}
//                         width="240"
//                         height="180"
//                       ></canvas>
//                       <div className="d-flex flex-column align-items-center mt-3">
//                         <button
//                           className="btn btn-danger"
//                           onClick={stopBackCamera}
//                         >
//                           Stop Camera
//                         </button>
//                         <button
//                           className="btn btn-primary mt-2"
//                           onClick={captureBackPhoto}
//                         >
//                           Capture Back NID
//                         </button>
//                       </div>
//                     </Fragment>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="s_Photo" className="form-label">
//                   Shop Photo
//                 </label>
//                 <div className="d-flex flex-column align-items-center">
//                   {s_Photo && (
//                     <img src={s_Photo} alt="Photo" className="img-fluid mt-3" />
//                   )}
//                   {!photoCameraActive ? (
//                     <button
//                       className="btn btn-primary"
//                       onClick={startPhotoCamera}
//                     >
//                       Take a Shop photo
//                     </button>
//                   ) : (
//                     <Fragment>
//                       <video
//                         ref={photoVideoRef}
//                         width="240"
//                         height="180"
//                         autoPlay
//                       ></video>
//                       <canvas
//                         ref={photoCanvasRef}
//                         style={{ display: "none" }}
//                         width="240"
//                         height="180"
//                       ></canvas>
//                       <div className="d-flex flex-column align-items-center mt-3">
//                         <button
//                           className="btn btn-danger"
//                           onClick={stopPhotoCamera}
//                         >
//                           Stop Camera
//                         </button>
//                         <button
//                           className="btn btn-primary mt-2"
//                           onClick={captures_Photo}
//                         >
//                           Capture Shop Photo
//                         </button>
//                       </div>
//                     </Fragment>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="s_selfiePhoto" className="form-label">
//                   Profile Photo
//                 </label>
//                 <div className="d-flex flex-column align-items-center">
//                   {s_selfiePhoto && (
//                     <img
//                       src={s_selfiePhoto}
//                       alt="Selfie"
//                       className="img-fluid mt-3"
//                     />
//                   )}
//                   {!selfieCameraActive ? (
//                     <button
//                       className="btn btn-primary"
//                       onClick={startSelfieCamera}
//                     >
//                       Take a profile photo
//                     </button>
//                   ) : (
//                     <Fragment>
//                       <video
//                         ref={selfieVideoRef}
//                         width="240"
//                         height="180"
//                         autoPlay
//                       ></video>
//                       <canvas
//                         ref={selfieCanvasRef}
//                         style={{ display: "none" }}
//                         width="240"
//                         height="180"
//                       ></canvas>
//                       <div className="d-flex flex-column align-items-center mt-3">
//                         <button
//                           className="btn btn-danger"
//                           onClick={stopSelfieCamera}
//                         >
//                           Stop Camera
//                         </button>
//                         <button
//                           className="btn btn-primary mt-2"
//                           onClick={captures_SelfiePhoto}
//                         >
//                           Capture Profile Photo
//                         </button>
//                       </div>
//                     </Fragment>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="s_location" className="form-label">
//                   Google Map Location
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="s_location"
//                   name="s_location"
//                   placeholder="Enter map location"
//                   value={s_location}
//                   onChange={(e) => onChange(e)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-primary btn-block my-3"
//                   onClick={getCurrentLocation}
//                 >
//                   Get Current Location
//                 </button>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Register
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-secondary ms-2"
//                 onClick={handleClose}
//               >
//                 Cancel
//               </button>
//             </form>
//             <p className="text-center mt-3">Already have an account?</p>
//             <Link className="btn btn-success btn-block my-3" to="/shop-login">
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default SRegister;
