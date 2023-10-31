import React, { createContext, useContext, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { retrieveData, saveData } from '../utils/secureStorage';

// Create a context for trips
export const TripsContext = createContext();

// Define the initial state for trips
const initialState = {
  trips: [],
};

// Define actions for manipulating trips
const tripsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRIP':
      return { ...state, trips: [...state.trips, action.payload] };
    case 'UPDATE_TRIP':
      const updatedTrips = state.trips.map((trip) => {
        if (trip.id === action.payload.id) {
          return { ...trip, ...action.payload.updatedData };
        }
        return trip;
      });
      return { ...state, trips: updatedTrips };
    case 'DELETE_TRIP':
      const tripIdToDelete = action.payload.id;
      const updatedTripsAfterDelete = state.trips.filter((trip) => trip.id !== tripIdToDelete);
      return { ...state, trips: updatedTripsAfterDelete };
    default:
      return state;
  }
};



// TripsContext provider component
export const TripsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tripsReducer, initialState);

  // useEffect(() => {
  //   const savedData = retrieveData('user.trips');
  //   if (savedData) {
  //     // const parsedData = JSON.parse(savedData);
  //     // setSavedTrips(parsedData);
  //     console.log(savedData, "parsedData");
  //   } else {
  //     console.log('No data found in SecureStore');
  //   }
  // }, []);


  const addTrip = async (newTrip) => {
    // Create a new trip object with the input values

    // Dispatch an action to add the new trip to the state
    dispatch({ type: 'ADD_TRIP', payload: newTrip });

    // if (newTrip) {
    //   // Retrieve the existing trips from SecureStore
    //   const existingTrips = await retrieveData('user.trips') || { data: [] };

    //   // Add the new trip to the existing data
    //   existingTrips.data.push(newTrip);

    //   // Save the updated array back to SecureStore
    //   await saveData('user.trips', existingTrips);

    //   // Update your state with the entire array
    //   setSavedTrips(existingTrips);
    // }
  };


  const updateTrip = (tripId, updatedData) => {
    // Dispatch an action to update a trip
    dispatch({ type: 'UPDATE_TRIP', payload: { id: tripId, updatedData } });
  };
  const deleteTrip = (tripId) => {
    // Dispatch an action to update a trip
    dispatch({ type: 'DELETE_TRIP', payload: { id: tripId } });
  };

  return (
    <TripsContext.Provider value={{ state, dispatch, addTrip, updateTrip, deleteTrip }}>{children}</TripsContext.Provider>
  );
};
