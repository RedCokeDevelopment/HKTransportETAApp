import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { getLRTStationsByZone } from "../data/LRTStationData";

const LRTZone: React.FC = () => {
  const params = useParams<{ zone_id: string }>();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {params.zone_id
              ? params.zone_id + " 區 Zone " + params.zone_id
              : "LRT Zone"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {params.zone_id
                ? params.zone_id + " 區 Zone " + params.zone_id
                : "LRT Zone"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {params.zone_id ? (
          <IonList className="">
            {getLRTStationsByZone(params.zone_id).map((m: any) => (
              <IonItem key={m.id} routerLink={`/lrt/station/${m.id}`}>
                {m.chi} ({m.eng})
              </IonItem>
            ))}
          </IonList>
        ) : (
          "Zone not found!"
        )}
      </IonContent>
    </IonPage>
  );
};

export default LRTZone;
