export const getSender = (loggedUser:any, users:any) => {
    console.log("user", users)
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };