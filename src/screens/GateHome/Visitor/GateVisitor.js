import React, {useState, useEffect} from 'react';
import IdComponent from '../../CommonFiles/IdComponent';
import {getVisitors} from '../../../api/myHome/visitors';

export default function GateVisitorsScreen() {
  const [contactNumber, setContactNumber] = useState('');
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllVisitors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getVisitors();
        setAllItems(response);
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllVisitors();
  }, []);

  const handleContactNumberChange = input => {
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
