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
import { exitCode } from "process";
import { useState } from "react";
import { useParams } from "react-router";

const GMBRouteETA: React.FC = () => {
  const params = useParams<{
    region: string;
    route_id: string;
    route_seq: string;
  }>();
  var [stopsEta, setStopsEta] = useState<any>();
  var [time, setTime] = useState<any>(Date.now());

  useIonViewWillEnter(() => {
    updateEta();
    setInterval(() => setTime(Date.now()), 1000);
    setInterval(() => updateEta(), 15000);
  });

  function updateEta() {
    fetch(
      "https://data.etagmb.gov.hk/route-stop/" +
        params.route_id +
        "/" +
        params.route_seq
    )
      .then((res) => res.json())
      .then(async (res) => {
        for (let index = 0; index < res.data.route_stops.length; index++) {
          const element = res.data.route_stops[index];
          res.data.route_stops[index].eta = (
            await fetch(
              "https://data.etagmb.gov.hk/eta/route-stop/" +
                params.route_id +
                "/" +
                params.route_seq +
                "/" +
                element.stop_seq
            ).then((res) => res.json())
          ).data.eta;
        }
        setStopsEta(res);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GMB Route Stops</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">GMB Route Stops</IonTitle>
          </IonToolbar>
        </IonHeader>
        {stopsEta ? (
          stopsEta.data.route_stops.map((x: any) => (
            <>
              <h4
                key={x.stop_seq}
                style={{ font: "bold", margin: 0 }}
                className="ion-padding"
              >
                {x.stop_seq}. {x.name_tc}
                <br />
                {x.name_en}
              </h4>

              {x.eta.length === 0 ? (
                <p>No ETA Available</p>
              ) : (
                <IonList>
                  {x.eta.map((eta: any) => (
                    <IonItem>
                      <IonLabel>{Math.abs(eta.diff) + ` stop${Math.abs(eta.diff)===1?"":"s"} ${eta.diff<0?"ahead":"behind"}`}</IonLabel>
                      {`${Math.round(
                        (Date.parse(eta.timestamp) - time) / 1000 / 60
                      )}m${Math.round(
                        ((Date.parse(eta.timestamp) - time) / 1000) % 60
                      )}s`}
                    </IonItem>
                  ))}
                </IonList>
              )}
            </>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GMBRouteETA;
