import { useState, useEffect } from 'react';
import { officeAPI } from './officeAPI';
import { Office } from './Office';

export function useOffices() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [saving, setSaving] = useState(false);
  const [savingError, setSavingError] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function loadOffices() {
      setLoading(true);
      try {
        const data = await officeAPI.get(currentPage);
        if (currentPage === 1) {
          setOffices(data);
        } else {
          setOffices((offices) => [...offices, ...data]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadOffices();
  }, [currentPage]);

  const saveOffice = (office: Office) => {
    setSaving(true);
    officeAPI
      .put(office)
      .then((updatedOffice) => {
        const updatedOffices = offices.map((p) => {
          return p.id === office.id ? new Office(updatedOffice) : p;
        });
        setOffices(updatedOffices);
      })
      .catch((e) => {
        setSavingError(e.message);
      })
      .finally(() => setSaving(false));
  };

  return {
    offices,
    loading,
    error,
    currentPage,
    setCurrentPage,
    saving,
    savingError,
    saveOffice,
  };
}