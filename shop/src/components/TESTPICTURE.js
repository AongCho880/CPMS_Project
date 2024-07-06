import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const CustRegistration = ({ handleClose }) => {
    const [inputs, setInputs] = useState({
        c_name: '',
        c_phone: '',
        c_password: '',
        c_frontNID: null,
        c_backNID: null,
        c_selfiePhoto: null
    });

    const { c_name, c_phone, c_password, c_frontNID, c_backNID, c_selfiePhoto } = inputs;
    console.log(inputs);

    const frontVideoRef = useRef(null);
    const frontCanvasRef = useRef(null);
    const backVideoRef = useRef(null);
    const backCanvasRef = useRef(null);
    const selfieVideoRef = useRef(null);
    const selfieCanvasRef = useRef(null);

    const [frontCameraActive, setFrontCameraActive] = useState(false);
    const [backCameraActive, setBackCameraActive] = useState(false);
    const [selfieCameraActive, setSelfieCameraActive] = useState(false);

    const onChange = e => {
        if (e.target.type === 'file') {
            setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
        } else {
            setInputs({ ...inputs, [e.target.name]: e.target.value });
        }
    };

    const startFrontCamera = () => {
        setFrontCameraActive(true);
        initializeFrontCamera();
        // Clear c_frontNID state and hide captured image
        setInputs({ ...inputs, c_frontNID: null });
    };

    const startBackCamera = () => {
        setBackCameraActive(true);
        initializeBackCamera();
        // Clear c_backNID state and hide captured image
        setInputs({ ...inputs, c_backNID: null });
    };

    const startSelfieCamera = () => {
        setSelfieCameraActive(true);
        initializeSelfieCamera();
        // Clear c_selfiePhoto state and hide captured image
        setInputs({ ...inputs, c_selfiePhoto: null });
    };

    const stopFrontCamera = () => {
        setFrontCameraActive(false);
        const video = frontVideoRef.current;
        if (video) {
            const stream = video.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
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
                tracks.forEach(track => track.stop());
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
                tracks.forEach(track => track.stop());
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
        const context = canvas.getContext('2d');

        // Ensure video and canvas are available
        if (!video || !canvas) {
            console.error("Front Video or canvas element not found.");
            return;
        }

        // Draw video frame onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        setInputs({ ...inputs, c_frontNID: dataURL });
        stopFrontCamera();
    };

    const captureBackPhoto = () => {
        const video = backVideoRef.current;
        const canvas = backCanvasRef.current;
        const context = canvas.getContext('2d');

        // Ensure video and canvas are available
        if (!video || !canvas) {
            console.error("Back Video or canvas element not found.");
            return;
        }

        // Draw video frame onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        setInputs({ ...inputs, c_backNID: dataURL });
        stopBackCamera();
    };

    const capturec_SelfiePhoto = () => {
        const video = selfieVideoRef.current;
        const canvas = selfieCanvasRef.current;
        const context = canvas.getContext('2d');

        // Ensure video and canvas are available
        if (!video || !canvas) {
            console.error("Selfie Video or canvas element not found.");
            return;
        }

        // Draw video frame onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        setInputs({ ...inputs, c_selfiePhoto: dataURL });
        stopSelfieCamera();
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:5000/auth/cust-register",
                {
                    method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						c_name,
						c_phone,
						c_password,
						c_frontNID,
                        c_backNID,
                        c_selfiePhoto
					}),
                }
            );

            const data = await response.json();
            
            if(response.ok) {
                console.log(data);
                handleClose();
            } else {
                console.error("Registration faild: ",data);
            }

        } catch (error) {
            console.error("Error registering customer: ", error.message);
        }
    };

    return (
        <Fragment>
            <div className="container-fluid align-item-center justify-content-center">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h1 className="mt-3 text-center">Register</h1>
                        <form onSubmit={onSubmitForm}>
                            <div className="mb-3">
                                <label htmlFor="c_name" className="form-label">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    name="c_name"
                                    id="c_name"
                                    placeholder="Customer Name"
                                    onChange={e => onChange(e)}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="c_phone" className="form-label">
                                    Phone Number
                                </label>
                                <input
                                    type="phone"
                                    name="c_phone"
                                    id="c_phone"
                                    placeholder="Phone Number"
                                    onChange={e => onChange(e)}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="c_password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="c_password"
                                    id="c_password"
                                    placeholder="Password"
                                    onChange={e => onChange(e)}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="c_frontNID" className="form-label">
                                    Front NID Image
                                </label>
                                <div className="d-flex flex-column align-items-center">
                                    {c_frontNID && <img src={c_frontNID} alt="Front NID" className="img-fluid mt-3" />}
                                    {!frontCameraActive ? (
                                        <button className="btn btn-primary" onClick={startFrontCamera}>Take Front NID photo</button>
                                    ) : (
                                        <Fragment>
                                            <video ref={frontVideoRef} width="240" height="180" autoPlay></video>
                                            <canvas ref={frontCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
                                            <div className="d-flex flex-column align-items-center mt-3">
                                                <button className="btn btn-danger" onClick={stopFrontCamera}>Stop Camera</button>
                                                <button className="btn btn-primary mt-2" onClick={captureFrontPhoto}>Capture Front NID</button>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="c_backNID" className="form-label">
                                    Back NID Image
                                </label>
                                <div className="d-flex flex-column align-items-center">
                                    {c_backNID && <img src={c_backNID} alt="Back NID" className="img-fluid mt-3" />}
                                    {!backCameraActive ? (
                                        <button className="btn btn-primary" onClick={startBackCamera}>Take Back NID photo</button>
                                    ) : (
                                        <Fragment>
                                            <video ref={backVideoRef} width="240" height="180" autoPlay></video>
                                            <canvas ref={backCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
                                            <div className="d-flex flex-column align-items-center mt-3">
                                                <button className="btn btn-danger" onClick={stopBackCamera}>Stop Camera</button>
                                                <button className="btn btn-primary mt-2" onClick={captureBackPhoto}>Capture Back NID</button>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="c_selfiePhoto" className="form-label">
                                    Profile Photo
                                </label>
                                <div className="d-flex flex-column align-items-center">
                                    {c_selfiePhoto && <img src={c_selfiePhoto} alt="Selfie" className="img-fluid mt-3" />}
                                    {!selfieCameraActive ? (
                                        <button className="btn btn-primary" onClick={startSelfieCamera}>Take a profile photo</button>
                                    ) : (
                                        <Fragment>
                                            <video ref={selfieVideoRef} width="240" height="180" autoPlay></video>
                                            <canvas ref={selfieCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
                                            <div className="d-flex flex-column align-items-center mt-3">
                                                <button className="btn btn-danger" onClick={stopSelfieCamera}>Stop Camera</button>
                                                <button className="btn btn-primary mt-2" onClick={capturec_SelfiePhoto}>Capture Profile Photo</button>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block my-3">
                                Submit
                            </button>
                        </form>
                        <p className="text-center">Already have an account?</p>
                        <Link className="btn btn-success btn-block my-3" to="/cust-login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CustRegistration;