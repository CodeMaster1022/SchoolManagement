import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
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
import bgpic from "../../assets/designlogin.jpg";
import { registerUser } from "../redux/userRelated/userHandle";
import { LightPurpleButton } from "../../component/buttonStyles";
import styled from "styled-components";

const defaultTheme = createTheme();
const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (
      status === "success" ||
      (currentUser !== null && currentRole === "Admin")
    ) {
      toast.warning(`Successfully registered`, { autoClose: 2500 });
      navigate("/Admin/dashboard");
    } else if (status === "failed") {
      setLoader(false);
      toast.warning(`${response}`, { autoClose: 2500 });
    } else if (status === "error") {
      console.log(error);
    }
  }, [status, currentUser, response, error, currentRole, navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      schoolName: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter the email"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Not strong password"
        )
        .min(6, "Password must be more than 8 characters")
        .required("password required"),
      name: Yup.string()
        .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "Invalid name")
        .required("Name must be required"),
      schoolName: Yup.string()
        .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "Invalid Schoolname")
        .required("Schoolname must be required"),
    }),
    onSubmit: (values) => {
      setLoader(true);
      const role = "admin";
      dispatch(registerUser(values, role));
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
              Admin Register
            </Typography>
            <Typography variant="h7">
              Create your own school by registering as an admin.
              <br />
              You will be able to add students and faculty and manage the
              system.
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <TextField
                margin="normal"
                fullWidth
                type="text"
                id="name"
                label="Enter your name"
                name="name"
                onBlur={formik.onBlur}
                value={formik.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <Typography color="error">{formik.errors.name}</Typography>
              ) : null}
              <TextField
                margin="normal"
                fullWidth
                id="schoolName"
                type="text"
                label="Create your school name"
                name="schoolName"
                onBlur={formik.onBlur}
                value={formik.schoolName}
                onChange={formik.handleChange}
              />
              {formik.touched.schoolName && formik.errors.schoolName ? (
                <Typography color="error">
                  {formik.errors.schoolName}
                </Typography>
              ) : null}
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Enter your email"
                name="email"
                onBlur={formik.onBlur}
                value={formik.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <Typography color="error">{formik.errors.email}</Typography>
              ) : null}
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={toggle ? "text" : "password"}
                id="password"
                value={formik.password}
                onBlur={formik.onBlur}
                onChange={formik.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography color="error">{formik.errors.password}</Typography>
              ) : null}
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <LightPurpleButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <Typography>Register</Typography>
                )}
              </LightPurpleButton>
              <Grid container>
                <Grid>Already have an account?</Grid>
                <Grid item sx={{ ml: 2 }}>
                  <StyledLink to="/Adminlogin">Log in</StyledLink>
                </Grid>
              </Grid>
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
    </ThemeProvider>
  );
};

export default AdminRegisterPage;
const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
