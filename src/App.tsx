import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import KMB from './pages/KMB';
import MTR from './pages/MTR';
import LRT from './pages/LRT';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import KMBStop from './pages/KMBStop';
import LRTZone from './pages/LRTZone';
import LRTStation from './pages/LRTStation';
import GMB from './pages/GMB';
import GMBRegion from './pages/GMBRegion';
import GMBRouteETA from './pages/GMBRouteETA';
import GMBRoute from './pages/GMBRoute';
import MTRLine from './pages/MTRLine';
import MTRStation from './pages/MTRStation';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/kmb">
            <KMB />
          </Route>
          <Route exact path="/kmb/:stop_id">
            <KMBStop />
          </Route>
          <Route exact path="/mtr">
            <MTR />
          </Route>
          <Route exact path="/mtr/:line_id">
            <MTRLine />
          </Route>
          <Route exact path="/mtr/:line_id/:station_id">
            <MTRStation />
          </Route>
          <Route exact path="/lrt">
            <LRT />
          </Route>
          <Route exact path="/lrt/:zone_id">
            <LRTZone />
          </Route>
          <Route exact path="/lrt/:zone_id/:station_id">
            <LRTStation />
          </Route>
          <Route exact path="/gmb">
            <GMB />
          </Route>
          <Route exact path="/gmb/:region">
            <GMBRegion />
          </Route>
          <Route exact path="/gmb/:region/:route_code">
            <GMBRoute />
          </Route>
          <Route exact path="/gmb/:region/:route_id/:route_seq">
            <GMBRouteETA />
          </Route>
          <Route exact path="/">
            <Redirect to="/kmb" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="kmb" href="/kmb">
            <IonIcon icon={triangle} />
            <IonLabel>KMB</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="nextbus" href="/nextbus">
            <IonIcon icon={triangle} />
            <IonLabel>Next Bus</IonLabel>
          </IonTabButton>
          <IonTabButton tab="mtrbus" href="/mtrbus">
            <IonIcon icon={triangle} />
            <IonLabel>MTR Bus</IonLabel>
          </IonTabButton> */}
          <IonTabButton tab="mtr" href="/mtr">
            <IonIcon icon={ellipse} />
            <IonLabel>MTR</IonLabel>
          </IonTabButton>
          <IonTabButton tab="lrt" href="/lrt">
            <IonIcon icon={ellipse} />
            <IonLabel>LRT</IonLabel>
          </IonTabButton>
          <IonTabButton tab="gmb" href="/gmb">
            <IonIcon icon={square} />
            <IonLabel>GMB</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="ferry" href="/ferry">
            <IonIcon icon={square} />
            <IonLabel>Ferry</IonLabel>
          </IonTabButton> */}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
