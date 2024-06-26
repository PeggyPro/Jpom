export default {
  c: {
    distributionType: '分发类型',
    independent: '独立',
    related: '关联',
    unknown: '未知',
    yes: '是',
    no: '否',
    edit: '编辑',
    distributionID: '分发 ID',
    distributionIDEqualsProjectID: '分发 ID 等同于项目 ID',
    cannotModifyAfterCreation: '创建之后不能修改',
    randomlyGenerated: '随机生成',
    distributionName: '分发名称',
    groupingName: '分组名称：',
    addNewGrouping: '新增分组',
    selectGrouping: '选择分组',
    distributionNode: '分发节点',
    noProjectInThisNode: '此节点暂无项目',
    independentDistribution: '【独立分发】',
    distributionOperationAfter: '分发后操作',
    selectOperationAfterPublish: '请选择发布后操作',
    intervalTime: '间隔时间',
    ensureProjectRestart: '在执行多节点分发时候使用 顺序重启、完整顺序重启 时候需要保证项目能正常重启',
    waitPreviousProjectStart: '并等待上一个项目启动完成才能关闭下一个项目',
    configureBasedOnProjectStartTime: '请根据自身项目启动时间来配置',
    suggestedIntervalTime: '一般建议 10 秒以上',
    distributionIntervalTimeEffect: '分发间隔时间 （顺序重启、完整顺序重启）方式才生效',
    secondaryDirectory: '二级目录',
    publishToRootIfNotFilled: '不填写则发布至项目的根目录',
    clearPublish: '清空发布',
    clearPublishDescription: '清空发布是指在上传新文件前,会将项目文件夹目录里面的所有文件先删除后再保存新文件',
    publishStopBefore:
      '发布前停止是指在发布文件到项目文件时先将项目关闭，再进行文件替换。避免 windows 环境下出现文件被占用的情况',
    publishStopBeforeColon: '发布前停止：',
    distributionRequestAddress: '分发过程请求对应的地址,开始分发,分发完成,分发失败,取消分发',
    parametersForDistribution: '传入参数有：outGivingId、outGivingName、status、statusMsg、executeTime',
    statusValues: '的值有：1',
    distributionStatuses: '分发中、2：分发结束、3：已取消、4：分发失败',
    asynchronousRequest: '异步请求不能保证有序性',
    distributionProcessRequest: '分发过程请求,非必填，GET请求',
    immutableAfterCreation: '创建之后不能修改,分发 ID 等同于项目 ID',
    runProject: '运行项目',
    selectProjectAuthorizationPath: '请选择项目授权路径',
    configuration: '配置',
    configurationExample: '配置示例',
    defaultLogDirectory: "默认是在插件端数据目录/{'${projectId}'}/{'${projectId}'}.log",
    selectProject: '请选择项目',
    systemPrompt: '系统提示',
    confirm: '确认',
    cancel: '取消'
  },
  p: {
    distributionID: '分发id',
    name: '名称',
    selectGrouping: '请选择分组',
    selectStatus: '请选择状态',
    quickBackToFirstPage: '按住 Ctr 或者 Alt/Option 键点击按钮快速回到第一页',
    search: '搜索',
    addRelated: '新增关联',
    addDistribution: '新增分发',
    nodeDistributionDescription:
      '节点分发是指,一个项目运行需要在多个节点(服务器)中运行,使用节点分发来统一管理这个项目(可以实现分布式项目管理功能)',
    addRelatedProjectDescription: '新增关联项目是指,将已经在节点中创建好的项目关联为节点分发项目来实现统一管理',
    createDistributionProjectDescription:
      '创建分发项目是指,全新创建一个属于节点分发到项目,创建成功后项目信息将自动同步到对应的节点中,修改节点分发信息也自动同步到对应的节点中',
    distributionFiles: '分发文件',
    more: '更多',
    cancelDistribution: '取消分发',
    delete: '删除',
    release: '释放',
    deleteCompletely: '彻底删除',
    unbind: '解绑',
    editRelatedProject: '编辑关联项目',
    addRelatedProject: '新增关联项目',
    noData: '暂无数据,请先新增节点项目数据',
    node: '节点:',
    selectNode: '请选择节点',
    noNodeInfo: '暂无节点信息',
    project: '项目:',
    add: '新增',
    editDistributionProject: '编辑分发项目',
    createDistributionProject: '创建分发项目',
    loadingData: '加载数据中',
    remind: '提醒',
    noLogicalNode: '当前工作空间还没有逻辑节点不能创建节点分发奥',
    distributionName: '分发名称（项目名称）',
    runningMode: '运行方式',
    scriptTemplate: '配合脚本模版实现自定义项目管理',
    staticFolder: '项目为静态文件夹',
    noProjectStatus: '没有项目状态以及控制等功能',
    selectRunningMode: '请选择运行方式',
    notRecommended: '不推荐',
    projectPath: '项目路径',
    authorizationPath: '授权路径是指项目文件存放到服务中的文件夹',
    modifyAuthorizationConfig: '可以到【节点分发】=>【分发授权配置】修改',
    projectFolder: '项目文件夹是项目实际存放的目录名称',
    projectFilesStored: '项目文件会存放到',
    authorizationPathProjectFolder: '项目授权路径+项目文件夹',
    jarFolder: '项目存储的文件夹，jar 包存放的文件夹',
    configureAuthorizationDirectory: '需要提前为工作空间配置授权目录',
    configureDirectory: '配置目录',
    projectFullDirectory: '项目完整目录',
    content: '内容',
    yamlConfig:
      '以 yaml/yml 格式配置,scriptId 为项目路径下的脚本文件的相对路径或者服务端脚本模版ID，可以到服务端脚本模版编辑弹窗中查看 scriptId',
    variablesInScript: "脚本里面支持的变量有：{'${PROJECT_ID}'}、{'${PROJECT_NAME}'}、{'${PROJECT_PATH}'}",
    scriptOutput: '流程执行完脚本后，输出的内容最后一行必须为：running',
    processID: '为当前项目实际的进程ID',
    incorrectOutputFormat: '。如果输出最后一行不是预期格式项目状态将是未运行',
    referToConfigExample: '配置详情请参考配置示例',
    recommendedScriptDistribution: '建议使用服务端脚本分发到脚本：',
    viewServerScript: '查看服务端脚本',
    fillProjectDSLConfig: '请填写项目 DSL 配置内容,可以点击上方切换 tab 查看配置示例',
    logDirectory: '日志目录',
    logDirectorySelection: '日志目录是指控制台日志存储目录',
    sameConfigAsAuthorizationDirectory: '可选择的列表和项目授权目录是一致的，即相同配置',
    selectLogDirectory: '请选择日志目录',
    mainClass: '程序运行的 main 类(jar 模式运行可以不填)',
    jvmArgs: '填写【xxx',
    jvmArgsExample: '-Dext.dirs=xxx: -cp xx  :xx】',
    selectDistributionNode: '请选择分发节点',
    jvmParams: 'JVM 参数',
    params: '参数',
    nonMandatory: '非必填',
    jvmParamsExample: 'jvm,.如：-Xms512m -Xmx512m',
    argsParams: 'args 参数',
    functionArgsParams: '函数 args 参数，非必填',
    argsParamsExample: '如：--server',
    autoStart: '自启动',
    checkProjectStatus: '插件端启动的时候检查项目状态，如果项目状态是未运行则尝试执行启动项目',
    nonServerAutoStart: '非服务器开机自启,如需开机自启建议配置',
    pluginAutoStart: '插件端开机自启',
    turnOnAutoStart: '并开启此开关',
    on: '开',
    off: '关',
    pluginAutoCheckProjectOnStart: '插件端启动时自动检查项目如未启动将尝试启动',
    dslEnvironmentVariables: 'DSL环境变量',
    environmentVariables: '环境变量',
    exampleVariable: '如：key1',
    projectRequestOnStartStopRestart: '项目启动,停止,重启都将请求对应的地址',
    parametersForProjectRequest: '传入参数有：projectId、projectName、type、result',
    valuesForProjectRequest: '的值有：stop、beforeStop、start、beforeRestart',
    projectRequestOnFileChange: '项目启动,停止,重启,文件变动都将请求对应的地址,非必填，GET请求',
    configureAuthorizationDirectory1: '配置授权目录',
    viewScript: '查看脚本',
    projectGrouping: '项目分组',
    distributionStatus: '分发后',
    status: '状态',
    creationTime: '创建时间',
    modificationTime: '修改时间',
    modifiedBy: '修改人',
    operations: '操作',
    enterProjectID: '请输入项目ID',
    enterProjectName: '请输入项目名称',
    selectProjectRunningMode: '请选择项目运行方式',
    enterProjectFolder: '请输入项目文件夹',
    selectAtLeastOneNodeProject: '至少选择1个节点项目',
    selectAtLeastOneNode: '请至少选择 1 个节点',
    confirmDeletionOfDistributionInfo:
      '真的要彻底删除分发信息么？删除后节点下面的项目也都将彻底删除，彻底项目会自动删除项目相关文件奥(包含项目日志，日志备份，项目文件)',
    confirmDeletionOfDistributionInfoSimple: '真的要删除分发信息么？删除后节点下面的项目也都将删除',
    confirmReleaseOfDistributionInfo:
      '真的要释放分发信息么？释放之后节点下面的项目信息还会保留，如需删除项目还需要到节点管理中操作',
    confirmUnbindingCurrentNodeDistribution: '真的要解绑当前节点分发么？',
    unbindCheckDataAssociation: '解绑会检查数据关联性,不会真实请求节点删除项目信息',
    unbindForUnreachableServer: '一般用于服务器无法连接且已经确定不再使用',
    cautionDueToMistakeOperation: '如果误操作会产生冗余数据！！！',
    dangerousOperation: '危险操作！！！',
    noMoreNodeProjects: '已无更多节点项目，请先创建项目',
    selectNodeFirst: '请先选择节点',
    confirmCancellationOfCurrentDistribution: '真的取消当前分发吗？',
    disableScanDir: '禁止扫描',
    scanning: '扫描',
    dontScanning: '不扫描',
    disableScanDirTip: '如果项目目录较大或者涉及到深目录，建议关闭扫描避免获取项目目录扫描过长影响性能'
  }
}
