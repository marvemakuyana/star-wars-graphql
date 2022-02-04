import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Search } from "baseui/icon";
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { StyledLink } from 'baseui/link';
import { Notification, KIND } from 'baseui/notification';
import { Input, SIZE as InputSize } from "baseui/input";
import { Pagination } from 'baseui/pagination';

import { ContentLoader } from '../contentLoader/contentLoader';
import { Centered } from "../PersonDetails/DetailsPage";
import { Container } from "../container/container";


const HomePage = ({ data, loading, page, setPage = () => { }, error, searchText, setSearchText = () => { } }) => {
    const getId = (index) => {
        return (10 * page) - 10 + (index + 1)
    }

    const renderContent = useMemo(() => {
        return data?.people?.results.map((person, index) => <FlexGridItem key={index}>
            <Card overrides={{ Root: { style: { width: '328px' } } }} title={person.name}>
                <StyledBody>Mass: {person.mass}</StyledBody>
                <StyledAction><Link to={`/${getId(index)}`}>
                    <StyledLink>View Details</StyledLink>
                </Link>
                </StyledAction>
            </Card>
        </FlexGridItem>)
    }, [data?.people?.results])

    return (
        <Container>
            <Centered>
                <Input
                    value={searchText}
                    onChange={({ target: { value } }) => setSearchText(value)}
                    startEnhancer={<Search size='18px' />}
                    placeholder='Search'
                    overrides={{ Root: { style: { width: "60%", marginTop: "10px", marginBottom: "10px" } } }}
                    size={InputSize.default} clearable clearOnEscape />
            </Centered>
            {error && <Notification overrides={{ Body: { style: { width: 'auto' } } }} kind={KIND.negative} closeable>
                {() => error?.message || 'Something went wrong!'}
            </Notification>}
            {loading && <>
                <h1>Loading...</h1>
                <ContentLoader contentLength={9} />
            </>
            }

            {!loading && <FlexGrid
                flexGridColumnCount={[1, 1, 2, 4]}
                $style={() => ({
                    margin: '1rem'
                })}
                flexGridColumnGap='scale800'
                flexGridRowGap='scale800'>
                {renderContent}
            </FlexGrid>}
            <Pagination
                numPages={Math.ceil((data?.people?.count || 82 / 10))}
                currentPage={page}
                onPageChange={({ nextPage }) => {
                    setPage(
                        Math.min(Math.max(nextPage, 1), data?.people?.count || 0)
                    )
                }} />
        </Container>
    )
}
export default HomePage