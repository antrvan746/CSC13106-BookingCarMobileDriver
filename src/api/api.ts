import { getDriverInfoEndpoint, getVehicleInforEndpoint, createDriverEndpoint, createVehicleEnpoint, sendLocationEndpoint } from './endpoints';

export async function getDriverInfo(driver_phone: string) {
  try {
    const response = await fetch(getDriverInfoEndpoint(driver_phone), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error('Server returned an error (getting driver info): ', responseData);
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error during getting driver info:', error);
    return null;
  }
}

export async function getVehicleInfo(driver_id: string) {
  try {
    const response = await fetch(getVehicleInforEndpoint(driver_id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error('Server returned an error (getting vehicle info): ', responseData);
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error during getting vehicle info:', error);
    return null;
  }
}

export async function createDriver(name: string, phone: string, email: string) {
  try {
    const response = await fetch(createDriverEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone: phone,
        email,
        password: "",
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error('Server returned an error (registering driver): ', responseData);
      return null;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error during registration:', error);
    return null;
  }
}

export async function createVehicle(driver_id: string, plate_number: string,
  model: string, color: string, type: string) {
  try {
    const response = await fetch(createVehicleEnpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        driver_id: driver_id,
        plate_number: plate_number,
        model: model,
        color: color,
        type: type,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      console.error('Server returned an error (create vehicle):', responseData);
    } else {
    }
  } catch (error) {
    console.error('Error during create vehicle', error);
  }
}

export async function updateDriverLocation(driverId: string | undefined, latitude: number, longitude: number) {
  try {
    const response = await fetch(sendLocationEndpoint(driverId || "test_driver"), {
      method: 'POST',
      headers: {
        Accept: '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lon: longitude,
        lat: latitude,
        g: 'w3gv',
      }),
    });

    if (!response.ok) {
      console.error('Server returned an error (updating driver location):', response);
    } else {
      console.log('Driver location updated successfully');
    }
  } catch (error) {
    console.error('Error during updating driver location', error);
  }
}
