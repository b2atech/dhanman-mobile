import React, {useState, useEffect} from 'react';
import IdComponent from '../../CommonFiles/IdComponent';
import {getAllServiceProviders} from '../../../api/myHome/serviceProvider';
import Logger from '../../../utils/logger';
import { ServiceProvider } from '../../../types/serviceProviders';
export default function GateServiceProviderScreen() {
  const [code, setCode] = useState('');
  const [items, setItems] = useState<ServiceProvider[]>([]);
  const [allItems, setAllItems] = useState<ServiceProvider[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchAllServiceProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllServiceProviders();
      setAllItems(response); // response is now ServiceProvider[]
    } catch (error) {
      Logger.error('Service Providers Error', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  fetchAllServiceProviders();
}, []);

  const handleCodeChange = (input:any) => {
    setCode(input);
    if (input.length > 0) {
      const filteredItems = allItems.filter(
        item => item.pin.toString() === input,
      );
      setItems(filteredItems);
    } else {
      setItems([]);
    }
  };

  const handlePushNotification = (item : any) => {
    alert(`Push Notification sent to ${item.firstName} ${item.lastName}`);
  };

  return (
    <IdComponent
      label="Add Unique Code"
      addNew="Service Provider"
      navigate={'CreateServiceProvider'}
      code={code}
      handleCodeChange={handleCodeChange}
      loading={loading}
      items={items}
      handlePushNotification={handlePushNotification}
      error={error}
      maxLength={6}
      emptyListMessage={'No items to display'}
      id={items[0]?.pin}
    />
  );
}
