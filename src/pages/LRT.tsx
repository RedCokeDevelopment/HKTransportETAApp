import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const LRT: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Light Rail Train</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Light Rail Train</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {["1", "2", "3", "4", "5", "5A"].map(m => <IonItem key={m} routerLink={`/lrt/${m}`}>
              {m} 區 (Zone {m})
          </IonItem>)}
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LRT;
