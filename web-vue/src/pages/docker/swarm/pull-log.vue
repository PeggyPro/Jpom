<template>
  <div>
    <log-view
      :ref="`logView`"
      :title-name="$tl('p.taskLog')"
      :visible="visible"
      @close="
        () => {
          $emit('close')
        }
      "
    >
      <template #before>
        <a-space>
          <a-input-number v-model:value="tail" :placeholder="$tl('p.readLineCount')" style="width: 150px">
            <template #addonBefore>
              <a-tooltip :title="$tl('p.readLastLogLines')">{{ $tl('p.lineCount') }} </a-tooltip>
            </template>
          </a-input-number>
          <div>
            {{ $tl('p.timestamp') }}
            <a-switch
              v-model:checked="timestamps"
              :checked-children="$tl('p.show')"
              :un-checked-children="$tl('p.hide')"
            />
          </div>
          <a-button type="primary" size="small" @click="init"><ReloadOutlined /> {{ $tl('p.refresh') }} </a-button>
          |
          <a-button type="primary" :disabled="!logId" size="small" @click="download">
            <DownloadOutlined /> {{ $tl('p.download') }}
          </a-button>
          |
        </a-space>
      </template>
    </log-view>
  </div>
</template>

<script>
import LogView from '@/components/logView'
import {
  dockerSwarmServicesPullLog,
  dockerSwarmServicesStartLog,
  dockerSwarmServicesDownloaLog
} from '@/api/docker-swarm'
export default {
  components: {
    LogView
  },
  props: {
    dataId: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    urlPrefix: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      logTimer: null,
      logId: '',
      line: 1,
      tail: 500,
      timestamps: false
    }
  },
  beforeUnmount() {
    this.logTimer && clearTimeout(this.logTimer)
  },
  mounted() {
    //
    this.init()
  },
  methods: {
    $tl(key, ...args) {
      return this.$t(`pages.docker.swarm.pullLog.${key}`, ...args)
    },
    init() {
      this.logTimer && clearTimeout(this.logTimer)
      this.$refs.logView.clearLogCache()
      this.line = 1
      //
      dockerSwarmServicesStartLog(this.urlPrefix, {
        type: this.type,
        dataId: this.dataId,
        id: this.id,
        tail: this.tail,
        timestamps: this.timestamps
      }).then((res) => {
        if (res.code === 200) {
          this.logId = res.data
          this.pullLog()
        } else {
          this.$refs.logView.appendLine(res.msg)
        }
      })
    },
    nextPull() {
      this.logTimer && clearTimeout(this.logTimer)
      // 加载构建日志
      this.logTimer = setTimeout(() => {
        this.pullLog()
      }, 2000)
    },
    // 加载日志内容
    pullLog() {
      const params = {
        id: this.logId,
        line: this.line
      }
      dockerSwarmServicesPullLog(this.urlPrefix, params).then((res) => {
        let next = true
        if (res.code === 200) {
          // 停止请求
          const dataLines = res.data.dataLines

          this.$refs.logView.appendLine(dataLines)
          this.line = res.data.line
        }
        // 继续拉取日志
        if (next) this.nextPull()
      })
    },
    // 下载
    download() {
      window.open(dockerSwarmServicesDownloaLog(this.urlPrefix, this.logId), '_blank')
    }
  }
}
</script>
