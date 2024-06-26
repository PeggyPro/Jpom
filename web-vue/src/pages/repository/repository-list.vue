<template>
  <div>
    <!-- 表格 -->
    <CustomTable
      is-show-tools
      default-auto-refresh
      :auto-refresh-time="30"
      :active-page="activePage"
      table-name="repository-list"
      :empty-description="$tl('p.noWarehouse')"
      size="middle"
      :columns="columns"
      :data-source="list"
      bordered
      row-key="id"
      :row-selection="choose ? rowSelection : null"
      :pagination="pagination"
      :scroll="{
        x: 'max-content'
      }"
      @change="
        (pagination, filters, sorter) => {
          listQuery = CHANGE_PAGE(listQuery, { pagination, sorter })
          loadData()
        }
      "
      @refresh="loadData"
    >
      <template #title>
        <a-space wrap class="search-box">
          <a-input
            v-model:value="listQuery['%name%']"
            class="search-input-item"
            :placeholder="$tl('c.warehouseName')"
            @press-enter="loadData"
          />
          <a-input
            v-model:value="listQuery['%gitUrl%']"
            class="search-input-item"
            :placeholder="$tl('c.warehouseAddress')"
            @press-enter="loadData"
          />
          <a-select
            v-model:value="listQuery.repoType"
            allow-clear
            :placeholder="$tl('c.warehouseType')"
            class="search-input-item"
          >
            <a-select-option :value="'0'">GIT</a-select-option>
            <a-select-option :value="'1'">SVN</a-select-option>
          </a-select>
          <a-select
            v-model:value="listQuery.group"
            show-search
            :filter-option="
              (input, option) => {
                const children = option.children && option.children()
                return (
                  children &&
                  children[0].children &&
                  children[0].children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                )
              }
            "
            allow-clear
            :placeholder="$tl('c.group')"
            class="search-input-item"
          >
            <a-select-option v-for="item in groupList" :key="item">{{ item }}</a-select-option>
          </a-select>

          <a-tooltip :title="$tl('p.quickBack')">
            <a-button type="primary" :loading="loading" @click="loadData">{{ $tl('c.search') }}</a-button>
          </a-tooltip>
          <a-button type="primary" @click="handleAdd">{{ $tl('c.add') }}</a-button>
          <a-tooltip>
            <template #title> {{ $tl('p.importMultiple') }} </template>
            <a-button type="primary" @click="handleAddGitee"
              ><QuestionCircleOutlined />{{ $tl('p.tokenImport') }}</a-button
            >
          </a-tooltip>
        </a-space>
      </template>
      <template #toolPrefix>
        <a-button type="primary" size="small" @click="handlerExportData"
          ><DownloadOutlined />{{ $tl('p.export') }}</a-button
        >
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <a-button type="primary" size="small" @click="handlerImportTemplate()">{{
                  $tl('p.downloadTemplate')
                }}</a-button>
              </a-menu-item>
            </a-menu>
          </template>

          <a-upload
            name="file"
            accept=".csv"
            action=""
            :show-upload-list="false"
            :multiple="false"
            :before-upload="beforeUpload"
          >
            <a-button type="primary" size="small"
              ><UploadOutlined /> {{ $tl('p.importData') }} <DownOutlined />
            </a-button>
          </a-upload>
        </a-dropdown>
      </template>
      <template #tableBodyCell="{ column, text, record, index }">
        <template v-if="column.tooltip">
          <a-tooltip placement="topLeft" :title="text">
            <span>{{ text }}</span>
          </a-tooltip>
        </template>

        <template v-else-if="column.dataIndex === 'repoType'">
          <span v-if="text === 0">GIT</span>
          <span v-else-if="text === 1">SVN</span>
          <span v-else>{{ $tl('p.unknown') }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'protocol'">
          <span v-if="text === 0">HTTP(S)</span>
          <span v-else-if="text === 1">SSH</span>
          <!-- if no protocol value, get a default value from gitUrl -->
          <span v-else>{{ record.gitUrl.indexOf('http') > -1 ? 'HTTP(S)' : 'SSH' }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'workspaceId'">
          <a-tag v-if="text === 'GLOBAL'">{{ $tl('c.global') }}</a-tag>
          <a-tag v-else>{{ $tl('p.workspace') }}</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-space>
            <a-button type="primary" size="small" @click="handleEdit(record)">{{ $tl('p.edit') }}</a-button>
            <a-button v-if="global" type="primary" size="small" @click="viewBuild(record)">{{
              $tl('p.associate')
            }}</a-button>
            <a-button type="primary" danger size="small" @click="handleDelete(record)">{{ $tl('p.delete') }}</a-button>

            <a-dropdown>
              <a @click="(e) => e.preventDefault()">
                {{ $tl('p.more') }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button
                      size="small"
                      type="primary"
                      :disabled="(listQuery.page - 1) * listQuery.limit + (index + 1) <= 1"
                      @click="sortItemHander(record, index, 'top')"
                      >{{ $tl('p.top') }}</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button
                      size="small"
                      type="primary"
                      :disabled="(listQuery.page - 1) * listQuery.limit + (index + 1) <= 1"
                      @click="sortItemHander(record, index, 'up')"
                      >{{ $tl('p.up') }}</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button
                      size="small"
                      type="primary"
                      :disabled="(listQuery.page - 1) * listQuery.limit + (index + 1) === listQuery.total"
                      @click="sortItemHander(record, index, 'down')"
                    >
                      {{ $tl('p.down') }}
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </template>
      </template>
    </CustomTable>
    <!-- 编辑区 -->
    <a-modal
      v-model:open="editVisible"
      :z-index="1009"
      destroy-on-close
      :confirm-loading="confirmLoading"
      :title="$tl('p.editWarehouse')"
      :mask-closable="false"
      @ok="handleEditOk"
    >
      <a-form ref="editForm" :rules="rules" :model="temp" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item :label="$tl('c.warehouseName')" name="name">
          <a-input v-model:value="temp.name" :max-length="50" :placeholder="$tl('c.warehouseName')" />
        </a-form-item>
        <a-form-item :label="$tl('c.group')" name="group">
          <custom-select
            v-model:value="temp.group"
            :data="groupList"
            :input-placeholder="$tl('p.addGroup')"
            :select-placeholder="$tl('p.selectGroupName')"
          >
          </custom-select>
        </a-form-item>
        <a-form-item :label="$tl('c.warehouseAddress')" name="gitUrl">
          <a-input-group compact>
            <a-form-item-rest>
              <a-select
                v-model:value="temp.repoType"
                style="width: 20%"
                name="repoType"
                :placeholder="$tl('c.warehouseType')"
              >
                <a-select-option :value="0">GIT</a-select-option>
                <a-select-option :value="1">SVN</a-select-option>
              </a-select>
            </a-form-item-rest>
            <a-input
              v-model:value="temp.gitUrl"
              style="width: 80%"
              :max-length="250"
              :placeholder="$tl('c.warehouseAddress')"
            />
          </a-input-group>
        </a-form-item>
        <a-form-item :label="$tl('c.protocol')" name="protocol">
          <a-radio-group v-model:value="temp.protocol" name="protocol">
            <a-radio :value="0">HTTP(S)</a-radio>
            <a-radio :value="1">SSH</a-radio>
          </a-radio-group>
        </a-form-item>
        <!-- HTTP(S) protocol use password -->
        <template v-if="temp.protocol === 0">
          <a-form-item name="userName">
            <template #label>
              <a-tooltip>
                {{ $tl('c.account') }}
                <template #title>
                  {{ $tl('p.accountReference') }}<b>$ref.wEnv.xxxx</b> xxxx {{ $tl('c.variableName') }}</template
                >
                <QuestionCircleOutlined v-if="!temp.id" />
              </a-tooltip>
            </template>

            <custom-input
              :input="temp.userName"
              :env-list="envVarList"
              type="text"
              :placeholder="`${$tl('p.loginUser')}`"
              @change="
                (v) => {
                  temp = { ...temp, userName: v }
                }
              "
            >
            </custom-input>
          </a-form-item>
          <a-form-item name="password">
            <template #label>
              <a-tooltip>
                {{ $tl('c.password') }}
                <template #title>
                  {{ $tl('c.passwordReference') }}<b>$ref.wEnv.xxxx</b> xxxx {{ $tl('c.variableName') }}</template
                >
                <QuestionCircleOutlined v-if="!temp.id" />
              </a-tooltip>
            </template>

            <custom-input
              :input="temp.password"
              :env-list="envVarList"
              :placeholder="`${!temp.id ? $tl('p.loginPassword') : $tl('p.passwordNote2')}`"
              @change="
                (v) => {
                  temp = { ...temp, password: v }
                }
              "
            >
            </custom-input>
            <template #help>
              <a-tooltip v-if="temp.id" :title="$tl('c.passwordNote')">
                <a-button style="margin: 5px" size="small" type="primary" danger @click="restHideField(temp)">{{
                  $tl('c.clear')
                }}</a-button>
              </a-tooltip>
            </template>
          </a-form-item>
        </template>
        <a-form-item v-if="temp.repoType === 1 && temp.protocol === 1" :label="$tl('c.account')" name="userName">
          <a-input v-model:value="temp.userName" :placeholder="$tl('p.svnUser')">
            <template #prefix>
              <UserOutlined />
            </template>
            <template #suffix>
              <a-tooltip v-if="temp.id" :title="$tl('c.passwordNote')">
                <a-button size="small" type="primary" danger @click="restHideField(temp)">{{
                  $tl('c.clear')
                }}</a-button>
              </a-tooltip>
            </template>
          </a-input>
        </a-form-item>
        <!-- SSH protocol use rsa private key -->
        <template v-if="temp.protocol === 1">
          <a-form-item name="password">
            <template #label>
              <a-tooltip>
                {{ $tl('c.password') }}
                <template #title>
                  {{ $tl('c.passwordReference') }}<b>$ref.wEnv.xxxx</b> xxxx {{ $tl('c.variableName') }}</template
                >
                <QuestionCircleOutlined v-if="!temp.id" />
              </a-tooltip>
            </template>
            <custom-input
              :input="temp.password"
              :env-list="envVarList"
              :placeholder="`${$tl('p.certificatePassword')}`"
              @change="
                (v) => {
                  temp = { ...temp, password: v }
                }
              "
            >
            </custom-input>
          </a-form-item>
          <a-form-item :label="$tl('p.privateKey')" name="rsaPrv">
            <a-tooltip placement="topLeft">
              <template #title>
                <div>
                  <p style="color: #faa">
                    {{ $tl('p.sshKeyNote') }} "{{ $tl('c.email') }}" {{ $tl('p.sshKeyGeneration1') }} <br />{{
                      $tl('p.sshKeyGeneration2')
                    }}
                    "{{ $tl('c.email') }}" {{ $tl('p.sshKeyGeneration3') }}<br />
                  </p>
                  <p>{{ $tl('p.privateKeyNote') }}</p>
                  <p>{{ $tl('p.privateKeyOptions') }}</p>
                  <p>
                    1. {{ $tl('p.privateKeyContent') }}: <br />-----BEGIN RSA PRIVATE KEY-----
                    <br />
                    ..... <br />
                    -----END RSA PRIVATE KEY-----
                  </p>
                  <p>
                    2. {{ $tl('p.privateKeyFilePath') }}: {{ $tl('p.privateKeyPrefix') }})
                    {{ $tl('p.privateKeyExample') }}: <br />file:/Users/Hotstrip/.ssh/id_rsa
                  </p>
                </div>
              </template>
              <a-textarea
                v-model:value="temp.rsaPrv"
                :auto-size="{ minRows: 3, maxRows: 3 }"
                :placeholder="$tl('p.privateKeyDefaultPath')"
              ></a-textarea>
            </a-tooltip>
          </a-form-item>
          <!-- 公钥暂时没用到 -->
          <a-form-item v-if="false" :label="$tl('p.publicKey')" name="rsaPub">
            <a-textarea
              v-model:value="temp.rsaPub"
              :auto-size="{ minRows: 3, maxRows: 3 }"
              :placeholder="$tl('p.publicKeyDefaultPath')"
            ></a-textarea>
          </a-form-item>
        </template>
        <a-form-item v-if="workspaceId !== 'GLOBAL'" :label="$tl('c.share')" name="global">
          <a-radio-group v-model:value="temp.global">
            <a-radio :value="true"> {{ $tl('c.global') }}</a-radio>
            <a-radio :value="false"> {{ $tl('p.currentWorkspace') }}</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item :label="$tl('p.timeout')" name="timeout">
          <a-input-number
            v-model:value="temp.timeout"
            :min="0"
            :placeholder="$tl('p.repoCloneTimeout')"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:open="giteeImportVisible"
      :z-index="1009"
      destroy-on-close
      :title="$tl('p.importRepoWithToken')"
      width="80%"
      :footer="null"
      :mask-closable="false"
    >
      <a-form
        ref="giteeImportForm"
        :label-col="{ span: 4 }"
        :rules="giteeImportFormRules"
        :model="giteeImportForm"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-item
          name="token"
          :label="$tl('p.personalToken')"
          help="使用{{$tl('p.personalToken')}}，可以在你不输入账号密码的情况下对你账号内的仓库进行管理，你可以在创建令牌时指定令牌所拥有的权限。"
        >
          <a-form-item-rest>
            <a-tooltip
              :title="`${giteeImportForm.type} ${$tl('p.tokenSuffix')}${importTypePlaceholder[giteeImportForm.type]}`"
            >
              <a-input-group compact>
                <a-select v-model:value="giteeImportForm.type" style="width: 10%" @change="importChange">
                  <a-select-option v-for="item in Object.keys(providerData)" :key="item" :value="item">
                    {{ item }}</a-select-option
                  >
                </a-select>

                <a-input-search
                  v-model:value="giteeImportForm.token"
                  style="width: 90%; margin-top: 1px"
                  enter-button
                  :loading="importLoading"
                  :placeholder="importTypePlaceholder[giteeImportForm.type]"
                  @search="handleGiteeImportFormOk"
                />
              </a-input-group>
            </a-tooltip>
          </a-form-item-rest>
        </a-form-item>
        <a-form-item name="address" :label="$tl('p.address')">
          <a-input v-model:value="giteeImportForm.address" :placeholder="$tl('p.platformAddress')" />
        </a-form-item>
        <a-form-item
          v-if="providerData[giteeImportForm.type].query"
          name="condition"
          :label="$tl('c.search')"
          help="输入仓库名称或者仓库路径进行{{$tl('c.search')}}"
        >
          <a-input v-model:value="giteeImportForm.condition" :placeholder="$tl('c.searchInput')" />
        </a-form-item>
      </a-form>
      <a-table
        :loading="importLoading"
        size="middle"
        :columns="reposColumns"
        :data-source="repos"
        bordered
        row-key="full_name"
        :pagination="reposPagination"
        @change="reposChange"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'private'">
            <a-switch size="small" :disabled="true" :checked="record.private" />
          </template>
          <template v-else-if="column.dataIndex === 'name'">
            <a-tooltip placement="topLeft" :title="text">
              <span>{{ text }}</span>
            </a-tooltip>
          </template>
          <template v-else-if="column.dataIndex === 'full_name'">
            <a-tooltip placement="topLeft" :title="text">
              <span>{{ text }}</span>
            </a-tooltip>
          </template>
          <template v-else-if="column.dataIndex === 'url'">
            <a-tooltip placement="topLeft" :title="text">
              <span>{{ text }}</span>
            </a-tooltip>
          </template>
          <template v-else-if="column.dataIndex === 'description'">
            <a-tooltip placement="topLeft" :title="text">
              <span>{{ text }}</span>
            </a-tooltip>
          </template>

          <template v-else-if="column.dataIndex === 'operation'">
            <a-button type="primary" size="small" :disabled="record.exists" @click="handleGiteeRepoAdd(record)">{{
              record.exists ? $tl('p.alreadyExists') : $tl('c.add')
            }}</a-button>
          </template>
        </template>
      </a-table>
    </a-modal>
    <!-- 选择仓库确认区域 -->
    <!-- <div style="padding-top: 50px" v-if="this.choose">
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-space>
          <a-button
            @click="
              () => {
                this.$emit('cancel')
              }
            "
          >
            取消
          </a-button>
          <a-button type="primary" @click="handerConfirm"> 确定 </a-button>
        </a-space>
      </div> -->
    <!-- </div> -->
    <!-- 关联构建 -->
    <a-modal
      v-model:open="viewBuildVisible"
      destroy-on-close
      width="80vw"
      :title="$tl('p.relatedBuild')"
      :mask-closable="false"
      :footer="null"
    >
      <buildList-component v-if="viewBuildVisible" :repository-id="temp.id" :full-content="false" />
      <a-spin v-else>loading....</a-spin>
    </a-modal>
  </div>
</template>

<script>
import CustomInput from '@/components/customInput'
import {
  providerInfo,
  authorizeRepos,
  deleteRepository,
  editRepository,
  getRepositoryList,
  restHideField,
  sortItem,
  exportData,
  importTemplate,
  importData,
  listRepositoryGroup
} from '@/api/repository'
import { CHANGE_PAGE, COMPUTED_PAGINATION, PAGE_DEFAULT_LIST_QUERY, parseTime } from '@/utils/const'
import { getWorkspaceEnvAll } from '@/api/workspace'
import CustomSelect from '@/components/customSelect'
export default {
  components: {
    CustomInput,
    CustomSelect,
    buildListComponent: defineAsyncComponent(() => import('@/pages/build/list-info'))
  },
  props: {
    choose: {
      type: Boolean,
      default: false
    },
    workspaceId: {
      type: String,
      default: ''
    },
    global: {
      type: Boolean,
      default: false
    },
    chooseVal: {
      type: String,
      default: ''
    }
  },
  emits: ['cancel', 'confirm'],
  data() {
    return {
      loading: false,
      PAGE_DEFAULT_SIZW_OPTIONS: ['15', '20', '25', '30', '35', '40', '50'],
      listQuery: Object.assign({}, PAGE_DEFAULT_LIST_QUERY),
      list: [],
      groupList: [],
      providerData: {
        gitee: {
          baseUrl: 'https://gitee.com',
          name: 'gitee',
          query: true
        }
      },
      total: 0,
      temp: {},
      isSystem: false,
      editVisible: false,
      giteeImportVisible: false,
      repos: [],
      username: null,

      columns: [
        {
          title: this.$tl('c.warehouseName'),
          dataIndex: 'name',
          width: 200,
          sorter: true,
          ellipsis: true,
          tooltip: true
        },
        {
          title: this.$tl('p.groupName'),
          dataIndex: 'group',
          ellipsis: true,
          width: '100px',
          tooltip: true
        },
        {
          title: this.$tl('c.warehouseAddress'),
          dataIndex: 'gitUrl',
          width: 300,
          sorter: true,
          ellipsis: true,
          tooltip: true
        },
        {
          title: this.$tl('c.warehouseType'),
          dataIndex: 'repoType',
          width: 100,
          sorter: true,
          ellipsis: true
        },
        {
          title: this.$tl('c.protocol'),
          dataIndex: 'protocol',
          width: 100,
          sorter: true,
          ellipsis: true
        },
        {
          title: this.$tl('c.share'),
          dataIndex: 'workspaceId',
          ellipsis: true,

          width: '90px'
        },
        {
          title: this.$tl('p.creator'),
          dataIndex: 'createUser',
          ellipsis: true,
          tooltip: true,
          width: '120px'
        },
        {
          title: this.$tl('p.modifier'),
          dataIndex: 'modifyUser',
          ellipsis: true,
          tooltip: true,
          width: '120px'
        },
        {
          title: this.$tl('p.createTime'),
          dataIndex: 'createTimeMillis',
          sorter: true,
          customRender: ({ text }) => parseTime(text),
          width: '170px'
        },
        {
          title: this.$tl('p.updateTime'),
          dataIndex: 'modifyTimeMillis',
          sorter: true,
          customRender: ({ text }) => parseTime(text),
          width: '170px'
        },
        {
          title: this.$tl('p.sortValue'),
          dataIndex: 'sortValue',
          sorter: true,
          width: '80px'
        },
        {
          title: this.$tl('c.operation'),
          dataIndex: 'operation',
          fixed: 'right',
          align: 'center',
          width: this.global ? '240px' : '180px'
        }
      ],
      reposColumns: [
        {
          title: this.$tl('c.warehouseName'),
          dataIndex: 'name',
          ellipsis: true
        },
        {
          title: this.$tl('p.repoPath'),
          dataIndex: 'full_name',
          ellipsis: true
        },
        {
          title: 'GitUrl',
          dataIndex: 'url',
          ellipsis: true
        },

        {
          title: this.$tl('p.description'),
          dataIndex: 'description',

          ellipsis: true
        },
        {
          title: this.$tl('p.isPrivate'),
          dataIndex: 'private',
          width: 80,
          ellipsis: true
        },
        {
          title: this.$tl('c.operation'),
          dataIndex: 'operation',
          width: 100,

          align: 'left'
        }
      ],
      giteeImportForm: Object.assign({}, PAGE_DEFAULT_LIST_QUERY, {
        limit: 15,
        type: 'gitee',
        address: 'https://gitee.com'
      }),
      giteeImportFormRules: {
        token: [{ required: true, message: this.$tl('c.privateTokenInput'), trigger: 'blur' }]
        // address: [{ required: true, message: "请填写平台地址", trigger: "blur" }],
      },
      rules: {
        name: [{ required: true, message: this.$tl('p.repoName'), trigger: 'blur' }],
        gitUrl: [{ required: true, message: this.$tl('p.repoAddress'), trigger: 'blur' }]
      },
      importTypePlaceholder: {
        gitee: this.$tl('p.tokenFromGitlab'),
        github: this.$tl('p.tokenFromGithub'),
        gitlab_v3: this.$tl('c.tokenAcquire1'),
        gitlab: this.$tl('c.tokenAcquire1'),
        gitea: this.$tl('c.tokenAcquire2'),
        gogs: this.$tl('c.tokenAcquire2'),
        other: this.$tl('c.privateTokenInput')
      },
      tableSelections: [],
      envVarList: [],

      viewBuildVisible: false,
      confirmLoading: false,
      importLoading: false
    }
  },
  computed: {
    // 分页
    pagination() {
      return COMPUTED_PAGINATION(this.listQuery)
    },
    reposPagination() {
      return COMPUTED_PAGINATION(this.giteeImportForm, this.PAGE_DEFAULT_SIZW_OPTIONS)
    },
    activePage() {
      return this.$attrs.routerUrl === this.$route.path
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys) => {
          this.tableSelections = selectedRowKeys
        },
        selectedRowKeys: this.tableSelections,
        type: 'radio'
      }
    }
  },
  watch: {},
  created() {
    this.loadData()
    //
    providerInfo().then((response) => {
      if (response.code === 200) {
        this.providerData = response.data
      }
    })
    this.getWorkEnvList()
    this.loadGroupList()

    if (this.chooseVal) {
      this.tableSelections = [this.chooseVal]
    }
  },
  methods: {
    $tl(key, ...args) {
      return this.$t(`pages.repository.repositoryList.${key}`, ...args)
    },
    CHANGE_PAGE,
    // 分组数据
    loadGroupList() {
      listRepositoryGroup().then((res) => {
        if (res.data) {
          this.groupList = res.data
        }
      })
    },
    getWorkEnvList() {
      getWorkspaceEnvAll({
        workspaceId: this.workspaceId + (this.global ? ',GLOBAL' : '')
      }).then((res) => {
        if (res.code === 200) {
          this.envVarList = res.data
        }
      })
    },
    // 加载数据
    loadData(pointerEvent) {
      this.listQuery.page = pointerEvent?.altKey || pointerEvent?.ctrlKey ? 1 : this.listQuery.page
      this.loading = true
      if (this.workspaceId) {
        this.listQuery = { ...this.listQuery, workspaceId: this.workspaceId }
      }
      getRepositoryList(this.listQuery).then((res) => {
        if (res.code === 200) {
          this.list = res.data.result
          this.listQuery.total = res.data.total
        }
        this.loading = false
      })
    },
    importChange(value) {
      this.giteeImportForm.address = this.providerData[value].baseUrl
    },
    // // 筛选
    // handleFilter() {
    //   this.loadData();
    // },
    // 新增
    handleAdd() {
      this.temp = {
        repoType: 0,
        protocol: 0
      }
      if (!this.global) {
        this.temp = { ...this.temp, workspaceId: 'GLOBAL', global: true }
      }

      this.editVisible = true
    },
    handleAddGitee() {
      this.giteeImportVisible = true
    },
    // 下载导入模板
    handlerImportTemplate() {
      window.open(importTemplate(), '_blank')
    },
    handlerExportData() {
      window.open(exportData({ ...this.listQuery, workspaceId: this.workspaceId }), '_blank')
    },
    beforeUpload(file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('workspaceId', this.workspaceId)
      importData(formData).then((res) => {
        if (res.code === 200) {
          $notification.success({
            message: res.msg
          })
          this.loadData()
        }
      })
    },
    handleGiteeImportFormOk() {
      this.$refs['giteeImportForm'].validate().then(() => {
        this.importLoading = true
        authorizeRepos(this.giteeImportForm)
          .then((res) => {
            if (res.code === 200) {
              // 成功
              //this.username = res.data.username;
              this.giteeImportForm.total = res.data.total
              this.repos = res.data.result
            }
          })
          .finally(() => {
            this.importLoading = false
          })
      })
    },
    reposChange(pagination) {
      this.giteeImportForm.page = pagination.current
      this.giteeImportForm.limit = pagination.pageSize
      this.handleGiteeImportFormOk()
    },
    handleGiteeRepoAdd(record) {
      let data = {
        repoType: 0,
        protocol: 0,
        userName: record.username,
        password: this.giteeImportForm.token,
        name: record.name,
        gitUrl: record.url
      }
      if (!this.global) {
        data = { ...data, workspaceId: 'GLOBAL', global: true }
      }
      editRepository(data).then((res) => {
        if (res.code === 200) {
          // 成功
          $notification.success({
            message: res.msg
          })
          record.exists = true
          this.loadData()
        }
      })
    },
    // 修改
    handleEdit(record) {
      this.temp = Object.assign({}, record)
      if (this.temp.protocol === undefined) {
        this.temp.protocol = this.temp.gitUrl.indexOf('http') > -1 ? 0 : 1
      }
      this.temp = {
        ...this.temp,
        global: record.workspaceId === 'GLOBAL',
        workspaceId: ''
      }
      this.editVisible = true
    },
    // 提交节点数据
    handleEditOk() {
      // 检验表单
      this.$refs['editForm'].validate().then(() => {
        // 提交数据
        this.confirmLoading = true
        editRepository(this.temp)
          .then((res) => {
            if (res.code === 200) {
              // 成功
              $notification.success({
                message: res.msg
              })
              this.editVisible = false
              this.loadData()
              this.$refs['editForm'].resetFields()
              this.loadGroupList()
            }
          })
          .finally(() => {
            this.confirmLoading = false
          })
      })
    },
    // 删除
    handleDelete(record) {
      $confirm({
        title: this.$tl('c.systemPrompt'),
        content: this.$tl('p.confirmDeleteRepo'),
        okText: this.$tl('c.confirm'),
        cancelText: this.$tl('c.cancel'),
        zIndex: 1009,
        onOk: () => {
          return deleteRepository({
            id: record.id
          }).then((res) => {
            if (res.code === 200) {
              $notification.success({
                message: res.msg
              })
              this.loadData()
            }
          })
        }
      })
    },

    // 清除隐藏字段
    restHideField(record) {
      $confirm({
        title: this.$tl('c.systemPrompt'),
        content: this.$tl('p.confirmClearHiddenFields'),
        okText: this.$tl('c.confirm'),
        cancelText: this.$tl('c.cancel'),
        zIndex: 1009,
        onOk: () => {
          return restHideField(record.id).then((res) => {
            if (res.code === 200) {
              $notification.success({
                message: res.msg
              })
              this.loadData()
            }
          })
        }
      })
    },

    // 排序
    sortItemHander(record, index, method) {
      const msgData = {
        top: this.$tl('p.confirmPinToTop'),
        up: this.$tl('p.confirmMoveToUp'),
        down: this.$tl('p.confirmMoveToDown')
      }
      let msg = msgData[method] || this.$tl('p.confirmOperation')
      if (!record.sortValue) {
        msg += ` ${this.$tl('p.isDefault')},${this.$tl('p.moveNotice')},${this.$tl('p.moveAdvice')}`
      }
      // console.log(this.list, index, this.list[method === "top" ? index : method === "up" ? index - 1 : index + 1]);
      const compareId = this.list[method === 'top' ? index : method === 'up' ? index - 1 : index + 1].id
      $confirm({
        title: this.$tl('c.systemPrompt'),
        content: msg,
        okText: this.$tl('c.confirm'),
        cancelText: this.$tl('c.cancel'),
        zIndex: 1009,
        onOk: () => {
          return sortItem({
            id: record.id,
            method: method,
            compareId: compareId
          }).then((res) => {
            if (res.code == 200) {
              $notification.success({
                message: res.msg
              })

              this.loadData()
              return false
            }
          })
        }
      })
    },
    // 确认
    handerConfirm() {
      if (!this.tableSelections.length) {
        $notification.warning({
          message: this.$tl('p.selectRepo')
        })
        return
      }
      const selectData = this.list.filter((item) => {
        return item.id === this.tableSelections[0]
      })[0]

      this.$emit('confirm', `${selectData.id}`)
    },
    // 查看关联构建
    viewBuild(data) {
      this.temp = { id: data.id }
      this.viewBuildVisible = true
    }
  }
}
</script>

<style scoped>
/* .filter {
  margin-bottom: 10px;
}

.btn-add {
  margin-left: 10px;
  margin-right: 0;
} */
</style>
