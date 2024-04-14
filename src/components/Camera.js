import React, { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";

/**
 * Component representing a camera view.
 * 
 * This component displays a camera stream and updates the image object and current date at regular intervals.
 * 
 * @returns {JSX.Element} The JSX element representing the Camera component.
 */
export default function Camera() {
  // State variables for the image object and current date
  const [imageObject, setImageObject] = useState(null);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  /**
   * Function to get the current date and time.
   * 
   * @param {string} separator - The separator character for date components.
   * @returns {string} The formatted current date and time.
   */
  function getCurrentDate(separator = '/') {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hour = newDate.getHours();
    let min = newDate.getMinutes();

    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} ${hour}h${min}`;
  }

  /**
   * Effect hook to update the image object and current date at regular intervals.
   */
  useEffect(() => {
    // Set interval to update image object and current date
    const intervalId = setInterval(() => {
      // Fetch the image data with authentication token
      fetch(process.env.REACT_APP_PRINTERS_MANAGER_IP + '/camera', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_PRINTERS_MANAGER_TOKEN}`
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch camera stream');
          }
          return response.blob();
        })
        .then(blob => {
          const imgObject = new Image();
          imgObject.onload = () => URL.revokeObjectURL(imgObject.src); // Revoke URL after loading
          imgObject.src = URL.createObjectURL(blob);
          setImageObject(imgObject);
        })
        .catch(error => {
          console.error('Error fetching camera stream:', error);
        });

      // Update the current date and time
      setCurrentDate(getCurrentDate());
    }, parseInt(process.env.REACT_APP_INTERVAL_DURATION));

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Render the camera view
  return (
    <>
      <div className="mx-auto max-w-screen-md py-12">
        <Card className="mb-12 overflow-hidden">
          {/* Display the camera stream image */}
          {imageObject && (
            <img
              alt="camera stream"
              className="h-[32rem] w-full object-cover object-center"
              src={imageObject.src}
            />
          )}
        </Card>

        {/* Display the current date and time */}
        <h1>Time : {currentDate}</h1>
      </div>
    </>
  );
}
