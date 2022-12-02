const serverAddress = "http://localhost:3000";

const getData = async () => {
	const response = await fetch(`${serverAddress}/items`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	try {
		let jsonString = await response.json();
		return jsonString;
	}
	catch (e) {
		console.error("fetch failed", e);
		throw e;
	}
}

const addNewItem = async (formData) => {
	return await fetch(`${serverAddress}/items`, {
		method: 'POST',
		body: formData
	});
}

const deleteItem = async (itemId) => {
	const formData = new FormData();
    formData.append('itemId', itemId);


	return await fetch(`${serverAddress}/items`, {
		method: 'DELETE',
		body: formData
	});
}

module.exports = {
	getData,
	addNewItem,
	deleteItem
}

