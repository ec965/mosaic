export const dateString = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
}

export const getUsername = () => {
  let username = localStorage.getItem('username');
  if (!username){
    username = sessionStorage.getItem('username');
  }
  return username;
}

export const getToken = () => {
  let token = localStorage.getItem('token');
  if (!token){
    token = sessionStorage.getItem('token');
  }

  return token;
}

