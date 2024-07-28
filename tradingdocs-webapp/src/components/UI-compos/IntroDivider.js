import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import PriceDisplay from "./PriceDisplay";
import TextTruncateExpand from "./TextTruncateExpand";

export default function IntroDivider({ ...props }) {
	return (
		<Card variant="outlined" sx={{ maxWidth: 360 }}>
			<Box sx={{ p: 2 }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography
						sx={{ textTransform: "uppercase", fontWeight: 700 }}
						// gutterBottom
						variant="h7"
						component="div"
					>
						<TextTruncateExpand
							canExpand={false}
							sx={{ textTransform: "uppercase", fontWeight: 700 }}
							text={props.documentName}
						/>
					</Typography>
				</Stack>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ marginTop: 1 }}
				>
					<Typography
						sx={{
							display: "flex",
							alignItems: "center",
							// marginTop: 1,
						}}
						variant="h6"
						component="div"
					>
						<Chip
							sx={{ marginRight: 0.75 }}
							color="primary"
							label={props.postType}
							size="small"
						/>
						<PriceDisplay price={props.price} />
					</Typography>
					<Typography
						sx={{
							fontSize: "15px",
							color: "red",
						}}
					>
						Còn {props.quantity}
					</Typography>
				</Stack>

				{/* <Typography color="text.secondary" variant="body2">
					<TextTruncateExpand text={props.des} />
				</Typography> */}
			</Box>
			{/* <Divider />
			<Box sx={{ p: 2 }}>
				<Typography gutterBottom variant="body2">
					Select type
				</Typography>
				<Stack direction="row" spacing={1}>
					<Chip label="Medium" size="small" />
					<Chip label="Hard" size="small" />
				</Stack>
			</Box> */}
		</Card>
	);
}
