import html from "../core.js"
import TodoItem from "./TodoItem.js"
import { connect } from "../store.js"

const connector = connect(state => state)

function TodoList({ list, filter, filters, targetEdit }) {
    return html`
    <section class="main">
    <input 
        id="toggle-all" 
        class="toggle-all" 
        type="checkbox"
        onchange="dispatch('toggleAll', this.checked)"
        ${list.every(item => item.completed) && 'checked'}>
        <label for="toggle-all" >Mark all as complete</label>
    <ul class="todo-list">
        ${list.filter(filters[filter]).map((item, index) => TodoItem(item, index, targetEdit === index && 'editing'))}
    </ul>
    </section>
    `
}

export default connector(TodoList)