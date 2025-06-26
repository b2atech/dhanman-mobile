import {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useGetAllPermission,
  useGetUserPermission,
} from '../api/commonApi/permission';
import {checkNetworkConnectivity} from '../utils/networkUtils';

const localStorageKey = 'permissionCache';

export const getPermissionCache = async () => {
  try {
    const cache = await AsyncStorage.getItem(localStorageKey);
    return cache ? JSON.parse(cache) : {};
  } catch (error) {
    console.error('Error retrieving permission cache:', error);
    return {};
  }
};

export const setPermissionCache = async cache => {
  try {
    await AsyncStorage.setItem(localStorageKey, JSON.stringify(cache));
  } catch (error) {
    console.error('Error saving permission cache:', error);
  }
};

export const useHasPermission = (organizationId, userId, permission) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check network connectivity first
        const isConnected = await checkNetworkConnectivity();
        if (!isConnected) {
          console.error('No network connectivity available');
          return;
        }

        console.log('Fetching permissions data...');
        const permissionsData = await useGetAllPermission();
        console.log(
          'Permissions data received:',
          permissionsData?.length || 0,
          'items',
        );
        setPermissions(permissionsData);

        console.log('Fetching user permissions for:', {organizationId, userId});
        const userPermissionsData = await useGetUserPermission(
          organizationId,
          userId,
        );
        console.log(
          'User permissions data received:',
          userPermissionsData?.length || 0,
          'items',
        );
        setUserPermissions(userPermissionsData);
      } catch (error) {
        console.error('Error fetching permissions:', {
          error: error.message,
          organizationId,
          userId,
          stack: error.stack,
        });
      }
    };

    if (organizationId && userId) {
      fetchData();
    } else {
      console.log(
        'Missing organizationId or userId, skipping permission fetch',
      );
    }
  }, [organizationId, userId]);

  if (!permissions || permissions.length === 0) {
    console.log('No permissions data found.');
  }

  if (!userPermissions || userPermissions.length === 0) {
    console.log('No user permissions data found.');
  }

  useEffect(() => {
    const checkPermission = async () => {
      if (!permissions || !userPermissions || permission === undefined) {
        console.log('Missing permissions or userPermissions data');
        setHasPermission(false);
        setLoading(false);
        return;
      }

      const permissionEntity = permissions.find(
        p => p.name === permission?.toString(),
      );
      if (!permissionEntity) {
        console.log(`Permission ${permission} not found in permissions list.`);
        setHasPermission(false);
        setLoading(false);
        return;
      }

      const permissionLookup = permissions.reduce((lookup, p) => {
        lookup[p.id] = p.parentPermissionId;
        return lookup;
      }, {});

      let currentPermissionId = permissionEntity.id;
      while (currentPermissionId) {
        if (userPermissions.some(p => p.permissionId === currentPermissionId)) {
          console.log('Permission found for :', currentPermissionId);
          setHasPermission(true);
          setLoading(false);
          return;
        }
        currentPermissionId = permissionLookup[currentPermissionId];
      }

      console.log('Permission not found for user');
      setHasPermission(false);
      setLoading(false);
    };

    checkPermission();
  }, [permissions, userPermissions, permission]);

  return {hasPermission, loading};
};
