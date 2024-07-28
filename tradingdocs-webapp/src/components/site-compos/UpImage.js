import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IntroDivider from "../UI-compos/IntroDivider";
const document = {
	_id: "66a52c0975f404719997a5f6",
	documentName: "Quản trị học",
	durability: true,
	lecturer: "Bùi Thị Ngân",
	category: {
		_id: "669c85331618f7d1287bc338",
		name: "Sách gốc",
		description: "Đây là sách nguyên bản, không phải sách photo",
	},
	userId: "669fd450a8f989ba3813295e",
	postType: {
		_id: "669c85331618f7d1287bc342",
		name: "Trao đổi",
	},
	price: 0,
	image: "https://res.cloudinary.com/dbfh15hki/image/upload/f_auto,q_auto/669fd450a8f989ba3813295eSun%20Jul%2028%202024%2000:19:02%20GMT%2B0700%20(Indochina%20Time)?_a=BAMADKTE0",
	description: "Mình muốn đổi sách quản trị nhân lực ạ",
	place: "Ou Nguyễn Kiệm",
	quantity: 1,
	createdAt: "2024-07-27T17:19:05.132Z",
	updatedAt: "2024-07-27T17:32:42.012Z",
	__v: 0,
	user: {
		_id: "669fd450a8f989ba3813295e",
		username: "DucNam",
		role: "NORMAL_USER",
	},
};

export default function UpdateImage() {
	const { image, documentName, description, postType, price, quantity } =
		document;
	return (
		<Card
			sx={{
				maxWidth: 345,
				mt: 15,
				boxShadow:
					"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
			}}
		>
			<CardMedia component="img" alt="green iguana" image={image} />

			<IntroDivider
				des={description}
				price={price}
				documentName={documentName}
				postType={postType.name}
				quantity={quantity}
			/>
		</Card>
	);
}
