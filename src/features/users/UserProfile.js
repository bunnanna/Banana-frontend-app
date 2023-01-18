const UserProfile = ({user}) => {
    return ( <div className="user__profile">
        <section>
            {user.username}
            
        </section>
        <section>
            {user.skills}
        </section>
    </div> );
}
 
export default UserProfile;