import React, { useEffect, useState } from 'react';
import { volumeHigh, pause, play } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface DataDisplayProps {
  data: {
    gen: string; //familia
    en: string; //nombre
    loc: string; //ubicacion
    rec: string; //descubridor
    file: string;
  };
  customClassName?: string; // Propiedad opcional para la clase CSS
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, customClassName }) => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleAudioLoad = () => {
      setIsLoading(false);
    };

    audio.addEventListener('loadeddata', handleAudioLoad);

    return () => {
      audio.removeEventListener('loadeddata', handleAudioLoad);
    };
  }, [audio]);

  const togglePlay = async () => {
    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoading(true);
      try {
        await audio.srcObject;
        audio.src = data.file;
        await audio.load();
        await audio.play();
      } catch (error) {
        console.error('Error loading audio:', error);
        setIsLoading(false);
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`DataDisplay ${customClassName || ''}`}>
      {isLoading ? (
        <div className="loadingMessage">Descargando...</div>
      ) : (
        <button className="playButton" onClick={togglePlay}>
          <IonIcon icon={isPlaying ? pause : play} />
          {isPlaying ? ' Pausar' : ' Reproducir'}
        </button>
      )}
      <h2>{data.gen}</h2>
      <p>Nombre: {data.en}</p>
      <p>Ubicación: {data.loc}</p>
      <p>Descubridor: {data.rec}</p>
    </div>
  );
};

export default DataDisplay;
