import OfficeList from "./OfficeList";
import { useOffices } from './officeHooks';
function OfficesPage() {
  const {
            offices,
            loading,
            error,
            setCurrentPage,
            saveOffice,
            saving,
            savingError,
          } = useOffices();
 
  return (
    <>
      <h1>Offices</h1>
      {saving && <span className="toast">Saving...</span>}

        {error && (
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        )}
        {savingError && (
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {savingError}
              </p>
            </section>
          </div>
        )}
         <OfficeList onSave={saveOffice} offices={offices} />
    </>
  );

}

export default OfficesPage;