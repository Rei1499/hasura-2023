import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Box
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    width: "400px",
    margin: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold"
  },
  description: {
    marginTop: "8px",
    fontSize: "0.9rem"
  },
  evidence: {
    marginTop: "8px",
    fontSize: "0.9rem",
    color: "#666"
  },
  buttonsContainer: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between"
  }
});

const IssuingRequestCard = ({
  request,
  onApprove,
  onReject,
  onExpand,
  expanded
}) => {
  const classes = useStyles();
  return (
    <Box>
      <Card key={request.id} variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="div" className={classes.title}>
            Badge Title: {request.badge_title}
          </Typography>
          <Typography variant="body1">
            Engineer Name: {request.engineer_name}
          </Typography>
          <Typography variant="body1">
            Badge Version: {request.badge_version}
          </Typography>
          <Typography variant="body2" className={classes.description}>
            Badge Description:{" "}
            {expanded
              ? request.badge_description
              : `${request.badge_description.slice(0, 20)}...`}
          </Typography>

          {request.candidature_evidences &&
            Object.values(request.candidature_evidences).map(
              (evidence, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  className={classes.evidence}
                  paragraph
                >
                  Candidature evidence number {index + 1}:{" "}
                  {expanded || evidence.length <= 10
                    ? evidence
                    : `${evidence.slice(0, 10)}...`}
                </Typography>
              )
            )}

          {(request.badge_description.length > 100 ||
            Object.keys(request.candidature_evidences).length > 0) && (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => onExpand(request.id)}
            >
              {expanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </CardContent>
        <ButtonGroup
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            margin: "10px"
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onApprove(request.id)}
          >
            Approve
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => onReject(request.id)}
          >
            Reject
          </Button>
        </ButtonGroup>
      </Card>
    </Box>
  );
};

export default IssuingRequestCard;
