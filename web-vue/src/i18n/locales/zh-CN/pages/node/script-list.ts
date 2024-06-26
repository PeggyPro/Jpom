export default {
  c: {
    name: '名称',
    scheduling: '定时执行',
    syncCache: '同步缓存',
    execute: '执行',
    log: '日志',
    trigger: '触发器',
    delete: '删除',
    copyOnClick: '点击可以复制',
    confirm: '确认',
    cancel: '取消'
  },
  p: {
    noNodeScript: '没有任何节点脚本',
    selectNode: '请选择节点',
    quickBack: '按住 Ctr 或者 Alt/Option 键点击按钮快速回到第一页',
    search: '搜索',
    add: '新增',
    nodeScriptTemplateDescription:
      '节点脚本模版是存储在节点中的命令脚本用于在线管理一些脚本命令，如初始化软件环境、管理应用程序等',
    loadEnv: '执行时候默认不加载全部环境变量、需要脚本里面自行加载',
    commandFilePath: "命令文件将在 {'${插件端数据目录}'}/script/xxxx.sh 、bat 执行",
    addScriptTemplate: '新增脚本模版需要到节点管理中去新增',
    global: '全局',
    workspace: '工作空间',
    serverScript: '服务端分发的脚本',
    localScript: '本地脚本',
    more: '更多',
    serverScriptDelete: '服务端分发同步的脚本不能直接删除,需要到服务端去操作',
    unbind: '解绑',
    resetToken: '重置触发器 token 信息,重置后之前的触发器 token 将失效',
    reset: '重置',
    tip: '温馨提示',
    triggerAddressInfo: '单个触发器地址中：第一个随机字符串为脚本ID，第二个随机字符串为 token',
    resetTriggerAddress:
      '重置为重新生成触发地址,重置成功后之前的触发器地址将失效,触发器绑定到生成触发器到操作人上,如果将对应的账号删除触发器将失效',
    batchTriggerParams: '批量触发参数 BODY json： [ { "id":"1", "token":"a" } ]',
    triggerParamEnv:
      "单个触发器请求支持将参数解析为环境变量传入脚本执行，比如传入参数名为 abc=efg 在脚本中引入则为：{'${trigger_abc}'}",
    singleTriggerAddress: '单个触发器地址',
    batchTriggerAddress: '批量触发器地址',
    nodeName: '节点名称',
    workspaceName: '工作空间名称',
    type: '类型',
    share: '共享',
    modifyTime: '修改时间',
    createTime: '创建时间',
    creator: '创建人',
    modifier: '修改人',
    lastOperator: '最后操作人',
    operation: '操作',
    systemTip: '系统提示',
    confirmation: '真的要删除脚本么？',
    console: '控制台',
    unbindConfirmation: '真的要解绑节点脚本么？',
    unbindNote: '解绑不会真实请求节点删除脚本信息',
    unbindUsage: '一般用于服务器无法连接且已经确定不再使用',
    misoperationWarning: '如果误操作会产生冗余数据！！！',
    dangerWarning: '危险操作！！！'
  }
}
