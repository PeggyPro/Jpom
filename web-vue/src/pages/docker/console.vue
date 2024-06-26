<template>
  <div>
    <!-- 控制台 -->
    <a-drawer
      destroy-on-close
      placement="right"
      :width="`${getCollapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 200px)'}`"
      :open="true"
      :body-style="{
        padding: '0'
      }"
      :header-style="{
        padding: '0 10px'
      }"
      @close="onClose"
    >
      <template #title>
        <a-menu v-model:selectedKeys="menuKeyArray" mode="horizontal" class="docker-menu" @click="menuClick">
          <a-menu-item key="containers">
            <span class="nav-text">{{ $tl('p.independentContainer') }}</span>
          </a-menu-item>
          <a-menu-item key="docker-compose">
            <span class="nav-text">docker-compose</span>
          </a-menu-item>
          <a-menu-item key="images">
            <span class="nav-text">{{ $tl('p.image') }}</span>
          </a-menu-item>
          <a-menu-item key="volumes">
            <span class="nav-text">{{ $tl('p.volume') }}</span>
          </a-menu-item>
          <a-menu-item key="networks">
            <span class="nav-text">{{ $tl('p.network') }}</span>
          </a-menu-item>
          <a-menu-item key="info">
            <span class="nav-text">{{ $tl('p.information') }}</span>
          </a-menu-item>
          <a-menu-item key="prune">
            <span class="nav-text">{{ $tl('p.crop') }}</span>
          </a-menu-item>
        </a-menu>
      </template>

      <div class="layout-content">
        <!-- <a-layout-content> -->
        <container
          v-show="menuKey === 'containers'"
          :id="id"
          type="container"
          :machine-docker-id="machineDockerId"
          :visible="visible"
          :url-prefix="urlPrefix"
        />
        <container
          v-show="menuKey === 'docker-compose'"
          :id="id"
          type="compose"
          :machine-docker-id="machineDockerId"
          :visible="visible"
          :url-prefix="urlPrefix"
        />
        <images
          v-show="menuKey === 'images'"
          :id="id"
          :machine-docker-id="machineDockerId"
          :visible="visible"
          :url-prefix="urlPrefix"
        />
        <volumes
          v-if="menuKey === 'volumes'"
          :id="id"
          :machine-docker-id="machineDockerId"
          :visible="visible"
          :url-prefix="urlPrefix"
        />
        <info
          v-show="menuKey === 'info'"
          :id="id"
          :machine-docker-id="machineDockerId"
          :visible="visible"
          :url-prefix="urlPrefix"
        />
        <networks
          v-show="menuKey === 'networks'"
          :id="id"
          :machine-docker-id="machineDockerId"
          :visible="visible"
          :url-prefix="urlPrefix"
        />
        <prune
          v-show="menuKey === 'prune'"
          :id="id"
          :machine-docker-id="machineDockerId"
          :visible="visible"
          :url-prefix="urlPrefix"
        />
        <!-- </a-layout-content> -->
      </div>
    </a-drawer>
  </div>
</template>

<script>
import Container from './container'
import Images from './images'
import Volumes from './volumes'
import Info from './info'
import Networks from './networks'
import Prune from './prune'
import { mapState } from 'pinia'
import { useGuideStore } from '@/stores/guide'
export default {
  components: {
    Container,
    Images,
    Volumes,
    Info,
    Networks,
    Prune
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    machineDockerId: {
      type: String,
      default: ''
    },
    urlPrefix: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  data() {
    return {
      menuKeyArray: ['containers'],
      menuKey: 'containers'
    }
  },
  computed: {
    ...mapState(useGuideStore, ['getCollapsed'])
  },
  mounted() {},
  methods: {
    $tl(key, ...args) {
      return this.$t(`pages.docker.console.${key}`, ...args)
    },
    menuClick(item) {
      this.menuKey = item.key
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.docker-menu {
  border-bottom: 0;
}

.layout-content {
  padding: 0;
  margin: 15px;
}
</style>
