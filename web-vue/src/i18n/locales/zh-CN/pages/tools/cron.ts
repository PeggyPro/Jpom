export default {
  c: {
    unit: '分',
    range1: '范围：0',
    range2: '范围：1',
    cronExpression: '请输入要检查的 cron 表达式',
    executionTimes: '请输入获取的计划运行次数',
    noData: '暂无数据'
  },
  p: {
    description: '此工具用于检查 cron 表达式是否正确,以及计划运行时间',
    moreInfo: '更多说明',
    cronExpressionLabel: '定时任务表达式',
    expressionIntro: '表达式类似于Linux的crontab表达式，表达式使用空格分成5个部分，按顺序依次为：',
    hour: '时',
    dayOfMonth: '日',
    lastDayOfMonth: '表示月的最后一天',
    month: '月',
    aliases1: '同时支持不区分大小写的别名：',
    dayOfWeek: '周',
    sundayAlias: '也可以表示周日，同时支持不区分大小写的别名：',
    saturdayAlias: '表示周六',
    quartzCompatibility: '为了兼容Quartz表达式，同时支持6位和7位表达式，其中：',
    firstFieldWhen6Digits: '当为6位时，第一位表示',
    second: '秒',
    range0: '范围0',
    firstFieldNotMatched: '但是第一位不做匹配',
    lastFieldWhen7Digits: '当为7位时，最后一位表示',
    year: '年',
    range1970: '范围1970',
    lastFieldNotParsedOrMatched: '但是第7位不做解析，也不做匹配',
    taskTriggering: '当定时任务运行到的时间匹配这些表达式后，任务被启动。',
    note: '注意：',
    isMatchSecond: '当isMatchSecond为 true 时才会匹配秒部分默认都是关闭的',
    supportedFormats: '对于每一个子表达式，同样支持以下形式：',
    allTimes: '表示匹配这个位置所有的时间',
    anyTime: '表示匹配这个位置任意的时间（与',
    anyTimeAlias: '作用一致）',
    interval: '表示间隔时间，例如在分上，表示每两分钟，同样*可以使用数字列表代替，逗号分隔',
    continuousRange: '表示连续区间，例如在分上，表示2',
    valueList: '表示列表',
    multipleExpressions: '表示多个定时表达式',
    priorityNote: '注意：在每一个子表达式中优先级：',
    intervalPriority: '间隔（/）',
    rangePriority: '区间（-）',
    listPriority: '列表（',
    example1: '例如 2',
    exampleNote: '中，由于',
    example2: '优先级高，因此相当于2',
    exampleResult: '结果与 2',
    exampleEquivalence: '等价',
    examples: '一些例子：',
    exampleCron: '每个点钟的5分执行，00',
    scheduleType: '每分钟执行',
    scheduleInterval: '每两分钟执行',
    scheduleDetail: '点的每分钟执行',
    dayOfWeek_1: '每周一和周二的11',
    action: '执行',
    minute: '分，每5分钟执行一次，即0',
    cron: 'cron表达式',
    scheduleCount: '计划次数',
    matchSecond: '匹配秒',
    isEnable: '是',
    disable: '否',
    timeRange: '时间范围',
    defaultTimeRange: '默认是当前时间到今年结束',
    to: '至',
    check: '检查',
    result: '结果'
  }
}
