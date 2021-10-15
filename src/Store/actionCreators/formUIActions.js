import { EDIT_DUE_DATE, EDIT_PRIORITY, EDIT_SUMMARY, EDIT_TASK_ID } from "../../actionTypes"
import { EDIT_DESCRIPTION } from '../../actionTypes/index';

export const updateTaskId = taskId => {
    return {
        type: EDIT_TASK_ID,
        values: {
            taskId
        }
    }
}

export const updateTitle = (title) => {
    return {
        type: EDIT_SUMMARY,
        values: {
            title
        }
    }
}

export const updateDescription = description => {
    return {
        type: EDIT_DESCRIPTION,
        values : {
            description
        }
    }
}

export const updatePriority = priority => {
    return {
        type: EDIT_PRIORITY,
        values : {
            priority
        }
    }
}

export const updateDueDate = dueDate => {
    return {
        type: EDIT_DUE_DATE,
        values : {
            dueDate
        }
    }
}