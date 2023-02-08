import { CloseButton, Form, InputGroup, ListGroup } from "react-bootstrap";

const CheckList = ({prop}) => {
    const {input,index,onHandleCheckMark,onHandleChangeCheckLists,onHandleDeleteCheckLists}=prop

return( 
    <ListGroup.Item key={index} className="d-flex align-items-center" >
<InputGroup>
    <InputGroup.Checkbox 
    className="p-1 d-flex align-items-center justify-content-center"
    onChange={e=>onHandleCheckMark(e, input, index)}
    defaultChecked={input.check}
    readOnly
    />
    <Form.Control
        type="text"
        name="subtask"
        className="p-1"
        placeholder="Input CheckLists"
        defaultValue={input.subtask}
        
        onChange={event => onHandleChangeCheckLists(index, event)}
    />
    <CloseButton onClick={e => onHandleDeleteCheckLists(e, index)} />
    </InputGroup>
</ListGroup.Item>)
}
 
export default CheckList;