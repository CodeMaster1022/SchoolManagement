import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { loginUser } from "./redux/userRelated/userHandle";
import * as Yup from "yup";
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from "../component/buttonStyles";
import styled from "styled-components";

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, response, currentUser, error, currentRole } = useSelector(
    (state) => state.user
  );
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        // navigate("/Admin/dashboard");
      }
      if (currentRole === "Student") {
        navigate("/Student/dashboard");
      }
      if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "failed") {
      toast.warning(`${response}`, { autoClose: 2500 });
      setLoader(false);
    } else if (status === "error") {
      toast.warning(`Network Error`, { autoClose: 2500 });
      setLoader(false);
    }
  }, [status, currentUser, response, error, currentRole, navigate]);

  const formik = useFormik({
    initialValues: {
      studentName: "",
      password: "",
      rollNum: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter the email"),
    }),
    onSubmit: (values) => {
      setLoader(true);
      if (role === "Admin") {
        const data = {
          email: values.email,
          password: values.password,
        };
        dispatch(loginUser(data, role));
      }
      if (role === "Student") {
        const data = {
          rollNum: values.rollNum,
          studentName: values.studentName,
          password: values.studentName,
        };
        console.log("Student");
        dispatch(loginUser(data, role));
      }
    },
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              {role} Login
            </Typography>
            <Typography variant="h7">
              Welcome back! Please enter your details
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              {role === "Student" ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="rollNum"
                    label="Enter your Roll Number"
                    name="rollNum"
                    type="number"
                    onBlur={formik.handleBlur}
                    value={formik.rollNum}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="studentName"
                    label="Enter your name"
                    name="studentName"
                    onBlur={formik.handleBlur}
                    value={formik.studentName}
                    onChange={formik.handleChange}
                  />
                </>
              ) : (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter your email"
                    name="email"
                    onBlur={formik.handleBlur}
                    value={formik.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Typography color="error">{formik.errors.email}</Typography>
                  ) : null}
                </>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? "text" : "password"}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                value={formik.password}
                onChange={formik.handleChange}
              />
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <StyledLink href="#">Forgot password?</StyledLink>
              </Grid>
              <LightPurpleButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                {loader ? <CircularProgress /> : <Typography>Login</Typography>}
              </LightPurpleButton>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
              >
                Login as Guest
              </Button>
              {role === "Admin" && (
                <Grid container>
                  <Grid>Don't have an account?</Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <StyledLink to="/Adminregister">Sign up</StyledLink>
                  </Grid>
                </Grid>
              )}
            </form>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgpic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={guestLoader}
      >
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop> */}
    </ThemeProvider>
  );
};
const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
export default LoginPage;
