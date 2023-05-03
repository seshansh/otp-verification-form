import React, { useState, useRef } from 'react';
import './PhoneVerification.css';

function PhoneVerification() {
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const modalRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event, index) => {
    // Allow only numeric input
    const value = event.target.value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move focus to the next input box
    if (value.length === 1 && index < 5) {
      const nextInput = event.target.nextSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
    // Move focus to the previous input box
    if (value.length === 0 && index > 0) {
      const prevInput = event.target.previousSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (event) => {
    // Auto-fill input boxes when OTP is pasted from clipboard
    const pastedText = event.clipboardData.getData('text').replace(/[^0-9]/g, '');
    if (/^[0-9]{6}$/.test(pastedText)) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedText[i];
      }
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (event, index) => {
    // Navigate between input boxes with arrow keys
    if (event.key === 'ArrowRight' && index < 5) {
      const nextInput = event.target.nextSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = event.target.previousSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
    // Delete the previous input box and move focus to it
    if (event.key === 'Backspace' && index > 0 && !event.target.value) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      const prevInput = event.target.previousSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the OTP
    console.log(otp.join(''));
    handleClose();
    setOtp(['', '', '', '', '', '']);
  };

  const handleModalClick = (event) => {
    // Close modal if click is outside the modal content
    if (event.target === modalRef.current) {
      handleClose();
    }
  };

  return (
    <div className='main-container'>
      <p className='heading-para'>Phone Verification</p>
      <button className='verify-btn' onClick={handleShow}>Verify Phone</button>

      {show && (
        <center>
        <div className="modal" ref={modalRef} onClick={handleModalClick}>
            <span className="close" onClick={handleClose}>&times;</span>
          <div className="modal-content">
            <p className='message-para'>Enter the 6-digit code sent to your phone:</p>
            <form onSubmit={handleSubmit}>
              <div className="otp-input-container">
                {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <button className='submit-btn' type="submit">Verify Phone Number</button>
        </form>
      </div>
    </div>
    </center>
  )}
</div>
);
}

export default PhoneVerification;
