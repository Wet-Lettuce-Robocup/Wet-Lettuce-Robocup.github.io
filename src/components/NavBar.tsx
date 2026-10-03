import { useState, useEffect, useRef } from 'react';
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css"

function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    // Toggle dropdown on click
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Escape') {
            setIsDropdownOpen(false);
        }
    };

    return (
        <nav aria-label="Main Navigation" className="navbar" onKeyDown={handleKeyDown}>
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
                <li className="dropdown-item" ref={dropdownRef}>
                    <button
                        className="dropdown-trigger"
                        onClick={toggleDropdown}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="menu"
                        aria-controls="documentation-menu"
                    >
                        Documentation <span className="arrow" aria-hidden="true">▼</span>
                    </button>

                    {/* Conditional Dropdown List */}
                    {isDropdownOpen && (
                        <ul id="documentation-menu" className="dropdown-menu" role="menu">
                            <li role="none"><a href="https://wet-lettuce-robocup.github.io/robocup-ros/robot_core/#" role="menuitem">Robot Core</a></li>
                            <li role="none"><a href="https://wet-lettuce-robocup.github.io/robocup-ros/robot_msgs/#" role="menuitem">Robot Messages</a></li>
                            <li role="none"><a href="https://wet-lettuce-robocup.github.io/robocup-ros/line_follow/#" role="menuitem">Line Follow</a></li>
                            <li role="none"><a href="https://wet-lettuce-robocup.github.io/robocup-ros/ml_rescue/#" role="menuitem">Rescue</a></li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
