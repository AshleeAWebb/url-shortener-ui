export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then(response => {
      if (!response.ok) {
        throw new Error("Server is down");
      }
      return response.json();
    })
    .catch(error => {
      throw new Error("Please try again later");
    });
};