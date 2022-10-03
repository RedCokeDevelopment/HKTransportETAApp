import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, IonVirtualScroll, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Geolocation } from "@capacitor/geolocation";
import { chevronDownCircleOutline } from 'ionicons/icons';

const KMB: React.FC = () => {
  var [stops, setStops] = useState<any>();
  var [loc, setLoc] = useState<any>();

function refreshStops(event: CustomEvent<RefresherEventDetail>) {
  Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(
    (loc: any) => {
      setLoc(loc);
      event.detail.complete();
    }
  );
}
useIonViewWillEnter(() => {
  Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(
    (loc: any) => {
      setLoc(loc);
    }
  );
  fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop")
    .then((res) => res.json())
    .then((res) => setStops(res));
}, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kowloon Motor Bus</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Kowloon Motor Bus</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher
          slot="fixed"
          onIonRefresh={refreshStops}
          style={{ zIndex: 10, backgroundColor: "#000000" }}
        >
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh position"
            refreshingSpinner="circles"
            refreshingText="Refreshing position..."
          ></IonRefresherContent>
        </IonRefresher>
        {/* <IonVirtualScroll class="ion-content-scroll-host"> */}
        <IonList>
          {loc ? (
            stops ? (
              stops.data
                .filter(
                  (x: any) =>
                    x.lat <= loc.coords.latitude + 0.004 &&
                    x.lat >= loc.coords.latitude - 0.004 &&
                    x.long <= loc.coords.longitude + 0.004 &&
                    x.long >= loc.coords.longitude - 0.004
                )
                .sort((a: any, b: any) => {
                  return (
                    Math.sqrt(
                      (a.lat - loc.coords.latitude) ** 2 +
                        (a.long - loc.coords.longitude) ** 2
                    ) -
                    Math.sqrt(
                      (b.lat - loc.coords.latitude) ** 2 +
                        (b.long - loc.coords.longitude) ** 2
                    )
                  );
                })
                .map((obj: any) => (
                  <IonItem key={obj.stop} routerLink={"/kmb/" + obj.stop}>
                    <IonLabel>
                      {obj.name_tc} ({obj.name_en})
                    </IonLabel>
                  </IonItem>
                ))
            ) : (
              <p className="ion-padding">Loading...</p>
            )
          ) : (
            <p className="ion-padding">
              Unable to obtain location, please pull down to refresh location.
              If this issue persists, enable location services for this app in
              your device settings.
            </p>
          )}
        </IonList>
        {/* </IonVirtualScroll> */}
      </IonContent>
    </IonPage>
  );
};

export default KMB;
