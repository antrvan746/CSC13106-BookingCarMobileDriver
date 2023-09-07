const NEXT_SERVER_URL = 'http://10.0.2.2:3000';
export const GO_SERVER_URL = 'http://10.0.2.2:3080';

export function getDriverInfoEndpoint(driver_phone: string) {
  return `${NEXT_SERVER_URL}/api/drivers/${driver_phone}`;
}

export function getVehicleInforEndpoint(driver_id: string) {
  return `${NEXT_SERVER_URL}/api/vehicles/${driver_id}`;
}

export function createDriverEndpoint() {
  return `${NEXT_SERVER_URL}/api/drivers`;
}

export function createVehicleEnpoint() {
  return `${NEXT_SERVER_URL}/api/vehicles`;
}

export function sendLocationEndpoint(driver_data_id: string) {
  return `${GO_SERVER_URL}/loc/driver/${driver_data_id || "test_driver"}`;
}