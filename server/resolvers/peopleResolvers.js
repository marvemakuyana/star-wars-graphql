const axios = require('axios');

const getPeople = async (_, args) => {
    const { searchText = "", page } = args;
    const url = searchText ? `people?search=${searchText.toLowerCase()}` : `people?page=${page || 1}`;
    const { data } = await axios.get(`https://swapi.dev/api/${url}`);
    return data

};

const getPersonalDetails = async (_, args) => {
    const { data } = await axios.get(`https://swapi.dev/api/people/${args.personId}`);
    return data
}

module.exports = { getPeople, getPersonalDetails }