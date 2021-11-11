const serverAddress = "http://localhost:3000";

const getData = async () => {
    const response = await fetch(`${serverAddress}/items`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return await response.json();
}

const addNewItem = async (formData) => {
    const response = await fetch(`${serverAddress}/items`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: formData // body data type must match "Content-Type" header
      });

      return await response.json();
}

module.exports = { getData, addNewItem }

