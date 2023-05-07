import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import Spreadsheet from "../../../../components/spreadsheet";

const Accomplished = () => {
    return (
        <Container>
            <Row>
                <h1>Planejado</h1>
                <Spreadsheet/>
            </Row>
        </Container>
    );
};

export default Accomplished;
