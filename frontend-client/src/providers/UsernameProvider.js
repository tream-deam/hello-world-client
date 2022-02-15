import { createContext, useState } from 'react';

export const userContext = createContext();


// We will need this for <Label> for videos as well as <AppointmentHeader>

function UsernameProvider(props) {
  //state logic here
  //userData being passed below are state variables or functions in the logic that we want to pass to any child components eg. const userData = {user, login, logout, auth}


  // return (
  //   <userContext.Provider value={userData}>
  //     {props.children}
  //   </userContext.Provider>
  // );
};

export default UsernameProvider;