import React, {useState, useEffect} from 'react';
import Logger from '../../../utils/logger';
import IdComponent from '../../CommonFiles/IdComponent';
import {getVisitors} from '../../../api/myHome/visitors';
import { Visitor } from '../../../types/visitor';



export default function GateVisitorsScreen() {
  const [contactNumber, setContactNumber] = useState('');
  const [items, setItems] = useState<Visitor[]>([]);
  const [allItems, setAllItems] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllVisitors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getVisitors('');
        setAllItems(response);
      } catch (error) {
        Logger.error('Error fetching data', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllVisitors();
  }, []);

  const handleContactNumberChange = (input: string) => {
    setContactNumber(input);
    if (input.length === 10) {
      const filteredItems = allItems.filter(
        item => item.contactNumber === input,
      );
      setItems(filteredItems);
    } else {
      setItems([]);
    }
  };

  const handlePushNotification = async () => {};

  return (
    <IdComponent
      id={1}
      label="Add Contact number"
      addNew="Visitors"
      navigate={'CreateVisitors'}
      code={contactNumber}
      handleCodeChange={handleContactNumberChange}
      loading={loading}
      items={items}
      handlePushNotification={handlePushNotification}
      error={error}
      maxLength={10}
      emptyListMessage={'No items to display'}
    />
  );
}
