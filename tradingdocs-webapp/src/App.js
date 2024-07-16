import { createContext, useReducer } from "react";
import cookie from "react-cookies";
import "./App.css";
import UserReducer from "./reducers/UserReducer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/userViews/SignIn";
import SignUp from "./components/userViews/SignUp";
import Header from "./commons/Header";
import { isNormalUser } from "./authorizations/roleAuths";
import UploadDocument from "./components/site-compos/UploadDocument";
import UploadForm from "./components/site-compos/UpImage";
import HomePage from "./components/site-compos/HomePage";

export const UserContext = createContext();

function App() {
	const [user, dispatch] = useReducer(
		UserReducer,
		cookie.load("user") || null,
	);

	return (
		<UserContext.Provider value={[user, dispatch]} className="App">
			<BrowserRouter>
				<Header />
				{/* <Routes>
					{isNormalUser(user) && (
						<Route
							path="/upload-documents"
							element={<UploadDocument />}
						/>
					)}
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes> */}
				<Routes>
					{!isNormalUser(user) && (
						<Route
							path="/upload-documents"
							element={
								<Navigate to="/sign-in/?next=upload-documents" />
							}
						/>
					)}
					{isNormalUser(user) && (
						<Route
							path="/upload-documents"
							element={<UploadDocument />}
						/>
					)}
					<Route path="/up" element={<UploadForm />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
