import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav aria-label="Main Navigation">
            <div className={"nav-logo"}>
                <NavLink to="/">Dry Lettuce</NavLink>
            </div>

            <ul className="nav-links">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/team">Team</NavLink>
                </li>
                <li>
                    <NavLink to="/robot">Robot</NavLink>
                </li>
                <li>
                    <NavLink to="/achievements">Achievements</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
