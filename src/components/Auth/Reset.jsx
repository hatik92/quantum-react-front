import React, { useState } from 'react'
import { axiosRequest } from '../../api/api';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-materialize';
import { useParams, useNavigate } from 'react-router-dom';

const Reset = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [visibilityToggle, setvisibilityToggle] = useState(false);
	const [visibilityToggleRepeat, setvisibilityToggleRepeat] = useState(false);
	const params = useParams();
	const navigate = useNavigate();

	const onSubmitHandler = (passwords) => {
		console.log(passwords);
		axiosRequest('POST', '/api-reset/', passwords, params.reset_token).then(res => {
			if (res.data.status === "success") {
				navigate('/signin')
			} else if (res.data.status === 'error') {
				setErrorMessage(res.data.message[0])
			}
		})
	}
	const SignupSchema = Yup.object().shape({
		new_password: Yup.string()
			.min(6, 'Too Short!')
			.max(16, 'Too Long!')
			.required('Required'),
		repeat_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
	});
	return <>
		<div className="main-wrapper teal accent-4">
			<div className="container">
				<div className="row">
					<div className=" col s12 l8 offset-l2 center-align white-text">
						<h1>Reset password</h1>
						<div className="card teal accent-4">
							<div className="card-content">
								<Formik
									initialValues={{
										new_password: '',
										repeat_password: '',
									}}
									validationSchema={SignupSchema}
									onSubmit={values => {
										onSubmitHandler({ password: values.new_password, repeat_password: values.repeat_password })
										setErrorMessage(null)
										setSuccessMessage(null)
									}}
								>
									{({ errors, touched, handleSubmit }) => (<>
										<Form onSubmit={e => handleSubmit(e)}>
											<div className="input-field">
												<label className="auth-form-label" htmlFor="new_password">New password</label>
												<Field
													name="new_password"
													type={visibilityToggle ? 'text' : 'password'}
													onFocus={(() => setSuccessMessage(null), () => setErrorMessage(null))}
												/>
												{errors.new_password && touched.new_password ? (
													<div>{errors.new_password}</div>
												) : null}
												<Icon className="visibility-icon" onClick={() => setvisibilityToggle(!visibilityToggle)}>{visibilityToggle ? 'visibility' : 'visibility_off'}</Icon>
											</div>
											<div className="input-field">
												<label className="auth-form-label" htmlFor="repeat_password">Repeat password</label>
												<Field
													name="repeat_password"
													type={visibilityToggleRepeat ? 'text' : 'password'}
													onFocus={(() => setSuccessMessage(null), () => setErrorMessage(null))}
												/>
												{errors.repeat_password && touched.repeat_password ? (
													<div>{errors.repeat_password}</div>
												) : null}
												<Icon className="visibility-icon" onClick={() => setvisibilityToggleRepeat(!visibilityToggleRepeat)}>{visibilityToggleRepeat ? 'visibility' : 'visibility_off'}</Icon>
											</div>
											<div>
												<button className="btn btn-large waves-effect waves-light" type="submit">
													SEND
												</button>
											</div>
										</Form>
									</>
									)}
								</Formik>
							</div>
						</div>
						{successMessage && <div className="material-alert success left-align" role="alert">
							{successMessage}
						</div>}
						{errorMessage && <div className="material-alert error">
							{errorMessage}
						</div>}
					</div>
				</div>
			</div>
		</div>
	</>
}

export default Reset