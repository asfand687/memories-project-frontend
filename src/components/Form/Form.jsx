import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useSelector } from 'react-redux'

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	})
	const post = useSelector((state) =>
		currentId ? state.posts.find((post) => post._id === currentId) : null
	)
	const user = JSON.parse(localStorage.getItem('profile'))
	const dispatch = useDispatch()
	const classes = useStyles()
	const handleSubmit = (e) => {
		e.preventDefault()
		if (currentId) {
			dispatch(updatePost({ ...postData, name: user?.result?.name }))
		} else {
			dispatch(createPost({ ...postData, name: user?.result?.name }))
		}
		clearFormData()
	}
	const clearFormData = () => {
		setPostData({
			title: '',
			message: '',
			tags: '',
			selectedFile: '',
		})
		setCurrentId(null)
	}

	useEffect(() => {
		if (post) setPostData(post)
	}, [post])

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please sign in to create a memory and like others' memories
				</Typography>
			</Paper>
		)
	}

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentId ? 'Editing' : 'Creating'} a memory
				</Typography>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={({ target }) =>
						setPostData({ ...postData, title: target.value })
					}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={({ target }) =>
						setPostData({ ...postData, message: target.value })
					}
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={({ target }) =>
						setPostData({ ...postData, tags: target.value.split(',') })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
				<Button
					onClick={clearFormData}
					className={classes.buttonSubmit}
					variant='contained'
					color='secondary'
					size='small'
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	)
}

export default Form
