import { Row, Col } from 'antd';


const StatsRow = (header, first, second, third) => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="statsRow">
      <Col className="gutter-row" span={11}>
        <div className="rowHeader">{header}</div>
      </Col>
      <Col className="gutter-row" span={4}>
        <div>{first}</div>
      </Col>
      <Col className="gutter-row" span={4}>
        <div>{second}</div>
      </Col>
      <Col className="gutter-row" span={4}>
        <div>{third}</div>
      </Col>
    </Row>
  );
}

export default StatsRow;