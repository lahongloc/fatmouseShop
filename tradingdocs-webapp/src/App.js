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
import DocumentDetail from "./components/site-compos/DocumentDetail";
import UpdateDocument from "./components/site-compos/UpdateDocument";
import OrderConfirmation from "./components/site-compos/OrderConfirmation";

export const UserContext = createContext();

const orderData = {
	_id: 27,
	documentName: "Hack não tiếng anh",
	durability: false,
	lecturer: "Tô Oai Hùng",
	category: 1,
	userId: 3,
	postType: {
		_id: 4,
		name: "Bán",
	},
	price: 300000,
	image: "https://res.cloudinary.com/dbfh15hki/image/upload/f_auto,q_auto/3Tue%20Jul%2016%202024%2023:22:53%20GMT%2B0700%20(Indochina%20Time)?_a=BAMADKTE0",
	description: "Mình mua 500k, pass lại 300k cho bạn nào cần 🥰",
	place: "A201 OU Võ Văn Tần",
	quantity: 0,
	createdAt: "2024-07-16T16:22:55.779Z",
	updatedAt: "2024-07-16T16:22:55.779Z",
	__v: 0,
	user: {
		_id: 3,
		username: "KimBang",
		role: "NORMAL_USER",
	},
};

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
						<>
							<Route
								path="/upload-documents"
								element={<UploadDocument />}
							/>
							<Route
								path="/update-document"
								element={<UpdateDocument />}
							/>
							<Route
								path="/order-confirmation"
								element={<OrderConfirmation />}
							/>
						</>
					)}
					<Route path="/up" element={<UploadForm {...orderData} />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/" element={<HomePage />} />
					<Route path="/post-detail" element={<DocumentDetail />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
