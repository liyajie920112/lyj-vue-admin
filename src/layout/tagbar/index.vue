<template>
  <div class="tagbar-wrapper">
    <tag-item v-for="item in tabs" @close="removeTab" :route="item" :key="item.path" :aa="tabs.length" />
  </div>
</template>

<script>
import TagItem from './TagItem'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    TagItem
  },
  watch: {
    $route(newV, oldV) {
      this.addTab()
    }
  },
  computed: {
    ...mapGetters('tabs', {
      tabs: 'getTabs'
    })
  },
  methods: {
    ...mapActions('tabs', {
      addViews: 'addViews',
      removeView: 'removeView'
    }),
    addTab() {
      this.addViews(this.$route)
      return false
    },
    initTab() {
    },
    removeTab(route) {
      // 关闭tab, 如果是当前的view, 则在关闭之后需要跳转到最后一个view
      this.removeView(route).then(({ views }) => {
        if (route.path === this.$route.path) {
          // 跳转到最后一个
          this.$router.push(views.splice(-1)[0].fullPath)
        }
      })
    }
  },
  mounted() {
    this.addTab()
    this.initTab()
  }
}
</script>
