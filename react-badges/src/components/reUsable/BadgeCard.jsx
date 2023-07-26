import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  CardMedia,
  CardHeader,
  Card,
  Button,
  Typography,
  IconButton,
  Avatar,
  Collapse,
  CardActions,
  CardContent
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { red, teal } from "@mui/material/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const BadgeCard = ({ created, title, photo, description, requirement, id }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();

  const RequirementItem = styled("div")(({ theme }) => ({
    backgroundColor: teal[50],
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: teal[100]
    },
    "& > p": {
      margin: 0
    }
  }));

  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              B
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={created}
        />
        <CardMedia component="img" height="194" image={photo} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/proposalform", { state: { badgeId: id } });
            }}
          >
            Assign Badge to Engineer
          </Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* {requirement &&
              requirement.map((item, index) => (
                <RequirementItem key={index}>
                  <Typography paragraph>{item.title}</Typography>
                  <Typography paragraph>{item.description}</Typography>
                </RequirementItem>
              ))} */}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default BadgeCard;
