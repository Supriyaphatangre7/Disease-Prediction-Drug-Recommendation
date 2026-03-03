import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contactus = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  //contact form main set krna data
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("contact", data);
        toast.success("Message Send successful!");
        setContact({
          username: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(
          response.data.extraDetails
            ? response.data.extraDetails.join(" ,")
            : response.data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mainContact flex justify-center flex-wrap gap-8 max-w-6xl mx-auto">
        {/* Contact Form Card */}
        <div className="bg-white flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
          <div className="left md:w-1/2">
            <img
              src="image/18.jpg"
              alt="contact image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="right p-8 md:w-1/2">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-signika mb-2 text-[#0F8E95] ">
                Get in Touch
              </h1>
              <p className="text-[#0F8E95] font-bold">
                Have questions or feedback? We would love to hear from you!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg border-b-2 border-[#0F8E95]  focus:border-[#0F8E95]  outline-none transition"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border-b-2 border-[#0F8E95]  focus:border-[#0F8E95]  outline-none transition"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="What would you like to tell us?"
                  className="w-full px-4 py-2 rounded-lg border-b-2 border-[#0F8E95]  focus:border-[#0F8E95]  outline-none transition"
                  value={contact.message}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-[#0F8E95]  hover:bg-[#0F8E95]  text-white font-medium rounded-lg transition duration-200 mt-4"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>

       
       
      </div>
    </div>
  );
};

export default Contactus;
