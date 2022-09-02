import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { axiosRequest } from './../../api/api';

const Forget = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const onSubmitHandler = (email) => {
		axiosRequest('POST', '/api-forget', email).then(res => {
			if (res.data.status === "success") {
				setSuccessMessage(res.data.message)
			} else if (res.data.status === 'error') {
				setErrorMessage(res.data.message[0])
			}
		})
	}
	const SignupSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
	});
	
	return <>
		<div className="main-wrapper teal accent-4">
			<div className="container">
				<div className="row">
					<div className=" col s12 l8 offset-l2 center-align white-text">
						<h1>Forgot password?</h1>
						<div className="card teal accent-4">
							<div className="card-content">
								<Formik
									initialValues={{
										email: '',
									}}
									validationSchema={SignupSchema}
									onSubmit={values => {
										onSubmitHandler({ email: values.email })
										setErrorMessage(null)
										setSuccessMessage(null)
									}}
								>
									{({ errors, touched, handleSubmit }) => (<>
										<Form onSubmit={e => handleSubmit(e)}>
											<div className="input-field col s12">
												<label htmlFor="email" className="white-text">Email</label>
												<Field
													name="email"
													type="text"
													onFocus={(() => setSuccessMessage(null), () => setErrorMessage(null))}
												/>
												{errors.email && touched.email ? (
													<div>{errors.email}</div>
												) : null}
											</div>
											<div className="row">
												<div className="col s12 right-align">
													<Link to="/signin" className="white-text">Sign In</Link>
												</div>
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

export default Forget