import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const RaiseTicketForm = () => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
  });
  const navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!ticket.title || !ticket.description) {
      toast.error('Please fill all fields', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

      });
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.id) {
      toast.error("User not logged in", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const newTicket = {
      id: Date.now(),
      title: ticket.title,
      description: ticket.description,
      status: "Open",
      remarks: "",
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    // Store ticket in localStorage
    const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const updatedTickets = [...existingTickets, newTicket];
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    toast.success('Ticket submitted successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
     onClose: () => navigation('/dashboard')
    });

    // Reset form
    setTicket({ title: "", description: "" });
  };

  return (
    <>
      <ToastContainer />
      <Navbar/>
      <br/><br/><br/>
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Raise a Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={ticket.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter ticket title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={ticket.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Describe your issue..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </>
  );
};

export default RaiseTicketForm;