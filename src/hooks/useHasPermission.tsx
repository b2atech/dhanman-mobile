import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useGetAllPermission,
  useGetUserPermission,
} from '../api/commonApi/permission';
import {checkNetworkConnectivity} from '../utils/networkUtils';
import { IPermission, IUserPermission, PermissionHookReturn } from '../types/common';
import Logger from '../utils/logger';

const localStorageKey = 'permissionCache';

interface PermissionCache {
  [key: string]: any;
}

export const getPermissionCache = async (): Promise<PermissionCache> => {
  try {
    const cache = await AsyncStorage.getItem(localStorageKey);
    return cache ? JSON.parse(cache) : {};
  } catch (error) {
    Logger.error('Error retrieving permission cache', error);
    return {};
  }
};

export const setPermissionCache = async (cache: PermissionCache): Promise<void> => {
  try {
    await AsyncStorage.setItem(localStorageKey, JSON.stringify(cache));
  } catch (error) {
    Logger.error('Error saving permission cache', error);
  }
};

export const useHasPermission = (
  organizationId: string | undefined,
  userId: string | undefined,
  permission: string | number | undefined
): PermissionHookReturn => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [userPermissions, setUserPermissions] = useState<IUserPermission[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // Check network connectivity first
        const isConnected = await checkNetworkConnectivity();
        if (!isConnected) {
          Logger.error('No network connectivity available');
          return;
        }

        Logger.debug('Fetching permissions data...');
        const permissionsData = await useGetAllPermission();
        Logger.debug('Permissions data received', {
          count: permissionsData?.length || 0,
        });
        setPermissions(permissionsData || []);

        Logger.debug('Fetching user permissions', { organizationId, userId });
        const userPermissionsData = await useGetUserPermission(
          organizationId,
          userId,
        );
        Logger.debug('User permissions data received', {
          count: userPermissionsData?.length || 0,
        });
        setUserPermissions(userPermissionsData || []);
      } catch (error) {
        Logger.error('Error fetching permissions', error, {
          organizationId,
          userId,
        });
      }
    };

    if (organizationId && userId) {
      fetchData();
    } else {
      Logger.debug('Missing organizationId or userId, skipping permission fetch');
    }
  }, [organizationId, userId]);

  useEffect(() => {
    const checkPermission = async (): Promise<void> => {
      if (!permissions || !userPermissions || permission === undefined) {
        Logger.debug('Missing permissions or userPermissions data');
        setHasPermission(false);
        setLoading(false);
        return;
      }

      if (permissions.length === 0) {
        Logger.debug('No permissions data found');
      }

      if (userPermissions.length === 0) {
        Logger.debug('No user permissions data found');
      }

      const permissionEntity = permissions.find(
        (p: IPermission) => p.name === permission?.toString(),
      );

      if (!permissionEntity) {
        Logger.debug(`Permission ${permission} not found in permissions list`);
        setHasPermission(false);
        setLoading(false);
        return;
      }

      const permissionLookup: { [key: string]: string | undefined } = permissions.reduce(
        (lookup: { [key: string]: string | undefined }, p: IPermission) => {
          lookup[p.id] = p.parentPermissionId;
          return lookup;
        },
        {}
      );

      let currentPermissionId: string | undefined = permissionEntity.id;
      while (currentPermissionId) {
        if (userPermissions.some((p: IUserPermission) => p.permissionId === currentPermissionId)) {
          Logger.debug('Permission found', { permissionId: currentPermissionId });
          setHasPermission(true);
          setLoading(false);
          return;
        }
        currentPermissionId = permissionLookup[currentPermissionId];
      }

      Logger.debug('Permission not found for user');
      setHasPermission(false);
      setLoading(false);
    };

    checkPermission();
  }, [permissions, userPermissions, permission]);

  return {hasPermission, loading};
};
