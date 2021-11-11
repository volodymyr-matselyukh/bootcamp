const serverAddress = "http://localhost:3000";

const getData = async () => {
    const response = await fetch(`${serverAddress}/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      try{
        let jsonString = await response.json();
        return JSON.parse(jsonString);
      }
      catch(e)
      {
        console.error("fetch failed", e);
        throw e;
      }
}

const addNewItem = async (formData) => {
    const response = await fetch(`${serverAddress}/items`, {
        method: 'POST',
        body: formData
      });

      return await response.json();
}

module.exports = { getData, addNewItem }

