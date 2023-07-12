import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const QuestionTrigger = () =>{

    return (
        <Container>
        <Row>
          <Col md={4}>Question</Col>
          <Col md={4}>Answer</Col>
          <Col md={4}>ignore</Col>
        </Row>
      </Container>
    )
}
export default QuestionTrigger