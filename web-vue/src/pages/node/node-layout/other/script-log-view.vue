<template>
  <div>
    <log-view1
      :ref="`logView`"
      :title-name="$tl('p.executionLog')"
      :visible="visible"
      @close="
        () => {
          $emit('close')
        }
      "
    />
  </div>
</template>

<script>
import { scriptLog } from '@/api/node-other'
import LogView1 from '@/components/logView'
export default {
  components: {
    LogView1
  },
  props: {
    temp: {
      type: Object,
      default: () => ({})
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
      // logText: "loading...",
      line: 1
    }
  },
  beforeUnmount() {
    if (this.logTimer) {
      clearInterval(this.logTimer)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    $tl(key, ...args) {
      return this.$t(`pages.node.nodeLayout.other.scriptLogView.${key}`, ...args)
    },
    init() {
      this.loadData()
      this.logTimer = setInterval(() => {
        this.loadData()
      }, 2000)
    },
    // 加载日志内容
    loadData() {
      // 加载构建日志
      const params = {
        executeId: this.temp.id,
        id: this.temp.scriptId,
        nodeId: this.temp.nodeId,
        line: this.line
      }
      scriptLog(params).then((res) => {
        if (res.code === 200) {
          // 停止请求
          if (res.data.run === false) {
            clearInterval(this.logTimer)
          }
          // 更新日志
          // if (this.logText === "loading...") {
          //   this.logText = "";
          // }
          // let lines = res.data.dataLines;
          // lines.forEach((element) => {
          //   this.logText += `${element}\r\n`;
          // });
          this.$refs.logView.appendLine(res.data.dataLines)
          this.line = res.data.line
        }
      })
    }
  }
}
</script>
