import html from "../core.js"
import { Header } from "./Header.js"
import TodoList from "./TodoList.js"
import Footer from "./Footer.js"

import { connect } from "../store.js"
const connector = connect(state => state)

function App(props) {
    return html`
    <section class="todoapp">
    ${Header()}
    ${props.list.length > 0 && `${TodoList()} ${Footer()}`}
    </section>
    `
}

export default connector(App)