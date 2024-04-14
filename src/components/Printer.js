import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

/**
 * Component that represents a printer.
 * 
 * @param {Object} props - Properties passed to the Printer component.
 * @param {string} props.id - The ID of the printer.
 * @param {string} props.name - The name of the printer.
 * @param {string} props.status - The status of the printer.
 * @param {string} props.file - The name of the file being printed.
 * @param {string} props.time_left - The remaining time for the print job.
 */
export default function Printer(props) {
  /**
   * Handles printer actions such as start, pause, and stop.
   * 
   * @param {string} action - The action to perform (e.g., start, pause, stop).
   */
  const handleAction = (action) => {
    // Construct the URL for the action with the printer ID
    const url = `${process.env.REACT_APP_PRINTERS_MANAGER_IP}/${action}/${props.id}`;

    // Send a fetch request to the constructed URL
    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log(`${action} request sent successfully`);
        } else {
          console.error(`Failed to send ${action} request`);
        }
      })
      .catch(error => {
        console.error(`Error sending ${action} request:`, error);
      });
  };

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.name}
        </Typography>
        <Typography>
          Status : {props.status}
        </Typography>
        <Typography>
          File name : {props.file}
        </Typography>
        <Typography>
          Resting time : {props.time_left}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex w-max gap-4">
          <Button color="green" variant="filled" onClick={() => handleAction('start')}>Start/Resume</Button>
          <Button color="yellow" variant="filled" onClick={() => handleAction('pause')}>Pause</Button>
          <Button color="red" variant="filled" onClick={() => handleAction('stop')}>Stop</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
