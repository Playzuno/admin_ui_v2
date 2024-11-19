import { useEffect, useState } from 'react';
// import Logo from '../../assets/images/logo.svg';
import Logo from '../../../assets/images/logo.svg';
import { useSnackbar } from '../../../hooks/useSnackbar';
import api from '../../../utils/axios';

export default function Registration() {
  useEffect(() => {
    document.body.classList.remove('theme-cyan');
    document.body.classList.remove('theme-purple');
    document.body.classList.remove('theme-blue');
    document.body.classList.remove('theme-green');
    document.body.classList.remove('theme-orange');
    document.body.classList.remove('theme-blush');
  }, []);
  const [email, setEmail] = useState('sukuna4anime@gmail.com');
  const [password, setPassword] = useState('Mnbvcxz123@');
  const showSnack = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const register = async () => {
    setIsLoading(true);
    try {
      const business = await validateEmail();
      await joinUser(business);
    } catch (e) {
      // console.log(e)
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = async () => {
    try {
      const response = await api.post('/v2/validate_business', {
        email: email,
      });
      return response.data;
    } catch (error) {
      console.error('Business validation error:', error);
      showSnack({ message: 'Organization not found.' });
      throw error;
    }
  };

  const joinUser = async business => {
    try {
      const response = await api.post('/v2/users/join', {
        email: email,
        password: password,
        orgId: business.orgId,
      });
      setMailSent(true);
      // Handle the response as needed
    } catch (error) {
      console.error('Join user error:', error);
      if (error.response.data.code == 6) {
        showSnack({ message: 'User already exist. Sign in' });
      } else {
        showSnack({ message: error.response.data.message });
      }
      throw error;
    }
  };

  return (
    <div className="theme-cyan">
      <div>
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box">
              <div className="top">
                <img src={Logo} alt="Lucid" style={{ height: '40px', margin: '10px' }} />
              </div>
              {!mailSent ? (
                <div className="card">
                  <div className="header">
                    <p className="lead">Create an account</p>
                  </div>
                  <div className="body">
                    <form className="form-auth-small ng-untouched ng-pristine ng-valid">
                      <div className="form-group">
                        <label className="control-label sr-only">Email</label>
                        <input
                          className="form-control"
                          id="signup-email"
                          placeholder="Your email"
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label sr-only">Password</label>
                        <input
                          className="form-control"
                          id="signup-password"
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-lg btn-block"
                        onClick={register}
                        disabled={isLoading}
                      >
                        REGISTER
                      </button>

                      <div className="bottom">
                        <span className="helper-text">
                          Already have an account? <a href="login">Login</a>
                        </span>
                      </div>
                    </form>
                    {/* <div className="separator-linethrough">
                    <span>OR</span>
                  </div>
                  <button className="btn btn-signin-social">
                    <i className="fa fa-facebook-official facebook-color"></i>{" "}
                    Sign in with Facebook
                  </button>
                  <button className="btn btn-signin-social">
                    <i className="fa fa-twitter twitter-color"></i> Sign in with
                    Twitter
                  </button> */}
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="header">
                    <p className="lead">Registration link is sent to your email</p>
                  </div>
                  <div className="body">
                    <div className="bottom">
                      <span className="helper-text">
                        Wrong email? <a href="registration">Change</a>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Registration.propTypes = {
// };

// const mapStateToProps = ({ loginReducer }) => ({
//   email: loginReducer.email,
//   password: loginReducer.password
// });

// export default connect(mapStateToProps, {
// })(Registration);
