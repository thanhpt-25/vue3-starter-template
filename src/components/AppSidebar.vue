<template>
  <CSidebar
    position="fixed"
    :unfoldable="store.sidebarUnfoldable"
    :visible="store.sidebarVisible"
    @visible-change="
      (event) =>
        store.updateSidebarVisible(
           event
        )
    "
  >
    <CSidebarBrand>
      <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="35"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      />
    </CSidebarBrand>
    <AppSidebarNav />
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="store.toggleUnfoldable()"
    />
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useSidebarStore } from '@/stores/sidebar.store'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  setup() {
    const store = useSidebarStore()
    return {
      store,
      logoNegative,
      sygnet,
    }
  },
}
</script>
