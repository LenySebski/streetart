import { createContext, useContext, useState } from 'react';
import useGeolocation from '../useGeolocation';

const LocationContext = createContext();
export function GeolocationProvider({ children }) {
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}

export function useAppContext() {
  return useContext(LocationContext);
}
