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

const GMBRegion: React.FC = () => {
  const params = useParams<{ region: string }>();

  var [routes, setRoutes] = useState<any>();

  useIonViewWillEnter(() => {
    fetch(
      "https://data.etagmb.gov.hk/route/" +
        params.region
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
              ? params.region === "KLN" ? "Kowloon" : params.region === "HKI" ? "Hong Kong Island" : "New Territories"
              : "GMB Region"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {params.region
              ? params.region === "KLN" ? "Kowloon" : params.region === "HKI" ? "Hong Kong Island" : "New Territories"
                : "GMB Region"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {routes ? (
          <IonList className="">
            {routes.data.routes.map((m: any) => (
              <IonItem key={m} routerLink={`/gmb/${params.region}/${m}`}>
                {m}
              </IonItem>
            ))}
          </IonList>
        ) : (
          "Region not found!"
        )}
      </IonContent>
    </IonPage>
  );
};

export default GMBRegion;
