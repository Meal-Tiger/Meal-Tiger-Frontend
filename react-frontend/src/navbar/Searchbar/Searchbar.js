import 'material-symbols';
import './Searchbar.css';

function Searchbar(){
    return (
        <div class='formcontainer'>
            <form class='form'>
                <input class='input' type="text" placeholder="Search.."></input>
                <button class='button' type="submit"><span class="material-symbols-outlined">search</span></button>
            </form>
        </div>
        
    );
}

export default Searchbar;