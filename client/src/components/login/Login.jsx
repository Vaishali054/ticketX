import Modal from "react-modal";
import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import "./login.css";

const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 550px;
  flex-shrink: 0;
  border-radius: 16.477px;
  background: #fff;
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.16);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 8px;
  display: block;
`;
export default function Login(props) {
  const styleName=props.styleName
  const navigate=useNavigate();
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  
    localStorage.setItem("user", JSON.stringify(formData))
          
    closeModal();
    setFormData({
      username: "",
      password: "",
    });
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const handleModalClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleModalClick);
    return () => {
      document.removeEventListener("mousedown", handleModalClick);
    };
  }, []);

  return (
    <div>
      <div className={styleName} onClick={openModal}>
        Login
      </div>

      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        ariaHideApp={false}
      >
        <ModalContent ref={modalRef}>
          <h2 className="form-heading">Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Mobile No.</label>
            <input
              type="text"
              placeholder="Enter your mobile number*"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password*"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="forgotPass">Forgot Password?</div>
            <div
              className="button login-button"
              onClick={handleSubmit}
              type="submit"
            >
              Login
            </div>
            <div className="new-account">Don't have an account yet? </div>
            <div className="forgotPass create-acc">Create an account</div>
          </form>
        </ModalContent>
      </CustomModal>
    </div>
  );
}
