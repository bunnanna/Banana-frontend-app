import { CloseButton, Form, ListGroup } from "react-bootstrap";

const CheckList = ({prop}) => {
    const {input,index,onHandleChangeCheckLists,onHandleDeleteCheckLists}=prop
return( 
    <ListGroup.Item key={index} className="d-flex align-items-center">
    <Form.Check className="p-1 d-flex align-items-center justify-content-center"><Form.Check.Input checked={input.check} className="m-0" readOnly disabled/></Form.Check>
    <Form.Control
        type="text"
        name="subtask"
        className="p-1"
        placeholder="Input CheckLists"
        defaultValue={input.subtask}
        
        onChange={event => onHandleChangeCheckLists(index, event)}
    />
    <CloseButton onClick={e => onHandleDeleteCheckLists(e, index)} />
</ListGroup.Item>)
}
 
export default CheckList;