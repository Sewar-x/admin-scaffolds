
<script setup lang="tsx">
import { computed, defineComponent, unref } from 'vue'
import type { layoutType } from '../types'

const props =  defineProps<{
  options: layoutType;
}>();

const layout = props?.options?.layout
export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <section >
        
      </section>
    )
  }
})
</script>
  
<style scoped lang="less"></style>
  