import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import WeeklySales from "../../../components/dashboards/default/WeeklySales";
import {marketShare, totalOrder, weather, weeklySalesData} from "../../../data/dashboard/default";
import TotalOrder from "../../../components/dashboards/default/TotalOrder";
import MarketShare from "../../../components/dashboards/default/MarketShare";
import Weather from "../../../components/dashboards/default/Weather";

const Cockpit = () => {
    return (
        <>
            <Row className="g-3 mb-3">
                <Col md={6} xxl={3}>
                    <WeeklySales data={weeklySalesData}/>
                </Col>
                <Col md={6} xxl={3}>
                    <TotalOrder data={totalOrder}/>
                </Col>
                <Col md={6} xxl={3}>
                    <MarketShare data={marketShare} radius={['100%', '87%']}/>
                </Col>
                <Col md={6} xxl={3}>
                    <Weather data={weather}/>
                </Col>
            </Row>
        </>
    );
};

export default Cockpit;
