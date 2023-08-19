import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpDataUser } from '../services/UserService'
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
	const { show, onHide, dataEditUser, handleEditUserFromEdit } = props
	const [name, setName] = useState('')
	const [job, setJob] = useState('')

	const handelComfirm = async () => {
		let res = await putUpDataUser(name, job)
		console.log('check res', res)
		handleEditUserFromEdit({
			//lay id va first_name
			first_name: name, id: dataEditUser.id
		})
		onHide()
		toast.success('A user edit is success')
	}

	useEffect(() => {
		//kiem tra show modaledit
		if (show) {
			setName(dataEditUser.first_name)
		}
	},
		//kierm tra su thau doi cua datatedit
		[dataEditUser])
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
						Edit a User
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">Name</span>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
					</div>
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">Job</span>
						<input
							value={job}
							onChange={(e) => setJob(e.target.value)}
							type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-secondary"
						onClick={onHide}>Close</Button>
					<Button
						onClick={() => handelComfirm()}
						variant="outline-success">Comfirm</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ModalEditUser