import html from "../core.js"
import { connect } from "../store.js"

const connector = connect(state => state)
function Footer({ list, filter, filters }) {
    return html`
    <footer class="footer">
            <span class="todo-count">
                <strong>${list.filter(filters.active).length}</strong> item left
            </span>
            <ul class="filters">
            ${Object.keys(filters).map(type => {
        return html`
                <li>
                    <a 
                    class="${filter === type && 'selected'}" 
                    href="#"
                    onclick="dispatch('active', '${type}')">
                    ${type[0].toUpperCase() + type.slice(1)}
                </a>
                </li>
            `
    }).join('')}
            </ul>
            ${list.filter(filters.completed).length > 0 && filter !== 'active' && html`<button class="clear-completed" 
            onclick="dispatch('clear')">Clear completed</button>`}
        </footer>
    `
}

export default connector(Footer)