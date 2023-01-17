import useCurrentUser from "../hooks/useCurrentUser";

const Header = () => {
    const {username}=useCurrentUser()
    return ( 
        <header className="header__content">
            <div className="page__header">
                <span>Banana Job Card Apuri</span>
        <nav>
            <span>{username}</span>
            <button >1234</button>
            <button >1234</button>
        </nav> 
        
            </div>
        </header>   
     );
}
 
export default Header;