import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '/src/assets/images/logo.svg';
// import { updateEmail, updatePassword, onLoggedin } from '../actions';
// import axios from "axios";
import api from '/src/utils/axios';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '/src/hooks/useSnackbar';
export default function Login() {
  const params = useParams();
  console.log('par', params);
  const [isLoad, setIsLoad] = useState(true);
  // sample user login
  // user: gojo@kfc.com
  // pass: 3E08GXeWlCnOjxVL$
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const showSnack = useSnackbar();
  const business = useRef({});
  const setBusiness = v => (business.current = v); // Update to use current
  // const [error, setError] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 500);
    document.body.classList.remove('theme-cyan');
    document.body.classList.remove('theme-purple');
    document.body.classList.remove('theme-blue');
    document.body.classList.remove('theme-green');
    document.body.classList.remove('theme-orange');
    document.body.classList.remove('theme-blush');
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await validateEmail();
      await authorize();
      await createSession();
      await getAuthCode();
      await getAccessToken();
      // console.log(email, password);
    } catch (error) {
      console.error('Login error:', error);
      return;
    } finally {
      setIsLoading(false);
    }
    window.location.href = '/dashboard';
  };

  const authorize = async () => {
    const params = {
      client_id: business.current.oidcConfig.clientId,
      redirect_uri: 'http://localhost:3001/auth/success',
      response_type: 'code',
      scope: 'openid email profile offline_access urn:zitadel:iam:user:metadata',
      prompt: 'none',
      code_challenge: 'ZgGr01LXAw8mkgvlAUyRZVxC7kPCag7nk1dXUWAd2s4',
      code_challenge_method: 'S256',
    };

    // window.location.href = `${
    //   process.env.REACT_APP_API_URL
    // }/oauth/v2/authorize?${new URLSearchParams(params).toString()}`;
    try {
      const response = await api.get('/oauth/v2/authorize', {
        params,
      });
      console.log('Authorization response:', response.data);
      const authR = response.data.location?.split('=')[1];
      console.log('authR', authR);
      if (authR) {
        sessionStorage.setItem('authR', authR);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const createSession = async () => {
    try {
      const response = await api.post(
        '/v2/sessions',
        {
          checks: {
            user: {
              loginName: email,
            },
            password: {
              password: password,
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Session created:', response.data);
      sessionStorage.setItem('sessionId', response.data.sessionId);
      sessionStorage.setItem('sessionToken', response.data.sessionToken);
      // Handle successful login here (e.g., store token, redirect user)
    } catch (error) {
      console.error('Session creation error:', error.response.data);
      showSnack({ message: error.response.data.message });
      throw error;
      // Handle login error here
    }
  };

  const getAuthCode = async () => {
    const authR = sessionStorage.getItem('authR');
    const sessionId = sessionStorage.getItem('sessionId');
    const sessionToken = sessionStorage.getItem('sessionToken');

    try {
      const response = await api.post(
        `/v2/oidc/auth_requests/${authR}`,
        {
          session: {
            sessionId: sessionId,
            sessionToken: sessionToken,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('OIDC auth response:', response.data);
      const url = response.data.callbackUrl;
      const urlObj = new URL(url);

      const code = urlObj.searchParams.get('code');
      sessionStorage.setItem('authCode', code);
      // Handle successful OIDC auth here (e.g., redirect to callback URL)
    } catch (error) {
      console.error('OIDC auth error:', error);
      throw error;
      // Handle auth error here
    }
  };

  const appLogin = async ({ access_token, id_token, refresh_token }) => {
    try {
      const response = await api.post(
        '/v2/auth/login',
        // URL encoded data
        {
          id_token,
          refresh_token,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-client-id': business.current.oidcConfig.clientId,
            'x-zitadel-orgid': business.current.orgId,
            'x-zitadel-projectid': business.current.oidcConfig.project.id,
            'x-zitadel-appid': business.current.oidcConfig.application.id,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log('App login response:', response.data);
      // localStorage.setItem('token', response.data?.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data?.details));
      // Handle successful app login here
    } catch (error) {
      console.error('App login error:', error);
      throw error;
      // Handle login error here
    }
  };

  const getAccessToken = async () => {
    const authCode = sessionStorage.getItem('authCode');

    try {
      const response = await api.post('/oauth/v2/token', null, {
        params: {
          client_id: business.current.oidcConfig.clientId,
          code: authCode,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3001/auth/success',
          code_verifier:
            '_H8V3lOFeSqvTV_YMRotn0AMsGct8jSGEACi2krgh__w_gikPGOakHq9hWzCKAbhAw-3ZHrDVdwSRWgGhm0rBw',
        },
      });

      console.log('Token response:', response.data);
      // Store tokens in sessionStorage
      sessionStorage.setItem('accessToken', response.data.access_token);
      sessionStorage.setItem('refreshToken', response.data.refresh_token);

      // Redirect to success page or handle successful login
      // window.location.href = "/auth/success";
      await appLogin(response.data);
    } catch (error) {
      console.error('Token error:', error);
      showSnack({ message: error.response.data.message });
      throw error;
      // Handle token error
    }
  };

  const validateEmail = async () => {
    try {
      const response = await api.post('/v2/validate_business', {
        email: email,
      });
      console.log(response, 'ljlsf');
      setBusiness(response?.data);
      return response?.data;
    } catch (error) {
      console.error('Business validation error:', error);
      showSnack({ message: error.response.data.message });
      throw error;
    }
  };

  return (
    <div className="theme-cyan">
      <div className="page-loader-wrapper" style={{ display: isLoad ? 'block' : 'none' }}>
        <div className="loader">
          <div className="m-t-30">
            <img src={'/src/assets/images/logo.svg'} width="48" height="48" alt="Zuno" />
          </div>
          <p>Please wait...</p>
        </div>
      </div>
      <div className="hide-border">
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box">
              <div className="top">
                <img src={Logo} alt="Zuno" style={{ height: '40px', margin: '10px' }} />
              </div>
              <div className="card">
                <div className="header">
                  <p className="lead">Login to your account</p>
                </div>
                <div className="body">
                  <div className="form-auth-small" action="index.html">
                    <div className="form-group">
                      <label className="control-label sr-only">Email</label>
                      <input
                        className="form-control"
                        id="signin-email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={val => {
                          setEmail(val.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label sr-only">Password</label>
                      <input
                        className="form-control"
                        id="signin-password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={val => {
                          setPassword(val.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group clearfix">
                      <label className="fancy-checkbox element-left">
                        <input type="checkbox" />
                        <span>Remember me</span>
                      </label>
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      onClick={handleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </button>
                    <div className="bottom">
                      <span className="helper-text m-b-10">
                        <i className="fa fa-lock"></i>{' '}
                        <a href={`${import.meta.env.VITE_API_URL}/forgotpassword`}>
                          Forgot password?
                        </a>
                      </span>
                      <span>
                        Don't have an account? <a href="registration">Register</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Login.propTypes = {
//   updateEmail: PropTypes.func.isRequired,
//   updatePassword: PropTypes.func.isRequired,
//   email: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
// };

// const mapStateToProps = ({ loginReducer }) => ({
//   email: loginReducer.email,
//   password: loginReducer.password,
// });

// export default connect(mapStateToProps, {
//   updateEmail,
//   updatePassword,
//   onLoggedin,
// })(Login);
