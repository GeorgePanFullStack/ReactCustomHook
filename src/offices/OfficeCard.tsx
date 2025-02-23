import { Link } from 'react-router';
import { Office } from './Office';
import { useCallback } from 'react';
import "./OfficeCard.css";

function formatDescription(description: string): string {
  return description.substring(0, 60) + '...';
}

interface OfficeCardProps {
  office: Office;
  onEdit: (office: Office) => void;
}

function OfficeCard(props: OfficeCardProps) {
  const { office, onEdit } = props;
  const handleEditClick = useCallback( (officeBeingEdited: Office) => {
        onEdit(officeBeingEdited); // replace with your own logic to update the office in the state or in your database.
        console.log('OfficeCard',officeBeingEdited);
      },[onEdit]);
  return (
    <div className="card">
      <img src={office.imageUrl} alt={office.name} className="cropped-image" />
      <section className="section dark">
      <Link to={'/offices/' + office.id}>
        <h5 className="strong">
          <strong>{office.name}</strong>
        </h5>
        <p>{formatDescription(office.description)}</p>
        <p>Revenue: {office.revenue.toLocaleString()}</p>
        <p>Is Head Office:  {office.isHeadOffice.toLocaleString()}</p>
      </Link>
        <button className=" bordered" onClick={() => handleEditClick(office)}>
            <span className="icon-edit "></span>
            Edit
        </button>
      </section>
    </div>
  );
}

export default OfficeCard;