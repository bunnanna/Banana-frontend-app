import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, ListGroup, ListGroupItem} from "react-bootstrap";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => (
  <Card className="mb-3">
    <Card.Header className="d-flex justify-content-between align-items-center">{user.username} <Link to={`/user/${user._id}/edit`}><FontAwesomeIcon icon={faFilePen}/></Link></Card.Header>
    <ListGroup horizontal="lg">
      <ListGroupItem>
            Roles:
            <ul>
              {user.roles.map(role => (
                <li key={role._id}>{role.rolename}</li>
              ))}
            </ul>


      </ListGroupItem>
      <ListGroupItem>


            Teams:
            <ul>
              {user.teams.map(team => (
                <li key={team._id}>{team.teamname}</li>
              ))}
            </ul>


      </ListGroupItem>
      <ListGroupItem>


            Skills:
            <ul>
              {user.skills.map(skill => (
                <li key={skill._id}>{skill.skillname}</li>
              ))}
            </ul>


      </ListGroupItem>
    </ListGroup>
  </Card>
);

export default UserCard;
