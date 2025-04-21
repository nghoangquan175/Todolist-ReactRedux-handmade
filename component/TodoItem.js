import html from "../core.js"

function TodoItem(item, index, editing) {
    return html`
    <li class="${item.completed && 'completed'} ${editing && 'editing'}" ondblclick="dispatch('startedit', ${index})">
    <div class="view">
        <input 
        class="toggle" 
        type="checkbox" 
        ${item.completed && 'checked'}
        onchange="dispatch('toggle', ${index})">
        <label>${item.title}</label>
        <button class="destroy" onclick="dispatch('destroy', ${index})"></button>
    </div>
    <input 
        class="edit" 
        value="${item.title}"
        autofocus='true'
        onkeyup="event.keyCode === 13 && dispatch('endediting', this.value.trim()) || event.keyCode === 27 && dispatch('cancelediting', this.value.trim())"
    >
    </li>
    `
}

export default TodoItem