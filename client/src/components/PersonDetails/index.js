import React, { Suspense, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { showLoader } from "../../actions/actions";

export const GET_PERSON = gql`
query getPersonDetail($personId: Int) {
    personDetail(personId: $personId) {
        name
        height
        homeworld
        mass
        gender
    }
} `

const DetailsPage = React.lazy(() => import('./DetailsPage'))

const ViewPersonDetails = () => {
    const { personId } = useParams();
    const { data, loading, error } = useQuery(GET_PERSON, {
        variables: {
            personId: Number(personId)
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoader(loading))
    }, [loading])
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DetailsPage
                data={data}
                loading={loading}
                error={error}
            />
        </Suspense>
    )

}

export default ViewPersonDetails;