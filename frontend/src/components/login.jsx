import iconClose from '..//assets/images/common/icon-close.svg';
import iconEyeOff from '..//assets/images/common/icon-eye-off.svg';
import iconEyeOn from '..//assets/images/common/icon-eye.svg';
import iconFacebook from '..//assets/images/common/icon-facebook.svg';
import iconGoogle from '..//assets/images/common/icon-google.svg';

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Auth from '../services/auth';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = yup.object().shape({
    email: yup
        .string()
        .required("Email không được để trống")
        .matches(emailPattern, "Email không đúng định dạng"),
    password: yup
        .string()
        .required("Mật khẩu không được để trống")
        // .matches(passwordPattern, "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"),
        .min(4, "Mật khẩu phải có ít nhất 6 ký tự")
});


const Login = ({ setLoginOpen }) => {

    //close modal
    const handleClose = () => {
        setLoginOpen(false);
    };

    //show password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // form login
    const [loginError, setLoginError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setLoginError("");

        Auth.login(data.email, data.password)
            .then((response) => {
                if (response.message === "Login successful") {
                    console.log("Đăng nhập thành công!");
                    localStorage.setItem("adminToken", response.token);
                    setLoginOpen(false);
                } else {
                    setLoginError("Đăng nhập thất bại!");
                };
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    setLoginError("Email hoặc mật khẩu không đúng.");
                } else {
                    setLoginError("Có lỗi xảy ra, vui lòng thử lại sau.");
                }
            });
    };

    return (
        <>
            <div className="modal js-modal" data-id="login">
                <div className="modal__content">
                    <div className="modal__body">
                        <div className="modal__close" onClick={handleClose}><img src={iconClose} alt="Close" loading="lazy" /></div>
                        <div className="modal__title title">ĐĂNG NHẬP</div>

                        <form className="modal__form form-common" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form__group">
                                <input type="text" name="login-email" placeholder="email@gmail.com" {...register("email")} />
                                {errors.email && <p className="error__message">{errors.email.message}</p>}
                            </div>
                            <div className="form__group">
                                <input type={showPassword ? "text" : "password"} name="login-password" placeholder="Nhập mật khẩu" {...register("password")} />
                                <span className="show-password js-show-password" onClick={handleShowPassword}>
                                    <img src={showPassword ? iconEyeOn : iconEyeOff} alt="Show Password" />
                                </span>
                                {errors.password && <p className="error__message">{errors.password.message}</p>}
                            </div>
                            <div className="form__group form__row">
                                <div className="form__remember">
                                    <input type="checkbox" name="remember" id="remember" value="1" />
                                    <label htmlFor="remember">Lưu thông tin đăng nhập</label>
                                </div>
                                <a href="#" className="form__forgot">Quên mật khẩu?</a>
                            </div>
                            <div className="form__group">
                                <p className="form__text center">hoặc Đăng nhập với</p>
                                <div className="form__social">
                                    <a href="#" className="form__social-link"><img src={iconFacebook} alt="Facebook" /></a>
                                    <a href="#" className="form__social-link"><img src={iconGoogle} alt="Google" /></a>
                                </div>
                            </div>
                            {loginError && <p className="error__message center">{loginError}</p>}
                            <div className="modal__submit">
                                <input type="submit" className="button button--gradient" value="Đăng nhập" />
                            </div>
                            <p className="form__text center">Bạn chưa có tài khoản? <a href="#" className="form__register js-modal-open"
                                data-id="signin">Đăng ký</a></p>
                        </form>

                    </div>
                </div>
                <div className="modal__bg" onClick={handleClose}>&nbsp;</div>
            </div>
        </>
    );
};

export default Login;