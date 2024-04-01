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

const RegistrationForm = ({switchAuthState}) => {
  const dispatch = useDispatch();

    const [loginRequest, setLoginRequest] = useState(false);
    const [loginError, setLoginError] = useState();

    const RegisterForm = useFormik(({
        initialValues:{
            password: "",
            username: "",
            displayName: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, "Must be at least 8 characters")
                .required("Required"),
            password: Yup.string()
                .min(8, "Must be at least 8 characters")
                .required("Required"),
            displayName: Yup.string()
                .min(8, "Must be at least 8 characters")
                .required("name required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .min(8, "Must be at least 8 characters")
                .required("Required"),    
        }),
        onSubmit: async (values) => {
            setLoginError(undefined);
            setLoginRequest(true);
            const {response, err} = await userApi.sign_up(values);
            setLoginRequest(false);

            if (response){
              RegisterForm.resetForm();
                dispatch(setUser(response.data));
                dispatch(setAuthModalOpen(false));
                toast.success("Login successful");
            }

            if (err) setLoginError(err.message);
        }
    }));


  return (
    <Box component="form" onSubmit={RegisterForm.handleSubmit}>
        <Stack spacing={3}>
            <TextField 
                type="text"
                placeholder="Username"
                name="username"
                fullWidth
                value={RegisterForm.values.username}
                onChange={RegisterForm.handleChange}
                color="success"
                error={RegisterForm.touched.username && RegisterForm.errors.username !== undefined}
                helperText={RegisterForm.touched.username && RegisterForm.errors.username}
            />
            <TextField 
                type="text"
                placeholder="display name"
                name="displayName"
                fullWidth
                value={RegisterForm.values.displayName}
                onChange={RegisterForm.handleChange}
                color="success"
                error={RegisterForm.touched.displayName && RegisterForm.errors.displayName !== undefined}
                helperText={RegisterForm.touched.displayName && RegisterForm.errors.displayName}
            />
            <TextField 
                type="password"
                placeholder="password"
                name="password"
                fullWidth
                value={RegisterForm.values.password}
                onChange={RegisterForm.handleChange}
                color="success"
                error={RegisterForm.touched.password && RegisterForm.errors.password !== undefined}
                helperText={RegisterForm.touched.password && RegisterForm.errors.password}
            />
            <TextField 
                type="password"
                placeholder="confirm password"
                name="confirmPassword"
                fullWidth
                value={RegisterForm.values.confirmPassword}
                onChange={RegisterForm.handleChange}
                color="success"
                error={RegisterForm.touched.confirmPassword && RegisterForm.errors.confirmPassword !== undefined}
                helperText={RegisterForm.touched.confirmPassword && RegisterForm.errors.confirmPassword}
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
            Register
        </LoadingButton>

        <Button
            fullWidth
            sx={{mt: 1}}
            onClick={switchAuthState}
        >
            Already have an account ? Login
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
export default RegistrationForm;