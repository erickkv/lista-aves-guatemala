import React from 'react';
import { IonContent, IonPage, IonButton, IonText, useIonRouter } from '@ionic/react';
import './Home.css';
import { RouteComponentProps, withRouter } from 'react-router';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const handleCargarClick = (): void => {
    history.push('/list');
  };

  return (
    <IonPage>
        <IonContent className="ion-content">
        <div className="ion-text-center ion-text-container">
          <IonText>
            <h1 style={{ fontSize: "5rem" }}>Inicio</h1>
          </IonText>
          <IonText>
            <h3>Erick Kiehnle van der Sluys Veer</h3>
            <h3>22004722</h3>
          </IonText>
          <IonButton expand="full" onClick={handleCargarClick}>
            Cargar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default withRouter(Home);
