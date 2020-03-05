<template>
  <div class="sidebar-wrapper">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#354A5E" text-color="#e9f1f6" active-text-color="#ffffff">
        <template v-for="item in menus">
          <router-link :to="item.path" :key="item.path">
            <el-menu-item v-if="item.children && item.children.length === 1" :index="item.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.children[0].meta.title}}</span>
            </el-menu-item>
          </router-link>
          <el-submenu v-if="item.children && item.children.length > 1" :key="item.path + 'multi'" :index="item.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.meta.title}}</span>
            </template>
            <router-link v-for="_item in item.children" :key="item.path + '/' + _item.path" :to="fullpath(item, _item)">
              <el-menu-item :index="item.path + '/' + _item.path">{{_item.meta.title}}</el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import routes from '@/router/baseRoutes'
export default {
  data() {
    return {
      menus: routes.filter(a => !a.hidden)
    }
  },
  methods: {
    fullpath(parent, child) {
      return `${parent.path}/${child.path}`
    }
  },
  mounted() {
    console.log('this.menus', this.menus)
  }
}
</script>

<style>
</style>
