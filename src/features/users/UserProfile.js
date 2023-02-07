import React from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Accordion
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

const UserCard = ({ user }) => (
  <Card className="mb-3">
    <CardHeader>{user.username}</CardHeader>
    <ListGroup>
      <ListGroupItem>
        <Row>
          <Col as={Accordion}>
            Roles:
            <ul>
              {user.roles.map(role => (
                <li key={role._id}>{role.rolename}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Row>
          <Col>
            Teams:
            <ul>
              {user.teams.map(team => (
                <li key={team._id}>{team.teamname}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Row>
          <Col>
            Skills:
            <ul>
              {user.skills.map(skill => (
                <li key={skill._id}>{skill.skillname}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

export default UserCard;
