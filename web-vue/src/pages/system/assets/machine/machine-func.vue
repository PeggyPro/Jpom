<template>
  <a-drawer
    destroy-on-close
    placement="right"
    :width="`${getCollapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 200px)'}`"
    :open="true"
    :header-style="{
      padding: '0 10px'
    }"
    :body-style="{
      padding: '0'
    }"
    @close="
      () => {
        $emit('close')
      }
    "
  >
    <template #title>
      <a-space>
        <div>
          <a-tabs
            v-model:activeKey="current"
            :tab-bar-style="{
              margin: '0'
            }"
          >
            <a-tab-pane key="info" :tab="$tl('p.basicInfo')"></a-tab-pane>
            <a-tab-pane key="cache" :tab="$tl('p.cacheMonitoring')"></a-tab-pane>
            <a-tab-pane key="config" :tab="$tl('p.systemConfig')"></a-tab-pane>
            <a-tab-pane key="freeScript" :tab="$tl('p.freeScript')"></a-tab-pane>
            <a-tab-pane key="path-config" :tab="$tl('p.authorizationConfig')"></a-tab-pane>
            <a-tab-pane key="upgrade" :tab="$tl('p.onlineUpgrade')"></a-tab-pane>
            <a-tab-pane key="log" :tab="$tl('p.systemLogs')"></a-tab-pane>
          </a-tabs>
        </div>
      </a-space>
    </template>
    <div class="layout-content">
      <!-- 机器信息组件 -->
      <machine-info v-if="current === 'info'" :machine-id="machineId" />
      <upgrade v-if="current === 'upgrade'" :machine-id="machineId" />
      <white-list v-if="current === 'path-config'" :machine-id="machineId" />
      <cache v-if="current === 'cache'" :machine-id="machineId" />
      <log v-if="current === 'log'" :machine-id="machineId" />
      <config-file v-if="current === 'config'" :machine-id="machineId" />
      <freeScript v-if="current === 'freeScript'" :machine-id="machineId" />
    </div>
  </a-drawer>
</template>

<script>
import { mapState } from 'pinia'
import machineInfo from './machine-info'
import freeScript from './free-script'
import upgrade from '@/components/upgrade'
import WhiteList from '@/pages/node/node-layout/system/white-list.vue'
import Cache from '@/pages/node/node-layout/system/cache'
import Log from '@/pages/node/node-layout/system/log.vue'
import ConfigFile from '@/pages/node/node-layout/system/config-file.vue'
import { useAppStore } from '@/stores/app'
export default {
  components: {
    machineInfo,
    upgrade,
    WhiteList,
    Cache,
    ConfigFile,
    Log,
    freeScript
  },
  props: {
    machineId: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    tab: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  data() {
    return {
      current: this.tab || 'info'
    }
  },

  computed: {
    ...mapState(useAppStore, ['getCollapsed'])
  },
  mounted() {},
  methods: {
    $tl(key, ...args) {
      return this.$t(`pages.system.assets.machine.machineFunc.${key}`, ...args)
    }
  }
}
</script>

<style scoped>
.layout-content {
  padding: 0;
  margin: 15px;
}
:deep(.ant-tabs-nav::before) {
  border-bottom: 0;
}
</style>
