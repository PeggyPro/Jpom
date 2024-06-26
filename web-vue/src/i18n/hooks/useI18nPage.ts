///
/// Copyright (c) 2019 Of Him Code Technology Studio
/// Jpom is licensed under Mulan PSL v2.
/// You can use this software according to the terms and conditions of the Mulan PSL v2.
/// You may obtain a copy of Mulan PSL v2 at:
/// 			http://license.coscl.org.cn/MulanPSL2
/// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
/// See the Mulan PSL v2 for more details.
///

import { useI18n } from 'vue-i18n'

/**
 * @name useI18nPage
 * @description
 */
export const useI18nPage = <T = any>(pagePath: string) => {
  const { t: $t } = useI18n()
  // $t(pagePath) as T
  const $tl = (key: string, ...args: any[]) => {
    const arg = [...args]
    return $t(`${pagePath}.${key}`, arg) as T
  }
  return {
    $t,
    $tl
  }
}
