import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import DocumentCard from "./DocumentCard";

const imageArray = [
	{ id: 1, url: "https://via.placeholder.com/150" },
	{ id: 2, url: "https://via.placeholder.com/150" },
	{ id: 3, url: "https://via.placeholder.com/150" },
	{ id: 4, url: "https://via.placeholder.com/150" },
	{ id: 5, url: "https://via.placeholder.com/150" },
	{ id: 6, url: "https://via.placeholder.com/150" },
	{ id: 7, url: "https://via.placeholder.com/150" },
	{ id: 8, url: "https://via.placeholder.com/150" },
	{ id: 9, url: "https://via.placeholder.com/150" },
	{ id: 10, url: "https://via.placeholder.com/150" },
	{ id: 11, url: "https://via.placeholder.com/150" },
	// Thêm nhiều ảnh khác nếu cần
];

const SampleNextArrow = (props) => {
	const { onClick } = props;
	return (
		<IconButton
			onClick={onClick}
			sx={{
				backgroundColor: "rgba(255, 255, 255, 0.7)",
				position: "absolute",
				right: 0,
				top: "50%",
				transform: "translateY(-50%)",
				zIndex: 1,
				"&:hover": {
					backgroundColor: "rgba(255, 255, 255, 1)",
				},
				boxShadow:
					"rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
			}}
		>
			<ArrowForwardIos />
		</IconButton>
	);
};

const SamplePrevArrow = (props) => {
	const { onClick } = props;
	return (
		<IconButton
			onClick={onClick}
			sx={{
				backgroundColor: "rgba(255, 255, 255, 0.7)",
				position: "absolute",
				left: 0,
				top: "50%",
				transform: "translateY(-50%)",
				zIndex: 1,
				"&:hover": {
					backgroundColor: "rgba(255, 255, 255, 1)",
				},
				boxShadow:
					"rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
			}}
		>
			<ArrowBackIos />
		</IconButton>
	);
};

const CarouselCards = ({ items }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<Box
			sx={{
				width: "95%",
				margin: "0 auto",
				position: "relative",
				mt: 10,
				// boxShadow:
				// 	"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
				borderRadius: "7px",
				p: "5px",
			}}
		>
			<Slider {...settings}>
				{items.map((item, index) => {
					return <DocumentCard document={item} key={index} />;
				})}
			</Slider>
		</Box>
	);
};

export default CarouselCards;
