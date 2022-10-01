import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const GMB: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Green Minibus</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Green Minibus</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {[{id: "KLN", name: "Kowloon"}, {id: "HKI", name: "Hong Kong Island"}, {id: "NT", name: "New Territories"}].map(m => <IonItem key={m.id} routerLink={`/gmb/${m.id}`}>
              {m.name}
          </IonItem>)}
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GMB;
