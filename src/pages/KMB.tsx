import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Geolocation } from "@capacitor/geolocation";

const KMB: React.FC = () => {
  var [stops, setStops] = useState<any>();
  var [loc, setLoc] = useState<any>();
  useEffect(()=>{
    Geolocation.getCurrentPosition({enableHighAccuracy: true}).then((loc: any)=>{setLoc(loc)})
    fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop").then(res=>res.json()).then(res=>setStops(res))
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>KMB</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">KMB</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
        {loc ? stops ? stops.data.filter((x: any)=>(x.lat <= loc.coords.latitude+0.004 && x.lat >= loc.coords.latitude-0.004
        && x.long <= loc.coords.longitude+0.004 && x.long >= loc.coords.longitude-0.004
        )).sort((a: any, b: any)=> {
          return Math.sqrt(((a.lat-loc.coords.latitude) ** 2) + ((a.long-loc.coords.longitude) ** 2)) - Math.sqrt(((b.lat-loc.coords.latitude) ** 2) + ((b.long-loc.coords.longitude) ** 2));
        }).map((obj: any)=> 
            <IonItem key={obj.stop} routerLink={"/kmb/"+obj.stop}>
              <IonLabel>{obj.name_tc} ({obj.name_en})</IonLabel>

            </IonItem>
        ) : "Loading..." : "Please enable location services"}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default KMB;
