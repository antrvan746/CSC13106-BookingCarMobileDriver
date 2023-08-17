
interface SocketListener {
  onOpen: (() => void),
  onMessage: ((e: WebSocketMessageEvent) => void),
  onError: ((e: WebSocketErrorEvent) => void),
  onClose: ((e: WebSocketCloseEvent) => void)
}

export interface DriverInfo {
  "slon": number,
  "slat": number,
  "sadr": string,

  "elon": number,
  "elat": number,
  "eadr": string,

  "user_id": string
}

interface RideWsConstrucProps {
  onOpen?: SocketListener["onOpen"]
  onMessage?: SocketListener["onMessage"]
  onError?: SocketListener["onError"]
  onClose?: SocketListener["onClose"],
  onDriverFound?: (info: DriverInfo) => void,

}

class RideWs {
  private ws: WebSocket | undefined
  readonly StatusMsg = {
    DriverFound: "DRF߷",
    NoDriver: "NDR߷",
    DriverCancel: "DCX߷",
    ClientCancel: "CCX߷",
    TripId: "TID߷",
    Message: "MSG߷",
  }
  public client_listeners: RideWsConstrucProps

  constructor(listeners: RideWsConstrucProps) {
    this.client_listeners = listeners;

    this._onWsOpen = this._onWsOpen.bind(this);
    this._onWsError = this._onWsError.bind(this);
    this._onWsClose = this._onWsClose.bind(this);
    this._onWsMessage = this._onWsMessage.bind(this);
  }

  public Connect(trip_id: string) {
    if (this.ws) {
      console.log("Already socket ");
      return
    }

    console.log("Creating websocket")
    this.ws = new WebSocket(`ws://10.0.2.2:3080/ws/driver/${trip_id}?driver_id=test_driver`, "ws");
    this.ws.onopen = this._onWsOpen;
    this.ws.onmessage = this._onWsMessage;
    this.ws.onerror = this._onWsError;
    this.ws.onclose = this._onWsClose;
  }

  private _onWsOpen() {
    console.log(this.client_listeners);
    console.log("Web socket open");
    this.client_listeners?.onOpen?.()
  }

  private _onWsMessage(e: WebSocketMessageEvent) {
    console.log("Web socket message: ", e.data);
    if (!e.data || typeof e.data !== "string") {
      return
    }
    const msg = e.data as string
    console.log("Web socket message: ", e.data);
    const cmd = msg.length <= 4 ? msg : msg.substring(0, 4)

    switch (cmd) {
      case this.StatusMsg.NoDriver:
        this.Close();
        break
      case this.StatusMsg.ClientCancel:
        this.Close();
        break
      case this.StatusMsg.DriverCancel:
        this.Close();
        break
      case this.StatusMsg.Message:
        console.log("Driver msg: ", e.data);
        break;
      case this.StatusMsg.DriverFound:
        try {
          const driver = JSON.parse(msg.substring(4))
          this.client_listeners?.onDriverFound?.(driver);
        } catch (e) {
          console.log(e)
        }
        break
      default:
        console.log("Unknow ws cmd:", cmd, msg)
    }

  }

  private _onWsError(e: WebSocketErrorEvent) {
    console.log("Web socket error: ", e.message);
    this.client_listeners?.onError?.(e)
  }

  private _onWsClose(e: WebSocketCloseEvent) {
    console.log(`Web socket closed. Code: ${e.code}. Reason: ${e.reason}`);
    this.client_listeners.onClose?.(e)
    this.Close();
  }

  public Close() {
    try {
      this.ws?.close();
    } catch (e) {
      console.log("Web socket closing error: ", e);
    }
    this.ws = undefined;
  }

  public Send(data: string | ArrayBuffer | ArrayBufferView | Blob) {
    try { this.ws?.send(data) } catch (e) {
      console.log("Web socket send error: ", e);
    }
  }

}

export default RideWs;