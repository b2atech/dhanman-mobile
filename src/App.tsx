import React, {useEffect, useState} from 'react';
import {AuthProvider} from './context/AuthContext';
import {requestUserPermission, notificationListener} from './api/FCMService';
import FCMModal from './components/FCMModal';
import MainRoutes from './Routes/MainRoute';

interface NotificationData {
  title: string;
  body: string;
  guestId?: string;
}

const App: React.FC = () => {
  const [fcmToken, setFcmToken] = useState<string>('');
  const [notificationData, setNotificationData] =
    useState<NotificationData | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    requestUserPermission(setFcmToken);
    notificationListener((data: NotificationData) => {
      setNotificationData(data);
      setModalVisible(true);
    });
  }, []);

  return (
    <AuthProvider>
      <>
        <MainRoutes fcmToken={fcmToken} />
        {notificationData && (
          <FCMModal
            visible={modalVisible}
            title={notificationData.title}
            body={notificationData.body}
            guestId={notificationData.guestId}
            onClose={() => setModalVisible(false)}
          />
        )}
      </>
    </AuthProvider>
  );
};

export default App;
