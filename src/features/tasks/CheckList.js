import { CloseButton, Form, ListGroup } from "react-bootstrap";

const CheckList = ({prop}) => {
    const {input,index,onHandleCheckMark,onHandleChangeCheckLists,onHandleDeleteCheckLists}=prop
return( 
    <ListGroup.Item key={index} className="task__checklists__element">
    <Form.Check className="p-1" onChange={e => onHandleCheckMark(e, input, index)} checked={input.check} />
    <Form.Control
        type="text"
        name="subtask"
        className="p-1"
        placeholder="Input CheckLists"
        value={input.subtask}
        onChange={event => onHandleChangeCheckLists(index, event)}
    />
    <CloseButton onClick={e => onHandleDeleteCheckLists(e, index)} />
</ListGroup.Item>)
}
 
export default CheckList;