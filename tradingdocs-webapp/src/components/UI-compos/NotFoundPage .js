import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AnimatedBox = animated(Box);

const NotFoundPage = () => {
	const fadeProps = useSpring({
		from: { opacity: 0, transform: "translateY(-50px)" },
		to: { opacity: 1, transform: "translateY(0)" },
		config: { tension: 120, friction: 14 },
	});

	const iconProps = useSpring({
		loop: { reverse: true },
		from: { transform: "rotate(0deg)" },
		to: { transform: "rotate(20deg)" },
		config: { duration: 300 },
	});

	const buttonProps = useSpring({
		from: { opacity: 0, transform: "scale(0.8)" },
		to: { opacity: 1, transform: "scale(1)" },
		delay: 500,
		config: { tension: 200, friction: 12 },
	});

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				textAlign: "center",
				animation: `${fadeProps} 1s ease-in-out`,
			}}
		>
			<AnimatedBox style={iconProps}>
				<ErrorOutlineIcon
					sx={{ fontSize: 100, color: "primary.main", mb: 2 }}
				/>
			</AnimatedBox>
			<AnimatedBox style={fadeProps}>
				<Typography variant="h1" component="h1" gutterBottom>
					404
				</Typography>
				<Typography variant="h5" component="h2" gutterBottom>
					Page Not Found
				</Typography>
				<Typography variant="body1" gutterBottom>
					Sorry, the page you are looking for does not exist.
				</Typography>
			</AnimatedBox>
			<AnimatedBox style={buttonProps} mt={4}>
				<Button
					variant="contained"
					color="primary"
					component={Link}
					to="/"
				>
					Go to Homepage
				</Button>
			</AnimatedBox>
		</Container>
	);
};

export default NotFoundPage;
