import React, { useContext, useState } from 'react'
import { userDataContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import Card from '../Component/Card';
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { toast } from 'react-toastify';

import { bookingDataContext } from '../Context/BookingContext'; // <-- Make sure this is imported

function MyBooking() {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const { cancelBooking } = useContext(bookingDataContext);

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const openConfirmDialog = (bookingId) => {
    setSelectedBookingId(bookingId);
    setConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    cancelBooking(selectedBookingId);
    setConfirmModal(false);
    setSelectedBookingId(null);
  };

  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative px-[20px]'>
      <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center ' onClick={() => navigate("/")}>
        <FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' />
      </div>

      <div className='w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap'>MY BOOKING</div>

      <div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
        {userData.booking?.map((list) => (
          <div key={list._id} className='relative'>
            <Card
              title={list.title}
              landMark={list.landMark}
              city={list.city}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
              isBooked={list.isBooked}
              ratings={list.ratings}
              host={list.host}
            />
            <div className='w-full flex items-center justify-center mt-[10px]'>
              <button
                className='px-[20px] py-[8px] bg-[red] text-[white] rounded-lg text-[16px]'
                onClick={() => openConfirmDialog(list._id)}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Dialog Modal */}
      {confirmModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-[#000000a1] backdrop-blur-sm flex items-center justify-center z-[999]'>
          <div className='bg-white rounded-lg p-6 w-[90%] max-w-[400px] shadow-lg flex flex-col gap-4 items-center'>
            <h2 className='text-xl font-semibold text-[#333]'>Cancel Booking?</h2>
            <p className='text-gray-600 text-center'>Are you sure you want to cancel this booking? This action cannot be undone.</p>
            <div className='flex gap-4 mt-4'>
              <button
                className='bg-gray-300 text-black px-4 py-2 rounded-md'
                onClick={() => setConfirmModal(false)}
              >
                No
              </button>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded-md'
                onClick={handleConfirmCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBooking;
