import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { getMTRStations } from '../data/MTRStationData';

const MTR: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mass Transit Railway</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mass Transit Railway</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {getMTRStations().map(m => <IonItem key={m.id} routerLink={`/mtr/${m.id}`}>
              {m.name}
          </IonItem>)}
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MTR;
