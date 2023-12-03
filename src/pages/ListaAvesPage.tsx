import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import DataDisplay from '../components/DataDisplay';
import './ListaAvesPage.css';

const ListaAvesPage: React.FC = () => {
  const [recordings, setRecordings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://xeno-canto.org/api/2/recordings?query=cnt:guatemala');
        const data = await response.json();
        setRecordings(data.recordings || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.back()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Aves de Guatemala</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-content">
        {recordings.map((recording, index) => (
          <DataDisplay key={index} data={recording} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ListaAvesPage;
