const UserProfile = ({ user }) => {
    return (
        <div className="user__profile">
            <div className="user__profile__col">
                <div className="user__profile__username">{user.username}</div>
                <div className="user__profile__active">Active: {user.active ? 'Yes' : 'No'}</div>
            </div>
            <div className="user__profile__col">
                <div className="user__profile__header">Roles:</div>
                <ul className="user__profile__list">
                    {user.roles.map(role => (
                        <li key={role._id} className="user__profile__item">{role.rolename}</li>
                    ))}
                </ul>
                <div className="user__profile__header">Teams:</div>
                <ul className="user__profile__list">
                    {user.teams.map(team => (
                        <li key={team._id} className="user__profile__item">{team.teamname}</li>
                    ))}
                </ul>
                <div className="user__profile__header">Skills:</div>
                <ul className="user__profile__list">
                    {user.skills.map(skill => (
                        <li key={skill._id} className="user__profile__item">{skill.skillname}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserProfile;