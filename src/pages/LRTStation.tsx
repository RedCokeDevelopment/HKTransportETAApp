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
import { getLRTStation } from "../data/LRTStationData";

const LRTStation: React.FC = () => {
  const params = useParams<{ station_id: string }>();
  var [station, setStation] = useState<any>();
  var [stationEta, setStationEta] = useState<any>();

  useIonViewWillEnter(() => {
    setStation(getLRTStation(params.station_id) as any);
    updateEta(params.station_id);
    setInterval(() => updateEta(params.station_id), 15000);
  });

  function updateEta(station_id: string) {
    fetch(
      "https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id=" +
        station_id
    )
      .then((res) => res.json())
      .then((res) => setStationEta(res));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {station ? station.chi + " " + station.eng : "LRT Station"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {station ? station.chi + " " + station.eng : "LRT Station"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {station && stationEta ? 
            stationEta.platform_list.map((x: any) => (
              <div
                key={`${x.platform_id}${x.time_en ? " " + x.time_en : ""}`}
              >
                <h4 style={{ font: "bold", margin: 0 }} className="ion-padding">{x.platform_id} 號月台<br/>Platform {x.platform_id}</h4>
                
                {x.end_service_status !== 1 ? (<IonList>
                  {x.route_list.map((y: any) => (
                    <IonItem key={y.route_no + "_" + y.time_en} style={{paddingBottom: "8px"}}>
                      <IonLabel>
                        [{y.train_length} 卡 Cart] {y.route_no}: {y.dest_ch}
                        <br />
                        {y.dest_en}
                      </IonLabel>
                      {y.time_en}
                    </IonItem>
                  ))}</IonList>
                ) : (
                  <p>No ETA Available</p>
                )}
                
              </div>
            )) : (
          <div>Loading...</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LRTStation;
