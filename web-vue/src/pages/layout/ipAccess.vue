<template>
  <defaultBg>
    <template #content>
      <a-card hoverable class="card">
        <a-card-meta>
          <template #description>
            <a-result status="error" :title="$tl('p.k1')">
              <template #extra>
                <a-button> {{ $tl('p.k2') }} </a-button>
              </template>
            </a-result>
          </template>
        </a-card-meta>
      </a-card>
    </template>
  </defaultBg>
</template>
<script>
import defaultBg from '@/pages/layout/default-bg.vue'
export default {
  components: {
    defaultBg
  },
  data() {
    return {}
  },
  methods: {
    $tl(key, ...args) {
      return this.$t(`pages.layout.ipAccess.${key}`, ...args)
    }
  }
}
</script>
