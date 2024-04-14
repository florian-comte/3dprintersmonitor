# 3D Printers Monitor
## Overview

The 3D Printers Monitor is a web application designed to monitor and manage multiple 3D printers remotely. It provides real-time status updates, camera feeds, and control functionalities for efficient management of printing processes.

## Features

- **Real-time status updates**: View the current status of each 3D printer, including printing progress, remaining time.
- **Camera feed**: Access global live camera streams from the printers manager.
- **Control functionality**: Pause, resume, or stop printing jobs remotely for each printer.
- **Emergency stop**: Trigger an emergency stop for all printers in case of critical issues.


## Prerequisites

Before using this app, ensure the following:

- **Printers management server**: You should have a server running where your printers are connected and managed. This server should provide the necessary endpoints for interacting with the printers.

    - **Camera streaming endpoint**: The printer management server should provide a global camera feed accessible via the /camera endpoint. This feed is used to stream live camera footage of the printing process.

    - **Emergency stop endpoint**: The printer management server should expose an /emergencystop endpoint. This endpoint is triggered when clicking on the emergency stop button in the application.

    - **Printers data endpoint**: The server should have a /data endpoint where detailed information about each printer is available (as a list). For each printer, the endpoint should provide:
        - id: The unique identifier of the printer.
        - name: The name of the printer.
        - status: The current status of the printer.
        - file: The name of the file being printed (if any).
        - time_left: The remaining time for the print job (if applicable).

    - **Printers control endpoint**: The server should have `/start/[id]`, `/stop/[id]`, `/pause/[id]` endpoints.

## Configuration (.env)
   - `REACT_APP_NAME`: The name of the application
   - `REACT_APP_PRINTERS_MANAGER_IP`: IP address or hostname of the printers manager server.
   - `REACT_APP_PRINTERS_MANAGER_TOKEN`: Authentication token for accessing the printers manager API.
   - `REACT_APP_INTERVAL_DURATION`: Interval duration (in milliseconds) for updating printer status and camera feeds.

