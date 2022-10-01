import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const LRT: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>LRT</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">LRT</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {["1", "2", "3", "4", "5", "5A"].map(m => <IonItem key={m} routerLink={`/lrt/zone/${m}`}>
              {m} 區 (Zone {m})
          </IonItem>)}
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LRT;
