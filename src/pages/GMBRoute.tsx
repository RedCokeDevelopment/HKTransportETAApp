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
import { getLRTStationsByZone } from "../data/LRTStationData";

const GMBRoute: React.FC = () => {
  const params = useParams<{ region: string, route_code: string }>();

  var [routes, setRoutes] = useState<any>();

  useIonViewWillEnter(() => {
    fetch(
      "https://data.etagmb.gov.hk/route/" +
        params.region + "/" + params.route_code
    )
      .then((res) => res.json())
      .then((res) => setRoutes(res));
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {params.region
              ? params.region + " " + params.route_code
              : "GMB Route"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {params.region
              ? params.region + " " + params.route_code
                : "GMB Route"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {routes ? (
          <IonList>
            {routes.data.map((m: any) => (<>
                {m.directions.map((n:any)=> <p>
              <IonItem key={m.route_id} routerLink={`/gmb/${params.region}/${m.route_id}/${n.route_seq}`}>
                <IonLabel>
                {m.description_tc}<br/>{m.description_en}<br/><br/>
                由 {n.orig_tc} 往 {n.dest_tc} <br/>From {n.orig_en} To {n.dest_en}
                </IonLabel>
              </IonItem>
                </p>)}
                </>
            ))}
          </IonList>
        ) : (
          "Route code not found!"
        )}
      </IonContent>
    </IonPage>
  );
};

export default GMBRoute;
