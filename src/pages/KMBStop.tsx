import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const KMBStop: React.FC = () => {
  var [stop, setStop] = useState<any>();
  var [station, setStation] = useState<any>();
  var [time, setTime] = useState<any>(Date.now());
  const params = useParams<{ station_id: string }>();

  useIonViewWillEnter(() => {
    fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop")
      .then((res) => res.json())
      .then((res) =>
        setStop(
          res.data.filter((obj: any) => obj.stop === params.station_id)[0]
        )
      );
    updateEta();
    setInterval(() => setTime(Date.now()), 1000);
    setInterval(() => updateEta(), 30000);
  });
  function updateEta() {
    fetch(
      "https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/" +
        params.station_id
    )
      .then((res) => res.json())
      .then((res) => setStation(res));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{stop ? stop.name_tc + " " + stop.name_en : "KMB Stop"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {stop ? stop.name_tc + " " + stop.name_en : "KMB Stop"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {station
            ? station.data.length === 0
              ? "Invalid Station/No Data"
              : station.data
                  .filter((obj: any) => obj.eta)
                  .map((obj: any) => (
                    <IonItem
                      key={
                        obj.co +
                        "_" +
                        obj.route +
                        "_" +
                        obj.dir +
                        "_" +
                        obj.seq +
                        "_" +
                        obj.eta_seq
                      }
                    >
                      <IonLabel>
                        {`[${obj.co}] ${obj.route}: ${obj.dest_tc}`}
                        <br />
                        {`${obj.dest_en}`}
                      </IonLabel>
                      {obj.eta ? (
                        `${Math.round(
                          (Date.parse(obj.eta) - time) / 1000
                        )} seconds`
                      ) : (
                        <>
                          {obj.route}: {obj.rmk_tc}
                          <br />
                          {obj.rmk_en}
                        </>
                      )}
                    </IonItem>
                  ))
            : "Loading..."}
          {/* {station ? JSON.stringify(station) : ""} */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default KMBStop;
