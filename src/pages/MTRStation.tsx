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
import { useState } from "react";
import { useParams } from "react-router";
import { getMTRStation } from "../data/MTRStationData";

const MTRStation: React.FC = () => {
  const params = useParams<{ line_id: string, station_id: string }>();
  const station = getMTRStation(params.line_id, params.station_id)
  var [stationEta, setStationEta] = useState<any>();
  var [time, setTime] = useState<any>(Date.now());

  useIonViewWillEnter(() => {
    updateEta(params.line_id, params.station_id);
    setInterval(() => setTime(Date.now()), 1000);
    setInterval(() => updateEta(params.line_id, params.station_id), 15000);
  });

  function updateEta(line_id: string, station_id: string) {
    fetch(
      `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line_id}&sta=${station_id}`
    )
      .then((res) => res.json())
      .then((res) => setStationEta(res));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{station ? station.name : "Unknown MTR Station"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {station ? station.name : "Unknown MTR Station"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {station && stationEta ? (
          <>
            {stationEta.data[`${params.line_id}-${params.station_id}`].UP ? (
              <>
                <h4 style={{ font: "bold", margin: 0 }} className="ion-padding">
                  Upstream
                </h4>
                <IonList>
                  {stationEta.data[
                    `${params.line_id}-${params.station_id}`
                  ].UP.map((x: any) => (
                    <IonItem key={x.seq} style={{ paddingBottom: "8px" }}>
                      <IonLabel>
                        {x.seq}. {getMTRStation(params.line_id, x.dest)?.name}
                      </IonLabel>
                      {`${Math.round(
                        (Date.parse(x.time) - time) / 1000 / 60
                      )}m${Math.round(
                        ((Date.parse(x.time) - time) / 1000) % 60
                      )}s`}
                    </IonItem>
                  ))}
                </IonList>
              </>
            ) : undefined}
            {stationEta.data[`${params.line_id}-${params.station_id}`].DOWN ? (
              <>
                <h4 style={{ font: "bold", margin: 0 }} className="ion-padding">
                  Downstream
                </h4>
                <IonList>
                  {stationEta.data[
                    `${params.line_id}-${params.station_id}`
                  ].DOWN.map((x: any) => (
                    <IonItem key={x.seq} style={{ paddingBottom: "8px" }}>
                      <IonLabel>
                        {x.seq}. {getMTRStation(params.line_id, x.dest)?.name}
                      </IonLabel>
                      {`${Math.round(
                        (Date.parse(x.time) - time) / 1000 / 60
                      )}m${Math.round(
                        ((Date.parse(x.time) - time) / 1000) % 60
                      )}s`}
                    </IonItem>
                  ))}
                </IonList>
              </>
            ) : undefined}
          </>
        ) : (
          <div className="ion-padding">Loading...</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MTRStation;
