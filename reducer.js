const init = {
    list: localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [],
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    targetEdit: -1
}

const saveLocalStorage = (list) => {
    localStorage.setItem('todoList', JSON.stringify(list))
}

export default function reducer(state = init, action, args) {
    let newState = state
    let newList = []

    switch (action) {
        case 'add':
            const [titlea] = args
            if (titlea == "") {
                return state
            } else {
                newList = [...state.list, {
                    title: titlea,
                    completed: false
                }]
                newState = {
                    ...state,
                    list: newList
                }
                break;
            }
        case 'toggle':
            const [int] = args
            newList = [...state.list]
            newList[int] = { ...newList[int], completed: !newList[int].completed }
            newState = { ...state, list: newList }
            break;
        case 'toggleAll':

            const [status] = args
            newList = state.list.map(item => ({ ...item, completed: status }))
            newState = { ...state, list: newList }
            break;
        case 'destroy':
            const [ind] = args
            newList = [...state.list]
            newList.splice(ind, 1)
            newState = { ...state, list: newList }
            break
        case 'active':
            const [type] = args
            newState = { ...state, filter: type }
            break
        case 'clear':
            newList = state.list.filter(state.filters.active)
            newState = { ...state, list: newList }
            break
        case 'startedit':
            const [ine] = args
            newState = { ...state, targetEdit: ine }
            break
        case 'endediting':
            const [titlee] = args
            if (titlee !== '') {
                newList[state.targetEdit] = { ...newList[state.targetEdit], title: titlee }
            } else {
                state.list.splice(state.targetEdit, 1)
            }
            newState = { ...state, list: newList, targetEdit: -1 }
            break
        case 'cancelediting':
            newState = { ...state, targetEdit: -1 }
            break
        default:
            return state
    }

    if (newState.list !== state.list) {
        saveLocalStorage(newState.list)
    }

    return newState
}