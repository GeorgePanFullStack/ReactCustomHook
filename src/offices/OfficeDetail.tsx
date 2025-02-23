import { Office } from './Office';

interface OfficeDetailProps {
  office: Office;
}
export default function OfficeDetail({ office }: OfficeDetailProps) {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          <img
            className="rounded"
            src={office.imageUrl}
            alt={office.name}
          />
          <section className="section dark">
            <h3 className="strong">
              <strong>{office.name}</strong>
            </h3>
            <p>{office.description}</p>
            <p>Revenue : {office.revenue}</p>

            <p>Opened: {office.officeOpenedOn.toLocaleDateString()}</p>
            <p>Head Office:
              <mark className="active">
                {' '}
                {office.isHeadOffice ? 'Yes' : 'No'}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}