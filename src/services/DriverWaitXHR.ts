export interface RideReq {
  "slon": number
  "slat": number
  "sadr": string

  "elon": number
  "elat": number
  "eadr": string

  "user_id": string
  "driver_id": string
  "trip_id": string

  "price": number,
  "user_name": string,
  "user_phone": string
}

interface Listeners {
  onrespond?: (msg: string) => void,
  onRideReq?: (req: RideReq) => boolean
}

class DriverWaitXHR {

  listeners: Listeners
  _my_red_loop: number | undefined | NodeJS.Timeout
  prevGeoHash = ""
  isRunning = false

  constructor(handlers: Listeners) {
    this.listeners = handlers;
    this._reqloop = this._reqloop.bind(this)
  }

  private async _reqloop(geoHash: string) {
    this.isRunning = true
    const res = await fetch(`http://10.0.2.2:3080/xhr/driver/${geoHash}`, {
      method: "GET",
    });
    if (res.status == 200) {

      try {
        const msg = await res.json() as RideReq;
        console.log("Get ride request: ", msg);
        this.listeners.onRideReq?.(msg)
      } catch { }

    }

    this._my_red_loop = setTimeout(() => { this._reqloop(geoHash) }, 5000);
  }

  public Connect(geoHash: string) {
    if (!this.isRunning) {
      this._reqloop(geoHash);
    } else if (this.prevGeoHash !== geoHash) {
      this.Close();
      this.prevGeoHash = geoHash;
      this._reqloop(geoHash);
    }
  }

  public Close() {
    if (this._my_red_loop) {
      clearTimeout(this._my_red_loop);
    }
    this.isRunning = false;
  }
}

export default DriverWaitXHR;