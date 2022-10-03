import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { getMTRLine } from "../data/MTRStationData";

const MTRLine: React.FC = () => {
  const params = useParams<{ line_id: string }>();
  const line = getMTRLine(params.line_id)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
              {line?line.name:"Unknown MTR Line"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {line?line.name:"Unknown MTR Line"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {line ? (
          <IonList className="">
            {line.stations.map((m: any) => (
              <IonItem key={m.id} routerLink={`/mtr/${params.line_id}/${m.id}`}>
                {m.name}
              </IonItem>
            ))}
          </IonList>
        ) : (
          "MTR Line not found!"
        )}
      </IonContent>
    </IonPage>
  );
};

export default MTRLine;
