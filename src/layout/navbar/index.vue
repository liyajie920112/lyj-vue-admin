<template>
  <div class="navbar-wrapper">
    <left-panel-ctrl />
    <bread-crumbs />
    <right-menu />
  </div>
</template>

<script>
import LeftPanelCtrl from './LeftPanelCtrl'
import BreadCrumbs from './BreadCrumbs'
import RightMenu from './RightMenu'
export default {
  components: {
    LeftPanelCtrl,
    BreadCrumbs,
    RightMenu
  }
}
</script>
