import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTextarea,
  IonText,
  IonSpinner
} from '@ionic/react';
import {
  arrowForward,
  calendarOutline,
  call,
  chatbox,
  informationCircle,
  location,
  people,
  person
} from 'ionicons/icons';
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
      <IonContent fullscreen className="attendance-page">
        <div className="page-shell">
          <section className="brand-panel" aria-label="Dios el unico camino">
            <img className="church-logo" src="/logo.png" alt="Dios el unico camino" />
            <blockquote>
              “En todo lo que hagáis,<br />
              hacedlo de corazón,<br />
              como para el Señor<br />
              y no para los hombres.”
            </blockquote>
            <p className="verse-reference">Colosenses 3:23</p>
          </section>

          <section className="form-card">
            <div className="form-heading">
              <div className="heading-icon" aria-hidden="true">
                <IonIcon icon={calendarOutline} />
              </div>
              <div className="heading-copy">
                <span className="eyebrow">Ministerio de alumnos</span>
                <h1>Registro de asistencia</h1>
                <p>Completa tus datos para confirmar tu participación en la clase de hoy.</p>
              </div>
            </div>

            <div className="permission-box">
              <IonIcon icon={informationCircle} />
              <p>Para validar la asistencia presencial, al registrar se solicitará tu ubicación actual.</p>
            </div>

            <IonItem className="field-item">
              <IonIcon slot="start" icon={person} />
              <IonInput
                label="Nombre completo"
                labelPlacement="stacked"
                value={fullName}
                onIonInput={(event) => setFullName(event.detail.value ?? '')}
                placeholder="Nombre y apellido"
              />
            </IonItem>

            <IonItem className="field-item">
              <IonIcon slot="start" icon={people} />
              <IonInput
                label="Clase o grupo"
                labelPlacement="stacked"
                value={className}
                onIonInput={(event) => setClassName(event.detail.value ?? '')}
                placeholder="Ej. Jovenes, discipulado, escuela dominical"
              />
            </IonItem>

            <IonItem className="field-item">
              <IonIcon slot="start" icon={person} />
              <IonInput
                label="Lider o encargado"
                labelPlacement="stacked"
                value={leaderName}
                onIonInput={(event) => setLeaderName(event.detail.value ?? '')}
                placeholder="Nombre del encargado"
              />
            </IonItem>

            <IonItem className="field-item">
              <IonIcon slot="start" icon={call} />
              <IonInput
                label="Telefono"
                labelPlacement="stacked"
                value={phone}
                onIonInput={(event) => setPhone(event.detail.value ?? '')}
                placeholder="Numero de contacto"
                type="tel"
              />
            </IonItem>

            <IonItem className="field-item">
              <IonIcon slot="start" icon={chatbox} />
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
              {loading ? (
                <IonSpinner name="crescent" />
              ) : (
                <>
                  <IonIcon icon={location} />
                  <span>Registrar asistencia</span>
                  <IonIcon icon={arrowForward} />
                </>
              )}
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
