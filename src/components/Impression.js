import Printer from "./Printer";
import React, { useState, useEffect } from 'react';

/**
 * Component representing the informations of printers.
 * 
 * This component fetches data from a printers manager server and renders a list of printers and their features.
 * 
 * @returns {JSX.Element} The JSX element representing the Impression component.
 */
export default function Impression() {
  // State variable to store the list of features
  const [features, setFeatures] = useState([]);

  /**
   * Effect hook to fetch data from the printers manager server.
   */
  useEffect(() => {
    // Fetch data from the printers manager server
    fetch(process.env.REACT_APP_PRINTERS_MANAGER_IP + '/data', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_PRINTERS_MANAGER_TOKEN}`,
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => setFeatures(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Render the list of print features
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {/* Map through the list of features and render a Printer component for each */}
            {features.map((feature, index) => (
              <Printer
                key={index}
                name={feature.name}
                state={feature.state || "Unknown"}
                file={feature.file || "No file"}
                time_left={feature.time_left || "Unknown"}
              />))}
          </dl>
        </div>
      </div>
    </div>
  );
}
