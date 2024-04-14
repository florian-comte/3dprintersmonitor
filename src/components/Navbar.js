import React from "react";
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
/**
 * Component representing a navigation bar.
 * 
 * This component displays a navigation bar with the application name, a list of navigation links,
 * and a button for emergency stop functionality.
 * 
 * @returns {JSX.Element} The JSX element representing the Navbar component.
 */
export default function Nav() {
  // Retrieve the application name from environment variables
  const APP_NAME = process.env.REACT_APP_NAME;

  // JSX element for the list of navigation links
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center" to="/">Printers</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center" to="/camera">Camera</Link>
      </Typography>
    </ul>
  );

  /**
   * Handles the emergency stop functionality.
   * 
   * Sends a POST request to the printers manager to trigger an emergency stop.
   */
  const handleEmergencyStop = () => {
    // Send a POST request to the printers manager for emergency stop
    fetch(process.env.PRINTERS_MANAGER_IP + '/emergencystop', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTERS_MANAGER_TOKEN}`,
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        // Check if the request was successful
        if (response.ok) {
          // Log success message to the console
          console.log('Emergency stop request sent successfully');
        } else {
          // Log error message to the console if the request fails
          console.error('Failed to send emergency stop request');
        }
      })
      // Log any errors that occur during the fetch request
      .catch(error => {
        console.error('Error sending emergency stop request:', error);
      });
  }


  // Render the navigation bar component
  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          {/* Display the application name */}
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            {APP_NAME}
          </Typography>
          <div className="flex items-center gap-4">
            {/* Display the list of navigation links */}
            <div className="mr-4 hidden lg:block">{navList}</div>
            {/* Button for emergency stop functionality */}
            <Button
              variant="filled"
              size="sm"
              className="hidden lg:inline-block bg-red-700"
              onClick={handleEmergencyStop}
            >
              EMERGENCY STOP
            </Button>
          </div>
        </div>
      </Navbar>
    </>
  );
}
