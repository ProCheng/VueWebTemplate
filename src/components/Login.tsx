import { defineComponent } from 'vue'
export default defineComponent({
  render() {
    return <div>{import.meta.url}</div>
  }
})
