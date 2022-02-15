import {nanoid} from "nanoid";

export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                createTodoItem(title, done = false) {
                    return {
                        id: nanoid(),
                        title: title,
                        done: done,
                    }
                }
            },
        })
    }
}