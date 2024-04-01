import {LoadingButton} from "@mui/lab";
import {Alert, Box, Stack, Button, TextField} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import userApi from "../../api/modules/user.api";
import {setUser} from "../../redux/features/userSlice";
import {setAuthModalOpen} from "../../redux/features/authModalSlice";

const LoginForm = ({switchAuthState}) => {
    const dispatch = useDispatch();

    const [loginRequest, setLoginRequest] = useState(false);
    const [loginError, setLoginError] = useState();

    const loginForm = useFormik(({
        initialValues:{
            password: "",
            username: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, "Must be at least 8 characters")
                .required("Required"),
            password: Yup.string()
                .min(8, "Must be at least 8 characters")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            setLoginError(undefined);
            setLoginRequest(true);
            const {response, err} = await userApi.sign_in(values);
            setLoginRequest(false);

            if (response){
                loginForm.resetForm();
                dispatch(setUser(response));
                console.log(response);
                dispatch(setAuthModalOpen(false));
                toast.success("Login successful");
            }

            if (err) setLoginError(err.message);
        }
    }));


  return (
    <Box component="form" onSubmit={loginForm.handleSubmit}>
        <Stack spacing={3}>
            <TextField 
                type="text"
                placeholder="Username"
                name="username"
                fullWidth
                value={loginForm.values.username}
                onChange={loginForm.handleChange}
                color="success"
                error={loginForm.touched.username && loginForm.errors.username !== undefined}
                helperText={loginForm.touched.username && loginForm.errors.username}
            />
            <TextField 
                type="password"
                placeholder="password"
                name="password"
                fullWidth
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                color="success"
                error={loginForm.touched.password && loginForm.errors.password !== undefined}
                helperText={loginForm.touched.password && loginForm.errors.password}
            />
        </Stack>

        <LoadingButton
           type="submit"
           fullWidth
           variant="contained"
           size="large"
           sx={{ mt: 4 }}
           loading={loginRequest}
        >
            Login
        </LoadingButton>

        <Button
            fullWidth
            sx={{mt: 1}}
            onClick={switchAuthState}
        >
            Don't have an account ? Register
        </Button>
        {loginError && (
            <Box sx={{mt: 2}}>
                <Alert severity="error" variant="outlined">
                    {loginError}
                </Alert>
            </Box>
        )}
    </Box>
  );
};

export default LoginForm;