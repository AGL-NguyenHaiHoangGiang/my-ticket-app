import iconClose from "../assets/images/common/icon-close.svg";
import iconEyeOff from "../assets/images/common/icon-eye-off.svg";
import iconEyeOn from "../assets/images/common/icon-eye.svg";
import iconFacebook from "../assets/images/common/icon-facebook.svg";
import iconGoogle from "../assets/images/common/icon-google.svg";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Auth from "../services/auth";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(emailPattern, "Email không đúng định dạng"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

const SignIn = ({ setSignInOpen, setLoginOpen }) => {
  //close modal
  const handleClose = () => {
    setSignInOpen(false);
  };

  //show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // form signup
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setSignUpError("");
    setSignUpSuccess("");

    Auth.signup(data.email, data.password)
      .then((response) => {
        if (
          response.message === "User registered successfully" ||
          response.metadata
        ) {
          setSignUpSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
          reset();
          setTimeout(() => {
            setSignInOpen(false);
            setLoginOpen(true);
          }, 2000);
        } else {
          setSignUpError("Đăng ký thất bại!");
        }
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setSignUpError("Email đã được sử dụng.");
        } else if (error.response?.data?.message) {
          setSignUpError(error.response.data.message);
        } else {
          setSignUpError("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
      });
  };

  // Switch to login modal
  const handleSwitchToLogin = (e) => {
    e.preventDefault();
    setSignInOpen(false);
    setLoginOpen(true);
  };

  return (
    <>
      <div className="modal js-modal" data-id="signin">
        <div className="modal__content">
          <div className="modal__body">
            <div className="modal__close" onClick={handleClose}>
              <img src={iconClose} alt="Close" loading="lazy" />
            </div>
            <div className="modal__title title">ĐĂNG KÝ</div>

            <form
              className="modal__form form-common"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form__group">
                <input
                  type="text"
                  name="signup-email"
                  placeholder="email@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error__message">{errors.email.message}</p>
                )}
              </div>
              <div className="form__group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="signup-password"
                  placeholder="Nhập mật khẩu"
                  {...register("password")}
                />
                <span
                  className="show-password js-show-password"
                  onClick={handleShowPassword}
                >
                  <img
                    src={showPassword ? iconEyeOn : iconEyeOff}
                    alt="Show Password"
                  />
                </span>
                {errors.password && (
                  <p className="error__message">{errors.password.message}</p>
                )}
              </div>
              <div className="form__group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm-password"
                  placeholder="Xác nhận mật khẩu"
                  {...register("confirmPassword")}
                />
                <span
                  className="show-password js-show-password"
                  onClick={handleShowConfirmPassword}
                >
                  <img
                    src={showConfirmPassword ? iconEyeOn : iconEyeOff}
                    alt="Show Confirm Password"
                  />
                </span>
                {errors.confirmPassword && (
                  <p className="error__message">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="form__group">
                <div className="form__remember">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    value="1"
                    required
                  />
                  <label htmlFor="terms">
                    Tôi đồng ý với{" "}
                    <a href="#" className="form__link">
                      Điều khoản sử dụng
                    </a>
                  </label>
                </div>
              </div>
              <div className="form__group">
                <p className="form__text center">hoặc Đăng ký với</p>
                <div className="form__social">
                  <a href="#" className="form__social-link">
                    <img src={iconFacebook} alt="Facebook" />
                  </a>
                  <a href="#" className="form__social-link">
                    <img src={iconGoogle} alt="Google" />
                  </a>
                </div>
              </div>
              {signUpError && (
                <p className="error__message center">{signUpError}</p>
              )}
              {signUpSuccess && (
                <p className="success__message center">{signUpSuccess}</p>
              )}
              <div className="modal__submit">
                <input
                  type="submit"
                  className="button button--gradient"
                  value="Đăng ký"
                />
              </div>
              <p className="form__text center">
                Đã có tài khoản?{" "}
                <a
                  href="#"
                  className="form__register js-modal-open"
                  onClick={handleSwitchToLogin}
                >
                  Đăng nhập
                </a>
              </p>
            </form>
          </div>
        </div>
        <div className="modal__bg" onClick={handleClose}>
          &nbsp;
        </div>
      </div>
    </>
  );
};

export default SignIn;
