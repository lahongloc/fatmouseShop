import ProductDetail from "../UI-compos/ProductDetail";

const product = {
	_id: 26,
	documentName: "Sách tiếng Anh",
	durability: true,
	lecturer: "",
	category: 2,
	userId: 3,
	postType: {
		_id: 4,
		name: "Bán",
	},
	price: 250000,
	image: "https://res.cloudinary.com/dbfh15hki/image/upload/f_auto,q_auto/3Tue%20Jul%2016%202024%2022:03:32%20GMT%2B0700%20(Indochina%20Time)?_a=BAMADKTE0",
	description:
		"Sách này mình mới mua không sài, pass lại cho bạn nào cần :((",
	place: "OU nhà bè",
	quantity: 2,
	createdAt: "2024-07-16T15:03:34.475Z",
	updatedAt: "2024-07-16T15:03:34.475Z",
	user: {
		_id: 3,
		username: "KimBang",
		role: "NORMAL_USER",
	},
};

function UpImage() {
	return <ProductDetail product={product} />;
}

export default UpImage;
