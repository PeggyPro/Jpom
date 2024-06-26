export default {
  c: {
    selectNode: '请选择节点',
    runMode: '运行方式',
    batchOperation: '批量操作',
    batchStart: '批量启动',
    synchronization: '同步',
    console: '控制台',
    trigger: '触发器',
    notStarted: '未开始',
    warmTip: '温馨提示',
    copyTip: '点击可以复制',
    selectWorkspace: '请选择工作空间',
    selectLogicNode: '请选择逻辑节点',
    systemTip: '系统提示',
    confirm: '确认',
    cancel: '取消'
  },
  p: {
    noProjectOrNode: '当前工作空间还没有项目并且也没有任何节点',
    addNewAsset: '需要您先新增资产机器再分配机器节点（逻辑节点）到当前工作空间',
    selectGroup: '请选择分组',
    searchProjectName: '搜索项目名',
    searchProjectId: '搜索项目ID',
    quickToFirstPage: '按住 Ctr 或者 Alt/Option 键点击按钮快速回到第一页',
    search: '搜索',
    batchRestart: '批量重启',
    batchClose: '批量关闭',
    addNew: '新增',
    exportData: '导出',
    downloadTemplate: '下载导入模板',
    importData: '导入',
    statusDataDelay: '状态数据是异步获取有一定时间延迟',
    fileListOrder: '在单页列表里面 file 类型项目将自动排序到最后',
    statusControl: '状态操作请到控制台中控制',
    statusOn: '开',
    statusOff: '关',
    processId: '进程号：',
    portNumber: '端口号：',
    fileType: '文件',
    noConsoleForFile: '文件类型没有控制台功能',
    moreOptions: '更多',
    noTriggerForFile: '文件类型没有触发器功能',
    projectLog: '项目日志',
    copyAction: '复制',
    logicalDelete: '逻辑删除',
    permanentDelete: '彻底删除',
    migrateWorkspace: '迁移工作空间',
    topPriority: '置顶',
    moveUp: '确定要将此数上移吗？',
    moveDown: '确定要将此数据下移吗？下移操作可能因为列表后续数据没有排序值操作无效！',
    resetTriggerToken: '重置触发器 token 信息,重置后之前的触发器 token 将失效',
    resetAction: '重置',
    executeAction: '执行',
    triggerAddressInfo: '单个触发器地址中：第一个随机字符串为项目ID(服务端)，第二个随机字符串为 token',
    resetTriggerAddress:
      '重置为重新生成触发地址,重置成功后之前的触发器地址将失效,触发器绑定到生成触发器到操作人上,如果将对应的账号删除触发器将失效',
    batchTriggerParams: '批量触发参数 BODY json： [ { "id":"1", "token":"a","action":"status" } ]',
    triggerAddress: '触发器地址',
    batchTriggerAddress: '批量触发器地址',
    editProject: '编辑项目',
    selectNode: '选择节点',
    switchNodeDuringEdit: '编辑过程中可以切换节点但是要注意数据是否匹配',
    migrateToOtherWorkspace: '迁移到其他工作空间',
    projectSupportAssociatedData: '项目可能支持关联如下数据：',
    onlineBuild: '在线构建（构建关联仓库、构建历史）',
    cannotMigrateIfBuildRepoIsBoundByMultipleBuilds: '如果关联的构建关联的仓库被多个构建绑定（使用）不能迁移',
    resolveDuplicateReposAfterAutoMigration: '仓库自动迁移后可能会重复存在请手动解决',
    nodeDistributionNotSupported: '节点分发【暂不支持迁移】',
    projectMonitoringNotSupported: '项目监控 【暂不支持迁移】',
    logReadingNotSupported: '日志阅读 【暂不支持迁移】',
    riskReminder: '风险提醒',
    logicalDeletionBeforeMigration:
      '如果垮机器（资产机器）迁移之前机器中的项目数据仅是逻辑删除（项目文件和日志均会保留）',
    migrationIsNotTransactional: '迁移操作不具有事务性质，如果流程被中断或者限制条件不满足可能产生冗余数据！！！！',
    checkConnectionAndNetworkStatusBeforeMigration:
      '迁移前您检查迁出机器和迁入机器的连接状态和网络状态避免未知错误或者中断造成流程失败产生冗余数据！！！！',
    selectWorkspace: '选择工作空间',
    selectLogicalNode: '选择逻辑节点',
    logBackupList: '日志备份列表',
    projectId: '项目ID',
    projectName: '项目名称',
    projectGroup: '项目分组',
    nodeName: '节点名称',
    runningStatus: '运行状态',
    projectPath: '项目路径',
    logPath: '日志路径',
    portOrPid: '端口/PID',
    createTime: '创建时间',
    updateTime: '修改时间',
    modifier: '修改人',
    sortValue: '排序值',
    operation: '操作',
    viewStatus: '查看状态',
    startProject: '启动项目',
    stopProject: '停止项目',
    restartProject: '重启项目',
    networkException: '网络异常',
    fileManagement: '文件管理',
    trackFile: '跟踪文件',
    pleaseSelectProjectToStart: '请选中要启动的项目',
    start: '启动',
    statusMedium: '中',
    failed: '失败',
    skip: '跳过',
    pleaseSelectProjectToRestart: '请选中要重启的项目',
    batchRestart_1: '批量重新启动',
    restartAction: '重启',
    pleaseSelectProjectToStop: '请选中要关闭的项目',
    batchStopStart: '批量关闭启动',
    stopAction: '停止',
    confirmResyncCache: '确定要重新同步当前节点项目缓存信息吗？',
    pinToTop: '确定要将此数据置顶吗？',
    operate: '确定要操作吗？',
    defaultStatus: '当前数据为默认状态',
    unexpectedOrder: '操后上移或者下移可能不会达到预期排序',
    expectedOrder: '还需要对相关数据都操作后才能达到预期排序',
    copy: '副本',
    deleteForever: '真的要彻底删除项目么？彻底项目会自动删除项目相关文件奥(包含项目日志，日志备份，项目文件)',
    deleteProject: '真的要删除项目么？删除项目不会删除项目相关文件奥,建议先清理项目相关文件再删除项目'
  }
}
