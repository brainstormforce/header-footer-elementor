import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
	return (
		<nav className="flex items-center w-full p-4 mb-4 text-gray-700 bg-white rounded-lg shadow-lg">
			<NavLink to="/" className="flex items-center mr-6">
				<span className="text-2xl text-blue-600 dashicons dashicons-email"></span>
				<span className="ml-2 text-xl font-bold text-blue-600">SureEmails</span>
			</NavLink>
			<ul className="flex space-x-4 text-lg font-medium">
				<li>
					<NavLink
						to="/connections"
						className={({ isActive }) =>
							isActive
								? 'font-bold text-blue-600'
								: 'hover:text-blue-600 transition-colors duration-200'
						}
					>
						Connections
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/email-logs"
						className={({ isActive }) =>
							isActive
								? 'font-bold text-blue-600'
								: 'hover:text-blue-600 transition-colors duration-200'
						}
					>
						Email Logs
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/send-email"
						className={({ isActive }) =>
							isActive
								? 'font-bold text-blue-600'
								: 'hover:text-blue-600 transition-colors duration-200'
						}
					>
						Send Email
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/sure-triggers-settings"
						className={({ isActive }) =>
							isActive
								? 'font-bold text-blue-600'
								: 'hover:text-blue-600 transition-colors duration-200'
						}
					>
						SureTriggers Integrations
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/about-us"
						className={({ isActive }) =>
							isActive
								? 'font-bold text-blue-600'
								: 'hover:text-blue-600 transition-colors duration-200'
						}
					>
						About Us
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavMenu;
