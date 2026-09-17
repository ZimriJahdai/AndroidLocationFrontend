import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
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
  const [className, setClassName] = useState('');
  const [leaderName, setLeaderName] = useState('');
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
        className,
        leaderName,
        phone,
        comment,
        location
      });

      setStatus(`Asistencia registrada correctamente. ID: ${response.formId}`);
      setFullName('');
      setClassName('');
      setLeaderName('');
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
          <IonTitle>Registro de asistencia</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="attendance-page">
        <div className="form-container">
          <section className="brand-panel">
            <img className="church-logo" src="/logo.png" alt="Dios el unico camino" />
            <div>
              <span className="eyebrow">Ministerio de alumnos</span>
              <h1>Registro de asistencia</h1>
              <p>Completa tus datos para confirmar tu participacion en la clase de hoy.</p>
            </div>
          </section>

          <section className="form-card">
            <p className="permission-text">
              Para validar la asistencia presencial, al registrar se solicitará tu ubicación actual.
            </p>

            <IonItem>
              <IonInput
                label="Nombre completo"
                labelPlacement="stacked"
                value={fullName}
                onIonInput={(event) => setFullName(event.detail.value ?? '')}
                placeholder="Nombre y apellido"
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Clase o grupo"
                labelPlacement="stacked"
                value={className}
                onIonInput={(event) => setClassName(event.detail.value ?? '')}
                placeholder="Ej. Jovenes, discipulado, escuela dominical"
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Lider o encargado"
                labelPlacement="stacked"
                value={leaderName}
                onIonInput={(event) => setLeaderName(event.detail.value ?? '')}
                placeholder="Nombre del encargado"
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Telefono"
                labelPlacement="stacked"
                value={phone}
                onIonInput={(event) => setPhone(event.detail.value ?? '')}
                placeholder="Numero de contacto"
                type="tel"
              />
            </IonItem>

            <IonItem>
              <IonTextarea
                label="Observacion opcional"
                labelPlacement="stacked"
                value={comment}
                onIonInput={(event) => setComment(event.detail.value ?? '')}
                placeholder="Comentario, peticion o nota de asistencia"
                rows={4}
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={loading || !fullName || !className || !leaderName || !phone}
              className="submit-button"
            >
              {loading ? <IonSpinner name="crescent" /> : 'Registrar asistencia'}
            </IonButton>

            {status && (
              <IonText>
                <p className="status-text">{status}</p>
              </IonText>
            )}
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
