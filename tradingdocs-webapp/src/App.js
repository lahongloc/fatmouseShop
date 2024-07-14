import { createContext, useReducer } from "react";
import cookie from "react-cookies";
import "./App.css";
import UserReducer from "./reducers/UserReducer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/userViews/SignIn";
import SignUp from "./components/userViews/SignUp";
import Header from "./commons/header";

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
				<Routes>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
