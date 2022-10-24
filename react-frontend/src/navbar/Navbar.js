import './Navbar.css';
import logo from'./logo.png';

import Searchbar from './Searchbar/Searchbar';
import Usermenu from './Usermenu/Usermenu';

function Navbar(){
    return (
        <div class="navbar">
            <img class='logo' src={logo}></img>
            <Searchbar/>
            <Usermenu/>
        </div>
    );
}

export default Navbar;