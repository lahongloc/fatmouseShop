import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IntroDivider from "../UI-compos/IntroDivider";
import { useNavigate } from "react-router-dom";

export default function DocumentCard({ document }) {
	const { image, documentName, description, postType, price, quantity } =
		document;

	const navigate = useNavigate();

	const handleViewDetail = () => {
		navigate(`/post-detail/?postId=${document._id}`);
	};

	return (
		<Card
			sx={{
				maxWidth: 330,
				boxShadow:
					"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
				m: 1.5,
			}}
		>
			<CardMedia
				onClick={handleViewDetail}
				sx={{
					cursor: "pointer",
					borderTop: "1px solid rgba(27, 31, 35, 0.15)",
				}}
				component="img"
				height="300"
				image={image}
				alt="Random image"
			/>

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
