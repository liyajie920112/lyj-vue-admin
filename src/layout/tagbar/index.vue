<template>
  <div class="tagbar-wrapper">
    <tag-item v-for="item in tabs" @close="removeTab" :route="item" :key="item.path" :aa="tabs.length" />
  </div>
</template>

<script>
import TagItem from './TagItem'
import { mapGetters, mapActions } from 'vuex'
import baseRoutes from '@/router/baseRoutes'
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
    addTab(route) {
      this.addViews(route || this.$route)
      return false
    },
    initTab() {
      const _noCloseTabs = []
      baseRoutes.forEach(parentRoute => {
        if (parentRoute.children && parentRoute.children.length > 0) {
          const noCloseRoutes = parentRoute.children.filter(a => a.meta.noClose)
          noCloseRoutes.forEach(noCloseRoute => {
            const fullPath = (parentRoute.path === '/' ? '' : parentRoute.path) + '/' + noCloseRoute.path
            _noCloseTabs.push({
              fullPath,
              path: fullPath,
              name: noCloseRoute.name,
              meta: noCloseRoute.meta
            })
          })
        }
      })
      _noCloseTabs.forEach(item => {
        this.addTab(item)
      })
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
    this.initTab()
    this.addTab()
  }
}
</script>
