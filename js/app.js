const app = document.querySelector('#app')
const tasks = document.querySelector('#tasks')

const taskForm = document.querySelector('.form')
const taskTitle = document.querySelector('#task-title')
const taskCategory = document.querySelector('#task-category')

function setHeaders(addHeaders) {
	return {
		Authorization: 'Bearer ' + localStorage.getItem('todo-token'),
		...addHeaders,
	}
}

function getAllTasks() {
	fetch('http://todo.paydali.uz/api/tasks', {
		headers: setHeaders(),
	})
		.then(res => res.json())
		.then(data => renderTasks(data.payload))
}

getAllTasks()

function renderTasks(tasksArray) {
	tasks.innerHTML = ''
	tasksArray.map(item => {
		tasks.innerHTML += `
      <li class="task-item ${item.is_done ? 'completed' : ''}" >
				<div >
					<h4>${item.task}</h4>
					<span>${item.category.name}</span>
				</div>

        <div class="item-btns"/>
					<input type="checkbox" 
					checked="${item.is_done}"
					onchange="completeTask(
						${item.id}, ${item.is_done}
					)" />
          <button onclick="deleteTask('${item.id}')" class="btn">Delete</button>
        </div>
      </li>
    `
	})
}

function completeTask(id, is_done) {
	fetch(`http://todo.paydali.uz/api/tasks/${id}`, {
		method: 'PUT',
		headers: setHeaders({
			'content-type': 'application/json',
		}),
		body: JSON.stringify({ is_done: !is_done }),
	})
		.then(res => res.json())
		.then(data => {
			getAllTasks()
		})
}

function deleteTask(taskId) {
	fetch(`http://todo.paydali.uz/api/tasks/${taskId}`, {
		method: 'DELETE',
		headers: setHeaders(),
	})
		.then(res => res.json())
		.then(data => {
			Swal.fire('Good job!', '', 'success')
			getAllTasks()
		})
}

function getAllCategories() {
	fetch('http://todo.paydali.uz/api/categories', {
		headers: setHeaders(),
	})
		.then(res => res.json())
		.then(data => {
			data?.data?.map(item => {
				taskCategory.innerHTML += `
					<option value="${item.id}">${item.name}</option>
				`
			})
		})
}

getAllCategories()

function createTask() {
	const data = {
		task: taskTitle.value,
		category_id: taskCategory.value,
		description: '',
	}

	fetch('http://todo.paydali.uz/api/tasks', {
		method: 'POST',
		headers: setHeaders({
			'Content-type': 'Application/json',
		}),
		body: JSON.stringify(data),
	})
		.then(res => res.json())
		.then(data => {
			if (data.code === 200) {
				Swal.fire('Good job!', 'Task added successful!', 'success')
				getAllTasks()
			} else {
				Swal.fire('Oops, wrong!', data.message, 'error')
			}
		})
		.catch(err => {
			Swal.fire('Oops, wrong!', err.message, 'error')
		})
}

taskForm.addEventListener('submit', e => {
	e.preventDefault()
	createTask()
})
