import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Paper,
  CssBaseline,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import classNames from "classnames";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import Auth from "@/context/AuthContext";

const LoginPage = () => {
  const { loginWithGoogle, loginWithFacebook } = Auth.useContainer();

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "admin.com" && password === "password") {
      router.push("/admin");
    } else if (username === "user.com" && password === "password") {
      router.push("/");
      window.localStorage.setItem("user-info", username);
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(() => {
        router.push("/");
      })
      .catch(() => {});
  };

  const handleLoginWithFacebook = () => {
    loginWithFacebook()
      .then(() => {
        router.push("/");
      })
      .catch(() => {});
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={6} className={classNames("p-6")}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tên đăng nhập"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  className: "text-black",
                }}
                InputLabelProps={{
                  className: "text-gray-700",
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  className: "text-black",
                }}
                InputLabelProps={{
                  className: "text-gray-700",
                }}
              />
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Đăng nhập
              </Button>

              <Divider sx={{ my: 2 }}>or</Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<EmailIcon />}
                sx={{ mb: 1 }}
                className="hover:bg-blue-600 hover:text-white"
                onClick={handleLoginWithGoogle}
              >
                Đăng nhập bằng Email
              </Button>

              {/* <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                className="hover:bg-blue-600 hover:text-white mb-2"
                onClick={handleLoginWithFacebook}
              >
                Đăng nhập bằng Facebook
              </Button> */}

              <Button
                fullWidth
                variant="contained"
                className="hover:bg-blue-600 hover:text-white mb-6"
                onClick={() => router.push("/")}
              >
                {"Dùng mà không đăng nhập !!!"}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Chưa có tài khoản? Đăng ký ngay"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
