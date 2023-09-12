const NEXT_SERVER_URL = 'http://10.0.2.2:3080';
const GO_SERVER_URL = 'http://10.0.2.2:8080';

export function getDriverInfoEndpoint(driver_phone: string, id?: string) {
  const encodedPhone = encodeURIComponent(driver_phone)
  const url = `${NEXT_SERVER_URL}/api/drivers/${id || "No_id"}?phone=${encodedPhone}`;
  console.log(encodeURI(driver_phone))
  return encodeURI(url);
}

export function getVehicleInforEndpoint(driver_id: string) {
  return encodeURI(`${NEXT_SERVER_URL}/api/vehicles/${driver_id}`);
}

export function createDriverEndpoint() {
  return encodeURI(`${NEXT_SERVER_URL}/api/drivers`);
}

export function createVehicleEnpoint() {
  return encodeURI(`${NEXT_SERVER_URL}/api/vehicles`);
}

export function sendLocationEndpoint(driver_data_id: string) {
  return encodeURI(`${GO_SERVER_URL}/ridehail/geo/loc/driver/${driver_data_id || "test_driver"}`);
}