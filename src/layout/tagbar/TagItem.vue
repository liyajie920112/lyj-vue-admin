<template>
  <router-link :to="{ path: route.path }" class="tag-item">{{ route.title }}<i @click.prevent.stop="closeTab" v-if="!route.meta.noClose" class="el-icon-close"></i></router-link>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      default: () => ({})
    },
    title: String,
    canClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    closeTab() {
      this.$emit('close', this.route)
    }
  }
}
</script>
