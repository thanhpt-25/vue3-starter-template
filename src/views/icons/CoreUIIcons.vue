<template>
  <CRow>
    <CCol>
      <DocsCallout
        name="CoreUI Icons"
        href="components/icon"
        content="CoreUI Icons. CoreUI Icons package is delivered with more than 1500 icons in multiple formats SVG, PNG, and Webfonts. CoreUI Icons are beautifully crafted symbols for common actions and items. You can use them in your digital products for web or mobile app."
      />
      <CCard>
        <CCardHeader>CoreUI Icons Free</CCardHeader>
        <CCardBody>
          <CRow class="text-center">
            <template v-for="(icon, iconName) in icons" :key="iconName">
              <CCol class="mb-5" :xs="3" :sm="2">
                <CIcon :content="icon" size="xxl" />
                <div>{{ toKebabCase(iconName) }}</div>
              </CCol>
            </template>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { freeSet } from '@coreui/icons'
import DocsCallout from "@/components/DocsCallout.vue";
export default {
  name: 'CoreUIIcons',
  components:{
    DocsCallout
  },
  setup() {
    const toKebabCase = (str) =>
      str.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase()
    const icons = freeSet

    return {
      icons,
      toKebabCase,
    }
  },
}
</script>
