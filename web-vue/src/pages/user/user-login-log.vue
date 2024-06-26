<template>
  <div>
    <!-- 数据表格 -->
    <CustomTable
      is-show-tools
      default-auto-refresh
      :auto-refresh-time="30"
      :active-page="activePage"
      table-name="systemUserLoginLog"
      :empty-description="$tl('p.noLoginLogs')"
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="pagination"
      bordered
      row-key="id"
      :scroll="{
        x: 'max-content'
      }"
      @change="change"
      @refresh="loadData"
    >
      <template #title>
        <a-space>
          <a-input
            v-model:value="listQuery['%modifyUser%']"
            :placeholder="$tl('p.username')"
            class="search-input-item"
            @press-enter="loadData"
          />
          <a-input
            v-model:value="listQuery['%username%']"
            :placeholder="$tl('p.nickname')"
            class="search-input-item"
            @press-enter="loadData"
          />
          <a-input
            v-model:value="listQuery['%ip%']"
            :placeholder="$tl('p.loginIp')"
            class="search-input-item"
            @press-enter="loadData"
          />
          <a-range-picker
            class="search-input-item"
            style="width: 220px"
            :show-time="{ format: 'HH:mm:ss' }"
            format="YYYY-MM-DD HH:mm:ss"
            @change="onChangeTime"
          />
          <a-tooltip :title="$tl('p.goToFirstPage')">
            <a-button type="primary" :loading="loading" @click="loadData">{{ $tl('p.search') }}</a-button>
          </a-tooltip>
        </a-space>
      </template>
      <template #tableBodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'userAgent'">
          <a-tooltip :title="text">{{ text }} </a-tooltip>
        </template>

        <template v-if="column.dataIndex === 'success'">
          <a-tag v-if="text" color="green">{{ $tl('p.success') }}</a-tag>
          <a-tag v-else color="pink">{{ $tl('p.failure') }}</a-tag>
        </template>

        <template v-if="column.dataIndex === 'useMfa'">
          <a-tag>{{ text ? $tl('p.used') : $tl('p.unused') }}</a-tag>
        </template>

        <template v-if="column.dataIndex === 'operateCode'">
          {{ operateCodeMap[text] || $tl('p.unknown') }}
        </template>
      </template>
    </CustomTable>
  </div>
</template>
<script lang="ts" setup>
import { userLoginLgin, operateCodeMap } from '@/api/user/user-login-log'
import { IPageQuery } from '@/interface/common'
import { CustomColumnType } from '@/components/customTable/types'
import { CHANGE_PAGE, COMPUTED_PAGINATION, PAGE_DEFAULT_LIST_QUERY, parseTime } from '@/utils/const'

import { useI18nPage } from '@/i18n/hooks/useI18nPage'
const { $tl } = useI18nPage('pages.user.userLoginLog')

const loading = ref(false)
const list = ref([])
// const operateCode = operateCodeMap;
const listQuery = ref<IPageQuery>({ ...PAGE_DEFAULT_LIST_QUERY })

const route = useRoute()
const attrs = useAttrs()
const activePage = computed(() => {
  return attrs.routerUrl === route.path
})

const columns = ref<CustomColumnType[]>([
  { title: $tl('p.userId'), dataIndex: 'modifyUser', width: 100 },
  { title: $tl('p.nickname'), dataIndex: 'username', width: 120 },
  { title: 'IP', dataIndex: 'ip', width: 120 },

  {
    title: $tl('p.isSuccess'),
    dataIndex: 'success',
    width: 90,
    align: 'center'
  },
  {
    title: $tl('p.isMfaUsed'),
    dataIndex: 'useMfa',
    align: 'center',
    width: 110
  },
  {
    title: $tl('p.resultDescription'),
    dataIndex: 'operateCode',
    ellipsis: true,
    width: 180
  },
  {
    title: $tl('p.loginTime'),
    dataIndex: 'createTimeMillis',
    sorter: true,
    customRender: ({ text, record }) => parseTime(text || record.optTime),
    width: '170px'
  },
  { title: $tl('p.browser'), dataIndex: 'userAgent', ellipsis: true, width: 100 }
])

const pagination = computed(() => {
  return COMPUTED_PAGINATION(listQuery.value)
})

const loadData = (pointerEvent?: any) => {
  loading.value = true
  listQuery.value.page = pointerEvent?.altKey || pointerEvent?.ctrlKey ? 1 : listQuery.value.page
  userLoginLgin(listQuery.value)
    .then((res) => {
      if (res.code === 200) {
        list.value = res.data.result
        listQuery.value.total = res.data.total
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const change = (pagination: any, filters: any, sorter: any) => {
  listQuery.value = CHANGE_PAGE(listQuery.value, { pagination, sorter })
  loadData()
}

const onChangeTime = (value, dateString) => {
  listQuery.value.createTimeMillis = `${dateString[0]} ~ ${dateString[1]}`
}

onMounted(() => {
  loadData()
})
</script>
<style scoped></style>
