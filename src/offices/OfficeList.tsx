import { useCallback, useState } from 'react';
import { Office } from './Office';
import OfficeCard from './OfficeCard';
import OfficeForm from './OfficeForm';

interface OfficeListProps {
  offices: Office[];
  onSave: (office: Office) => void;
}

function OfficeList ({ offices, onSave }: OfficeListProps) {
  const [officeBeingEdited, setOfficeBeingEdited] = useState({});
  // Using useCallback to memoize the event handler
  const handleEdit = useCallback( (office: Office) => {
  console.log('OfficeList',office);
    setOfficeBeingEdited(office);
  },[]);

  const cancelEditing =useCallback(  () => {
    setOfficeBeingEdited({});
  },[]);
  
  const items = offices.map(office => (
    <div key={office.id} className="cols-sm">
      {office === officeBeingEdited ? (
      <OfficeForm office={office} onSave={onSave} onCancel={cancelEditing}   />
      ) : (
      <OfficeCard office={office} onEdit={handleEdit} />
      )}
    </div>
  ));
  return <div className="row">{items}</div>;
}
export default OfficeList;