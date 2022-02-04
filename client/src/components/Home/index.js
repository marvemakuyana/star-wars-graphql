import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useQuery, gql } from '@apollo/client';

import HomePage from "./HomePage";
import { showLoader } from '../../actions/actions';

export const GET_PEOPLE = gql`
query getPeople($page: Int, $searchText: String!) {
    people(page: $page, searchText: $searchText) {
        count
        results {
            name
            height
            homeworld
            mass
        }
    }
} 
`

const PeopleList = () => {
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const { data, loading, error } = useQuery(GET_PEOPLE, {
        variables: {
            page,
            searchText: searchText.trim().length ? searchText.trim() : "",
        }
    })

    useEffect(() => {
        dispatch(showLoader(loading));
    }, [loading])

    return (
        <HomePage
            data={data}
            loading={loading}
            page={page}
            setPage={setPage}
            error={error}
            searchText={searchText}
            setSearchText={setSearchText} />
    )
}

export default PeopleList