export default {
  c: {
    schedulingExecution: '定时执行',
    execution: '执行',
    trigger: '触发器',
    commandName: '命令名称',
    sshNode: 'SSH节点',
    paramValue: '参数值',
    newParam: '新增参数',
    commandDescription: '命令描述',
    tips: '温馨提示',
    selectWorkspace: '请选择工作空间',
    copy: '点击可以复制'
  },
  p: {
    noSshScriptCommand: '没有任何SSH脚本命令',
    searchCommand: '搜索命令',
    description: '描述',
    quickBackToFirstPage: '按住 Ctr 或者 Alt/Option 键点击按钮快速回到第一页',
    search: '搜索',
    addNew: '新增',
    more: '更多',
    workspaceSync: '工作空间同步',
    commandTemplateDescription: '命令模版是用于在线管理一些脚本命令，如初始化软件环境、管理应用程序等',
    supportWorkspaceEnv: '命令内容支持工作空间环境变量',
    execCommandReplace:
      '执行命令将自动替换为 sh 命令文件、并自动加载环境变量：/etc/profile、/etc/bashrc、~/.bashrc、~/.bash_profile',
    execCommandInclude: '执行命令包含：',
    cancelAutoLoadEnv: '将取消自动加载环境变量',
    noteNoSpace: '注意是整行不能包含空格',
    commandFilePath: "命令文件将上传至 {'${user.home}'}/.jpom/xxxx.sh 执行完成将自动删除",
    edit: '编辑',
    delete: '删除',
    editCommand: '编辑 命令',
    scriptPathAndExecMethod:
      "脚本存放路径：{'${user.home}'}/.jpom/xxxx.sh，执行脚本路径：{'${user.home}'}，执行脚本方式：bash {'${user.home}'}/.jpom/xxxx.sh par1 par2",
    commandContent: '命令内容',
    canReferenceWorkspaceEnv: "可以引用工作空间的环境变量 变量占位符 {'${xxxx}'} xxxx 为变量名称",
    selectSshNode: '请选择SSH节点',
    defaultParam: '默认参数',
    paramDescription: '参数{index}描述`',
    paramDescriptionNoEffect: '参数描述没有实际作用',
    paramDescriptionHint: ',,仅是用于提示参数的含义',
    paramValue: '参数{index}值`',
    addNewDefaultParamNote: ',新增默认参数后在手动执行脚本时需要填写参数值',
    autoExec: '自动执行',
    cronExpression:
      '如果需要定时自动执行则填写,cron 表达式.默认未开启秒级别,需要去修改配置文件中:[system.timerMatchSecond]）',
    commandDetail: '命令详细描述',
    executeCommand: '执行 命令',
    selectSshNode_1: '请选择 SSH节点',
    commandParam: '命令参数',
    paramInstruction: '所有参数将拼接成字符串以空格分隔形式执行脚本,需要注意参数顺序和未填写值的参数将自动忽略',
    paramName: '参数',
    paramValue_1: '值',
    executeLog: '执行日志',
    syncToOtherWorkspaces: '同步到其他工作空间',
    syncMechanism: '同步机制采用',
    scriptName: '脚本名称',
    confirmSameScript: '确定是同一个脚本',
    createNewScriptIfNotExist: '当目标工作空间不存在对应的 脚本 时候将自动创建一个新的 脚本',
    syncScriptInfoIfExists: '当目标工作空间已经存在 脚本 时候将自动同步 脚本内容、默认参数、自动执行、描述',
    selectWorkspace: '选择工作空间',
    resetTriggerToken: '重置触发器 token 信息,重置后之前的触发器 token 将失效',
    reset: '重置',
    triggerUrlInfo: '单个触发器地址中：第一个随机字符串为命令脚本ID，第二个随机字符串为 token',
    regenerateTriggerUrl:
      '重置为重新生成触发地址,重置成功后之前的触发器地址将失效,触发器绑定到生成触发器到操作人上,如果将对应的账号删除触发器将失效',
    batchTriggerParams: '批量触发参数 BODY json： [ { "id":"1", "token":"a" } ]',
    parseParamsAsEnv:
      "单个触发器请求支持将参数解析为环境变量传入脚本执行，比如传入参数名为 abc=efg 在脚本中引入则为：{'${trigger_abc}'}",
    singleTriggerUrl: '单个触发器地址',
    batchTriggerUrls: '批量触发器地址',
    createTime: '创建时间',
    updateTime: '修改时间',
    lastOperator: '最后操作人',
    operation: '操作',
    fillParamDesc: '请填写第',
    paramDesc: '个参数的描述',
    systemPrompt: '系统提示',
    confirmDeleteCommand: '真的要删除“',
    deleteCommand: '命令？',
    confirm: '确认',
    cancel: '取消',
    selectExecuteNode: '请选择执行节点'
  }
}
