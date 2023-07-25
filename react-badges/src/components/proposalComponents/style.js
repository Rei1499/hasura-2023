import { makeStyles } from "@mui/styles";
import { isCellEnterEditModeKeys } from "@mui/x-data-grid/utils/keyboardUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    textAlign: "center",
    backgroundColor: theme.palette.primary.secondary
  },
  card: {
    width: 500,
    borderRadius: 16,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: theme.palette.primary.secondary
  },
  cardContent: {
    margin: theme.spacing(2),
    "& .MuiFormControl-root": {
      marginBottom: theme.spacing(2)
    }
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2)
  },
  formHelper: {
    textAlign: "center"
  },
  inputField: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

export default useStyles;
