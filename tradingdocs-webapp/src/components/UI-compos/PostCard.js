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
	const rootStyle = {
		width: "30%",
		margin: "1rem",
		marginBottom: 16,
	};

	const avatarStyle = {
		backgroundColor: "#1976d2",
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
				sx={{
					boxShadow:
						"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
				}}
				component="img"
				height="300"
				image={props.img}
				alt="Random image"
			/>

			<CardActions disableSpacing>
				<IconButton
					sx={{ textTransform: "uppercase" }}
					aria-label="add to favorites"
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

				<IconButton aria-label="comment">
					{/* {props.isNegotiable && (
						<Chip
							icon={<CheckCircleOutlineRoundedIcon />}
							label="Có thể trao đổi về địa điểm nhận tài liệu"
							// color="primary"
						/>
					)}
					{props.isNegotiable || (
						<Chip
							icon={<HighlightOffRoundedIcon />}
							label="Không thể trao đổi về địa điểm nhận tài liệu"
							// color="primary"
						/>
					)} */}
				</IconButton>
				{/* <IconButton aria-label="share">
					<ShareIcon />
				</IconButton> */}
			</CardActions>
			{/* <CardContent>
				<Typography variant="body2" color="textSecondary"></Typography>
				{props.isNegotiable && (
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="comment"
						label="Đề xuất địa điểm,.."
						name="comment"
					/>
				)} */}

			{/* <Button variant="contained" color="primary">
					Đăng ký
				</Button> */}
			{/* </CardContent> */}
		</Card>
	);
};

export default PostCard;
