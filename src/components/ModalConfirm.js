

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../services/UserService'
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
	const { onHide, dataDelUser, handelDelUsersfromConfirm } = props

	const handleConfirmDel = async () => {
		let res = await DeleteUser(dataDelUser.id)
		console.log("check res", res)

		if (res && +res.statusCode === 204) {
			toast.success('Delete user success')
			handelDelUsersfromConfirm(dataDelUser)
			onHide()
		} else {
			toast.error('Delete user error')
		}
	}

	return (
		<div>
			<Modal
				{...props}
				backdrop="static"
				keyboard={false}
				size="base"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Delete User
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='fs-5 '>
						<p className='mb-0 fs-3'>This action can't be undone!</p>
						<p className='mb-0'>Do want to delete this user? </p>
						<p className='fw-semibold'>Email: "{dataDelUser.email}"</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-secondary"
						onClick={onHide}>Close</Button>
					<Button
						onClick={handleConfirmDel}
						variant="outline-danger"
					>
						Delete User
					</Button>
				</Modal.Footer>
			</Modal>
		</div >
	)
}

export default ModalConfirm