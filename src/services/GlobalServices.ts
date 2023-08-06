import DriverWaitXHR from "./DriverWaitXHR";
import GeoHash from "./GeoHash";
import RideWs from "./RideWs";

export default {
  DriverPoll: new DriverWaitXHR({}),
  RideWs: new RideWs({}),
  GeoHash: new GeoHash()
} as const