export default function html([first, ...lstring], ...value) {
    return value.reduce((acc, crr) => acc.concat(crr, lstring.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)
        .join('')
}

export function createStore(reducer) {
    let state = reducer()
    const roots = new Map()

    function render() {
        for (const [root, component] of roots) {
            let html = component()
            root.innerHTML = html
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component)
            render()
        },
        connect(selector = state => state) {
            return (component) => {
                return (props, ...args) => {
                    return component(Object.assign({}, props, selector(state), args))
                }
            }
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render()
        }
    }

}