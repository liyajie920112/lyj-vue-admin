<template>
  <div class="tagbar-wrapper">
    <tag-item v-for="item in tabs" :title="item.title" :key="item.path" />
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
    $route() {
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
      addViews: 'addViews'
    }),
    addTab() {
      this.addViews(this.$route)
    }
  },
  mounted() {
    this.addTab()
  }
}
</script>
