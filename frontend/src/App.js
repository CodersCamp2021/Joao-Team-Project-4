import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/Auth/RequireAuth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';
import MoviesTable from './components/MoviesManagement/MoviesManagement';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import MyAccount from './components/Auth/MyAccount';
import Layout from './components/Auth/Layout';
import Unauthorized from './components/Auth/Unauthorized';
import BuyTicket from './components/Tickets/BuyTicket';
import AdminPanel from './components/AdminPanel/AdminPanel';
import BookTicket from './components/Tickets/BookTicket';

export const ROLES = {
	Admin: 515,
	User: 200
};

import 'primereact/resources/themes/mdc-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/" element={<Navbar />} />

				<Route path="/" element={<Layout />}></Route>
				{/* {public routes} */}
				<Route path="/home" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/unauthorized" element={<Unauthorized />} />

				{/* {protected user routes} */}
				<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
					<Route path="/my-account" element={<MyAccount />} />
					<Route path="/buy-ticket" element={<BuyTicket />} />
					<Route path="/book-ticket" element={<BookTicket />} />
				</Route>
				{/* {protected admin routes} */}
				<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
					<Route path="/admin-panel" element={<AdminPanel />} />
					<Route path="/movies" element={<MoviesTable />} />
				</Route>

				{/* {catch all} */}

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
