import React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	CardMedia,
	Avatar,
	IconButton,
	Typography,
	TextField,
	Button,
	Chip,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

import {
	MoreVert as MoreVertIcon,
	Favorite as FavoriteIcon,
	Comment as CommentIcon,
	Share as ShareIcon,
} from "@mui/icons-material";
import TextTruncateExpand from "./TextTruncateExpand";
import PriceDisplay from "./PriceDisplay";
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
	const date = new Date(dateString);
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true, // Use 12-hour clock (you can set it to false for 24-hour clock)
	};
	return new Intl.DateTimeFormat("en-US", options).format(date);
}
const PostCard = ({ ...props }) => {
	const navigate = useNavigate();
	const rootStyle = {
		width: "30%",
		margin: "1rem",
		marginBottom: 16,
	};

	const avatarStyle = {
		backgroundColor: "#1976d2",
	};

	const handleViewDetail = () => {
		navigate(`/post-detail/?postId=${props.postId}`);
	};

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
			style={rootStyle}
		>
			<CardHeader
				avatar={
					<Avatar aria-label="user" style={avatarStyle}>
						U
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={props.name}
				subheader={formatDate(props.time)}
			/>
			<CardContent sx={{ marginTop: -2 }}>
				<Typography variant="body1" color="textPrimary">
					<TextTruncateExpand text={props.des} />
					{/* {props.des} */}
				</Typography>
			</CardContent>
			<CardMedia
				onClick={handleViewDetail}
				sx={{
					cursor: "pointer",
					boxShadow:
						"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
				}}
				component="img"
				height="300"
				image={props.img}
				alt="Random image"
			/>

			<CardActions
				// sx={{
				// 	display: "flex",
				// 	justifyContent: "space-around",
				// 	alignItems: "center",
				// }}
				disableSpacing
			>
				<IconButton
					sx={{ textTransform: "uppercase", fontWeight: 700 }}
					variant="body1"
				>
					<Chip
						color="primary"
						variant="outlined"
						label={props.postType}
					/>
				</IconButton>
				<Typography variant="body1" color="textPrimary">
					<PriceDisplay price={props.price} />
					{/* {props.des} */}
				</Typography>

				{/* <IconButton aria-label="comment">
					<Chip label="Chi tiết" />
				</IconButton> */}
			</CardActions>
		</Card>
	);
};

export default PostCard;
