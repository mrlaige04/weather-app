# Weather Dashboard

A simple weather dashboard application that allows users to check the weather by selecting a city from a form. The application fetches weather data using an external weather API, displaying information like temperature, weather condition, and more. The application uses an API key passed via the environment configuration.

## Features

- City-based weather lookup: Users can search for the weather in a specific city.
- Displays key weather data: Temperature, weather condition, and other relevant details.
- Responsive design: Accessible on both desktop and mobile devices.
- Error handling: Provides feedback if the city is not found or if any error occurs during data fetching.

## Tech Stack

- **Frontend**: Angular
- **API**: External weather API 
- **State Management**: Angular reactive forms
- **Services**: HTTP requests to fetch weather data
- **Styling**: SCSS (PrimeNG) 

## Setup and Installation

### Prerequisites

- Node.js (v20.x or later)
- Angular CLI (v18.x or later)

### Steps to Run the Project Locally

1. Clone this repository:

    ```bash
    git clone https://github.com/mrlaige04/weather-app.git
    cd weather-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the API key:
   
   - Obtain an API key from the chosen weather API provider (e.g., [Weather Api](http://api.weatherapi.com/v1)).
   - Add your API key in the environment configuration. Update the `src/environments/environment.ts` file with your API key:

    ```typescript
    export const environment = {
      api: {
         url: 'http://api.weatherapi.com/v1',
         key: '<API KEY HERE>'
      }
   };

    ```

4. Run the application:

    ```bash
    ng serve
    ```

5. Open your browser and visit `http://localhost:4200` to access the application.

## How to Use

1. **Search by City**: Enter the name of the city in the input field and press "Submit" to retrieve the weather information.
2. **Weather Details**: The weather information will be displayed, including the city name, current temperature (in Celsius and Fahrenheit), and weather conditions (e.g., clear, cloudy, rainy).
3. **Error Handling**: If the city is not found or there is an error in fetching data, an error message will be displayed.
