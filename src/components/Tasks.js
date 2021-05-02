import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tasks() {

    /**
     * List of tasks and states to add a new one.
     */
    const [tasksList, setTasksList] = useState(null)
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    useEffect(() => {
        if (tasksList === null) {
            setTasksList(JSON.parse(window.localStorage.getItem('tasks')) || [])
        }
    }, [tasksList])

    /**
     * Add a new task in the tasksList state and save the list into the localStorage.
     */
    const addTask = () => {
        if (taskName && taskDescription) {
            const list = tasksList;
            list.push({name: taskName, description: taskDescription, completed: false})

            setTasksList(list)

            // Clear fields to add another one.
            setTaskName('')
            setTaskDescription('')

            // Save into the localStorage.
            window.localStorage.setItem('tasks', JSON.stringify(list))
        }
    }

    /**
     * Delete a task.
     * @param {String} name Name of the task (to identify it).
     */
    const deleteTask = (name) => {
        const list = tasksList.filter((task) => task.name !== name)

        setTasksList(list)
    }

    /**
     * Set a task as "completed" or "not completed" (depending of the current status of the task).
     * @param {String} name Name of the task (to identify it).
     */
    const setCompleted = (name) => {
        const list = tasksList.map((task) => {
            if (task.name === name) {
                task.completed = !task.completed;
            }
            return task
        })

        setTasksList(list)
    }

    /**
     * Render
     */
    return (
        <div>
            <h2>Liste des tâches</h2>

            {tasksList && tasksList.length === 0 && <div className="alert alert-info">Aucune tâche n'a encore été créée.</div>}

            {tasksList && tasksList.length > 0 && (
                <ul className="list-group">
                    {tasksList.map((t) => (
                        <li className="list-group-item d-flex justify-content-between" key={t.name}>
                            <span>
                                <b>{t.name}</b> : {t.description} - <Link to="#" onClick={() => deleteTask(t.name)}>Supprimer</Link>
                            </span>
                            <span>
                                {t.completed && <div className="badge badge-success" style={{cursor: 'pointer'}} onClick={() => setCompleted(t.name)}>Complétée</div>}
                                {!t.completed && <div className="badge badge-danger" style={{cursor: 'pointer'}} onClick={() =>setCompleted(t.name)}>Non complétée</div>}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <hr />
            <h2>Créer une nouvelle tâche</h2>
            <div className="row">
                <div className="col">
                    <label>Nom de la tâche</label>
                    <input type="text" className="form-control" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </div>

                <div className="col">
                    <label>Description de la tâche en une ligne</label>
                    <input type="text" className="form-control" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                </div>

                <div className="col">
                    <br />
                    <button className="btn btn-primary" onClick={addTask}>Ajouter la tâche</button>
                </div>
            </div>
        </div>
    )
}