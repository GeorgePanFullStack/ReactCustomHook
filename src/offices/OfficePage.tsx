import { useEffect, useState } from 'react';
import { officeAPI } from './officeAPI';
import OfficeDetail from './OfficeDetail';
import { Office } from './Office';
import { useParams } from 'react-router';

function OfficePage() {
  const [loading, setLoading] = useState(false);
  const [office, setOffice] = useState<Office | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    setLoading(true);
    officeAPI
      .find(id)
      .then((data) => {
        setOffice(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <>
        <h1>Office Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        <div className="row">
          {error && (
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          )}
        </div>

        {office && <OfficeDetail office={office} />}
      </>
    </div>
  );
}

export default OfficePage;