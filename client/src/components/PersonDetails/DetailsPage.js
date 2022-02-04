import React from "react";
import { Link } from "react-router-dom";
import { styled } from "baseui";
import { Card, StyledBody } from 'baseui/card';
import { Button, SIZE } from 'baseui/button';
import { StyledLink } from "baseui/link";
import { Skeleton } from 'baseui/skeleton';
import { ArrowLeft } from 'baseui/icon';

import { Container } from "../container/container";


export const Centered = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px'
});


export const DetailsPage = ({ loading, data }) => {

    const renderBackButton = () => {
        return (<Centered>
            <Link to="/"> <Button kind="secondary" size={SIZE.large} startEnhancer={() => <ArrowLeft size={28} />} >Back</Button></Link>
        </Centered>)
    }
    if (loading) {
        return (<>
            <h1>Loading...</h1>
            <Centered>
                <Skeleton height="300px" width="600px" />
            </Centered>
            {renderBackButton()}
        </>)
    }
    return (
        <Container>
            <Centered>
                <Card overrides={{ Root: { style: { width: '600px' } } }} title={'Name: ' + data?.personDetail.name}>
                    <StyledBody>
                        <p> Height: {data?.personDetail?.height + ' meters'} </p>
                        <p>Gender: {data?.personDetail?.gender}</p>
                        <p>Mass: {data?.personDetail?.mass}</p>
                        <StyledLink target="_blank" href={data?.personDetail.homeworld}>HomeWorld</StyledLink>
                    </StyledBody>
                </Card>
            </Centered>
            {renderBackButton()}
        </Container>
    )
}
export default DetailsPage