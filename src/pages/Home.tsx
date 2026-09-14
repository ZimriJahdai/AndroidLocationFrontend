import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonText,
  IonSpinner
} from '@ionic/react';
import { useState } from 'react';
import { createForm } from '../api/forms.api';
import { requestCurrentLocation } from '../services/location.service';
import './Home.css';

const Home: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setStatus('Solicitando ubicación...');

      const location = await requestCurrentLocation();

      setStatus('Enviando formulario...');

      const response = await createForm({
        fullName,
        phone,
        comment,
        location
      });

      setStatus(`Formulario enviado correctamente. ID: ${response.formId}`);
      setFullName('');
      setPhone('');
      setComment('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      setStatus(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro con ubicación</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="form-container">
          <h1>Formulario</h1>

          <p className="permission-text">
            Al enviar este formulario se solicitará tu ubicación para registrar desde dónde fue enviado.
          </p>

          <IonItem>
            <IonLabel position="stacked">Nombre completo</IonLabel>
            <IonInput
              value={fullName}
              onIonInput={(event) => setFullName(event.detail.value ?? '')}
              placeholder="Ingresa tu nombre"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Teléfono</IonLabel>
            <IonInput
              value={phone}
              onIonInput={(event) => setPhone(event.detail.value ?? '')}
              placeholder="Ingresa tu teléfono"
              type="tel"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Comentario</IonLabel>
            <IonTextarea
              value={comment}
              onIonInput={(event) => setComment(event.detail.value ?? '')}
              placeholder="Escribe un comentario"
              rows={4}
            />
          </IonItem>

          <IonButton
            expand="block"
            onClick={handleSubmit}
            disabled={loading || !fullName || !phone}
            className="submit-button"
          >
            {loading ? <IonSpinner name="crescent" /> : 'Enviar formulario'}
          </IonButton>

          {status && (
            <IonText>
              <p className="status-text">{status}</p>
            </IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;