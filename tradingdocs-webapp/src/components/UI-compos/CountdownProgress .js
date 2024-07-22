import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const CountdownProgress = () => {
	const [countdown, setCountdown] = useState(5);
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => {
				const newCountdown = prevCountdown - 1;
				if (newCountdown >= 0) {
					setProgress((newCountdown / 5) * 100);
				}
				return newCountdown;
			});
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		if (countdown < 0) {
			// Do something after countdown reaches 0, if needed
		}
	}, [countdown]);

	return (
		<Box
			position="relative"
			display="inline-flex"
			alignItems="center"
			justifyContent="center"
		>
			<CircularProgress
				variant="determinate"
				value={progress}
				size={15}
				thickness={2}
			/>
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Typography
					variant="caption"
					component="div"
					color="textSecondary"
					fontSize={20}
				>
					{countdown > 0 ? countdown : "0"}
				</Typography>
			</Box>
		</Box>
	);
};

export default CountdownProgress;
