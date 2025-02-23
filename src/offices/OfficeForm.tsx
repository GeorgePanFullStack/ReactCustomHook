import { Office } from "./Office";
import { SyntheticEvent, useState, ChangeEvent, useCallback } from "react";

interface OfficeFormProps {
  office: Office;  
  onSave: (office: Office) => void;
  onCancel: () => void;
}

type ValidationErrors = {
  name?: string;
  description?: string;
  revenue?: string;
};

function OfficeForm({ office: initialOffice, onSave, onCancel }: OfficeFormProps) {
  const [office, setOffice] = useState<Office>(initialOffice);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const isValid = useCallback(() =>{
    return Object.keys(errors).length === 0;
  },[errors]);
  
  const handleSubmit = useCallback(  (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(office);
    
  },[isValid,office, onSave]);

  const handleChange = useCallback( (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { type, name, value } = event.target;
    let updatedValue: string | number | boolean = value;
  
    if (event.target instanceof HTMLInputElement && type === "checkbox") {
      updatedValue = event.target.checked;
    }
  
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
  
    const change = { [name]: updatedValue };
  
    setOffice((prevOffice) => {
      const updatedOffice = new Office({ ...prevOffice, ...change }); // ✅ Fix: Create a new Office instance
      setErrors(validate(updatedOffice)); 
      return updatedOffice;
    });
  },[]);
  

  function validate(office: Office): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!office.name || office.name.trim().length === 0) {
      errors.name = "Name is required";
    } else if (office.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }

    if (!office.description || office.description.trim().length === 0) {
      errors.description = "Description is required.";
    }

    if (office.revenue <= 0) {
      errors.revenue = "Revenue must be more than $0.";
    }

    return errors;
  }

  

  // function isValid() {
    
  // }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      
      <label htmlFor="name">Office Name</label>
      <input type="text" name="name" placeholder="Enter name" value={office.name} onChange={handleChange} />
      {errors.name && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="description">Office Description</label>
      <textarea name="description" placeholder="Enter description" value={office.description} onChange={handleChange} />
      {errors.description && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor="revenue">Office Revenue</label>
      <input type="number" name="revenue" placeholder="Enter revenue" value={office.revenue} onChange={handleChange} />
      {errors.revenue && (
        <div className="card error">
          <p>{errors.revenue}</p>
        </div>
      )}

      <label htmlFor="isHeadOffice">Is Head Office?</label>
      <input type="checkbox" name="isHeadOffice" checked={office.isHeadOffice} onChange={handleChange} />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default OfficeForm;
